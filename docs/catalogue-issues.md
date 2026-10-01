# Catalogue data issues — needs the owner (internal, never publish)

Found during the 2026-10-01 SEO and integrity audit. The product catalogue (`lib/data/products.ts`, 442 products) is generated from templates
(`scripts/generate-products.mjs`, `scripts/templates.mjs`). Items below could not be verified or fixed from code and need real store data.

## Fixed in code
- **Non-alcoholic beer collection** listed regular Corona, Modelo, Peroni and Heineken 500 mL as "<0.5%" (removed, redirects added, generator filtered).
- **D9 seltzers** (Saint D9 / Strong D9) were listed at 4.5-5.0% ABV in 330 mL. They are 9.9% ABV alcoholic seltzers in 500 mL (Saint) and 375 mL (Strong)
  cans (about 3.9 and 2.9 standard drinks per can), verified against Dan Murphy's, Cellars Market and The Drink Society listings.
  Brand is now Saint / Strong, not "Zero Sugar". Corrections live in `scripts/apply-product-corrections.mjs` (idempotent; re-run after regenerating).
- **Tasting notes and reviews** carried over from the old AI Studio site are kept as-is (they are generic per category, but are not to be deleted).

## Still needs the owner
1. **Stock levels are invented.** The generator sets `stock = 4 + (index % 9)`. The site shows "In Stock (Sydney Vault)", caps the quantity selector at that
   number and the AI agent tool reports `in_stock` from it. Replace with real inventory, or hide stock claims until the data is real.
2. **ABV and size are template defaults per sub-category**, not product facts. Examples: every wine is "750ml" at a generic range (including
   "Batch Co Bondi Spritz 24pack Cans" listed as 750 mL at 12-13%, and "Jacobs Creek Shiraz Case" listed as one 750 mL bottle); "24 Ice Frozen Cocktails
   5pack Limoncello" is listed as 700 mL at 25-32%. Spirits show ranges such as "40.0% - 46.0%". ABV and pack size should come from the label.
3. **Prices look inconsistent and were not touched.** For example Macallan 12 Sherry Oak is $4,645, Macallan 12 Colour Collection $2,865 and Macallan 12
   Double Cask $315; Hennessy VSOP is $405. Confirm whether these are bottle, case or allocation prices. The blog guides quote no prices for this reason.
4. **Templated copy** (descriptions, FAQs) repeats store-level claims (Sydney vault, insured delivery, minimum order, crypto discount, WhatsApp number).
   Check every claim is current and true before relying on it for SEO or the AI agent files.
5. **Image filenames** still contain the typo "heinenken" (the product slugs were fixed). Cosmetic only.

## Keyword notes
- Only one blog primary keyword exceeds KD 24: "chinese baijiu" (KD 26); every baijiu keyword in the bank is KD 26 or higher.
- No bank data for "how is vodka made", "how to store whisky" or "investing in whisky" (kept as evergreen long-tail primaries).
