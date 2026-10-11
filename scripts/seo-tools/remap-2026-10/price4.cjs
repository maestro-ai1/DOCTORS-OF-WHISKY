const fs=require('fs');
const R=require('./refload.cjs').load();
const t=fs.readFileSync('C:/claude projects/doctors of whisky/DOCTORS-OF-WHISKY/lib/data/products.ts','utf8');
const s=t.indexOf('= [',t.indexOf('export const PRODUCTS'))+2,e=t.indexOf('\n];',s)+3;
const P=JSON.parse(t.slice(s,e-1));
const STOP=/^(scotch|whisky|whiskey|single|malt|the|year|old|yo|yr|limited|edition|bottle|bottles|and|of|a|with|in|gift|box|australian|japanese|blended|kentucky|straight|bourbon|vodka|gin|rum|tequila|wine|beer|liqueur|cognac|brandy|pure|premium|cask|series|release|reserve|pack|cans|can|nv|abv)$/;
const sizeMl=x=>{const m=/(\d+(?:\.\d+)?)\s*(ml|l|litre|ltr|lt)\b/i.exec(x);if(!m)return null;const v=parseFloat(m[1]);return /^m/i.test(m[2])?v:v*1000};
const norm=x=>x.toLowerCase().replace(/&/g,' and ').replace(/[’']/g,'').replace(/(\d+(?:\.\d+)?)\s*(ml|l|litre|ltr|lt)\b/gi,' ').replace(/\d+(\.\d+)?%/g,' ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const words=x=>norm(x).split(' ').filter(w=>w&&!STOP.test(w));
const nums=x=>new Set(words(x).filter(w=>/^\d+$/.test(w)));
const TYPES=['whisky','whiskey','vodka','gin','rum','tequila','mezcal','cognac','brandy','liqueur','wine','beer','cider','soju','champagne','prosecco','calvados','bourbon'];
const typeSet=x=>{const l=x.toLowerCase();return new Set(TYPES.filter(w=>l.includes(w)).map(w=>w==='whiskey'?'whisky':w))};
const RI=R.map(r=>({r,w:new Set(words(r.title+' '+r.vendor)),n:nums(r.title),size:sizeMl(r.title)}));
const out=[];
for(const p of P){
  const pw=new Set(words(p.name+' '+p.brand)),pn=nums(p.name),ps=sizeMl(p.size||'')||sizeMl(p.name);
  const hits=[];
  for(const q of RI){
    let ok=true;for(const n of pn)if(!q.n.has(n)){ok=false;break}
    if(!ok)continue;for(const n of q.n)if(!pn.has(n)&&!(ps&&String(ps)===n)){ok=false;break}
    if(!ok)continue;
    if(ps&&q.size&&Math.abs(ps-q.size)>1)continue;
    let inter=0;for(const w of pw)if(q.w.has(w))inter++;
    const sc=inter/Math.max(pw.size,1)*0.7+inter/Math.max(q.w.size,1)*0.3;
    if(sc<0.85||inter/Math.max(q.w.size,1)<0.6)continue;
    // type words must not contradict
    const a=typeSet(p.name+' '+p.subCategorySlug),b=typeSet(q.r.title);
    const MAIN=['whisky','vodka','gin','rum','tequila','cognac','mezcal','wine','beer','cider','champagne','prosecco'];
    const am=MAIN.filter(x=>a.has(x)),bm=MAIN.filter(x=>b.has(x));
    if(am.length&&bm.length&&!am.some(x=>bm.includes(x)))continue;
    if(b.has('gin')&&!a.has('gin')&&(a.has('whisky')||a.has('vodka')||a.has('rum')))continue;
    const fmt=/(pack|collection|set|box|decanter|edition|miniature|gift)/i;
    if(fmt.test(p.name)&&!fmt.test(q.r.title))continue;
    hits.push({src:q.r.src,title:q.r.title,price:q.r.price,url:q.r.url,sc});
  }
  // best hit per source
  const per={};for(const h of hits){const c=per[h.src];if(!c||h.sc>c.sc||(h.sc===c.sc&&h.price<c.price))per[h.src]=h}
  out.push({slug:p.slug,name:p.name,size:p.size,sub:p.subCategorySlug,price:p.price,orig:p.originalPrice||null,ev:Object.values(per)});
}
fs.writeFileSync('price-ev.json',JSON.stringify(out));
const m=out.filter(o=>o.ev.length>0);
console.log('with evidence',m.length,'of',out.length,'| both sources',out.filter(o=>o.ev.length===2).length,'| ds only',out.filter(o=>o.ev.length===1&&o.ev[0].src==='ds').length,'| bb only',out.filter(o=>o.ev.length===1&&o.ev[0].src==='bb').length);
