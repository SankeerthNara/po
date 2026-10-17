import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { mountVisuals } from './visuals.js';

gsap.registerPlugin(ScrollTrigger);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
history.scrollRestoration = 'manual'; // always start at the top so the intro plays

// Wraps each word of el's text in a span, keeping inline elements like <mark>.
function splitWords(el) {
  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.ELEMENT_NODE) { walk(child); continue; }
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(part);
        const s = document.createElement('span');
        s.className = 'w';
        s.textContent = part;
        frag.append(s);
      });
      child.replaceWith(frag);
    }
  };
  walk(el);
  return $$('.w', el);
}

// ---------- Smooth scroll ----------
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.addEventListener('refresh', () => lenis.resize());
  if (import.meta.env.DEV) window.__lenis = lenis;
}

// ---------- Marquees: loop forever, speed up and flip with scroll direction ----------
if (!reduced) {
  const loops = $$('.band-track, .logos-track').map((track) => gsap.to(track, { xPercent: -50, repeat: -1, ease: 'none', duration: track.closest('.logos') ? 40 : 22 }));
  let dir = 1;
  lenis.on('scroll', ({ velocity }) => {
    if (velocity) dir = Math.sign(velocity);
    const speed = dir * (1 + Math.min(Math.abs(velocity) / 6, 4));
    loops.forEach((l) => gsap.to(l, { timeScale: speed, duration: 0.3, overwrite: true }));
  });
}

// ---------- Intro: black screen, the portrait card brightens out of it, the name slides up ----------
function intro() {
  html.classList.remove('js-pre');
  if (reduced) return;
  html.classList.add('loading');
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .set('.hero-card', { filter: 'brightness(0.1)', scale: 1.12 })
    .to('.loader', { opacity: 0, duration: 0.9, ease: 'power2.inOut', onComplete: () => html.classList.remove('loading') }, 0.35)
    .to('.hero-card', { filter: 'brightness(1)', scale: 1, duration: 1.8 }, 0.45)
    .from('.hero-title .line > span', { yPercent: 110, duration: 1.3, stagger: 0.12 }, 0.9)
    .from('.nav', { yPercent: -100, opacity: 0, duration: 1 }, 1.1)
    .from('.hero-intro, .chips li, .stats > div', { y: 24, opacity: 0, duration: 1, stagger: 0.07 }, 1.25)
    .from('.notch, .hero-side > *', { scale: 0, duration: 0.9, stagger: 0.08, ease: 'back.out(1.8)' }, 1.4);
  gsap.to('.hero-portrait', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
}
Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(intro);

// ---------- About: radiating capsules behind the portrait turn with scroll ----------
const ring = $('.petal-ring');
ring.innerHTML = `<defs><linearGradient id="cap" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#e6e6e6"/><stop offset="1" stop-color="#8f8f8f"/></linearGradient></defs>${Array.from(
  { length: 16 },
  (_, i) => `<rect x="70" y="-34" width="230" height="68" rx="34" fill="url(#cap)" transform="rotate(${i * 22.5})"/>`,
).join('')}`;
if (!reduced) {
  gsap.fromTo(ring, { rotate: -25, scale: 0.85 }, { rotate: 25, scale: 1, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo(splitWords($('.statement')), { opacity: 0.18 }, {
    opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: '.statement', start: 'top 82%', end: 'bottom 55%', scrub: true },
  });
}

// ---------- What I do: the outline number drifts in as each panel arrives ----------
if (!reduced) {
  $$('.service').forEach((svc) => {
    gsap.from($('.svc-num', svc), { xPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: svc, start: 'top 90%', end: 'top 20%', scrub: true } });
    gsap.from($$('li', svc), { y: 16, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: svc, start: 'top 45%' } });
  });
}

// ---------- Projects: cards stick and stack; the one underneath shrinks and darkens ----------
mountVisuals(document, { reduced });
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  const cards = $$('.card');
  cards.slice(0, -1).forEach((card, i) => {
    gsap.to(card, { scale: 0.9, '--dim': 0.55, ease: 'none', scrollTrigger: {
        // Finish when the next card reaches its sticky spot (9vh on desktop, 4.5rem on phones).
        trigger: cards[i + 1], start: 'top bottom', end: () => `top ${parseFloat(getComputedStyle(cards[i + 1]).top)}px`, scrub: true, invalidateOnRefresh: true,
      } });
  });
});

// "view" bubble follows the cursor over project images.
const bubble = $('.view-cursor');
if (canHover && !reduced) {
  const xTo = gsap.quickTo(bubble, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(bubble, 'y', { duration: 0.45, ease: 'power3' });
  gsap.set(bubble, { xPercent: -50, yPercent: -50, scale: 0 });
  $$('.card-visual').forEach((v) => {
    v.addEventListener('pointerenter', (e) => { gsap.set(bubble, { x: e.clientX, y: e.clientY }); gsap.to(bubble, { scale: 1, duration: 0.4, ease: 'back.out(2)', overwrite: 'auto' }); });
    v.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); });
    v.addEventListener('pointerleave', () => gsap.to(bubble, { scale: 0, duration: 0.3, overwrite: 'auto' }));
  });
}

// ---------- Featured contributions: avatar switcher, auto-advancing until someone picks one ----------
{
  const box = $('.quotes');
  const quotes = $$('.quote', box), avatars = $$('.avatar', box), now = $('.qc-now', box);
  if (!reduced) box.classList.add('live');
  let current = 0, timer = null;
  const show = (i) => {
    if (i === current) return;
    quotes[current].classList.remove('on');
    avatars[current].classList.remove('on');
    quotes[i].classList.add('on');
    avatars[i].classList.add('on');
    now.textContent = String(i + 1).padStart(2, '0');
    if (!reduced) gsap.fromTo($$('.w', quotes[i]), { opacity: 0.15 }, { opacity: 1, duration: 0.5, stagger: 0.025, ease: 'power2.out' });
    current = i;
  };
  quotes.forEach((q) => splitWords($('blockquote', q)));
  avatars.forEach((a, i) => a.addEventListener('click', () => { clearInterval(timer); show(i); }));
  if (!reduced) {
    ScrollTrigger.create({
      trigger: box, start: 'top 70%', end: 'bottom top',
      onToggle: ({ isActive }) => { clearInterval(timer); if (isActive) timer = setInterval(() => show((current + 1) % quotes.length), 6000); },
    });
  }
}

// ---------- Problem solving: numbers count up, bars grow, the rating line draws ----------
if (!reduced) {
  $$('.cp-card').forEach((card) => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    $$('[data-count]', card).forEach((el) => {
      const n = { v: 0 };
      el.textContent = '0'; // counts up when the card scrolls in
      tl.to(n, { v: +el.dataset.count, duration: 1.6, onUpdate: () => (el.textContent = Math.round(n.v)) }, 0);
    });
    tl.from($$('.cp-bars i', card), { scaleX: 0, duration: 1.2, stagger: 0.12 }, 0.1);
    const line = $('.rate', card);
    if (line) {
      const len = line.getTotalLength();
      tl.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 0.1)
        .from($$('circle', card), { scale: 0, transformOrigin: 'center', duration: 0.5, stagger: 0.25, ease: 'back.out(2)' }, 0.4);
    }
    ScrollTrigger.create({ trigger: card, start: 'top 80%', once: true, onEnter: () => tl.play() });
  });
}

// ---------- Theme toggle (initial theme is set inline in index.html before paint) ----------
{
  const btn = $('.theme-toggle');
  const meta = $('meta[name="theme-color"]');
  const apply = (t) => {
    html.dataset.theme = t;
    btn.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} theme`);
    meta.content = t === 'dark' ? '#161513' : '#f3f1ec';
  };
  apply(html.dataset.theme || 'light');
  btn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch {}
    // Cross-fade the whole page where supported; otherwise switch instantly.
    if (document.startViewTransition && !reduced) document.startViewTransition(() => apply(next));
    else apply(next);
  });
}

// Back-to-top button appears once the hero is out of view.
ScrollTrigger.create({ trigger: '.hero', start: 'bottom 80%', onToggle: ({ isActive }) => $('.totop').classList.toggle('show', isActive), end: 'max' });

// Opening a repo row changes page height; re-measure.
$$('.repo details').forEach((d) => d.addEventListener('toggle', () => ScrollTrigger.refresh()));

// ---------- Contact: the portrait rises and brightens as the footer comes up ----------
if (!reduced) {
  gsap.fromTo('.contact-portrait', { yPercent: 14, filter: 'grayscale(1) contrast(1.1) brightness(0.45)' }, {
    yPercent: 0, filter: 'grayscale(1) contrast(1.1) brightness(1)', ease: 'none',
    scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top top', scrub: true },
  });
}
