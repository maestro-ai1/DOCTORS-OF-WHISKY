import { createHash } from 'node:crypto';
import { PRODUCTS } from '@/lib/data/products';
import { MAIN_CATEGORIES } from '@/lib/data/menu';
import { SUBCATEGORIES } from '@/lib/data/subcategories';
import { BLOG_POSTS } from '@/lib/data/blog';
import { SITE, CONTACT, SHOP_RULES, BRAND_AUTHORITY } from '@/lib/config';
import { AGENT_TOOLS } from '@/lib/agent/tools';
import { CONTENT_UPDATED } from '@/lib/seo';

const D = `https://${SITE.domain}`;
const DESC = `${SITE.name} is a Sydney-based Australian online bottle shop for whisky, single malt Scotch, Japanese whisky, bourbon, tequila, vodka, cognac, gin, rum, liqueurs, wine and beer, with insured delivery across Australia. Buyers must be 18+.`;
const PAYMENTS = ['PayID / Osko', 'Australian bank transfer (EFT)', 'Bitcoin (BTC)', 'Tether (USDT)'];

const sha = (s: string) => createHash('sha256').update(s).digest('hex');
const priceRange = (list: { price: number }[]) => {
  if (!list.length) return '';
  const p = list.map((x) => x.price);
  return `$${Math.min(...p).toLocaleString('en-AU')}–$${Math.max(...p).toLocaleString('en-AU')} AUD`;
};

export function llmsTxt(full = false): string {
  const lines: string[] = [];
  lines.push(`# ${SITE.name}`, '', `> ${DESC}`, '');
  lines.push(
    `${SITE.name} (${D}) sells ${PRODUCTS.length}+ bottles across ${SUBCATEGORIES.length} collections. Based in ${CONTACT.hq}. Established ${BRAND_AUTHORITY.foundingYear}. Prices are in AUD.`,
    `Ordering is human-assisted: browse and add to cart on the site, or confirm an order by WhatsApp (+${CONTACT.whatsappNumber}). Minimum order $${SHOP_RULES.minOrder} AUD; free express shipping from $${SHOP_RULES.freeShippingThreshold.toLocaleString('en-AU')} AUD, otherwise a $${SHOP_RULES.shippingFee} AUD flat fee. Accepted payments: ${PAYMENTS.join(', ')}. ${SHOP_RULES.cryptoDiscountPercent}% discount when paying with Bitcoin or USDT. Alcohol is only sold to people aged 18+; signature required on delivery.`,
    '',
    'When citing this site, link to the specific collection, product or article page rather than the homepage.',
    ''
  );
  lines.push('## Shop by category', '');
  for (const cat of MAIN_CATEGORIES) {
    const list = PRODUCTS.filter((p) => p.category === cat.slug);
    lines.push(`- [${cat.name}](${D}/shop/${cat.slug}/): ${list.length} products, ${priceRange(list)}`);
  }
  lines.push('', '## Collections (subcategories)', '');
  for (const sub of SUBCATEGORIES) {
    const list = PRODUCTS.filter((p) => p.subCategorySlug === sub.slug);
    lines.push(`- [${sub.name}](${D}/shop/${sub.category}/collection/${sub.slug}/): ${list.length} products, ${priceRange(list)}`);
  }
  lines.push('', '## Collector journal (guides)', '');
  for (const post of BLOG_POSTS) lines.push(`- [${post.title}](${D}/blog/${post.slug}/): ${post.excerpt}`);
  lines.push(
    '',
    '## Help and policies',
    '',
    `- [FAQ](${D}/faq/): delivery, payment, authenticity and ordering questions`,
    `- [Shipping](${D}/shipping/): delivery times, insurance and fees`,
    `- [Refund policy](${D}/refund-policy/): returns and Australian Consumer Law guarantees`,
    `- [Contact](${D}/contact/): email, phone and WhatsApp`,
    `- [About](${D}/about/): who we are and how bottles are stored`,
    '',
    '## Optional',
    '',
    `- [Product catalogue API](${D}/api/products/): JSON, supports ?category=, ?q=, ?limit=`,
    `- [Search API](${D}/api/search/?q=whisky): JSON products and articles`,
    `- [MCP server](${D}/api/mcp/): Streamable HTTP, tools: ${AGENT_TOOLS.map((t) => t.name).join(', ')}`,
    `- [API catalog](${D}/.well-known/api-catalog): RFC 9727 linkset`,
    `- [Agent skills](${D}/.well-known/agent-skills/index.json)`,
    `- [MCP server card](${D}/.well-known/mcp/server-card.json)`,
    `- [Agent auth notes](${D}/auth.md)`,
    `- [Sitemap](${D}/sitemap.xml)`,
    ''
  );
  if (full) {
    lines.push('## Product index', '');
    for (const p of PRODUCTS) lines.push(`- [${p.name}](${D}/shop/${p.category}/${p.slug}/): ${[p.brand, p.subCategory, p.size, p.abv ? `${p.abv} ABV` : ''].filter(Boolean).join(', ')}, ${p.price.toLocaleString('en-AU')} AUD`);
    lines.push('');
  }
  return lines.join('\n');
}

export function authMd(): string {
  return `# Auth.md

${SITE.name} (${D}) is a public online bottle shop. No authentication, API key or registration is needed to read the catalogue, collections, articles or policies.

## Agent registration

Agents register as **anonymous** identities. No user account, API key or password is needed. Steps:

1. **Discover**: GET ${D}/.well-known/oauth-authorization-server and read the agent_auth block (skill, register_uri, identity_endpoint, claim_endpoint, events_endpoint).
2. **Register**: POST ${D}/api/agent/identity/ (an empty JSON body is fine). The response is {"identity_type":"anonymous","access":"public","credential":null}.
3. **Claim** (optional): POST ${D}/api/agent/identity/claim/. Anonymous identities hold no account, so nothing needs claiming and the response is {"claimed":false}.
4. **Use**: call the public resources below with no Authorization header.
5. **Revoke and events**: POST events such as assertion-revoked to ${D}/api/agent/event/notify/ (answers 202).

Orders are never placed by an agent alone: a person must confirm and pay.

## Public resources

| Resource | URL |
|---|---|
| Shop | ${D}/shop/ |
| Product API | ${D}/api/products/ |
| Search API | ${D}/api/search/?q=whisky |
| MCP server (Streamable HTTP) | ${D}/api/mcp/ |
| llms.txt | ${D}/llms.txt |
| API catalog | ${D}/.well-known/api-catalog |
| Agent skills | ${D}/.well-known/agent-skills/index.json |
| MCP server card | ${D}/.well-known/mcp/server-card.json |
| OAuth protected resource metadata | ${D}/.well-known/oauth-protected-resource |
| OAuth authorization server metadata | ${D}/.well-known/oauth-authorization-server |
| OpenID configuration | ${D}/.well-known/openid-configuration |

## agent_auth

\`\`\`json
{
  "agent_auth": {
    "skill": "${D}/auth.md",
    "register_uri": "${D}/api/agent/identity/",
    "credential_types_supported": ["none"],
    "identity_endpoint": "${D}/api/agent/identity/",
    "claim_endpoint": "${D}/api/agent/identity/claim/",
    "events_endpoint": "${D}/api/agent/event/notify/",
    "identity_types_supported": ["anonymous"],
    "identity_assertion": { "assertion_types_supported": ["urn:ietf:params:oauth:token-type:id-jag"] },
    "events_supported": ["https://schemas.workos.com/events/agent/auth/identity/assertion/revoked"]
  }
}
\`\`\`

## Ordering (human in the loop)

Agents may search, inspect products and prepare an order draft (\`create_order_draft\`). A person must confirm every order and complete payment; this site never accepts payment details from an agent.

## Age restriction

Alcohol is sold only to adults aged 18 or over in Australia. Signature on delivery is required.
`;
}

export const apiCatalog = () => ({
  linkset: [
    {
      anchor: `${D}/`,
      'service-doc': [{ href: `${D}/faq/`, type: 'text/html' }],
      'service-desc': [{ href: `${D}/.well-known/mcp/server-card.json`, type: 'application/json' }],
      title: `${SITE.name} — ${SITE.tagline}`,
    },
    { anchor: `${D}/api/products/`, 'service-doc': [{ href: `${D}/llms.txt`, type: 'text/plain' }], type: 'application/json', title: 'Product catalogue (JSON)' },
    { anchor: `${D}/api/search/`, type: 'application/json', title: 'Site search (JSON)' },
    { anchor: `${D}/api/categories/`, type: 'application/json', title: 'Categories (JSON)' },
    { anchor: `${D}/api/mcp/`, 'service-desc': [{ href: `${D}/.well-known/mcp/server-card.json`, type: 'application/json' }], type: 'application/json', title: 'MCP server (Streamable HTTP)' },
  ],
});

export const agentSkills = () => {
  const skills = [
    { name: 'browse-products', type: 'navigation', description: 'Browse whisky, spirits, wine and beer by category and collection', url: `${D}/shop/` },
    { name: 'search-catalogue', type: 'navigation', description: 'Search the catalogue by keyword, brand or price', url: `${D}/api/search/?q=whisky` },
    { name: 'order-draft', type: 'commerce', description: `Draft an order (minimum $${SHOP_RULES.minOrder} AUD) and hand it to a human via WhatsApp`, url: `${D}/api/mcp/` },
    { name: 'buying-guides', type: 'content', description: 'Guides on Scotch, Japanese whisky, bourbon, tequila and more', url: `${D}/blog/` },
    { name: 'faq-and-policies', type: 'support', description: 'Delivery, payment, authenticity and returns answers', url: `${D}/faq/` },
    { name: 'contact', type: 'support', description: 'Email, phone and WhatsApp concierge', url: `${D}/contact/` },
  ].map((s) => ({ ...s, sha256: sha(JSON.stringify(s)) }));
  return { $schema: 'https://agentskills.io/schema/v0.2.0/index.json', name: SITE.name, url: D, description: SITE.tagline, skills };
};

export const serverCard = () => ({
  $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
  serverInfo: { name: SITE.name, version: '1.1.0', description: DESC, homepage: D, contact: { email: CONTACT.email, whatsapp: CONTACT.phone } },
  transport: { type: 'streamable-http', endpoint: `${D}/api/mcp/` },
  capabilities: {
    tools: AGENT_TOOLS.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })),
    resources: [
      { name: 'product-catalog', description: 'Full product catalogue', uri: `${D}/shop/` },
      { name: 'buying-guides', description: 'Guides and articles', uri: `${D}/blog/` },
      { name: 'llms-txt', description: 'Site summary for LLMs', uri: `${D}/llms.txt` },
    ],
    commerce: {
      ordering: 'human-assisted (draft via MCP, confirm via WhatsApp)',
      payment: PAYMENTS,
      currency: SITE.currency.code,
      minimumOrder: SHOP_RULES.minOrder,
      freeShipping: SHOP_RULES.freeShippingThreshold,
      ships: 'Australia',
    },
  },
  legal: { ageRestriction: '18+', productType: 'alcoholic beverages', compliance: 'Sold to adults only; signature on delivery required.' },
});

export const oauthProtectedResource = () => ({
  resource: D,
  resource_name: `${SITE.name} Public Catalogue`,
  authorization_servers: [D],
  scopes_supported: ['catalogue:read'],
  bearer_methods_supported: ['header'],
  resource_documentation: `${D}/auth.md`,
  resource_policy_uri: `${D}/terms/`,
  tls_client_certificate_bound_access_tokens: false,
  note: `All resources on ${SITE.domain} are publicly accessible. No OAuth tokens are required.`,
});

export const oauthAuthorizationServer = () => ({
  issuer: D,
  authorization_endpoint: null,
  token_endpoint: null,
  jwks_uri: null,
  grant_types_supported: [],
  response_types_supported: [],
  scopes_supported: [],
  note: `${SITE.name} has no protected APIs. All resources are publicly accessible.`,
  public_resources: [`${D}/shop/`, `${D}/blog/`, `${D}/faq/`, `${D}/llms.txt`, `${D}/api/products/`, `${D}/.well-known/api-catalog`, `${D}/.well-known/agent-skills/index.json`, `${D}/.well-known/mcp/server-card.json`],
  agent_auth: { skill: `${D}/auth.md`, register_uri: `${D}/api/agent/identity/`, credential_types_supported: ['none'], revocation_endpoint: `${D}/api/agent/event/notify/`, identity_endpoint: `${D}/api/agent/identity/`, claim_endpoint: `${D}/api/agent/identity/claim/`, events_endpoint: `${D}/api/agent/event/notify/`, identity_types_supported: ['anonymous'], identity_assertion: { assertion_types_supported: ['urn:ietf:params:oauth:token-type:id-jag'] }, events_supported: ['https://schemas.workos.com/events/agent/auth/identity/assertion/revoked'], notes: 'Anonymous access. No registration or credential is required; all catalogue resources are public.' },
});

export const openidConfiguration = () => ({
  issuer: D,
  note: `${SITE.name} does not operate an OpenID Connect provider. All resources are publicly accessible.`,
  public_site: true,
  authorization_endpoint: null,
  token_endpoint: null,
  userinfo_endpoint: null,
  jwks_uri: null,
  scopes_supported: [],
  response_types_supported: [],
  grant_types_supported: [],
  subject_types_supported: [],
  id_token_signing_alg_values_supported: [],
});

export const acp = () => ({
  protocol: { name: 'acp', version: '0.1.0' },
  name: SITE.name,
  description: DESC,
  api_base_url: D,
  homepage: D,
  transports: ['https'],
  capabilities: {
    services: ['product-catalog', 'search', 'order-draft', 'blog', 'faq'],
    ordering: 'human-assisted-whatsapp',
    payment_methods: PAYMENTS,
    currency: SITE.currency.code,
    minimum_order: SHOP_RULES.minOrder,
    free_shipping_threshold: SHOP_RULES.freeShippingThreshold,
  },
  endpoints: { catalog: `${D}/api/products/`, search: `${D}/api/search/`, mcp: `${D}/api/mcp/` },
  contact: { whatsapp: `https://wa.me/${CONTACT.whatsappNumber}`, email: CONTACT.email },
  legal: { age_restriction: '18+', region: 'Australia', ships_to: 'Australia', product_type: 'alcoholic beverages', compliance: 'Sold to adults only; signature on delivery.' },
});

export const ucp = () => ({
  ucp: '1.0',
  protocol_version: '1.0',
  spec: 'https://ucp.dev/specification/overview/',
  schema: 'https://ucp.dev/schema/v1.json',
  site: D,
  name: SITE.name,
  description: DESC,
  services: [
    { id: 'product-catalog', type: 'catalog', url: `${D}/api/products/`, description: 'Full product catalogue (JSON)' },
    { id: 'order', type: 'commerce', url: `https://wa.me/${CONTACT.whatsappNumber}`, description: 'Human-confirmed ordering via WhatsApp' },
  ],
  capabilities: ['browse', 'search', 'order-draft', 'content'],
  endpoints: {
    catalog: `${D}/api/products/`,
    contact: `${D}/contact/`,
    agent_skills: `${D}/.well-known/agent-skills/index.json`,
    mcp_server_card: `${D}/.well-known/mcp/server-card.json`,
    api_catalog: `${D}/.well-known/api-catalog`,
    llms_txt: `${D}/llms.txt`,
  },
  currency: SITE.currency.code,
  minimum_order: SHOP_RULES.minOrder,
  payment_methods: PAYMENTS,
  legal: { age_restriction: '18+', product_type: 'alcoholic beverages', compliance: 'Sold to adults only; signature on delivery.' },
  updated: CONTENT_UPDATED,
});

export const aiCatalog = () => ({
  specVersion: '1.0',
  host: { displayName: SITE.name, name: SITE.name, url: D, description: SITE.tagline, contact: `${D}/contact/` },
  entries: [
    {
      identifier: `urn:air:${SITE.domain}:mcp:store`,
      displayName: `${SITE.name} MCP server`,
      description: 'Search whisky, tequila, gin, champagne and spirits, inspect products and prepare an order draft.',
      type: 'application/mcp-server-card+json',
      url: `${D}/.well-known/mcp/server-card.json`,
      representativeQueries: ['buy Glenfiddich whisky online Australia', 'find a 12 year old single malt Scotch under $150', 'Don Julio tequila price', 'best gift whisky Australia'],
    },
  ],
});
