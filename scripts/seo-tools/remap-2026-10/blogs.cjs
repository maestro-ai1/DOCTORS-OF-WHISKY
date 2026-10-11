const fs=require('fs');const {load}=require('./bank.cjs');const {all}=load();
const P='C:/claude projects/doctors of whisky/SEO Analysis/blog-seo.json';
const b=JSON.parse(fs.readFileSync(P,'utf8'));
const mac=[...all.values()].filter(k=>k.kd!==null&&k.kd<=28&&/macallan|sherry/.test(k.kw)&&/^(Informational|Navigational)$/.test(k.int)).sort((x,y)=>y.vol-x.vol).slice(0,6).map(k=>k.kw+' '+k.vol+'/'+k.kd+' '+k.int);
console.log('macallan I/N candidates',mac);
const RE={
 'guide-to-australian-craft-cider':'cider australia','best-mixers-for-home-bar':'cocktails using ginger beer','how-to-choose-red-wine':'red wine varieties',
 'white-wine-styles-explained':'white wine types','cabernet-sauvignon-merlot-grenache-red-wine-grapes':'merlot wines','tequila-aging-guide-blanco-reposado-anejo':'tequila el patron silver',
 'don-julio-vs-patron-tequila-compared':'don julio tequila brands','why-japanese-whisky-became-a-global-obsession':'toki suntory whiskey','grey-goose-vs-belvedere-vodka-compared':'grey goose liquor'};
fs.copyFileSync(P,P.replace('.json','.before-remap-v3.json'));
const taken=new Set(Object.values(b).map(v=>v.primary));
for(const [slug,kw] of Object.entries(RE)){
  const e=b[slug];if(!e)throw new Error(slug);const k=all.get(kw);
  if(taken.has(kw))throw new Error('dup '+kw);
  const old=e.primary,oldVol=e.vol;
  const sec=e.secondary.filter(x=>x!==kw);
  if(old&&!sec.includes(old))sec.unshift(old);
  e.secondary=sec.slice(0,15);e.tags=(e.tags||[]).filter(x=>x!==kw);
  e.primary=kw;e.vol=k.vol;e.kd=k.kd;e.primarySource='bank (Nav/Info, remap v3)';
  taken.add(kw);console.log(slug,':',old,oldVol,'->',kw,k.vol,'/',k.kd,k.int);
}
fs.writeFileSync(P,JSON.stringify(b,null,1));
