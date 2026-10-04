import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE, CONTACT, BRAND_AUTHORITY } from '@/lib/config';
import { CONTENT_UPDATED, ld } from '@/lib/seo';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import { Header } from '@/components/Header';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Footer } from '@/components/Footer';
import { AgeGateModal, AGE_GATE_HEAD_SCRIPT } from '@/components/AgeGateModal';
import { LazyOverlays } from '@/components/LazyOverlays';
import { WhatsAppChat } from '@/components/WhatsAppChat';

// Site-wide defaults only. Every page sets its own title, description, canonical and social tags via buildMetadata()
// (a canonical here would be inherited by pages that forget their own).
export const metadata: Metadata = {
  title: { default: 'Doctors of Whisky | Buy Whisky Online Australia', template: '%s' },
  description: 'Buy whisky online in Australia: single malt Scotch, Japanese whisky, bourbon, tequila, vodka, cognac and gin. Sydney vaults, insured delivery, 18+.',
  authors: [{ name: SITE.name }],
  metadataBase: new URL(`https://${SITE.domain}`),
  applicationName: SITE.name,
  category: 'shopping',
  other: {
    'og:updated_time': CONTENT_UPDATED,
    'google-site-verification': SITE.gscVerification,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111111',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeLd = {
    '@type': 'LiquorStore',
    '@id': `https://${SITE.domain}/#organization`,
    name: SITE.name,
    description: SITE.tagline,
    url: `https://${SITE.domain}/`,
    logo: { '@type': 'ImageObject', url: `https://${SITE.domain}/logo.png`, width: 512, height: 512 },
    image: `https://${SITE.domain}/og-default.png`,
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    foundingDate: BRAND_AUTHORITY.foundingYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 14, 1 Bligh Street',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.8651,
      longitude: 151.2099,
    },
    priceRange: '$$$$',
    currenciesAccepted: 'AUD, BTC, USDT',
    paymentAccepted: 'PayID, Osko, Bank Transfer, Bitcoin, USDT',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    knowsAbout: [
      'Single Malt Scotch Whisky',
      'Japanese Whisky',
      'Rare Cognac',
      'Artisanal Tequila',
      'Fine Australian Shiraz',
      'Cask Strength Allocations',
    ],
    sameAs: [
      'https://wa.me/61420128746',
    ],
  };

  const websiteLd = {
    '@type': 'WebSite',
    '@id': `https://${SITE.domain}/#website`,
    url: `https://${SITE.domain}/`,
    name: SITE.name,
    description: SITE.tagline,
    inLanguage: 'en-AU',
    publisher: { '@id': `https://${SITE.domain}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `https://${SITE.domain}/search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLd = { '@context': 'https://schema.org', '@graph': [storeLd, websiteLd] };

  return (
    <html lang="en-AU" className="dark bg-neutral-950 text-neutral-100 antialiased selection:bg-amber-800 selection:text-amber-100">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(jsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: AGE_GATE_HEAD_SCRIPT }} />
        <script src="/js/webmcp.js" defer />
        {/* hold the first paint until the hero is fully parsed, so streamed HTML cannot shift it (Chrome; ignored elsewhere) */}
        <link rel="expect" href="#hero-parsed" blocking="render" />
      </head>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-amber-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          Skip to main content
        </a>
        <CartProvider>
          <WishlistProvider>
            {/* 18+ Age Gate Modal */}
            <AgeGateModal />

            {/* Global Header */}
            <Header announcement={<AnnouncementBar />} />

            {/* Main Content Area */}
            <main id="main" className="flex-1">
              {children}
            </main>

            {/* Cart drawer, checkout modal and sales pop-up (loaded after the first interaction) */}
            <LazyOverlays />

            {/* WhatsApp live chat, bottom right */}
            <WhatsAppChat />

            {/* Global Footer (layout and paint are skipped until it is near the viewport) */}
            <div className="cv-auto cv-footer">
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
