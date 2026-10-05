const fs=require('fs');const path=require('path');const L=require('./kwload.cjs');
// ---- Semrush bank (as exported)
const bankDir=path.resolve(__dirname,'..','..','..','Whisky Keywords Bank')+'/';const BANK=new Map();
function parseCsv(txt){const rows=[];let row=[],f='',q=false;for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c==='"'){if(txt[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&txt[i+1]==='\n')i++;row.push(f);f='';if(row.length>1||row[0])rows.push(row);row=[]}else f+=c}if(f||row.length){row.push(f);rows.push(row)}return rows;}
for(const f of fs.readdirSync(bankDir).filter(x=>x.endsWith('.csv'))){
  const rows=parseCsv(fs.readFileSync(bankDir+f,'utf8').replace(/^﻿/,''));const h=rows[0].map(x=>x.trim());
  const ix={k:h.indexOf('Keyword'),i:h.indexOf('Intent'),v:h.indexOf('Volume'),d:h.indexOf('Keyword Difficulty'),c:h.findIndex(x=>x.startsWith('CPC'))};
  for(const r of rows.slice(1)){const k=(r[ix.k]||'').trim().toLowerCase();if(!k)continue;const e={intent:(r[ix.i]||'').trim(),vol:+r[ix.v]||0,kd:r[ix.d]===''||r[ix.d]==null?null:+r[ix.d],cpc:+r[ix.c]||0};const o=BANK.get(k);if(!o||e.vol>o.vol)BANK.set(k,e);}
}
console.log('bank keywords',BANK.size);
const PRI=['Transactional','Commercial','Navigational','Informational'];
const resolved=(s)=>{if(!s)return '';const set=s.split(',').map(x=>x.trim());for(const p of PRI)if(set.includes(p))return p;return set[0]||''};
// ---- site keywords
const uses=[];const add=(page,type,role,kw)=>{if(!kw)return;const k=String(kw).trim().toLowerCase();if(k)uses.push({page,type,role,kw:k});};
const H=L('lib/data/home-seo.ts').HOME_SEO;
add('/','Home','primary',H.primary.kw);for(const x of H.primaries||[])add('/','Home','primary',x.kw);for(const x of H.secondary||[])add('/','Home','secondary',x.kw||x);for(const x of H.tags||[])add('/','Home','tag',x.kw||x);
const PS=L('lib/data/page-seo.ts').PAGE_SEO;for(const [p,v] of Object.entries(PS)){add(p,'Page','primary',v.primary);v.secondary.forEach(x=>add(p,'Page','secondary',x));v.tags.forEach(x=>add(p,'Page','tag',x));}
const CS=L('lib/data/category-seo.ts').CATEGORY_SEO;for(const [p,v] of Object.entries(CS)){const u='/shop/'+p+'/';add(u,'Category','primary',v.primary);v.secondary.forEach(x=>add(u,'Category','secondary',x));v.tags.forEach(x=>add(u,'Category','tag',x));}
const SC=L('lib/data/subcategories.ts').SUBCATEGORIES;for(const s of SC){const u=`/shop/${s.category}/collection/${s.slug}/`;add(u,'Sub-category','primary',s.primaryKeyword);(s.secondaryKeywords||[]).forEach(x=>add(u,'Sub-category','secondary',x));(s.tags||[]).forEach(x=>add(u,'Sub-category','tag',x));}
const PR=L('lib/data/products.ts').PRODUCTS;for(const p of PR){const u=`/shop/${p.category}/${p.slug}/`;add(u,'Product','primary',p.primaryKeyword);(p.secondaryKeywords||[]).forEach(x=>add(u,'Product','secondary',x));(p.tags||[]).forEach(x=>add(u,'Product','tag',x));}
const BP=L('lib/data/blog.ts').BLOG_POSTS;for(const b of BP){const u=`/blog/${b.slug}/`;add(u,'Blog','primary',b.primaryKeyword);(b.secondaryKeywords||[]).forEach(x=>add(u,'Blog','secondary',x));(b.tags||[]).forEach(x=>add(u,'Blog','tag',x));}
let FK=[];try{FK=L('lib/data/faq-keywords.ts').KEYWORD_FAQS||[];}catch(e){}
for(const f of (Array.isArray(FK)?FK:Object.values(FK))){const kw=f.keyword||f.kw;if(kw)add('/faq/','FAQ','faq keyword',kw);}
const rows=uses.map(u=>{const b=BANK.get(u.kw);return {...u,intent:b?b.intent:'',used:b?resolved(b.intent):'',vol:b?b.vol:'',kd:b&&b.kd!=null?b.kd:'',inBank:!!b};});
fs.writeFileSync(path.join(__dirname,'..','..','docs','keyword-report','data','kwrows.json'),JSON.stringify(rows));
const uniq=new Set(rows.map(r=>r.kw));const inb=new Set(rows.filter(r=>r.inBank).map(r=>r.kw));
const byType={};for(const r of rows){(byType[r.type]||={n:0,inb:0,p:0,s:0,t:0});const o=byType[r.type];o.n++;if(r.inBank)o.inb++;if(r.role==='primary')o.p++;if(r.role==='secondary')o.s++;if(r.role==='tag')o.t++;}
console.log('placements',rows.length,'| unique keywords',uniq.size,'| unique in Semrush bank',inb.size);console.log(byType);
const pages=new Set(rows.map(r=>r.page));console.log('pages',pages.size);
