import type { PieceCategory, Tier } from './tiers';

/**
 * THE WORK
 *
 * Placeholder photography. Replace `image` with your own path
 * (e.g. '/work/moss-granny.jpg') and drop the file into /public/work.
 * If the file is missing the site renders a tonal placeholder tile
 * rather than a broken image — so you can deploy before shooting.
 */

export type Piece = {
  slug: string;
  title: string;
  category: PieceCategory;
  tier: Tier['id'];
  material: string;
  hours: number;
  dimensions: string;
  priceInr: number;
  image: string;
  /** Editorial note. Two or three lines, never marketing copy. */
  note: string;
  /** Dominant tone, used for the placeholder tile. */
  swatch: string;
};

export const pieces: Piece[] = [
  {
    slug: 'moss-granny',
    title: 'Moss',
    category: 'Blanket',
    tier: 'atelier',
    material: 'Undyed Mule’s Fiber cashmere, undyed Lambswool',
    hours: 340,
    dimensions: '220 × 240 cm',
    priceInr: 78000,
    image: '/work/moss-granny.jpg',
    note: 'Six shades of undyed fleece, graded by micron. No dye, no two skeins identical.',
    swatch: '#8a8578',
  },
  {
    slug: 'seafoam-square',
    title: 'Seafoam',
    category: 'Throw',
    tier: 'heritage',
    material: 'Merino-silk, seafoam',
    hours: 96,
    dimensions: '140 × 180 cm',
    priceInr: 16500,
    image: '/work/seafoam-square.jpg',
    note: 'Signature granny stripe, joined flat with a mattress stitch so the seam disappears.',
    swatch: '#9fb3a8',
  },
  {
    slug: 'heirloom- wrap',
    title: 'Heirloom Wrap',
    category: 'Wrap',
    tier: 'gift',
    material: 'Mulberry silk, undyed',
    hours: 18,
    dimensions: '60 × 200 cm',
    priceInr: 7200,
    image: '/work/heirloom-wrap.jpg',
    note: 'Monogrammed at the corner. The piece most often sent without the giver named.',
    swatch: '#d8cbb6',
  },
  {
    slug: 'ash-herringbone',
    title: 'Ash',
    category: 'Throw',
    tier: 'heritage',
    material: 'Cashmere-merino, ash grey',
    hours: 120,
    dimensions: '150 × 200 cm',
    priceInr: 19000,
    image: '/work/ash-herringbone.jpg',
    note: 'Herringbone worked in two greys only — the pattern does the work, not the colour.',
    swatch: '#a8a49c',
  },
  {
    slug: 'the- long shawl',
    title: 'The Long Shawl',
    category: 'Shawl',
    tier: 'atelier',
    material: 'Baby cashmere, madder-dyed',
    hours: 280,
    dimensions: '70 × 240 cm',
    priceInr: 65000,
    image: '/work/long-shawl.jpg',
    note: 'Pattern drafted around one pair of shoulders. Eleven hundred hours became one hundred and forty.',
    swatch: '#a05a4a',
  },
  {
    slug: 'first- blanket',
    title: 'First',
    category: 'Gift',
    tier: 'gift',
    material: 'Cotton-linen, undyed',
    hours: 22,
    dimensions: '90 × 120 cm',
    priceInr: 6500,
    image: '/work/first-blanket.jpg',
    note: 'Woven edge, no stretch, made to be dragged behind a small person for ten years.',
    swatch: '#cfc4b2',
  },
];

export const featured = pieces.slice(0, 4);

export const categories: PieceCategory[] = [
  'Blanket',
  'Throw',
  'Shawl',
  'Wrap',
  'Gift',
];

/**
 * PROCESS — the studio sequence, shot as real photographs.
 * `image` paths map to /public/process/.
 */
export type Step = {
  n: string;
  title: string;
  body: string;
  duration: string;
  image: string;
};

export const process: Step[] = [
  {
    n: '01',
    title: 'Enquiry',
    body: 'Tell us who it is for, where it will live, and the date it needs to arrive. We reply within two working days with a straight answer on whether we are the right hands for it.',
    duration: '2 days',
    image: '/process/enquiry.jpg',
  },
  {
    n: '02',
    title: 'Pattern',
    body: 'A sketch or a chart, drawn for that one piece. Dimensions, stitch, tension, and the exact name and date that will be worked into the edge. Nothing is started until this is approved.',
    duration: '1–2 weeks',
    image: '/process/pattern.jpg',
  },
  {
    n: '03',
    title: 'Fibre',
    body: 'Yarn ordered in and left to rest. Undyed, hand-dyed, or chosen from a small working palette. We will tell you the micron weight and where it came from.',
    duration: '1–3 weeks',
    image: '/process/fibre.jpg',
  },
  {
    n: '04',
    title: 'Making',
    body: 'The long part. One piece, no assembly line. You receive three progress photographs, and the studio is closed to new commissions while the work is on the hook.',
    duration: '8–20 weeks',
    image: '/process/making.jpg',
  },
  {
    n: '05',
    title: 'Proof',
    body: 'Finished, blocked, photographed in daylight at full resolution. You approve the piece as it will be dispatched, or we make the change.',
    duration: '1 week',
    image: '/process/proof.jpg',
  },
  {
    n: '06',
    title: 'Dispatch',
    body: 'Folded, never rolled. Cotton storage bag, hand-written care card, and no price anywhere in the parcel.',
    duration: '2–5 days',
    image: '/process/dispatch.jpg',
  },
];

/**
 * MATERIALS — provenance. This page does more for a gift buyer
 * choosing between you and a cheaper hand than any testimonial.
 */
export const materials = [
  {
    fibre: 'Cashmere',
    detail: 'Grade A, 15.5 micron, combed not carded. Mule’s Fiber or Gifu. Softens without pilling for roughly a decade of daily use.',
    use: 'Blankets, throws, shawls',
    swatch: '#c9bda9',
  },
  {
    fibre: 'Merino',
    detail: '18.5 micron, mulesing-free, ZQ-certified New Zealand. Takes dye deeply and holds colour without fading to grey.',
    use: 'Everyday throws, layering',
    swatch: '#9a938a',
  },
  {
    fibre: 'Silk',
    detail: 'Mulberry or bomby, spun for crochet rather than weaving. Adds a dry hand and a faint, natural sheen that catches raking light.',
    use: 'Wraps, summer shawls',
    swatch: '#d3c6ae',
  },
  {
    fibre: 'Undyed',
    detail: 'Flock in its natural coat colour. Graded by micron across a single blanket so the tone shifts are the animal, not the dye bath.',
    use: 'Atelier tier only',
    swatch: '#8a8578',
  },
  {
    fibre: 'Cotton & linen',
    detail: 'Long-staple, OEKO-TEX certified, woven edge. Breathable, washable, and the correct choice for a child’s first blanket.',
    use: 'Gifts, children’s pieces',
    swatch: '#cfc4b2',
  },
  {
    fibre: 'Dye',
    detail: 'Madder root, indigo, and walnut, hand-dyed in small vats. Expect variation between batches. This is the point.',
    use: 'Shawls, signature work',
    swatch: '#a05a4a',
  },
];

/** SWATCH LIBRARY — every stitch used. The most differentiating page
 *  on the site and the cheapest to produce: one afternoon of macro
 *  photography, six images. */
export const swatches = [
  { name: 'Shell', use: 'Edges, blankets', motif: 'shell' as const },
  { name: 'Herringbone', use: 'Throws, texture', motif: 'herring' as const },
  { name: 'Cable rib', use: 'Borders, wraps', motif: 'cable' as const },
  { name: 'Granny stripe', use: 'Signature blanket', motif: 'granny' as const },
  { name: 'Chain loop', use: 'Fine edging', motif: 'chain' as const },
  { name: 'Popcorn', use: 'Shawl texture', motif: 'popcorn' as const },
];

/**
 * TESTIMONIALS
 * Placeholders written in the site's voice so the layout is real.
 * Replace with real client words — recipient-side quotes convert
 * far better than maker-side ones.
 */
export const testimonials = [
  {
    quote:
      'It arrived in a cotton bag with a card in my mother’s handwriting, which is the detail I will still think about in ten years.',
    author: 'A. R.',
    context: 'Gave to his mother, 70th birthday',
  },
  {
    quote:
      'I had been told the twelve weeks would be difficult. I did not find it difficult. There were photographs at week four and week nine and I never once had to ask.',
    author: 'S. M.',
    context: 'Anniversary commission, full Atelier tier',
  },
  {
    quote:
      'The shawl is heavier than I expected and softer than I hoped. It has become the thing I reach for instead of a coat.',
    author: 'K. I.',
    context: 'Self-purchase, Heritage tier',
  },
];

/** FAQ — written to remove the four objections that kill commission sales. */
export const faq = [
  {
    q: 'How long does it actually take?',
    a: 'Fourteen weeks for an Atelier commission, six for Heritage, three days for a Ready Gift. These are working times, not estimates. We do not open more slots than we can finish properly, which is why the atelier books out.',
  },
  {
    q: 'What if I am not sure what they would like?',
    a: 'That is the normal case, and it is why the proof photographs exist. You see the finished piece, in daylight, at full resolution, before anything ships. Revisions to pattern and palette are unlimited before that point. After dispatch, we will mend anything that fails, for the life of the piece.',
  },
  {
    q: 'Do you ship, and how is it packed?',
    a: 'Worldwide, insured, tracked. Every piece is folded rather than rolled — a roll leaves a crease through cashmere that does not come out. It ships in a cotton storage bag with a written care card and no pricing in the parcel.',
  },
  {
    q: 'Is it worth this much?',
    a: 'An Atelier blanket is three hundred and forty hours of one pair of hands. Compare it to the cheapest thing you would leave in a house for thirty years, and then decide. If the answer is that it is too much, the Heritage Collection exists and we would rather you took that than spent badly.',
  },
];
