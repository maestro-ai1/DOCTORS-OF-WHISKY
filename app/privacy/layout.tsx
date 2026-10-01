import React from 'react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';

const TITLE = 'Privacy Policy | Doctors of Whisky Australia';
const DESC =
  'How Doctors of Whisky collects, uses and protects your personal information, including order details, age verification and payment data, under the Australian Privacy Principles.';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: '/privacy/' });

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageLd({ name: TITLE, description: DESC, path: '/privacy/' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Privacy', path: '/privacy/' }])]} />
      {children}
    </>
  );
}
