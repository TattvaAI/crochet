/**
 * Browser-level error sweep. Catches what curl cannot:
 * console errors, page exceptions, failed network requests,
 * and hydration mismatches.
 */
import { chromium } from 'playwright';

const pages = ['/', '/work/', '/commission/', '/materials/', '/about/', '/contact/'];
const b = await chromium.launch();
let totalIssues = 0;

for (const url of pages) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [], failedReqs = [], badStatus = [];

  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 180)); });
  p.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e).slice(0, 180)));
  p.on('requestfailed', (r) => failedReqs.push(`${r.url().split('/').pop()} (${r.failure()?.errorText})`));
  p.on('response', (r) => { if (r.status() >= 400) badStatus.push(`${r.status()} ${r.url().replace('http://localhost:4399','')}`); });

  await p.goto('http://localhost:4399' + url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1600);
  // trigger scroll-reveal components, then settle
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await p.waitForTimeout(900);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(500);

  const issues = [...errors.map(e=>'console: '+e), ...failedReqs.map(f=>'reqfail: '+f), ...badStatus.map(s=>'http: '+s)];
  totalIssues += issues.length;
  console.log(`${issues.length ? 'FAIL' : 'PASS'}  ${url.padEnd(13)} ${issues.length ? '' : 'no console/network errors'}`);
  issues.forEach(i => console.log('        ', i));
  await p.close();
}
await b.close();
console.log(`\n${totalIssues === 0 ? 'No runtime errors on any page.' : totalIssues + ' issue(s) found.'}`);
process.exit(totalIssues === 0 ? 0 : 1);
