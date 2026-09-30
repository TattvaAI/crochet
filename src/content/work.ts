import type { PieceCategory, Tier } from './tiers';

/**
 * THE WORK
 *
 * Catalog of hand-crocheted amigurumi creatures and accessories.
 * Photographs are served from /public/work.
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
    slug: 'cloud-bunny',
    title: 'Cloud Bunny',
    category: 'Plushie',
    tier: 'signature',
    material: 'Plush-touch yarn, sourced per piece',
    hours: 12,
    dimensions: '28 cm height',
    priceInr: 4800,
    image: '/work/hero-bunny.jpg',
    note: 'Sitting bunny with elongated ears and embroidered facial detailing.',
    swatch: '#c3c9b6',
  },
  {
    slug: 'portrait-dolls',
    title: 'Portrait Dolls',
    category: 'Doll',
    tier: 'bespoke',
    material: 'Plush-touch yarn, sourced per piece',
    hours: 25,
    dimensions: '30 cm pair',
    priceInr: 15000,
    image: '/work/dolls-pair.jpg',
    note: 'Personalised couple portrait dolls developed from client reference photographs.',
    swatch: '#d9dcd2',
  },
  {
    slug: 'cow-plushie',
    title: 'Cow Plushie',
    category: 'Plushie',
    tier: 'signature',
    material: 'Plush-touch yarn, sourced per piece',
    hours: 10,
    dimensions: '24 cm height',
    priceInr: 3800,
    image: '/work/cow-plushie.jpg',
    note: 'Pink and white colour-blocked plushie with contoured horns and muzzle.',
    swatch: '#e8d8d8',
  },
  {
    slug: 'bow-bag',
    title: 'Bow Bag',
    category: 'Bag',
    tier: 'signature',
    material: 'Plush-touch yarn, sourced per piece',
    hours: 18,
    dimensions: '26 × 22 cm',
    priceInr: 6200,
    image: '/work/bow-bag.jpg',
    note: 'Shoulder bag with statement bow motif and reinforced strap joinery.',
    swatch: '#8b7d6b',
  },
  {
    slug: 'strawberry-keychains',
    title: 'Strawberry Keychains',
    category: 'Keychain',
    tier: 'ready',
    material: 'Plush-touch yarn, sourced per piece',
    hours: 2,
    dimensions: '6 × 8 cm each',
    priceInr: 750,
    image: '/work/keychains.jpg',
    note: 'Hand-crocheted strawberry, bow, and heart charms mounted on brass keyrings.',
    swatch: '#c3a8a8',
  },
  {
    slug: 'strawberry-hat',
    title: 'Strawberry Hat',
    category: 'Hat',
    tier: 'signature',
    material: 'Plush-touch yarn, sourced per piece',
    hours: 8,
    dimensions: '54–56 cm circumference',
    priceInr: 3000,
    image: '/work/strawberry-hat.jpg',
    note: 'Berry beret with crocheted stem topper. Shown worn.',
    swatch: '#a84444',
  },
];

export const featured = pieces.slice(0, 4);

export const categories: PieceCategory[] = [
  'Plushie',
  'Doll',
  'Bag',
  'Keychain',
  'Hat',
];

/**
 * PROCESS — the studio sequence.
 */
export type Step = {
  n: string;
  title: string;
  body: string;
  duration: string;
};

export const process: Step[] = [
  {
    n: '01',
    title: 'Brief',
    body: 'Tell us who it is for and the date it needs to arrive. We reply within two working days with a straight answer on whether we are the right hands for it.',
    duration: '2 days',
  },
  {
    n: '02',
    title: 'Design review',
    body: 'A review of references and proportions. Dimensions, colours, and custom details like dates or initials are agreed before work starts.',
    duration: '3–5 days',
  },
  {
    n: '03',
    title: 'Yarn selection',
    body: 'Plush-touch yarn sourced specifically for the piece and palette. Shades and textures are confirmed before hooking begins.',
    duration: '3–7 days',
  },
  {
    n: '04',
    title: 'Handwork',
    body: 'One piece at a time, worked by one pair of hands. You receive progress updates as the character or piece takes form.',
    duration: '1–6 weeks',
  },
  {
    n: '05',
    title: 'Photographic proof',
    body: 'Finished, shaped, and photographed in daylight at full resolution. You approve the piece before anything leaves the studio.',
    duration: '2–3 days',
  },
  {
    n: '06',
    title: 'Careful packaging',
    body: 'Packed flat with protective tissue, a cotton storage bag, and a hand-written care card. No pricing anywhere in the parcel.',
    duration: '2–5 days',
  },
];

/**
 * STITCH LIBRARY — worked in plush yarn.
 */
export const materials = [
  {
    fibre: 'Shell stitch',
    detail: 'A fan of arched loops worked in dense plush yarn. Creates scalloped edges and textured trim across accessories and hats.',
    use: 'Hats, bag edgings, accents',
    swatch: '#d9dcd2',
  },
  {
    fibre: 'Herringbone stitch',
    detail: 'An interlocking diagonal slip-stitch worked in structured plush yarn. Produces a sturdy, warp-resistant fabric that holds its shape.',
    use: 'Bags, straps, structured pieces',
    swatch: '#8b968c',
  },
  {
    fibre: 'Cable rib',
    detail: 'Raised vertical ridges worked through front posts in plush yarn. Gives elastic recovery and firm hold without stretching out.',
    use: 'Hat brims, handles, doll accessories',
    swatch: '#d9dcd2',
  },
  {
    fibre: 'Granny stripe',
    detail: 'Clusters of treble stitches worked into chain spaces using plush yarn. Used for contrasting colour blocks and lightweight accessory bodies.',
    use: 'Plushie garments, panels, pouches',
    swatch: '#c3c9b6',
  },
  {
    fibre: 'Chain loop',
    detail: 'Tightly hooked foundation loops in high-twist plush yarn. Clean, resilient joins for charms, keychains, and hanging straps.',
    use: 'Keychains, charms, loop ties',
    swatch: '#c3c9b6',
  },
  {
    fibre: 'Popcorn stitch',
    detail: 'Groups of closed stitches popped forward in plush yarn. Adds dense tactile bobbles and three-dimensional character details.',
    use: 'Plushie details, character accents',
    swatch: '#3d4a3a',
  },
];

/**
 * SWATCH LIBRARY — every stitch used.
 */
export const swatches = [
  { name: 'Shell', use: 'Hats, bag edgings, accents', motif: 'shell' as const },
  { name: 'Herringbone', use: 'Structured bags, handles', motif: 'herring' as const },
  { name: 'Cable rib', use: 'Hat brims, bag straps', motif: 'cable' as const },
  { name: 'Granny stripe', use: 'Accent panels, plushie coats', motif: 'granny' as const },
  { name: 'Chain loop', use: 'Keychains, charms, loops', motif: 'chain' as const },
  { name: 'Popcorn', use: 'Character details, accents', motif: 'popcorn' as const },
];

/**
 * TESTIMONIALS
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
      'I had been told the eight weeks would be difficult. I did not find it difficult. There were photographs at week three and week six and I never once had to ask.',
    author: 'S. M.',
    context: 'Anniversary commission, Bespoke portrait pair',
  },
  {
    quote:
      'The bunny is heavier than I expected and dense in hand. It has become the thing that sits permanently on my desk.',
    author: 'K. I.',
    context: 'Self-purchase, The Signature Collection',
  },
];

/**
 * FAQ — objections addressed plainly.
 */
export const faq = [
  {
    q: 'How long does it actually take?',
    a: 'Eight weeks for Bespoke, four weeks for The Signature Collection, one week for The Ready Gift. These are working times, not estimates. We do not open more slots than we can finish properly.',
  },
  {
    q: 'What if I am not sure what they would like?',
    a: 'That is the normal case, and it is why the photographic proof exists. You see the finished piece, in daylight, at full resolution, before anything ships. Details are adjusted before dispatch. After dispatch, we will mend anything that fails, for the life of the piece.',
  },
  {
    q: 'Do you ship, and how is it packed?',
    a: 'Worldwide, insured, tracked. Every piece is packed flat in protective tissue and ships in a cotton storage bag with a written care card and no pricing in the parcel.',
  },
  {
    q: 'Do you make blankets or throws?',
    a: 'Heirloom blankets and throws in natural fibres are an upcoming expansion sold via waitlist only. Join the waitlist via WhatsApp to hear first when commission slots open. No deposit is taken and we do not quote advance pricing or delivery dates.',
  },
];
