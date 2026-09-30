import type { Metadata } from 'next';
import { pieces, categories } from '@/content/work';
import { tierById } from '@/content/tiers';
import { Section, Eyebrow, Divider, Figure, ButtonLink } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { Price } from '@/components/currency';

export const metadata: Metadata = {
  title: 'The Work',
  description:
    'Bespoke crochet blankets, throws, shawls and wraps. Every piece with its material, hours, dimensions and price.',
};

export default function WorkPage() {
  return (
    <>
      <section className="wrap pt-16 pb-12 md:pt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>The work</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Six pieces,
              <br />
              in full.
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <Reveal delay={0.2}>
              <p className="max-w-sm text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Material, hours, dimensions, price. Everything on this page is a
                thing that was actually made, and the hours are the real count
                from the hook.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Category index — hairline, no chips, no pills. */}
        <div className="mt-16 border-y border-hairline">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
            <span className="meta">Filter</span>
            {categories.map((c) => (
              <span key={c} className="meta text-ink-soft">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {pieces.map((p, i) => {
        const tier = tierById(p.tier);
        const flip = i % 3 === 1;
        return (
          <Section
            key={p.slug}
            id={p.slug}
            className="scroll-mt-20 border-b border-hairline last:border-b-0"
          >
            <div className="wrap">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div
                  className={`lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}
                >
                  <Reveal>
                    <Figure
                      src={p.image}
                      alt={`${p.title} — ${p.material}`}
                      ratio="4 / 3"
                      tone={p.swatch}
                      label={p.title}
                      priority={i < 2}
                    />
                  </Reveal>
                </div>

                <div
                  className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}
                >
                  <Reveal delay={0.1}>
                    <div className="flex items-baseline gap-4">
                      <Eyebrow>{p.category}</Eyebrow>
                      <span className="meta tnum">{tier.index}</span>
                    </div>
                    <h2 className="mt-5 text-[length:var(--text-title)]">
                      {p.title}
                    </h2>
                    <p className="mt-6 text-ink-soft">{p.note}</p>

                    <Divider className="my-8" />

                    <dl className="flex flex-col gap-4">
                      {[
                        ['Fibre', p.material],
                        ['Hours on the hook', `${p.hours} hrs`],
                        ['Dimensions', p.dimensions],
                        ['Tier', tier.name],
                        ['Price', ''],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-baseline justify-between gap-6 border-b border-hairline pb-3"
                        >
                          <dt className="meta">{k}</dt>
                          <dd className="text-right text-sm text-ink-soft">
                            {k === 'Price' ? (
                              <span className="tnum text-ink">
                                <Price inr={p.priceInr} />
                              </span>
                            ) : (
                              v
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-9">
                      <ButtonLink href="/contact/" variant="ghost">
                        Commission something like this
                      </ButtonLink>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <Section>
        <div className="wrap-narrow text-center">
          <Reveal>
            <Eyebrow>Not in the archive</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-title)]">
              Most of what leaves the studio never gets photographed.
            </h2>
            <p className="mx-auto mt-8 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
              Six pieces is enough to judge the hand. Write to us and we will
              send photographs of comparable work — undated, unbranded, yours to
              keep.
            </p>
            <div className="mt-12 flex justify-center">
              <ButtonLink href="/contact/">Ask for more work</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
