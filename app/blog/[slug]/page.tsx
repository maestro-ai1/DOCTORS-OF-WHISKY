import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/data/blog';
import { getSubcategoryBySlug } from '@/lib/data/subcategories';
import { getProductsBySubCategory } from '@/lib/data/products';
import { ProductCardServer as ProductCard } from '@/components/ProductCardServer';
import { JsonLd } from '@/components/JsonLd';
import { TagCloud } from '@/components/TagCloud';
import { RelatedSearches } from '@/components/RelatedSearches';
import { inlineImageFor, topicFor } from '@/lib/data/blog-images';
import { buildTagLinks, linkList, collectionTagTemplates } from '@/lib/tag-links';
import { SITE } from '@/lib/config';
import { buildMetadata, breadcrumbLd, faqLd, absoluteUrl, subcategoryTags, blogTags, CONTENT_UPDATED } from '@/lib/seo';
import { ChevronRight, Calendar, Clock, ExternalLink, ArrowRight, HelpCircle } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/** Renders [text](/path/) inline links inside plain paragraph strings. */
function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={i++} href={m[2]} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

const isoDate = (d: string) => {
  const t = Date.parse(d);
  return Number.isNaN(t) ? CONTENT_UPDATED : new Date(t).toISOString().slice(0, 10);
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | Doctors of Whisky', robots: { index: false } };

  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}/`,
    keywords: blogTags(post, 60),
    image: { url: post.image, width: 1600, height: 900, alt: `${post.title} — ${post.primaryKeyword}` },
    type: 'article',
    publishedTime: isoDate(post.date),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post, 3);
  const sub = getSubcategoryBySlug(post.relatedSubcategory);
  const relatedProducts = sub ? getProductsBySubCategory(sub.slug).slice(0, 3) : [];
  const inline = inlineImageFor(post.slug);
  const collectionPath = sub ? `/shop/${sub.category}/collection/${sub.slug}/` : '/shop/';
  const tagLinks = post.tags && post.tags.length >= 20 ? linkList(post.tags, collectionPath, `/blog/${post.slug}/`, 20) : buildTagLinks(post.tags ?? subcategoryTags(post.relatedSubcategory, 200), collectionPath, `/blog/${post.slug}/`, 20, collectionTagTemplates(sub ? sub.name : post.primaryKeyword), collectionTagTemplates(topicFor(post.slug, post.primaryKeyword)).slice(0, 8));
  const relatedLinks = linkList(post.secondaryKeywords, collectionPath, `/blog/${post.slug}/`, 15);
  const allText = [...post.body, ...(post.sections || []).flatMap((s) => [s.heading, ...s.paragraphs])].join(' ');
  const wordCount = allText.split(/\s+/).filter(Boolean).length;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [absoluteUrl(post.image)],
    datePublished: isoDate(post.date),
    dateModified: post.updated || CONTENT_UPDATED,
    inLanguage: 'en-AU',
    wordCount,
    articleSection: post.category,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
    author: { '@type': 'Organization', name: SITE.name, url: `https://${SITE.domain}/` },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `https://${SITE.domain}/logo.png` } },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
    citation: post.outboundLinks.map((l) => l.url),
  };

  const breadcrumbSchema = breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Collector Journal', path: '/blog/' },
    { name: post.title, path: `/blog/${post.slug}/` },
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <JsonLd data={[articleSchema, breadcrumbSchema, ...(post.faqs && post.faqs.length ? [faqLd(post.faqs)] : [])]} />

      <article className="max-w-3xl mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
          <Link href="/" className="hover:text-amber-300 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href="/blog/" className="hover:text-amber-300 transition-colors">Collector Journal</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-200 font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        <header className="space-y-4">
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-950 border border-amber-700/60 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /><time dateTime={isoDate(post.date)}>{post.date}</time></span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          </div>
        </header>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
          <Image
            src={post.image}
            alt={`${post.primaryKeyword} — ${post.title}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <aside className="rounded-2xl bg-amber-950/30 border border-amber-800/40 p-5 space-y-2" aria-label="Key takeaways">
            <h2 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">Key takeaways: {post.primaryKeyword}</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-300">
              {post.keyTakeaways.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </aside>
        )}

        <div className="space-y-5">
          {post.body.map((para, idx) => (
            <p key={idx} className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {para}
            </p>
          ))}
        </div>

        {(post.sections || []).map((section, i) => (
          <React.Fragment key={i}>
          {i === 1 && inline && (
            <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <Image src={inline.src} alt={`${inline.alt} - ${post.primaryKeyword}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </figure>
          )}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100">{section.heading}</h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light"><RichText text={p} /></p>
            ))}
            {section.links && section.links.length > 0 && (
              <p className="text-sm text-neutral-400">
                Explore:{' '}
                {section.links.map((l, k) => (
                  <React.Fragment key={l.href}>
                    {k > 0 && ' · '}
                    <Link href={l.href} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">{l.text}</Link>
                  </React.Fragment>
                ))}
              </p>
            )}
          </section>
          </React.Fragment>
        ))}

        {relatedProducts.length > 0 && sub && (
          <section className="pt-8 border-t border-neutral-900 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-serif font-bold text-neutral-100">Buy {sub.name} online in Australia</h2>
              <Link href={`/shop/${sub.category}/collection/${sub.slug}/`} className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0">
                View collection <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((p) => (
                <div key={p.id} className="h-full"><ProductCard product={p} /></div>
              ))}
            </div>
          </section>
        )}

        {post.faqs && post.faqs.length > 0 && (
          <section className="pt-8 border-t border-neutral-900 space-y-4">
            <h2 className="text-xl font-serif font-bold text-neutral-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Frequently asked questions</span>
            </h2>
            <div className="space-y-3">
              {post.faqs.map((faq, idx) => (
                <details key={idx} className="group rounded-2xl bg-neutral-900/60 border border-neutral-800/90 open:border-amber-700/50 p-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base font-serif font-bold text-neutral-100 group-open:text-amber-300">
                    <span>{faq.question}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 text-neutral-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <RelatedSearches links={relatedLinks} title={`Related searches: ${post.primaryKeyword}`} />
        <TagCloud tags={tagLinks} title="Popular searches and tags" />

        <section className="pt-8 border-t border-neutral-900 space-y-3">
          <h2 className="text-sm font-serif font-bold text-neutral-100 uppercase tracking-wider">Sources and further reading</h2>
          <ul className="space-y-2">
            {post.outboundLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="pt-8 border-t border-neutral-900 space-y-5">
            <h2 className="text-lg font-serif font-bold text-neutral-100">Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}/`} className="group rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800 hover:border-amber-700/50 transition-colors p-4 space-y-2">
                  <h3 className="text-sm font-serif font-bold text-neutral-100 group-hover:text-amber-300 line-clamp-2">{r.title}</h3>
                  <p className="text-xs text-neutral-400">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
