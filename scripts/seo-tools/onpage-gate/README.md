# On-page SEO gate (live crawl audit)

Run before reporting any SEO work as done (skill: `onpage-seo-gate`). Build the site, start it (`npx next start -p 3100`), then from the repo root:

1. `node scripts/seo-tools/onpage-gate/bank29.cjs`   Semrush bank (all CSVs incl. live pulls) -> bank29b.json (KD <= 29)
2. `node scripts/seo-tools/onpage-gate/audit.cjs`    site mapping vs bank -> pages.json
3. `BASE=http://127.0.0.1:3100 node .../live.cjs`, `.../onpage.cjs`, `.../prod.cjs`   live crawl (headings, links, images, schema, first paragraph)
4. `node .../analyze.cjs`  rule scorecard -> rules.json   (35 rules; exceptions are listed in analyze.cjs: EXCEPT, noTinBank, pending)
5. `node .../ext.cjs`      external link health
6. `node .../report.cjs` then `node .../build3.cjs` then `node .../build-reports.cjs`  -> docs/keyword-report/*.html (copy tpl*.html next to the scripts)

Re-mapping tools: `solve.cjs` (product primaries/secondaries from the bank, unique, Transactional first, 2.5x Commercial exception) then `apply.cjs`
(writes ../SEO Analysis/mapping-v2.json), then `node scripts/apply-keywords-v2.mjs && node scripts/apply-seo-content.mjs`. Live Semrush pulls: `recv.cjs`
(local receiver) + `parse.cjs`; save results as a CSV in `Whisky Keywords Bank/`. Outputs are written next to the scripts; they are working files.
