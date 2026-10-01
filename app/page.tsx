import React from 'react';
import { HeroSlider } from '@/components/HeroSlider';
import { TrustBar } from '@/components/TrustBar';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { BrandSlider } from '@/components/BrandSlider';
import { AuthoritySection } from '@/components/AuthoritySection';
import { TrustpilotSection } from '@/components/TrustpilotSection';
import { HomeFaq } from '@/components/HomeFaq';
import { buildMetadata, siteTags } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Buy Whisky Online Australia | Scotch, Japanese & Single Malt',
  description:
    'Buy whisky online in Australia: single malt Scotch, Japanese whisky, bourbon, plus tequila, vodka, cognac and gin. Sydney vaults, insured delivery, 18+.',
  path: '/',
  keywords: siteTags(120),
});

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Slideshow */}
      <HeroSlider />

      {/* 2. Trust Reassurance Bar */}
      <TrustBar />

      {/* 3. Curated Product Grid (Exactly 6 Featured Bottles) */}
      <FeaturedProducts />

      {/* 4. Brand & Distilleries Logo Slideshow */}
      <BrandSlider />

      {/* 5. Compact Authority & Sydney Vault Story */}
      <AuthoritySection />

      {/* 6. Trustpilot Verified Social Proof Section (3-Box Slideshow) */}
      <TrustpilotSection />

      {/* 7. Homepage 3-Item FAQ Accordion */}
      <HomeFaq />
    </div>
  );
}
