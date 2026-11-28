# Doctors of Whisky

Read `docs/PROJECT-SEO-GUIDE.md` first: architecture, the Golden rule section (Semrush data as given, intent priority T>C>N>I, KD<=29, 15 secondary / 5 visible, 20 tags / 10 visible, one primary per URL), how to add a blog post, how to update homepage SEO, indexing workflow and performance guardrails.

Hard rules: never edit generated files (`lib/data/seo-keywords.ts`, `blog-seo.ts`, `home-seo.ts`) by hand; don't change existing keywords unless asked; don't break links, images, products; keep Rank Math / GTmetrix / PageSpeed / isitagentready at 90%+.

engine2.js, blogs.js, blogs2.js and blogmerge.js are retired: never regenerate the mapping from scratch. Change keywords by editing the mapping JSON and running apply-keywords-v2.mjs; add products with scripts/add-products.mjs and scripts/seo-tools/new-product-keywords.cjs.

## Session workflow (owner orders, 2026-11-28; follow every session)
1. **Start of every session: Google Search Console indexing.** Open GSC in the built-in browser pane (owner signed in), read the notification bell, then request indexing for the priority links in `docs/indexing-queue.md` (about 5 a day, one click per URL, stop at "Quota Exceeded", log what was done). Priority = money pages: brand hubs, collections, gifts, new product/blog pages for T and C keywords.
2. **The primary keyword is never ignored.** Every product, blog, category and brand page carries one researched primary (Transactional first, Commercial for high volume; KD 29 or lower), unique site-wide. Goal = high turnover. Brand head terms go to brand hubs/collections.
3. **Report first, then fix in batches.** Fresh Semrush data every time (click "Update metrics" in Keyword Overview > Bulk Analysis; Semrush only through Claude in Chrome). Each batch ends with: tsc, build, all audits at 0 failures, live check, push, then a numbers report.
4. **Every batch follows the golden rule:** one H1 first in the document containing the primary; H2/H3 carry secondaries; alt text on every image (focus keyword); 3+ contextual inbound links and authority outbound links; title starts with the primary, meta 110-158; 5 FAQs; schema.
