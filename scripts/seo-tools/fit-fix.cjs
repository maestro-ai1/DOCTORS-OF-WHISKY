// Primary-keyword fit corrections: the new primary must name the page's own topic; the old primary is kept as a secondary (nothing dropped).
const fs=require('fs');const m=require('./mapping-v2.json');
function parse(line){const o=[];let c='',q=false;for(let i=0;i<line.length;i++){const ch=line[i];if(q){if(ch=='"'){if(line[i+1]=='"'){c+='"';i++}else q=false}else c+=ch}else if(ch=='"')q=true;else if(ch==','){o.push(c);c=''}else c+=ch}o.push(c);return o}
const K=new Map(fs.readFileSync('../Whisky Keywords Bank/_SUMMARY/keyword-bank-summary-vol50plus.csv','utf8').replace(/^﻿/,'').split(/\r?\n/).slice(1).filter(Boolean).map(l=>{const p=parse(l);return[p[0].toLowerCase(),{kw:p[0],vol:+p[3],kd:p[4]===''?null:+p[4],intent:p[2],raw:p[1]}]}));
const FIX={categories:{'beer-premix-wine':'beer sale'},subcategories:{champagne:'champagne sale',lager:'heineken lager','imported-beer':'heineken beer','australian-beer':'buy australian beer online','german-beer':'german beer','zero-sugar-seltzers':'fellr seltzer','australian-whisky':'lark whisky',ouzo:'ouzo'}};
for(const t in FIX)for(const slug in FIX[t]){
  const e=m[t].find(x=>x.slug===slug);const nk=K.get(FIX[t][slug]);if(!e||!nk)throw new Error('missing '+slug+' '+FIX[t][slug]);
  const old=e.primary||null;const lvl=old?old.lvl:(t==='categories'?'category':'sub-category');
  e.primary={kw:nk.kw,vol:nk.vol,kd:nk.kd,intent:nk.intent,raw:nk.raw,lvl};
  delete e.fallbackPrimary;
  const sec=(e.secondary||[]).filter(k=>k.kw!==nk.kw);
  if(old&&old.kw!==nk.kw&&!sec.some(k=>k.kw===old.kw)){sec.push(old);}
  // keep 15: drop the lowest-volume non-Commercial entries first
  while(sec.length>15){let idx=-1,v=1e12;sec.forEach((k,i)=>{if(k.kw!==(old&&old.kw)&&k.intent!=='Commercial'&&k.vol<v){v=k.vol;idx=i}});if(idx<0){idx=sec.length-1}sec.splice(idx,1)}
  e.secondary=sec.sort((a,b)=>b.vol-a.vol);e.tags=(e.tags||[]).filter(k=>k.kw!==nk.kw);
  console.log(t,slug,':',old&&old.kw,'->',nk.kw,'('+nk.intent+' '+nk.vol+' KD'+nk.kd+')');
}
fs.writeFileSync('mapping-v2.json',JSON.stringify(m));
// uniqueness check
const c={};for(const t of ['categories','subcategories','pages'])for(const e of m[t]){const p=e.primary||e.fallbackPrimary;if(p)c[p.kw]=(c[p.kw]||[]).concat(e.name)}
console.log('duplicate primaries:',Object.entries(c).filter(([k,v])=>v.length>1));
