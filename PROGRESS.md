# Portfolio rebuild — progress log

Resume point for any future session. Update the checklist as work lands.

## Brief
Stunning personal portfolio for Sankeerth Nara (2nd-yr CSE @ IIIT Hyderabad). Rich colour, scroll
animation, glass, 3D. Must not look AI-generated. Content = user's GitHub README + sankeerthnara.in +
latest merged PRs (pulled via `gh`/GitHub API).

## Design plan ("Pigment")
- Identity from the watercolour print on his shirt in the portrait.
- Palette: ink `#110E22`, paper `#F2ECF4`, plum `#8E3B76`, indigo `#3F4BA0`, rust `#B4462A`,
  ochre `#D9A441`, rose `#D58AA8`.
- Type: Anybody (variable width, display — width animates) + Newsreader (serif body).
- One fixed WebGL canvas: watercolour pigment field shader + glass pebbles
  (MeshPhysicalMaterial transmission/dispersion/iridescence) choreographed by scroll.
- Sections: hero (name + portrait cut-out) → about (ink-fill text on scroll) → open source
  (dated PR timeline + expandable repo rows) → projects (pinned horizontal glass panels, each a
  hand-coded mini visual) → toolkit → right now → contact.
- Avoid: cream bg, single neon accent, card grids, caps eyebrows, mono labels, `→` links,
  fake numbering, fade-up-on-every-section.

## Stack
Vite (vanilla JS) + gsap/ScrollTrigger + lenis. Fonts: Inter Tight (fontsource).
`scripts/fetch-prs.mjs` refreshes `src/data/prs.json` (runs on prebuild, fails soft).

## Checklist
- [x] Portrait cut-out (public/portrait.webp)
- [x] Scaffold Vite project + deps
- [x] PR fetch script + prs.json
- [x] HTML structure + content
- [x] CSS tokens/type/layout + responsive
- [x] WebGL pigment + glass scene
- [x] Scroll choreography (GSAP)
- [x] Project mini-visuals
- [x] Reduced motion / a11y / no-WebGL fallback (reduced motion verified in Playwright)
- [x] Browser QA desktop 1440 + mobile 375 (pass 1 done; see notes)
- [x] Build passes; ask user before deploying (Vercel connector available)

## 2026-10-18 (later) REBUILD v3 — CURRENT PLAN (supersedes the Matthew rebuild below)
User: "https://td-alexfolio.framer.website/ — this type of animations" + "dribbble 23090247 Videaste — this type of visuals".
Refs captured in tools/ref2/ (alex.webm recording, at*.jpg sheets, v0.jpg = Videaste shot).
Visual (Videaste): cream #f3f1ec, black #0e0e0e, ONE accent yellow #f5b52e; heavy lowercase Inter Tight;
  rounded cards with notched corners + round icon buttons; portrait on yellow card; social chips; stats;
  black marquee bands with crosshair icons; B&W portrait with radiating capsules; exhibition-style rows w/ pills.
Animation (Alexfolio): black loader -> hero image brightens; headline slides in; giant lowercase marquees;
  scroll word-fill statement w/ highlighted phrase; sticky stacked "what I do" panels w/ outline numbers 01-04;
  sticky stacking project cards (prev scales/darkens) + cursor "view" bubble; highlighted quote w/ avatar
  switcher (featured contributions) + logo marquee; "reach out —" marquee footer over grayscale portrait.
STATUS: DONE + verified in recorded tour tools/video/portfolio-tour.webm (re-record: tools/record.js via
Playwright MCP browser_run_code_unsafe). Footer marquee runs BEHIND the portrait (blend over face looked garbled).
Added later: fixed back-to-top button (bottom right); Problem solving section (LeetCode + Codeforces,
scripts/fetch-cp.mjs -> src/data/cp.json, prebuild) between Projects and Open source.
DEPLOYED 2026-10-18: pushed to github.com/SankeerthNara/po (main) -> Vercel project "po" -> sankeerthnara.in.
Layout: site lives in frontend/ because the Vercel project's Root Directory is "frontend" (Claude's Vercel
connector is read-only for that scope, so settings were matched instead of changed). frontend/vercel.json sets Vite.
Hourly .github/workflows/refresh-data.yml refreshes prs.json + cp.json and commits (=> redeploy).
Old React app + backend removed from the tree; still in git history (parent e3c589d).

## 2026-10-18 REBUILD to match reference (Matthew) (CURRENT PLAN — supersedes everything below)
User: "use https://dribbble.com/shots/22469576 as reference, I need exact animations, use playwright to record video".
Frames extracted to tools/ref/ (f*.jpg every 0.4s, d*.jpg dense; s_*.jpg contact sheets).
Reference system: light grey #dcdce0 / white / black, Anton (display) + Plus Jakarta Sans (body). No 3D, no accent.
1. Preloader black, name chars stagger in/out, black panel slides DOWN revealing hero.
2. Hero (sticky; next section slides over): white rounded nav inside hero, role text char reveal,
   giant infinite name marquee BEHIND cut-out portrait, thin orbit circles, "Scroll down" + line.
3. /ABOUT black: title colour fill #333->#fff scrubbed, words brighten, "02/05" counter, big outline arrow.
4. Marquee band (black strip, condensed caps, ✷ separators) — use skills.
5. Works (white): intro text + GET IN TOUCH circle; rows w/ huge condensed names clipped at rest,
   hover = name rises + floating preview card follows cursor (preview = visuals.js illustrations).
6. /OPEN SOURCE (black): same row pattern for repos, click expands PR list.
7. Process: black rounded card pinned, BUILD / CONTRIBUTE / LEARN, active word white, panel wipe top->down.
8. Footer grey: arrow + LET'S WORK TOGETHER + SEND ME A MESSAGE, giant name fill grey->black, links row.
Then: record a Playwright video of the result (tools/video/).
STATUS 2026-10-18: DONE. All 8 parts built and verified in a recorded tour (tools/video/portfolio-tour.webm,
re-record with Playwright MCP browser_run_code_unsafe filename=tools/record.js, dev server on :5288).
three.js + gl.js removed; fonts now Anton + Plus Jakarta Sans. Mobile 390px checked.
Remaining: deploy (ask user).

## 2026-10-12 redesign (user feedback: colours/bubbles not professional)
- Watercolour shader + glass pebbles REMOVED. Background is now a 3D dot-wave field (src/gl.js, THREE.Points).
- Palette: ink `#0a0f1a`, text `#e8edf5`, single accent `#6f9bff` (steel blue), slate `#7d8aa3`. No other hues.
- All per-item pigment colours removed (render.js data-pigment gone; CSS `--pig` = accent).
- Do NOT reintroduce multi-colour palettes or bubble/blob visuals.

## Notes / decisions so far (pre-redesign, partly superseded)
- Palette ink became `#140f30` (deeper indigo) after first render looked muddy.
- Calm sections thin the paint (`SPARSE` in gl.js) instead of dimming it; dimming looked like fog.
- Timeline, repo list and project panels sit on frosted "glass sheets" so data stays legible.
- Portrait cut-out: `tools/cutout.py` (flood fill >=251 + hair fringe decontamination).
- Browser pane is hidden during QA => rAF throttled; use `__gl.snap()` / `__lenis.scrollTo` (dev only).
- three.js is lazy-loaded (`import('./gl.js')`); main bundle ~56 kB gz.
- Coursework repo ESW-M26 and first-contributions excluded from PR counts (33 PRs / 17 repos).

## Remaining
- [x] OG image (public/og.jpg, real render via Playwright)
- [x] README with run/refresh/deploy steps; .gitignore
- [x] Final pass: hero scroll parallax fixed (portrait drifts up, eased hem fade)
- [ ] WAITING ON USER: deploy target (Vercel? push to SankeerthNara/portfolio? point sankeerthnara.in?)
