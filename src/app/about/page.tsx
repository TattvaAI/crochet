import type { Metadata } from 'next';
import { Section, Eyebrow, Divider, Figure, ButtonLink, Chain } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { CableRib } from '@/components/stitch';

export const metadata: Metadata = {
  title: 'The Maker',
  description:
    'One pair of hands, a small studio in India, and a working method built on steady lead times and photographic proof before dispatch.',
};

const beliefs = [
  {
    t: 'Refuse more than you can finish',
    b: 'There are limited Bespoke slots each quarter. Closing the book is not a marketing tactic — it is the only way an eight-week piece is finished properly.',
  },
  {
    t: 'No price on the page, no price in the parcel',
    b: 'Hiding prices filters out people who were never going to pay, and a recipient should never learn what a gift cost.',
  },
  {
    t: 'The proof before the parcel',
    b: 'Every piece is photographed finished, shaped, and in daylight at full resolution, and approved before it ships. It removes the single largest source of anxiety in buying a gift for someone else.',
  },
  {
    t: 'Mend it for its life',
    b: 'If our work wears out, that is our problem, not yours. Send it back and it is repaired at no charge, for as long as you own it.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="wrap pt-16 pb-12 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Eyebrow>The maker</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              One pair
              <br />
              of hands.
            </h1>
            <p className="mt-10 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
              Every piece that leaves this studio is worked start to finish by a
              single maker. There is no second set of hands, no assembly line,
              and no piece that anyone else has touched.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="enter" style={{ '--d': '0.2s' } as React.CSSProperties}>
              <Figure
                alt="Studio table and crochet tools in daylight"
                ratio="4 / 5"
                tone="#d9dcd2"
                label="Studio"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Section className="pt-0">
        <div className="wrap">
          <Divider />
          <Reveal>
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 items-baseline">
              <div className="md:col-span-3">
                <p className="meta">Vanshika Mor</p>
              </div>
              <div className="md:col-span-9 flex flex-col gap-8">
                {[
                  'I learned this from a grandmother who made everything in the house and considered buying it a moral failing. There was no studio, no pricing, and no way to return anything.',
                  'What survived of that is the working method, not the scale. A steady lead time. Yarn chosen before it is needed. And a rule that a piece is not finished until it has been photographed and looked at properly — the same way it would be judged in person.',
                  'The website is new. The work is not. Everything photographed on this site was made in this studio in India, by hand, on this table.',
                ].map((para) => (
                  <p key={para} className="font-display text-[1.6rem] leading-[1.3] tracking-[-0.01em]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Working method */}
      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 items-center">
            <div className="md:col-span-8">
              <Reveal>
                <Figure
                  alt="A crochet hook working through plush yarn"
                  ratio="16 / 10"
                  tone="#c3c9b6"
                  label="On the hook"
                  caption="Work in progress in the studio"
                />
              </Reveal>
            </div>
            <div className="md:col-span-4 border-t border-hairline md:border-t-0 md:border-l md:pl-10 pt-8 md:pt-0">
              <Reveal delay={0.1}>
                <Eyebrow>Working method</Eyebrow>
                <p className="mt-6 leading-relaxed text-ink-soft">
                  The hook is matched to the piece. Tension is checked
                  continuously and every piece is measured and shaped. Yarn is
                  ordered in and left to rest before it is hooked — rested yarn
                  works more predictably than fresh skeins, ensuring consistent
                  stitch density.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <Reveal>
            <Eyebrow>Four things we will not do</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[length:var(--text-title)]">
              Where the position actually comes from.
            </h2>
          </Reveal>

          <div className="mt-16 border-t border-hairline">
            {beliefs.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.06}>
                <div className="grid grid-cols-1 border-b border-hairline py-8 md:grid-cols-12 md:gap-8 items-start">
                  <div className="md:col-span-2 flex items-baseline gap-3">
                    <span className="font-display text-[1.75rem] tnum text-ink-mute">
                      0{i + 1}
                    </span>
                    <CableRib tone="accent" className="h-3 w-6" />
                  </div>
                  <div className="md:col-span-4 mt-2 md:mt-0">
                    <h3 className="font-display text-[1.75rem] leading-tight">
                      {b.t}
                    </h3>
                  </div>
                  <div className="md:col-span-6 mt-3 md:mt-0">
                    <p className="max-w-lg leading-relaxed text-ink-soft">
                      {b.b}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow>What we are working on</Eyebrow>
                <h2 className="mt-6 text-[length:var(--text-title)]">
                  The book is small on purpose.
                </h2>
                <p className="mt-8 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                  Two Bespoke slots remain this quarter. Everything else is
                  The Signature Collection and The Ready Gift, which run in rotation.
                </p>
                <ul className="mt-10">
                  {[
                    'Bespoke — 1 slot remaining',
                    'The Signature Collection — accepting',
                    'The Ready Gift — in stock',
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-4 border-b border-hairline py-4"
                    >
                      <Chain className="opacity-60" />
                      <span className="meta text-ink-soft">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <ButtonLink href="/commission/">
                    See what is open
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:pt-6">
              <Reveal delay={0.12}>
                <Figure
                  src="/work/bow-bag.jpg"
                  alt="Handmade crochet bow bag in brown plush yarn"
                  ratio="3 / 4"
                  tone="#8b7d6b"
                  label="In the studio"
                  index="18 hrs"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
