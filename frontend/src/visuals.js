// Small hand-built illustrations for each project. Each returns a GSAP timeline that loops
// while its panel is on screen and pauses otherwise.
import gsap from 'gsap';

const NS = 'http://www.w3.org/2000/svg';
const svg = (w, h, inner) => `<svg viewBox="0 0 ${w} ${h}" xmlns="${NS}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
const C = { accent: '#f5b52e', paper: '#f3f1ec', slate: '#55524c' }; // cream + one yellow, to match the site

// ---------- Face recognition tic-tac-toe ----------
function faceplay(el) {
  // Landmarks traced with simple curves: jaw, brows, eyes, nose, mouth.
  const pts = [];
  for (let i = 0; i <= 16; i++) { const a = Math.PI * (0.05 + 0.9 * (i / 16)); pts.push([100 - 52 * Math.cos(a), 92 + 62 * Math.sin(a) - 20]); }
  for (let i = 0; i < 5; i++) { pts.push([62 + i * 9, 74 - Math.sin((i / 4) * Math.PI) * 6]); pts.push([102 + i * 9, 74 - Math.sin((i / 4) * Math.PI) * 6]); }
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; pts.push([80 + 9 * Math.cos(a), 88 + 4 * Math.sin(a)]); pts.push([120 + 9 * Math.cos(a), 88 + 4 * Math.sin(a)]); }
  for (let i = 0; i < 4; i++) pts.push([100, 92 + i * 7]);
  for (let i = 0; i < 5; i++) pts.push([90 + i * 5, 118 - (i % 2) * 2]);
  for (let i = 0; i < 9; i++) { const a = Math.PI * (i / 8); pts.push([100 - 18 * Math.cos(a), 132 + 8 * Math.sin(a)]); }
  const dots = pts.map(([x, y]) => `<circle class="lm" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9"/>`).join('');

  const cells = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push([262 + c * 38, 70 + r * 38]);
  const moves = [[4, 'x'], [0, 'o'], [2, 'x'], [6, 'o'], [3, 'x'], [5, 'o'], [8, 'x'], [7, 'o'], [1, 'x']];
  const marks = moves.map(([i, m], n) => {
    const [x, y] = cells[i];
    return m === 'x'
      ? `<path class="mk" data-n="${n}" d="M${x - 11} ${y - 11}L${x + 11} ${y + 11}M${x + 11} ${y - 11}L${x - 11} ${y + 11}" stroke="${C.accent}"/>`
      : `<circle class="mk" data-n="${n}" cx="${x}" cy="${y}" r="12" stroke="${C.paper}"/>`;
  }).join('');

  el.innerHTML = svg(400, 230, `
    <g fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2.5" stroke-linecap="round">
      <path d="M40 34v-14h14M146 20h14v14M160 168v14h-14M54 182H40v-14"/>
    </g>
    <g fill="${C.slate}">${dots}</g>
    <rect class="scan" x="40" y="20" width="120" height="3" rx="1.5" fill="${C.accent}" opacity=".9"/>
    <g class="badge" opacity="0">
      <rect x="44" y="194" width="112" height="24" rx="12" fill="rgba(245,181,46,.15)" stroke="${C.accent}"/>
      <text x="100" y="210.5" text-anchor="middle" font-family="Anybody Variable" font-size="11" font-weight="600" fill="#f2ecf4">Player verified</text>
    </g>
    <g stroke="rgba(255,255,255,.28)" stroke-width="2" stroke-linecap="round">
      <path d="M281 51v114M319 51v114M243 89h114M243 127h114"/>
    </g>
    <g fill="none" stroke-width="5" stroke-linecap="round">${marks}</g>
    <path class="win" d="M262 70L338 146" stroke="#f2ecf4" stroke-width="3" stroke-linecap="round" fill="none" opacity=".9"/>`);

  const q = gsap.utils.selector(el);
  q('.mk, .win').forEach((p) => { const L = p.getTotalLength?.() ?? 80; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
  tl.set(q('.lm'), { opacity: 0.15 })
    .fromTo(q('.scan'), { y: 0 }, { y: 158, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: 1 })
    .to(q('.lm'), { opacity: 1, duration: 0.25, stagger: { each: 0.012, from: 'random' } }, 0.2)
    .to(q('.badge'), { opacity: 1, duration: 0.4 }, '-=0.3');
  q('.mk').forEach((m, i) => tl.to(m, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, `+=${i ? 0.25 : 0.1}`));
  tl.to(q('.win'), { strokeDashoffset: 0, duration: 0.5 }, '+=0.15')
    .to(q('.mk, .win'), { opacity: 0, duration: 0.4 }, '+=1.4')
    .to(q('.badge'), { opacity: 0, duration: 0.3 }, '<')
    .set(q('.mk, .win'), { opacity: 1, strokeDashoffset: (i, t) => t.style.strokeDasharray });
  return tl;
}

// ---------- Shuttle court slot booking ----------
function shuttle(el) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const times = ['6 am', '7 am', '8 am', '5 pm', '6 pm', '7 pm', '8 pm'];
  const booked = new Set(['0-0', '1-4', '2-1', '3-5', '4-0', '5-1', '5-2', '6-2', '0-5', '2-6', '4-4', '6-5', '1-3', '3-1']);
  let cells = '';
  times.forEach((t, r) => {
    cells += `<text x="34" y="${49 + r * 25}" text-anchor="end" class="lbl">${t}</text>`;
    days.forEach((d, c) => {
      const key = `${c}-${r}`, x = 44 + c * 48, y = 34 + r * 25;
      const fill = booked.has(key) ? C.slate : 'none';
      cells += `<rect class="slot${booked.has(key) ? ' taken' : ''}${key === '3-4' ? ' mine' : ''}" x="${x}" y="${y}" width="42" height="20" rx="6" fill="${fill}" fill-opacity="${booked.has(key) ? 0.45 : 0}" stroke="rgba(255,255,255,.16)"/>`;
    });
  });
  days.forEach((d, c) => (cells += `<text x="${65 + c * 48}" y="24" text-anchor="middle" class="lbl">${d}</text>`));
  el.innerHTML = svg(400, 215, `<style>.lbl{font:600 10.5px 'Inter Tight Variable',sans-serif;fill:rgba(242,236,244,.55)}</style>${cells}
    <g class="pointer" opacity="0"><path d="M0 0l0 16 4.5-4 3 7 3-1.4-3-6.8 6-.4z" fill="#f2ecf4" stroke="#0b0b0c" stroke-width="1"/></g>`);

  const q = gsap.utils.selector(el);
  const mine = q('.mine')[0];
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, paused: true });
  tl.from(q('.taken'), { fillOpacity: 0, duration: 0.4, stagger: { each: 0.06, from: 'random' } })
    .set(q('.pointer'), { opacity: 1, x: 330, y: 200 })
    .to(q('.pointer'), { x: 200, y: 145, duration: 0.9, ease: 'power2.inOut' })
    .to(mine, { fill: C.accent, fillOpacity: 0.95, duration: 0.25 })
    .to(mine, { attr: { stroke: '#f2ecf4' }, duration: 0.2 }, '<')
    .to(q('.pointer'), { opacity: 0, duration: 0.3 }, '+=0.6')
    .to(mine, { fillOpacity: 0, duration: 0.4, attr: { stroke: 'rgba(255,255,255,.16)' } }, '+=1.6')
    .to(q('.taken'), { fillOpacity: 0, duration: 0.3 }, '<');
  return tl;
}

// ---------- Twixt ----------
function twixt(el) {
  const N = 12, S = 22, O = 19;
  const at = (c, r) => [O + c * S, O + r * S];
  let holes = '';
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if ((r === 0 || r === N - 1) && (c === 0 || c === N - 1)) continue;
    const [x, y] = at(c, r);
    holes += `<circle cx="${x}" cy="${y}" r="1.8"/>`;
  }
  // Light pegs connect top to bottom with knight-move links; blue tries left to right.
  const red = [[5, 0], [6, 2], [5, 4], [6, 6], [5, 8], [6, 10], [5, 11]];
  const blue = [[0, 6], [2, 5], [4, 6], [1, 8], [3, 9]];
  const seq = [];
  for (let i = 0; i < Math.max(red.length, blue.length); i++) {
    if (red[i]) seq.push(['r', i]);
    if (blue[i]) seq.push(['b', i]);
  }
  const peg = (c, r, col, cls) => { const [x, y] = at(c, r); return `<g class="${cls}"><ellipse cx="${x}" cy="${y + 2.5}" rx="6.5" ry="3" fill="rgba(0,0,0,.45)"/><circle cx="${x}" cy="${y}" r="6.2" fill="${col}"/><circle cx="${x - 1.8}" cy="${y - 2}" r="1.8" fill="rgba(255,255,255,.55)"/></g>`; };
  const link = (a, b, col, cls) => { const [x1, y1] = at(...a), [x2, y2] = at(...b); return `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`; };
  let links = '', pegs = '';
  red.forEach((p, i) => { pegs += peg(...p, C.paper, `pg r${i}`); if (i) links += link(red[i - 1], p, C.paper, `ln lr${i}`); });
  blue.forEach((p, i) => { pegs += peg(...p, C.accent, `pg b${i}`); if (i && i !== 3) links += link(blue[i - 1], p, C.accent, `ln lb${i}`); });
  const W = O * 2 + S * (N - 1);
  el.innerHTML = `<div class="tw-stage" style="position:absolute;inset:0;display:grid;place-items:center;perspective:700px">
    <div class="tw-board" style="width:min(86%,400px);aspect-ratio:1;transform:rotateX(38deg) rotateZ(-14deg);transform-style:preserve-3d">
      ${svg(W, W, `
        <rect x="1" y="1" width="${W - 2}" height="${W - 2}" rx="14" fill="rgba(242,236,244,.06)" stroke="rgba(255,255,255,.14)"/>
        <path d="M${O + S} ${O + S * 0.5}H${O + S * (N - 2)}M${O + S} ${O + S * (N - 1.5)}H${O + S * (N - 2)}" stroke="${C.paper}" stroke-width="2.5" opacity=".5"/>
        <path d="M${O + S * 0.5} ${O + S}V${O + S * (N - 2)}M${O + S * (N - 1.5)} ${O + S}V${O + S * (N - 2)}" stroke="${C.accent}" stroke-width="2.5" opacity=".7"/>
        <g fill="rgba(242,236,244,.32)">${holes}</g>${links}${pegs}`)}
    </div></div>`;
  el.querySelector('svg').style.cssText = 'position:static;width:100%;height:100%;overflow:visible';

  const q = gsap.utils.selector(el);
  q('.ln').forEach((l) => { const L = l.getTotalLength(); l.style.strokeDasharray = L; l.style.strokeDashoffset = L; });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, paused: true });
  tl.set(q('.pg'), { opacity: 0, y: -14 });
  seq.forEach(([side, i]) => {
    tl.to(q(`.${side}${i}`), { opacity: 1, y: 0, duration: 0.28, ease: 'back.out(2.5)' }, '+=0.22');
    const ln = q(`.l${side}${i}`);
    if (ln.length) tl.to(ln, { strokeDashoffset: 0, duration: 0.3 }, '-=0.05');
  });
  tl.to(q('.tw-board'), { rotateZ: -6, duration: 1.4, ease: 'sine.inOut' }, '+=0.4')
    .to(q('.pg, .ln'), { opacity: 0, duration: 0.4 }, '+=0.8')
    .to(q('.tw-board'), { rotateZ: -14, duration: 0.8, ease: 'sine.inOut' }, '<')
    .set(q('.ln'), { opacity: 1, strokeDashoffset: (i, t) => t.style.strokeDasharray });
  return tl;
}

// ---------- Command-line music player ----------
function player(el) {
  const tracks = ['monsoon_drive.mp3', 'chai_break.mp3', 'late_bus_home.mp3', 'exam_week.mp3', 'campus_rain.mp3'];
  el.innerHTML = `<div class="term" style="position:absolute;inset:0;padding:clamp(1rem,2.4vw,1.6rem);font:500 clamp(.72rem,1.05vw,.9rem)/1.65 ui-monospace,'Cascadia Code',Consolas,monospace;color:rgba(242,236,244,.82);display:flex;flex-direction:column;gap:.55rem">
    <div style="color:rgba(242,236,244,.5)">$ ./player ~/music/playlist</div>
    <ol class="tracks" style="list-style:none;padding:0;margin:0">${tracks.map((t, i) => `<li data-i="${i}" style="padding:0 .5rem;border-radius:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span class="cur" style="display:inline-block;width:1.4em">${i ? '' : '▶'}</span>${t}</li>`).join('')}</ol>
    <div class="bars" style="display:flex;align-items:flex-end;gap:3px;height:clamp(2.2rem,5vh,3.5rem);margin-top:auto">${'<i style="flex:1;background:linear-gradient(#f5b52e,#7a5a17);border-radius:2px;height:20%;transform-origin:bottom"></i>'.repeat(28)}</div>
    <div class="prog" style="white-space:pre;overflow:hidden"></div>
    <div style="color:rgba(242,236,244,.45);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">[space] pause  [n] next  [p] prev  [q] quit</div>
  </div>`;
  const items = [...el.querySelectorAll('.tracks li')];
  const bars = [...el.querySelectorAll('.bars i')];
  const prog = el.querySelector('.prog');
  const lens = [195, 168, 224, 181, 207];
  const state = { track: 0, t: 0 };
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const draw = () => {
    const len = lens[state.track], w = 22, f = Math.round((state.t / len) * w);
    prog.textContent = `[${'='.repeat(Math.max(0, f - 1))}${f ? '>' : ''}${'-'.repeat(w - f)}] ${fmt(state.t)} / ${fmt(len)}`;
    items.forEach((li, i) => {
      li.style.background = i === state.track ? 'rgba(245,181,46,.2)' : 'transparent';
      li.style.color = i === state.track ? '#f2ecf4' : '';
      li.querySelector('.cur').textContent = i === state.track ? '▶' : '';
    });
  };
  // Driven by a GSAP timeline so it pauses with the others; tracks skip every few seconds.
  const tl = gsap.timeline({ repeat: -1, paused: true });
  tl.to(state, {
    t: 60, duration: 4, ease: 'none',
    onUpdate() {
      draw();
      bars.forEach((b, i) => (b.style.transform = `scaleY(${0.15 + Math.abs(Math.sin(tl.time() * (3 + (i % 5)) + i * 1.7)) * (0.85 - Math.abs(i - 14) / 30)})`));
    },
    onRepeat() {},
  }).call(() => { state.track = (state.track + 1) % tracks.length; state.t = 0; });
  draw();
  return tl;
}

// ---------- This website: an exploded view of its three layers ----------
function site(el) {
  const layer = (z, style, inner = '') => `<div class="ly" style="position:absolute;inset:0;margin:auto;width:62%;height:58%;border-radius:14px;transform:translateZ(${z}px);border:1px solid rgba(255,255,255,.2);${style}">${inner}</div>`;
  const bar = (l, t, w, h, bg, r = 3) => `<b style="position:absolute;left:${l}%;top:${t}%;width:${w}%;height:${h}%;border-radius:${r}px;background:${bg}"></b>`;
  const key = (bg, label) => `<li style="display:flex;align-items:center;gap:.5rem"><i style="width:.7rem;height:.7rem;border-radius:3px;background:${bg};border:1px solid rgba(255,255,255,.3)"></i>${label}</li>`;
  el.innerHTML = `<div style="position:absolute;inset:0;perspective:900px;display:grid;place-items:center">
    <div class="stack3d" style="position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(56deg) rotateZ(-32deg)">
      ${layer(-70, 'background:radial-gradient(circle,rgba(125,138,163,.7) 1.2px,transparent 1.6px) 0 0/12px 12px,#0b0b0c')}
      ${layer(0, 'background:radial-gradient(40% 50% at 40% 45%,rgba(250,250,250,.18),transparent 70%)')}
      ${layer(70, 'background:rgba(242,236,244,.07)', bar(10, 16, 46, 14, 'rgba(242,236,244,.75)', 4) + bar(10, 40, 70, 6, 'rgba(242,236,244,.35)') + bar(10, 52, 58, 6, 'rgba(242,236,244,.35)') + bar(10, 72, 24, 10, '#f5b52e', 20))}
    </div></div>
    <ul style="position:absolute;left:1rem;bottom:1rem;margin:0;padding:0;list-style:none;display:grid;gap:.3rem;font:600 .8rem 'Inter Tight Variable',sans-serif;color:rgba(242,236,244,.75)">
      ${key('rgba(232,237,245,.5)', 'Page content')}${key('rgba(250,250,250,.4)', 'GSAP motion')}${key('#7d8aa3', 'Live GitHub data')}
    </ul>`;
  const q = gsap.utils.selector(el);
  const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: true, defaults: { ease: 'sine.inOut' } });
  tl.to(q('.stack3d'), { rotateZ: -18, rotateX: 50, duration: 3.5 })
    .to(q('.ly'), { z: (i) => (i - 1) * 105, duration: 3.5 }, 0);
  return tl;
}

const BUILDERS = { faceplay, shuttle, twixt, player, site };

export function mountVisuals(root, { reduced }) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const tl = e.target._tl;
      if (!tl || reduced) continue;
      e.isIntersecting ? tl.play() : tl.pause();
    }
  }, { threshold: 0.25 });
  root.querySelectorAll('[data-visual]').forEach((el) => {
    const build = BUILDERS[el.dataset.visual];
    if (!build) return;
    el._tl = build(el);
    // Reduced motion: show the finished state as a still image.
    if (reduced) el._tl.progress(0.6).pause();
    io.observe(el);
  });
}
