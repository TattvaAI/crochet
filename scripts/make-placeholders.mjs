/**
 * PLACEHOLDER IMAGE GENERATOR
 *
 * Produces tonal placeholder JPEGs in /public so the site can be
 * deployed and reviewed before the real photography exists.
 *
 *   node scripts/make-placeholders.mjs
 *
 * Once your real photographs are in, delete the files it creates
 * (or the whole script) — the Figure component falls back to a CSS
 * tile when an image is missing, so nothing breaks either way.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const images = [
  // path, width, height, base tone, warmth (0-1)
  ['work/moss-granny.jpg', 1200, 1600, '#8a8578', 0.4],
  ['work/seafoam-square.jpg', 1400, 1400, '#9fb3a8', 0.3],
  ['work/heirloom-wrap.jpg', 1200, 2000, '#d8cbb6', 0.6],
  ['work/ash-herringbone.jpg', 1400, 1400, '#a8a49c', 0.2],
  ['work/long-shawl.jpg', 1200, 1500, '#a05a4a', 0.5],
  ['work/first-blanket.jpg', 1200, 1600, '#cfc4b2', 0.5],
  ['process/enquiry.jpg', 1600, 1000, '#b8ad9b', 0.4],
  ['process/pattern.jpg', 1600, 1000, '#c2b6a3', 0.4],
  ['process/fibre.jpg', 1600, 1000, '#a89c8a', 0.3],
  ['process/making.jpg', 1600, 1000, '#b8ad9b', 0.4],
  ['process/proof.jpg', 1600, 1000, '#c6bbaa', 0.5],
  ['process/dispatch.jpg', 1600, 1200, '#c3b8a6', 0.5],
  ['about/maker.jpg', 1200, 1500, '#b3a894', 0.4],
];

/** A stitch-textured tile. Deliberately plain — it is a placeholder,
 *  not a design. Real photography replaces it entirely. */
function tile(w, h, base, warmth) {
  const r = parseInt(base.slice(1, 3), 16);
  const g = parseInt(base.slice(3, 5), 16);
  const b = parseInt(base.slice(5, 7), 16);
  const dark = `rgb(${Math.round(r * 0.9)},${Math.round(g * 0.9)},${Math.round(b * 0.9)})`;
  const light = `rgb(${Math.min(255, Math.round(r * 1.07 + warmth * 12))},${Math.min(255, Math.round(g * 1.07 + warmth * 10))},${Math.min(255, Math.round(b * 1.07 + warmth * 6))})`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </linearGradient>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g stroke="${dark}" stroke-width="1.4" opacity="0.30">
    ${Array.from({ length: Math.ceil(h / 14) }, (_, row) =>
      Array.from({ length: Math.ceil(w / 14) }, (_, col) => {
        const x = col * 14 + (row % 2 ? 7 : 0);
        const y = row * 14;
        return `<path d="M${x} ${y} Q${x + 7} ${y - 3} ${x + 14} ${y}"/>`;
      }).join(''),
    ).join('\n    ')}
  </g>
  <rect width="${w}" height="${h}" filter="url(#n)" opacity="0.10"/>
</svg>`;
}

await mkdir(root, { recursive: true });

for (const [path, w, h, base, warmth] of images) {
  const full = join(root, path);
  await mkdir(dirname(full), { recursive: true });
  // Written as .svg content into a .jpg-named file would be wrong;
  // browsers sniff content, but let's be correct instead.
  await writeFile(full.replace(/\.jpg$/, '.svg'), tile(w, h, base, warmth), 'utf8');
  console.log('wrote', path.replace(/\.jpg$/, '.svg'));
}

console.log(
  '\nPlaceholders are SVGs, not JPEGs. To make real JPEGs from them, run:\n  sips -s format jpeg in.svg --out out.jpg\nor drop your actual photographs in their place and remove the entries from the content files.\n',
);
