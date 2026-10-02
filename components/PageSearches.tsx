import React from 'react';
import { PAGE_SEO } from '@/lib/data/page-seo';
import { linkList } from '@/lib/tag-links';
import { RelatedSearches } from '@/components/RelatedSearches';
import { TagCloud } from '@/components/TagCloud';

/** 15 secondary keywords (H2 + links) and 20 tags for a non-product page, from lib/data/page-seo.ts. */
export function PageSearches({ path, fallback = '/shop/' }: { path: string; fallback?: string }) {
  const seo = PAGE_SEO[path];
  if (!seo) return null;
  return (
    <div className="bg-neutral-950 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-5xl mx-auto space-y-2">
        <RelatedSearches links={linkList(seo.secondary, fallback, path, 15)} title={`Related searches: ${seo.primary}`} />
        <TagCloud tags={linkList(seo.tags, fallback, path, 20)} title="Popular searches and tags" />
      </div>
    </div>
  );
}
