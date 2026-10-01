import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'Applebot',
  'Applebot-Extended',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'CCBot',
  'cohere-ai',
  'DuckAssistBot',
];

const DISALLOW = ['/thank-you-order/', '/api/order/', '/api/contact/', '/admin/', '/api/admin/', '/pay/', '/api/pay/'];

export function GET() {
  const disallow = DISALLOW.map((d) => `Disallow: ${d}`).join('\n');
  const body = `# ${BASE_URL}/robots.txt
# Indexing and AI answer engines are welcome to read product, collection and guide pages.
# Content-Signal (IETF draft): search + AI answers yes, model training no.

User-agent: *
Allow: /
${disallow}
Content-Signal: search=yes, ai-input=yes, ai-train=no

# Search and AI crawlers — named groups ignore the * group, so the rules are repeated here.
${AI_AND_SEARCH_BOTS.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /
${disallow}

Sitemap: ${BASE_URL}/sitemap.xml

# Agent-readable resources
# llms.txt: ${BASE_URL}/llms.txt
# llms-full.txt: ${BASE_URL}/llms-full.txt
# API Catalog: ${BASE_URL}/.well-known/api-catalog
# Agent Skills: ${BASE_URL}/.well-known/agent-skills/index.json
# MCP Server Card: ${BASE_URL}/.well-known/mcp/server-card.json
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
