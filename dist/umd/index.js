!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.bdfparser=e():t.bdfparser=e()}(this,(()=>(()=>{"use strict";var t={206:function(t,e){var n=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,s){function o(t){try{l(r.next(t))}catch(t){s(t)}}function a(t){try{l(r.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,a)}l((r=r.apply(t,e||[])).next())}))},r=this&&this.__asyncValues||function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t="function"==typeof __values?__values(t):t[Symbol.iterator](),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise((function(r,i){!function(t,e,n,r){Promise.resolve(r).then((function(e){t({value:e,done:n})}),e)}(r,i,(e=t[n](e)).done,e.value)}))}}};Object.defineProperty(e,"__esModule",{value:!0}),e.$Bitmap=e.$Glyph=e.$Font=e.Bitmap=e.Glyph=e.Font=void 0;const i="[\\s]+",s={glyphname:"empty",codepoint:8203,bbw:0,bbh:0,bbxoff:0,bbyoff:0,swx0:0,swy0:0,dwx0:0,dwy0:0,swx1:0,swy1:0,dwx1:0,dwy1:0,vvectorx:0,vvectory:0,hexdata:[]},o=["glyphname","codepoint","bbw","bbh","bbxoff","bbyoff","swx0","swy0","dwx0","dwy0","swx1","swy1","dwx1","dwy1","vvectorx","vvectory","hexdata"],a={lr:"lrtb",rl:"rltb",tb:"tbrl",bt:"btrl",lrtb:void 0,lrbt:void 0,rltb:void 0,rlbt:void 0,tbrl:void 0,tblr:void 0,btrl:void 0,btlr:void 0},l={lr:1,rl:2,tb:0,bt:-1};class h{constructor(){this.headers=void 0,this.__headers={},this.props={},this.glyphs=new Map,this.__glyph_count_to_check=null,this.__curline_startchar=null,this.__curline_chars=null}load_filelines(t){var e,i,s;return n(this,void 0,void 0,(function*(){try{this.__f=t,yield this.__parse_headers()}finally{if("undefined"!=typeof Deno&&void 0!==this.__f)try{for(var n,o=!0,a=r(this.__f);n=yield a.next(),!(e=n.done);)n.value,o=!1,o=!0}catch(t){i={error:t}}finally{try{o||e||!(s=a.return)||(yield s.call(a))}finally{if(i)throw i.error}}}return this}))}__parse_headers(){var t,e;return n(this,void 0,void 0,(function*(){for(;;){const n=null===(e=yield null===(t=this.__f)||void 0===t?void 0:t.next())||void 0===e?void 0:e.value,r=n.split(/ (.+)/,2),s=r.length;let o;if(2===s){const t=r[0],e=r[1].trim();switch(t){case"STARTFONT":this.__headers.bdfversion=parseFloat(e);break;case"FONT":this.__headers.fontname=e;break;case"SIZE":o=e.split(" "),this.__headers.pointsize=parseInt(o[0],10),this.__headers.xres=parseInt(o[1],10),this.__headers.yres=parseInt(o[2],10);break;case"FONTBOUNDINGBOX":o=e.split(" "),this.__headers.fbbx=parseInt(o[0],10),this.__headers.fbby=parseInt(o[1],10),this.__headers.fbbxoff=parseInt(o[2],10),this.__headers.fbbyoff=parseInt(o[3],10);break;case"STARTPROPERTIES":return this.__parse_headers_after(),void(yield this.__parse_props());case"COMMENT":"comment"in this.__headers&&Array.isArray(this.__headers.comment)||(this.__headers.comment=[]),this.__headers.comment.push(e.replace(/^[\s"'\t\r\n]+|[\s"'\t\r\n]+$/g,""));break;case"SWIDTH":o=e.split(" "),this.__headers.swx0=parseInt(o[0],10),this.__headers.swy0=parseInt(o[1],10);break;case"DWIDTH":o=e.split(" "),this.__headers.dwx0=parseInt(o[0],10),this.__headers.dwy0=parseInt(o[1],10);break;case"SWIDTH1":o=e.split(" "),this.__headers.swx1=parseInt(o[0],10),this.__headers.swy1=parseInt(o[1],10);break;case"DWIDTH1":o=e.split(" "),this.__headers.dwx1=parseInt(o[0],10),this.__headers.dwy1=parseInt(o[1],10);break;case"VVECTOR":o=i.split(e),this.__headers.vvectorx=parseInt(o[0],10),this.__headers.vvectory=parseInt(o[1],10);break;case"METRICSSET":case"CONTENTVERSION":this.__headers[t.toLowerCase()]=parseInt(e,10);break;case"CHARS":return console.warn("It looks like the font does not have property block beginning with 'STARTPROPERTIES' keyword"),this.__parse_headers_after(),this.__curline_chars=n,void(yield this.__parse_glyph_count());case"STARTCHAR":return console.warn("It looks like the font does not have property block beginning with 'STARTPROPERTIES' keyword"),console.warn("Cannot find 'CHARS' line"),this.__parse_headers_after(),this.__curline_startchar=n,void(yield this.__prepare_glyphs())}}if(1===s&&"ENDFONT"===r[0].trim())return console.warn("It looks like the font does not have property block beginning with 'STARTPROPERTIES' keyword"),void console.warn("This font does not have any glyphs")}}))}__parse_headers_after(){"metricsset"in this.__headers||(this.__headers.metricsset=0),this.headers=this.__headers}__parse_props(){var t,e;return n(this,void 0,void 0,(function*(){for(;;){const n=(null===(e=yield null===(t=this.__f)||void 0===t?void 0:t.next())||void 0===e?void 0:e.value).split(/ (.+)/,2),r=n.length;if(2===r){const t=n[0],e=n[1].replace(/^[\s"'\t\r\n]+|[\s"'\t\r\n]+$/g,"");"COMMENT"===t?("comment"in this.props&&Array.isArray(this.props.comment)||(this.props.comment=[]),this.props.comment.push(e.replace(/^[\s"'\t\r\n]+|[\s"'\t\r\n]+$/g,""))):this.props[t.toLowerCase()]=e}else if(1===r){const t=n[0].trim();if("ENDPROPERTIES"===t)return void(yield this.__parse_glyph_count());if("ENDFONT"===t)return void console.warn("This font does not have any glyphs");this.props[t]=null}}}))}__parse_glyph_count(){var t,e;return n(this,void 0,void 0,(function*(){let n;if(null===this.__curline_chars?n=null===(e=yield null===(t=this.__f)||void 0===t?void 0:t.next())||void 0===e?void 0:e.value:(n=this.__curline_chars,this.__curline_chars=null),"ENDFONT"===n.trim())return void console.warn("This font does not have any glyphs");const r=n.split(/ (.+)/,2);"CHARS"===r[0]?this.__glyph_count_to_check=parseInt(r[1].trim(),10):(this.__curline_startchar=n,console.warn("Cannot find 'CHARS' line next to 'ENDPROPERTIES' line")),yield this.__prepare_glyphs()}))}__prepare_glyphs(){var t,e;return n(this,void 0,void 0,(function*(){let n=0,r=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],s=[],o=!1,a=!1;for(;;){let l;if(null===this.__curline_startchar?l=null===(e=yield null===(t=this.__f)||void 0===t?void 0:t.next())||void 0===e?void 0:e.value:(l=this.__curline_startchar,this.__curline_startchar=null),null==l)return console.warn("This font does not have 'ENDFONT' keyword"),void this.__prepare_glyphs_after();const h=l.split(/ (.+)/,2),c=h.length;if(2===c){const t=h[0],e=h[1].trim();let s;switch(t){case"STARTCHAR":r=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],r[0]=e,a=!1;break;case"ENCODING":n=parseInt(e,10),r[1]=n;break;case"BBX":s=e.split(" "),r[2]=parseInt(s[0],10),r[3]=parseInt(s[1],10),r[4]=parseInt(s[2],10),r[5]=parseInt(s[3],10);break;case"SWIDTH":s=e.split(" "),r[6]=parseInt(s[0],10),r[7]=parseInt(s[1],10);break;case"DWIDTH":s=e.split(" "),r[8]=parseInt(s[0],10),r[9]=parseInt(s[1],10);break;case"SWIDTH1":s=e.split(" "),r[10]=parseInt(s[0],10),r[11]=parseInt(s[1],10);break;case"DWIDTH1":s=e.split(" "),r[12]=parseInt(s[0],10),r[13]=parseInt(s[1],10);break;case"VVECTOR":s=i.split(e),r[14]=parseInt(s[0],10),r[15]=parseInt(s[1],10)}}else if(1===c){const t=h[0].trim();switch(t){case"BITMAP":s=[],o=!0;break;case"ENDCHAR":o=!1,r[16]=s,this.glyphs.set(n,r),a=!0;break;case"ENDFONT":if(a)return void this.__prepare_glyphs_after();default:o&&s.push(t)}}}}))}__prepare_glyphs_after(){const t=this.glyphs.size;this.__glyph_count_to_check!==t&&(null===this.__glyph_count_to_check?console.warn("The glyph count next to 'CHARS' keyword does not exist"):console.warn(`The glyph count next to 'CHARS' keyword is ${this.__glyph_count_to_check.toString()}, which does not match the actual glyph count ${t.toString()}`))}get length(){return this.glyphs.size}itercps(t,e){const n=null!=t?t:1,r=null!=e?e:null;let i;const s=[...this.glyphs.keys()];switch(n){case 1:i=s.sort(((t,e)=>t-e));break;case 0:i=s;break;case 2:i=s.sort(((t,e)=>e-t));break;case-1:i=s.reverse()}if(null!==r){const t=t=>{if("number"==typeof r)return t<r;if(Array.isArray(r)&&2===r.length&&"number"==typeof r[0]&&"number"==typeof r[1])return t<=r[1]&&t>=r[0];if(Array.isArray(r)&&Array.isArray(r[0]))for(const e of r){const[n,r]=e;if(t<=r&&t>=n)return!0}return!1};i=i.filter(t)}return i}*iterglyphs(t,e){for(const n of this.itercps(t,e))yield this.glyphbycp(n)}glyphbycp(t){const e=this.glyphs.get(t);if(null==e)return console.warn(`Glyph "${String.fromCodePoint(t)}" (codepoint ${t.toString()}) does not exist in the font. Will return 'null'`),null;{const t={};return o.forEach(((n,r)=>{var i,s,o;i=t,s=n,o=e[r],i[s]=o})),new c(t,this)}}glyph(t){const e=t.codePointAt(0);return void 0===e?null:this.glyphbycp(e)}lacksglyphs(t){const e=[],n=t.length;for(let r,i=0;i<n;i++){r=t[i];const n=r.codePointAt(0);void 0!==n&&this.glyphs.has(n)||e.push(r)}return 0!==e.length?e:null}drawcps(t,e={}){var n,r,i,o,h,p,u,_;const f=null!==(n=e.linelimit)&&void 0!==n?n:512,b=null!==(r=e.mode)&&void 0!==r?r:1,y=null!==(i=e.direction)&&void 0!==i?i:"lrtb",g=null!==(o=e.usecurrentglyphspacing)&&void 0!==o&&o,v=null!==(h=e.missing)&&void 0!==h?h:null,w=null!==(p=e.bb)&&void 0!==p?p:null;if(void 0===this.headers)throw new Error("Font is not loaded");let m,I,x,S,k,T,E,$,A,R,O,P,N,D,F,C,j,H;const B=null!==(u=a[y])&&void 0!==u?u:y,M=B.slice(0,2),G=B.slice(2,4);M in l&&G in l?(T=l[M],E=l[G]):(T=1,E=0),0===E||2===E?m=1:1!==E&&-1!==E||(m=0),1===T||-1===T?I=1:2!==T&&0!==T||(I=0),1===b&&($=T>0?this.headers.fbbx:this.headers.fbby,T>0?(P="dwx0",N="dwy0"):(P="dwx1",N="dwy1"),O=P in this.headers?this.headers[P]:N in this.headers?this.headers[N]:null);const W=[];S=[];const V=[];F=[],C=0;const z=()=>{W.push(S),g?F.shift():F.pop(),V.push(F)},J=t[Symbol.iterator]();for(j=!1;;){if(j)j=!1;else{if(k=null===(_=J.next())||void 0===_?void 0:_.value,void 0===k)break;const t=this.glyphbycp(k);A=null!==t?t:v?v instanceof c?v:new c(v,this):new c(s,this),x=-1===b?A.draw(-1,w):A.draw(),H=x.width(),D=0,1===b&&void 0!==P&&void 0!==N&&(R=A.meta[P]||A.meta[N],null==R&&(R=O),null!=R&&void 0!==$&&(D=R-$))}if(void 0!==H&&void 0!==D&&void 0!==x&&void 0!==A&&void 0!==k)if(C+=H+D,C<=f)S.push(x),F.push(D);else{if(0===S.length)throw new Error(`\`_linelimit\` (${f}) is too small the line can't even contain one glyph: "${A.chr()}" (codepoint ${k}, width: ${H})`);z(),C=0,S=[],F=[],j=!0}}0!==S.length&&z();const L=W.map(((t,e)=>d.concatall(t,{direction:T,align:m,offsetlist:V[e]})));return d.concatall(L,{direction:E,align:I})}draw(t,e={}){const{linelimit:n,mode:r,direction:i,usecurrentglyphspacing:s,missing:o,bb:a}=e;return this.drawcps(t.split("").map((t=>{const e=t.codePointAt(0);return void 0===e?8203:e})),{linelimit:n,mode:r,direction:i,usecurrentglyphspacing:s,missing:o,bb:a})}drawall(t={}){const{order:e,r:n,linelimit:r,mode:i,direction:s,usecurrentglyphspacing:o}=t,a=null!=i?i:0;return this.drawcps(this.itercps(e,n),{linelimit:r,mode:a,direction:s,usecurrentglyphspacing:o})}}e.Font=h;class c{constructor(t,e){this.meta=t,this.font=e}toString(){return this.draw().toString()}repr(){var t;return"Glyph("+JSON.stringify(this.meta,null,2)+", Font(<"+(null===(t=this.font.headers)||void 0===t?void 0:t.fontname)+">)"}cp(){return this.meta.codepoint}chr(){return String.fromCodePoint(this.cp())}draw(t,e){const n=null!=e?e:null;let r;switch(null!=t?t:0){case 0:r=this.__draw_fbb();break;case 1:r=this.__draw_bb();break;case 2:r=this.__draw_original();break;case-1:if(null===n)throw new Error("Parameter bb in draw() method must be set when mode=-1");r=this.__draw_user_specified(n)}return r}__draw_user_specified(t){const e=this.meta.bbxoff,n=this.meta.bbyoff,[r,i,s,o]=t;return this.__draw_bb().crop(r,i,-e+s,-n+o)}__draw_original(){return new d(this.meta.hexdata.map((t=>t?parseInt(t,16).toString(2).padStart(4*t.length,"0"):"")))}__draw_bb(){const t=this.meta.bbw,e=this.meta.bbh,n=this.__draw_original(),r=n.bindata,i=r.length;return i!==e&&console.warn(`Glyph "${this.meta.glyphname.toString()}" (codepoint ${this.meta.codepoint.toString()})'s bbh, ${e.toString()}, does not match its hexdata line count, ${i.toString()}`),n.bindata=r.map((e=>e.slice(0,t))),n}__draw_fbb(){const t=this.font.headers;if(void 0===t)throw new Error("Font is not loaded");return this.__draw_user_specified([t.fbbx,t.fbby,t.fbbxoff,t.fbbyoff])}origin(t={}){var e,n,r,i;const s=null!==(e=t.mode)&&void 0!==e?e:0,o=null!==(n=t.fromorigin)&&void 0!==n&&n,a=null!==(r=t.xoff)&&void 0!==r?r:null,l=null!==(i=t.yoff)&&void 0!==i?i:null;let h;const c=this.meta.bbxoff,d=this.meta.bbyoff;switch(s){case 0:const t=this.font.headers;if(void 0===t)throw new Error("Font is not loaded");h=[t.fbbxoff,t.fbbyoff];break;case 1:case 2:h=[c,d];break;case-1:if(null===a||null===l)throw new Error("Parameter xoff and yoff in origin() method must be all set when mode=-1");h=[a,l]}return o?h:[0-h[0],0-h[1]]}}e.Glyph=c;class d{constructor(t){this.bindata=t}toString(){return this.bindata.join("\n").replace(/0/g,".").replace(/1/g,"#").replace(/2/g,"&")}repr(){return`Bitmap(${JSON.stringify(this.bindata,null,2)})`}width(){return this.bindata[0].length}height(){return this.bindata.length}clone(){return new d([...this.bindata])}static __crop_string(t,e,n){let r=t;const i=t.length;let s=0;e<0&&(s=0-e,r=r.padStart(s+i,"0")),e+n>i&&(r=r.padEnd(e+n-i+r.length,"0"));const o=e+s;return r.slice(o,o+n)}static __string_offset_concat(t,e,n){const r=null!=n?n:0;if(0===r)return t+e;const i=t.length,s=i+r,o=s+e.length,a=Math.min(0,s),l=Math.max(i,o),h=d.__crop_string(t,a,l-a),c=d.__crop_string(e,a-s,l-a);return h.split("").map(((t,e)=>(parseInt(c[e],10)||parseInt(t,10)).toString())).join("")}static __listofstr_offset_concat(t,e,n){const r=null!=n?n:0;let i,s;if(0===r)return t.concat(e);const o=t[0].length,a=t.length,l=a+r,h=l+e.length,c=Math.min(0,l),d=Math.max(a,h),p=[];for(let n=c;n<d;n++)i=n<0||n>=a?"0".repeat(o):t[n],s=n<l||n>=h?"0".repeat(o):e[n-l],p.push(i.split("").map(((t,e)=>(parseInt(s[e],10)||parseInt(t,10)).toString())).join(""));return p}static __crop_bitmap(t,e,n,r,i){let s;const o=[],a=t.length;for(let l=0;l<n;l++)s=a-i-n+l,s<0||s>=a?o.push("0".repeat(e)):o.push(d.__crop_string(t[s],r,e));return o}crop(t,e,n,r){const i=null!=n?n:0,s=null!=r?r:0;return this.bindata=d.__crop_bitmap(this.bindata,t,e,i,s),this}overlay(t){const e=this.bindata,n=t.bindata;return e.length!==n.length&&console.warn("the bitmaps to overlay have different height"),e[0].length!==n[0].length&&console.warn("the bitmaps to overlay have different width"),this.bindata=e.map(((t,e)=>{const r=t,i=n[e];return r.split("").map(((t,e)=>(parseInt(i[e],10)||parseInt(t,10)).toString())).join("")})),this}static concatall(t,e={}){var n,r,i;const s=null!==(n=e.direction)&&void 0!==n?n:1,o=null!==(r=e.align)&&void 0!==r?r:1,a=null!==(i=e.offsetlist)&&void 0!==i?i:null;let l,h,c,p,u,_,f;if(s>0){c=Math.max(...t.map((t=>t.height()))),u=Array(c).fill("");const e=(t,e,n)=>1===s?d.__string_offset_concat(t,e,n):d.__string_offset_concat(e,t,n);for(let n=0;n<c;n++){h=o?-n-1:n,p=0;const r=t.length;for(let i=0;i<r;i++){const r=t[i];a&&0!==i&&(p=a[i-1]),n<r.height()?h>=0?u[h]=e(u[h],r.bindata[h],p):u[c+h]=e(u[c+h],r.bindata[r.height()+h],p):h>=0?u[h]=e(u[h],"0".repeat(r.width()),p):u[c+h]=e(u[c+h],"0".repeat(r.width()),p)}}}else{c=Math.max(...t.map((t=>t.width()))),u=[],p=0;const e=t.length;for(let n=0;n<e;n++){const e=t[n];a&&0!==n&&(p=a[n-1]),l=e.bindata,_=e.width(),_!==c&&(f=o?0:_-c,l=this.__crop_bitmap(l,c,e.height(),f,0)),u=0===s?d.__listofstr_offset_concat(u,l,p):d.__listofstr_offset_concat(l,u,p)}}return new this(u)}concat(t,e={}){const{direction:n,align:r,offset:i}=e,s=null!=i?i:0;return this.bindata=d.concatall([this,t],{direction:n,align:r,offsetlist:[s]}).bindata,this}static __enlarge_bindata(t,e,n){const r=null!=e?e:1,i=null!=n?n:1;let s=[...t];return r>1&&(s=s.map((t=>t.split("").reduce(((t,e)=>t.concat(Array(r).fill(e))),[]).join("")))),i>1&&(s=s.reduce(((t,e)=>t.concat(Array(i).fill(e))),[])),s}enlarge(t,e){return this.bindata=d.__enlarge_bindata(this.bindata,t,e),this}replace(t,e){const n="number"==typeof t?t.toString():t,r="number"==typeof e?e.toString():e;return this.bindata=this.bindata.map((t=>((t,e,n)=>{if("replaceAll"in String.prototype)return t.replaceAll(e,n);{const r=t=>t.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&");return t.replace(new RegExp(r(e),"g"),n)}})(t,n,r))),this}shadow(t,e){const n=null!=t?t:1,r=null!=e?e:-1,i=this.clone(),s=this.width(),o=this.height();return i.bindata=i.bindata.map((t=>t.replace(/1/g,"2"))),this.crop(s,o,0,0),i.crop(s,o,-n,-r),i.overlay(this),this.bindata=i.bindata,this}glow(t){var e,n,r,i,s,o,a,l,h,c,d,p,u,_;const f=null!=t?t:0;let b,y,g,v;g=this.width(),v=this.height(),g+=2,v+=2,this.crop(g,v,-1,-1);const w=this.todata(2),m=w.length;for(let t=0;t<m;t++){b=w[t];const g=b.length;for(let v=0;v<g;v++)y=b[v],1===y&&((e=w[t])[n=v-1]||(e[n]=2),(r=w[t])[i=v+1]||(r[i]=2),(s=w[t-1])[v]||(s[v]=2),(o=w[t+1])[v]||(o[v]=2),1===f&&((a=w[t-1])[l=v-1]||(a[l]=2),(h=w[t-1])[c=v+1]||(h[c]=2),(d=w[t+1])[p=v-1]||(d[p]=2),(u=w[t+1])[_=v+1]||(u[_]=2)))}return this.bindata=w.map((t=>t.map((t=>t.toString())).join(""))),this}bytepad(t){const e=null!=t?t:8,n=this.width(),r=this.height(),i=n%e;return 0===i?this:this.crop(n+e-i,r)}todata(t){let e;switch(null!=t?t:1){case 0:e=this.bindata.join("\n");break;case 1:e=this.bindata;break;case 2:e=this.bindata.map((t=>t.split("").map((t=>parseInt(t,10)))));break;case 3:e=[].concat(...this.todata(2));break;case 4:e=this.bindata.map((t=>{if(!/^[01]+$/.test(t))throw new Error(`Invalid binary string: ${t}`);return parseInt(t,2).toString(16).padStart(-1*Math.floor(-1*this.width()/4),"0")}));break;case 5:e=this.bindata.map((t=>{if(!/^[01]+$/.test(t))throw new Error(`Invalid binary string: ${t}`);return parseInt(t,2)}))}return e}draw2canvas(t,e){const n=null!=e?e:{0:null,1:"black",2:"red"};return this.todata(2).forEach(((e,r)=>{e.forEach(((e,i)=>{const s=e.toString();if("0"===s||"1"===s||"2"===s){const e=n[s];null!=e&&(t.fillStyle=e,t.fillRect(i,r,1,1))}}))})),this}}e.Bitmap=d,e.$Font=t=>n(void 0,void 0,void 0,(function*(){return yield(new h).load_filelines(t)})),e.$Glyph=(t,e)=>new c(t,e),e.$Bitmap=t=>new d(t)}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r].call(s.exports,s,s.exports,n),s.exports}var r={};return(()=>{var t=r;Object.defineProperty(t,"__esModule",{value:!0}),t.$Bitmap=t.$Glyph=t.$Font=t.Bitmap=t.Glyph=t.Font=void 0;const e=n(206);Object.defineProperty(t,"Font",{enumerable:!0,get:function(){return e.Font}}),Object.defineProperty(t,"Glyph",{enumerable:!0,get:function(){return e.Glyph}}),Object.defineProperty(t,"Bitmap",{enumerable:!0,get:function(){return e.Bitmap}}),Object.defineProperty(t,"$Font",{enumerable:!0,get:function(){return e.$Font}}),Object.defineProperty(t,"$Glyph",{enumerable:!0,get:function(){return e.$Glyph}}),Object.defineProperty(t,"$Bitmap",{enumerable:!0,get:function(){return e.$Bitmap}})})(),r})()));