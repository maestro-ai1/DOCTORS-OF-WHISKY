import React from 'react';
import type { Metadata } from 'next';
import Link from '@/components/AppLink';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/data/blog';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, breadcrumbLd, absoluteUrl } from '@/lib/seo';
import { PageSearches } from '@/components/PageSearches';
import { PAGE_SEO } from '@/lib/data/page-seo';


export const metadata: Metadata = buildMetadata({
  title: 'American Whiskey, Scotch & Spirits Guides | Journal',
  description:
    'American whiskey, Scotch, Japanese whisky, tequila, cognac, gin, wine and beer guides for Australian buyers, with how to choose and buy them online.',
  path: '/blog/',
  keywords: [PAGE_SEO['/blog/'].primary, ...PAGE_SEO['/blog/'].secondary, ...PAGE_SEO['/blog/'].tags],
});

// Every guide is rendered in the static HTML (no ?page= variants) so all article links are crawlable.
export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const pageItems = BLOG_POSTS.slice(1);
  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Doctors of Whisky Collector Journal',
    url: absoluteUrl('/blog/'),
    inLanguage: 'en-AU',
    blogPost: BLOG_POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(`/blog/${p.slug}/`) })),
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-16 px-4 sm:px-6 lg:px-8">
      <JsonLd data={[blogLd, breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Collector Journal', path: '/blog/' }])]} />
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto border-b border-neutral-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>The Collector Journal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100">
            Insights, Provenance &amp; Cellaring Guides
          </h1>
          <p className="text-sm text-neutral-400">
            {BLOG_POSTS.length} expert guides on whisky, spirits, wine and beer &mdash; authored for the discerning Australian drinker.
          </p>
        </div>

        {/* Featured Article */}
        {(

          <div className="relative rounded-3xl overflow-hidden bg-neutral-900/60 border border-amber-800/40 p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60">
                  Featured Guide
                </span>
                <span className="flex items-center gap-1 text-neutral-400">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100 leading-snug">
                {featured.title}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {featured.excerpt}
              </p>
              <div className="pt-2">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Read the Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pageItems.map((article) => (
            <article
              key={article.slug}
              className="rounded-2xl overflow-hidden bg-neutral-900/40 border border-neutral-800/80 hover:border-amber-700/50 transition-all flex flex-col justify-between space-y-4 p-5 hover:shadow-xl hover:shadow-black/60"
            >
              <div className="space-y-4">
                <Link href={`/blog/${article.slug}`} className="block relative h-48 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-neutral-950/80 text-[10px] font-bold text-amber-400 border border-amber-800/40">
                    {article.category}
                  </div>
                </Link>

                <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h3 className="text-base font-serif font-bold text-neutral-100 hover:text-amber-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs font-semibold text-amber-400">
                <Link href={`/blog/${article.slug}`} className="hover:underline flex items-center gap-1">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
      <PageSearches path="/blog/" fallback="/blog/" />
    </div>
  );
}
