/**
 * THE LADDER
 *
 * Three tiers of crochet commissions, ascending in lead time and scope.
 * The Ready Gift ships quickly for near dates; The Signature Collection
 * offers proven studio patterns with personal colour and text details;
 * Bespoke develops an original character or portrait piece from your brief.
 *
 * `days` = working lead time in days. Drives the Commission-by
 * date calculator on /commission.
 */

export type Tier = {
  id: 'ready' | 'signature' | 'bespoke';
  index: string;
  name: string;
  priceMin: number;
  priceMax: number;
  days: number;
  summary: string;
  personalisation: string;
  includes: string[];
  /** Which object categories this tier can be commissioned in. */
  applies: PieceCategory[];
};

export type PieceCategory = 'Plushie' | 'Doll' | 'Bag' | 'Keychain' | 'Hat';

export const tiers: Tier[] = [
  {
    id: 'ready',
    index: '01',
    name: 'The Ready Gift',
    priceMin: 600,
    priceMax: 2500,
    days: 7,
    summary:
      'Small pieces that ship fast: keychains, charms, mini accessories.',
    personalisation: 'Colour choice',
    includes: [
      'Keychains, charms, or mini accessories',
      'Choice of colour palette',
      'Ships in about 1 week',
      'Gift-wrapped with hand-written care card',
    ],
    applies: ['Keychain'],
  },
  {
    id: 'signature',
    index: '02',
    name: 'The Signature Collection',
    priceMin: 2500,
    priceMax: 8000,
    days: 28,
    summary:
      'Medium and large plushies, dolls, and bags in signature designs.',
    personalisation: 'Colourway plus name or date',
    includes: [
      'Signature plushies, dolls, bags, or hats',
      'Choice of colourway',
      'Personalised with a name or date',
      'Photographic proof before dispatch',
      'Hand-written care card',
    ],
    applies: ['Plushie', 'Doll', 'Bag', 'Hat'],
  },
  {
    id: 'bespoke',
    index: '03',
    name: 'Bespoke',
    priceMin: 8000,
    priceMax: 20000,
    days: 56,
    summary:
      'A fully custom character or piece developed with you.',
    personalisation: 'Custom design developed from your photos or brief',
    includes: [
      'Custom character or portrait piece developed to your brief',
      'Plush-touch yarn, sourced per piece',
      'Photographic proof before dispatch',
      'Revisions agreed before proof approval',
      'Archival storage bag and hand-written care card',
    ],
    applies: ['Plushie', 'Doll'],
  },
];

export const tierById = (id: Tier['id']) => tiers.find((t) => t.id === id)!;

/** Working lead time in days → human phrasing, e.g. "4 weeks". */
export function leadTimeLabel(days: number): string {
  if (days < 7) return `${days} days`;
  const weeks = Math.round(days / 7);
  return `${weeks} weeks`;
}
