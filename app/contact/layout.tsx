import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';

const TITLE = 'Contact Doctors of Whisky | Sydney Whisky Concierge';
const DESC =
  'Contact Doctors of Whisky by email, phone or WhatsApp for whisky recommendations, stock and price enquiries, order help and delivery questions anywhere in Australia.';

export const metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: '/contact/',
  keywords: ['contact doctors of whisky', 'whisky shop sydney contact', 'buy whisky whatsapp australia', 'whisky enquiry'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ type: 'ContactPage', name: TITLE, description: DESC, path: '/contact/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])]} />
      {children}
    </>
  );
}
