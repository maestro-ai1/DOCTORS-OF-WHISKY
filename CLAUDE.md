# Doctors of Whisky

Read `docs/PROJECT-SEO-GUIDE.md` first: architecture, the Golden rule section (Semrush data as given, intent priority T>C>N>I, KD<=29, 15 secondary / 5 visible, 20 tags / 10 visible, one primary per URL), how to add a blog post, how to update homepage SEO, indexing workflow and performance guardrails.

Hard rules: never edit generated files (`lib/data/seo-keywords.ts`, `blog-seo.ts`, `home-seo.ts`) by hand; don't change existing keywords unless asked; don't break links, images, products; keep Rank Math / GTmetrix / PageSpeed / isitagentready at 90%+.

engine2.js, blogs.js, blogs2.js and blogmerge.js are retired: never regenerate the mapping from scratch. Change keywords by editing the mapping JSON and running apply-keywords-v2.mjs; add products with scripts/add-products.mjs and scripts/seo-tools/new-product-keywords.cjs.
