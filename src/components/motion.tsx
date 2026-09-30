'use client';

import { motion, useReducedMotion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Motion budget: slow fades and short rises. Nothing bounces,
 * nothing parallaxes, nothing moves more than 24px. Luxury reads
 * as unhurried — if it animates like a landing page, it is not luxury.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// Backstop interval: if the scroll observer never fires for a
// near-viewport element (background tab, extension interference,
// browser quirk), content still appears instead of blanking the
// page forever. Below-fold entrances are unaffected — they reveal
// via the observer when scrolled to, long before this matters.
const SAFETY_MS = 2500;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
  /** Above-the-fold content animates on mount instead of waiting
   *  for the scroll observer — first paint must never depend on it. */
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure';
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<any>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -8% 0px' });
  const controls = useAnimation();
  const revealed = useRef(false);
  const M = motion[as];

  useEffect(() => {
    if (reduce || revealed.current) return;
    if (immediate || inView) {
      revealed.current = true;
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay, ease: EASE },
      });
    }
  }, [reduce, immediate, inView, controls, delay]);

  useEffect(() => {
    const t = setInterval(() => {
      if (revealed.current || !ref.current) return;
      if (ref.current.getBoundingClientRect().top < window.innerHeight * 1.5) {
        revealed.current = true;
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        });
        clearInterval(t);
      }
    }, 1000);
    const hardStop = setTimeout(() => clearInterval(t), SAFETY_MS * 4);
    return () => {
      clearInterval(t);
      clearTimeout(hardStop);
    };
  }, [controls]);

  if (reduce) {
    return <M className={className}>{children}</M>;
  }

  return (
    <M
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={controls}
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
