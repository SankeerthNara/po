#!/usr/bin/env node
/**
 * Pulls merged PRs for the configured GitHub user and rewrites the
 * `openSource` array in frontend/src/mock.js.
 *
 * For any merged PR that doesn't already have a hand-written description in
 * open-source-config.json's `overrides`, this asks Claude to write a
 * one-liner in the style of the existing entries, then SAVES that result
 * back into overrides — so it's cached, reviewable in the PR diff, and
 * never regenerated (or re-billed) on future runs.
 *
 * Usage:
 *   node scripts/sync-open-source.mjs           # updates mock.js
 *   node scripts/sync-open-source.mjs --check    # exits 1 if mock.js would change (for CI)
 *
 * Env vars:
 *   GITHUB_TOKEN / GH_TOKEN   optional, avoids GitHub search rate limits
 *   ANTHROPIC_API_KEY         optional, enables AI-written one-liners for
 *                             new PRs. Without it, new PRs fall back to
 *                             their raw GitHub title.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, "open-source-config.json");
const MOCK_PATH = path.join(__dirname, "..", "frontend", "src", "mock.js");
const START_MARKER = "// OPEN-SOURCE:START";
const END_MARKER = "// OPEN-SOURCE:END";
const STATS_START_MARKER = "// OPEN-SOURCE-STATS:START";
const STATS_END_MARKER = "// OPEN-SOURCE-STATS:END";
const CLAUDE_MODEL = "claude-haiku-4-5-20251001";

const CHECK_ONLY = process.argv.includes("--check");

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
}

/**
 * Hits the exact same search GitHub's UI runs for
 * https://github.com/search?q=is%3Apr+is%3Amerged+author%3A<user>&type=pullrequests
 * (via the equivalent REST search endpoint), so `total_count` here always
 * matches what that link shows. Returns both the raw total (unfiltered —
 * includes PRs later dropped by excludeRepos/excludePRs) and the full item
 * list used to build the portfolio groups.
 */
async function fetchMergedPRs(username, token) {
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const items = [];
  let totalCount = 0;
  let page = 1;
  while (true) {
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(
      `is:pr is:merged author:${username}`
    )}&per_page=100&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    totalCount = data.total_count;
    items.push(...data.items);
    if (data.items.length < 100 || items.length >= data.total_count) break;
    page += 1;
  }
  return { items, totalCount };
}

/**
 * Asks Claude to write a single portfolio-style bullet for a PR, using a
 * handful of existing hand-written overrides as style examples.
 */
async function generateDescription(item, repo, existingOverrides, apiKey) {
  const examples = Object.values(existingOverrides).slice(0, 5);

  const prompt = `Write ONE portfolio bullet point describing this merged open-source pull request.

Repo: ${repo}
PR title: ${item.title}
PR description:
${(item.body || "(no description)").slice(0, 1500)}

Style rules:
- Past tense, third person implied (no "I"), one sentence.
- Technical and specific about what changed, not marketing language.
- No PR number, no issue number, no "Closes #".
- Do not wrap in quotes.
- Match the tone of these existing examples:
${examples.map((e) => `- ${e}`).join("\n")}

Respond with ONLY the single bullet sentence, nothing else.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const text = data.content?.find((b) => b.type === "text")?.text || "";
  return text.trim().replace(/^"|"$/g, "");
}

/**
 * Fills in config.overrides for any merged PR that doesn't have one yet.
 * Mutates and returns config; caller decides whether to persist it.
 */
async function fillMissingDescriptions(items, config) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const excludeRepos = new Set(config.excludeRepos || []);
  const excludePRs = new Set(config.excludePRs || []);
  const overrides = { ...(config.overrides || {}) };
  let changed = false;

  for (const item of items) {
    const repo = item.repository_url.split("/repos/")[1];
    const key = `${repo}#${item.number}`;
    if (excludeRepos.has(repo) || excludePRs.has(key) || overrides[key]) continue;

    if (!apiKey) {
      console.log(`(no ANTHROPIC_API_KEY — using raw title for ${key})`);
      continue;
    }

    console.log(`Generating description for ${key}: "${item.title}"...`);
    try {
      overrides[key] = await generateDescription(item, repo, overrides, apiKey);
      changed = true;
      console.log(`  -> ${overrides[key]}`);
    } catch (err) {
      console.warn(`  Claude generation failed for ${key}, falling back to raw title: ${err.message}`);
    }
  }

  config.overrides = overrides;
  return changed;
}

function buildOpenSource(items, config) {
  const excludeRepos = new Set(config.excludeRepos || []);
  const excludePRs = new Set(config.excludePRs || []);
  const groupBy = config.groupBy || {};
  const tags = config.tags || {};
  const overrides = config.overrides || {};
  const defaultTag = config.defaultTag || "Open Source";

  // groups: displayName -> { latestMergedAt, entries: [{ key, mergedAt, text }] }
  const groups = new Map();

  for (const item of items) {
    const repo = item.repository_url.split("/repos/")[1];
    const key = `${repo}#${item.number}`;
    if (excludeRepos.has(repo) || excludePRs.has(key)) continue;

    const displayName = groupBy[repo] || repo.split("/")[1];
    const mergedAt = item.pull_request?.merged_at || item.closed_at;
    const text = overrides[key] || item.title;
    const url = item.html_url;

    if (!groups.has(displayName)) {
      groups.set(displayName, { latestMergedAt: mergedAt, entries: [] });
    }
    const group = groups.get(displayName);
    group.entries.push({ key, mergedAt, text, url });
    if (mergedAt > group.latestMergedAt) group.latestMergedAt = mergedAt;
  }

  const orgs = [...groups.entries()]
    .sort((a, b) => (a[1].latestMergedAt < b[1].latestMergedAt ? 1 : -1))
    .map(([org, group]) => ({
      org,
      tag: tags[org] || defaultTag,
      points: group.entries
        .sort((a, b) => (a.mergedAt < b.mergedAt ? 1 : -1))
        .map((e) => ({ text: e.text, url: e.url })),
    }));

  return orgs;
}

function renderStatsBlock(totalCount, username) {
  const lines = [
    STATS_START_MARKER,
    "export const openSourceStats = {",
    `  totalMergedPRs: ${totalCount},`,
    `  searchUrl: ${JSON.stringify(
      `https://github.com/search?q=${encodeURIComponent(
        `is:pr is:merged author:${username}`
      )}&type=pullrequests`
    )}`,
    "};",
    STATS_END_MARKER,
  ];
  return lines.join("\n");
}

function renderBlock(orgs) {
  const lines = [START_MARKER, "export const openSource = ["];
  for (const { org, tag, points } of orgs) {
    lines.push("  {");
    lines.push(`    org: ${JSON.stringify(org)},`);
    lines.push(`    tag: ${JSON.stringify(tag)},`);
    lines.push("    points: [");
    points.forEach((p, i) => {
      lines.push("      {");
      lines.push(`        text: ${JSON.stringify(p.text)},`);
      lines.push(`        url: ${JSON.stringify(p.url)}`);
      lines.push(`      }${i < points.length - 1 ? "," : ""}`);
    });
    lines.push("    ]");
    lines.push(`  }${org === orgs[orgs.length - 1].org ? "" : ","}`);
  }
  lines.push("];", END_MARKER);
  return lines.join("\n");
}

async function main() {
  const config = loadConfig();
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  console.log(`Fetching merged PRs for ${config.githubUsername}...`);
  const { items, totalCount } = await fetchMergedPRs(config.githubUsername, token);
  console.log(`Found ${items.length} merged PRs (GitHub reports ${totalCount} total).`);

  const overridesChanged = await fillMissingDescriptions(items, config);
  if (overridesChanged && !CHECK_ONLY) {
    saveConfig(config);
    console.log("Saved new AI-generated descriptions to open-source-config.json");
  }

  const orgs = buildOpenSource(items, config);
  const newBlock = renderBlock(orgs);
  const newStatsBlock = renderStatsBlock(totalCount, config.githubUsername);

  const original = fs.readFileSync(MOCK_PATH, "utf8");
  const startIdx = original.indexOf(START_MARKER);
  const endIdx = original.indexOf(END_MARKER);
  const statsStartIdx = original.indexOf(STATS_START_MARKER);
  const statsEndIdx = original.indexOf(STATS_END_MARKER);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(
      `Could not find ${START_MARKER} / ${END_MARKER} markers in mock.js. Add them around the openSource export.`
    );
  }
  if (statsStartIdx === -1 || statsEndIdx === -1) {
    throw new Error(
      `Could not find ${STATS_START_MARKER} / ${STATS_END_MARKER} markers in mock.js. Add them around the openSourceStats export.`
    );
  }

  // Apply both replacements from the end of the file backwards so earlier
  // indices stay valid regardless of which marker block comes first.
  const edits = [
    { start: startIdx, end: endIdx + END_MARKER.length, block: newBlock },
    { start: statsStartIdx, end: statsEndIdx + STATS_END_MARKER.length, block: newStatsBlock },
  ].sort((a, b) => b.start - a.start);

  let updated = original;
  for (const { start, end, block } of edits) {
    updated = updated.slice(0, start) + block + updated.slice(end);
  }

  if (updated === original && !overridesChanged) {
    console.log("No changes.");
    return;
  }

  const totalEntries = orgs.flatMap((o) => o.points).length;
  console.log(`Writing ${orgs.length} orgs (${totalEntries} entries) to mock.js`);

  // Flag any PR still using its raw GitHub title (no API key set, or the
  // Claude call failed) so it's easy to spot and hand-write later.
  const rawTitleKeys = items
    .filter((item) => {
      const repo = item.repository_url.split("/repos/")[1];
      const key = `${repo}#${item.number}`;
      if ((config.excludeRepos || []).includes(repo)) return false;
      if ((config.excludePRs || []).includes(key)) return false;
      return !(config.overrides || {})[key];
    })
    .map((item) => `${item.repository_url.split("/repos/")[1]}#${item.number} — ${item.title}`);

  if (rawTitleKeys.length) {
    console.log("\nStill using raw PR titles for:");
    rawTitleKeys.forEach((k) => console.log(`  - ${k}`));
  }

  if (CHECK_ONLY) {
    console.error("\nmock.js is out of date. Run `node scripts/sync-open-source.mjs` to update it.");
    process.exit(1);
  }

  fs.writeFileSync(MOCK_PATH, updated);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
