// Live on-page crawl: headings, links, images, schema, words for every mapped URL.
const fs=require('fs');const D=__dirname+'/';
const data=JSON.parse(fs.readFileSync(D+'pages.json','utf8'));
const BASE=process.env.BASE||'https://doctorsofwhisky.com.au';
const dec=(s)=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ');
const txt=(h)=>dec(h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<!--[\s\S]*?-->/g,'').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const attr=(tag,n)=>{const m=new RegExp('\\s'+n+'="([^"]*)"','i').exec(tag);return m?dec(m[1]):null};
async function one(p){
  const r={url:p.url};
  try{
    const res=await fetch(BASE+p.url,{redirect:'manual'});r.status=res.status;
    const html=await res.text();
    const m=(re)=>{const x=re.exec(html);return x?dec(x[1]):''};
    r.title=m(/<title[^>]*>([^<]*)<\/title>/i);r.desc=m(/<meta name="description" content="([^"]*)"/i);
    r.canonical=m(/<link rel="canonical" href="([^"]*)"/i);r.robots=m(/<meta name="robots" content="([^"]*)"/i);
    // main content = without header/footer/nav
    const main=html.replace(/<header[\s\S]*?<\/header>/gi,'').replace(/<footer[\s\S]*?<\/footer>/gi,'').replace(/<nav[\s\S]*?<\/nav>/gi,'');
    const full=html.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'');r.heads=[...full.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map(x=>[+x[1],txt(x[2])]);
    r.allH1=[...html.matchAll(/<h1[^>]*>/gi)].length;
    const body=main.replace(/<script[\s\S]*?<\/script>/gi,'');
    r.words=txt(body).split(' ').filter(Boolean).length;
    const h1=/<h1[^>]*>[\s\S]*?<\/h1>/i.exec(main);const after=h1?main.slice(main.indexOf(h1[0])+h1[0].length):main;
    r.p1=([...after.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(x=>txt(x[1])).filter(t=>t.length>60)[0])||'';
    const links=[...main.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(x=>({h:dec(x[1]),t:txt(x[2]),tag:x[0].slice(0,x[0].indexOf('>')+1)}));
    r.int=[...new Set(links.filter(l=>l.h.startsWith('/')&&!l.h.startsWith('//')).map(l=>l.h.split('#')[0].split('?')[0]))].filter(Boolean);
    r.intAnchors=links.filter(l=>l.h.startsWith('/')).map(l=>l.t).filter(Boolean);
    r.ext=links.filter(l=>/^https?:\/\//.test(l.h)&&!/doctorsofwhisky\.com\.au/.test(l.h)).map(l=>({h:l.h,rel:attr(l.tag,'rel')||'',t:l.t}));
    r.navInt=[...new Set([...html.matchAll(/<a\s[^>]*href="(\/[^"#?]*)"/gi)].map(x=>x[1]))];
    r.imgs=[...main.matchAll(/<img\b[^>]*>/gi)].map(x=>({src:attr(x[0],'src')||'',alt:attr(x[0],'alt'),loading:attr(x[0],'loading'),w:attr(x[0],'width'),h:attr(x[0],'height')}));
    const ld=[...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(x=>{try{return JSON.parse(x[1])}catch(e){return null}}).filter(Boolean);
    const types=new Set();let faq=0;const walk=(o)=>{if(!o||typeof o!=='object')return;if(Array.isArray(o))return o.forEach(walk);const t=o['@type'];(Array.isArray(t)?t:[t]).filter(Boolean).forEach(x=>types.add(x));if(t==='FAQPage'&&Array.isArray(o.mainEntity))faq=Math.max(faq,o.mainEntity.length);Object.values(o).forEach(walk)};ld.forEach(walk);
    r.ld=[...types];r.faq=faq;
    r.toc=r.heads.some(h=>/table of contents/i.test(h[1]));
    r.updated=/Updated\s+\d{1,2}\s+\w+\s+20\d\d/.test(txt(full));
    r.related=(/aria-label="Related searches[^"]*"[\s\S]*?<\/section>/i.exec(main)||[''])[0].split('<li').length-1;
    r.relatedTexts=[...(/aria-label="(?:Related searches|Popular whisky searches)[^"]*"[\s\S]*?<\/section>/i.exec(main)||[''])[0].matchAll(/<a [^>]*>([\s\S]*?)<\/a>/gi)].map(x=>txt(x[1]));
    r.tags=(/aria-label="Popular searches and tags"[\s\S]*?<\/section>/i.exec(main)||[''])[0].split('<li').length-1;
  }catch(e){r.err=String(e.message||e)}
  return r;
}
(async()=>{
  const pages=data.pages;const out=[];let i=0;
  const worker=async()=>{while(i<pages.length){const p=pages[i++];out.push(await one(p));if(i%100===0)console.log(i)}};
  await Promise.all(Array.from({length:8},worker));
  fs.writeFileSync(D+'onpage.json',JSON.stringify(out));console.log('done',out.length);
})();
