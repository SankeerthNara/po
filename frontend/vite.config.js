import { defineConfig } from 'vite';
import * as r from './src/render.js';

// Fills <!--@name--> slots in index.html with build-time markup from src/render.js.
const slots = {
  projects: r.renderProjects,
  cp: r.renderCp,
  'cp-total': () => String(r.cpTotal),
  repos: r.renderRepos,
  quotes: r.renderQuotes,
  avatars: r.renderAvatars,
  orgs: r.renderOrgs,
  'featured-count': () => r.featuredCount,
  'pr-total': () => String(r.prTotal),
  'repo-total': () => String(r.repoTotal),
  'pr-updated': () => r.prUpdated,
};

export default defineConfig({
  build: { rollupOptions: { input: ['index.html', '404.html', 'privacy.html', 'terms.html'] } },
  plugins: [
    {
      name: 'render-slots',
      transformIndexHtml: (html) =>
        html.replace(/<!--@([\w-]+)-->/g, (m, key) => {
          if (!slots[key]) throw new Error(`Unknown slot ${key}`);
          return slots[key]();
        }),
    },
  ],
});
