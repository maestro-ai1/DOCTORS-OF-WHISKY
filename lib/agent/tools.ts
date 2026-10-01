import { PRODUCTS } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { SUBCATEGORIES } from '@/lib/data/subcategories';
import { SITE, CONTACT, SHOP_RULES, PAYMENT_METHODS } from '@/lib/config';

/**
 * Single source of truth for the live MCP tools. The MCP route, the server card and the API catalog all read this,
 * so what is advertised can never drift from what is served (WebForge rule 10 / crosscheck B8).
 * Agents may search, inspect and DRAFT an order. A human always completes the order and payment.
 */
export interface AgentTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export const AGENT_TOOLS: AgentTool[] = [
  {
    name: 'search_products',
    description: 'Search whisky, spirits, wine and beer in the Doctors of Whisky catalogue by keyword, brand or category. Returns name, brand, price in AUD and product URL. Buyers must be 18+.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keyword, brand or product name, e.g. "macallan 18" or "japanese whisky"' },
        category: { type: 'string', description: 'Category slug: whisky, spirit, beer-premix-wine or other' },
        max_price: { type: 'number', description: 'Maximum price in AUD' },
        limit: { type: 'number', description: 'Maximum results (default 20, max 50)' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Get full details for one bottle by slug: description, ABV, size, tasting notes, price and availability.',
    inputSchema: {
      type: 'object',
      required: ['slug'],
      properties: { slug: { type: 'string', description: 'Product slug from search_products' } },
    },
  },
  {
    name: 'list_categories',
    description: 'List product categories and collections (subcategories) with product counts and URLs.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_policies',
    description: 'Get minimum order, shipping fee, free-shipping threshold, accepted payment methods and the 18+ signature-on-delivery rule.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'create_order_draft',
    description: 'Prepare an order draft: validates items, totals the cart and returns a pre-filled WhatsApp link for a human to confirm. Never takes payment details and never places an order.',
    inputSchema: {
      type: 'object',
      required: ['items'],
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            required: ['slug'],
            properties: { slug: { type: 'string' }, quantity: { type: 'number' } },
          },
        },
        notes: { type: 'string', description: 'Optional note for the concierge team' },
      },
    },
  },
];

const productUrl = (p: { category: string; slug: string }) => `https://${SITE.domain}/shop/${p.category}/${p.slug}/`;

export function runAgentTool(name: string, args: Record<string, any> = {}): { ok: true; data: unknown } | { ok: false; code: number; message: string } {
  switch (name) {
    case 'search_products': {
      const q = String(args.query || '').toLowerCase().trim();
      const limit = Math.min(Math.max(Number(args.limit) || 20, 1), 50);
      let list = PRODUCTS;
      if (q) {
        const terms = q.split(/\s+/);
        list = list.filter((p) => {
          const hay = `${p.name} ${p.brand} ${p.subCategory} ${p.style ?? ''} ${p.country}`.toLowerCase();
          return terms.every((t) => hay.includes(t));
        });
      }
      if (args.category) list = list.filter((p) => p.category === args.category);
      if (args.max_price) list = list.filter((p) => p.price <= Number(args.max_price));
      return {
        ok: true,
        data: {
          total: list.length,
          currency: 'AUD',
          results: list.slice(0, limit).map((p) => ({
            slug: p.slug,
            name: p.name,
            brand: p.brand,
            category: p.category,
            subcategory: p.subCategory,
            price: p.price,
            currency: 'AUD',
            in_stock: p.stock > 0,
            url: productUrl(p),
          })),
        },
      };
    }
    case 'get_product': {
      const p = PRODUCTS.find((x) => x.slug === args.slug);
      if (!p) return { ok: false, code: -32602, message: 'Unknown product slug' };
      return {
        ok: true,
        data: {
          slug: p.slug,
          name: p.name,
          brand: p.brand,
          category: p.category,
          subcategory: p.subCategory,
          country: p.country,
          region: p.region,
          abv: p.abv,
          size: p.size,
          age: p.age,
          price: p.price,
          currency: 'AUD',
          in_stock: p.stock > 0,
          description: p.description,
          tasting_notes: p.tastingNotes,
          images: p.images.map((i) => `https://${SITE.domain}${i}`),
          url: productUrl(p),
        },
      };
    }
    case 'list_categories': {
      return {
        ok: true,
        data: MAIN_CATEGORIES.map((c) => ({
          slug: c.slug,
          name: c.name,
          url: `https://${SITE.domain}/shop/${c.slug}/`,
          product_count: PRODUCTS.filter((p) => p.category === c.slug).length,
          collections: SUBCATEGORIES.filter((s) => s.category === c.slug).map((s) => ({
            slug: s.slug,
            name: s.name,
            url: `https://${SITE.domain}/shop/${s.category}/collection/${s.slug}/`,
            product_count: PRODUCTS.filter((p) => p.subCategorySlug === s.slug).length,
          })),
        })),
      };
    }
    case 'get_policies': {
      return {
        ok: true,
        data: {
          currency: 'AUD',
          minimum_order: SHOP_RULES.minOrder,
          free_shipping_threshold: SHOP_RULES.freeShippingThreshold,
          shipping_fee_below_threshold: SHOP_RULES.shippingFee,
          crypto_discount_percent: SHOP_RULES.cryptoDiscountPercent,
          payment_methods: PAYMENT_METHODS.map((m) => m.name),
          age_restriction: '18+ — signature on delivery required',
          ships_to: 'Australia',
          contact: { email: CONTACT.email, whatsapp: `https://wa.me/${CONTACT.whatsappNumber}` },
          ordering: 'human-assisted: agents may draft an order, a person completes it',
        },
      };
    }
    case 'create_order_draft': {
      const items = Array.isArray(args.items) ? args.items : [];
      if (items.length === 0) return { ok: false, code: -32602, message: 'items must be a non-empty array' };
      const lines: { slug: string; name: string; quantity: number; unit_price: number; line_total: number }[] = [];
      for (const it of items.slice(0, 25)) {
        const p = PRODUCTS.find((x) => x.slug === it?.slug);
        if (!p) return { ok: false, code: -32602, message: `Unknown product slug: ${String(it?.slug)}` };
        const quantity = Math.min(Math.max(Math.floor(Number(it.quantity) || 1), 1), 24);
        lines.push({ slug: p.slug, name: p.name, quantity, unit_price: p.price, line_total: p.price * quantity });
      }
      const subtotal = lines.reduce((s, l) => s + l.line_total, 0);
      const shipping = subtotal >= SHOP_RULES.freeShippingThreshold ? 0 : SHOP_RULES.shippingFee;
      const text = `Hello Doctors of Whisky, I'd like to order:\n${lines.map((l) => `- ${l.quantity} x ${l.name} (AUD ${l.unit_price})`).join('\n')}\nSubtotal AUD ${subtotal}. ${args.notes ? `Notes: ${String(args.notes).slice(0, 300)}` : ''}`;
      return {
        ok: true,
        data: {
          draft: true,
          currency: 'AUD',
          lines,
          subtotal,
          shipping,
          total: subtotal + shipping,
          meets_minimum_order: subtotal >= SHOP_RULES.minOrder,
          minimum_order: SHOP_RULES.minOrder,
          next_step: 'A human confirms the order via the link below. No payment is taken by this tool.',
          confirm_url: `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`,
        },
      };
    }
    default:
      return { ok: false, code: -32601, message: `Unknown tool: ${name}` };
  }
}
