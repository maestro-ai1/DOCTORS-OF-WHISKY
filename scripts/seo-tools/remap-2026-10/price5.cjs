const fs=require('fs');
const ev=require('./price-ev.json');
const med=a=>{const s=[...a].sort((x,y)=>x-y);const n=s.length;return n%2?s[n>>1]:(s[n/2-1]+s[n/2])/2};
const r99=n=>n<3?Math.round(n*100)/100:Math.max(0.99,Math.ceil(n)-0.01);
const res={keep:[],raise:[],lower:[],unverified:[],uncertain:[]};
for(const o of ev){
  if(!o.ev.length){res.unverified.push(o);continue}
  const prices=o.ev.map(e=>e.price);const M=med(prices);
  const spread=prices.length>1?Math.max(...prices)/Math.min(...prices):1;
  const r=o.price/M;
  const T=Math.min(r99(M*1.08),r99(Math.max(...prices)*1.10));
  const row={...o,M,r,T,spread};
  if(spread>1.5){res.uncertain.push(row);continue}
  if(r>1.2)res.lower.push(row);else if(r<0.9)res.raise.push(row);else res.keep.push(row);
}
console.log(Object.fromEntries(Object.entries(res).map(([k,v])=>[k,v.length])));
fs.writeFileSync('price-plan.json',JSON.stringify(res));
const show=(arr,n=14)=>arr.slice(0,n).forEach(x=>console.log(`${x.price} -> ${x.T} (M ${x.M.toFixed(2)}, ${x.r.toFixed(2)}x) | ${x.name} [${x.size}] | ${x.ev.map(e=>e.src+':'+e.title.slice(0,50)+' $'+e.price).join(' ; ')}`));
console.log('--- lower (price too high)');show(res.lower.sort((a,b)=>b.r-a.r),12);
console.log('--- raise (too low)');show(res.raise.sort((a,b)=>a.r-b.r),20);
console.log('--- uncertain (sources disagree)');show(res.uncertain,12);
