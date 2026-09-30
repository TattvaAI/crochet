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
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Fibre & care</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Micron counts,
              <br />
              not adjectives.
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <Reveal delay={0.2}>
              <p className="max-w-sm text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Anyone can call a blanket handmade and natural. This is what is
                actually in yours, where it came from, and how it will age.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="pt-0">
        <div className="wrap">
          <div className="border-t border-hairline">
            {materials.map((m, i) => (
              <Reveal key={m.fibre} delay={(i % 2) * 0.05}>
                <div className="grid gap-6 border-b border-hairline py-12 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-1">
                    <span
                      aria-hidden="true"
                      className="block h-10 w-10"
                      style={{ backgroundColor: m.swatch }}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <h2 className="font-display text-[2.25rem] leading-none">
                      {m.fibre}
                    </h2>
                    <p className="meta mt-4">{m.use}</p>
                  </div>
                  <div className="md:col-span-6 md:col-start-7">
                    <p className="leading-relaxed text-ink-soft">{m.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Sourcing note. Provenance is what separates a fibre house
          from a maker who buys whatever is on sale. */}
      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Where it comes from</Eyebrow>
              <h2 className="mt-6 text-[length:var(--text-title)]">
                Two mills, one spinner, one dye house.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <ul>
                {[
                  ['Spinning', 'Grade A cashmere from Mule’s Fiber, Inner Mongolia. 15.5 micron, combed, not carded. Traceable to the lot number on the label.'],
                  ['Mulesing-free merino', '18.5 micron from a single New Zealand mill, ZQ-certified. We buy the whole lot so a commission can be matched across years.'],
                  ['Silk', 'Mulberry and bomby spun for crochet, not weaving. A tighter twist is the difference between a wrap that drapes and one that slides off the shoulder.'],
                  ['Dyeing', 'Madder root, indigo and walnut in vats of twenty skeins. Expect variation between batches — it is the reason we use them.'],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex gap-5 border-b border-hairline py-6 first:border-t"
                  >
                    <Chain className="mt-1.5 opacity-60" />
                    <div>
                      <p className="meta">{k}</p>
                      <p className="mt-2 leading-relaxed text-ink-soft">{v}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
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

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {care.map((c, i) => (
              <Reveal key={c.t} delay={(i % 4) * 0.06}>
                <div className="flex items-center gap-3">
                  <CableRib tone="accent" className="h-3 w-6" />
                  <h3 className="font-display text-2xl">{c.t}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {c.b}
                </p>
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
