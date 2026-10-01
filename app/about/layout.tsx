import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';

const TITLE = 'About Doctors of Whisky | Sydney Whisky Specialists';
const DESC =
  'Meet Doctors of Whisky, a Sydney online bottle shop for single malt Scotch, Japanese whisky and fine spirits: climate-controlled vault storage, bottle inspection and insured delivery across Australia.';

export const metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: '/about/',
  keywords: ['about doctors of whisky', 'whisky shop sydney', 'buy whisky online australia', 'whisky specialists australia'],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ type: 'AboutPage', name: TITLE, description: DESC, path: '/about/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])]} />
      {children}
    </>
  );
}
