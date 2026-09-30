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
    'Three tiers of crochet commission. Prices, working times, and a calculator that tells you the last date to commission for a given delivery date.',
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Commission</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Prices are
              <br />
              on the page.
            </h1>
          </div>
          <div className="md:col-span-5 md:pt-16">
            <p className="enter max-w-sm text-[length:var(--text-lede)] leading-relaxed text-ink-soft" style={{ '--d': '0.2s' } as React.CSSProperties}>
                Hiding prices filters out the people who were never going to
                pay. These are the real numbers, the real working times, and
                what is included.
              </p>
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
      {/* Tier 01: The Ready Gift */}
      {(() => {
        const firstTier = tiers[0]!;
        const ladderTiers = tiers.slice(1);
        return (
          <>
            <Section
              key={firstTier.id}
              id={firstTier.id}
              className="relative overflow-hidden border-y border-hairline"
            >
              <div className="wrap relative">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-6">
                    <Reveal>
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-[1.5rem] tnum text-ink-mute">
                          {firstTier.index}
                        </span>
                        <Eyebrow>{leadTimeLabel(firstTier.days)} working time</Eyebrow>
                      </div>
                      <h2 className="mt-6 text-[length:var(--text-title)]">
                        {firstTier.name}
                      </h2>
                      <p className="mt-6 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                        {firstTier.summary}
                      </p>
                      <p className="mt-8 font-display text-[2.5rem] tnum">
                        <Price inr={firstTier.priceMin} /> —{' '}
                        <Price inr={firstTier.priceMax} />
                      </p>
                    </Reveal>

                    <Reveal delay={0.15}>
                      <div className="mt-10">
                        <Figure
                          src="/work/keychains.jpg"
                          alt="Grid of handmade strawberry, bow, and heart crochet keychains"
                          ratio="16 / 10"
                          tone="#c3a8a8"
                          label={firstTier.name}
                        />
                      </div>
                    </Reveal>
                  </div>

                  <div className="md:col-span-6 md:border-l md:border-hairline md:pl-10">
                    <Reveal delay={0.1}>
                      <div className="border-t border-hairline pt-7 md:border-t-0 md:pt-0">
                        <Eyebrow>Personalisation</Eyebrow>
                        <p className="mt-4 text-ink-soft">{firstTier.personalisation}</p>
                      </div>

                      <div className="mt-10">
                        <Eyebrow>Included</Eyebrow>
                        <ul className="mt-5">
                          {firstTier.includes.map((item) => (
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
                          {firstTier.applies.join(' · ')}
                        </p>
                      </div>

                      <div className="mt-12">
                        <ButtonLink href="/contact/">
                          Enquire — {firstTier.name}
                        </ButtonLink>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </Section>

            {/* Tiers 02 & 03: 2-column comparative ladder */}
            <Section className="relative overflow-hidden border-b border-hairline bg-ground-deep">
              <div className="wrap relative">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
                  {ladderTiers.map((tier, i) => (
                    <article key={tier.id} id={tier.id} className="scroll-mt-20 flex flex-col justify-between">
                      <div>
                        <Reveal delay={i * 0.1}>
                          <div className="flex items-baseline gap-4">
                            <span className="font-display text-[1.5rem] tnum text-ink-mute">
                              {tier.index}
                            </span>
                            <Eyebrow>{leadTimeLabel(tier.days)} working time</Eyebrow>
                          </div>
                          <h2 className="mt-6 text-[length:var(--text-title)]">
                            {tier.name}
                          </h2>
                          <p className="mt-6 text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                            {tier.summary}
                          </p>
                          <p className="mt-8 font-display text-[2.5rem] tnum">
                            <Price inr={tier.priceMin} /> —{' '}
                            <Price inr={tier.priceMax} />
                          </p>
                        </Reveal>

                        <Reveal delay={0.12 + i * 0.08}>
                          <div className="mt-8">
                            <Figure
                              src={
                                tier.id === 'signature'
                                  ? '/work/cow-plushie.jpg'
                                  : '/work/dolls-pair.jpg'
                              }
                              alt={
                                tier.id === 'signature'
                                  ? 'Pink and white crochet cow plushie'
                                  : 'Pair of custom crochet portrait dolls'
                              }
                              ratio="4 / 3"
                              tone={tier.id === 'signature' ? '#e8d8d8' : '#d9dcd2'}
                              label={tier.name}
                            />
                          </div>
                        </Reveal>

                        <Reveal delay={0.15 + i * 0.08}>
                          <div className="mt-8 border-t border-hairline pt-6">
                            <Eyebrow>Personalisation</Eyebrow>
                            <p className="mt-3 text-sm text-ink-soft">{tier.personalisation}</p>
                          </div>

                          <div className="mt-8">
                            <Eyebrow>Included</Eyebrow>
                            <ul className="mt-4">
                              {tier.includes.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-3 border-b border-hairline py-3 text-sm leading-relaxed text-ink-soft"
                                >
                                  <Chain className="mt-1.5 opacity-60" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-8">
                            <Eyebrow>Available as</Eyebrow>
                            <p className="mt-3 text-sm text-ink-soft">
                              {tier.applies.join(' · ')}
                            </p>
                          </div>
                        </Reveal>
                      </div>

                      <div className="mt-10">
                        <ButtonLink href="/contact/">
                          Enquire — {tier.name}
                        </ButtonLink>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Section>

            {/* ── HEIRLOOM WAITLIST ───────────────────────────────── */}
            <Section className="border-b border-hairline bg-ground">
              <div className="wrap">
                <Reveal>
                  <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <Eyebrow>Future expansion</Eyebrow>
                      <h2 className="mt-4 text-[length:var(--text-title)]">
                        The Heirloom Atelier
                      </h2>
                      <p className="mt-4 max-w-xl text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                        Blankets and throws in natural fibres, opening soon.
                      </p>
                      <p className="mt-2 text-sm text-ink-mute">
                        Waitlist members hear first. No deposit taken.
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 shrink-0">
                      <ButtonLink
                        href="https://wa.me/917015229077?text=HEIRLOOM"
                      >
                        Join the waitlist
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              </div>
            </Section>
          </>
        );
      })()}

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
              Every piece on this site is worked in one of these stitches using
              plush-touch yarn. Nothing decorative, nothing invented for effect —
              each one is structural, and each is worked by hand every time.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:flex md:gap-6 md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-6">
            {swatches.map((s, i) => {
              const M = Motif[s.motif];
              return (
                <Reveal key={s.name} delay={(i % 3) * 0.06} className="md:w-[320px] md:shrink-0 md:snap-start">
                  <div className="h-full border border-hairline bg-ground p-7 flex flex-col justify-between">
                    <div className="flex h-24 items-center justify-center border-b border-hairline pb-4">
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
                    <div className="pt-6">
                      <h3 className="font-display text-2xl">{s.name}</h3>
                      <p className="meta mt-3">{s.use}</p>
                    </div>
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
          <div className="mt-16 border-t border-hairline">
            {[
              {
                t: 'Payment',
                b: 'Fifty per cent to open the commission, the balance before dispatch. Nothing is started until the first half is received. We do not hold a slot without a deposit.',
              },
              {
                t: 'Revisions',
                b: 'Adjustments to character features, palette, and dimensions are reviewed before proof approval. After dispatch, alterations are quoted separately.',
              },
              {
                t: 'Gifting',
                b: 'Packed flat in tissue, cotton storage bag, hand-written care card. No price, no invoice, and no name of the giver anywhere in the parcel unless you ask for one.',
              },
              {
                t: 'Aftercare',
                b: 'We mend anything that fails, for the life of the piece. Send it back; we will not charge you for our own work wearing out.',
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 0.05}>
                <div className="grid grid-cols-1 border-b border-hairline py-8 md:grid-cols-12 md:gap-8 items-start">
                  <div className="md:col-span-2 flex items-baseline gap-3">
                    <span className="font-display text-[1.75rem] tnum text-ink-mute">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="md:col-span-3 mt-2 md:mt-0">
                    <h3 className="font-display text-2xl">{p.t}</h3>
                  </div>
                  <div className="md:col-span-7 mt-3 md:mt-0">
                    <p className="text-sm md:text-base leading-relaxed text-ink-soft">
                      {p.b}
                    </p>
                  </div>
                </div>
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
