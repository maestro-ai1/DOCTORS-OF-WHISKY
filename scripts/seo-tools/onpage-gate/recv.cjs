const http=require('http'),fs=require('fs');
http.createServer((req,res)=>{
 res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Headers','*');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Access-Control-Allow-Private-Network','true');
 if(req.method==='OPTIONS'){res.writeHead(204);return res.end()}
 const m=/^\/(chunk|result)\/(\d+)/.exec(req.url);if(!m){res.writeHead(404);return res.end()}
 if(m[1]==='chunk'){try{res.writeHead(200,{'content-type':'text/plain'});res.end(fs.readFileSync(__dirname+'/req-'+m[2]+'.txt','utf8'))}catch(e){res.writeHead(404);res.end()}}
 else{let b='';req.on('data',d=>b+=d);req.on('end',()=>{fs.writeFileSync(__dirname+'/res-'+m[2]+'.txt',b);res.writeHead(200);res.end('ok')})}
}).listen(3199,'127.0.0.1',()=>console.log('up'));
