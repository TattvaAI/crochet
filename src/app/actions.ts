'use server';

import { z } from 'zod';
import { site } from '@/lib/site';

/**
 * ENQUIRY SUBMISSION
 *
 * Design notes:
 *  - Zod is the single source of truth for validation. The client
 *    form does not duplicate these rules; it renders whatever the
 *    action returns. One definition, one place to change.
 *  - Delivery is behind a small adapter. Swap `deliver` for your
 *    real transport (Resend, Postmark, a Sheet, a Notion row)
 *    without touching the action or the form.
 *  - Honeypot + in-memory rate limit. Not a bot fortress, but it
 *    stops the naive scrapers that hit a form on day one.
 */

export type EnquiryState = {
  status: 'idle' | 'error' | 'success';
  errors?: Partial<Record<'name' | 'email' | 'date' | 'budget' | 'message', string>>;
  formError?: string;
};

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Tell us who is asking.')
    .max(120, 'That is longer than it should be.'),
  email: z
    .string()
    .trim()
    .email('That address does not look right.'),
  recipient: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal('')),
  tier: z.enum(['atelier', 'heritage', 'gift', 'unsure']),
  date: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), 'Use a real date.'),
  budget: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (v) => v === '' || (!Number.isNaN(Number(v)) && Number(v) >= 0),
      'Budget should be a number.',
    ),
  message: z
    .string()
    .trim()
    .max(4000, 'That is longer than the form allows.')
    .optional()
    .or(z.literal('')),
  // Honeypot — must stay empty. Not exposed to humans.
  company: z.string().max(0).optional().or(z.literal('')),
});

export type Enquiry = z.infer<typeof enquirySchema>;

/* ── Rate limiting ──────────────────────────────────────────────
   In-memory, per-instance. Correct for a single-node Vercel
   deployment; swap for Upstash Redis if this ever needs to scale
   horizontally. Twelve enquiries an hour per client is generous
   for a commission business. */
const RATE_LIMIT = { max: 8, windowMs: 60 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

/* ── Delivery adapter ───────────────────────────────────────────
   Replace the body of this function with a real transport.
   Everything else stays as it is. */
async function deliver(enquiry: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? `Enquiries <onboarding@resend.dev>`;

  const body = [
    `Name:     ${enquiry.name}`,
    `Email:    ${enquiry.email}`,
    `Recipient:${enquiry.recipient || '—'}`,
    `Tier:     ${enquiry.tier}`,
    `Needed:   ${enquiry.date || '—'}`,
    `Budget:   ${enquiry.budget ? `₹${enquiry.budget}` : '—'}`,
    '',
    enquiry.message || '(no message)',
  ].join('\n');

  if (!apiKey || !to) {
    // No transport configured — log rather than silently discard.
    console.info('[enquiry]', body);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `Commission enquiry — ${enquiry.name}${enquiry.recipient ? ` → for ${enquiry.recipient}` : ''}`,
      text: body,
    }),
  });

  if (!res.ok) {
    // Surface the failure to the user rather than pretending to
    // have sent it. A silent success on a failed send is the worst
    // possible failure mode for an enquiry.
    throw new Error(`Delivery failed: ${res.status}`);
  }
}

export async function enquiryAction(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;

  // Honeypot: return a fake success so bots do not learn anything.
  if (raw.company) {
    return { status: 'success' };
  }

  const clientKey =
    raw.email?.toLowerCase().trim() || `anon:${String(formData.get('name') ?? '').slice(0, 40)}`;
  if (rateLimited(clientKey)) {
    return {
      status: 'error',
      formError: 'Several enquiries have already come from this address today. Write directly if it is urgent.',
    };
  }

  const parsed = enquirySchema.safeParse({
    name: raw.name ?? '',
    email: raw.email ?? '',
    recipient: raw.recipient ?? '',
    tier: raw.tier ?? 'unsure',
    date: raw.date ?? '',
    budget: raw.budget ?? '',
    message: raw.message ?? '',
    company: raw.company ?? '',
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const errors: EnquiryState['errors'] = {};
    if (flat.name?.[0]) errors.name = flat.name[0];
    if (flat.email?.[0]) errors.email = flat.email[0];
    if (flat.date?.[0]) errors.date = flat.date[0];
    if (flat.budget?.[0]) errors.budget = flat.budget[0];
    if (flat.message?.[0]) errors.message = flat.message[0];
    return { status: 'error', errors };
  }

  // A date already in the past is worth flagging — the calculator
  // will tell them it is closed, but a human should still know.
  if (parsed.data.date && Date.parse(parsed.data.date) < Date.now() - 86_400_000) {
    return {
      status: 'error',
      errors: { date: 'That date has already passed.' },
    };
  }

  try {
    await deliver(parsed.data);
  } catch (err) {
    console.error('[enquiry] delivery error', err);
    return {
      status: 'error',
      formError: `Something went wrong sending this. Please email ${site.email} directly and we will pick it up.`,
    };
  }

  return { status: 'success' };
}
