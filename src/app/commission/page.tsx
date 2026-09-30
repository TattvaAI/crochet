import type { Metadata } from 'next';
import { tiers, leadTimeLabel } from '@/content/tiers';
import { faq, swatches } from '@/content/work';
import { site } from '@/lib/site';
import {
  Section,
  Eyebrow,
  Divider,
  Figure,
  ButtonLink,
  StripeField,
  Chain,
} from '@/components/ui';
import { Reveal } from '@/components/motion';
import { Price } from '@/components/currency';
import { CommissionCalculator } from '@/components/commission-calculator';
import { ShellStitch, CableRib, GrannyStripe, Herringbone, ChainLoop } from '@/components/stitch';

export const metadata: Metadata = {
  title: 'Commission & Pricing',
  description:
    'Three tiers of bespoke crochet commission. Prices, working times, and a calculator that tells you the last date to commission for a given delivery date.',
};

const Motif = {
  shell: ShellStitch,
  herring: Herringbone,
  cable: CableRib,
  granny: GrannyStripe,
  chain: ChainLoop,
  popcorn: ShellStitch,
} as const;

export default function CommissionPage() {
  return (
    <>
      <section className="wrap pt-16 pb-12 md:pt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Commission</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Prices are
              <br />
              on the page.
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <Reveal delay={0.2}>
              <p className="max-w-sm text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Hiding prices filters out the people who were never going to
                pay. These are the real numbers, the real working times, and
                what is included.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE DATE CALCULATOR ────────────────────────────────
          Placed high, above the ladder, because for a gift buyer
          this is the question they arrived with. */}
      <Section className="relative overflow-hidden pt-0">
        <StripeField className="opacity-30" />
        <div className="wrap relative">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Working backwards from your date</Eyebrow>
              <h2 className="mt-6 text-[length:var(--text-title)]">
                When do we need to start?
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <CommissionCalculator />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── THE THREE TIERS ─────────────────────────────────── */}
      {tiers.map((tier, i) => (
        <Section
          key={tier.id}
          id={tier.id}
          className={
            i % 2 === 0
              ? 'relative overflow-hidden border-y border-hairline'
              : 'relative overflow-hidden border-y border-hairline bg-ground-deep'
          }
        >
          <div className="wrap relative">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[1.5rem] tnum text-ink-mute">
                      {tier.index}
                    </span>
                    <Eyebrow>{leadTimeLabel(tier.days)} working time</Eyebrow>
                  </div>
                  <h2 className="mt-6 text-[length:var(--text-title)]">
                    {tier.name}
                  </h2>
                  <p className="mt-6 max-w-sm text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                    {tier.summary}
                  </p>
                  <p className="mt-8 font-display text-[2.5rem] tnum">
                    <Price inr={tier.priceMin} /> —{' '}
                    <Price inr={tier.priceMax} />
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="mt-10">
                    <Figure
                      src={
                        tier.id === 'atelier'
                          ? '/work/moss-granny.jpg'
                          : tier.id === 'heritage'
                            ? '/work/ash-herringbone.jpg'
                            : '/work/heirloom-wrap.jpg'
                      }
                      alt={tier.name}
                      ratio="4 / 5"
                      tone={
                        tier.id === 'atelier'
                          ? '#8a8578'
                          : tier.id === 'heritage'
                            ? '#a8a49c'
                            : '#d8cbb6'
                      }
                      label={tier.name}
                    />
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal delay={0.1}>
                  <div className="border-t border-hairline pt-7">
                    <Eyebrow>Personalisation</Eyebrow>
                    <p className="mt-4 text-ink-soft">{tier.personalisation}</p>
                  </div>

                  <div className="mt-10">
                    <Eyebrow>Included</Eyebrow>
                    <ul className="mt-5">
                      {tier.includes.map((item) => (
                        <li
                          key={item}
                          className="flex gap-4 border-b border-hairline py-4 text-sm leading-relaxed text-ink-soft"
                        >
                          <Chain className="mt-1.5 opacity-60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10">
                    <Eyebrow>Available as</Eyebrow>
                    <p className="mt-4 text-ink-soft">
                      {tier.applies.join(' · ')}
                    </p>
                  </div>

                  <div className="mt-12">
                    <ButtonLink href="/contact/">
                      Enquire — {tier.name}
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* ── SWATCH LIBRARY ────────────────────────────────────
          The differentiator. One afternoon of macro photography
          and it is the most memorable page on the site. */}
      <Section>
        <div className="wrap">
          <Reveal>
            <Eyebrow>Swatch library</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[length:var(--text-title)]">
              Six stitches. No others.
            </h2>
            <p className="mt-6 max-w-lg text-ink-soft">
              Every edge on this site is one of these. Nothing decorative, nothing
              invented for effect — each one is structural, and each is worked by
              hand every time.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((s, i) => {
              const M = Motif[s.motif];
              return (
                <Reveal key={s.name} delay={(i % 3) * 0.06}>
                  <div className="border-t border-hairline pt-6">
                    <div className="flex h-24 items-center justify-center">
                      <M
                        tone="ink"
                        className={
                          s.motif === 'herring'
                            ? 'h-full w-5'
                            : s.motif === 'chain'
                              ? 'h-[9px] w-12'
                              : 'h-10 w-32'
                        }
                        opacity={0.55}
                      />
                    </div>
                    <h3 className="mt-6 font-display text-2xl">{s.name}</h3>
                    <p className="meta mt-3">{s.use}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── POLICIES ───────────────────────────────────────────
          A gift buyer's fear is buying the wrong thing. These
          are the answers, stated plainly, in public. */}
      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap">
          <Divider />
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: 'Payment',
                b: 'Fifty per cent to open the commission, the balance before dispatch. Nothing is started until the first half is received. We do not hold a slot without a deposit.',
              },
              {
                t: 'Revisions',
                b: 'Unlimited on pattern, palette and dimensions until you approve the photographic proof. After dispatch, alterations are quoted separately.',
              },
              {
                t: 'Gifting',
                b: 'Folded in tissue, cotton storage bag, hand-written care card. No price, no invoice, and no name of the giver anywhere in the parcel unless you ask for one.',
              },
              {
                t: 'Aftercare',
                b: 'We mend anything that fails, for the life of the piece. Send it back; we will not charge you for our own work wearing out.',
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={(i % 4) * 0.06}>
                <h3 className="font-display text-2xl">{p.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {p.b}
                </p>
              </Reveal>
            ))}
          </div>

          <Divider className="mt-16" />

          <div className="mt-16 max-w-2xl">
            {faq.slice(0, 3).map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group border-b border-hairline py-6">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-8">
                    <span className="font-display text-[1.5rem] leading-tight">
                      {f.q}
                    </span>
                    <span className="meta shrink-0 text-ink-mute transition-colors group-open:text-accent">
                      <CableRib className="h-3 w-5" />
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap-narrow text-center">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">
              Start here.
            </h2>
            <p className="mx-auto mt-8 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
              Tell us the date it needs to arrive and who it is for. We will
              tell you which tier is right, and whether we are free.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact/">Enquire</ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="ghost">
                {site.email}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
