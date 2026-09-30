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
import { Reveal } from '@/components/motion';
import { Price } from '@/components/currency';
import { ShellStitch, CableRib } from '@/components/stitch';

export default function Home() {
  const heroTier = tiers[0]!;
  const subTiers = tiers.slice(1);
  const featuredTestimonial = testimonials[1]!;
  const firstTestimonial = testimonials[0]!;
  const lastTestimonial = testimonials[2]!;

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────
          Full-bleed editorial, off-centre subject, generous air.
          One claim, one CTA. The image does the identifying. */}
      <section className="relative">
        <div className="wrap grid grid-cols-1 gap-12 pt-16 pb-20 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-28">
          <div className="md:col-span-7 lg:pt-10">
            <div className="enter" style={{ '--d': '0.1s' } as React.CSSProperties}>
              <Eyebrow>
                {site.location} · Est. 2019
              </Eyebrow>
            </div>

            <h1 className="mt-8 text-[length:var(--text-display)]">
              <span className="enter-mask" aria-hidden="true">
                <span style={{ animationDelay: '0.15s' }}>Made once,</span>
              </span>
              <span className="enter-mask" aria-hidden="true">
                <span style={{ animationDelay: '0.26s' }}>for one person.</span>
              </span>
              <span className="sr-only">Made once, for one person.</span>
            </h1>

            <div className="enter mt-10 max-w-md" style={{ '--d': '0.5s' } as React.CSSProperties}>
              <p className="text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
                Plush-touch yarn, worked by hand over weeks. Not
                manufactured, not stocked in sizes. You tell us who it is for
                and we make the one that will stay with them.
              </p>
            </div>

            <div className="enter mt-12 flex flex-wrap items-center gap-4" style={{ '--d': '0.65s' } as React.CSSProperties}>
              <div className="flex flex-wrap items-center gap-4">
                <ButtonLink href="/commission/">Commission a piece</ButtonLink>
                <ButtonLink href="/work/" variant="ghost">
                  See the work
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Hero image. Deliberately NOT centred, and not full
              width — an off-centre crop is what separates an
              editorial page from a template. */}
          <div className="md:col-span-5 lg:pt-20">
            <div className="enter" style={{ '--d': '0.3s', '--enter-y': '28px' } as React.CSSProperties}>
              <Figure
                src="/work/hero-bunny.jpg"
                alt="White crochet bunny held up against a blue sky"
                ratio="3 / 4"
                tone="#c3c9b6"
                label="Cloud Bunny"
                priority
                index="12 hours"
              />
            </div>
          </div>
        </div>

        {/* Marquee of the proof points. Slow, linear, no bounce. */}
        <div className="border-y border-hairline py-5">
          <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            {[
              'Plush-touch yarn, sourced per piece',
              'One maker, start to finish',
              'Photographic proof before dispatch',
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
          Hero+2 asymmetric grid. The Ready Gift commands full width
          as the introductory hero, with Signature and Bespoke below. */}
      <Section className="relative overflow-hidden">
        <StripeField className="opacity-40" />
        <div className="wrap relative">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
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
              <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
                {/* Hero tier: The Ready Gift */}
                <Reveal delay={0} as="article" className="md:col-span-2">
                  <div className="group relative flex h-full flex-col bg-ground p-7 transition-colors duration-500 hover:bg-ground-deep md:p-9">
                    <ColumnRule className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex items-baseline justify-between gap-4">
                      <IndexNum n={heroTier.index} />
                      <span className="meta">{leadTimeLabel(heroTier.days)}</span>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 md:items-baseline">
                      <div className="md:col-span-6">
                        <h3 className="font-display text-3xl md:text-4xl">
                          {heroTier.name}
                        </h3>
                        <p className="meta mt-4 tnum">
                          <Price inr={heroTier.priceMin} /> —{' '}
                          <Price inr={heroTier.priceMax} />
                        </p>
                      </div>
                      <div className="flex h-full flex-col justify-between md:col-span-6">
                        <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                          {heroTier.summary}
                        </p>
                        <Link
                          href={`/commission/#${heroTier.id}`}
                          className="meta link mt-6 w-fit text-ink md:mt-8"
                        >
                          {heroTier.id === 'ready' ? 'Ready to ship' : 'Enquire'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Sub-tiers: Signature and Bespoke */}
                {subTiers.map((tier, i) => (
                  <Reveal key={tier.id} delay={(i + 1) * 0.08} as="article" className="md:col-span-1">
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
                        {tier.id === 'ready' ? 'Ready to ship' : 'Enquire'}
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
          <div className="mt-16 grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-8 md:gap-y-20">
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
          Reversed split top (image left) followed by a sequential
          numbered editorial list with sparse hairline dividers. */}
      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap">
          <Reveal className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <div className="order-2 md:order-1 md:col-span-7 md:pr-10">
              <Figure
                alt="Crochet hook working through plush yarn"
                ratio="16 / 10"
                tone="#c3c9b6"
                label="On the hook"
                caption="Studio progress"
              />
            </div>
            <div className="order-1 md:order-2 md:col-span-5">
              <Eyebrow>The making</Eyebrow>
              <h2 className="mt-6 text-[length:var(--text-title)]">
                Weeks of handwork, and you will not have to ask.
              </h2>
              <p className="mt-6 max-w-sm text-ink-soft">
                Progress photographs whether you request them or not. A
                full-resolution proof before anything leaves the studio. This
                is the part that makes a commission a commission.
              </p>
            </div>
          </Reveal>

          <Divider className="my-16" />

          {/* Numbered editorial list with sparse hairline dividers */}
          <ol className="divide-y divide-hairline border-y border-hairline">
            {process.map((step, i) => (
              <Reveal key={step.n} as="li" delay={(i % 3) * 0.06}>
                <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                  <div className="md:col-span-2">
                    <IndexNum n={step.n} />
                  </div>
                  <div className="flex items-baseline justify-between gap-4 md:col-span-4">
                    <h3 className="font-display text-2xl md:text-3xl">{step.title}</h3>
                    <span className="meta shrink-0">{step.duration}</span>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ── STITCHES & MATERIALS ────────────────────────────────
          The ONE section retaining the equal-3-col gap-px bg-hairline
          grid family, strictly collapsing below 768px. */}
      <Section>
        <div className="wrap">
          <Reveal>
            <Eyebrow>What it is made of</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[length:var(--text-title)]">
              Plush-touch yarn and proven stitches.
            </h2>
            <p className="mt-6 max-w-lg text-ink-soft">
              Plush-touch yarn, sourced per piece. Here is how each stitch
              behaves, where it is used, and how it holds up.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-hairline md:grid-cols-3">
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
              Full materials and care notes
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── PROOF ───────────────────────────────────────────────
          Full-width statement section. Monumental lead testimonial
          paired with asymmetric supporting reflections. */}
      <Section className="border-y border-hairline">
        <div className="wrap">
          <Reveal>
            <Eyebrow>What arrives</Eyebrow>
          </Reveal>

          <div className="mt-12">
            <Reveal delay={0.08} as="figure" className="max-w-5xl">
              <ShellStitch tone="accent" className="h-5 w-12" opacity={0.75} />
              <blockquote className="mt-8 font-display text-[2rem] leading-[1.1] tracking-[-0.02em] md:text-[2.75rem] lg:text-[length:var(--text-title)]">
                {featuredTestimonial.quote}
              </blockquote>
              <figcaption className="meta mt-8 border-t border-hairline pt-4">
                {featuredTestimonial.author} — {featuredTestimonial.context}
              </figcaption>
            </Reveal>

            <Divider className="my-14 md:my-16" />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
              <Reveal delay={0.16} as="figure" className="md:col-span-7">
                <ShellStitch tone="accent" className="h-4 w-10" opacity={0.7} />
                <blockquote className="mt-6 font-display text-[1.65rem] leading-[1.15] tracking-[-0.015em]">
                  {firstTestimonial.quote}
                </blockquote>
                <figcaption className="meta mt-7 border-t border-hairline pt-4">
                  {firstTestimonial.author} — {firstTestimonial.context}
                </figcaption>
              </Reveal>

              <Reveal delay={0.24} as="figure" className="md:col-span-5 md:pl-6">
                <ShellStitch tone="accent" className="h-4 w-10" opacity={0.7} />
                <blockquote className="mt-6 font-display text-[1.65rem] leading-[1.15] tracking-[-0.015em]">
                  {lastTestimonial.quote}
                </blockquote>
                <figcaption className="meta mt-7 border-t border-hairline pt-4">
                  {lastTestimonial.author} — {lastTestimonial.context}
                </figcaption>
              </Reveal>
            </div>
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
          Reversed editorial split (image left, text right) to break
          zigzag repetition and anchor the close. */}
      <Section className="border-t border-hairline">
        <div className="wrap grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          <div className="order-2 md:order-1 md:col-span-5 lg:pt-6">
            <Reveal delay={0.15}>
              <Figure
                src="/work/strawberry-hat.jpg"
                alt="Red strawberry crochet hat worn by a girl, back view"
                ratio="4 / 5"
                tone="#a84444"
                label="Strawberry Hat"
                index="8 hrs"
              />
            </Reveal>
          </div>
          <div className="order-1 md:order-2 md:col-span-7 md:pl-8">
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
        </div>
      </Section>
    </>
  );
}
