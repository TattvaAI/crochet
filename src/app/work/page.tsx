import type { Metadata } from 'next';
import { pieces, categories } from '@/content/work';
import { tierById } from '@/content/tiers';
import { Section, Eyebrow, Divider, Figure, ButtonLink } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { Price } from '@/components/currency';

export const metadata: Metadata = {
  title: 'The Work',
  description:
    'Small-batch crochet creatures and keepsakes. Every piece with its material, hours, dimensions and price.',
};

export default function WorkPage() {
  return (
    <>
      <section className="wrap pt-16 pb-12 md:pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>The work</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Six pieces,
              <br />
              in full.
            </h1>
          </div>
          <div className="md:col-span-5 md:pt-16">
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

      {/* ── PIECE 0: Heroic Feature Spread ─────────────────── */}
      {(() => {
        const p = pieces[0]!;
        const tier = tierById(p.tier);
        return (
          <Section
            id={p.slug}
            className="scroll-mt-20 border-b border-hairline pt-0"
          >
            <div className="wrap">
              <Reveal>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
                  <div className="md:col-span-7">
                    <div className="flex items-baseline gap-4">
                      <Eyebrow>{p.category}</Eyebrow>
                      <span className="meta tnum">{tier.index}</span>
                    </div>
                    <h2 className="mt-4 text-[length:var(--text-title)]">
                      {p.title}
                    </h2>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-ink-soft leading-relaxed">{p.note}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Figure
                    src={p.image}
                    alt={`${p.title} — ${p.material}`}
                    ratio="16 / 10"
                    tone={p.swatch}
                    label={p.title}
                    priority
                  />
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 grid grid-cols-1 gap-6 border-y border-hairline py-6 md:grid-cols-6 md:gap-8 md:items-center">
                  <div>
                    <p className="meta">Material</p>
                    <p className="mt-2 text-sm text-ink-soft">{p.material}</p>
                  </div>
                  <div>
                    <p className="meta">Hours on hook</p>
                    <p className="mt-2 text-sm text-ink-soft">{p.hours} hrs</p>
                  </div>
                  <div>
                    <p className="meta">Dimensions</p>
                    <p className="mt-2 text-sm text-ink-soft">{p.dimensions}</p>
                  </div>
                  <div>
                    <p className="meta">Tier</p>
                    <p className="mt-2 text-sm text-ink-soft">{tier.name}</p>
                  </div>
                  <div>
                    <p className="meta">Price</p>
                    <p className="mt-2 text-sm tnum text-ink font-medium">
                      <Price inr={p.priceInr} />
                    </p>
                  </div>
                  <div>
                    <ButtonLink href="/contact/" variant="ghost" className="w-full text-center">
                      Commission
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </Section>
        );
      })()}

      {/* ── PIECES 1 & 2: 2-Col Card Grid with Varied Ratios ─ */}
      {(() => {
        const p1 = pieces[1]!;
        const p2 = pieces[2]!;
        const tier1 = tierById(p1.tier);
        const tier2 = tierById(p2.tier);
        return (
          <Section className="border-b border-hairline bg-ground-deep">
            <div className="wrap">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
                <article
                  id={p1.slug}
                  className="scroll-mt-20 md:col-span-7 flex flex-col justify-between"
                >
                  <Reveal>
                    <Figure
                      src={p1.image}
                      alt={`${p1.title} — ${p1.material}`}
                      ratio="4 / 3"
                      tone={p1.swatch}
                      label={p1.title}
                    />
                    <div className="mt-8 flex items-baseline gap-4">
                      <Eyebrow>{p1.category}</Eyebrow>
                      <span className="meta tnum">{tier1.index}</span>
                    </div>
                    <h2 className="mt-4 font-display text-[2.25rem] leading-tight">
                      {p1.title}
                    </h2>
                    <p className="mt-4 text-ink-soft">{p1.note}</p>

                    <Divider className="my-8" />

                    <dl className="flex flex-col gap-4">
                      {[
                        ['Material', p1.material],
                        ['Hours on the hook', `${p1.hours} hrs`],
                        ['Dimensions', p1.dimensions],
                        ['Tier', tier1.name],
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
                                <Price inr={p1.priceInr} />
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
                </article>

                <article
                  id={p2.slug}
                  className="scroll-mt-20 md:col-span-5 md:pt-12 flex flex-col justify-between"
                >
                  <Reveal delay={0.1}>
                    <Figure
                      src={p2.image}
                      alt={`${p2.title} — ${p2.material}`}
                      ratio="3 / 4"
                      tone={p2.swatch}
                      label={p2.title}
                    />
                    <div className="mt-8 flex items-baseline gap-4">
                      <Eyebrow>{p2.category}</Eyebrow>
                      <span className="meta tnum">{tier2.index}</span>
                    </div>
                    <h2 className="mt-4 font-display text-[2.25rem] leading-tight">
                      {p2.title}
                    </h2>
                    <p className="mt-4 text-ink-soft">{p2.note}</p>

                    <Divider className="my-8" />

                    <dl className="flex flex-col gap-4">
                      {[
                        ['Material', p2.material],
                        ['Hours on the hook', `${p2.hours} hrs`],
                        ['Dimensions', p2.dimensions],
                        ['Tier', tier2.name],
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
                                <Price inr={p2.priceInr} />
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
                </article>
              </div>
            </div>
          </Section>
        );
      })()}

      {/* ── PIECE 3: Asymmetric Split (Portrait Format) ─────── */}
      {(() => {
        const p = pieces[3]!;
        const tier = tierById(p.tier);
        return (
          <Section
            id={p.slug}
            className="scroll-mt-20 border-b border-hairline"
          >
            <div className="wrap">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16 items-center">
                <div className="md:col-span-5">
                  <Reveal>
                    <Figure
                      src={p.image}
                      alt={`${p.title} — ${p.material}`}
                      ratio="3 / 4"
                      tone={p.swatch}
                      label={p.title}
                    />
                  </Reveal>
                </div>

                <div className="md:col-span-7 md:pl-6">
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
                        ['Material', p.material],
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
      })()}

      {/* ── PIECES 4 & 5: Numbered Editorial Rows ───────────── */}
      {(() => {
        const rowPieces = [pieces[4]!, pieces[5]!];
        return (
          <Section className="border-b border-hairline">
            <div className="wrap">
              <div className="border-t border-hairline">
                {rowPieces.map((p, idx) => {
                  const tier = tierById(p.tier);
                  return (
                    <article
                      key={p.slug}
                      id={p.slug}
                      className="scroll-mt-20 border-b border-hairline py-14"
                    >
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 items-start">
                        <div className="md:col-span-4">
                          <Reveal delay={idx * 0.05}>
                            <Figure
                              src={p.image}
                              alt={`${p.title} — ${p.material}`}
                              ratio="4 / 3"
                              tone={p.swatch}
                              label={p.title}
                            />
                          </Reveal>
                        </div>

                        <div className="md:col-span-4">
                          <Reveal delay={0.08 + idx * 0.05}>
                            <div className="flex items-baseline gap-4">
                              <Eyebrow>{p.category}</Eyebrow>
                              <span className="meta tnum">{tier.index}</span>
                            </div>
                            <h2 className="mt-4 font-display text-[2rem] leading-tight">
                              {p.title}
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                              {p.note}
                            </p>
                            <div className="mt-8">
                              <ButtonLink href="/contact/" variant="ghost">
                                Commission something like this
                              </ButtonLink>
                            </div>
                          </Reveal>
                        </div>

                        <div className="md:col-span-4 border-t border-hairline pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0">
                          <Reveal delay={0.12 + idx * 0.05}>
                            <dl className="flex flex-col gap-3">
                              {[
                                ['Material', p.material],
                                ['Hours on the hook', `${p.hours} hrs`],
                                ['Dimensions', p.dimensions],
                                ['Tier', tier.name],
                                ['Price', ''],
                              ].map(([k, v]) => (
                                <div
                                  key={k}
                                  className="flex items-baseline justify-between gap-6 border-b border-hairline pb-2.5 last:border-b-0"
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
                          </Reveal>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </Section>
        );
      })()}

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
