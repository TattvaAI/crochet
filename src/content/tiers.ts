/**
 * THE LADDER
 *
 * The commercial core of the site. Three tiers, ascending.
 * Tier 3 exists so tiers 1 and 2 read as reasonable, and tier 1 is
 * what the brand is actually built around — it is the only tier with
 * a genuinely custom pattern.
 *
 * `days` = working lead time in days. Drives the "Commission by"
 * date calculator on /commission.
 */

export type Tier = {
  id: 'atelier' | 'heritage' | 'gift';
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

export type PieceCategory = 'Blanket' | 'Throw' | 'Shawl' | 'Wrap' | 'Gift';

export const tiers: Tier[] = [
  {
    id: 'atelier',
    index: '01',
    name: 'The Atelier',
    priceMin: 35000,
    priceMax: 90000,
    days: 98,
    summary:
      'A pattern drawn for one recipient and one room. Never repeated, never on the shelf.',
    personalisation: 'Fully bespoke — pattern, fibre, dye, dimensions, names, date',
    includes: [
      'Original pattern developed to your brief',
      'Undyed or hand-dyed specialty yarn, sourced to order',
      'Any dimension, any palette, two names and a date woven in',
      'Hi-res photographic proof, approved before dispatch',
      'Archival cotton storage bag and hand-written care card',
    ],
    applies: ['Blanket', 'Throw', 'Shawl'],
  },
  {
    id: 'heritage',
    index: '02',
    name: 'The Heritage Collection',
    priceMin: 12000,
    priceMax: 22000,
    days: 42,
    summary:
      'Six signature designs, yours to choose. You choose the yarn and the colourway; we keep the stitch.',
    personalisation: 'Fibre, colourway, dimensions, one name or date',
    includes: [
      'Any of the six signature patterns',
      'Choice of yarn weight and colourway',
      'Personalised with a name, date, or monogram edge',
      'Hi-res photographic proof, approved before dispatch',
      'Hand-written care card',
    ],
    applies: ['Blanket', 'Throw', 'Shawl', 'Wrap'],
  },
  {
    id: 'gift',
    index: '03',
    name: 'The Ready Gift',
    priceMin: 4500,
    priceMax: 9000,
    days: 3,
    summary:
      'Small pieces in stock or finished within a weekend. For the date that has already arrived.',
    personalisation: 'Monogram only',
    includes: [
      'Petite wrap, scarf, or a child’s heirloom blanket',
      'Monogrammed edge or corner',
      'Ships in 48–72 hours',
      'Gift-wrapped, price never shown in the parcel',
    ],
    applies: ['Wrap', 'Gift'],
  },
];

export const tierById = (id: Tier['id']) => tiers.find((t) => t.id === id)!;

/** Working lead time in days → human phrasing, e.g. "14 weeks". */
export function leadTimeLabel(days: number): string {
  if (days < 7) return `${days} days`;
  const weeks = Math.round(days / 7);
  return `${weeks} weeks`;
}
