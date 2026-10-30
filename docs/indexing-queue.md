# Google Search Console indexing queue

Last updated 2026-10-30. Property: https://doctorsofwhisky.com.au/ (URL prefix; open in the built-in browser pane, signed in as the owner).

## Where we are (30 Oct 2026)
- Search performance, last 28 days: 2 clicks, 1,360 impressions, average position 41.8, 259 queries (top queries are champagne terms).
- Page indexing: 10 indexed, 684 "Discovered - currently not indexed" (Google knows the URLs from the sitemaps but has not crawled them), 0 "Crawled - currently not indexed". There is no quality rejection; the gap is crawl demand, so internal links, backlinks and fresh content are what move it.
- Daily quota: "Request indexing" allowed 5 successful requests, then "Quota Exceeded" (resets next day). Do not click Request twice on the same URL (each click used quota). One URL takes about 40 seconds.

## How to run a session (built-in browser pane, tab on search.google.com)
1. Top search icon -> paste the full URL -> Enter (URL Inspection).
2. If "URL is on Google" the page is already indexed: skip unless its content changed.
3. If "URL is not on Google": click REQUEST INDEXING once, wait for "Indexing requested", click Dismiss (wait 2 s), next URL.
4. Stop at "Quota Exceeded" and note below which URLs were done.

## Done 2026-10-30
| URL | Result |
|---|---|
| / | requested (refresh after remap) |
| /shop/whisky/ | requested (refresh) |
| /collections/tequila/ | requested (was unknown to Google) |
| /brands/glenfiddich/ | requested (was not indexed) |
| /collections/smirnoff/ | requested (was unknown to Google) |

Already indexed on 30 Oct (no request needed): /gifts/whisky/, /gifts/gin/, /shop/spirit/, /shop/beer-premix-wine/.

## Next session: priority 1 (tomorrow, in this order)
| URL | Type | Primary keyword (intent, volume) | Why |
|---|---|---|---|
| /collections/absolut/ | Landing | absolut vodka (C, 8100) | not indexed on 30 Oct; Absolut head term 8,100 |
| /brands/jack-daniels/ | Brand hub | jack daniels (C, 18100) | not indexed on 30 Oct; 18,100 head term |
| /brands/heineken/ | Brand hub | heineken (T, 6600) | not indexed on 30 Oct; Transactional 6,600 |
| /brands/kraken/ | Brand hub | kraken rum (T, 8100) | not indexed on 30 Oct; Transactional 8,100 |
| /shop/beer-premix-wine/collection/champagne/ | Sub-category | champagne sale (T, 590) | already ranking (champagne queries, 86+ impressions); refresh after H1/title change |
| /brands/chivas-regal/ | Brand hub | regal chivas whisky (T, 4400) | Transactional 4,400 |
| /brands/veuve-clicquot/ | Brand hub | veuve clicquot (C, 14800) | 14,800 head term |
| /shop/spirit/collection/gin/ | Sub-category | buy gin online (T, 480) | gin 14,800 head term in secondaries |
| /shop/whisky/collection/scotch-whisky/ | Sub-category | scotch whisky (C, 2900) | scotch whisky 2,900 |
| /shop/whisky/collection/australian-whisky/ | Sub-category | lark whisky (T, 3600) | lark whisky Transactional 3,600 |
| /shop/spirit/collection/baileys-irish-cream/ | Sub-category | baileys (C, 22200) | baileys 22,200 |
| /shop/spirit/collection/spiced-rum/ | Sub-category | kraken black spiced rum (T, 1600) | kraken black spiced rum 1,600 |
| /shop/beer-premix-wine/collection/sauvignon-blanc/ | Sub-category | sauvignon white wine (T, 4400) | 4,400 |
| /shop/spirit/collection/pink-gin/ | Sub-category | pink gin (T, 4400) | pink gin 4,400 |
| /shop/other/ | Category | buy soju (T, 170) | category hub (soju, mixers) |

## Next sessions: priority 2 (inspect first, skip any already indexed; about 5 per day)
| # | URL | Type | Primary keyword (intent, volume) |
|---|---|---|---|
| 1 | /brands/hennessy/ | Brand hub | hennessy (C, 12100) |
| 2 | /brands/kahlua/ | Brand hub | kahlua (C, 9900) |
| 3 | /brands/jim-beam/ | Brand hub | jim beam (C, 9900) |
| 4 | /shop/spirit/collection/patron/ | Sub-category | patron (C, 8100) |
| 5 | /shop/spirit/collection/don-julio/ | Sub-category | don julio (C, 8100) |
| 6 | /brands/johnnie-walker/ | Brand hub | johnnie walker (C, 8100) |
| 7 | /brands/moet-and-chandon/ | Brand hub | moet (C, 8100) |
| 8 | /shop/spirit/collection/grey-goose/ | Sub-category | grey goose (I, 6600) |
| 9 | /shop/spirit/collection/belvedere/ | Sub-category | belvedere vodka (C, 6600) |
| 10 | /shop/spirit/collection/ouzo/ | Sub-category | ouzo (C, 6600) |
| 11 | /brands/jameson/ | Brand hub | jameson whisky (C, 6600) |
| 12 | /brands/macallan/ | Brand hub | macallan 12 (C, 5400) |
| 13 | /brands/captain-morgan/ | Brand hub | captain morgan (C, 5400) |
| 14 | /shop/beer-premix-wine/collection/imported-beer/ | Sub-category | heineken beer (T, 2900) |
| 15 | /blog/what-is-vermouth-sweet-dry-cocktails/ | Blog | vermouth (I, 9900) |
| 16 | /brands/glenmorangie/ | Brand hub | glenmorangie (N, 4400) |
| 17 | /brands/laphroaig/ | Brand hub | laphroaig (T, 2900) |
| 18 | /shop/spirit/collection/rum/ | Sub-category | malibu rum liquor (T, 2400) |
| 19 | /blog/popular-liqueurs-licor-43-sour-puss-elderflower-amaretto/ | Blog | sour puss (I, 8100) |
| 20 | /brands/starward/ | Brand hub | starward whisky (C, 3600) |
| 21 | /shop/beer-premix-wine/collection/port-wine/ | Sub-category | port wine (C, 2900) |
| 22 | /shop/beer-premix-wine/collection/grenache/ | Sub-category | grenache red (T, 1900) |
| 23 | /brands/hibiki/ | Brand hub | hibiki whiskey (C, 2900) |
| 24 | /shop/spirit/collection/cognac-brandy/ | Sub-category | hennessy cognac (T, 1600) |
| 25 | /shop/beer-premix-wine/collection/vodka-premix/ | Sub-category | cruiser vodka (T, 1600) |
| 26 | /shop/beer-premix-wine/collection/pinot-grigio/ | Sub-category | wine pinot (T, 1600) |
| 27 | /shop/beer-premix-wine/collection/german-beer/ | Sub-category | german beer (C, 2400) |
| 28 | /blog/pinot-grigio-vs-pinot-gris-italy-guide/ | Blog | pinot gris (I, 5400) |
| 29 | /brands/royal-salute/ | Brand hub | royal salute 21 (C, 2400) |
| 30 | /brands/espolon/ | Brand hub | espolon tequila (C, 2400) |
| 31 | /brands/casamigos/ | Brand hub | casamigos tequila (T, 1600) |
| 32 | /brands/pol-roger/ | Brand hub | pol roger champagne (C, 2400) |
| 33 | /brands/taittinger/ | Brand hub | taittinger champagne (C, 2400) |
| 34 | /shop/whisky/collection/japanese-whisky/ | Sub-category | nikka whiskey (T, 1300) |
| 35 | /shop/other/collection/soju/ | Sub-category | jinro soju (T, 1300) |
| 36 | /shop/whisky/collection/irish-whiskey/ | Sub-category | bushmills whiskey (T, 1300) |
| 37 | /blog/white-spiced-dark-rum-guide/ | Blog | white rum (I, 4400) |
| 38 | /brands/balvenie/ | Brand hub | balvenie (T, 1300) |
| 39 | /brands/martell/ | Brand hub | martell (C, 1900) |
| 40 | /shop/whisky/collection/rye-whiskey/ | Sub-category | whiskey & rye (T, 1000) |
| 41 | /shop/spirit/collection/baijiu/ | Sub-category | kweichow moutai (T, 1000) |
| 42 | /shop/spirit/collection/coffee-liqueur/ | Sub-category | kahlua liquor (T, 1000) |
| 43 | /shop/beer-premix-wine/collection/cider/ | Sub-category | mercury hard cider (T, 1000) |
| 44 | /blog/limoncello-spritz-recipe/ | Blog | limoncello spritz recipe (I, 3600) |
| 45 | /blog/amaro-101-italy-bittersweet-tradition/ | Blog | amaro (I, 3600) |
| 46 | /blog/irish-whiskey-guide-bushmills-redbreast-how-its-made/ | Blog | irish whiskey (C, 3600) |
| 47 | /brands/chandon/ | Brand hub | chandon brut price (T, 1000) |
| 48 | /brands/ardbeg/ | Brand hub | ardbeg (T, 1000) |
| 49 | /brands/ballantines/ | Brand hub | ballantines whisky (T, 1000) |
| 50 | /brands/woodford-reserve/ | Brand hub | woodford reserve bourbon (T, 1000) |
| 51 | /brands/redbreast/ | Brand hub | redbreast whiskey (T, 1000) |
| 52 | /shop/spirit/collection/amaro/ | Sub-category | jagermeister price (T, 880) |
| 53 | /brands/wild-turkey/ | Brand hub | wild turkey bourbon (C, 1300) |
| 54 | /brands/bacardi/ | Brand hub | bacardi rum (C, 1300) |
| 55 | /blog/malibu-rum-and-coconut-rum-what-they-are/ | Blog | malibu rum (I, 2900) |
| 56 | /shop/spirit/collection/sambuca/ | Sub-category | galliano sambuca (T, 720) |
| 57 | /shop/beer-premix-wine/collection/non-alcoholic-beer/ | Sub-category | zero beer (T, 720) |
| 58 | /shop/beer-premix-wine/collection/lager/ | Sub-category | lager beer (C, 1000) |
| 59 | /brands/laurent-perrier/ | Brand hub | laurent perrier (T, 720) |
| 60 | /brands/victoria-bitter/ | Brand hub | victoria bitter beer (T, 720) |

## After that
Product pages: start with brands that have hubs (Glenfiddich, Macallan, Johnnie Walker, Jack Daniels) in the order of docs/keyword-report/product-keyword-ledger-2026-10-30.csv (verified primaries first). New blog posts: request indexing the day they publish (blogs are the main way to earn more crawl demand).

## Log
- 2026-10-30: 5 requests accepted, then Quota Exceeded.
