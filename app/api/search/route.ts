import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';
import { SITE } from '@/lib/config';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const query = q.toLowerCase().trim();

  let matching = [...PRODUCTS];

  if (query) {
    matching = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.country.toLowerCase().includes(query) ||
        p.region?.toLowerCase().includes(query)
      );
    });
  }

  const results = matching.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    currency: SITE.currency.code,
    image: p.images[0],
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  return NextResponse.json(
    { query: q, count: results.length, results },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=120',
      },
    }
  );
}
