import type { Product } from '@/lib/types';

/** "pack" for cases, cans and blocks, "bottle" for everything else, so alt text describes what is in the photo. */
export const itemNoun = (p: Pick<Product, 'name' | 'size'>) => (/\b(cans?|case|block|pack|carton)\b/i.test(`${p.name} ${p.size}`) ? 'pack' : 'bottle');

export const productAlt = (p: Product, keyword?: string) =>
  `${p.name} ${p.size} ${p.style || p.subCategory} ${itemNoun(p)} - ${keyword ?? p.primaryKeyword}`;
