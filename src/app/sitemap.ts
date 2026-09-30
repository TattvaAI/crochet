import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const BASE = 'https://crochit.com';

/**
 * Sitemap — the list of pages search engines and link-preview
 * scrapers read. Without it, a shared link can still preview but
 * Google has nothing to crawl.
 *
 * ⚠️ Update BASE to your real domain before going live. It must
 * match `metadataBase` in src/app/layout.tsx.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/commission/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/work/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/materials/`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE}/about/`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/contact/`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ];
}
