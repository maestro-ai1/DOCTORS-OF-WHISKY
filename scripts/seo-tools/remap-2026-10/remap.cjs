// Curated primaries (verified in the full bank + stocked brands) and rebuilt secondaries/tags per sub-category.
const fs=require('fs');
const {load}=require('./bank.cjs');
const SP=require('./sp.cjs');
const ROOT='C:/claude projects/doctors of whisky/';
const {all}=load();
const m=JSON.parse(fs.readFileSync(ROOT+'SEO Analysis/mapping-v2.json','utf8'));
const norm=s=>s.toLowerCase().replace(/gray/g,'grey').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const toks=s=>norm(s).split(' ').filter(Boolean);
const MOD=new Set('buy online sale price prices cost cheap cheapest affordable australia australian au order shop delivery delivered deal deals specials discount store best bottle bottles pack packs set gift gifts case carton for the a of and in to with from near me litre litres liter 1l 700ml 750ml 1 700 750 ml l'.split(' '));
const BLOCK=/\b(bws|liquorland|dan murphy|murphys?|coles|aldi|costco|iga|woolworths|firstchoice|near me|pizza|pizzeria|hotel|restaurant|crossword|menu|corp|apartments?|castle|jobs|stock|lyrics|recipes?|calories|percentage)\b/;
const fmt=k=>({kw:k.kw,vol:k.vol,kd:k.kd,intent:k.int,raw:k.raw||k.int});
const get=kw=>{const k=all.get(kw);if(!k||k.kd===null||k.kd>29||!k.int)throw new Error('not in range: '+kw);return k};
const PRIM={
 'scotch-whisky':'scotch whisky','japanese-whisky':'nikka whiskey','irish-whiskey':'bushmills whiskey',
 'vodka':'smirnoff liquor','vodka-premix':'cruiser vodka','grey-goose':'grey goose vodka 700ml','belvedere':'vodka belvedere',
 'patron':'patron tequila price','don-julio':'don julio brands',
 'spiced-rum':'kraken black spiced rum','rum':'malibu rum liquor','white-rum':'buy rum',
 'pink-gin':'pink gin','cognac-brandy':'hennessy cognac','baijiu':'kweichow moutai','baileys-irish-cream':'irish cream','coffee-liqueur':'kahlua liquor',
 'soju':'jinro soju','prosecco':'buy prosecco','sauvignon-blanc':'sauvignon white wine','cider':'mercury hard cider','lager':'lager beer',
};
const pool=[...all.values()].filter(k=>k.kd!==null&&k.kd<=29&&k.vol>=50&&/Transactional|Commercial/.test(k.int)&&/^[a-z0-9 '&-]+$/i.test(k.kw)&&!BLOCK.test(k.kw)).map(k=>({...k,t:toks(k.kw)}))
 .filter(k=>k.t.length&&!(k.t.length>1&&new Set(k.t).size<k.t.length)&&!['and','or','of','the','a','in','for','to','with'].includes(k.t[k.t.length-1]));
const GEN={whisky:'whisky whiskey scotch bourbon rye malt single blended'.split(' '),spirit:'vodka gin rum tequila cognac brandy liqueur liquor mezcal absinthe spirits sambuca limoncello'.split(' '),'beer-premix-wine':'beer wine cider lager premix champagne prosecco sparkling red white rose sauvignon blanc'.split(' '),other:[]};
const home=JSON.parse(fs.readFileSync(ROOT+'SEO Analysis/home-seo.json','utf8'));
const changes=[];
for(const [slug,kw] of Object.entries(PRIM)){
  const s=m.subcategories.find(x=>x.slug===slug);if(!s)throw new Error('sub '+slug);
  const k=get(kw);const old=s.primary||s.fallbackPrimary;
  changes.push([slug,old&&old.kw,kw,k.vol,k.kd,k.int]);
  s._newPrimary=fmt(k);
}
const prim=new Set();
for(const s of m.subcategories)prim.add((s._newPrimary||s.primary||s.fallbackPrimary||{}).kw);
for(const t of ['categories','pages'])for(const x of m[t]){const p=x.primary||x.fallbackPrimary;if(p)prim.add(p.kw)}
[home.primary,...home.primaries].forEach(k=>prim.add(k.kw));
const secUse={},tagUse={};
for(const s of m.subcategories){
  const sp=new Set(SP[s.slug]||toks(s.name));
  const pk=(s._newPrimary||s.primary||s.fallbackPrimary||{}).kw;
  const vocab=new Set([...sp,...(GEN[s.category]||[])]);
  const ok=k=>k.kw!==pk&&!prim.has(k.kw)&&k.t.some(t=>sp.has(t))&&k.t.every(t=>MOD.has(t)||/^d+(ml|l)?$/.test(t)||vocab.has(t));
  const u=new Map();
  const add=(k,isOld)=>{if(!k||k.kw===pk||(prim.has(k.kw)&&!isOld))return;if(!u.has(k.kw))u.set(k.kw,{kw:k.kw,vol:k.vol,kd:k.kd,int:k.int||k.intent,raw:k.raw||k.int||k.intent,old:isOld})};
  [...(s.secondary||[]),...(s.tags||[])].forEach(k=>add(k,true));
  const old=s.primary||s.fallbackPrimary;if(old&&old.kw!==pk)add(old,true);
  pool.filter(ok).forEach(k=>{if((secUse[k.kw]||0)<3)add(k,false)});
  const arr=[...u.values()].filter(k=>/Transactional|Commercial/.test(k.int)||k.old);
  const C=arr.filter(k=>k.int==='Commercial').sort((a,b)=>b.vol-a.vol),T=arr.filter(k=>k.int==='Transactional').sort((a,b)=>b.vol-a.vol),O=arr.filter(k=>!/Transactional|Commercial/.test(k.int)).sort((a,b)=>b.vol-a.vol);
  const sec=[];const used=new Set();
  const take=(list,n)=>{for(const k of list){if(sec.length>=n)break;if(!used.has(k.kw)){sec.push(k);used.add(k.kw)}}};
  take(C,11);take(T,15);take(C,15);take(O,15);
  if(old&&old.kw!==pk&&!used.has(old.kw)){sec.pop();sec.push({kw:old.kw,vol:old.vol,kd:old.kd,int:old.intent,raw:old.raw});used.add(old.kw)}
  const tags=[];for(const k of [...C,...T,...O]){if(tags.length>=20)break;if(!used.has(k.kw)){tags.push(k);used.add(k.kw)}}
  sec.forEach(k=>{if(!k.old)secUse[k.kw]=(secUse[k.kw]||0)+1});
  s._sec=sec.sort((a,b)=>b.vol-a.vol);s._tags=tags;
}
module.exports={m,changes,fmt};
if(require.main===module){
  console.log(changes.map(c=>c.join(' | ')).join('\n'));
  for(const s of m.subcategories)console.log(`## ${s.slug} [${(s._newPrimary||s.primary||s.fallbackPrimary||{}).kw}] sec${s._sec.length}/tags${s._tags.length}\n  S: ${s._sec.map(k=>k.kw+' '+k.vol).join('; ')}\n  T: ${s._tags.slice(0,6).map(k=>k.kw+' '+k.vol).join('; ')}`);
}
