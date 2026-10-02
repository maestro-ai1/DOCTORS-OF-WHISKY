# Doctors of Whisky: Full SEO Audit and On-Page Rebuild (2 Oct 2026)

Goal: high turnover. Every keyword comes from the Semrush bank exactly as exported (volume, KD, intent), KD 28 and under.

## 1. Audit result

| Check | Result |
|---|---|
| Page-by-page SEO score (new `scripts/seo-score-audit.mjs`, 11 to 16 checks per page) | **526 pages, 526 at 100%** |
| Live crawl (`live-audit.mjs`): status, unique title and description, one H1, canonical, JSON-LD, image alts, tags | 529 URLs, 0 fail, 0 warn |
| Blog audit (`blog-audit.mjs`): 10 checks per post | **300 of 300 (100%)** |
| Link, image and JSON-LD integrity | 529 pages, 529 internal links, 483 images, 3,125 JSON-LD blocks, 0 problems |
| `tsc --noEmit` and `next build` | clean |

Score by page type: home 1, categories 4, sub-categories 43, products 442, blogs 30, other pages 4, FAQ 1, blog index 1. Every one is 100%.

## 2. Rules applied

| Page type | Primary | 15 secondary | 20 tags |
|---|---|---|---|
| Homepage, Shop, About, Shipping, Contact | Transactional | Commercial (Transactional added for 1,000+ volume) | Commercial |
| Categories, sub-categories, products | Transactional | Commercial first, Transactional 1,000+ volume kept in | Commercial |
| Blogs, FAQ page, blog index | Navigational / Informational | Navigational / Informational | 20 Commercial (blogs) |
| FAQ questions | 12 new Q&As built on Informational keywords | | |

Also done on every relevant page: keyword H2 headings, image alt text carrying the keyword, an outbound reference block, and a "Related searches" H2 listing the 15 secondary keywords as links.

## 3. What changed on the site

- **Products (442):** new primary, 15 secondary, 20 tags, meta title, meta description, lead sentence, H2 "Primary: product name bottle details", alt text on every image, authority links.
- **Sub-categories (43) and categories (4):** keyword titles, descriptions, H2s, related searches, tags, authority links.
- **Blogs (30):** 21 now use a Navigational/Informational keyword that already appears in the article; 8 H1s reworded to carry the keyword; 15 secondary, 20 Commercial tags, related searches, image alt text.
- **Homepage:** H1 "Buy Whisky Online in Australia", tagline, 15 popular-search links, keyword H2s on the section headings, new title and description. The hero slide title is no longer an H1.
- **Other pages:** Shop, About, Shipping, Contact, Blog index and FAQ have keyword titles and descriptions and a Related searches + tags block.
- **Data pipeline:** `scripts/apply-keywords-v2.mjs` then `scripts/apply-seo-content.mjs` regenerate everything from `SEO Analysis/mapping-v2.json`, `blog-seo.json` and `page-seo.json`.

## 4. Outbound links (high authority)

Wikipedia (per-category pages), Scotch Whisky Association, Cognac BNIC, Tequila Regulatory Council, Wine Australia, healthdirect.gov.au (Australian Government, responsible drinking). All returned HTTP 200 on 2 Oct 2026. Blogs keep their existing sources (Wikipedia, Britannica, Decanter, Whisky Advocate and others).
Note: I cannot read live Domain Authority scores here (no Moz or Semrush access). These are well-known high-authority domains, not measured scores. Britannica blocks automated checks (HTTP 403), so I did not add new Britannica links. health.gov.au did not respond from this machine, so I used healthdirect.gov.au.

## 5. Where the bank has no keyword (not guessed)

- **Products:** 85 of 442 have a Transactional primary (20 specific to the product, 65 from the brand). 357 use the best keyword the bank has for that product (Commercial or Navigational) or a short product-name phrase, because the bank has no Transactional keyword for that product.
- **Brands:** 167 brand values mapped. 47 have a Transactional primary. Brands have no pages of their own (they are shop filters), so brand keywords appear on the products and collections of that brand.
- **Port wine** collection: the bank has no keyword for it, so it keeps its old primary.
- **Blogs:** 9 keep their existing primary (no Navigational/Informational bank keyword for that topic appears in the article): Japanese whisky, vodka, baijiu, non-alcoholic beer, rosé, Macallan, storing whisky, Don Julio vs Patrón, investing in whisky.
- **Fix needed from you:** exports for the brands in `SEO Analysis/mapping-v2.html` (Brands tab) that show no keywords.

## 6. High-volume keywords (1,000+ searches, KD 28 or under)

| Intent | In bank | On the site now | On the picture list | Other |
|---|---|---|---|---|
| Transactional | 96 | 49 | 26 | 21 |
| Commercial | 334 | 244 | 41 | 49 |
| Navigational | 18 | 2 | 4 | 12 |
| Informational | 188 | 69 | 0 | 119 |

"Other" is mostly repeated-word or misspelt phrases from Semrush (for example "cognac cognac") and brands you do not stock. Navigational keywords such as "glenfiddich 12" (9,900) belong on brand pages, which do not exist yet.

## 7. Missing products and categories

139 high-volume items (9 categories, 130 brands/products) are not on the website. Top by combined volume: Chivas Regal, prosecco, Jim Beam, Chandon, Moët, Absolut, Kahlúa, Somersby, Veuve Clicquot, vermouth, pinot grigio. Each has a primary, 15 secondary, 20 tags and the pictures to source: `SEO Analysis/picture-list.html` and `missing-products-picture-list.csv`.
I did not add these to the live catalogue. A product page needs your real price, size, stock and pictures; once you send the pictures I will create the pages with the keywords already prepared.

## 8. Changes you should know about

- 442 product lead paragraphs now end with "Looking for [keyword]? You can buy it online from Doctors of Whisky...".
- 8 blog H1s were reworded to carry the keyword, and where a blog's first paragraph lacked its keyword, "Searching for [keyword]?" was added at the start.
- The homepage hero is no longer the H1; the new keyword H1 sits under the hero.
- Nothing is committed or deployed. Roll back with `git checkout -- .` in `DOCTORS-OF-WHISKY` if needed (new files are untracked).

## 9. Update: new collections, products and guides (2 Oct 2026)

- **Added:** 16 collections, 96 products and 17 guides, all built from the high-volume keywords that were missing from the site. Each has a primary, 15 secondary and 20 tags.
- **Prices:** taken only from thedrinksociety.com.au (reference). Stock is a placeholder of 6 per product. Every new product uses a shared "photo coming soon" image until real pictures are supplied.
- **Not added:** brands the reference site does not list (for example Casamigos, Espolon, Hahn Super Dry, Mountain Goat), generic phrases, and non-drink terms. Collections for vermouth, IPA, tequila and pink gin could not be filled, so the guides point to the closest existing collection.
- **Audit after the additions:** 655 of 655 pages at 100%, live crawl 0 fail, blog audit 470 of 470, 658 pages with 0 broken links or images.
- The full list is in `docs/new-products-list.md`.
