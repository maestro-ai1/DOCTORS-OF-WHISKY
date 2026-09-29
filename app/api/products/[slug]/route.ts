import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/data/products';
import { SITE } from '@/lib/config';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(
      { error: 'Bottle not found in Sydney vault registry' },
      { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  return NextResponse.json(
    {
      product: {
        ...product,
        currency: SITE.currency.code,
        url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
      },
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
