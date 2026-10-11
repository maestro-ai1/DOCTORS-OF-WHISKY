import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';
import { PageSearches } from '@/components/PageSearches';
import { PAGE_SEO } from '@/lib/data/page-seo';


const TITLE = 'About Doctors of Whisky | Sydney Whisky & Spirits Shop';
const DESC =
  'About Doctors of Whisky: a Sydney bottle shop selling Scotch, Japanese whisky, tequila, gin and fine spirits online, with insured delivery across Australia. 18+ only.';

export const metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: '/about/',
  keywords: [PAGE_SEO['/about/'].primary, ...PAGE_SEO['/about/'].secondary, ...PAGE_SEO['/about/'].tags],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ type: 'AboutPage', name: TITLE, description: DESC, path: '/about/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])]} />
      {children}
      <PageSearches path="/about/" />
    </>
  );
}
