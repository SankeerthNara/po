// Refreshes src/data/prs.json with merged PRs to repos I don't own.
// Runs before every build; on any failure it keeps the committed JSON so builds never break.
import { readFile, writeFile } from 'node:fs/promises';

const USER = 'SankeerthNara';
// Onboarding and coursework repos aren't open-source contributions.
const SKIP = new Set(['firstcontributions/first-contributions']);
const SKIP_OWNERS = new Set([USER, 'ESW-M26']);
const OUT = new URL('../src/data/prs.json', import.meta.url);
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'sankeerth-portfolio',
  ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
};

const gh = async (path) => {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
};

// "Fix thing , Closes #12" / "feat: x (closes #83)" / "y (#95)" -> "Fix thing" / "feat: x" / "y"
const cleanTitle = (t) =>
  t.replace(/[\s,(]*closes\s*#\d+\s*\)?\s*$/i, '').replace(/\s*\(#\d+\)\s*$/, '').trim();
console.assert(cleanTitle('Added banner , ( Closes #20 )') === 'Added banner', 'cleanTitle: closes suffix');
console.assert(cleanTitle('feat: x (closes #83)') === 'feat: x', 'cleanTitle: parenthesised closes');
console.assert(cleanTitle('Show selector (#1234)') === 'Show selector', 'cleanTitle: issue ref');

try {
  const items = [];
  for (let page = 1; page <= 3; page++) {
    const q = encodeURIComponent(`is:pr is:merged author:${USER}`);
    const res = await gh(`/search/issues?q=${q}&per_page=100&page=${page}`);
    items.push(...res.items);
    if (items.length >= res.total_count) break;
  }

  const byRepo = new Map();
  for (const it of items) {
    const full = it.repository_url.split('/repos/')[1];
    if (SKIP_OWNERS.has(full.split('/')[0]) || SKIP.has(full)) continue;
    if (!byRepo.has(full)) byRepo.set(full, []);
    byRepo.get(full).push({
      number: it.number,
      title: cleanTitle(it.title),
      url: it.html_url,
      merged: (it.pull_request?.merged_at ?? it.closed_at).slice(0, 10),
    });
  }

  const repos = [];
  for (const [full, prs] of byRepo) {
    const r = await gh(`/repos/${full}`);
    repos.push({
      full,
      owner: r.owner.login,
      name: r.name,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
      description: r.description,
      prs: prs.sort((a, b) => b.merged.localeCompare(a.merged)),
    });
  }
  repos.sort((a, b) => b.stars - a.stars);

  const total = repos.reduce((n, r) => n + r.prs.length, 0);
  const data = { updated: new Date().toISOString().slice(0, 10), total, repos };
  await writeFile(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`prs.json: ${total} merged PRs across ${repos.length} repos`);
} catch (err) {
  const kept = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
  console.warn(`fetch-prs skipped (${err.message}); keeping existing data (${kept.total ?? 0} PRs)`);
}
