import { PRODUCTS } from '@/lib/data/products';
import { slimProducts } from '@/lib/slim-products';

export const dynamic = 'force-static';

/** Slim product index the shop filters download on first use. */
export function GET() {
  return new Response(JSON.stringify(slimProducts(PRODUCTS)), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' },
  });
}
