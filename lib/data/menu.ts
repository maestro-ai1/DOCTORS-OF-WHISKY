import { CategoryGroup } from '@/lib/types';

export const MAIN_CATEGORIES: CategoryGroup[] = [
  {
    id: 'whisky',
    name: 'WHISKY',
    slug: 'whisky',
    description: "Australia's most prestigious collection of rare single malts, aged Japanese whiskies, and limited distillery releases.",
    subGroups: [
      {
        title: 'Shop by Collection',
        items: [
          { label: 'Scotch Whisky', href: '/shop/whisky/collection/scotch-whisky' },
          { label: 'Bourbon', href: '/shop/whisky/collection/bourbon' },
          { label: 'Rye Whiskey', href: '/shop/whisky/collection/rye-whiskey' },
          { label: 'Japanese Whisky', href: '/shop/whisky/collection/japanese-whisky' },
          { label: 'Australian Whisky', href: '/shop/whisky/collection/australian-whisky' },
        ]
      },
      {
        title: 'By Brand',
        items: [
          { label: 'The Macallan', href: '/shop?category=whisky&brand=The Macallan', filterKey: 'brand', filterVal: 'The Macallan' },
          { label: 'Nikka', href: '/shop?category=whisky&brand=Nikka', filterKey: 'brand', filterVal: 'Nikka' },
          { label: 'GlenDronach', href: '/shop?category=whisky&brand=GlenDronach', filterKey: 'brand', filterVal: 'GlenDronach' },
          { label: 'Glenfiddich', href: '/shop?category=whisky&brand=Glenfiddich', filterKey: 'brand', filterVal: 'Glenfiddich' },
          { label: 'Lark (Tasmania)', href: '/shop?category=whisky&brand=Lark', filterKey: 'brand', filterVal: 'Lark' },
          { label: 'Laphroaig', href: '/shop?category=whisky&brand=Laphroaig', filterKey: 'brand', filterVal: 'Laphroaig' },
          { label: 'Johnnie Walker', href: '/shop?category=whisky&brand=Johnnie Walker', filterKey: 'brand', filterVal: 'Johnnie Walker' },
          { label: 'Royal Salute', href: '/shop?category=whisky&brand=Royal Salute', filterKey: 'brand', filterVal: 'Royal Salute' },
        ]
      },
      {
        title: 'By Style',
        items: [
          { label: 'Single Malt', href: '/shop?category=whisky&style=Single Malt', filterKey: 'style', filterVal: 'Single Malt' },
          { label: 'Bourbon & American', href: '/shop?category=whisky&style=Bourbon', filterKey: 'style', filterVal: 'Bourbon' },
          { label: 'Rye Whiskey', href: '/shop?category=whisky&style=Rye', filterKey: 'style', filterVal: 'Rye' },
          { label: 'Blended Scotch', href: '/shop?category=whisky&style=Blended Scotch', filterKey: 'style', filterVal: 'Blended Scotch' },
          { label: 'Pure Malt', href: '/shop?category=whisky&style=Pure Malt', filterKey: 'style', filterVal: 'Pure Malt' }
        ]
      },
      {
        title: 'By Country',
        items: [
          { label: 'Scotch Whisky', href: '/shop?category=whisky&country=Scotland', filterKey: 'country', filterVal: 'Scotland' },
          { label: 'Japanese Whisky', href: '/shop?category=whisky&country=Japan', filterKey: 'country', filterVal: 'Japan' },
          { label: 'Australian Whisky', href: '/shop?category=whisky&country=Australia', filterKey: 'country', filterVal: 'Australia' },
          { label: 'American Whiskey', href: '/shop?category=whisky&country=United States', filterKey: 'country', filterVal: 'United States' },
          { label: 'Irish Whiskey', href: '/shop?category=whisky&country=Ireland', filterKey: 'country', filterVal: 'Ireland' }
        ]
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under $500 AUD', href: '/shop?category=whisky&priceMax=500' },
          { label: '$500 – $1,000 AUD', href: '/shop?category=whisky&priceMin=500&priceMax=1000' },
          { label: '$1,000 – $2,500 AUD', href: '/shop?category=whisky&priceMin=1000&priceMax=2500' },
          { label: 'Over $2,500 (Vault Reserve)', href: '/shop?category=whisky&priceMin=2500' }
        ]
      },
      {
        title: 'By Type & Region',
        items: [
          { label: 'Over 20 Years Aged', href: '/shop?category=whisky&badge=RARE VAULT' },
          { label: 'Under 20 Years', href: '/shop?category=whisky' },
          { label: 'Islay Region (Peated)', href: '/shop?category=whisky&search=Islay' },
          { label: 'Speyside Region', href: '/shop?category=whisky&search=Speyside' },
          { label: 'Highland Region', href: '/shop?category=whisky&search=Highland' },
          { label: 'Limited Editions & Rare Bottles', href: '/shop?category=whisky&badge=COLLECTOR RELEASE' }
        ]
      }
    ]
  },
  {
    id: 'spirit',
    name: 'SPIRIT',
    slug: 'spirit',
    description: 'Rare Cognac decanters, artisanal extra añejo tequilas, ultra-pure vodkas, and monastery herbal liqueurs.',
    subGroups: [
      {
        title: 'Vodka',
        items: [
          { label: 'Grey Goose', href: '/shop/spirit/collection/grey-goose' },
          { label: 'Belvedere', href: '/shop/spirit/collection/belvedere' },
          { label: 'French Vodka', href: '/shop/spirit/collection/french-vodka' },
          { label: 'Russian Vodka', href: '/shop/spirit/collection/russian-vodka' },
          { label: 'Polish Vodka', href: '/shop/spirit/collection/polish-vodka' },
        ]
      },
      {
        title: 'Tequila & Mezcal',
        items: [
          { label: 'Don Julio', href: '/shop/spirit/collection/don-julio' },
          { label: 'Patrón', href: '/shop/spirit/collection/patron' },
          { label: 'Jose Cuervo', href: '/shop/spirit/collection/jose-cuervo' },
          { label: 'White Tequila', href: '/shop/spirit/collection/white-tequila' },
          { label: 'Gold Tequila', href: '/shop/spirit/collection/gold-tequila' },
          { label: 'Mezcal', href: '/shop/spirit/collection/mezcal' },
        ]
      },
      {
        title: 'Rum, Gin & Baijiu',
        items: [
          { label: 'Spiced Rum', href: '/shop/spirit/collection/spiced-rum' },
          { label: 'White Rum', href: '/shop/spirit/collection/white-rum' },
          { label: 'Gin', href: '/shop/spirit/collection/gin' },
          { label: 'Baijiu', href: '/shop/spirit/collection/baijiu' },
        ]
      },
      {
        title: 'Cognac & Brandy',
        items: [
          { label: 'Cognac & Brandy', href: '/shop/spirit/collection/cognac-brandy' },
        ]
      },
      {
        title: 'Liqueur',
        items: [
          { label: 'Baileys Irish Cream', href: '/shop/spirit/collection/baileys-irish-cream' },
          { label: 'Coffee Liqueur', href: '/shop/spirit/collection/coffee-liqueur' },
          { label: 'Orange Liqueur', href: '/shop/spirit/collection/orange-liqueur' },
          { label: 'Cinnamon Liqueur', href: '/shop/spirit/collection/cinnamon-liqueur' },
          { label: 'Amaro', href: '/shop/spirit/collection/amaro' },
          { label: 'Absinthe', href: '/shop/spirit/collection/absinthe' },
          { label: 'Limoncello', href: '/shop/spirit/collection/limoncello' },
          { label: 'Sambuca', href: '/shop/spirit/collection/sambuca' },
        ]
      },
    ]
  },
  {
    id: 'beer-premix-wine',
    name: 'BEER / PREMIX / WINE',
    slug: 'beer-premix-wine',
    description: 'Heritage Australian Icon Wines, Vintage Champagnes, Master Cask Beers, and Luxury Premixes.',
    subGroups: [
      {
        title: 'Beer',
        items: [
          { label: 'Lager', href: '/shop/beer-premix-wine/collection/lager' },
          { label: 'Imported Beer', href: '/shop/beer-premix-wine/collection/imported-beer' },
          { label: 'Non-Alcoholic Beer', href: '/shop/beer-premix-wine/collection/non-alcoholic-beer' },
          { label: 'Ginger Beer', href: '/shop/beer-premix-wine/collection/ginger-beer' },
        ]
      },
      {
        title: 'Wine',
        items: [
          { label: 'Red Wine', href: '/shop/beer-premix-wine/collection/red-wine' },
          { label: 'White Wine', href: '/shop/beer-premix-wine/collection/white-wine' },
          { label: 'Rosé Wine', href: '/shop/beer-premix-wine/collection/rose-wine' },
          { label: 'Sparkling', href: '/shop/beer-premix-wine/collection/sparkling' },
          { label: 'Port', href: '/shop/beer-premix-wine/collection/port-wine' },
        ]
      },
      {
        title: 'Premix',
        items: [
          { label: 'Vodka Premix', href: '/shop/beer-premix-wine/collection/vodka-premix' },
          { label: 'Zero Sugar', href: '/shop/beer-premix-wine/collection/zero-sugar-seltzers' },
        ]
      },
      {
        title: 'Cider',
        items: [
          { label: 'Cider', href: '/shop/beer-premix-wine/collection/cider' },
        ]
      }
    ]
  },
  {
    id: 'other',
    name: 'OTHER',
    slug: 'other',
    description: 'Collector glassware, Korean Heritage Soju, artisan tonics, and rare condiments.',
    subGroups: [
      {
        title: 'Shop by Collection',
        items: [
          { label: 'Soju', href: '/shop/other/collection/soju' },
          { label: 'Mixers, Water & Condiments', href: '/shop/other/collection/mixers-water-condiments' },
        ]
      }
    ]
  }
];
