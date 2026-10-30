const fs=require('fs');const bankDir='C:/claude projects/doctors of whisky/Whisky Keywords Bank/';
function parseCsv(txt){const rows=[];let row=[],f='',q=false;for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c==='"'){if(txt[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===','){row.push(f);f=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&txt[i+1]==='\n')i++;row.push(f);f='';if(row.length>1||row[0])rows.push(row);row=[]}else f+=c}if(f||row.length){row.push(f);rows.push(row)}return rows;}
const M=new Map();
for(const f of fs.readdirSync(bankDir).filter(x=>x.endsWith('.csv'))){
 const rows=parseCsv(fs.readFileSync(bankDir+f,'utf8').replace(/^\uFEFF/,''));const h=rows[0].map(x=>x.trim());const ix={k:h.indexOf('Keyword'),i:h.indexOf('Intent'),v:h.indexOf('Volume'),d:h.indexOf('Keyword Difficulty')};
 for(const r of rows.slice(1)){const k=(r[ix.k]||'').trim().toLowerCase();if(!k)continue;const v=+r[ix.v]||0;const d=r[ix.d]===''||r[ix.d]==null?null:+r[ix.d];const o=M.get(k);if(!o||v>o.v||(v===o.v&&d!=null&&(o.d==null||d<o.d)))M.set(k,{k,r:(r[ix.i]||'').trim(),v,d});}}
const out=[...M.values()].filter(x=>x.d!=null&&x.d<=29&&x.v>=1);
fs.writeFileSync('bank29b.json',JSON.stringify(out));console.log('kept',out.length,'of',M.size);
