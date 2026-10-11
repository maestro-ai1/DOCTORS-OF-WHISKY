const fs=require('fs'),path=require('path');
const B='C:/claude projects/doctors of whisky/Whisky Keywords Bank/';
function parse(s){const rows=[];let r=[],f='',q=false;for(let i=0;i<s.length;i++){const c=s[i];if(q){if(c=='"'){if(s[i+1]=='"'){f+='"';i++}else q=false}else f+=c}else if(c=='"')q=true;else if(c==','){r.push(f);f=''}else if(c=='\n'){r.push(f);rows.push(r);r=[];f=''}else if(c!='\r')f+=c}if(f||r.length){r.push(f);rows.push(r)}return rows}
const rank={Transactional:4,Commercial:3,Navigational:2,Informational:1};
function load(){
 const all=new Map();let raw=0;const files=fs.readdirSync(B).filter(f=>f.endsWith('.csv'));
 for(const f of files){
  const rows=parse(fs.readFileSync(B+f,'utf8').replace(/^\uFEFF/,''));
  const h=rows[0].map(x=>x.trim().toLowerCase());
  const ix={kw:h.indexOf('keyword'),int:h.indexOf('intent'),rel:h.indexOf('relevance'),vol:h.indexOf('volume'),kd:h.findIndex(x=>x.startsWith('keyword difficulty')||x=='kd')};
  if(ix.kw<0||ix.vol<0||ix.kd<0)throw new Error('header '+f+' '+h);
  const src=f.split('_')[0];
  for(const r of rows.slice(1)){
   if(r.length<3)continue;raw++;
   const kw=r[ix.kw].trim().toLowerCase();if(!kw)continue;
   const vol=+r[ix.vol]||0,kd=r[ix.kd]===''?null:+r[ix.kd];
   const labels=(r[ix.int]||'').split(',').map(x=>x.trim()).filter(Boolean);
   const used=['Transactional','Commercial','Navigational','Informational'].find(l=>labels.includes(l))||'';
   const o=all.get(kw);
   if(!o)all.set(kw,{kw,vol,kd,raw:r[ix.int]||'',int:used,rel:+r[ix.rel]||0,src:[src]});
   else{o.src.push(src);if(vol>o.vol)o.vol=vol}
  }
 }
 return {all,raw,files};
}
module.exports={load,parse};
if(require.main===module){
 const {all,raw,files}=load();const a=[...all.values()];
 const inRange=a.filter(k=>k.kd!==null&&k.kd<=28);
 const cnt=(arr)=>{const c={};arr.forEach(k=>c[k.int||'(unlabelled)']=(c[k.int||'(unlabelled)']||0)+1);return c};
 console.log('files',files.length,'raw rows',raw,'unique',a.length);
 console.log('all intents',cnt(a));
 console.log('KD<=28',inRange.length,cnt(inRange));
 console.log('KD<=28 vol>=50',inRange.filter(k=>k.vol>=50).length,cnt(inRange.filter(k=>k.vol>=50)));
 console.log('KD<=28 vol>=300',inRange.filter(k=>k.vol>=300).length,cnt(inRange.filter(k=>k.vol>=300)));
 const un=inRange.filter(k=>!k.int&&/\b(buy|for sale|price|cheap|deals?|sale|order|online|delivery|shop|cost|specials?|near me)\b/.test(k.kw));
 console.log('unlabelled KD<=28 with transactional wording',un.length,'vol>=50',un.filter(k=>k.vol>=50).length);
 const m=fs.readFileSync('C:/claude projects/doctors of whisky/DOCTORS-OF-WHISKY/docs/keyword-report/keywords-master.csv','utf8').split(/\r?\n/).length-2;
 console.log('keywords-master rows (used in report)',m);
 const kd=a.filter(k=>k.kd===null);console.log('null KD',kd.length);
}
