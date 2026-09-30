/** Exercises the interactive features a static render cannot verify. */
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
let fail = 0;
const t = (label, ok, extra='') => { console.log(`  ${ok?'PASS':'FAIL'}  ${label}${extra?'  '+extra:''}`); if(!ok) fail++; };

// 1. Currency switching
await p.goto('http://localhost:4399/commission/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
const inr = await p.textContent('h2:has-text("The Atelier") ~ p, .tnum');
const before = await p.evaluate(() => document.body.innerText.match(/₹[\d,]+/)?.[0]);
await p.click('button:has-text("USD")');
await p.waitForTimeout(700);
const after = await p.evaluate(() => document.body.innerText.match(/\$[\d,]+/)?.[0]);
t('currency INR -> USD', Boolean(before?.startsWith('₹') && after?.startsWith('$')), `${before} -> ${after}`);
// persists across reload
await p.reload({ waitUntil: 'networkidle' });
await p.waitForTimeout(900);
const persisted = await p.evaluate(() => document.body.innerText.match(/\$[\d,]+/)?.[0]);
t('currency persists on reload', Boolean(persisted), String(persisted));
await p.click('button:has-text("INR")'); await p.waitForTimeout(500);

// 2. Date calculator
const d = new Date(Date.now() + 40*86400000).toISOString().slice(0,10);
await p.fill('#delivery', d);
await p.waitForTimeout(800);
const rows = await p.evaluate(() => [...document.querySelectorAll('ul li')].map(e=>e.innerText).filter(t=>/days|weeks/.test(t)));
t('calculator renders 3 tier rows', rows.length === 3, `got ${rows.length}`);
t('atelier closed at +40d', /CLOSED/i.test(rows[0]||''), (rows[0]||'').match(/CLOSED[^\n]*/i)?.[0]||'');
t('ready gift open at +40d', /OPEN/i.test(rows[2]||''), (rows[2]||'').match(/(OPEN|CLOSED)[^\n]*/i)?.[0]||'');
t('ready shows days not weeks', /3 days/.test(rows[2]||''));

// 3. Accordion
// NOTE: `details` also matches the mobile nav menu, which is
// display:none on desktop and would always measure 0px. Select the
// FAQ by its text, and scroll it into view first so the reveal
// animation has run before measuring.
await p.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1000);
const acc = p.locator('details').filter({ hasText: 'How long does it actually take?' });
await acc.scrollIntoViewIfNeeded();
await p.waitForTimeout(1000);
const closedH = await acc.evaluate(e => e.getBoundingClientRect().height);
await acc.locator('summary').click();
await p.waitForTimeout(500);
const openH = await acc.evaluate(e => e.getBoundingClientRect().height);
const isOpen = await acc.evaluate(e => e.open);
t('FAQ accordion opens', isOpen === true && openH > closedH, `${Math.round(closedH)}px -> ${Math.round(openH)}px`);

// 4. Mobile nav
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
await m.waitForTimeout(900);
const burger = await m.$('summary:has-text("Menu")');
t('mobile menu button exists', Boolean(burger));
if (burger) { await burger.click(); await m.waitForTimeout(400);
  const link = await m.$('a[href="/commission/"]');
  t('mobile menu reveals links', Boolean(link)); }
await m.close();

await b.close();
console.log(`\n${fail===0?'All interactive checks pass.':fail+' check(s) failed.'}`);
process.exit(fail===0?0:1);
