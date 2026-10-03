import { PRODUCTS } from '@/lib/data/products';

/** Bottles per shop page (/shop/, /shop/page/2/, ...). */
export const SHOP_PAGE_SIZE = 24;

/** Catalogue order used by the shop pages: featured bottles first, otherwise the data order. */
export const SHOP_ORDER = [...PRODUCTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

export const SHOP_PAGE_COUNT = Math.ceil(SHOP_ORDER.length / SHOP_PAGE_SIZE);

export const shopPageProducts = (page: number) => SHOP_ORDER.slice((page - 1) * SHOP_PAGE_SIZE, page * SHOP_PAGE_SIZE);

export const shopPagePath = (page: number) => (page <= 1 ? '/shop/' : `/shop/page/${page}/`);

export const SHOP_BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
export const SHOP_COUNTRIES = Array.from(new Set(PRODUCTS.map((p) => p.country).filter(Boolean))).sort();
