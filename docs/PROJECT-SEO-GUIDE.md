# Doctors of Whisky: project & SEO playbook

Next.js 15.5 (App Router, TS, Tailwind v4), `output:'standalone'`, `trailingSlash:true`. Vercel auto-deploys `main` (~4-5 min after push).
Site: https://doctorsofwhisky.com.au (target market: Australia, `en-AU`).

## Folder layout (important: some inputs live OUTSIDE the repo)

```
doctors of whisky/
  DOCTORS-OF-WHISKY/        <- the git repo (this)
  SEO Analysis/             <- keyword engine outputs/inputs (NOT in git, 28 MB): mapping-v2.json, blog-seo.json,
                               home.js (home keywords), page-seo.json, new-catalogue.json, engine2.js, blogs.js, check-tags.mjs ...
  Whisky Keywords Bank/     <- 79 real Semrush CSVs, AU, 28 Sep 2026 (NOT in git, 97 MB) = single source of truth
  blog pictures/, new whisky product pics/, pictures of whisky/   <- raw photos before processing
```

Keep those two outside folders backed up; the generators below read them.

## SEO rules (non-negotiable, set by the owner)

- Use Semrush data exactly as exported. Never relabel, flag, drop or guess a keyword/volume/intent.
- Intent priority: **Transactional > Commercial > Navigational > Informational**. KD <= 28. Never exclude low-KD/high-volume keywords.
- **Product / category / sub-category / page**: primary = Transactional; **15 secondary** (Commercial first); tags = **20 Commercial**.
- **Homepage**: primary + taglines = highest-volume Transactional/Commercial keywords.
- **Blog posts + FAQ**: primary and 15 secondary = Navigational/Informational; blog tags = **20 Commercial**.
- Do NOT change existing keywords unless the owner says so. Do not break links, files, images or products.
- Prices only from thedrinksociety.com.au. Use H2 headings, descriptive alt text, high-authority outbound links.
- Performance targets: Rank Math, GTmetrix (all green, Grade A), PageSpeed, isitagentready all 90%+.

## Performance guardrails (do not regress)

- Server components by default; client islands only where state is needed (cart, wishlist, quick view). Interactions are CSS-only where possible (`<details>`, `peer-checked`, `group-hover`).
- Use `PlainLink` (server anchor) in server components, `AppLink` only where prefetch is needed.
- WhatsApp text: always `waText()` from `lib/whatsapp.ts`. Never `join('\n')` or multi-line template literals (minifier makes Rank Math report "JS not minified").
- No `backdrop-blur` on the sticky header (clips the mobile menu). No auto-rotating hero. First hero image is `priority`.
- `content-visibility:auto` helpers (`.cv-auto/.cv-footer/.cv-card`) in `globals.css`; `experimental.inlineCss` is on. Keep images through `next/image` with `productAlt()` from `lib/alt.ts`.
- Measure with alternating A/B Lighthouse runs (local runs are noisy); check CLS stays 0.

## How keyword data flows

```
Whisky Keywords Bank (CSV) -> SEO Analysis/*.json (engine2.js, blogs.js, home.js, pages.js)
  -> scripts/apply-keywords-v2.mjs  (run from repo root: node scripts/apply-keywords-v2.mjs)
       writes GENERATED files, never edit by hand:
         lib/data/seo-keywords.ts   products / sub-categories / categories
         lib/data/blog-seo.ts       blog primary + 15 secondary + 20 tags (by slug)
         lib/data/home-seo.ts       homepage primary, primaries, 15 secondary, tags, headline
         lib/data/page-seo.ts, category-seo.ts, faq-keywords.ts
  -> node scripts/apply-seo-content.mjs   (copy/FAQ text that uses those keywords)
```

Consumers: `app/page.tsx` + `components/HomeIntro.tsx` (home), `lib/data/blog.ts` (merges `BLOG_SEO` into each post).

## Add a new blog post

1. Pick a topic/keyword cluster from `docs/blog-plan.md` / `docs/keyword-cluster.txt` (next unused cluster). Primary must be Navigational/Informational from the bank (KD <= 28).
2. Add the keyword entry to `SEO Analysis/blogs.js` (or `blogs2.js`) in the same shape as the others, then regenerate: `node scripts/apply-keywords-v2.mjs` -> adds the slug to `lib/data/blog-seo.ts` (primary, 15 secondary, 20 Commercial tags). Do not hand-edit that file.
3. Write the post in the next free `lib/data/blog-new-N.ts` using `newGuide({...})` from `blog-new-helpers.ts` (slug, title, seoTitle <= 60 chars, excerpt, category, image, primaryKeyword, relatedSubcategory, lead, takeaways, sections with H2 headings and internal `links` to `/shop/<cat>/collection/<sub>/`, 3-5 faqs, 2+ high-authority `outbound` links). Aim 1,000+ words. Register the array in `lib/data/blog.ts` if it is a new file. Newest post = first in the list (the blog index features `BLOG_POSTS[0]`); keep dates descending.
4. Image: drop the raw photo in `blog pictures/`, run `node scripts/process-blog-images.mjs`, result goes to `public/images/blog/<slug>.webp`. Alt text comes from the title; keep it descriptive.
5. Verify: `npm run build`, `node scripts/blog-audit.mjs`, `node scripts/seo-score-audit.mjs`. Blog index paginates 9 per page (`BLOG_PAGE_SIZE` in `app/blog/BlogView.tsx`; pages 2+ use `<h2>` card headings); new posts reflow pagination automatically and `/blog/page/N` is in the sitemap.
6. Publish + index: see "After publishing" below.

## Update homepage SEO

1. Edit the keyword choice in `SEO Analysis/home.js` (primary = highest-volume Transactional; taglines/tags = high-volume Commercial/Transactional; 15 secondary). Do not change existing keywords unless asked.
2. `node scripts/apply-keywords-v2.mjs` regenerates `lib/data/home-seo.ts`. Visible copy lives in `components/HomeIntro.tsx` (H1/H2s, tagline, tag links) and metadata in `app/page.tsx`.
3. Every tag/related-search link must land on a page that lists products: `node SEO Analysis/check-tags.mjs http://127.0.0.1:3100` (or `scripts/seo-tools/check-tags.mjs`) against a local `next start`.
4. Title <= 60 chars, description 120-160 chars, keep the primary in title, H1 and first paragraph. Bump `CONTENT_UPDATED` in `lib/seo.ts` when content changes.

## Reports (keyword mapping)

`scripts/seo-tools/` (run from that folder, in order): `kwreport.cjs` (reads the site data + bank -> `docs/keyword-report/data/kwrows.json`), `kwout.cjs` (CSVs: `keywords-by-page.csv`, `keywords-master.csv`), `kwhtml.cjs` (`on-page-keywords-report.html`). Re-run after any keyword change. Off-page/backlink keyword pack: `docs/keyword-report/offpage-backlink-keywords.*`.

## Other data

- Products: `lib/data/products.ts`; sub-categories: `lib/data/subcategories.ts` (`heroImage` must be set, otherwise the category tile breaks). Photos: `public/images/products/<subcat>/<slug>.jpg`; `scripts/process-images.mjs` resizes/optimises. `docs/products-without-pictures.*` lists items still using `coming-soon.svg` (9 left).
- Shop pagination: `lib/shop-pages.ts` (`SHOP_PAGE_SIZE` 24). Collection pages `/shop/<cat>/collection/<sub>/page/N/`.
- Orders/payments: `docs/order-system.md`, `lib/config.ts` (PAYMENT_METHODS incl. PayID, Bitcoin, USDT TRC20/ERC20).

## After publishing (indexing workflow)

1. Push to `main`, wait ~5 min for Vercel. Sitemap index `/sitemap.xml` (children: pages, products, collections, blog) is generated by `lib/sitemap.ts`, no manual edit needed.
2. `node scripts/seo-tools/smcheck.mjs https://doctorsofwhisky.com.au` : every sitemap URL must be 200, self-canonical, not noindex.
3. `node scripts/seo-tools/indexnow.mjs` : pushes all sitemap URLs to Bing/IndexNow (key file route `app/dow-indexnow-key-2026.txt`).
4. Google Search Console (property doctorsofwhisky.com.au, account Propps Ptyltd): Sitemaps -> resubmit `sitemap.xml`; URL Inspection -> Request indexing for new/changed URLs (quota is small; do the new blog post + its category first). Bing Webmaster is verified via GSC import; submit new URLs manually (limit about 100/day).
5. Re-run the audits: PageSpeed, GTmetrix, Rank Math SEO analyzer, isitagentready.com. Locally: `npm run build && npx next start -p 3100` then `node scripts/live-audit.mjs`, `scripts/integrity-audit.mjs`.

## Conventions / gotchas

- Windows + Git Bash: do not pass leading-slash args (rewritten to paths); write non-trivial scripts to files rather than `node -e`.
- `String.replace` treats `$$` specially: use split/join or the editor for text containing `$`.
- Geo/hreflang: `en-AU` + `x-default`, geo meta in `app/layout.tsx`. Age gate is server HTML + head script (`html.age-ok`).
- Agent-readiness files (llms/ai-catalog/agent-auth/markdown negotiation) are in `lib/agent/files.ts` and `app/.well-known/`; `public/js/webmcp.js` is minified from `docs/src/webmcp.source.js`.
- Open items: 9 products without photos; 241 product-name primaries not found in the bank (remap only if the owner asks); DNS-AID needs DNS records.

## Keyword mapping preview (always keep it openable)

Before using or changing any keywords, make sure the keyword mapping preview opens: `docs/keyword-report/on-page-keywords-report.html` (full per-page mapping with intent and volume) and `SEO Analysis/mapping-v2.html`. Regenerate with `scripts/seo-tools` (`kwreport.cjs`, `kwout.cjs`, `kwhtml.cjs`) after any keyword change, serve it (`npx http-server docs/keyword-report -p 4180`, since `file://` is sometimes refused in the browser pane) and open it in a NEW browser tab for the user.

## Primary-keyword fit rule

A primary keyword must name the page's own topic (champagne page -> "champagne sale", beer category -> beer term, not a different drink). Anything that does not fit is moved to that page's secondary list, never dropped. `scripts/seo-tools/fit-fix.cjs` (reads/writes `../SEO Analysis/mapping-v2.json`) applies the per-page overrides; then run `node scripts/apply-keywords-v2.mjs`. Spirit category still uses "buy rum online" and Port has no keyword because the bank has no generic Transactional spirits/port term.
