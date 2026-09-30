import type { NextConfig } from 'next';

/**
 * Dev and production builds MUST NOT share an output directory.
 *
 * Running `next build` while `next dev` is running overwrites the
 * dev server's compiled chunks and produces runtime failures like
 * "Cannot find module './611.js'" on every page. That is not a bug in
 * the app — it is two compilers writing to one directory.
 *
 * Dev writes to `.next-dev`, production to `.next`. They cannot
 * collide, so you can leave the dev server running while you build.
 */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  distDir: isDev ? '.next-dev' : '.next',

  // Deliberately NOT `output: 'export'`.
  //
  // Every page here is a Server Component with no runtime data
  // dependency, so they all prerender to static HTML regardless —
  // zero JS for the content, CDN-cached, instant. Removing the
  // static-export flag costs nothing at runtime and buys us a
  // working Server Action for the enquiry form. A truly static
  // export would force the form onto a third-party endpoint and
  // hand a third party the lead. Not a trade worth making for
  // one form.
  images: {
    // Placeholder images ship as <img>. Once real photography is in
    // and you have a domain, set this to false for automatic
    // resizing, AVIF and WebP.
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
