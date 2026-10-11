import { BASE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

/** Classic search engine crawlers: index pages for search results. */
const SEARCH_CRAWLERS = ['Googlebot', 'Bingbot', 'DuckDuckBot', 'Applebot'];

/** AI answer and assistant agents: fetch pages live to answer a user's question and cite the source. */
const AI_ANSWER_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'DuckAssistBot',
];

/** AI indexing / training crawlers: allowed to read the public catalogue; the Content-Signal states the training preference. */
const AI_INDEXING_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'cohere-ai',
  'cohere-training-data-crawler',
  'Meta-ExternalAgent',
  'Amazonbot',
  'CCBot',
];

/** Bytespider is very aggressive, so it is allowed but asked to slow down. */
const THROTTLED = ['Bytespider'];

const DISALLOW = ['/thank-you-order/', '/api/order/', '/api/contact/', '/admin/', '/api/admin/', '/pay/', '/api/pay/', '/search/'];

export function GET() {
  const disallow = DISALLOW.map((d) => `Disallow: ${d}`).join('\n');
  const group = (title: string, bots: string[], signal: string, extra = '') =>
    `# ${title}\n${bots.map((b) => `User-agent: ${b}`).join('\n')}\nAllow: /\n${disallow}\n${extra}Content-Signal: ${signal}\n`;
  const body = `# ${BASE_URL}/robots.txt
# Named groups ignore the * group, so the rules are repeated in every group.
# Content-Signal (IETF draft): search = show in search results, ai-input = use to answer questions, ai-train = model training.

# Default for every other crawler
User-agent: *
Allow: /
${disallow}
Content-Signal: search=yes, ai-input=yes, ai-train=no

${group('Search engine crawlers', SEARCH_CRAWLERS, 'search=yes, ai-input=yes, ai-train=no')}
${group('AI answer and assistant agents (live retrieval and citations)', AI_ANSWER_AGENTS, 'search=yes, ai-input=yes, ai-train=no')}
${group('AI indexing crawlers (public pages only, training preference stated by the signal)', AI_INDEXING_CRAWLERS, 'search=yes, ai-input=yes, ai-train=no')}
${group('Throttled crawler', THROTTLED, 'search=yes, ai-input=yes, ai-train=no', 'Crawl-delay: 10\n')}
Sitemap: ${BASE_URL}/sitemap.xml

# Agent-readable resources
# llms.txt: ${BASE_URL}/llms.txt
# llms-full.txt: ${BASE_URL}/llms-full.txt
# Markdown: request any page with the header Accept: text/markdown
# API Catalog: ${BASE_URL}/.well-known/api-catalog
# Agent Skills: ${BASE_URL}/.well-known/agent-skills/index.json
# MCP Server Card: ${BASE_URL}/.well-known/mcp/server-card.json
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
