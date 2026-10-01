# SEO + technical audit — Doctors of Whisky (internal, never publish)

Audited 2026-10-01 against the production build (`next build`, standalone server), using `scripts/live-audit.mjs`.

## Result: 533 sitemap URLs crawled — 0 FAIL, 2 WARN
Checks per URL: HTTP 200, unique title, meta description, exactly one H1, canonical, no stray noindex, JSON-LD, every `<img>` has non-empty alt.
WARN: two product meta descriptions are 166 chars (limit 165): martell-blue-swift-cognac-brandy, naud-vs-cognac-brandy.

## Technical / agent-ready files (all 200)
robots.txt (named search + AI crawler groups, Content-Signal), sitemap.xml index + pages/products/collections/blog sitemaps, IndexNow key file, llms.txt, llms-full.txt, auth.md, /.well-known/{api-catalog, agent-skills/index.json, mcp/server-card.json, oauth-*, openid-configuration, ucp, acp.json}, MCP endpoint /api/mcp/ (GET info + POST JSON-RPC tools/list verified).

## Tags (invisible but indexable)
Product, blog, collection and home pages emit commercial tags as `<meta name="keywords">` and JSON-LD `keywords`. No tag text is rendered on the page, so nothing shows on the home page. Note: Google ignores meta keywords for ranking; the JSON-LD copy is read but is a weak signal. Hidden on-page tag text/links were deliberately NOT added: Google treats hidden text as spam.
Tag hygiene (lib/seo.ts `isCleanTag`): competitor retailers (Dan Murphy's, BWS, Liquorland...), typos ("don julioooo", "barboun"), accented/non-English variants and "... brands" modifiers are stripped.

## Known gaps
- Keyword data comes from the 78 CSVs in the Keywords Bank only. No live SERP/competitor scraping or third-party analyzer (Ahrefs/Semrush/Lighthouse) was run in this pass; competitor ranking claims need a SERP check.
- Some collections have no volume in the bank (primary "port wine", "zero sugar seltzer" = 0 / null KD). Pick a better primary or accept a low-volume page.
- Blog: 30 guides, expanded sections + FAQs; 1,500+ words each and original images are still to do. docs/blog-plan.md lists the next 36 posts.
- Outbound/inbound links and the 90% score target are not measured by an external analyzer yet.

## Update 2026-10-01 — blog rebuild, visible tags, integrity audit
Run on a clean production build (`next start`), 529 sitemap URLs:
- scripts/live-audit.mjs: 0 FAIL, 0 WARN (titles, descriptions, H1, canonical, JSON-LD, image alts, 20 visible tags on every product and blog page, none on the home page).
- scripts/blog-audit.mjs: 30/30 posts pass 10/10 on-page checks (primary keyword in title, description, H1, first 100 words and an image alt; 8+ internal links; 2+ outbound links; 5+ FAQs; 8+ H2s).
- scripts/integrity-audit.mjs: 529 pages, 529 unique internal links, 483 images, 3,125 JSON-LD blocks, 0 problems.
- tsc --noEmit and eslint: clean. Mobile (375px): no horizontal overflow, no console errors.

### Blog guides
Each of the 30 guides now has a validated primary keyword (volume / KD from the keyword bank), an answer-first lead, 14 to 17 H2 sections, 6 FAQs and a hero plus in-article image. Length is 1,300 to 1,700 words of copy (about 1,600 to 2,100 rendered, including FAQs, tags and product cards).
Primary keywords with no bank data (kept as evergreen long-tail): "how is vodka made", "how to store whisky", "investing in whisky". Only one primary exceeds KD 24: "chinese baijiu" (KD 26), because every baijiu keyword in the bank is KD 26 or higher.

### Catalogue issues found (not fixed here)
- Regular beers were duplicated into the non-alcoholic collection (fixed in the separate session).
- Zero-sugar-seltzers products ("D9 ...", "Saint D9 ...") have placeholder descriptions and the brand "Zero Sugar"; confirm what they are before publishing claims.
- Product prices look inconsistent (for example a Macallan 12 at a very high price): blog posts deliberately quote no prices.
