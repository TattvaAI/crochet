import Link from 'next/link';
import type { ReactNode } from 'react';
import { ShellStitch, Herringbone, CableRib, GrannyStripe, ChainLoop, GrainField } from './stitch';
import { Photo } from './photo';

/* ------------------------------------------------------------------ *
 * Layout primitives
 * ------------------------------------------------------------------ */

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section relative ${className}`}>
      {children}
    </section>
  );
}

/** Eyebrow label. The tracked-out sans that sets the register. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`meta ${className}`}>{children}</p>;
}

/** Numbered index — a large serif numeral in a hairline column. */
export function IndexNum({
  n,
  className = '',
  rule = true,
}: {
  n: string;
  className?: string;
  rule?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <span className="font-display text-[2rem] leading-none tnum">{n}</span>
      {rule && (
        <span
          aria-hidden="true"
          className="mt-1 block h-px flex-1 bg-hairline"
        />
      )}
    </div>
  );
}

/** Shell-stitch divider. The signature horizontal rule of the site. */
export function Divider({
  className = '',
  tone = 'hairline',
}: {
  className?: string;
  tone?: 'hairline' | 'ink' | 'accent';
}) {
  return <ShellStitch tone={tone} className={`h-5 w-full ${className}`} opacity={0.55} />;
}

/* ------------------------------------------------------------------ *
 * Image
 *
 * Renders a real <Image> when `src` resolves to a file, otherwise a
 * tonal placeholder tile labelled with the slot name. This lets you
 * deploy the full site before the photography exists.
 * ------------------------------------------------------------------ */

export function Figure({
  src,
  alt,
  ratio = '3 / 4',
  className = '',
  tone = '#c9c0b0',
  label,
  priority = false,
  caption,
  index,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  tone?: string;
  label?: string;
  priority?: boolean;
  caption?: string;
  index?: string;
}) {
  return (
    <figure className={className}>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: ratio, backgroundColor: tone }}
      >
        <Photo
          src={src}
          alt={alt}
          tone={tone}
          label={label}
          index={index}
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="meta mt-3 flex items-baseline justify-between gap-4">
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * Buttons — square, no radius, no shadow, no fill unless it matters.
 * ------------------------------------------------------------------ */

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'ghost';
  className?: string;
}) {
  const base =
    'meta inline-flex items-center justify-center gap-3 px-7 py-3.5 transition-colors duration-500';
  const styles =
    variant === 'solid'
      ? 'bg-ink text-ground hover:bg-accent'
      : 'border border-hairline text-ink hover:border-ink';
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Texture blocks
 * ------------------------------------------------------------------ */

/** Full-bleed granny-stripe field. Sets the pricing page apart. */
export function StripeField({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <GrannyStripe className="absolute inset-0 h-full w-full" opacity={0.5} />
    </div>
  );
}

/** Vertical herringbone column rule. */
export function ColumnRule({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 w-[6px] overflow-hidden ${className}`}
    >
      <Herringbone className="h-full w-full" opacity={0.6} />
    </span>
  );
}

/** Small chain-loop bullet. */
export function Chain({ className = '' }: { className?: string }) {
  return <ChainLoop className={`h-[7px] w-5 shrink-0 ${className}`} />;
}

/** Site-wide paper texture. Mounted once in the root layout. */
export { GrainField };

/* ------------------------------------------------------------------ *
 * Grid column rule — a single hairline between editorial columns.
 * ------------------------------------------------------------------ */
export function VerticalRule({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`block w-px bg-hairline ${className}`} />;
}
