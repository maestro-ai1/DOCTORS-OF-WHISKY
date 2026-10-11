const fs=require('fs');
const {m,changes}=require('./remap.cjs');
const P='C:/claude projects/doctors of whisky/SEO Analysis/mapping-v2.json';
const BK='C:/claude projects/doctors of whisky/SEO Analysis/mapping-v2.before-remap-v3.json';if(!fs.existsSync(BK))fs.copyFileSync(P,BK);
const f=k=>({kw:k.kw,vol:k.vol,kd:k.kd,intent:k.int||k.intent,raw:k.raw||k.int||k.intent,lvl:'sub-category'});
for(const s of m.subcategories){
  if(s._newPrimary){s.primary=s._newPrimary;delete s.fallbackPrimary}
  s.secondary=s._sec.map(f);s.tags=s._tags.map(f);
  delete s._newPrimary;delete s._sec;delete s._tags;
}
fs.writeFileSync(P,JSON.stringify(m));
// uniqueness
const c={};for(const t of ['categories','subcategories','pages'])for(const e of m[t]){const p=e.primary||e.fallbackPrimary;if(p)c[p.kw]=(c[p.kw]||[]).concat(e.name)}
console.log('changed primaries',changes.length,'dups',Object.entries(c).filter(([k,v])=>v.length>1));
