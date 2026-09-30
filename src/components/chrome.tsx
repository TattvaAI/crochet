import Link from 'next/link';
import { site } from '@/lib/site';
import { CurrencySwitch } from './currency';
import { Chain } from './ui';

const nav = [
  { href: '/work/', label: 'The Work' },
  { href: '/commission/', label: 'Commission' },
  { href: '/materials/', label: 'Fibre' },
  { href: '/about/', label: 'The Maker' },
  { href: '/contact/', label: 'Enquire' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ground/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="meta text-ink transition-opacity duration-500 hover:opacity-60"
        >
          {site.wordmark}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="meta link text-ink-soft transition-colors duration-500 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <CurrencySwitch />
          <Link
            href="/commission/"
            className="meta hidden bg-ink px-4 py-2 text-ground transition-colors duration-500 hover:bg-accent sm:inline-block"
          >
            Enquire
          </Link>
          <details className="relative md:hidden">
            <summary className="meta cursor-pointer list-none text-ink">Menu</summary>
            <div className="absolute right-0 top-8 z-50 w-48 border border-hairline bg-ground py-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="meta block px-4 py-3 text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="wrap grid gap-12 py-16 md:grid-cols-4 md:py-20">
        <div className="md:col-span-2">
          <p className="font-display text-[2.5rem] leading-[0.95]">
            {site.name}
          </p>
          <p className="meta mt-4 max-w-xs leading-relaxed">
            Hand-crochet heirlooms in natural fibre. Made to order, in India,
            shipped worldwide.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="meta">Studio</p>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="meta link w-fit text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="meta">Contact</p>
          <a
            href={`mailto:${site.email}`}
            className="meta link w-fit text-ink-soft transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="meta link w-fit text-ink-soft transition-colors hover:text-ink"
          >
            {site.instagramHandle}
          </a>
          <p className="meta leading-relaxed">{site.location}</p>
        </div>
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-hairline py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          © {new Date().getFullYear()} {site.legalName}
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {['Lead times', 'Shipping', 'Care & repair', 'Gifting'].map((l) => (
            <li key={l} className="flex items-center gap-5">
              <span className="meta text-ink-mute">{l}</span>
              <Chain className="opacity-40" />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
