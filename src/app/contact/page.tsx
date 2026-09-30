import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Section, Eyebrow, Divider, Chain, Figure } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { EnquiryForm } from '@/components/enquiry-form';
import { faq } from '@/content/work';

export const metadata: Metadata = {
  title: 'Enquire',
  description:
    'Start a crochet commission. Tell us who it is for and when it needs to arrive — a straight answer within two working days.',
};

export default function ContactPage() {
  return (
    <>
      <section className="wrap pt-16 pb-12 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 lg:col-span-6">
            <Eyebrow>Enquire</Eyebrow>
            <h1 className="mt-8 text-[length:var(--text-display)]">
              Tell us who
              <br />
              it is for.
            </h1>
            <p className="mt-10 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
              The single most useful thing you can tell us is who receives it.
              Everything else follows from that — including whether this is
              something we should decline.
            </p>

            <div className="mt-14">
              <Divider />
              <dl className="mt-8 flex flex-col gap-6">
                {[
                  ['Email', site.email, `mailto:${site.email}`],
                  ['Instagram', site.instagramHandle, site.instagram],
                  ['Studio', site.location, null],
                  ['Reply time', 'Two working days', null],
                ].map(([k, v, href]) => (
                  <div
                    key={k}
                    className="flex flex-wrap items-baseline justify-between gap-4"
                  >
                    <dt className="meta">{k}</dt>
                    <dd className="text-sm text-ink-soft">
                      {href ? (
                        <a
                          href={href}
                          className="link text-ink"
                          {...(href.startsWith('http')
                            ? { target: '_blank', rel: 'noreferrer' }
                            : {})}
                        >
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-14 max-w-md">
              <Eyebrow>What happens next</Eyebrow>
              <ul className="mt-6">
                {[
                  'A straight answer within two working days, including if the answer is no.',
                  'A tier recommendation and a confirmed date, with the date calculator run for you.',
                  'Photographs of comparable work — undated and unbranded, yours to keep.',
                  'A written quote. Fifty per cent only once you are certain.',
                ].map((line) => (
                  <li
                    key={line}
                    className="flex gap-4 border-b border-hairline py-4 text-sm leading-relaxed text-ink-soft"
                  >
                    <Chain className="mt-1.5 opacity-60" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.15}>
              <div className="border border-hairline p-8 md:p-10">
                <Eyebrow>The form</Eyebrow>
                <h2 className="mt-6 font-display text-[2.25rem] leading-none">
                  Four fields and a date.
                </h2>
                <div className="mt-10">
                  <EnquiryForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="border-y border-hairline bg-ground-deep">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow>Before you send this</Eyebrow>
                <h2 className="mt-6 text-[length:var(--text-title)]">
                  Three things that speed it up.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <Figure
                  alt="A finished order packed with a hand-written care card"
                  ratio="16 / 10"
                  tone="#d9dcd2"
                  label="How it arrives"
                  caption="Packed with care"
                />
              </Reveal>
            </div>
          </div>

          <div className="mt-14 border-t border-hairline">
            {[
              ['The date', 'The single most important field. It determines the tier, the materials, and whether we are free.'],
              ['Who it is for', 'Not their name — who they are. A friend, a collector, someone who already owns too much.'],
              ['What you have in mind', 'A character, a photograph, or an accessory from the collection. Dimensions and palette help set the brief.'],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06}>
                <div className="grid grid-cols-1 border-b border-hairline py-7 md:grid-cols-12 md:gap-8 md:items-baseline">
                  <div className="md:col-span-3 flex items-baseline gap-4">
                    <span className="font-display text-[1.5rem] tnum text-ink-mute">
                      0{i + 1}
                    </span>
                    <p className="meta">{k}</p>
                  </div>
                  <div className="md:col-span-9 mt-2 md:mt-0">
                    <p className="text-sm md:text-base leading-relaxed text-ink-soft">
                      {v}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow>Still deciding</Eyebrow>
                <h2 className="mt-6 text-[length:var(--text-title)]">
                  The questions people ask first.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <div>
                {faq.map((f, i) => (
                  <Reveal key={f.q} delay={(i % 3) * 0.05}>
                    <details className="group border-t border-hairline py-7 last:border-b">
                      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-8">
                        <span className="font-display text-[1.6rem] leading-tight">
                          {f.q}
                        </span>
                        <span className="meta shrink-0 text-ink-mute transition-colors group-open:text-accent">
                          Open
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
          </div>
        </div>
      </Section>
    </>
  );
}
