import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/data/page-seo';
import { PRODUCTS } from '@/lib/data/products';
import { SHOP_PAGE_COUNT, shopPagePath } from '@/lib/shop-pages';
import { ShopView } from '../../ShopView';

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: SHOP_PAGE_COUNT - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  return buildMetadata({
    title: `Buy Whiskey Online Australia: Page ${n} | Whisky & Wine`,
    description: `Page ${n} of ${SHOP_PAGE_COUNT}: buy whiskey online and shop ${PRODUCTS.length}+ bottles of Scotch, Japanese whisky, bourbon, tequila, gin, cognac, wine and beer with insured delivery across Australia.`,
    path: shopPagePath(Number(n)),
    keywords: [PAGE_SEO['/shop/'].primary, ...PAGE_SEO['/shop/'].secondary],
  });
}

export default async function ShopPageN({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > SHOP_PAGE_COUNT) notFound();
  return <ShopView page={page} />;
}
