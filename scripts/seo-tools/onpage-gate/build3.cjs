const fs=require('fs');const {agg,res,rules}=require('./rules.json');const O=require('./onpage.json');const SOLVED=require('./solved-products.json');const d=require('./pages.json');
const pg={};d.pages.forEach(p=>pg[p.url]=p);
const typeAgg={};res.forEach(x=>{const t=x._meta.t;if(t==='Page')return;const o=typeAgg[t]||(typeAgg[t]={n:0,full:0,sum:0});const rs=rules.filter(r=>r.types.includes(t));const ok=rs.filter(r=>x[r.id]).length;o.n++;o.sum+=ok/rs.length;if(ok===rs.length)o.full++});
const prod=res.filter(x=>x._meta.t==='Product');
const tiers={T:0,C:0,Cx:0,zero:0};Object.values(SOLVED).forEach(s=>{if(s.tier==='T')tiers.T++;else if(s.tier==='C')tiers.C++;else if(s.tier==='C-exception')tiers.Cx++;else tiers.zero++});
const exc=res.filter(x=>x._exc).map(x=>[x._meta.url,x._meta.t,x._meta.prim]);
const nonProdExc=res.filter(x=>x._exc&&x._meta.t!=='Product').map(x=>[x._meta.url,x._meta.t,x._meta.prim]);
const short=res.filter(x=>x._short&&!['/about/','/contact/'].includes(x._meta.url)).map(x=>[x._meta.url,x._meta.t,x._meta.prim,pg[x._meta.url].secondary.length]);
const blogPending=res.filter(x=>x._meta.t==='Blog'&&x._pending).map(x=>[x._meta.url,x._meta.prim]);
const blogExc=['/blog/what-is-baijiu/','/blog/best-cream-coffee-liqueurs-for-cocktails/','/blog/why-non-alcoholic-beer-is-booming/','/blog/everything-about-rose-wine/','/blog/grey-goose-vs-belvedere-vodka-compared/'].map(u=>[u,pg[u]?pg[u].primary[0]:'']);
const extra=['/brands/the-dalmore/','/shop/whisky/collection/scotch-whisky/'].map(u=>[u,pg[u].primary[0]]);
const before={M1:59,M2:28,M3:58,H2:61,H3:0,H6:62,T2:50,T5:69,L1:54,L3:81,P2:72};
const payload={agg:agg.map(a=>({id:a.id,grp:a.grp,name:a.name,n:a.n,ok:a.ok,per:Object.fromEntries(Object.entries(a.per).map(([t,v])=>[t,[v.ok,v.n]]))})),typeAgg,tiers,excCount:exc.length,nonProdExc,short,blogPending,blogExc,extra,before,total:res.length,
 img:{n:760,under1000:69,over150k:80,edge:'about 20% of a 1-in-4 sample (38 of 190)'}};
fs.writeFileSync('payload3.json',JSON.stringify(payload));console.log(tiers,exc.length,nonProdExc.length,short.length,blogPending.length,Object.entries(typeAgg).map(([t,o])=>t+':'+Math.round(100*o.sum/o.n)+'/'+o.full+'/'+o.n).join(' '));
