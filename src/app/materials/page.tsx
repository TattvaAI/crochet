import type { Metadata } from 'next';
import { materials } from '@/content/work';
import { Section, Eyebrow, Divider, Chain, ButtonLink } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { CableRib } from '@/components/stitch';

export const metadata: Metadata = {
  title: 'Materials & Care',
  description:
    'Plush-touch yarn, sourced per piece. How stitches are constructed and how to make a hand-crocheted piece last.',
};

const care = [
  {
    t: 'Clean',
    b: 'Spot clean with cool water and mild soap where possible. If washing fully, hand wash gently in cool water with no wringing. Press water out flat between clean towels.',
  },
  {
    t: 'Dry',
    b: 'Flat, on a clean dry towel, reshaped to the original contours. Never hung: wet crochet stretches under gravity. Dry in the shade away from direct heat.',
  },
  {
    t: 'Store',
    b: 'Kept clean in a breathable cotton storage bag. Store away from direct sunlight and damp conditions so colours and plush pile stay true.',
  },
  {
    t: 'Repair',
    b: 'We mend anything that fails, for the life of the piece. If joinery or stitching ever weakens, send it back to the studio and we repair our own work free of charge.',
  },
];

export default function MaterialsPage() {
  return (
    <>
      <section className="wrap pt-16 pb-12 md:pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Materials & care</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Plush-touch yarn,
              <br />
              sourced per piece.
            </h1>
          </div>
          <div className="md:col-span-5 md:pt-16">
            <Reveal delay={0.2} immediate>
              <p className="max-w-sm text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Every piece is worked in plush-touch yarn selected specifically
                for that commission. This is how each stitch behaves, where it
                is used, and how to care for it.
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

      {/* Sourcing note */}
      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow>Where it comes from</Eyebrow>
                <h2 className="mt-6 text-[length:var(--text-title)]">
                  Yarn sourced to order, per piece.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  {[
                    ['Yarn selection', 'Plush-touch yarn chosen per commission for hand-feel, stitch definition, and durability. Sourced per piece in small quantities.'],
                    ['Colourways', 'Solid tones and custom palettes matched to your brief or reference photos before hooking begins.'],
                    ['Hardware', 'Solid brass keyrings, secure split rings, and reinforced joinery chosen to withstand daily carry.'],
                    ['Filling', 'Clean hypoallergenic stuffing, packed firmly so plushies retain their shape over years of handling.'],
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
              Made to be kept and handled.
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
              Ask about materials before you commission.
            </h2>
            <p className="mx-auto mt-8 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
              If you are not sure which tier or yarn colourway suits the person,
              write anyway. That is the first thing we discuss.
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
