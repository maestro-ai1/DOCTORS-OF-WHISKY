const fs=require('fs');const O=require('./onpage.json');const urls=new Set();O.forEach(o=>o.ext.forEach(e=>{if(!/wa\.me/.test(e.h))urls.add(e.h)}));
const list=[...urls];const out={};let i=0;
const chk=async(u)=>{try{const c=new AbortController();const t=setTimeout(()=>c.abort(),9000);let r=await fetch(u,{method:'HEAD',redirect:'follow',signal:c.signal,headers:{'user-agent':'Mozilla/5.0'}});if(r.status>=400){r=await fetch(u,{redirect:'follow',signal:c.signal,headers:{'user-agent':'Mozilla/5.0'}})}clearTimeout(t);return r.status}catch(e){return 0}};
(async()=>{const w=async()=>{while(i<list.length){const u=list[i++];out[u]=await chk(u)}};await Promise.all(Array.from({length:10},w));
fs.writeFileSync('ext.json',JSON.stringify(out));const bad=Object.entries(out).filter(([u,s])=>s>=400||s===0);console.log('checked',list.length,'bad',bad.length);bad.slice(0,25).forEach(b=>console.log(b[1],b[0]))})();
