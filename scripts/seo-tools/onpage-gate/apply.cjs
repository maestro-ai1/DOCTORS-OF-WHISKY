const fs=require('fs');const SP=__dirname+'/';const F='C:/claude projects/doctors of whisky/SEO Analysis/mapping-v2.json';
const M=JSON.parse(fs.readFileSync(F,'utf8'));const P=JSON.parse(fs.readFileSync(SP+'solved-products.json','utf8')),S=JSON.parse(fs.readFileSync(SP+'solved-secondary.json','utf8'));
let n={v:0,p:0};const led=['slug,name,primary,volume,kd,intent,status,secondary_1,secondary_2,secondary_3,secondary_4,secondary_5'];
for(const e of M.products){const s=P[e.slug];if(!s)continue;
 if(s.tier==='semrush-request'){e.primary=null;e.fallbackPrimary={kw:s.kw,vol:0,kd:null,intent:'',raw:'',lvl:'this product',pending:true};n.p++}
 else{e.primary={kw:s.kw,vol:s.vol,kd:s.kd,intent:s.intent,raw:s.raw,lvl:'this product',exception:s.tier==='C-exception'||s.tier==='C'?true:undefined};delete e.fallbackPrimary;n.v++}
 e.secondary=S[e.slug].map(k=>({kw:k.kw,vol:k.vol,kd:k.kd,intent:k.intent,raw:k.intent,lvl:'this product'}));
 const st=s.tier==='semrush-request'?'pending Semrush check':s.tier==='T'?'verified Transactional':'verified Commercial (no Transactional in bank for this product)';
 led.push([e.slug,'"'+e.name.replace(/"/g,'')+'"',s.kw,s.vol,s.kd??'',s.intent,'"'+st+'"',...S[e.slug].slice(0,5).map(k=>k.kw)].join(','));}
fs.writeFileSync(F,JSON.stringify(M));
fs.writeFileSync('C:/claude projects/doctors of whisky/DOCTORS-OF-WHISKY/docs/keyword-report/product-keyword-ledger-2026-10-30.csv',led.join('\n'));
fs.writeFileSync('C:/claude projects/doctors of whisky/DOCTORS-OF-WHISKY/docs/semrush-request-list.txt','Keywords to check in Semrush (AU) next time you are logged in. Paste into Keyword Overview > Bulk Analysis. Product primaries are the exact product name until verified.\n\n'+fs.readFileSync(SP+'semrush-request.txt','utf8'));
console.log(n);
