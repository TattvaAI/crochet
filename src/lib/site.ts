/**
 * SITE CONFIG — the single source of truth.
 *
 * Everything a non-developer needs to change lives in this file and in
 * /content. Images are referenced by path; drop your photos into
 * /public/work and name them to match, or edit the paths here.
 */

export const site = {
  // ─── BRAND ──────────────────────────────────────────────────────
  // Change this one value when you settle on a name. Everything that
  // displays the brand reads from here — nothing is hardcoded.
  name: 'Croch-it',
  wordmark: 'CROCH—IT',
  // Optional: a longer formal name used in the About page and footer.
  legalName: 'Croch-it Atelier',

  // ─── CONTACT ────────────────────────────────────────────────────
  email: 'studio@crochit.com',
  instagram: 'https://instagram.com/crochit',
  instagramHandle: '@crochit',
  location: 'India · Shipping worldwide',
  whatsapp: '+91 XXXXX XXXXX',
} as const;

/**
 * Currency. INR is the base accounting currency; `rate` converts FROM
 * INR INTO each currency.
 *
 * Rates verified 30 Sep 2026 against exchangerate-api.com.
 * 1 INR = $0.0104 · £0.00787 · €0.00919
 *
 * ⚠️ These go stale. A stale rate means you quote a foreign buyer the
 * wrong price — either losing money or pricing yourself out of the
 * market. Re-check quarterly at https://www.exchangerate-api.com and
 * update the four numbers below. Nothing else needs to change.
 */
export const currencies = {
  INR: { symbol: '₹', code: 'INR', rate: 1, locale: 'en-IN' },
  USD: { symbol: '$', code: 'USD', rate: 0.0104, locale: 'en-US' },
  GBP: { symbol: '£', code: 'GBP', rate: 0.00787, locale: 'en-GB' },
  EUR: { symbol: '€', code: 'EUR', rate: 0.00919, locale: 'en-IE' },
} as const;

/** When these were last verified. Surfaced nowhere in the UI — it is
 *  documentation for whoever updates them next. */
export const ratesVerifiedOn = '2026-09-30';

export type CurrencyCode = keyof typeof currencies;
export const defaultCurrency: CurrencyCode = 'INR';

/**
 * Base prices are stored in INR and converted at render time.
 *
 * Rounding is deliberately coarse — a price shown as $1,043 reads as
 * a calculation, a price shown as $1,040 reads as a decision. Luxury
 * pricing should land on round numbers.
 */
export function formatPrice(inr: number, code: CurrencyCode = 'INR'): string {
  const c = currencies[code];
  const converted = inr * c.rate;
  const rounded =
    converted >= 1000
      ? Math.round(converted / 100) * 100
      : Math.round(converted / 10) * 10;
  return `${c.symbol}${rounded.toLocaleString(c.locale)}`;
}
