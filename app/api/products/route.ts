import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';
import { SITE } from '@/lib/config';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const query = searchParams.get('q');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

  let results = [...PRODUCTS];

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (brand) {
    results = results.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (limit) {
    results = results.slice(0, limit);
  }

  const payload = results.map((p) => ({
    ...p,
    currency: SITE.currency.code,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  return NextResponse.json(
    { products: payload, total: payload.length },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
