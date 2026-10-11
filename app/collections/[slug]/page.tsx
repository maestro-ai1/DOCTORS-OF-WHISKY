import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CuratedPage } from '@/components/CuratedPage';
import { CURATED, COLLECTION_SLUGS } from '@/lib/data/curated';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cfg = CURATED[slug];
  if (!cfg) return { title: 'Collection Not Found | Doctors of Whisky' };
  return buildMetadata({ title: cfg.title, description: cfg.description, path: cfg.path, keywords: [cfg.primary, ...cfg.secondary] });
}

export default async function CuratedCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cfg = CURATED[slug];
  if (!cfg || !(COLLECTION_SLUGS as readonly string[]).includes(slug)) notFound();
  return <CuratedPage cfg={cfg} />;
}
