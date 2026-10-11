import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';
import { PageSearches } from '@/components/PageSearches';
import { PAGE_SEO } from '@/lib/data/page-seo';


const TITLE = 'Contact Doctors of Whisky | WhatsApp, Email & Phone';
const DESC =
  'Contact Doctors of Whisky in Sydney by WhatsApp, email or phone for stock and price questions, order help and delivery anywhere in Australia.';

export const metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: '/contact/',
  keywords: [PAGE_SEO['/contact/'].primary, ...PAGE_SEO['/contact/'].secondary, ...PAGE_SEO['/contact/'].tags],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ type: 'ContactPage', name: TITLE, description: DESC, path: '/contact/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])]} />
      {children}
      <PageSearches path="/contact/" />
    </>
  );
}
