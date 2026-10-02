export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'whisky' | 'spirit' | 'beer-premix-wine' | 'other';
  subCategory: string;
  subCategorySlug: string;
  style?: string;
  country: string;
  region?: string;
  price: number;
  originalPrice?: number;
  age?: string;
  abv: string;
  size: string;
  images: string[];
  description: string;
  tastingNotes?: {
    nose: string;
    palate: string;
    finish: string;
  };
  badge?: 'RARE VAULT' | 'COLLECTOR RELEASE' | 'LIMITED EDITION' | 'BEST SELLER' | 'AUSTRALIAN ICON';
  stock: number;
  featured?: boolean;
  sku: string;
  vintage?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** precomputed lower-case search text (set on the slim products sent to the shop and search pages) */
  searchText?: string;
  /** 20 Commercial keywords (Semrush bank, KD <= 28), shown as tags */
  tags?: string[];
  faqs: FaqItem[];
  metaTitle: string;
  metaDescription: string;
  /** extra keyword-rich paragraphs rendered below the lead description */
  longDescription?: string[];
}

export interface Subcategory {
  slug: string;
  name: string;
  category: 'whisky' | 'spirit' | 'beer-premix-wine' | 'other';
  description: string;
  heroImage: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** 20 Commercial keywords (Semrush bank, KD <= 28), shown as tags */
  tags?: string[];
  faqs: FaqItem[];
  longDescription?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  category: string;
  date: string;
  readTime: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** 20 Commercial keywords (Semrush bank, KD <= 28), shown as tags */
  tags?: string[];
  relatedSubcategory: string;
  outboundLinks: { text: string; url: string }[];
  /** Optional SEO extensions merged in from lib/data/blog-extra.ts */
  seoTitle?: string;
  seoDescription?: string;
  updated?: string;
  keyTakeaways?: string[];
  sections?: { heading: string; paragraphs: string[]; links?: { text: string; href: string }[] }[];
  faqs?: { question: string; answer: string }[];
}

export interface CategoryGroup {
  id: string;
  name: string;
  slug: string;
  description: string;
  subGroups: {
    title: string;
    items: { label: string; href: string; filterKey?: string; filterVal?: string }[];
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  bottlePurchased?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}
