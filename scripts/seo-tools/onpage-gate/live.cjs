// Fetch every mapped page from the live site and record where its primary / visible secondary keywords actually appear.
const fs=require('fs');
const D=__dirname+'/';
const data=JSON.parse(fs.readFileSync(D+'pages.json','utf8'));
const BASE=process.env.BASE||'https://doctorsofwhisky.com.au';
const dec=(s)=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ');
const strip=(h)=>dec(h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<!--[\s\S]*?-->/g,'').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim().toLowerCase();
const norm=(s)=>s.toLowerCase().replace(/[^a-z0-9À-ɏ ]+/g,' ').replace(/\s+/g,' ').trim();
const has=(text,kw)=>(' '+norm(text)+' ').includes(' '+norm(kw)+' ');
async function one(p){
  const r={url:p.url,status:0};
  try{
    const res=await fetch(BASE+p.url,{redirect:'manual'});
    r.status=res.status;if(res.status>=300&&res.status<400)r.redirect=res.headers.get('location');
    const html=await res.text();
    const m=(re)=>{const x=re.exec(html);return x?dec(x[1]):''};
    r.title=m(/<title[^>]*>([^<]*)<\/title>/i);
    r.desc=m(/<meta name="description" content="([^"]*)"/i);
    r.canonical=m(/<link rel="canonical" href="([^"]*)"/i);
    r.robots=m(/<meta name="robots" content="([^"]*)"/i);
    const h1=/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);r.h1=h1?strip(h1[1]):'';
    const body=html.replace(/<header[\s\S]*?<\/header>/i,'').replace(/<footer[\s\S]*?<\/footer>/i,'');
    const after=h1?body.slice(body.indexOf(h1[0])+h1[0].length):body;
    const ps=[...after.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(x=>strip(x[1])).filter(t=>t.length>60);
    r.p1=ps[0]||'';
    r.alts=[...html.matchAll(/<img[^>]*\salt="([^"]*)"/gi)].map(x=>dec(x[1]));
    r.h2=[...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(x=>strip(x[1]));
    r.text=strip(body);
    r.words=r.text.split(' ').length;
    r.jsonld=/application\/ld\+json/.test(html);
    r.hrefs=new Set([...html.matchAll(/<a [^>]*href="(\/[^"#]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map(x=>x[2]?strip(x[2]):'')).size;
    r.links=[...html.matchAll(/<a [^>]*href="(\/[^"#]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map(x=>({h:x[1],t:strip(x[2])}));
  }catch(e){r.err=String(e.message||e)}
  return r;
}
(async()=>{
  const prev=fs.existsSync(D+'live.json')?JSON.parse(fs.readFileSync(D+'live.json','utf8')):{};const pages=data.pages.filter(p=>!prev[p.url]);const out={...prev};let i=0;
  const worker=async()=>{while(i<pages.length){const p=pages[i++];const r=await one(p);
    const pk=p.primary[0];
    r.primaryKw=pk;
    if(r.status===200){
      r.pr={title:has(r.title,pk),desc:has(r.desc,pk),h1:has(r.h1,pk),p1:has(r.p1,pk),alt:r.alts.some(a=>has(a,pk)),count:(norm(r.text).split(norm(pk)).length-1)};
      const vis=p.secondary.slice(0,5);
      r.sec=vis.map(k=>({kw:k,inText:has(r.text,k),inLink:r.links.some(l=>has(l.t,k)),inH2:r.h2.some(h=>has(h,k)),inTitle:has(r.title,k),inDesc:has(r.desc,k)}));
    }
    delete r.links;delete r.text;out[p.url]=r;
    if(i%50===0)console.log('fetched',i,'/',pages.length);}};
  await Promise.all(Array.from({length:8},worker));
  fs.writeFileSync(D+'live.json',JSON.stringify(out));
  console.log('done',Object.keys(out).length);
})();
