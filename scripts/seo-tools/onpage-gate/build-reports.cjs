const fs=require('fs');const R='C:/claude projects/doctors of whisky/DOCTORS-OF-WHISKY/docs/keyword-report/';
// compliance report
const p3=fs.readFileSync('payload3.json','utf8');fs.writeFileSync(R+'onpage-seo-compliance-2026-10-30.html',fs.readFileSync('tpl3.html','utf8').replace('/*DATA*/',()=>p3));
// keyword map
let t=fs.readFileSync('tpl.html','utf8');
const rep=(a,b)=>{if(!t.includes(a))console.log('MISSING',a.slice(0,50));t=t.replace(a,()=>b)};
rep('Proposed homepage remap (not applied, for your approval)','Homepage remap (applied 30 Oct 2026)');
rep('Goal: one clear topic for the homepage so Google can place it.','Applied: one clear topic for the homepage so Google can place it.');
const p=fs.readFileSync('payload.json','utf8');fs.writeFileSync(R+'keyword-map-audit-2026-10-30.html',t.replace('/*DATA*/',()=>p));
console.log('written',p3.length,p.length);
