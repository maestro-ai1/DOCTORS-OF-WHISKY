import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { PAGE_SEO } from '@/lib/data/page-seo';
import { BlogView, BLOG_PAGE_COUNT } from '../../BlogView';

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: BLOG_PAGE_COUNT - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  return buildMetadata({
    title: `Whisky, Scotch & Spirits Guides: Page ${n} | Journal`,
    description: `Page ${n} of ${BLOG_PAGE_COUNT}: American whiskey, Scotch, Japanese whisky, tequila, cognac, gin, wine and beer guides for Australian buyers, with how to choose and buy them online.`,
    path: `/blog/page/${n}/`,
    keywords: [PAGE_SEO['/blog/'].primary, ...PAGE_SEO['/blog/'].secondary],
  });
}

export default async function BlogPageN({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > BLOG_PAGE_COUNT) notFound();
  return <BlogView page={page} />;
}
