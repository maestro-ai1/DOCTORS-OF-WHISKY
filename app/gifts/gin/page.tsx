import type { Metadata } from 'next';
import { CuratedPage } from '@/components/CuratedPage';
import { CURATED } from '@/lib/data/curated';
import { buildMetadata } from '@/lib/seo';

const cfg = CURATED['gin-gifts'];

export const metadata: Metadata = buildMetadata({ title: cfg.title, description: cfg.description, path: cfg.path, keywords: [cfg.primary, ...cfg.secondary] });

export default function GinGiftsPage() {
  return <CuratedPage cfg={cfg} />;
}
