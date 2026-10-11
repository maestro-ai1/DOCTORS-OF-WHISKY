const fs=require('fs');
const dirs=[['ds','C:/claude projects/doctors of whisky/SEO Analysis/price-ref/',/^p\d+\.json$/],['bb','C:/claude projects/doctors of whisky/SEO Analysis/price-ref2/',/^bb_p\d+\.json$/]];
function load(){
  const out=[];
  for(const [src,dir,re] of dirs){
    for(const f of fs.readdirSync(dir).filter(x=>re.test(x))){
      try{for(const p of JSON.parse(fs.readFileSync(dir+f,'utf8')).products||[]){
        const base=src==='ds'?'https://thedrinksociety.com.au/products/':'https://boozebud.com/products/';
        const prices=p.variants.map(v=>({t:v.title,p:parseFloat(v.price),a:v.available})).filter(v=>v.p>0);
        if(!prices.length)continue;
        out.push({src,title:p.title,vendor:p.vendor||'',type:p.product_type||'',tags:p.tags||[],url:base+p.handle,price:Math.min(...prices.map(v=>v.p)),prices});
      }}catch(e){}
    }
  }
  return out;
}
module.exports={load};
if(require.main===module){const r=load();console.log(r.length,r.filter(x=>x.src==='ds').length,r.filter(x=>x.src==='bb').length)}
