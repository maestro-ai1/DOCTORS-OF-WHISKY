const fs=require('fs');const D=__dirname+'/';const O=JSON.parse(fs.readFileSync(D+'onpage.json','utf8'));
const dec=(s)=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&nbsp;/g,' ');
const txt=(h)=>dec(h.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
(async()=>{const urls=O.map(o=>o.url);const out={};let i=0;
 const w=async()=>{while(i<urls.length){const u=urls[i++];try{const h=await (await fetch((process.env.BASE||'https://doctorsofwhisky.com.au')+u)).text();
  const clean=h.replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<script[\s\S]*?<\/script>/gi,'');const hi=clean.indexOf('<h1');
  const ps=[...clean.slice(hi<0?0:hi).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(x=>txt(x[1])).filter(t=>t.length>100&&!/Add to Vault|Crypto:|legal Australian drinking age|Are you 18|Access Restricted/.test(t));
  out[u]=ps.slice(0,2);}catch(e){out[u]=[]}}};
 await Promise.all(Array.from({length:10},w));fs.writeFileSync(D+'p1b.json',JSON.stringify(out));console.log('done')})();
