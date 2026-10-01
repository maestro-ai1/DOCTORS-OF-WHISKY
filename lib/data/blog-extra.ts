import type { BlogPost } from '@/lib/types';
import { BLOG_EXTRA_WHISKY } from '@/lib/data/blog-extra-whisky';
import { BLOG_EXTRA_SPIRITS } from '@/lib/data/blog-extra-spirits';
import { BLOG_EXTRA_DRINKS } from '@/lib/data/blog-extra-drinks';

/**
 * SEO extensions for individual guides: long-form sections (H2), key takeaways, keyword-targeted FAQs and a
 * corrected primary keyword. Merged over the base post in getBlogPostBySlug().
 * Facts here must be verifiable (regulations, official bodies); store-specific facts (shipping, payment) come from
 * lib/config.ts wording only. Inline links use [text](/path/) syntax and are rendered by the blog template.
 */
export const BLOG_EXTRA: Record<string, Partial<BlogPost>> = {
  ...BLOG_EXTRA_WHISKY,
  ...BLOG_EXTRA_SPIRITS,
  ...BLOG_EXTRA_DRINKS,
};
