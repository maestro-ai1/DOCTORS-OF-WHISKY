const fs=require('fs');const bankDir='C:/claude projects/doctors of whisky/Whisky Keywords Bank/';
function parseCsv(txt){const rows=[];let row=[],f='',q=false;for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c==='"'){if(txt[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&txt[i+1]==='\n')i++;row.push(f);f='';if(row.length>1||row[0])rows.push(row);row=[]}else f+=c}if(f||row.length){row.push(f);rows.push(row)}return rows;}
const M=new Map();
for(const f of ['Whisky','Scotch-Whisky','Single-Malt','Bourbon','Japanese-Whisky','Australian-Whisky','Irish-Whiskey','American-Whiskey','Rye-Whiskey','Johnnie-Walker','Glenfiddich','Macallan']){
 const rows=parseCsv(fs.readFileSync(bankDir+f+'_all-keywords_au_2026-09-28.csv','utf8').replace(/^\uFEFF/,''));const h=rows[0];const ix={k:h.indexOf('Keyword'),i:h.indexOf('Intent'),v:h.indexOf('Volume'),d:h.indexOf('Keyword Difficulty')};
 for(const r of rows.slice(1)){const k=r[ix.k].trim().toLowerCase();const e={kw:k,raw:r[ix.i],vol:+r[ix.v]||0,kd:r[ix.d]===''?null:+r[ix.d]};const o=M.get(k);if(!o||e.vol>o.vol)M.set(k,e);}}
const all=[...M.values()].filter(x=>x.kd!=null&&x.kd<=29);
const T=all.filter(x=>/Transactional/.test(x.raw)&&/whisk|scotch|bourbon|malt/.test(x.kw)).sort((a,b)=>b.vol-a.vol).slice(0,30);
const sale=all.filter(x=>/\b(sale|cheap|online|buy|price|special|deal|discount|australia|delivery)\b/.test(x.kw)&&/whisk|scotch|bourbon|malt/.test(x.kw)).sort((a,b)=>b.vol-a.vol).slice(0,25);
const C=all.filter(x=>/Commercial/.test(x.raw)&&!/Transactional/.test(x.raw)&&/^(whisky|whiskey|scotch|scotch whisky|bourbon|single malt|japanese whisk(e)?y|irish whiskey|australian whisky|blended whisky|rye whiskey)$/.test(x.kw));
fs.writeFileSync('homecand.json',JSON.stringify({T,sale,C}));
console.log('T');T.slice(0,20).forEach(x=>console.log(x.kw,x.vol,x.kd,x.raw));console.log('sale');sale.slice(0,15).forEach(x=>console.log(x.kw,x.vol,x.kd,x.raw));console.log('C');C.forEach(x=>console.log(x.kw,x.vol,x.kd,x.raw));
