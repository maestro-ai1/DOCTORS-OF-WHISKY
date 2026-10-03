import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUBCATEGORIES, getSubcategoryBySlug } from '@/lib/data/subcategories';
import { getProductsBySubCategory } from '@/lib/data/products';
import { buildMetadata, subcategoryTags, titleCase } from '@/lib/seo';
import { SHOP_PAGE_SIZE } from '@/lib/shop-pages';
import { CollectionView } from '../../CollectionView';

interface Props {
  params: Promise<{ category: string; subcategory: string; n: string }>;
}

export const dynamicParams = false;

/** Pages 2+ of collections with more than SHOP_PAGE_SIZE bottles. */
export function generateStaticParams() {
  return SUBCATEGORIES.flatMap((sub) => {
    const pages = Math.ceil(getProductsBySubCategory(sub.slug).length / SHOP_PAGE_SIZE);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ category: sub.category, subcategory: sub.slug, n: String(i + 2) }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory, n } = await params;
  const sub = getSubcategoryBySlug(subcategory);
  if (!sub) return { title: 'Collection Not Found | Doctors of Whisky' };
  const base = sub.name.toLowerCase().includes(sub.primaryKeyword.toLowerCase()) ? `Buy ${sub.name} Online Australia` : `${titleCase(sub.primaryKeyword)} | Buy ${sub.name} Online`;
  return buildMetadata({
    title: `${base} – Page ${n}`,
    description: `Page ${n}: ${sub.description}`,
    path: `/shop/${category}/collection/${subcategory}/page/${n}/`,
    keywords: subcategoryTags(subcategory, 60),
  });
}

export default async function CollectionPageN({ params }: Props) {
  const { category, subcategory, n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2) notFound();
  return <CollectionView catSlug={category} subSlug={subcategory} page={page} />;
}
