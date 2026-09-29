import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/data/blog';
import { getSubcategoryBySlug } from '@/lib/data/subcategories';
import { getProductsBySubCategory } from '@/lib/data/products';
import { ProductCard } from '@/components/ProductCard';
import { SITE } from '@/lib/config';
import { ChevronRight, Calendar, Clock, ExternalLink, ArrowRight } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | Doctors of Whisky' };

  const title = `${post.title} | ${SITE.name}`;
  return {
    title: title.length > 65 ? post.title : title,
    description: post.excerpt,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords.slice(0, 10)],
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: `https://${SITE.domain}${post.image}`, width: 1200, height: 1200, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post, 3);
  const sub = getSubcategoryBySlug(post.relatedSubcategory);
  const relatedProducts = sub ? getProductsBySubCategory(sub.slug).slice(0, 3) : [];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `https://${SITE.domain}${post.image}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: `https://${SITE.domain}/blog/${post.slug}/`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Collector Journal', item: `https://${SITE.domain}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://${SITE.domain}/blog/${post.slug}/` },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-3xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
          <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href="/blog" className="hover:text-amber-300 transition-colors">Collector Journal</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-200 font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        <div className="space-y-4">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-950 border border-amber-700/60 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          </div>
        </div>

        <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-white">
          <Image src={post.image} alt={post.title} fill className="object-contain p-6" sizes="(max-width: 768px) 100vw, 768px" />
        </div>

        <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-5">
          {post.body.map((para, idx) => (
            <p key={idx} className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {para}
            </p>
          ))}
        </div>

        {relatedProducts.length > 0 && sub && (
          <div className="pt-8 border-t border-neutral-900 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-neutral-100">Shop {sub.name}</h2>
              <Link href={`/shop/${sub.category}/collection/${sub.slug}`} className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                View Collection <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((p) => (
                <div key={p.id} className="h-full"><ProductCard product={p} /></div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-neutral-900 space-y-3">
          <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider">Further Reading</h2>
          <ul className="space-y-2">
            {post.outboundLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {related.length > 0 && (
          <div className="pt-8 border-t border-neutral-900 space-y-5">
            <h2 className="text-lg font-serif font-bold text-neutral-100">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800 hover:border-amber-700/50 transition-colors p-4 space-y-2">
                  <h3 className="text-sm font-serif font-bold text-neutral-100 group-hover:text-amber-300 line-clamp-2">{r.title}</h3>
                  <p className="text-xs text-neutral-500">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
