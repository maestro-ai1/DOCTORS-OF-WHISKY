// Verifiable, general-knowledge facts used by scripts/apply-seo-content.mjs.
// Rule: nothing here may claim anything about the store itself (vaults, sommeliers, provenance checks) —
// store facts come from lib/config.ts only. Everything below is public category / brand information.

export const SUB_FACTS = {
  'scotch-whisky': {
    what: 'Scotch whisky is whisky made in Scotland from malted barley and other cereals, distilled and matured in oak casks for at least three years under the Scotch Whisky Regulations 2009.',
    serve: 'Sip single malt neat or with a few drops of water to open it up; blended Scotch also works over ice or in a highball.',
    gift: 'Scotch is a classic gift for whisky lovers, and age-stated single malts and blended luxury bottles suit milestone occasions.',
  },
  bourbon: {
    what: 'Bourbon is American whiskey made from a mash of at least 51% corn and aged in new charred oak containers, which gives its vanilla and caramel character.',
    serve: 'Enjoy bourbon neat, over ice, or in classics such as the Old Fashioned, Manhattan and Whiskey Sour.',
    gift: 'Bourbon suits gifting for both cocktail fans and neat sippers, and small-batch and single-barrel bottles are popular choices.',
  },
  'rye-whiskey': {
    what: 'Rye whiskey is American whiskey made from a mash of at least 51% rye grain, giving a spicier, drier profile than bourbon.',
    serve: 'Rye is the traditional base for the Manhattan and Sazerac, and also sips well neat or over a large cube.',
    gift: 'A good rye is a thoughtful gift for anyone who enjoys classic cocktails.',
  },
  'japanese-whisky': {
    what: 'Japanese whisky follows Scottish production methods but is made in Japan, with distilleries such as Yoichi and Miyagikyo (Nikka) known for careful blending and a wide range of malts.',
    serve: 'Japanese whisky is often enjoyed neat, over a large ice sphere, or as a highball with chilled soda water.',
    gift: 'Japanese whisky is a prestigious gift, and age-stated and limited releases are especially sought after.',
  },
  'australian-whisky': {
    what: 'Australian whisky is made by craft distilleries, notably in Tasmania, often using local barley and ex-wine or ex-fortified-wine casks.',
    serve: 'Try Australian single malt neat first, then with a splash of water to reveal more fruit and spice.',
    gift: 'Australian single malt makes a distinctive gift for anyone who wants to try something local and small-batch.',
  },
  'french-vodka': {
    what: 'French vodka is typically distilled from wheat, rye or grapes and filtered for a smooth, clean finish.',
    serve: 'Serve French vodka very cold and neat, or in a martini or with soda and fresh citrus.',
    gift: 'Premium French vodka is a stylish gift for martini drinkers and entertainers.',
  },
  'russian-vodka': {
    what: 'Russian vodka is traditionally distilled from grain such as wheat or rye and served ice-cold as a neutral, clean spirit.',
    serve: 'Serve Russian vodka well chilled and neat alongside food, or use it as a base for Moscow Mules and Bloody Marys.',
    gift: 'A well-known Russian vodka brand is an easy, crowd-pleasing gift.',
  },
  'polish-vodka': {
    what: 'Polish vodka is made from rye, wheat, potato or other grains and has a long tradition of clean, characterful spirit.',
    serve: 'Serve Polish vodka ice-cold and neat, or mix it in a martini or Bloody Mary.',
    gift: 'A quality Polish vodka is a dependable gift for anyone who enjoys a clean, cold pour.',
  },
  'grey-goose': {
    what: 'Grey Goose is a French vodka made in the Cognac region from winter wheat and spring water.',
    serve: 'Serve Grey Goose very cold, in a martini, or with soda and lemon or lime.',
    gift: 'Grey Goose is a well-recognised premium vodka that suits gifting and hosting.',
  },
  belvedere: {
    what: 'Belvedere is a Polish rye vodka, known for a creamy texture and a subtle vanilla and pepper finish.',
    serve: 'Serve Belvedere ice-cold and neat, or in a dry martini.',
    gift: 'Belvedere is a premium Polish vodka that suits gifting and celebrations.',
  },
  mezcal: {
    what: 'Mezcal is a Mexican agave spirit, most often made from espadín agave, with a smoky character from roasting the agave hearts in earthen pits.',
    serve: 'Sip mezcal neat with orange slices, or use it in a smoky margarita or Paloma.',
    gift: 'Mezcal is a distinctive gift for adventurous drinkers and cocktail enthusiasts.',
  },
  patron: {
    what: 'Patrón is a premium tequila made in Jalisco, Mexico from 100% Weber blue agave.',
    serve: 'Sip Patrón neat or chilled, or use the Silver in a margarita or Paloma.',
    gift: 'Patrón is one of the best-known premium tequilas, and a popular gift for tequila lovers.',
  },
  'don-julio': {
    what: 'Don Julio is a premium tequila from Jalisco, Mexico, founded by Don Julio González in 1942 and made from blue agave.',
    serve: 'Sip Don Julio Reposado and Añejo neat, and use Blanco in a margarita or Paloma.',
    gift: 'Don Julio, especially the 1942 and Añejo expressions, is a much-loved tequila gift.',
  },
  'jose-cuervo': {
    what: 'Jose Cuervo is one of the oldest and best-known tequila houses, producing tequila in Jalisco, Mexico from blue agave.',
    serve: 'Use Jose Cuervo Especial in margaritas and mixed drinks, and sip the aged styles neat.',
    gift: 'Jose Cuervo is an approachable, familiar tequila that suits parties and casual gifting.',
  },
  'white-tequila': {
    what: 'Blanco (white or silver) tequila is unaged or aged for no more than two months, and tastes of fresh agave, citrus and pepper.',
    serve: 'Use blanco tequila in margaritas, palomas and tequila sodas, or sip it neat.',
    gift: 'A quality blanco tequila is a good gift for cocktail lovers.',
  },
  'gold-tequila': {
    what: 'Gold tequila (joven) is often a blend of unaged tequila with aged tequila or added colouring and flavouring, and is popular for mixing.',
    serve: 'Gold tequila works well in margaritas, tequila sunrises and shots with lime.',
    gift: 'Gold tequila suits party gifts and casual celebrations.',
  },
  'spiced-rum': {
    what: 'Spiced rum is rum infused with spices such as vanilla, cinnamon, clove and orange peel.',
    serve: 'Mix spiced rum with cola or ginger beer, or sip it over ice.',
    gift: 'Spiced rum is a friendly gift for anyone who likes easy-drinking spirits and mixers.',
  },
  'white-rum': {
    what: 'White rum is a light, usually unaged or lightly aged rum used in mojitos, daiquiris and piña coladas.',
    serve: 'Use white rum in mojitos and daiquiris, or with cola and lime.',
    gift: 'White rum suits gifting for cocktail fans, especially alongside mixers and limes.',
  },
  gin: {
    what: 'Gin is a spirit flavoured mainly with juniper berries alongside other botanicals such as coriander, citrus peel and angelica.',
    serve: 'Serve gin with tonic and a citrus twist, or in a martini, Negroni or Gimlet.',
    gift: 'Gin is one of the most popular spirit gifts, and gift sets pair well with tonic and garnishes.',
  },
  baijiu: {
    what: 'Baijiu is a Chinese grain spirit, traditionally made from sorghum and fermented with qu, usually bottled at high strength.',
    serve: 'Baijiu is traditionally sipped neat from small cups with food and toasts.',
    gift: 'Baijiu is a traditional gift for celebrations and business occasions in Chinese culture.',
  },
  'cognac-brandy': {
    what: 'Cognac is a brandy made from white grapes in the Cognac region of France, double-distilled in copper pot stills and aged in oak, with ages labelled VS, VSOP and XO.',
    serve: 'Sip cognac neat from a tulip glass, or use VS and VSOP in cocktails such as the Sidecar.',
    gift: 'Cognac, especially VSOP and XO, is a classic luxury gift.',
  },
  'baileys-irish-cream': {
    what: 'Baileys Irish Cream is a liqueur made from Irish whiskey and cream, first launched in 1974.',
    serve: 'Serve Baileys over ice, stirred into coffee, or poured over dessert.',
    gift: 'Baileys is a crowd-pleasing gift, especially at Christmas.',
  },
  'coffee-liqueur': {
    what: 'Coffee liqueur combines coffee flavour with sugar and spirit; Kahlúa is the best-known example.',
    serve: 'Use coffee liqueur in an espresso martini or White Russian, or pour it over ice cream.',
    gift: 'Coffee liqueur is a good gift for espresso martini fans.',
  },
  'orange-liqueur': {
    what: 'Orange liqueurs such as Cointreau and Grand Marnier are flavoured with orange peel and are essential in margaritas, cosmopolitans and Sidecars.',
    serve: 'Use orange liqueur in margaritas and cosmopolitans, or sip Grand Marnier neat after dinner.',
    gift: 'A quality orange liqueur is a useful gift for home bartenders.',
  },
  'cinnamon-liqueur': {
    what: 'Cinnamon liqueur (often sold as cinnamon whisky) is a sweet, spicy liqueur usually served as a chilled shot.',
    serve: 'Serve cinnamon liqueur well chilled as a shot or mixed with cider or cola.',
    gift: 'Cinnamon liqueur is a fun party gift.',
  },
  amaro: {
    what: 'Amaro is an Italian bittersweet herbal liqueur, traditionally sipped after a meal; Aperol and Campari belong to the wider Italian bitter family.',
    serve: 'Sip amaro neat or over ice, or lengthen bitters such as Aperol and Campari with prosecco or soda.',
    gift: 'Italian amaro suits gifting for food lovers and aperitivo fans.',
  },
  absinthe: {
    what: 'Absinthe is a high-strength anise-flavoured spirit made with wormwood, fennel and anise, traditionally diluted with iced water.',
    serve: 'Prepare absinthe by slowly dripping iced water over a sugar cube into the glass until it clouds.',
    gift: 'Absinthe is a talking-point gift, best paired with a proper glass and spoon.',
  },
  limoncello: {
    what: 'Limoncello is an Italian lemon liqueur made by steeping lemon zest in spirit and sweetening it with sugar syrup.',
    serve: 'Serve limoncello ice-cold on its own, or use it in a limoncello spritz with prosecco and soda.',
    gift: 'Limoncello is a bright, popular gift, especially for summer entertaining.',
  },
  sambuca: {
    what: 'Sambuca is an Italian anise-flavoured liqueur, traditionally served with three coffee beans.',
    serve: 'Serve sambuca neat with coffee beans, in a shot, or splashed into espresso.',
    gift: 'Sambuca is a traditional Italian gift for after-dinner drinks.',
  },
  soju: {
    what: 'Soju is a clear Korean spirit, traditionally made from rice and now often from other starches, usually bottled at a lower strength than most spirits.',
    serve: 'Serve soju chilled and neat with Korean food, or mix it into cocktails and with fruit juice.',
    gift: 'Soju, especially flavoured varieties, is a popular gift for Korean food and drink fans.',
  },
  lager: {
    what: 'Lager is a bottom-fermented beer conditioned cold, giving a crisp, clean taste.',
    serve: 'Serve lager cold, around 3 to 5 degrees Celsius, in a clean glass.',
    gift: 'A mixed case of quality lagers is an easy gift for beer drinkers.',
  },
  'imported-beer': {
    what: 'Imported beer covers international lagers, ales and stouts brewed overseas.',
    serve: 'Serve imported beer at the temperature recommended for its style: cold for lagers, slightly warmer for ales and stouts.',
    gift: 'Imported beer cases suit gifting for beer lovers who like to try styles from around the world.',
  },
  'non-alcoholic-beer': {
    what: 'Non-alcoholic beer is brewed like regular beer but has the alcohol removed or limited, typically to 0.5% ABV or less.',
    serve: 'Serve non-alcoholic beer well chilled in a beer glass.',
    gift: 'Non-alcoholic beer is a considerate gift for drivers and anyone cutting back on alcohol.',
  },
  'ginger-beer': {
    what: 'Ginger beer is a ginger-flavoured drink, either non-alcoholic or brewed alcoholic, and a classic mixer for the Dark and Stormy and Moscow Mule.',
    serve: 'Serve ginger beer over ice with lime, or mix it with rum or vodka.',
    gift: 'Ginger beer suits gifting alongside rum or vodka for cocktails.',
  },
  'red-wine': {
    what: 'Red wine is made from dark-skinned grapes fermented with their skins; Australian favourites include Shiraz, Cabernet Sauvignon and Pinot Noir.',
    serve: 'Serve red wine at cool room temperature, around 16 to 18 degrees Celsius, and open fuller reds an hour before drinking.',
    gift: 'A quality Australian red is a reliable gift for dinner hosts.',
  },
  'white-wine': {
    what: 'White wine is made from white or lightly coloured grapes; popular styles include Chardonnay, Sauvignon Blanc and Riesling.',
    serve: 'Serve white wine well chilled, around 7 to 10 degrees Celsius.',
    gift: 'A crisp white is a good summer gift and pairs well with seafood.',
  },
  'rose-wine': {
    what: 'Rosé is made from red grapes with brief skin contact, giving a pink colour and fresh, fruity flavour.',
    serve: 'Serve rosé chilled, around 8 to 10 degrees Celsius, especially in warm weather.',
    gift: 'Rosé is a popular gift for summer gatherings.',
  },
  sparkling: {
    what: 'Sparkling wine gets its bubbles from a second fermentation; Champagne is sparkling wine made in the Champagne region of France.',
    serve: 'Serve sparkling wine well chilled, around 6 to 8 degrees Celsius, in a flute or tulip glass.',
    gift: 'Sparkling wine is the classic celebration gift.',
  },
  'port-wine': {
    what: 'Port is a fortified wine from Portugal’s Douro Valley, usually around 19 to 22% ABV, ranging from ruby to aged tawny styles.',
    serve: 'Serve port after dinner, slightly cool for ruby and tawny, often with cheese or dessert.',
    gift: 'Port is a traditional gift for the end of the year and for dinner hosts.',
  },
  'vodka-premix': {
    what: 'Ready-to-drink premixes combine spirit with a mixer in a can or bottle, ready to pour over ice.',
    serve: 'Serve premixes cold, straight from the fridge or over ice.',
    gift: 'Premix packs suit party and barbecue gifting.',
  },
  'zero-sugar-seltzers': {
    what: 'Hard seltzers are sparkling water with alcohol and flavour, and zero-sugar versions are marketed for people who want fewer sugars.',
    serve: 'Serve seltzers very cold in the can, or over ice with a slice of fruit.',
    gift: 'Seltzers are an easy gift for summer parties.',
  },
  cider: {
    what: 'Cider is a fermented apple (or pear) drink that ranges from dry to sweet, and is popular across Australia.',
    serve: 'Serve cider cold over ice, or straight from the fridge in a tall glass.',
    gift: 'Cider suits gifting for warm-weather gatherings.',
  },
  'mixers-water-condiments': {
    what: 'Mixers, water and condiments round out a home bar and dining table.',
    serve: 'Serve mixers and water chilled, and use condiments to season food and cocktails as directed.',
    gift: 'Bar mixers pair well with spirits as a practical add-on gift.',
  },
};

export const BRAND_FACTS = {
  macallan: 'The Macallan is a Speyside single malt distillery in Craigellachie, Scotland, licensed in 1824 and known for maturing its whisky in sherry-seasoned oak casks.',
  glendronach: 'GlenDronach is a Highland single malt distillery at Forgue, Aberdeenshire, founded in 1826 and known for whisky matured in sherry casks.',
  glenfiddich: 'Glenfiddich is a family-owned Speyside distillery in Dufftown, founded by William Grant in 1887, and its 12 Year Old is one of the world’s best-selling single malts.',
  laphroaig: 'Laphroaig is an Islay single malt distillery, founded in 1815 and famous for its peat-smoke and seaweed character.',
  'johnnie walker': 'Johnnie Walker is a blended Scotch whisky with roots in Kilmarnock, Ayrshire, dating back to 1820, and is recognised by its colour-coded labels from Red to Blue.',
  'royal salute': 'Royal Salute is a luxury blended Scotch whisky from Chivas Brothers, first created in 1953 to mark the coronation of Queen Elizabeth II.',
  nikka: 'Nikka Whisky was founded by Masataka Taketsuru in 1934 and produces Japanese whisky at the Yoichi and Miyagikyo distilleries.',
  lark: 'Lark Distillery in Tasmania was founded by Bill Lark in 1992 and is widely credited with reviving Australian whisky making.',
  'grey goose': 'Grey Goose is a French vodka made in the Cognac region from winter wheat and spring water.',
  belvedere: 'Belvedere is a Polish rye vodka made at the Dobrogniewice distillery.',
  patron: 'Patrón is a premium tequila made in Jalisco, Mexico from 100% Weber blue agave.',
  'don julio': 'Don Julio was founded in 1942 by Don Julio González in Atotonilco el Alto, Jalisco, and is a premium blue agave tequila.',
  'jose cuervo': 'Jose Cuervo is one of the oldest tequila houses in the world, producing tequila in Jalisco, Mexico.',
  martell: 'Martell is the oldest of the great Cognac houses, founded in 1715 by Jean Martell.',
  baileys: 'Baileys is an Irish cream liqueur made from Irish whiskey and cream, launched in Dublin in 1974.',
};
