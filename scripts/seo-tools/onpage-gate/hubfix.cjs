const fs=require('fs');const SP=__dirname+'/';const L=require(process.cwd()+'/scripts/seo-tools/kwload.cjs');
const bank=require(SP+'bank29b.json');const bm=new Map(bank.map(b=>[b.k,b]));const d=require(SP+'pages.json');
const BP=L('lib/data/brand-pages.ts').BRAND_PAGES;
const norm=(s)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const claimed=new Set(d.pages.flatMap(p=>p.primary));
let s=fs.readFileSync('lib/data/brand-pages.ts','utf8');
for(const b of BP){const ok=b.secondary.filter(x=>/Transactional|Commercial/.test((bm.get(x.kw)||{r:x.intent}).r));if(ok.length===b.secondary.length)continue;
  const bt=norm(b.brand).replace(/^the /,'').split(' ').filter(t=>t.length>2);const have=new Set([b.primary.kw,...ok.map(x=>x.kw)]);
  const add=bank.filter(x=>/Transactional|Commercial/.test(x.r)&&!have.has(x.k)&&!claimed.has(x.k)&&bt.every(t=>norm(x.k).split(' ').includes(t))&&x.v>=30).sort((a,c)=>c.v-a.v).slice(0,5-ok.length).map(x=>({kw:x.k,vol:x.v,kd:x.d,intent:/Transactional/.test(x.r)?'Transactional':'Commercial'}));
  const all=[...ok,...add];
  const a=s.indexOf(`"slug": "${b.slug}"`);const i=s.indexOf('"secondary": [',a);const e=s.indexOf(']',i);
  s=s.slice(0,i)+'"secondary": [\n'+all.map(x=>`   { "kw": "${x.kw}", "vol": ${x.vol}, "kd": ${x.kd}, "intent": "${x.intent}" }`).join(',\n')+'\n  ]'+s.slice(e+1);
  console.log(b.slug,'kept',ok.length,'added',add.length,'=>',all.map(x=>x.kw).join(', '))}
fs.writeFileSync('lib/data/brand-pages.ts',s);
