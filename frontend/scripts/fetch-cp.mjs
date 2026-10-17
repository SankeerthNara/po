// Refreshes src/data/cp.json with LeetCode and Codeforces stats. Runs before every build;
// each source fails soft and keeps its previous values so builds never break.
import { readFile, writeFile } from 'node:fs/promises';

const HANDLE = 'Sankeerth_Nara';
const OUT = new URL('../src/data/cp.json', import.meta.url);
const old = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const getJson = async (url, init) => {
  const res = await fetch(url, { ...init, headers: { 'User-Agent': 'sankeerth-portfolio', ...init?.headers } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

async function leetcode() {
  const query = `query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}} userCalendar{totalActiveDays}}}`;
  const { data } = await getJson('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { u: HANDLE } }),
  });
  const n = Object.fromEntries(data.matchedUser.submitStatsGlobal.acSubmissionNum.map((d) => [d.difficulty, d.count]));
  return { handle: HANDLE, solved: n.All, easy: n.Easy, medium: n.Medium, hard: n.Hard, activeDays: data.matchedUser.userCalendar.totalActiveDays };
}

async function codeforces() {
  const api = (m) => getJson(`https://codeforces.com/api/${m}`).then((r) => r.result);
  const [[info], history, subs] = await Promise.all([api(`user.info?handles=${HANDLE}`), api(`user.rating?handle=${HANDLE}`), api(`user.status?handle=${HANDLE}`)]);
  const solved = new Set(subs.filter((s) => s.verdict === 'OK').map((s) => `${s.problem.contestId}-${s.problem.index}`)).size;
  return {
    handle: HANDLE, rating: info.rating, maxRating: info.maxRating, rank: info.rank, solved, contests: history.length,
    history: history.map((h) => ({ date: new Date(h.ratingUpdateTimeSeconds * 1000).toISOString().slice(0, 10), rating: h.newRating })),
  };
}

const out = { updated: new Date().toISOString().slice(0, 10) };
for (const [key, fn] of [['leetcode', leetcode], ['codeforces', codeforces]]) {
  try {
    out[key] = await fn();
  } catch (err) {
    console.warn(`fetch-cp: ${key} skipped (${err.message}); keeping previous data`);
    out[key] = old[key];
  }
}
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`cp.json: LeetCode ${out.leetcode?.solved} solved, Codeforces ${out.codeforces?.rating}`);
