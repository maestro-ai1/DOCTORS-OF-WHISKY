// Outbound links to high-authority reference sites (Wikipedia, Britannica, Australian Government, industry bodies).
// Every URL was checked to return HTTP 200 on 2026-10-02 (see docs/seo-full-audit.md).
export interface AuthorityLink {
  text: string;
  url: string;
}

const WIKI = (page: string, text: string): AuthorityLink => ({ text: `Wikipedia: ${text}`, url: `https://en.wikipedia.org/wiki/${page}` });
const SPIRITS: AuthorityLink = { text: 'Wikipedia: distilled beverages', url: 'https://en.wikipedia.org/wiki/Distilled_beverage' };
const DRINKS: AuthorityLink = { text: 'Wikipedia: alcoholic drinks', url: 'https://en.wikipedia.org/wiki/Alcoholic_drink' };

export const RESPONSIBLE_DRINKING: AuthorityLink = { text: 'healthdirect (Australian Government): alcohol and your health', url: 'https://www.healthdirect.gov.au/alcohol' };

/** Keyed by sub-category slug. */
export const AUTHORITY_LINKS: Record<string, AuthorityLink[]> = {
  'scotch-whisky': [WIKI('Scotch_whisky', 'Scotch whisky'), { text: 'Scotch Whisky Association', url: 'https://www.scotch-whisky.org.uk/' }],
  bourbon: [WIKI('Bourbon_whiskey', 'bourbon whiskey'), SPIRITS],
  'rye-whiskey': [WIKI('Rye_whiskey', 'rye whiskey'), SPIRITS],
  'japanese-whisky': [WIKI('Japanese_whisky', 'Japanese whisky'), SPIRITS],
  'australian-whisky': [WIKI('Australian_whisky', 'Australian whisky'), SPIRITS],
  'french-vodka': [WIKI('Vodka', 'vodka'), SPIRITS],
  'russian-vodka': [WIKI('Vodka', 'vodka'), SPIRITS],
  'polish-vodka': [WIKI('Vodka', 'vodka'), SPIRITS],
  'grey-goose': [WIKI('Grey_Goose_(vodka)', 'Grey Goose'), SPIRITS],
  belvedere: [WIKI('Belvedere_Vodka', 'Belvedere Vodka'), SPIRITS],
  mezcal: [WIKI('Mezcal', 'mezcal'), SPIRITS],
  patron: [WIKI('Patr%C3%B3n', 'Patrón'), SPIRITS],
  'don-julio': [WIKI('Don_Julio', 'Don Julio'), SPIRITS],
  'jose-cuervo': [WIKI('Jose_Cuervo', 'Jose Cuervo'), SPIRITS],
  'white-tequila': [WIKI('Tequila', 'tequila'), { text: 'Tequila Regulatory Council (CRT)', url: 'https://www.crt.org.mx/' }],
  'gold-tequila': [WIKI('Tequila', 'tequila'), { text: 'Tequila Regulatory Council (CRT)', url: 'https://www.crt.org.mx/' }],
  'spiced-rum': [WIKI('Rum', 'rum'), SPIRITS],
  'white-rum': [WIKI('Rum', 'rum'), SPIRITS],
  gin: [WIKI('Gin', 'gin'), SPIRITS],
  baijiu: [WIKI('Baijiu', 'baijiu'), SPIRITS],
  'cognac-brandy': [WIKI('Cognac', 'Cognac'), { text: 'Interprofession du Cognac (BNIC)', url: 'https://www.cognac.fr/' }],
  'baileys-irish-cream': [WIKI('Baileys_Irish_Cream', 'Baileys Irish Cream'), SPIRITS],
  'coffee-liqueur': [WIKI('Coffee_liqueur', 'coffee liqueur'), SPIRITS],
  'orange-liqueur': [WIKI('Triple_sec', 'triple sec'), SPIRITS],
  'cinnamon-liqueur': [WIKI('Fireball_Cinnamon_Whisky', 'Fireball Cinnamon Whisky'), SPIRITS],
  amaro: [WIKI('Amaro_(liqueur)', 'amaro'), SPIRITS],
  absinthe: [WIKI('Absinthe', 'absinthe'), SPIRITS],
  limoncello: [WIKI('Limoncello', 'limoncello'), SPIRITS],
  sambuca: [WIKI('Sambuca', 'sambuca'), SPIRITS],
  soju: [WIKI('Soju', 'soju'), SPIRITS],
  lager: [WIKI('Lager', 'lager'), DRINKS],
  'imported-beer': [WIKI('Beer', 'beer'), DRINKS],
  'non-alcoholic-beer': [WIKI('Low-alcohol_beer', 'low-alcohol beer'), DRINKS],
  'ginger-beer': [WIKI('Ginger_beer', 'ginger beer'), DRINKS],
  'red-wine': [WIKI('Red_wine', 'red wine'), { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' }],
  'white-wine': [WIKI('White_wine', 'white wine'), { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' }],
  'rose-wine': [WIKI('Ros%C3%A9', 'rosé'), { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' }],
  sparkling: [WIKI('Sparkling_wine', 'sparkling wine'), { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' }],
  'port-wine': [WIKI('Port_wine', 'port wine'), { text: 'Wine Australia', url: 'https://www.wineaustralia.com/' }],
  'vodka-premix': [WIKI('Ready_to_drink', 'ready to drink'), SPIRITS],
  'zero-sugar-seltzers': [WIKI('Hard_seltzer', 'hard seltzer'), DRINKS],
  cider: [WIKI('Cider', 'cider'), DRINKS],
  'mixers-water-condiments': [WIKI('Mixer_(drink)', 'drink mixers'), DRINKS],
};

export function authorityFor(subSlug: string): AuthorityLink[] {
  return [...(AUTHORITY_LINKS[subSlug] ?? []), RESPONSIBLE_DRINKING];
}
