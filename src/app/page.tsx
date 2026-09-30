import Link from 'next/link';
import { featured, process, materials, testimonials, faq } from '@/content/work';
import { tiers, leadTimeLabel } from '@/content/tiers';
import { site } from '@/lib/site';
import {
  Section,
  Eyebrow,
  IndexNum,
  Divider,
  Figure,
  ButtonLink,
  StripeField,
  ColumnRule,
  Chain,
} from '@/components/ui';
import { Reveal, MaskLines, Fade } from '@/components/motion';
import { Price } from '@/components/currency';
import { ShellStitch, CableRib } from '@/components/stitch';

export default function Home() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────
          Full-bleed editorial, off-centre subject, generous air.
          One claim, one CTA. The image does the identifying. */}
      <section className="relative">
        <div className="wrap grid gap-12 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 lg:pt-10">
            <Fade delay={0.1}>
              <Eyebrow>
                {site.location} · Est. 2019
              </Eyebrow>
            </Fade>

            <h1 className="mt-8 text-[length:var(--text-display)]">
              <MaskLines lines={['Made once,', 'for one person.']} />
            </h1>

            <Reveal delay={0.5}>
              <p className="mt-10 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Cashmere, merino and silk, worked by hand over weeks. Not
                manufactured, not stocked in sizes. You tell us who it is for
                and we make the one that will still be there in twenty years.
              </p>
            </Reveal>

            <Reveal delay={0.65}>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <ButtonLink href="/commission/">Commission a piece</ButtonLink>
                <ButtonLink href="/work/" variant="ghost">
                  See the work
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Hero image. Deliberately NOT centred, and not full
              width — an off-centre crop is what separates an
              editorial page from a template. */}
          <div className="lg:col-span-5 lg:pt-20">
            <Reveal delay={0.3} y={28}>
              <Figure
                src="/work/moss-granny.jpg"
                alt="Undyed cashmere blanket in six graded tones, raking daylight"
                ratio="3 / 4"
                tone="#8a8578"
                label="Moss · Undyed cashmere"
                priority
                index="340 hours"
              />
            </Reveal>
          </div>
        </div>

        {/* Marquee of the proof points. Slow, linear, no bounce. */}
        <div className="border-y border-hairline py-5">
          <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            {[
              '340 hours, average Atelier piece',
              'Undyed & hand-dyed fibre',
              'Proofed by photograph before dispatch',
              'Shipped worldwide',
            ].map((line) => (
              <span key={line} className="meta flex items-center gap-3">
                <Chain className="opacity-50" />
                {line}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE LADDER ───────────────────────────────────────────
          Price anchoring. The atelier price is on the page, which
          is what makes Heritage read as sensible. */}
      <Section className="relative overflow-hidden">
        <StripeField className="opacity-40" />
        <div className="wrap relative">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow>Three ways to commission</Eyebrow>
                <h2 className="mt-6 text-[length:var(--text-title)]">
                  A ladder, not a shop.
                </h2>
                <p className="mt-6 max-w-sm text-ink-soft">
                  The same hands at three levels of customisation. The tier
                  below yours is included so you can see what you are not
                  paying for.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <div className="grid gap-px bg-hairline sm:grid-cols-3">
                {tiers.map((tier, i) => (
                  <Reveal key={tier.id} delay={i * 0.08} as="article">
                    <div className="group relative flex h-full flex-col bg-ground p-7 transition-colors duration-500 hover:bg-ground-deep">
                      <ColumnRule className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <IndexNum n={tier.index} />
                      <h3 className="mt-7 font-display text-3xl">
                        {tier.name}
                      </h3>
                      <p className="meta mt-4 tnum">
                        <Price inr={tier.priceMin} /> —{' '}
                        <Price inr={tier.priceMax} />
                      </p>
                      <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                        {tier.summary}
                      </p>
                      <p className="meta mt-5">{leadTimeLabel(tier.days)}</p>
                      <Link
                        href={`/commission/#${tier.id}`}
                        className="meta link mt-auto w-fit pt-8 text-ink"
                      >
                        {tier.id === 'gift' ? 'Ready to ship' : 'Enquire'}
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SELECTED WORK ────────────────────────────────────── */}
      <Section>
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-6 text-[length:var(--text-title)]">
                Four pieces, in full.
              </h2>
            </div>
            <Link href="/work/" className="meta link text-ink-soft">
              The full archive
            </Link>
          </Reveal>

          <Divider className="mt-12" />

          {/* Asymmetric editorial grid — alternating offsets, no
              uniform 3-up card row. */}
          <div className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-12">
            {featured.map((p, i) => {
              const cols = [
                'md:col-span-7',
                'md:col-span-4 md:col-start-9 md:pt-24',
                'md:col-span-4 md:col-start-2',
                'md:col-span-6 md:col-start-7 md:pt-16',
              ];
              return (
                <Reveal
                  key={p.slug}
                  className={cols[i % 4]}
                  delay={(i % 2) * 0.08}
                >
                  <Link href={`/work/#${p.slug}`} className="group block">
                    <Figure
                      src={p.image}
                      alt={`${p.title} — ${p.material}`}
                      ratio={i % 2 === 0 ? '4 / 5' : '1 / 1'}
                      tone={p.swatch}
                      label={p.title}
                      index={`${p.hours} hrs`}
                    />
                    <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-hairline pt-4">
                      <div>
                        <h3 className="font-display text-2xl transition-opacity duration-500 group-hover:opacity-60">
                          {p.title}
                        </h3>
                        <p className="meta mt-2">{p.material}</p>
                      </div>
                      <p className="meta tnum shrink-0">
                        <Price inr={p.priceInr} />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── PROCESS ─────────────────────────────────────────────
          Full-bleed. Real studio photography is what proves a
          person is on the other end of this. */}
      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap">
          <Reveal className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>The making</Eyebrow>
              <h2 className="mt-6 text-[length:var(--text-title)]">
                Fourteen weeks, and you will not have to ask.
              </h2>
              <p className="mt-6 max-w-sm text-ink-soft">
                Three progress photographs whether you request them or not. A
                full-resolution proof before anything leaves the studio. This
                is the part that makes a commission a commission.
              </p>
            </div>
            <div className="md:col-span-7 md:pl-10">
              <Figure
                src="/process/making.jpg"
                alt="Hands working a crochet hook through a cashmere loop"
                ratio="16 / 10"
                tone="#b8ad9b"
                label="On the hook"
                caption="Studio, week nine"
              />
            </div>
          </Reveal>

          <Divider className="my-16" />

          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step, i) => (
              <Reveal key={step.n} as="li" delay={(i % 3) * 0.06}>
                <IndexNum n={step.n} rule={false} />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl">{step.title}</h3>
                  <span className="meta shrink-0">{step.duration}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ── FIBRE ─────────────────────────────────────────────── */}
      <Section>
        <div className="wrap">
          <Reveal>
            <Eyebrow>What it is made of</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[length:var(--text-title)]">
              Micron counts, not adjectives.
            </h2>
            <p className="mt-6 max-w-lg text-ink-soft">
              Anyone can call a blanket handmade. Here is exactly what is in
              yours, where it came from, and how it will age.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((m, i) => (
              <Reveal key={m.fibre} delay={(i % 3) * 0.06}>
                <div className="flex h-full flex-col bg-ground p-7">
                  <span
                    aria-hidden="true"
                    className="block h-1 w-12"
                    style={{ backgroundColor: m.swatch }}
                  />
                  <h3 className="mt-6 font-display text-2xl">{m.fibre}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                    {m.detail}
                  </p>
                  <p className="meta mt-6">{m.use}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Link
              href="/materials/"
              className="meta link mt-10 inline-block text-ink"
            >
              Full fibre and care notes
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── PROOF ───────────────────────────────────────────────
          Gift buyers are not short of inspiration, they are afraid
          of buying the wrong thing. These are recipient-side. */}
      <Section className="border-y border-hairline">
        <div className="wrap">
          <Reveal>
            <Eyebrow>What arrives</Eyebrow>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08} as="figure">
                <ShellStitch tone="accent" className="h-4 w-10" opacity={0.7} />
                <blockquote className="mt-6 font-display text-[1.65rem] leading-[1.15] tracking-[-0.015em]">
                  {t.quote}
                </blockquote>
                <figcaption className="meta mt-7 border-t border-hairline pt-4">
                  {t.author} — {t.context}
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── OBJECTION HANDLING ────────────────────────────────── */}
      <Section>
        <div className="wrap-narrow">
          <Reveal>
            <Eyebrow>Before you write</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-title)]">
              The four questions everyone has.
            </h2>
          </Reveal>

          <div className="mt-14">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group border-t border-hairline py-7 last:border-b">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-8">
                    <span className="font-display text-[1.6rem] leading-tight">
                      {f.q}
                    </span>
                    <span className="meta shrink-0 text-ink-mute transition-colors group-open:text-accent">
                      <CableRib className="h-3 w-5" />
                    </span>
                  </summary>
                  <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CLOSING CTA ─────────────────────────────────────────
          One action. Restated risk inversion: we will say no
          if it is not right, which is itself a luxury signal. */}
      <Section className="border-t border-hairline">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-[length:var(--text-display)]">
                Tell us who it is for.
              </h2>
              <p className="mt-8 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Two working days for a reply, and a straight answer on whether
                we are the right hands for it. If we are not, we will tell you
                who is.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <ButtonLink href="/contact/">Start an enquiry</ButtonLink>
                <ButtonLink href={`mailto:${site.email}`} variant="ghost">
                  {site.email}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={0.15}>
              <Figure
                src="/work/long-shawl.jpg"
                alt="Long cashmere shawl in madder-dyed yarn"
                ratio="4 / 5"
                tone="#a05a4a"
                label="The Long Shawl"
                index="140 hrs"
              />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
