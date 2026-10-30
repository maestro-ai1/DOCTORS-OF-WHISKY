const fs=require('fs'),path=require('path');const sharp=require(process.cwd()+'/node_modules/sharp');
const root='public/images/products';const files=[];(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())w(p);else if(/\.(webp|avif|jpg|jpeg|png)$/i.test(e.name))files.push(p)}})(root);
(async()=>{const st={n:files.length,nonSquare:0,under1000:0,over150k:0,fmt:{},edgeNotWhite:0,sample:[]};let i=0;
const w=async()=>{while(i<files.length){const f=files[i++];try{const s=fs.statSync(f).size;const m=await sharp(f).metadata();st.fmt[m.format]=(st.fmt[m.format]||0)+1;
 if(m.width!==m.height){st.nonSquare++;if(st.sample.length<5)st.sample.push(f+' '+m.width+'x'+m.height)}
 if(m.width<1000)st.under1000++;if(s>150*1024)st.over150k++;
 if(i%4===0){const {data,info}=await sharp(f).resize(40,40,{fit:'fill'}).removeAlpha().raw().toBuffer({resolveWithObject:true});let sum=0,c=0;for(let x=0;x<40;x++)for(const y of [0,39]){const o=(y*40+x)*3;sum+=data[o]+data[o+1]+data[o+2];c+=3}for(let y=0;y<40;y++)for(const x of [0,39]){const o=(y*40+x)*3;sum+=data[o]+data[o+1]+data[o+2];c+=3}if(sum/c<245)st.edgeNotWhite++}
}catch(e){}}};
await Promise.all(Array.from({length:8},w));console.log(JSON.stringify(st));})();
