// Build-time HTML for the data-driven sections. Injected into index.html by vite.config.js,
// so content is in the markup (crawlable, works without JS) and JS only adds motion.
import { projects, repoNotes, titleOverrides } from './data/content.js';
import prs from './data/prs.json' with { type: 'json' };
import cp from './data/cp.json' with { type: 'json' };

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (iso) => { const [y, m, d] = iso.split('-'); return `${+d} ${MONTHS[+m - 1]} ${y.slice(2)}`; };
const fmtStars = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n));
const ext = 'target="_blank" rel="noopener"';
const title = (p) => titleOverrides[p.url] ?? p.title;
const NAMES = { 'mozilla-mobile/firefox-ios': 'Firefox for iOS', 'microsoft/aspire': 'Microsoft Aspire', 'google/xrblocks': 'Google XR Blocks' };

export const prTotal = prs.total;
export const prUpdated = prs.updated;
export const repoTotal = prs.repos.length;

// Stacking project cards: illustration on the left, copy on the right.
export function renderProjects() {
  return projects
    .map(
      (p) => `<article class="card">
  <a class="card-visual" href="${esc(p.links[0].href)}" ${ext} aria-label="${esc(`${p.name}: ${p.links[0].label}`)}">
    <div class="visual" data-visual="${p.id}" aria-hidden="true"></div>
  </a>
  <div class="card-copy">
    <p class="card-kicker">(${esc(p.category)})</p>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.body)}</p>
    <ul class="card-tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    <p class="card-links">${p.links.map((l) => `<a class="pill" href="${esc(l.href)}" ${ext}>${esc(l.label)}</a>`).join('')}</p>
  </div>
</article>`,
    )
    .join('\n');
}

// Exhibition-style rows: repo, stars and count, and a pill that opens the PR list.
export function renderRepos() {
  return prs.repos
    .map((r) => {
      const items = r.prs
        .map((p) => `<li><time datetime="${p.merged}">${fmtDate(p.merged)}</time><a href="${esc(p.url)}" ${ext}>${esc(title(p))}</a><span>#${p.number}</span></li>`)
        .join('');
      return `<li class="repo">
  <details>
    <summary>
      <span class="repo-name">${esc(NAMES[r.full] ?? r.name)}</span>
      <span class="repo-meta">${esc(r.owner)}, ${fmtStars(r.stars)} stars</span>
      <span class="pill">${r.prs.length} merged</span>
    </summary>
    <div class="repo-body">
      ${repoNotes[r.full] ? `<p>${esc(repoNotes[r.full])}</p>` : ''}
      <ul class="pr-list">${items}</ul>
    </div>
  </details>
</li>`;
    })
    .join('\n');
}

// Featured contributions, shown like testimonials: the summary is the quote, the org avatar the switcher.
const FEATURED = ['mozilla-mobile/firefox-ios', 'microsoft/aspire', 'Termix-SSH/Termix'];
const featured = FEATURED.map((full) => prs.repos.find((r) => r.full === full)).filter(Boolean);
export function renderQuotes() {
  return featured
    .map((r, i) => {
      // First clause in plain ink, the rest highlighted, like the reference's two-tone quote.
      const note = repoNotes[r.full];
      const cut = note.indexOf(' ', Math.floor(note.length * 0.35));
      return `<figure class="quote${i ? '' : ' on'}">
  <blockquote>“${esc(note.slice(0, cut))}<mark>${esc(note.slice(cut))}</mark>”</blockquote>
  <figcaption>// ${esc(NAMES[r.full] ?? r.name)}<span>${r.prs.length} merged pull requests, ${fmtStars(r.stars)} stars</span></figcaption>
</figure>`;
    })
    .join('');
}
export function renderAvatars() {
  return featured
    .map((r, i) => `<button type="button" class="avatar${i ? '' : ' on'}" aria-label="Show ${esc(NAMES[r.full] ?? r.name)}"><img src="https://github.com/${esc(r.owner)}.png?size=96" alt="" width="48" height="48" loading="lazy" /></button>`)
    .join('');
}
export const featuredCount = String(featured.length).padStart(2, '0');

// Logo strip: every organisation contributed to.
export function renderOrgs() {
  const owners = [...new Set(prs.repos.map((r) => r.owner))];
  const items = owners.map((o) => `<span><img src="https://github.com/${esc(o)}.png?size=48" alt="" width="24" height="24" loading="lazy" />${esc(o)}</span>`).join('');
  return `<div class="logos-track">${items}${items}</div>`;
}

// Problem solving: LeetCode and Codeforces cards from cp.json (refreshed on build).
export function renderCp() {
  const lc = cp.leetcode, cf = cp.codeforces;
  const bar = (label, n) => `<li><span>${label}</span><i style="--w:${((n / lc.solved) * 100).toFixed(1)}%"></i><b>${n}</b></li>`;
  // Rating line: x spaced by contest, y scaled between 0 and the next 400 above the peak.
  const top = Math.ceil((cf.maxRating + 1) / 400) * 400;
  const pts = cf.history.map((h, i) => [cf.history.length > 1 ? 20 + (i / (cf.history.length - 1)) * 360 : 200, 150 - (h.rating / top) * 130]);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return `<article class="cp-card">
  <header><h3>LeetCode</h3><a class="pill" href="https://leetcode.com/u/${lc.handle}/" target="_blank" rel="noopener">@${lc.handle}</a></header>
  <p class="cp-big"><span data-count="${lc.solved}">${lc.solved}</span></p>
  <p class="cp-sub">Problems solved</p>
  <ul class="cp-bars">${bar('Easy', lc.easy)}${bar('Medium', lc.medium)}${bar('Hard', lc.hard)}</ul>
  <p class="cp-foot"><b>${lc.activeDays}</b> active days this year</p>
</article>
<article class="cp-card dark">
  <header><h3>Codeforces</h3><a class="pill" href="https://codeforces.com/profile/${cf.handle}" target="_blank" rel="noopener">@${cf.handle}</a></header>
  <p class="cp-big"><span data-count="${cf.rating}">${cf.rating}</span></p>
  <p class="cp-sub">Rating, ${cf.rank} (max ${cf.maxRating})</p>
  <svg class="cp-chart" viewBox="0 0 400 160" role="img" aria-label="Rating after each of ${cf.contests} contests: ${cf.history.map((h) => h.rating).join(', ')}">
    <line x1="0" x2="400" y1="${(150 - (cf.maxRating / top) * 130).toFixed(1)}" y2="${(150 - (cf.maxRating / top) * 130).toFixed(1)}" class="peak" />
    <polyline points="${line}" class="rate" />
    ${pts.map(([x, y], i) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"><title>${cf.history[i].date}: ${cf.history[i].rating}</title></circle>`).join('')}
  </svg>
  <dl class="cp-foot"><div><dt>${cf.solved}</dt><dd>problems solved</dd></div><div><dt>${cf.contests}</dt><dd>rated contests</dd></div></dl>
</article>`;
}
export const cpTotal = (cp.leetcode?.solved ?? 0) + (cp.codeforces?.solved ?? 0);
