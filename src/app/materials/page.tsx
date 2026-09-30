import type { Metadata } from 'next';
import { materials } from '@/content/work';
import { Section, Eyebrow, Divider, Chain, ButtonLink } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { CableRib } from '@/components/stitch';

export const metadata: Metadata = {
  title: 'Fibre & Care',
  description:
    'Cashmere, merino, silk, undyed flock, cotton and linen — micron counts, provenance, and how to make a hand-crocheted piece last thirty years.',
};

const care = [
  {
    t: 'Wash',
    b: 'Cold water, wool detergent, no wringing. Press the water out with both hands. Never machine-wash cashmere, even on a delicate cycle — the agitation is what felts it, not the heat.',
  },
  {
    t: 'Dry',
    b: 'Flat, on a dry towel, reshaped to the original measurements. Never hung: a wet wool shawl stretches under its own weight and will not come back. Move it. Turn it. Check it daily.',
  },
  {
    t: 'Store',
    b: 'Folded, never rolled or hung. Cotton or acid-free tissue between folds. Never plastic for long periods. Merino and cashmere need air; moths and mildew both prefer sealed dark.',
  },
  {
    t: 'Restore',
    b: 'Wash sparingly. A cashmere blanket used as a throw, not a blanket, needs washing perhaps once a year. Surface pilling is normal and can be removed with a cashmere comb — send it back to us and we will do it free.',
  },
];

export default function MaterialsPage() {
  return (
    <>
      <section className="wrap pt-16 pb-12 md:pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Fibre & care</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Micron counts,
              <br />
              not adjectives.
            </h1>
          </div>
          <div className="md:col-span-5 md:pt-16">
            <Reveal delay={0.2}>
              <p className="max-w-sm text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Anyone can call a blanket handmade and natural. This is what is
                actually in yours, where it came from, and how it will age.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2-col card grid with varied ratios */}
      <Section className="pt-0">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {materials.map((m, i) => {
              const spanClass =
                i === 0
                  ? 'md:col-span-7'
                  : i === 1
                    ? 'md:col-span-5'
                    : i === 2
                      ? 'md:col-span-5'
                      : i === 3
                        ? 'md:col-span-7'
                        : 'md:col-span-6';

              return (
                <Reveal key={m.fibre} delay={(i % 2) * 0.06} className={spanClass}>
                  <div className="h-full border border-hairline bg-ground p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span
                          aria-hidden="true"
                          className="block h-10 w-10 shrink-0"
                          style={{ backgroundColor: m.swatch }}
                        />
                        <p className="meta">{m.use}</p>
                      </div>
                      <h2 className="mt-8 font-display text-[2.25rem] leading-none">
                        {m.fibre}
                      </h2>
                    </div>
                    <p className="mt-6 leading-relaxed text-ink-soft">
                      {m.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Sourcing note. Provenance is what separates a fibre house
          from a maker who buys whatever is on sale. */}
      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow>Where it comes from</Eyebrow>
                <h2 className="mt-6 text-[length:var(--text-title)]">
                  Two mills, one spinner, one dye house.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  {[
                    ['Spinning', 'Grade A cashmere from Mule’s Fiber, Inner Mongolia. 15.5 micron, combed, not carded. Traceable to the lot number on the label.'],
                    ['Mulesing-free merino', '18.5 micron from a single New Zealand mill, ZQ-certified. We buy the whole lot so a commission can be matched across years.'],
                    ['Silk', 'Mulberry and bomby spun for crochet, not weaving. A tighter twist is the difference between a wrap that drapes and one that slides off the shoulder.'],
                    ['Dyeing', 'Madder root, indigo and walnut in vats of twenty skeins. Expect variation between batches — it is the reason we use them.'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="border-t border-hairline pt-6 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Chain className="opacity-60" />
                        <p className="meta">{k}</p>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <Reveal>
            <Eyebrow>Care</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[length:var(--text-title)]">
              Thirty years is the target, and it is achievable.
            </h2>
          </Reveal>

          <Divider className="mt-14" />

          <div className="mt-14 border-t border-hairline">
            {care.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.05}>
                <div className="grid grid-cols-1 border-b border-hairline py-8 md:grid-cols-12 md:gap-8 items-start">
                  <div className="md:col-span-2 flex items-baseline gap-3">
                    <span className="font-display text-[1.75rem] tnum text-ink-mute">
                      0{i + 1}
                    </span>
                    <CableRib tone="accent" className="h-3 w-6" />
                  </div>
                  <div className="md:col-span-3 mt-2 md:mt-0">
                    <h3 className="font-display text-2xl">{c.t}</h3>
                  </div>
                  <div className="md:col-span-7 mt-3 md:mt-0">
                    <p className="text-sm md:text-base leading-relaxed text-ink-soft">
                      {c.b}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <div className="wrap-narrow text-center">
          <Reveal>
            <h2 className="text-[length:var(--text-title)]">
              Ask what a fibre is for before you pay for it.
            </h2>
            <p className="mx-auto mt-8 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
              If you are not sure which tier or which fibre suits the person,
              write anyway. That is the first thing we will talk about.
            </p>
            <div className="mt-12 flex justify-center">
              <ButtonLink href="/contact/">Enquire</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
