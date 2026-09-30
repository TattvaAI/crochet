import Link from 'next/link';
import { ButtonLink, Eyebrow } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center py-24">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-8 text-[length:var(--text-display)]">
        This one
        <br />
        unravels.
      </h1>
      <p className="mt-10 max-w-md text-[length:var(--text-lede)] leading-relaxed text-ink-soft">
        The page you are looking for is not here. The work, the pricing and the
        enquiry form all still are.
      </p>
      <div className="mt-12 flex flex-wrap gap-4">
        <ButtonLink href="/">Back to the studio</ButtonLink>
        <ButtonLink href="/work/" variant="ghost">
          See the work
        </ButtonLink>
      </div>
    </section>
  );
}
