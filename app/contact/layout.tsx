import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';
import { PageSearches } from '@/components/PageSearches';
import { PAGE_SEO } from '@/lib/data/page-seo';


const TITLE = 'Whiskey for Sale | Contact Doctors of Whisky Sydney';
const DESC =
  'Whiskey for sale: contact Doctors of Whisky by email, phone or WhatsApp for whisky recommendations, stock and price enquiries, order help and delivery questions anywhere in Australia.';

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
