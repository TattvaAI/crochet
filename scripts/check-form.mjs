/**
 * End-to-end enquiry form test.
 *
 * Three things this test has to get right, all learned the hard way:
 *  1. `.meta` applies text-transform:uppercase, so body innerText
 *     comes back uppercased — match case-insensitively.
 *  2. Each scenario needs a FRESH page. Reusing one page after a
 *     success submit tests a form that no longer exists.
 *  3. Date inputs need the native value setter + input/change events
 *     for React to see the change.
 */
import { chromium } from 'playwright';

const URL = 'http://localhost:4399/contact/';
const b = await chromium.launch();
let fail = 0;
const t = (l, ok, x='') => { console.log(`  ${ok?'PASS':'FAIL'}  ${l}${x?'  '+x:''}`); if(!ok) fail++; };

async function fresh() {
  const p = await b.newPage({ viewport: { width: 1440, height: 1100 } });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  return p;
}
async function setDate(p, v) {
  await p.evaluate((val) => {
    const el = document.querySelector('#date');
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set.call(el, val);
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
  }, v);
}
const body = (p) => p.evaluate(() => document.body.innerText);

// ── 1. Empty submit ────────────────────────────────────────────
{
  const p = await fresh();
  await p.click('button[type=submit]'); await p.waitForTimeout(1800);
  const txt = await body(p);
  t('empty submit blocked with inline error', /Tell us who is asking/i.test(txt));
  t('empty submit shows no false success', !/Thank you/i.test(txt));
  t('name aria-invalid set', (await p.getAttribute('#name','aria-invalid')) === 'true');
  t('error linked via aria-describedby', (await p.getAttribute('#name','aria-describedby')) === 'err-name');
  await p.close();
}

// ── 2. Malformed email ─────────────────────────────────────────
{
  const p = await fresh();
  await p.fill('#name','Priya Sharma');
  await p.fill('#email','not-an-email');
  await p.click('button[type=submit]'); await p.waitForTimeout(1800);
  t('malformed email rejected', /does not look right/i.test(await body(p)));
  t('email aria-invalid set', (await p.getAttribute('#email','aria-invalid')) === 'true');
  await p.close();
}

// ── 3. Past delivery date ──────────────────────────────────────
{
  const p = await fresh();
  await p.fill('#name','Priya Sharma');
  await p.fill('#email','priya@example.com');
  await setDate(p, '2020-01-01');
  await p.click('button[type=submit]'); await p.waitForTimeout(1800);
  t('past delivery date rejected', /already passed/i.test(await body(p)));
  t('form still present after date error', (await p.locator('form').count()) === 1);
  await p.close();
}

// ── 4. Valid submission ────────────────────────────────────────
{
  const p = await fresh();
  await p.fill('#name','Priya Sharma');
  await p.fill('#email','priya@example.com');
  await p.fill('#recipient','Her mother');
  await p.selectOption('#tier','heritage');
  await setDate(p, '2027-06-14');
  await p.fill('#budget','18000');
  await p.fill('#message','For a sofa, cream palette.');
  await p.click('button[type=submit]'); await p.waitForTimeout(2500);
  t('valid submit replaces the form', (await p.locator('form').count()) === 0);
  t('success panel rendered', (await p.locator('h3:has-text("Thank you")').count()) === 1);
  t('success promises a reply time', /two working days/i.test(await body(p)));
  await p.close();
}

// ── 5. Honeypot ────────────────────────────────────────────────
{
  const p = await fresh();
  await p.evaluate(() => {
    const i=document.createElement('input');
    i.type='text'; i.name='company'; i.value='AcmeCorp';
    i.style.cssText='position:absolute;left:-9999px';
    document.querySelector('form').appendChild(i);
    document.querySelector('#name').value='Bot';
    document.querySelector('#email').value='bot@spam.com';
  });
  await p.click('button[type=submit]'); await p.waitForTimeout(2200);
  t('honeypot silently discarded', (await p.locator('h3:has-text("Thank you")').count()) === 1);
  await p.close();
}

await b.close();
console.log(`\n${fail===0 ? 'Form works end to end.' : fail+' check(s) failed.'}`);
process.exit(fail===0 ? 0 : 1);
