'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Motion budget: slow fades and short rises. Nothing bounces,
 * nothing parallaxes, nothing moves more than 24px. Luxury reads
 * as unhurried — if it animates like a landing page, it is not luxury.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure';
}) {
  const reduce = useReducedMotion();
  const M = motion[as];

  if (reduce) {
    return <M className={className}>{children}</M>;
  }

  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Line-by-line mask reveal. For the hero only — it is the one
 *  moment the site should feel considered rather than loaded. */
export function MaskLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            initial={reduce ? undefined : { y: '110%' }}
            animate={reduce ? undefined : { y: '0%' }}
            transition={{
              duration: 1.3,
              delay: 0.15 + i * 0.11,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Character-level fade for short labels (index numbers, eyebrows). */
export function Fade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}
