// Screenshot key sections to verify the design reads as intended.
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const shots = [
  ['http://localhost:4399/', 'home-top', false],
  ['http://localhost:4399/', 'home-full', true],
  ['http://localhost:4399/commission/', 'commission', false],
  ['http://localhost:4399/work/', 'work', false],
  ['http://localhost:4399/contact/', 'contact', false],
];
for (const [url, name, full] of shots) {
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `/tmp/shot-${name}.png`, fullPage: full });
  console.log('shot', name);
}
// mobile home
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
await m.waitForTimeout(1500);
await m.screenshot({ path: '/tmp/shot-mobile.png' });
console.log('shot mobile');
await b.close();
