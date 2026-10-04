import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { BlogView } from './BlogView';
import { PAGE_SEO } from '@/lib/data/page-seo';


export const metadata: Metadata = buildMetadata({
  title: 'American Whiskey, Scotch & Spirits Guides | Journal',
  description:
    'American whiskey, Scotch, Japanese whisky, tequila, cognac, gin, wine and beer guides for Australian buyers, with how to choose and buy them online.',
  path: '/blog/',
  keywords: [PAGE_SEO['/blog/'].primary, ...PAGE_SEO['/blog/'].secondary, ...PAGE_SEO['/blog/'].tags],
});

export default function BlogPage() {
  return <BlogView page={1} />;
}
