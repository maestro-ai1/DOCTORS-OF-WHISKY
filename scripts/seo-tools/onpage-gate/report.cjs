const fs=require('fs');
const D=__dirname+'/';
const d=JSON.parse(fs.readFileSync(D+'pages.json','utf8')),l=JSON.parse(fs.readFileSync(D+'live.json','utf8')),hc=JSON.parse(fs.readFileSync(D+'homecand.json','utf8'));
const L1={Transactional:'T',Commercial:'C',Navigational:'N',Informational:'I'};
const kx=(x)=>[x.kw,x.inBank?x.i[0]:'?',x.vol==null?-1:x.vol,x.kd==null?-1:x.kd,x.raw||''];
const rows=d.pages.map(p=>{
  const r=l[p.url];const pi=p.primaryI[0];const pr=r.pr||{};
  const flags=[];
  const blog=p.type==='Blog';const brand=p.url==='/about/'||p.url==='/contact/';
  if(!brand){
    if(!pi.inBank)flags.push('nobank');
    else{
      if(blog){if(pi.i==='Transactional'||pi.i==='Commercial')flags.push('blogTC')}
      else if(pi.i!=='Transactional')flags.push('notT');
      if(!pi.vol)flags.push('vol0');
      if(pi.kd>29)flags.push('kd');
    }
    if(!pr.title)flags.push('noTitle');
    if(!pr.h1)flags.push('noH1');
    if(!pr.p1)flags.push('noP1');
    if(!pr.alt)flags.push('noAlt');
    if(r.sec&&r.sec.some(s=>!s.inText))flags.push('secHidden');
  }
  return {u:p.url,t:p.type,p:kx(pi),pu:brand?[0,0,0,0,0,0]:[+!!pr.title,+!!pr.desc,+!!pr.h1,+!!pr.p1,+!!pr.alt,pr.count||0],
    s:p.secondaryI.slice(0,5).map((x,i)=>[...kx(x),r.sec&&r.sec[i]?+r.sec[i].inText:0,r.sec&&r.sec[i]?(r.sec[i].inLink?1:0):0]),
    more:p.secondaryI.slice(5).map(x=>[x.kw,x.inBank?x.i[0]:'?',x.vol==null?-1:x.vol]),
    tags:p.tagsI.map(x=>[x.kw,x.inBank?x.i[0]:'?',x.vol==null?-1:x.vol]),
    extra:p.type==='Home'?p.primaryI.slice(1).map(kx):undefined,
    ti:r.title||'',de:r.desc||'',h1:r.h1||'',f:flags};
});
const cnt={};for(const r of rows)for(const f of r.f)cnt[f]=(cnt[f]||0)+1;
const byType={};for(const r of rows){const o=byType[r.t]||(byType[r.t]={n:0,T:0,C:0,N:0,I:0,X:0,vol:0});o.n++;const i=r.p[1];if(i==='T')o.T++;else if(i==='C')o.C++;else if(i==='N')o.N++;else if(i==='I')o.I++;else o.X++;o.vol+=Math.max(0,r.p[2])}
const stats={pages:rows.length,cnt,byType,bankUnique:d.bankSize,bankRows:d.bankRows};
// head terms stranded
const use={};for(const p of d.pages)for(const s of p.secondaryI.slice(0,5)){const o=use[s.kw]||(use[s.kw]={kw:s.kw,n:0,vol:s.vol,i:s.i,kd:s.kd});o.n++}
const prim=new Set(d.pages.flatMap(p=>p.primary));
const stranded=Object.values(use).filter(o=>!prim.has(o.kw)&&o.vol>=5000).sort((a,b)=>b.vol-a.vol).slice(0,20).map(o=>[o.kw,o.i[0],o.vol,o.kd,o.n]);
const over=Object.values(use).sort((a,b)=>b.n-a.n).slice(0,12).map(o=>[o.kw,o.i[0],o.vol,o.kd,o.n]);
const home=rows.find(r=>r.u==='/');
const cand=(a)=>a.slice(0,10).map(x=>[x.kw,/Transactional/.test(x.raw)?'T':/Commercial/.test(x.raw)?'C':/Navigational/.test(x.raw)?'N':'I',x.vol,x.kd]);
const payload={stats,rows,stranded,over,cand:{T:cand(hc.T),sale:cand(hc.sale.filter(x=>/Transactional/.test(x.raw)))}};
fs.writeFileSync(D+'payload.json',JSON.stringify(payload));
console.log(JSON.stringify(stats.cnt),JSON.stringify(byType));
console.log('size',JSON.stringify(payload).length);
