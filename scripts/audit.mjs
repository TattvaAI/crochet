import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const pages = ['/', '/work/', '/commission/', '/materials/', '/about/', '/contact/'];
let fail = 0;

for (const url of pages) {
  await p.goto('http://localhost:4399' + url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')];
    const btns = [...document.querySelectorAll('button, a')];
    const h1 = document.querySelectorAll('h1').length;
    const unnamed = btns.filter(b => !b.textContent.trim() && !b.getAttribute('aria-label') && !b.querySelector('img[alt]:not([alt=""])')).length;
    // Anti-slop detectors — these should all be ZERO
    const gradients = [...document.querySelectorAll('*')].filter(e => {
      const s = getComputedStyle(e);
      return s.backgroundImage.includes('gradient') && !s.backgroundImage.includes('none');
    }).length;
    const shadows = [...document.querySelectorAll('*')].filter(e => {
      const s = getComputedStyle(e);
      return s.boxShadow !== 'none' && s.boxShadow !== '';
    }).length;
    const rounded = [...document.querySelectorAll('*')].filter(e => {
      const br = getComputedStyle(e).borderRadius;
      return br && br !== '0px' && parseFloat(br) > 6;
    }).length;
    const noAlt = imgs.filter(i => !i.hasAttribute('alt')).length;
    return { h1, unnamed, gradients, shadows, rounded, noAlt, imgs: imgs.length };
  });
  const issues = [];
  if (r.h1 !== 1) issues.push(`h1 count=${r.h1}`);
  if (r.unnamed > 0) issues.push(`unnamed controls=${r.unnamed}`);
  if (r.gradients > 0) issues.push(`gradients=${r.gradients}`);
  if (r.shadows > 0) issues.push(`shadows=${r.shadows}`);
  if (r.rounded > 0) issues.push(`big radii=${r.rounded}`);
  if (r.noAlt > 0) issues.push(`img missing alt=${r.noAlt}`);
  if (issues.length) fail++;
  console.log(`${issues.length ? 'FAIL' : 'PASS'}  ${url.padEnd(13)} imgs=${r.imgs}  ${issues.join(', ') || 'clean'}`);
}
console.log(`\n${fail === 0 ? 'All pages pass.' : fail + ' page(s) with issues.'}`);
await b.close();
