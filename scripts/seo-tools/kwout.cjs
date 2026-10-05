const fs=require('fs');
const rows=JSON.parse(fs.readFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwrows.json'),'utf8'));
const out=require('path').join(__dirname,'..','..','docs','keyword-report')+'/';fs.mkdirSync(out,{recursive:true});
const q=(v)=>`"${String(v??'').replace(/"/g,'""')}"`;
// ---- by page
const order={Home:0,Page:1,Category:2,'Sub-category':3,Product:4,Blog:5,FAQ:6};const rk={primary:0,secondary:1,tag:2,'faq keyword':3};
const byPage=[...rows].sort((a,b)=>order[a.type]-order[b.type]||a.page.localeCompare(b.page)||rk[a.role]-rk[b.role]||(b.vol||0)-(a.vol||0));
fs.writeFileSync(out+'keywords-by-page.csv','﻿'+['Page URL,Page type,Role,Keyword,Intent (Semrush),Intent used (priority T>C>N>I),Volume (AU/month),Keyword difficulty'].concat(byPage.map(r=>[r.page,r.type,r.role,r.kw,r.intent,r.used,r.vol,r.kd].map(q).join(','))).join('\r\n'));
// ---- master
const M=new Map();
for(const r of rows){let m=M.get(r.kw);if(!m){m={kw:r.kw,intent:r.intent,used:r.used,vol:r.vol,kd:r.kd,inBank:r.inBank,p:0,s:0,t:0,f:0,pages:new Set(),types:new Set(),ex:[]};M.set(r.kw,m);}
 if(r.role==='primary')m.p++;else if(r.role==='secondary')m.s++;else if(r.role==='tag')m.t++;else m.f++;m.pages.add(r.page);m.types.add(r.type);if(m.ex.length<3&&!m.ex.includes(r.page))m.ex.push(r.page);}
const master=[...M.values()].sort((a,b)=>(b.vol||0)-(a.vol||0)||b.p-a.p);
const roleOf=(m)=>[m.p&&'primary',m.s&&'secondary',m.t&&'tag',m.f&&'faq'].filter(Boolean).join(' + ');
fs.writeFileSync(out+'keywords-master.csv','﻿'+['Keyword,Intent (Semrush),Intent used (priority T>C>N>I),Volume (AU/month),Keyword difficulty,Used as,Times primary,Times secondary,Times tag,Pages using it,Page types,Example pages'].concat(master.map(m=>[m.kw,m.intent,m.used,m.vol,m.kd,roleOf(m),m.p,m.s,m.t,m.pages.size,[...m.types].join(' / '),m.ex.join(' ; ')].map(q).join(','))).join('\r\n'));
// ---- stats
const pri=master.filter(m=>m.p);const sec=master.filter(m=>m.s);const tag=master.filter(m=>m.t);
const dist=(arr)=>{const d={Transactional:0,Commercial:0,Navigational:0,Informational:0,'not in bank':0};for(const m of arr){if(!m.inBank)d['not in bank']++;else d[m.used||'not in bank']=(d[m.used||'not in bank']||0)+1;}return d;};
const sum=(arr)=>arr.reduce((a,m)=>a+(+m.vol||0),0);
const stats={placements:rows.length,unique:master.length,inBank:master.filter(m=>m.inBank).length,primary:{n:pri.length,dist:dist(pri),vol:sum(pri)},secondary:{n:sec.length,dist:dist(sec)},tag:{n:tag.length,dist:dist(tag)},all:dist(master)};
fs.writeFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwstats.json'),JSON.stringify(stats,null,1));console.log(JSON.stringify(stats));
// per-type counts
const types={};for(const r of rows){const t=types[r.type]||(types[r.type]={pages:new Set(),p:0,s:0,t:0,f:0,uniq:new Set()});t.pages.add(r.page);t.uniq.add(r.kw);if(r.role==='primary')t.p++;else if(r.role==='secondary')t.s++;else if(r.role==='tag')t.t++;else t.f++;}
const typeRows=Object.entries(types).sort((a,b)=>order[a[0]]-order[b[0]]).map(([k,v])=>({type:k,pages:v.pages.size,primary:v.p,secondary:v.s,tags:v.t,faq:v.f,unique:v.uniq.size}));
fs.writeFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwtypes.json'),JSON.stringify(typeRows));console.log(typeRows);
fs.writeFileSync(require('path').join(__dirname,'..','..','docs','keyword-report','data','kwmaster.json'),JSON.stringify(master.map(m=>({k:m.kw,i:m.intent,u:m.used,v:m.vol,d:m.kd,p:m.p,s:m.s,t:m.t,f:m.f,n:m.pages.size,ty:[...m.types].join(' / '),ex:m.ex,b:m.inBank}))));
