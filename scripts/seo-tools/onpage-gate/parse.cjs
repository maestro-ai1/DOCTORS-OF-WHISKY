const fs=require('fs');const out=[];
for(const n of [1,2,3,4,5,6,7,8,9,10]){if(!fs.existsSync('res-'+n+'.txt'))continue;
 const L=fs.readFileSync('res-'+n+'.txt','utf8').split('\n').map(x=>x.trim()).filter(Boolean);
 const start=L.indexOf('Updated');let i=start+1;
 while(i<L.length&&!/^Selected/.test(L[i]))i++;i+=3;
 while(i<L.length){ if(L[i]===L[i+1]&&L[i].length>2){const kw=L[i];i+=2;const words=[];while(/^(Informational|Commercial|Transactional|Navigational|[ICTN])$/.test(L[i])){if(L[i].length>1)words.push(L[i]);i++}
   const rest=[];while(i<L.length&&!(L[i]===L[i+1]&&L[i].length>2&&!/^\d/.test(L[i]))&&rest.length<8){rest.push(L[i]);i++}
   out.push({kw,intent:words.join(', '),vol:rest[0],kd:rest[1],cpc:rest[2]});}else i++}
}
fs.writeFileSync('parsed.json',JSON.stringify(out));console.log(out.length,out.slice(0,8));
