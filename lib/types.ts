export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'whisky' | 'spirit' | 'beer-premix-wine' | 'other';
  subCategory: string;
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
