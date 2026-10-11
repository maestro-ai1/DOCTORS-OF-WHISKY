const fs=require('fs');const {load}=require('./bank.cjs');const SP=require('./sp.cjs');
const {all}=load();
const P='C:/claude projects/doctors of whisky/SEO Analysis/mapping-v2.json';
const m=JSON.parse(fs.readFileSync(P,'utf8'));
const f=k=>({kw:k.kw,vol:k.vol,kd:k.kd,intent:k.int,raw:k.raw||k.int,lvl:'sub-category'});
const get=kw=>{const k=all.get(kw);if(!k||k.kd>29||!/Transactional|Commercial/.test(k.int))throw new Error('bad '+kw);return k};
const sub=s=>m.subcategories.find(x=>x.slug===s);
// primaries
const setPrim=(slug,kw)=>{const s=sub(slug);const old=s.primary;const k=get(kw);if(k.int!=='Transactional')console.log('NOTE not T:',kw,k.int);s.primary=f(k);s.secondary=s.secondary.filter(x=>x.kw!==kw);if(old&&old.kw!==kw)s.secondary.unshift(old);};
setPrim('vodka','buy vodka online');
setPrim('white-tequila','tequila for sale');
// owned by new pages: strip from collection secondaries/tags
const OWN={
 vodka:/smirnoff|absolut|absolute/,
 'white-tequila':/^(tequila|tequila australia|tequila bottle|tequila blanco|blanco tequila|reposado tequila|silver tequila|affordable tequila|tequila 1l|tequila bottles)$/,
 'gold-tequila':/^(tequila|tequila australia|tequila bottle|tequila blanco|blanco tequila|reposado tequila|silver tequila|affordable tequila|tequila 1l|tequila bottles)$/,
 gin:/^(gin gifts|gin gifts australia|gin gift packs|gin gift set australia|gin gift pack|gin gift set|gin presents|gin presents australia|gin gift)$/,
 'pink-gin':/gift|present/,
 'scotch-whisky':/^(whisky gift pack|whiskey gift|whiskey gifts australia|whisky gift set|whisky gifts|good whiskey for gift)$/,
 'australian-whisky':/^(whisky gift pack|whiskey gift|whiskey gifts australia|whisky gift set|whisky gifts|good whiskey for gift)$/,
};
const pool=[...all.values()].filter(k=>k.kd!==null&&k.kd<=29&&k.vol>=50&&/Transactional|Commercial/.test(k.int)&&/^[a-z0-9 '&-]+$/.test(k.kw));
const taken=new Set();for(const t of ['categories','subcategories','pages'])for(const e of m[t]){const p=e.primary||e.fallbackPrimary;if(p)taken.add(p.kw)}
for(const [slug,re] of Object.entries(OWN)){
  const s=sub(slug);const bad=k=>re.test(k.kw);
  const sec=s.secondary.filter(k=>!bad(k)),tags=s.tags.filter(k=>!bad(k));
  const have=new Set([s.primary.kw,...sec.map(k=>k.kw),...tags.map(k=>k.kw)]);
  // top-up from the sub-specific pool
  const sp=new Set(SP[slug]||[]);
  const extra=pool.filter(k=>!have.has(k.kw)&&!taken.has(k.kw)&&!bad(k)&&k.kw.split(' ').some(t=>sp.has(t))&&!/smirnoff|absolut/.test(slug==='vodka'?k.kw:'zzzz')).sort((a,b)=>b.vol-a.vol);
  const fill=arr=>arr;
  while(sec.length<15&&tags.length){sec.push(tags.shift())}
  for(const k of extra){if(sec.length>=15)break;sec.push(f(k));have.add(k.kw)}
  for(const k of extra){if(tags.length>=20)break;if(have.has(k.kw))continue;tags.push(f(k));have.add(k.kw)}
  s.secondary=sec.sort((a,b)=>b.vol-a.vol).slice(0,15);s.tags=tags.slice(0,20);
  console.log(slug,'sec',s.secondary.length,'tags',s.tags.length,'|',s.primary.kw,'|',s.secondary.slice(0,6).map(k=>k.kw).join('; '));
}
const c={};for(const t of ['categories','subcategories','pages'])for(const e of m[t]){const p=e.primary||e.fallbackPrimary;if(p)c[p.kw]=(c[p.kw]||0)+1}
console.log('dup primaries',Object.entries(c).filter(x=>x[1]>1));
fs.writeFileSync(P,JSON.stringify(m));
