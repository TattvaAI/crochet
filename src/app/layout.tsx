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
const cormorant = localFont({
  src: [
    { path: '../../public/fonts/cormorant-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/cormorant-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/cormorant-500-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
  fallback: ['Times New Roman', 'serif'],
});

const satoshi = localFont({
  src: [
    { path: '../../public/fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mor.in'),
  title: {
    default: `${site.name} — Small-batch crochet creatures and keepsakes`,
    template: `%s — ${site.name}`,
  },
  description:
    'Small-batch crochet creatures and keepsakes, made one at a time in India. Commissioned, not manufactured.',
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — Small-batch crochet creatures and keepsakes`,
    description:
      'Small-batch crochet creatures and keepsakes, made one at a time in India. Commissioned, not manufactured.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#eef0ea',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${satoshi.variable}`}>
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
