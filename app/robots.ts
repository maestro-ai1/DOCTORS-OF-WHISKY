import { MetadataRoute } from 'next';
import { SITE } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you-order/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
