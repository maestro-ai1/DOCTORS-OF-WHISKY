import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { ProductDetailClient } from './ProductDetailClient';
import { buildMetadata, productTags, productLd, faqLd, breadcrumbLd, ld } from '@/lib/seo';
import { TagCloud } from '@/components/TagCloud';
import { RelatedSearches } from '@/components/RelatedSearches';
import { AuthorityLinks } from '@/components/AuthorityLinks';
import { authorityFor } from '@/lib/data/authority-links';
import { buildTagLinks, linkList, productTagTemplates } from '@/lib/tag-links';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Bottle Not Found | Doctors of Whisky', robots: { index: false } };
  }

  return buildMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: `/shop/${product.category}/${product.slug}/`,
    keywords: productTags(product, 60),
    image: { url: product.images[0], width: 1200, height: 900, alt: `${product.name} ${product.size} — ${product.primaryKeyword}` },
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 3);
  const category = MAIN_CATEGORIES.find((c) => c.slug === product.category);
  const collectionPath = `/shop/${product.category}/collection/${product.subCategorySlug}/`;
  const selfPath = `/shop/${product.category}/${product.slug}/`;
  const tagLinks = product.tags && product.tags.length >= 20 ? linkList(product.tags, collectionPath, selfPath, 20) : buildTagLinks(product.tags ?? productTags(product, 200), collectionPath, selfPath, 20, productTagTemplates(product));
  const relatedLinks = linkList(product.secondaryKeywords, collectionPath, selfPath, 15);

  const breadcrumb = breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop/' },
    { name: category ? category.name.charAt(0) + category.name.slice(1).toLowerCase() : product.category, path: `/shop/${product.category}/` },
    { name: product.subCategory, path: `/shop/${product.category}/collection/${product.subCategorySlug}/` },
    { name: product.name, path: `/shop/${product.category}/${product.slug}/` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(productLd(product)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqLd(product.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumb) }} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      <div className="bg-neutral-950 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <RelatedSearches links={relatedLinks} title={`Related searches: ${product.primaryKeyword}`} />
          <TagCloud tags={tagLinks} title="Popular searches and tags" />
          <AuthorityLinks links={authorityFor(product.subCategorySlug)} title={`Learn more about ${product.subCategory.toLowerCase()}`} />
        </div>
      </div>
    </>
  );
}
