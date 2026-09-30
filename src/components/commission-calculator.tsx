'use client';

import { useMemo, useState } from 'react';
import { tiers, type Tier } from '@/content/tiers';
import { Price } from './currency';
import { ChainLoop } from './stitch';

const DAY_MS = 86_400_000;

/**
 * "COMMISSION BY" — date calculator
 *
 * The lead time is a gift buyer's single biggest reason to bounce. This
 * turns it into the reason to start today. Given a delivery date, it
 * returns the last date each tier can be commissioned, and states the
 * position plainly rather than hiding the problem.
 *
 * Works with zero JavaScript via the <noscript> fallback below the form.
 */

function toInput(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * DAY_MS);
}

type Row = Tier & {
  lastDate: Date | null;
  status: 'open' | 'tight' | 'closed' | 'none';
  label: string;
};

export function CommissionCalculator() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [value, setValue] = useState('');
  const delivery = value ? new Date(`${value}T00:00:00`) : null;
  const valid = delivery !== null && !Number.isNaN(delivery.getTime());

  const rows: Row[] = useMemo(() => {
    return tiers.map((tier) => {
      if (!valid || !delivery) {
        return { ...tier, lastDate: null, status: 'none', label: '' };
      }
      // A 3-day buffer on top of the working lead time: yarn rest,
      // blocking, and dispatch are not optional.
      const lastDate = addDays(delivery, -(tier.days + 3));
      const diffDays = Math.round(
        (lastDate.getTime() - today.getTime()) / DAY_MS,
      );
      let status: Row['status'];
      if (diffDays < 0) status = 'closed';
      else if (diffDays <= 21) status = 'tight';
      else status = 'open';
      const label =
        status === 'closed'
          ? 'Closed for this date'
          : status === 'tight'
            ? 'Open — book now'
            : 'Open';
      return { ...tier, lastDate, status, label };
    });
  }, [valid, delivery, today]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-hairline pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label htmlFor="delivery" className="meta">
            Needed by
          </label>
          <input
            id="delivery"
            type="date"
            value={value}
            min={toInput(addDays(today, 4))}
            onChange={(e) => setValue(e.target.value)}
            className="field mt-3 max-w-xs text-[1.35rem]"
            style={{ fontFamily: 'var(--font-sans)' }}
          />
        </div>
        <p className="meta max-w-xs leading-relaxed">
          Working time plus three days for dispatch. If a date is closed, we
          would rather tell you now than in October.
        </p>
      </div>

      <ul className="mt-2">
        {rows.map((r) => (
          <li
            key={r.id}
            className="grid gap-2 border-b border-hairline py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6"
          >
            <div className="sm:col-span-3">
              <p className="font-display text-xl">{r.name}</p>
              <p className="meta mt-2 tnum">
                <Price inr={r.priceMin} /> — <Price inr={r.priceMax} />
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="meta">Working time</p>
              <p className="mt-1 text-sm tnum">
                {r.days < 7 ? `${r.days} days` : `${Math.round(r.days / 7)} weeks`}
              </p>
            </div>

            <div className="sm:col-span-4">
              <p className="meta">Commission by</p>
              <p className="mt-1 text-sm tnum">
                {r.lastDate
                  ? r.lastDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '—'}
              </p>
            </div>

            <div className="sm:col-span-3 sm:text-right">
              <p
                className={`meta inline-flex items-center gap-2 ${
                  r.status === 'closed'
                    ? 'text-ink-mute'
                    : r.status === 'tight'
                      ? 'text-accent'
                      : 'text-ink-soft'
                }`}
              >
                {r.status === 'none' ? (
                  'Choose a date'
                ) : (
                  <>
                    <ChainLoop
                      tone={
                        r.status === 'closed'
                          ? 'hairline'
                          : r.status === 'tight'
                            ? 'accent'
                            : 'ink'
                      }
                      className="h-[7px] w-5"
                    />
                    {r.label}
                  </>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <noscript>
        <p className="meta mt-6 leading-relaxed">
          Working times: Ready Gift 3 days · Heritage 6 weeks · Atelier 14
          weeks. Add three days for insured worldwide dispatch. Write to us and
          we will confirm any specific date.
        </p>
      </noscript>
    </div>
  );
}
