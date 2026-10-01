import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';

const TITLE = 'Terms of Service | 18+ Alcohol Sales Rules';
const DESC =
  'Terms of service for Doctors of Whisky: 18+ alcohol sales, order acceptance, payment and delivery conditions, cancellations and compliance rules for Australian customers.';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: '/terms/' });

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ name: TITLE, description: DESC, path: '/terms/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Terms', path: '/terms/' }])]} />
      {children}
    </>
  );
}
