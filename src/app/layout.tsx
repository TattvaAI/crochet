import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site } from '@/lib/site';
import { CurrencyProvider } from '@/components/currency';
import { Header, Footer } from '@/components/chrome';
import { GrainField } from '@/components/ui';
import './globals.css';

/**
 * Fonts are self-hosted from /public/fonts rather than loaded from
 * Google Fonts. A blocking @import to fonts.googleapis.com measured
 * 5.1 seconds on this machine, and it sits on the critical path to
 * first paint. next/font also gives us `font-display: swap` and a
 * preloaded local file, so text renders immediately in a fallback
 * face and swaps when the real one lands — no invisible text, no
 * layout shift.
 */
const instrumentSerif = localFont({
  src: [
    { path: '../../public/fonts/instrument-serif-regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/instrument-serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: true,
  fallback: ['Times New Roman', 'serif'],
});

const inter = localFont({
  src: '../../public/fonts/inter-var.woff2',
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: '100 900',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://crochit.com'),
  title: {
    default: `${site.name} — Hand-crochet heirlooms in natural fibre`,
    template: `%s — ${site.name}`,
  },
  description:
    'Bespoke crochet blankets, throws and shawls in undyed cashmere, merino and silk. Made to order by one pair of hands. Commissioned, not manufactured.',
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — Hand-crochet heirlooms in natural fibre`,
    description:
      'Bespoke crochet blankets, throws and shawls in undyed cashmere, merino and silk. Made to order by one pair of hands.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f4f1ea',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body className="antialiased">
        <GrainField />
        <CurrencyProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-ground"
          >
            Skip to content
          </a>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CurrencyProvider>
      </body>
    </html>
  );
}
