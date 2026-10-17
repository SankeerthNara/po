# sankeerthnara.in

Personal site for Sankeerth Nara. Vite + GSAP + Lenis, no framework. Visuals after the Videaste Dribbble shot, motion after the Alexfolio Framer template (see PROGRESS.md).

The site lives in `frontend/` (the Vercel project builds from that folder).

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # refreshes PR data, then builds to dist/
```

## How it's put together

| File | What it does |
| --- | --- |
| `frontend/vercel.json` | Vercel build settings (Vite, `npm run build`, output `dist`). |
| `index.html` | Page structure. `<!--@slot-->` comments are filled at build time. |
| `src/render.js` | Renders the project cards, open-source rows, featured-contribution quotes and org logo strip into those slots, so content is in the HTML (works without JS, crawlable). |
| `src/data/content.js` | Hand-written copy: projects, repo summaries, nicer PR titles, skills. |
| `src/data/prs.json` | Merged PRs to repos I don't own. Generated, don't edit by hand. |
| `scripts/fetch-cp.mjs` | Regenerates `src/data/cp.json` (LeetCode and Codeforces stats for Sankeerth_Nara). Runs before every build; each source keeps its old values if its API fails. |
| `scripts/fetch-prs.mjs` | Regenerates `prs.json` from the GitHub API. Runs before every build; if the API fails it keeps the existing file. |
| `src/main.js` | Smooth scroll, the loader intro, marquees, word fills, stacking cards, the "view" cursor and the quote switcher. |
| `src/visuals.js` | The small animated illustration for each project (shown on each project card). |
| `tools/record.js` | Playwright script that records a video tour of the site. |
| `tools/cutout.py` | One-off script that removed the white background from the portrait. |

## Updating content

- **New pull requests** appear on the next build. To refresh locally: `cd frontend && GITHUB_TOKEN=$(gh auth token) npm run prs`. A GitHub Action (`.github/workflows/refresh-data.yml`) also refreshes PR and LeetCode/Codeforces data hourly and commits it, which redeploys the site.
  Repos to leave out (coursework, onboarding) are listed at the top of `scripts/fetch-prs.mjs`.
- **A repo summary or a clearer PR title**: add it to `repoNotes` / `titleOverrides` in `src/data/content.js`.
- **A new project**: add an entry to `projects` in `content.js`. For an illustration, add a builder with the
  same `id` in `src/visuals.js`; without one the panel just shows an empty frame.
- **Portrait**: replace `public/portrait.webp` (transparent background, about 1300px wide).

## Deploying

It's a static site: any host that runs `npm run build` and serves `dist/` works (Vercel, Netlify, Cloudflare Pages).
Set a `GITHUB_TOKEN` environment variable on the host to avoid GitHub's unauthenticated rate limit during the PR fetch.
