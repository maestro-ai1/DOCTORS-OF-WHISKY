import type { Metadata } from 'next';
import { SUBCATEGORIES, getSubcategoryBySlug } from '@/lib/data/subcategories';
import { buildMetadata, subcategoryTags, titleCase } from '@/lib/seo';
import { CollectionView } from './CollectionView';

interface CollectionPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateStaticParams() {
  return SUBCATEGORIES.map((sub) => ({
    category: sub.category,
    subcategory: sub.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { subcategory: subSlug, category: catSlug } = await params;
  const sub = getSubcategoryBySlug(subSlug);
  if (!sub) return { title: 'Collection Not Found | Doctors of Whisky' };

  const path = `/shop/${catSlug}/collection/${subSlug}/`;
  return buildMetadata({
    title: sub.name.toLowerCase().includes(sub.primaryKeyword.toLowerCase()) ? `Buy ${sub.name} Online Australia` : `${titleCase(sub.primaryKeyword)} | Buy ${sub.name} Online`,
    description: sub.description,
    path,
    keywords: subcategoryTags(subSlug, 120),
    image: sub.heroImage ? { url: sub.heroImage, width: 1200, height: 900, alt: `${sub.name} collection — ${sub.primaryKeyword}` } : undefined,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { category: catSlug, subcategory: subSlug } = await params;
  return <CollectionView catSlug={catSlug} subSlug={subSlug} page={1} />;
}
