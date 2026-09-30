/** Measures first paint and confirms no external blocking font request. */
import { chromium } from 'playwright';
const b = await chromium.launch();

for (const [label, url] of [['home','/'],['commission','/commission/'],['contact','/contact/']]) {
  const p = await b.newPage();
  const external = [];
  p.on('request', r => { const u=r.url(); if(!u.startsWith('http://localhost:4399') && !u.startsWith('data:')) external.push(u); });
  const t0 = Date.now();
  await p.goto('http://localhost:4399'+url, { waitUntil: 'load' });
  const loadMs = Date.now()-t0;
  await p.waitForLoadState('networkidle').catch(()=>{});
  const m = await p.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    return {
      ttfb: Math.round(nav?.responseStart ?? 0),
      dcl: Math.round(nav?.domContentLoadedEventEnd ?? 0),
      fcp: fcp ? Math.round(fcp.startTime) : null,
    };
  });
  console.log(`  ${label.padEnd(11)} FCP=${String(m.fcp).padStart(5)}ms  DCL=${String(m.dcl).padStart(5)}ms  load=${String(loadMs).padStart(5)}ms  external=${external.length}`);
  if (external.length) external.slice(0,3).forEach(e=>console.log('       ext:', e.slice(0,90)));
  await p.close();
}
await b.close();
