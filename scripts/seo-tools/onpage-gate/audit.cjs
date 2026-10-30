// Audit: every keyword placement on the site vs the Semrush bank (as exported), then live-HTML usage check.
const fs=require('fs');const path=require('path');
const REPO='C:/claude projects/doctors of whisky/DOCTORS-OF-WHISKY';
const L=require(REPO+'/scripts/seo-tools/kwload.cjs');
const OUT=__dirname+'/';
const bankDir='C:/claude projects/doctors of whisky/Whisky Keywords Bank/';
function parseCsv(txt){const rows=[];let row=[],f='',q=false;for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c==='"'){if(txt[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&txt[i+1]==='\n')i++;row.push(f);f='';if(row.length>1||row[0])rows.push(row);row=[]}else f+=c}if(f||row.length){row.push(f);rows.push(row)}return rows;}
const BANK=new Map();let bankRows=0;
for(const f of fs.readdirSync(bankDir).filter(x=>x.endsWith('.csv'))){
  const rows=parseCsv(fs.readFileSync(bankDir+f,'utf8').replace(/^\uFEFF/,''));const h=rows[0].map(x=>x.trim());
  const ix={k:h.indexOf('Keyword'),i:h.indexOf('Intent'),v:h.indexOf('Volume'),d:h.indexOf('Keyword Difficulty')};
  for(const r of rows.slice(1)){const k=(r[ix.k]||'').trim().toLowerCase();if(!k)continue;bankRows++;
    const e={raw:(r[ix.i]||'').trim(),vol:+r[ix.v]||0,kd:r[ix.d]===''||r[ix.d]==null?null:+r[ix.d],src:f.replace(/_all-keywords.*/,'')};
    const o=BANK.get(k);if(!o||e.vol>o.vol||(e.vol===o.vol&&e.kd!=null&&(o.kd==null||e.kd<o.kd)))BANK.set(k,e);}
}
const PRI=['Transactional','Commercial','Navigational','Informational'];
const top=(s)=>{if(!s)return '';const set=s.split(',').map(x=>x.trim());for(const p of PRI)if(set.includes(p))return p;return set[0]||''};
const short={Transactional:'T',Commercial:'C',Navigational:'N',Informational:'I'};
// ---- site placements
const pages={}; // url -> {type,primary:[],secondary:[],tags:[],extra}
const pg=(u,t)=>pages[u]||(pages[u]={url:u,type:t,primary:[],secondary:[],tags:[]});
const add=(u,t,role,kw)=>{if(!kw)return;const k=String(kw.kw||kw).trim().toLowerCase();if(k)pg(u,t)[role].push(k);};
const H=L('lib/data/home-seo.ts').HOME_SEO;
add('/','Home','primary',H.primary);for(const x of H.primaries||[])add('/','Home','primary',x);for(const x of H.secondary||[])add('/','Home','secondary',x);for(const x of H.tags||[])add('/','Home','tags',x);
pages['/'].headline=H.headline;
const PS=L('lib/data/page-seo.ts').PAGE_SEO;for(const [p,v] of Object.entries(PS)){add(p,'Page','primary',v.primary);v.secondary.forEach(x=>add(p,'Page','secondary',x));v.tags.forEach(x=>add(p,'Page','tags',x));}
const CS=L('lib/data/category-seo.ts').CATEGORY_SEO;for(const [p,v] of Object.entries(CS)){const u='/shop/'+p+'/';add(u,'Category','primary',v.primary);v.secondary.forEach(x=>add(u,'Category','secondary',x));v.tags.forEach(x=>add(u,'Category','tags',x));}
const SC=L('lib/data/subcategories.ts').SUBCATEGORIES;for(const s of SC){const u=`/shop/${s.category}/collection/${s.slug}/`;add(u,'Sub-category','primary',s.primaryKeyword);(s.secondaryKeywords||[]).forEach(x=>add(u,'Sub-category','secondary',x));(s.tags||[]).forEach(x=>add(u,'Sub-category','tags',x));}
const PR=L('lib/data/products.ts').PRODUCTS;for(const p of PR){const u=`/shop/${p.category}/${p.slug}/`;add(u,'Product','primary',p.primaryKeyword);(p.secondaryKeywords||[]).forEach(x=>add(u,'Product','secondary',x));(p.tags||[]).forEach(x=>add(u,'Product','tags',x));}
const BP=L('lib/data/blog.ts').BLOG_POSTS;for(const b of BP){const u=`/blog/${b.slug}/`;add(u,'Blog','primary',b.primaryKeyword);(b.secondaryKeywords||[]).forEach(x=>add(u,'Blog','secondary',x));(b.tags||[]).forEach(x=>add(u,'Blog','tags',x));}
// curated landing pages
const CU=L('lib/data/curated.ts').CURATED;for(const c of Object.values(CU)){add(c.path,'Landing','primary',c.primary);(c.secondary||[]).forEach(x=>add(c.path,'Landing','secondary',x));}
add('/gifts/whisky/','Landing','primary','whisky gift pack');['whiskey gift','whiskey gifts australia','whisky gift set','whisky gifts','good whiskey for gift','whiskey presents','whisky gift pack australia'].forEach(x=>add('/gifts/whisky/','Landing','secondary',x));
const BH=L('lib/data/brand-hubs.ts').BRAND_HUBS;for(const c of BH){add(c.path,'Brand hub','primary',c.primary);(c.secondary||[]).forEach(x=>add(c.path,'Brand hub','secondary',x));}
// enrich
const info=(k)=>{const b=BANK.get(k);return b?{inBank:true,raw:b.raw,i:top(b.raw),vol:b.vol,kd:b.kd,src:b.src}:{inBank:false,raw:'',i:'',vol:null,kd:null}};
const primUse={};
for(const p of Object.values(pages)){for(const k of p.primary){(primUse[k]||=[]).push(p.url);}}
const list=Object.values(pages);
for(const p of list){
  p.primaryI=p.primary.map(k=>({kw:k,...info(k)}));
  p.secondaryI=p.secondary.map(k=>({kw:k,...info(k)}));
  p.tagsI=p.tags.map(k=>({kw:k,...info(k)}));
}
fs.writeFileSync(OUT+'pages.json',JSON.stringify({bankSize:BANK.size,bankRows,primUse,pages:list}));
console.log('bank unique',BANK.size,'rows',bankRows,'pages',list.length,Object.entries(list.reduce((a,p)=>(a[p.type]=(a[p.type]||0)+1,a),{})));
