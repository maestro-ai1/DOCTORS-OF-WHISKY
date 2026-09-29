import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { SITE, CONTACT, SHOP_RULES, PAYMENT_METHODS } from '@/lib/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, method, params } = body;

    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: SITE.name,
            version: '1.0.0',
          },
        },
      });
    }

    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'search_products',
              description: 'Search rare whiskies and fine spirits by keyword, brand, or category in the Sydney vault.',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  category: { type: 'string' },
                  max_price: { type: 'number' },
                },
              },
            },
            {
              name: 'get_product',
              description: 'Get comprehensive details, tasting notes, and provenance for a bottle by slug.',
              inputSchema: {
                type: 'object',
                required: ['slug'],
                properties: {
                  slug: { type: 'string' },
                },
              },
            },
            {
              name: 'list_categories',
              description: 'List all curated liquor and whisky categories.',
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
            {
              name: 'get_policies',
              description: 'Get shipping, transit insurance, minimum order ($300 AUD), and 12% Crypto discount policies.',
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
          ],
        },
      });
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params || {};

      if (name === 'search_products') {
        const query = (args?.query || '').toLowerCase();
        let matched = PRODUCTS;
        if (query) {
          matched = matched.filter(
            (p) =>
              p.name.toLowerCase().includes(query) ||
              p.brand.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query)
          );
        }
        if (args?.category) {
          matched = matched.filter((p) => p.category === args.category);
        }
        if (args?.max_price) {
          matched = matched.filter((p) => p.price <= args.max_price);
        }

        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  matched.map((p) => ({
                    name: p.name,
                    brand: p.brand,
                    price_aud: p.price,
                    crypto_discount_price_aud: p.price * 0.88,
                    category: p.category,
                    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
                  }))
                ),
              },
            ],
          },
        });
      }

      if (name === 'get_product') {
        const product = PRODUCTS.find((p) => p.slug === args?.slug);
        if (!product) {
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            error: { code: -32602, message: 'Product not found in vault registry' },
          });
        }
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  ...product,
                  currency: 'AUD',
                  url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
                }),
              },
            ],
          },
        });
      }

      if (name === 'list_categories') {
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(MAIN_CATEGORIES),
              },
            ],
          },
        });
      }

      if (name === 'get_policies') {
        return NextResponse.json({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  min_order_aud: SHOP_RULES.minOrder,
                  free_shipping_threshold_aud: SHOP_RULES.freeShippingThreshold,
                  shipping_fee_under_threshold_aud: SHOP_RULES.shippingFee,
                  crypto_discount_percentage: SHOP_RULES.cryptoDiscountPercent,
                  accepted_payments: PAYMENT_METHODS.map((p) => p.name),
                  whatsapp_concierge: CONTACT.phone,
                  sydney_vault_location: CONTACT.address,
                }),
              },
            ],
          },
        });
      }
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: 'Method not found' },
    });
  } catch (err) {
    return NextResponse.json({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error' },
    });
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'Doctors of Whisky MCP Server',
    status: 'online',
    endpoint: `https://${SITE.domain}/api/mcp`,
  });
}
