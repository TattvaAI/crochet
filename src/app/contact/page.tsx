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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
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

          <div className="lg:col-span-5 lg:col-start-8">
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
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <Figure
                src="/process/dispatch.jpg"
                alt="A finished blanket folded with a hand-written care card"
                ratio="4 / 3"
                tone="#c3b8a6"
                label="How it arrives"
                caption="Folded, never rolled"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
            <Reveal delay={0.1}>
              <Eyebrow>Before you send this</Eyebrow>
              <h2 className="mt-6 text-[length:var(--text-title)]">
                Three things that speed it up.
              </h2>
              <ul className="mt-10">
                {[
                  ['The date', 'The single most important field. It determines the tier, the fibre, and whether we are free.'],
                  ['Who it is for', 'Not their name — who they are. A mother, a new home, someone who already owns too much.'],
                  ['Where it will live', 'A sofa gets a denser stitch than a bed. Wool, sunlight and washing frequency all change the brief.'],
                ].map(([k, v]) => (
                  <li key={k} className="border-b border-hairline py-5 first:border-t">
                    <p className="meta">{k}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {v}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <div className="wrap-narrow">
          <Reveal>
            <Eyebrow>Still deciding</Eyebrow>
            <h2 className="mt-6 text-[length:var(--text-title)]">
              The questions people ask first.
            </h2>
          </Reveal>
          <div className="mt-14">
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
      </Section>
    </>
  );
}
