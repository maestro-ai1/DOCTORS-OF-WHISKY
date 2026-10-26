import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CuratedPage } from '@/components/CuratedPage';
import { BRAND_HUBS, BRAND_HUB_BY_SLUG } from '@/lib/data/brand-hubs';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return BRAND_HUBS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cfg = BRAND_HUB_BY_SLUG[slug];
  if (!cfg) return { title: 'Brand Not Found | Doctors of Whisky' };
  return buildMetadata({ title: cfg.title, description: cfg.description, path: cfg.path, keywords: [cfg.primary, ...cfg.secondary] });
}

export default async function BrandHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cfg = BRAND_HUB_BY_SLUG[slug];
  if (!cfg) notFound();
  return <CuratedPage cfg={cfg} />;
}
