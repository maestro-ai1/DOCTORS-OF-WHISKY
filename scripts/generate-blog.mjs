import fs from 'node:fs';
import path from 'node:path';
import { BLOG_TOPICS } from './blog-content.mjs';

const imageManifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'image-manifest.json'), 'utf8'));
const keywordsManifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts', 'keywords-manifest.json'), 'utf8'));

const DATES = [
  'September 28, 2026', 'September 24, 2026', 'September 20, 2026', 'September 16, 2026',
  'September 12, 2026', 'September 8, 2026', 'September 4, 2026', 'August 31, 2026',
  'August 27, 2026', 'August 23, 2026', 'August 19, 2026', 'August 15, 2026',
  'August 11, 2026', 'August 7, 2026', 'August 3, 2026', 'July 30, 2026',
  'July 26, 2026', 'July 22, 2026', 'July 18, 2026', 'July 14, 2026',
  'July 10, 2026', 'July 6, 2026', 'July 2, 2026', 'June 28, 2026',
  'June 24, 2026', 'June 20, 2026', 'June 16, 2026', 'June 12, 2026',
  'June 8, 2026', 'June 4, 2026',
];

const posts = BLOG_TOPICS.map((topic, idx) => {
  const kw = keywordsManifest[topic.subcategorySlug];
  const images = imageManifest[topic.subcategorySlug] || [];
  const image = images[idx % Math.max(images.length, 1)]?.webPath || images[0]?.webPath || '/images/brands/macallan.jpg';

  return {
    slug: topic.slug,
    title: topic.title,
    excerpt: topic.excerpt,
    body: topic.paragraphs,
    image,
    category: topic.category,
    date: DATES[idx % DATES.length],
    readTime: topic.readTime,
    primaryKeyword: kw?.primaryKeyword || topic.subcategorySlug,
    secondaryKeywords: kw?.secondaryKeywords || [],
    relatedSubcategory: topic.subcategorySlug,
    outboundLinks: topic.outboundLinks,
  };
});

const header = `import { BlogPost } from '@/lib/types';\n\nexport const BLOG_POSTS: BlogPost[] = `;
const footer = `;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3): BlogPost[] {
  return BLOG_POSTS
    .filter(p => p.slug !== post.slug && p.relatedSubcategory === post.relatedSubcategory)
    .slice(0, limit);
}
`;

fs.writeFileSync(
  path.join(process.cwd(), 'lib', 'data', 'blog.ts'),
  header + JSON.stringify(posts, null, 2) + footer
);

console.log(`Wrote ${posts.length} blog posts to lib/data/blog.ts`);
