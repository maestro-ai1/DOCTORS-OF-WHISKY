import { NextResponse } from 'next/server';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { PRODUCTS } from '@/lib/data/products';
import { SITE } from '@/lib/config';

export async function GET() {
  const categories = MAIN_CATEGORIES.map((cat) => {
    const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      productCount: count,
      url: `https://${SITE.domain}/shop/${cat.slug}/`,
      subGroups: cat.subGroups,
    };
  });

  return NextResponse.json(
    { categories },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
