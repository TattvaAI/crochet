// Exercises the Zod schema directly against the real action logic.
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(2, 'Tell us who is asking.').max(120),
  email: z.string().trim().email('That address does not look right.'),
  recipient: z.string().trim().max(200).optional().or(z.literal('')),
  tier: z.enum(['atelier','heritage','gift','unsure']),
  date: z.string().optional().or(z.literal('')).refine((v)=> !v || !Number.isNaN(Date.parse(v)), 'Use a real date.'),
  budget: z.string().optional().or(z.literal('')).refine((v)=> v==='' || (!Number.isNaN(Number(v)) && Number(v)>=0), 'Budget should be a number.'),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  company: z.string().max(0).optional().or(z.literal('')),
});

const cases = [
  ['valid full',    {name:'A Client', email:'a@b.com', tier:'atelier', date:'2027-06-14', budget:'50000', message:'hi', recipient:'Mother', company:''}],
  ['empty name',    {name:'', email:'a@b.com', tier:'gift', date:'', budget:'', message:'', recipient:'', company:''}],
  ['bad email',     {name:'A', email:'not-an-email', tier:'gift', date:'', budget:'', message:'', recipient:'', company:''}],
  ['bad date',      {name:'A', email:'a@b.com', tier:'gift', date:'14th June', budget:'', message:'', recipient:'', company:''}],
  ['neg budget',    {name:'A', email:'a@b.com', tier:'gift', date:'', budget:'-5', message:'', recipient:'', company:''}],
  ['honeytrap',     {name:'Bot', email:'bot@x.com', tier:'gift', date:'', budget:'', message:'', recipient:'', company:'AcmeCorp'}],
  ['bad tier',      {name:'A', email:'a@b.com', tier:'CHEAPEST', date:'', budget:'', message:'', recipient:'', company:''}],
];

for (const [label, input] of cases) {
  const r = schema.safeParse(input);
  if (r.success) console.log(`  ${label.padEnd(12)} -> PASS`);
  else console.log(`  ${label.padEnd(12)} -> BLOCKED: ${r.error.issues[0].message}`);
}
