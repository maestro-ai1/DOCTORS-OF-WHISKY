const fs=require('fs');const SP=__dirname+'/';const L=require(process.cwd()+'/scripts/seo-tools/kwload.cjs');
const bank=require(SP+'bank29b.json');const d=require(SP+'pages.json');
const BP=L('lib/data/brand-pages.ts').BRAND_PAGES;
const norm=(s)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const claimed=new Set(d.pages.filter(p=>p.type!=='Product').flatMap(p=>p.primary));
let s=fs.readFileSync('lib/data/brand-pages.ts','utf8');let n=0;
for(const b of BP){if(b.secondary.length>=5)continue;
  const bt=norm(b.brand).replace(/^the /,'').split(' ').filter(t=>t.length>2);
  const have=new Set([b.primary.kw,...b.secondary.map(x=>x.kw)]);
  const c=bank.filter(x=>/Transactional|Commercial/.test(x.r)&&!have.has(x.k)&&!claimed.has(x.k)&&bt.every(t=>norm(x.k).split(' ').includes(t))&&x.v>=30).sort((a,b)=>b.v-a.v);
  const add=c.slice(0,5-b.secondary.length).map(x=>({kw:x.k,vol:x.v,kd:x.d,intent:/Transactional/.test(x.r)?'Transactional':'Commercial'}));
  if(!add.length)continue;
  const all=[...b.secondary,...add];
  const a=s.indexOf(`"slug": "${b.slug}"`);const i=s.indexOf('"secondary": [',a);const e=s.indexOf(']',i);
  s=s.slice(0,i)+'"secondary": [\n'+all.map(x=>`   { "kw": "${x.kw}", "vol": ${x.vol}, "kd": ${x.kd}, "intent": "${x.intent}" }`).join(',\n')+'\n  ]'+s.slice(e+1);
  n++;console.log(b.slug,'+',add.length,'=>',all.length)}
fs.writeFileSync('lib/data/brand-pages.ts',s);console.log('hubs filled',n);
