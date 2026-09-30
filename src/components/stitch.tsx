/**
 * THE STITCH LIBRARY
 *
 * The brand is drawn, not decorated. Every motif here is a hand-authored
 * SVG constructed from real crochet stitch geometry — shell, cable rib,
 * granny stripe, herringbone. They are used as section dividers, list
 * markers, and background texture so the identity reads as crochet
 * before a single word is read.
 *
 * Each motif is drawn to a viewBox and scales via `preserveAspectRatio`.
 * `tone` maps to the ink or accent so motifs can be used at any weight.
 */

import type { CSSProperties } from 'react';

type Tone = 'ink' | 'hairline' | 'accent' | 'ground';

const TONE: Record<Tone, string> = {
  ink: 'var(--color-ink)',
  hairline: 'var(--color-hairline)',
  accent: 'var(--color-accent)',
  ground: 'var(--color-ground)',
};

type MotifProps = {
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
  opacity?: number;
};

/* ------------------------------------------------------------------ *
 * Shell stitch — the scalloped edge. Five tall posts into one arch.
 * This is the signature divider of the site.
 * ------------------------------------------------------------------ */
export function ShellStitch({
  tone = 'ink',
  className,
  style,
  strokeWidth = 1,
  opacity = 1,
}: MotifProps) {
  return (
    <svg
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={strokeWidth}
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {[0, 100, 200, 300].map((x) => (
        <g key={x}>
          {/* five posts of the shell */}
          <path d={`M${x + 20} 34 L${x + 20} 12`} />
          <path d={`M${x + 28} 34 L${x + 28} 9`} />
          <path d={`M${x + 36} 34 L${x + 36} 8`} />
          <path d={`M${x + 44} 34 L${x + 44} 9`} />
          <path d={`M${x + 52} 34 L${x + 52} 12`} />
          {/* the arch that joins them */}
          <path d={`M${x + 14} 34 Q${x + 36} 2 ${x + 58} 34`} />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Granny stripe — alternating blocks of single and double crochet.
 * Used as the most prominent background texture on the pricing page.
 * ------------------------------------------------------------------ */
export function GrannyStripe({
  tone = 'hairline',
  className,
  style,
  strokeWidth = 1,
  opacity = 1,
}: MotifProps) {
  const rows = [
    { y: 0, gap: 0, dash: 6 },
    { y: 8, gap: 3, dash: 0 },
    { y: 16, gap: 0, dash: 6 },
    { y: 24, gap: 3, dash: 0 },
  ];
  return (
    <svg
      viewBox="0 0 60 32"
      preserveAspectRatio="none"
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={strokeWidth}
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {rows.map((r, i) =>
        r.dash
          ? Array.from({ length: 10 }, (_, c) => (
              <line
                key={`${i}-${c}`}
                x1={c * 6 + r.gap}
                y1={r.y}
                x2={c * 6 + r.gap}
                y2={r.y + 6}
              />
            ))
          : Array.from({ length: 10 }, (_, c) => (
              <path
                key={`${i}-${c}`}
                d={`M${c * 6 + r.gap} ${r.y} L${c * 6 + r.gap} ${r.y + 6}`}
              />
            )),
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Cable rib — two strands crossing. The texture of a finished edge.
 * ------------------------------------------------------------------ */
export function CableRib({
  tone = 'ink',
  className,
  style,
  strokeWidth = 1,
  opacity = 1,
}: MotifProps) {
  return (
    <svg
      viewBox="0 0 120 20"
      preserveAspectRatio="none"
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={strokeWidth}
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <path d="M0 4 C20 4 20 16 40 16 S60 4 80 4 S100 16 120 16" />
      <path d="M0 16 C20 16 20 4 40 4 S60 16 80 16 S100 4 120 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Chain loop — a single crochet chain, three links.
 * Used inline as a bullet or list marker. Drawn as a linked chain
 * rather than a pair of ovals: at bullet size two ovals read as the
 * letters "oo", which looks like a typo rather than an ornament.
 * ------------------------------------------------------------------ */
export function ChainLoop({
  tone = 'accent',
  className,
  style,
  strokeWidth = 1.2,
  opacity = 1,
}: MotifProps) {
  return (
    <svg
      viewBox="0 0 24 10"
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {/* three links, each overlapping the next so the chain reads
          as continuous rather than as separate beads */}
      <ellipse cx="5" cy="5" rx="3.4" ry="3.9" />
      <ellipse cx="12" cy="5" rx="3.4" ry="3.9" />
      <ellipse cx="19" cy="5" rx="3.4" ry="3.9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Herringbone — diagonal twist. Vertical orientation, for tall
 * column rules beside index numbers.
 * ------------------------------------------------------------------ */
export function Herringbone({
  tone = 'hairline',
  className,
  style,
  strokeWidth = 1,
  opacity = 1,
}: MotifProps) {
  const segs = Array.from({ length: 8 }, (_, i) => i * 10);
  return (
    <svg
      viewBox="0 0 10 80"
      preserveAspectRatio="none"
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={strokeWidth}
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {segs.map((y) => (
        <path key={y} d={`M0 ${y} L10 ${y + 5} L0 ${y + 10}`} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Full-bleed site-wide texture. Fixed, behind everything, barely
 * there — the "paper" of the site.
 * ------------------------------------------------------------------ */
export function GrainField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity: 0.4,
        mixBlendMode: 'multiply',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
