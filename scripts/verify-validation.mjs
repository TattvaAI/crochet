import { z } from 'zod';

/** Mirrors src/app/actions.ts enquirySchema exactly, for field-level verification. */
const schema = z.object({
  name: z.string().trim().min(2, 'Tell us who is asking.').max(120),
  email: z.string().trim().email('That address does not look right.'),
  recipient: z.string().trim().max(200).optional().or(z.literal('')),
  tier: z.enum(['atelier', 'heritage', 'gift', 'unsure']),
  date: z.string().optional().or(z.literal('')).refine((v) => !v || !Number.isNaN(Date.parse(v)), 'Use a real date.'),
  budget: z.string().optional().or(z.literal('')).refine((v) => v === '' || (!Number.isNaN(Number(v)) && Number(v) >= 0), 'Budget should be a number.'),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  company: z.string().max(0).optional().or(z.literal('')),
});

const base = {
  name: 'Priya Sharma',
  email: 'priya@example.com',
  recipient: 'Her mother',
  tier: 'heritage',
  date: '2027-06-14',
  budget: '18000',
  message: 'For a sofa, cream palette.',
  company: '',
};

// Each case changes exactly ONE field, so a failure isolates cleanly.
const cases = [
  ['all valid', {}, true],
  ['name too short', { name: 'A' }, false],
  ['email malformed', { email: 'not-an-email' }, false],
  ['tier not in enum', { tier: 'CHEAPEST' }, false],
  ['date unparseable', { date: '14th June' }, false],
  ['budget negative', { budget: '-5' }, false],
  ['budget non-numeric', { budget: 'lots' }, false],
  ['honeypot filled', { company: 'AcmeCorp' }, false],
  ['message over max', { message: 'x'.repeat(4001) }, false],
  ['optional fields empty', { recipient: '', date: '', budget: '', message: '' }, true],
  ['future date ok', { date: '2030-01-01' }, true],
];

let pass = 0;
let fail = 0;
for (const [label, patch, shouldPass] of cases) {
  const r = schema.safeParse({ ...base, ...patch });
  const got = r.success;
  const ok = got === shouldPass;
  if (ok) pass++;
  else fail++;
  const detail = r.success ? '' : ` -> ${r.error.issues[0].path.join('.')}: ${r.error.issues[0].message}`;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(24)} expected=${shouldPass ? 'accept' : 'reject'} got=${got ? 'accept' : 'reject'}${detail}`);
}
console.log(`\n  ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
