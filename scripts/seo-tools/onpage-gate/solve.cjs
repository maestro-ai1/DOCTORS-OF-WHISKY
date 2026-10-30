const fs=require('fs');const REPO='C:/claude projects/doctors of whisky/DOCTORS-OF-WHISKY';
const L=require(REPO+'/scripts/seo-tools/kwload.cjs');const bank=require('./bank29b.json');
const MAP=JSON.parse(fs.readFileSync('C:/claude projects/doctors of whisky/SEO Analysis/mapping-v2.json','utf8'));
const norm=(s)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/(\d+)\s?(yo|y o)\b/g,'$1 yo').replace(/(\d+)\s?(litres?|liters?|ltr|l)\b/g,'$1l').replace(/(\d+)\s?ml\b/g,'$1ml').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const STOP=new Set(['the','and','of','de','la','le','a','an','year','old','yo','single','malt','whisky','whiskey','scotch','bourbon','tequila','vodka','gin','rum','cognac','brandy','wine','beer','champagne','liqueur','australian','japanese','irish','french','blended','premium','edition','pack','bottle','gift','box','limited','special','collection','litre','700ml','750ml','500ml','1000ml','350ml','375ml','1l','2l','700','750','500','x']);
const COMM=new Set(['buy','price','prices','cost','sale','online','australia','au','cheap','order','shop','for','in','best','where','to','near','me','deals','deal','delivery']);
const GEN=new Set(['whisky','whiskey','scotch','bourbon','single','malt','vodka','tequila','gin','rum','cognac','brandy','champagne','liqueur','wine','beer','year','old','yo','the','and','of','premium','reserve','edition','bottle','litre','liquor','spirit','spirits','sparkling','red','white','rose','lager','ale','cider']);
const tk=(s)=>norm(s).split(' ').filter(Boolean);
const bk=bank.map(b=>({...b,t:tk(b.k),I:/Transactional/.test(b.r)?'T':/Commercial/.test(b.r)?'C':/Navigational/.test(b.r)?'N':'I'})).filter(b=>b.I==='T'||b.I==='C');
const PR=L('lib/data/products.ts').PRODUCTS;
// reserved: all non-product primaries and hub secondaries
const reserved=new Set(['whisky sale']);
const mapNP=[...MAP.categories,...MAP.subcategories,...MAP.pages];for(const e of mapNP){const p=e.primary||e.fallbackPrimary;if(p)reserved.add(p.kw)}
const BP=L('lib/data/brand-pages.ts').BRAND_PAGES;for(const b of BP){reserved.add(b.primary.kw);b.secondary.forEach(s=>reserved.add(s.kw))}
const CU=L('lib/data/curated.ts').CURATED;for(const c of Object.values(CU)){reserved.add(c.primary)}
['whisky gift pack','buy absolut vodka','absolut vodka','buy tequila online','smirnoff liquor','gin gifts australia'].forEach(k=>reserved.add(k));
const BLOG=JSON.parse(fs.readFileSync('C:/claude projects/doctors of whisky/SEO Analysis/blog-seo.json','utf8'));for(const v of Object.values(BLOG))reserved.add(v.primary);
const BSYN={'patron':['patron','gran'],'remy martin':['remy','martin']};
const pairs=[];const info={};
for(const p of PR){
  const B=tk(p.brand).filter(t=>t!=='the'&&t.length>1);const N=tk(p.name);const P=new Set(N);B.forEach(t=>P.add(t));
  tk((p.age||'')+' '+(p.vintage||'')+' '+(p.style||'')).forEach(t=>P.add(t));
  const D=N.filter(t=>!STOP.has(t)&&!B.includes(t)&&!/^(percent|abv)$/.test(t));
  const dset=new Set(D);
  info[p.slug]={B,D};const ageNum=p.age?String(parseInt(p.age)):null;const allowNum=new Set(N.filter(t=>/^\d+$/.test(t)&&(!ageNum||t.length===4||t===ageNum)));if(ageNum)allowNum.add(ageNum);
  for(const b of bk){
    if(reserved.has(b.k))continue;
    if(!B.every(t=>b.t.includes(t)))continue;
    let ok=true;for(const t of b.t){if(/^\d+$/.test(t)){if(!allowNum.has(t)){ok=false;break}continue}if(!(P.has(t)||COMM.has(t)||GEN.has(t))){ok=false;break}}
    if(!ok)continue;
    const hit=b.t.filter(t=>dset.has(t)).length;
    if(D.length&&hit===0)continue;
    const cov=D.length?hit/D.length:1;
    pairs.push({s:p.slug,k:b.k,I:b.I,v:b.v,d:b.d,r:b.r,cov,extra:b.t.filter(t=>!P.has(t)).length});
  }
}
// per product best-T vs best-C (for exception rule)
const by={};for(const x of pairs)(by[x.s]||(by[x.s]=[])).push(x);
const score=(x)=>x.v*(0.5+0.5*x.cov)*(x.extra?0.9:1);
const used=new Set();const asg={};
// pass 1: T (and C exception) in score order
const elig=[];for(const s in by){const l=by[s];const bT=l.filter(x=>x.I==='T').sort((a,b)=>score(b)-score(a))[0];const bC=l.filter(x=>x.I==='C').sort((a,b)=>score(b)-score(a))[0];
  for(const x of l){let pri=x.I==='T'?0:1;elig.push({...x,pri,sc:score(x)})}}
// first T assignment
for(const x of elig.filter(x=>x.I==='T').sort((a,b)=>b.sc-a.sc)){if(asg[x.s]||used.has(x.k))continue;asg[x.s]={...x,tier:'T'};used.add(x.k)}
// C exception upgrade: product where best C >=1000 and >=2.5x assigned T (or no T)
for(const x of elig.filter(x=>x.I==='C').sort((a,b)=>b.sc-a.sc)){if(used.has(x.k))continue;const a=asg[x.s];if(a){if(x.v>=1000&&x.v>=a.v*2.5&&a.I==='T'){used.delete(a.k);asg[x.s]={...x,tier:'C-exception'};used.add(x.k)}}else{asg[x.s]={...x,tier:x.v>=1000?'C-exception':'C'};used.add(x.k)}}
// fallback tier: name-based
const out={};let n={T:0,C:0,Cx:0,fb:0};const req=[];
for(const p of PR){const a=asg[p.slug];if(a){out[p.slug]={kw:a.k,vol:a.v,kd:a.d,intent:a.I==='T'?'Transactional':'Commercial',raw:a.r,tier:a.tier};if(a.tier==='T')n.T++;else if(a.tier==='C')n.C++;else n.Cx++}else{
  const sz=/^(d+ml|d+l|d+)$/;let w=tk(p.name).filter((t,i)=>!(i===0&&t==='the'));while(w.length&&/^d+(ml|l)$/.test(w[w.length-1]))w.pop();w=w.slice(0,6);while(w.length>2&&w.join(' ').length>52)w.pop();while(w.length>2&&STOP.has(w[w.length-1])&&!/^d+$/.test(w[w.length-1])&&['the','and','of','de','la','le','a','an','x'].includes(w[w.length-1]))w.pop();let kw=w.join(' ');if(used.has(kw)||reserved.has(kw))kw=tk(p.name).join(' ');used.add(kw);out[p.slug]={kw,vol:0,kd:null,intent:'',raw:'',tier:'semrush-request'};n.fb++;req.push(kw)}}
fs.writeFileSync('solved-products.json',JSON.stringify(out));fs.writeFileSync('semrush-request.txt',req.join('\n'));
console.log(n,'of',PR.length);
console.log(PR.slice(0,14).map(p=>p.name.slice(0,40).padEnd(40)+' => '+out[p.slug].kw+' ['+out[p.slug].tier+' '+out[p.slug].vol+'/'+out[p.slug].kd+']').join('\n'));
// ---- secondaries: product-specific eligible keywords first (balanced use), then brand-level old secondaries, then old secondaries
const useCount={};const sec={};
const bankMap=new Map(bk.map(b=>[b.k,b]));
const ownedPrimary=new Set([...used,...reserved]);
const slugs=PR.map(p=>p.slug);
for(const p of PR){
  const me=MAP.products.find(e=>e.slug===p.slug);const mine=out[p.slug].kw;
  const cand=(by[p.slug]||[]).filter(x=>x.k!==mine&&!(ownedPrimary.has(x.k)&&x.k!==mine)).map(x=>({k:x.k,v:x.v,d:x.d,I:x.I,sc:score(x)/(1+0.6*(useCount[x.k]||0))})).sort((a,b)=>b.sc-a.sc);
  const pick=[];const seen=new Set([mine]);
  for(const c of cand){if(pick.length>=15)break;if(seen.has(c.k))continue;seen.add(c.k);pick.push({kw:c.k,vol:c.v,kd:c.d,intent:c.I==='T'?'Transactional':'Commercial'})}
  const B=info[p.slug].B;
  const old=(me&&me.secondary||[]).filter(k=>!seen.has(k.kw)&&!ownedPrimary.has(k.kw));
  for(const k of old.filter(k=>B.every(t=>tk(k.kw).includes(t)))){if(pick.length>=15)break;seen.add(k.kw);pick.push({kw:k.kw,vol:k.vol,kd:k.kd,intent:k.intent})}
  for(const k of old){if(pick.length>=10)break;if(seen.has(k.kw))continue;seen.add(k.kw);pick.push({kw:k.kw,vol:k.vol,kd:k.kd,intent:k.intent})}
  pick.forEach(k=>useCount[k.kw]=(useCount[k.kw]||0)+1);sec[p.slug]=pick;
}
fs.writeFileSync('solved-secondary.json',JSON.stringify(sec));
const lens=Object.values(sec).map(x=>x.length);console.log('secondary len min',Math.min(...lens),'avg',(lens.reduce((a,b)=>a+b,0)/lens.length).toFixed(1),'<5:',lens.filter(n=>n<5).length);
const top=Object.entries(useCount).sort((a,b)=>b[1]-a[1]).slice(0,6);console.log('most reused',top);
