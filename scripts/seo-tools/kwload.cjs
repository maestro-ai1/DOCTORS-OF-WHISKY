// Loads the site's TypeScript data modules (no Next.js needed) so keyword usage can be read straight from the source of truth.
const ts=require('../../node_modules/typescript');const fs=require('fs');const path=require('path');const vm=require('vm');
const ROOT=path.resolve(__dirname,'..','..');const cache={};
function resolve(spec,from){let p=spec.startsWith('@/')?path.join(ROOT,spec.slice(2)):path.resolve(path.dirname(from),spec);for(const e of ['.ts','.tsx','/index.ts','.js','.json'])if(fs.existsSync(p+e))return p+e;if(fs.existsSync(p))return p;return null;}
function load(file){if(cache[file])return cache[file].exports;const src=fs.readFileSync(file,'utf8');
 const out=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 const m={exports:{}};cache[file]=m;
 const req=(s)=>{const r=(s.startsWith('.')||s.startsWith('@/'))?resolve(s,file):null;if(r&&!r.endsWith('.json'))return load(r);if(r)return JSON.parse(fs.readFileSync(r,'utf8'));try{return require(s)}catch(e){return new Proxy({},{get:()=>()=>null})}};
 vm.runInNewContext(out,{module:m,exports:m.exports,require:req,console,process,__dirname:path.dirname(file)},{filename:file});return m.exports;}
module.exports=(rel)=>load(path.join(ROOT,rel));
