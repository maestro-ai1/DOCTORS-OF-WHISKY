import type { BlogPost } from '@/lib/types';
import { BLOG_EXTRA_WHISKY } from '@/lib/data/blog-extra-whisky';
import { BLOG_EXTRA_SPIRITS } from '@/lib/data/blog-extra-spirits';
import { BLOG_EXTRA_DRINKS } from '@/lib/data/blog-extra-drinks';
import { BLOG_LONG_1 } from '@/lib/data/blog-long-1';
import { BLOG_LONG_2 } from '@/lib/data/blog-long-2';
import { BLOG_LONG_3 } from '@/lib/data/blog-long-3';
import { BLOG_LONG_4 } from '@/lib/data/blog-long-4';
import { BLOG_LONG_5 } from '@/lib/data/blog-long-5';
import { BLOG_LONG_6 } from '@/lib/data/blog-long-6';
import { BLOG_MORE_1 } from '@/lib/data/blog-more-1';
import { BLOG_MORE_2 } from '@/lib/data/blog-more-2';
import { BLOG_MORE_3 } from '@/lib/data/blog-more-3';
import { BLOG_MORE_4 } from '@/lib/data/blog-more-4';
import { BLOG_MORE_5 } from '@/lib/data/blog-more-5';
import { BLOG_MORE_6 } from '@/lib/data/blog-more-6';
import { BLOG_MORE_7 } from '@/lib/data/blog-more-7';
import { BLOG_MORE_8 } from '@/lib/data/blog-more-8';
import { BLOG_MORE_9 } from '@/lib/data/blog-more-9';

/**
 * SEO extensions for individual guides: long-form sections (H2), key takeaways, keyword-targeted FAQs and a
 * corrected primary keyword. Merged over the base post in getBlogPostBySlug().
 * Facts here must be verifiable (regulations, official bodies); store-specific facts (shipping, payment) come from
 * lib/config.ts wording only. Inline links use [text](/path/) syntax and are rendered by the blog template.
 */
const MERGED: Record<string, Partial<BlogPost>> = {
  ...BLOG_EXTRA_WHISKY,
  ...BLOG_EXTRA_SPIRITS,
  ...BLOG_EXTRA_DRINKS,
  // 1,500+ word guides (override the shorter sections above, slug by slug)
  ...BLOG_LONG_1,
  ...BLOG_LONG_2,
  ...BLOG_LONG_3,
  ...BLOG_LONG_4,
  ...BLOG_LONG_5,
  ...BLOG_LONG_6,
};

// Extra sections (myths, recipes, glossaries, buying tips) are appended after each guide's main sections.
for (const group of [BLOG_MORE_1, BLOG_MORE_2, BLOG_MORE_3, BLOG_MORE_4, BLOG_MORE_5, BLOG_MORE_6, BLOG_MORE_7, BLOG_MORE_8, BLOG_MORE_9]) {
  for (const [slug, extra] of Object.entries(group)) {
    const post = MERGED[slug];
    if (post) post.sections = [...(post.sections || []), ...extra];
  }
}

export const BLOG_EXTRA = MERGED;
