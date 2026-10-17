// Playwright tour of the site, recorded to video. Run via the Playwright MCP `browser_run_code_unsafe`
// (filename: frontend/tools/record.js). Needs the dev server on :5288.
async (page) => {
  const W = 1440, H = 900;
  const ctx = await page.context().browser().newContext({ viewport: { width: W, height: H }, recordVideo: { dir: 'D:/POrtfolio/frontend/tools/video', size: { width: W, height: H } } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5288/');
  await p.waitForTimeout(4200); // black loader -> portrait brightens -> name slides up
  await p.mouse.move(W * 0.25, H * 0.5);

  const top = (sel) => p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
  const go = async (y, secs) => { await p.evaluate(([y, d]) => window.__lenis.scrollTo(y, { duration: d }), [y, secs]); await p.waitForTimeout(secs * 1000 + 300); };

  await go(await top('.band'), 2);                    // about marquee band
  await go(await top('.statement') - 420, 2.4);       // capsules turn, statement fills word by word
  await go(await top('.statement') - 120, 2);
  for (let i = 1; i <= 4; i++) await go(await top(`.service:nth-of-type(${i + 0})`) + 2, 1.8); // sticky panels stack
  await go(await top('.work'), 1.8);
  const cards = await p.$$('.card');
  const cardsTop = await top('.cards');
  const cardH = await p.evaluate(() => document.querySelector('.card').offsetHeight);
  for (let i = 0; i < cards.length; i++) {
    // Card i reaches its sticky spot after the cards before it have scrolled past (height + 6vh margin each).
    const y = cardsTop + i * (cardH + H * 0.06) - H * 0.09;
    await go(y, 1.6);
    const v = await (await p.$$('.card-visual'))[i].boundingBox();
    if (v && v.y > 0 && v.y < H) { await p.mouse.move(v.x + v.width * 0.4, v.y + v.height * 0.5, { steps: 14 }); await p.mouse.move(v.x + v.width * 0.6, v.y + v.height * 0.4, { steps: 14 }); }
    await p.waitForTimeout(500);
  }
  await p.mouse.move(W * 0.97, H * 0.2, { steps: 8 });
  await go(await top('.oss'), 2);
  await go(await top('.quotes') - 40, 1.6);
  const avatars = await p.$$('.avatar');
  for (const a of avatars.slice(1)) { const b = await a.boundingBox(); await p.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await p.waitForTimeout(1500); }
  await go(await top('.oss-list') - 60, 2);
  const s = await (await p.$('.repo summary')).boundingBox();
  await p.mouse.click(s.x + 200, s.y + s.height / 2);
  await p.waitForTimeout(1500);
  await go(await top('.contact') - H * 0.4, 2);       // footer portrait rises and brightens
  await go(await top('.contact'), 2);
  await p.waitForTimeout(2500);                       // "reach out —" marquee

  const video = p.video();
  await ctx.close();
  return await video.path();
}
