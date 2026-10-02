import type { Product } from '@/lib/types';
import { buildSearchText } from '@/lib/search';

/**
 * Product data for client components (shop grid, search, featured bottles). The long copy, FAQs and keyword lists stay on the server;
 * the keywords and tags still drive search through the precomputed searchText, so every keyword search keeps returning products.
 */
export function slimProduct(p: Product): Product {
  return {
    ...p,
    faqs: [],
    longDescription: undefined,
    metaTitle: '',
    metaDescription: '',
    secondaryKeywords: [],
    tags: undefined,
    searchText: buildSearchText(p),
  };
}

export const slimProducts = (list: Product[]): Product[] => list.map(slimProduct);
