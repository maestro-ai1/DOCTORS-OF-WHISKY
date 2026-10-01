import React from 'react';
import { buildMetadata } from '@/lib/seo';

// Internal search results are thin, near-duplicate pages: keep them out of the index but let crawlers follow links.
export const metadata = buildMetadata({
  title: 'Search Whisky, Spirits & Wine | Doctors of Whisky',
  description: 'Search the Doctors of Whisky catalogue by brand, style, region or price: single malt Scotch, Japanese whisky, bourbon, tequila, vodka, gin, wine and beer.',
  path: '/search/',
  noindex: true,
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
