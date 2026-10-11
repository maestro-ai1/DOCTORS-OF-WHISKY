# Re-map of 2026-10-11 (historical, one-shot)

These scripts produced the golden-rule mapping now stored in `../SEO Analysis/mapping-v2.json`, `blog-seo.json`, `home-seo.json` and
`page-seo.json`. They are kept for the audit trail and for rebuilding a single decision; they are NOT a pipeline. Day-to-day changes go
through `scripts/seo-tools/new-product-keywords.cjs` (new products) and the edit-then-`apply-keywords-v2.mjs` flow in
`docs/PROJECT-SEO-GUIDE.md`.

- `bank.cjs`: header-aware loader for all 78 Semrush CSVs (1.29M unique keywords, 13,821 labelled with KD <= 28).
- `sp.cjs`, `remap.cjs`, `remap2.cjs`, `write.cjs`: collection primaries, secondaries and tags.
- `blogs.cjs`: the 9 blog primary re-targets.
- `refload.cjs`, `price4.cjs`, `price5.cjs`: price model (market median of The Drink Society + BoozeBud).
