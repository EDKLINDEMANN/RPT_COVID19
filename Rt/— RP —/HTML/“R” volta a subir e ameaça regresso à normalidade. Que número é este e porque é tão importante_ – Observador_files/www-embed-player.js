(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var m;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
function p(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
function ba(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
var ca="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},da;
if("function"==typeof Object.setPrototypeOf)da=Object.setPrototypeOf;else{var ea;a:{var fa={a:!0},ha={};try{ha.__proto__=fa;ea=ha.a;break a}catch(a){}ea=!1}da=ea?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ia=da;
function q(a,b){a.prototype=ca(b.prototype);a.prototype.constructor=a;if(ia)ia(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.L=b.prototype}
var ja="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function la(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var ma=la(this);function u(a,b){if(b){for(var c=ma,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];f in c||(c[f]={});c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ja(c,d,{configurable:!0,writable:!0,value:f})}}
function na(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
u("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=na(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
u("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=na(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,h=Math.max(0,Math.min(c|0,d.length)),g=0;g<f&&h<e;)if(d[h++]!=b[g++])return!1;return g>=f}});
function oa(){oa=function(){};
ma.Symbol||(ma.Symbol=pa)}
function qa(a,b){this.f=a;ja(this,"description",{configurable:!0,writable:!0,value:b})}
qa.prototype.toString=function(){return this.f};
var pa=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new qa("jscomp_symbol_"+(c||"")+"_"+b++,c)}
var b=0;return a}();
function ra(){oa();var a=ma.Symbol.iterator;a||(a=ma.Symbol.iterator=ma.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&ja(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return sa(aa(this))}});
ra=function(){}}
function sa(a){ra();a={next:a};a[ma.Symbol.iterator]=function(){return this};
return a}
function v(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var ta="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)v(d,e)&&(a[e]=d[e])}return a};
u("Object.assign",function(a){return a||ta});
u("WeakMap",function(a){function b(k){this.f=(g+=Math.random()+1).toString();if(k){k=p(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!v(k,h)){var l=new c;ja(k,h,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(n){if(n instanceof c)return n;e(n);return l(n)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),n=new a([[k,2],[l,3]]);if(2!=n.get(k)||3!=n.get(l))return!1;n["delete"](k);n.set(l,4);return!n.has(k)&&4==n.get(l)}catch(r){return!1}}())return a;
var h="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var g=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!v(k,h))throw Error("WeakMap key fail: "+k);k[h][this.f]=l;return this};
b.prototype.get=function(k){return d(k)&&v(k,h)?k[h][this.f]:void 0};
b.prototype.has=function(k){return d(k)&&v(k,h)&&v(k[h],this.f)};
b.prototype["delete"]=function(k){return d(k)&&v(k,h)&&v(k[h],this.f)?delete k[h][this.f]:!1};
return b});
u("Map",function(a){function b(){var g={};return g.previous=g.next=g.head=g}
function c(g,k){var l=g.f;return sa(function(){if(l){for(;l.head!=g.f;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(g,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++h,f.set(k,l)):l="p_"+k;var n=g.g[l];if(n&&v(g.g,l))for(var r=0;r<n.length;r++){var w=n[r];if(k!==k&&w.key!==w.key||k===w.key)return{id:l,list:n,index:r,u:w}}return{id:l,list:n,index:-1,u:void 0}}
function e(g){this.g={};this.f=b();this.size=0;if(g){g=p(g);for(var k;!(k=g.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var g=Object.seal({x:4}),k=new a(p([[g,"s"]]));if("s"!=k.get(g)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),n=l.next();if(n.done||n.value[0]!=g||"s"!=n.value[1])return!1;n=l.next();return n.done||4!=n.value[0].x||"t"!=n.value[1]||!l.next().done?!1:!0}catch(r){return!1}}())return a;
ra();var f=new WeakMap;e.prototype.set=function(g,k){g=0===g?0:g;var l=d(this,g);l.list||(l.list=this.g[l.id]=[]);l.u?l.u.value=k:(l.u={next:this.f,previous:this.f.previous,head:this.f,key:g,value:k},l.list.push(l.u),this.f.previous.next=l.u,this.f.previous=l.u,this.size++);return this};
e.prototype["delete"]=function(g){g=d(this,g);return g.u&&g.list?(g.list.splice(g.index,1),g.list.length||delete this.g[g.id],g.u.previous.next=g.u.next,g.u.next.previous=g.u.previous,g.u.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.g={};this.f=this.f.previous=b();this.size=0};
e.prototype.has=function(g){return!!d(this,g).u};
e.prototype.get=function(g){return(g=d(this,g).u)&&g.value};
e.prototype.entries=function(){return c(this,function(g){return[g.key,g.value]})};
e.prototype.keys=function(){return c(this,function(g){return g.key})};
e.prototype.values=function(){return c(this,function(g){return g.value})};
e.prototype.forEach=function(g,k){for(var l=this.entries(),n;!(n=l.next()).done;)n=n.value,g.call(k,n[1],n[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var h=0;return e});
u("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)v(b,d)&&c.push([d,b[d]]);return c}});
u("Set",function(a){function b(c){this.f=new Map;if(c){c=p(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.f.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(p([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(h){return!1}}())return a;
ra();b.prototype.add=function(c){c=0===c?0:c;this.f.set(c,c);this.size=this.f.size;return this};
b.prototype["delete"]=function(c){c=this.f["delete"](c);this.size=this.f.size;return c};
b.prototype.clear=function(){this.f.clear();this.size=0};
b.prototype.has=function(c){return this.f.has(c)};
b.prototype.entries=function(){return this.f.entries()};
b.prototype.values=function(){return this.f.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.f.forEach(function(f){return c.call(d,f,f,e)})};
return b});
u("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==na(this,b,"includes").indexOf(b,c||0)}});
var ua=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);
e=ca(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}();
u("Reflect.construct",function(){return ua});
var x=this||self;function y(a,b,c){a=a.split(".");c=c||x;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
var va=/^[\w+/_-]+[=]{0,2}$/,wa=null;function xa(a){return(a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&va.test(a)?a:""}
function z(a,b){for(var c=a.split("."),d=b||x,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
function ya(){}
function za(a){a.ha=void 0;a.getInstance=function(){return a.ha?a.ha:a.ha=new a}}
function Aa(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function Ba(a){return"array"==Aa(a)}
function Ca(a){var b=Aa(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function A(a){return"function"==Aa(a)}
function Da(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Ea(a){return Object.prototype.hasOwnProperty.call(a,Fa)&&a[Fa]||(a[Fa]=++Ga)}
var Fa="closure_uid_"+(1E9*Math.random()>>>0),Ga=0;function Ha(a,b,c){return a.call.apply(a.bind,arguments)}
function Ia(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function B(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?B=Ha:B=Ia;return B.apply(null,arguments)}
function Ka(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
var C=Date.now||function(){return+new Date};
function La(a,b){y(a,b,void 0)}
function D(a,b){function c(){}
c.prototype=b.prototype;a.L=b.prototype;a.prototype=new c;a.prototype.constructor=a}
;function Ma(a,b){if(!a||/[?&]dsh=1(&|$)/.test(a))return null;if(/[?&]ae=1(&|$)/.test(a)){var c=/[?&]adurl=([^&]+)/.exec(a);if(!c)return null;var d=b?c.index:a.length;try{return{wa:a.slice(0,d)+"&act=1"+a.slice(d),ya:decodeURIComponent(c[1])}}catch(f){return null}}if(/[?&]ae=2(&|$)/.test(a)){c=a;d="";if(b){var e=a.indexOf("&adurl=");0<e&&(c=a.slice(0,e),d=a.slice(e))}return{wa:c+"&act=1"+d,ya:c+"&dct=1"+d}}return null}
;function E(a){if(Error.captureStackTrace)Error.captureStackTrace(this,E);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
D(E,Error);E.prototype.name="CustomError";function Na(a){var b=a.url,c=a.ub;this.j=!!a.ab;this.g=Ma(b,c);a=/[?&]dsh=1(&|$)/.test(b);this.h=!a&&/[?&]ae=1(&|$)/.test(b);this.i=!a&&/[?&]ae=2(&|$)/.test(b);this.f=/[?&]adurl=([^&]*)/.exec(b)}
;var Oa=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},F=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f="string"===typeof a?a.split(""):a,h=0;h<c;h++)if(h in f){var g=f[h];
b.call(void 0,g,h,a)&&(d[e++]=g)}return d},Qa=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e="string"===typeof a?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},Ra=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
F(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function Sa(a,b){a:{var c=a.length;for(var d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:"string"===typeof a?a.charAt(c):a[c]}
function Ta(a,b){var c=Oa(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
function Ua(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Va(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Ca(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var h=0;h<f;h++)a[e+h]=d[h]}else a.push(d)}}
;function Wa(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;function Xa(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function Ya(a,b){var c=Ca(b),d=c?b:arguments;for(c=c?0:1;c<d.length;c++){if(null==a)return;a=a[d[c]]}return a}
function Za(a){var b=$a,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function ab(a){for(var b in a)return!1;return!0}
function bb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function cb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function db(a){var b={},c;for(c in a)b[c]=a[c];return b}
function eb(a){var b=Aa(a);if("object"==b||"array"==b){if(A(a.clone))return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=eb(a[c]);return b}return a}
var fb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<fb.length;f++)c=fb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function hb(a,b){this.f=a===ib&&b||"";this.g=jb}
hb.prototype.K=!0;hb.prototype.J=function(){return this.f.toString()};
hb.prototype.ga=!0;hb.prototype.da=function(){return 1};
function kb(a){if(a instanceof hb&&a.constructor===hb&&a.g===jb)return a.f;Aa(a);return"type_error:TrustedResourceUrl"}
var jb={},ib={};var lb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function mb(a,b){if(b)a=a.replace(nb,"&amp;").replace(ob,"&lt;").replace(pb,"&gt;").replace(qb,"&quot;").replace(rb,"&#39;").replace(sb,"&#0;");else{if(!tb.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(nb,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ob,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(pb,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(qb,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(rb,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(sb,"&#0;"))}return a}
var nb=/&/g,ob=/</g,pb=/>/g,qb=/"/g,rb=/'/g,sb=/\x00/g,tb=/[\x00&<>"']/;function H(a,b){this.f=a===ub&&b||"";this.g=vb}
H.prototype.K=!0;H.prototype.J=function(){return this.f.toString()};
H.prototype.ga=!0;H.prototype.da=function(){return 1};
function wb(a){if(a instanceof H&&a.constructor===H&&a.g===vb)return a.f;Aa(a);return"type_error:SafeUrl"}
var xb=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;function yb(a){if(a instanceof H)return a;a="object"==typeof a&&a.K?a.J():String(a);xb.test(a)||(a="about:invalid#zClosurez");return new H(ub,a)}
var vb={},ub={};var zb;a:{var Ab=x.navigator;if(Ab){var Bb=Ab.userAgent;if(Bb){zb=Bb;break a}}zb=""}function I(a){return-1!=zb.indexOf(a)}
;function Cb(){this.f="";this.h=Db;this.g=null}
Cb.prototype.ga=!0;Cb.prototype.da=function(){return this.g};
Cb.prototype.K=!0;Cb.prototype.J=function(){return this.f.toString()};
var Db={};function Eb(a,b){var c=new Cb;c.f=a;c.g=b;return c}
;function Fb(a,b){var c=b instanceof H?b:yb(b);a.href=wb(c)}
function Gb(a,b){a.src=kb(b);var c;(c=a.ownerDocument&&a.ownerDocument.defaultView)&&c!=x?c=xa(c.document):(null===wa&&(wa=xa(x.document)),c=wa);c&&a.setAttribute("nonce",c)}
;function Ib(a){return a=mb(a,void 0)}
function Jb(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var Kb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function J(a){return a?decodeURI(a):a}
function K(a,b){return b.match(Kb)[a]||null}
function Lb(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)Lb(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function Mb(a){var b=[],c;for(c in a)Lb(c,a[c],b);return b.join("&")}
function Nb(a,b){var c=Mb(b);if(c){var d=a.indexOf("#");0>d&&(d=a.length);var e=a.indexOf("?");if(0>e||e>d){e=d;var f=""}else f=a.substring(e+1,d);d=[a.substr(0,e),f,a.substr(d)];e=d[1];d[1]=c?e?e+"&"+c:c:e;c=d[0]+(d[1]?"?"+d[1]:"")+d[2]}else c=a;return c}
var Ob=/#|$/;function Pb(a,b){var c=a.search(Ob);a:{var d=0;for(var e=b.length;0<=(d=a.indexOf(b,d))&&d<c;){var f=a.charCodeAt(d-1);if(38==f||63==f)if(f=a.charCodeAt(d+e),!f||61==f||38==f||35==f)break a;d+=e+1}d=-1}if(0>d)return null;e=a.indexOf("&",d);if(0>e||e>c)e=c;d+=b.length+1;return decodeURIComponent(a.substr(d,e-d).replace(/\+/g," "))}
;var Qb=I("Opera"),Rb=I("Trident")||I("MSIE"),Sb=I("Edge"),Tb=I("Gecko")&&!(-1!=zb.toLowerCase().indexOf("webkit")&&!I("Edge"))&&!(I("Trident")||I("MSIE"))&&!I("Edge"),Ub=-1!=zb.toLowerCase().indexOf("webkit")&&!I("Edge");function Vb(){var a=x.document;return a?a.documentMode:void 0}
var Wb;a:{var Xb="",Yb=function(){var a=zb;if(Tb)return/rv:([^\);]+)(\)|;)/.exec(a);if(Sb)return/Edge\/([\d\.]+)/.exec(a);if(Rb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Ub)return/WebKit\/(\S+)/.exec(a);if(Qb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
Yb&&(Xb=Yb?Yb[1]:"");if(Rb){var Zb=Vb();if(null!=Zb&&Zb>parseFloat(Xb)){Wb=String(Zb);break a}}Wb=Xb}var $b=Wb,ac;if(x.document&&Rb){var bc=Vb();ac=bc?bc:parseInt($b,10)||void 0}else ac=void 0;var cc=ac;var dc={},ec=null;var L=window;function fc(a){var b=z("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(f){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||x.$googDebugFname||b}catch(f){e="Not available",c=!0}return!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:(b=a.message,null==b&&(a.constructor&&
a.constructor instanceof Function?(a.constructor.name?b=a.constructor.name:(b=a.constructor,gc[b]?b=gc[b]:(b=String(b),gc[b]||(c=/function\s+([^\(]+)/m.exec(b),gc[b]=c?c[1]:"[Anonymous]"),b=gc[b])),b='Unknown Error of type "'+b+'"'):b="Unknown Error of unknown type"),{message:b,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:a.stack||"Not available"})}
var gc={};function hc(a){this.f=a||{cookie:""}}
m=hc.prototype;m.isEnabled=function(){return navigator.cookieEnabled};
m.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.wb;d=c.secure||!1;var f=c.domain||void 0;var h=c.path||void 0;var g=c.la}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===g&&(g=-1);c=f?";domain="+f:"";h=h?";path="+h:"";d=d?";secure":"";g=0>g?"":0==g?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(C()+1E3*g)).toUTCString();this.f.cookie=a+"="+b+c+h+g+d+(null!=e?";samesite="+e:
"")};
m.get=function(a,b){for(var c=a+"=",d=(this.f.cookie||"").split(";"),e=0,f;e<d.length;e++){f=lb(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
m.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{la:0,path:b,domain:c});return d};
m.isEmpty=function(){return!this.f.cookie};
m.clear=function(){for(var a=(this.f.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=lb(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var ic=new hc("undefined"==typeof document?null:document);var jc=!Rb||9<=Number(cc);function kc(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
m=kc.prototype;m.clone=function(){return new kc(this.x,this.y)};
m.equals=function(a){return a instanceof kc&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
m.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
m.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
m.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function lc(a,b){this.width=a;this.height=b}
m=lc.prototype;m.clone=function(){return new lc(this.width,this.height)};
m.aspectRatio=function(){return this.width/this.height};
m.isEmpty=function(){return!(this.width*this.height)};
m.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
m.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
m.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function mc(a){var b=document;return"string"===typeof a?b.getElementById(a):a}
function nc(a,b){Xa(b,function(c,d){c&&"object"==typeof c&&c.K&&(c=c.J());"style"==d?a.style.cssText=c:"class"==d?a.className=c:"for"==d?a.htmlFor=c:oc.hasOwnProperty(d)?a.setAttribute(oc[d],c):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,c):a[d]=c})}
var oc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function pc(a,b,c){var d=arguments,e=document,f=String(d[0]),h=d[1];if(!jc&&h&&(h.name||h.type)){f=["<",f];h.name&&f.push(' name="',Ib(h.name),'"');if(h.type){f.push(' type="',Ib(h.type),'"');var g={};gb(g,h);delete g.type;h=g}f.push(">");f=f.join("")}f=qc(e,f);h&&("string"===typeof h?f.className=h:Array.isArray(h)?f.className=h.join(" "):nc(f,h));2<d.length&&rc(e,f,d);return f}
function rc(a,b,c){function d(h){h&&b.appendChild("string"===typeof h?a.createTextNode(h):h)}
for(var e=2;e<c.length;e++){var f=c[e];!Ca(f)||Da(f)&&0<f.nodeType?d(f):F(sc(f)?Ua(f):f,d)}}
function qc(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
function sc(a){if(a&&"number"==typeof a.length){if(Da(a))return"function"==typeof a.item||"string"==typeof a.item;if(A(a))return"function"==typeof a.item}return!1}
function tc(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function uc(a){vc();return new hb(ib,a)}
var vc=ya;function wc(a){var b=xc;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function yc(){var a=[];wc(function(b){a.push(b)});
return a}
var xc={bb:"allow-forms",cb:"allow-modals",eb:"allow-orientation-lock",fb:"allow-pointer-lock",gb:"allow-popups",hb:"allow-popups-to-escape-sandbox",ib:"allow-presentation",jb:"allow-same-origin",kb:"allow-scripts",lb:"allow-top-navigation",mb:"allow-top-navigation-by-user-activation"},zc=Wa(function(){return yc()});
function Ac(){var a=qc(document,"IFRAME"),b={};F(zc(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
;function M(){this.g=this.g;this.C=this.C}
M.prototype.g=!1;M.prototype.dispose=function(){this.g||(this.g=!0,this.o())};
function Bc(a,b){a.g?b():(a.C||(a.C=[]),a.C.push(b))}
M.prototype.o=function(){if(this.C)for(;this.C.length;)this.C.shift()()};
function Cc(a){a&&"function"==typeof a.dispose&&a.dispose()}
function Dc(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];Ca(d)?Dc.apply(null,d):Cc(d)}}
;/*
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*/
function Ec(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var Fc=(new Date).getTime();function Gc(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a&&"chrome-untrusted"!==a&&"chrome"!==a&&"app"!==a)throw Error("Invalid URI scheme in origin: "+a);c="";
var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;function Hc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;n=l=0}
function b(r){for(var w=h,t=0;64>t;t+=4)w[t/4]=r[t]<<24|r[t+1]<<16|r[t+2]<<8|r[t+3];for(t=16;80>t;t++)r=w[t-3]^w[t-8]^w[t-14]^w[t-16],w[t]=(r<<1|r>>>31)&4294967295;r=e[0];var G=e[1],W=e[2],ka=e[3],Sc=e[4];for(t=0;80>t;t++){if(40>t)if(20>t){var Ja=ka^G&(W^ka);var Hb=1518500249}else Ja=G^W^ka,Hb=1859775393;else 60>t?(Ja=G&W|ka&(G|W),Hb=2400959708):(Ja=G^W^ka,Hb=3395469782);Ja=((r<<5|r>>>27)&4294967295)+Ja+Sc+Hb+w[t]&4294967295;Sc=ka;ka=W;W=(G<<30|G>>>2)&4294967295;G=r;r=Ja}e[0]=e[0]+r&4294967295;e[1]=
e[1]+G&4294967295;e[2]=e[2]+W&4294967295;e[3]=e[3]+ka&4294967295;e[4]=e[4]+Sc&4294967295}
function c(r,w){if("string"===typeof r){r=unescape(encodeURIComponent(r));for(var t=[],G=0,W=r.length;G<W;++G)t.push(r.charCodeAt(G));r=t}w||(w=r.length);t=0;if(0==l)for(;t+64<w;)b(r.slice(t,t+64)),t+=64,n+=64;for(;t<w;)if(f[l++]=r[t++],n++,64==l)for(l=0,b(f);t+64<w;)b(r.slice(t,t+64)),t+=64,n+=64}
function d(){var r=[],w=8*n;56>l?c(g,56-l):c(g,64-(l-56));for(var t=63;56<=t;t--)f[t]=w&255,w>>>=8;b(f);for(t=w=0;5>t;t++)for(var G=24;0<=G;G-=8)r[w++]=e[t]>>G&255;return r}
for(var e=[],f=[],h=[],g=[128],k=1;64>k;++k)g[k]=0;var l,n;a();return{reset:a,update:c,digest:d,xa:function(){for(var r=d(),w="",t=0;t<r.length;t++)w+="0123456789ABCDEF".charAt(Math.floor(r[t]/16))+"0123456789ABCDEF".charAt(r[t]%16);return w}}}
;function Ic(a,b,c){var d=[],e=[];if(1==(Ba(c)?2:1))return e=[b,a],F(d,function(g){e.push(g)}),Jc(e.join(" "));
var f=[],h=[];F(c,function(g){h.push(g.key);f.push(g.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];F(d,function(g){e.push(g)});
a=Jc(e.join(" "));a=[c,a];0==h.length||a.push(h.join(""));return a.join("_")}
function Jc(a){var b=Hc();b.update(a);return b.xa().toLowerCase()}
;function Kc(a){var b=Gc(String(x.location.href)),c;(c=x.__SAPISID||x.__APISID||x.__OVERRIDE_SID)?c=!0:(c=new hc(document),c=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID"),c=!!c);if(c&&(c=(b=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:"))?x.__SAPISID:x.__APISID,c||(c=new hc(document),c=c.get(b?"SAPISID":"APISID")||c.get("__Secure-3PAPISID")),c)){b=b?"SAPISIDHASH":"APISIDHASH";var d=String(x.location.href);return d&&c&&b?[b,Ic(Gc(d),c,a||null)].join(" "):null}return null}
;function Lc(){this.g=[];this.f=-1}
Lc.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.g[a]!=b&&(this.g[a]=b,this.f=-1)};
Lc.prototype.get=function(a){return!!this.g[a]};
function Mc(a){-1==a.f&&(a.f=Ra(a.g,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.f}
;function Nc(a,b){this.h=a;this.i=b;this.g=0;this.f=null}
Nc.prototype.get=function(){if(0<this.g){this.g--;var a=this.f;this.f=a.next;a.next=null}else a=this.h();return a};
function Oc(a,b){a.i(b);100>a.g&&(a.g++,b.next=a.f,a.f=b)}
;function Pc(a){x.setTimeout(function(){throw a;},0)}
var Qc;
function Rc(){var a=x.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!I("Presto")&&(a=function(){var e=qc(document,"IFRAME");e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var h="callImmediate"+Math.random(),g="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=B(function(k){if(("*"==g||k.origin==g)&&k.data==h)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(h,g)}}});
if("undefined"!==typeof a&&!I("Trident")&&!I("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.ka;c.ka=null;e()}};
return function(e){d.next={ka:e};d=d.next;b.port2.postMessage(0)}}return function(e){x.setTimeout(e,0)}}
;function Tc(){this.g=this.f=null}
var Vc=new Nc(function(){return new Uc},function(a){a.reset()});
Tc.prototype.add=function(a,b){var c=Vc.get();c.set(a,b);this.g?this.g.next=c:this.f=c;this.g=c};
Tc.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.g=null),a.next=null);return a};
function Uc(){this.next=this.scope=this.f=null}
Uc.prototype.set=function(a,b){this.f=a;this.scope=b;this.next=null};
Uc.prototype.reset=function(){this.next=this.scope=this.f=null};function Wc(a,b){Xc||Yc();Zc||(Xc(),Zc=!0);$c.add(a,b)}
var Xc;function Yc(){if(x.Promise&&x.Promise.resolve){var a=x.Promise.resolve(void 0);Xc=function(){a.then(ad)}}else Xc=function(){var b=ad;
!A(x.setImmediate)||x.Window&&x.Window.prototype&&!I("Edge")&&x.Window.prototype.setImmediate==x.setImmediate?(Qc||(Qc=Rc()),Qc(b)):x.setImmediate(b)}}
var Zc=!1,$c=new Tc;function ad(){for(var a;a=$c.remove();){try{a.f.call(a.scope)}catch(b){Pc(b)}Oc(Vc,a)}Zc=!1}
;function bd(){this.g=-1}
;function cd(){this.g=64;this.f=[];this.l=[];this.m=[];this.i=[];this.i[0]=128;for(var a=1;a<this.g;++a)this.i[a]=0;this.j=this.h=0;this.reset()}
D(cd,bd);cd.prototype.reset=function(){this.f[0]=1732584193;this.f[1]=4023233417;this.f[2]=2562383102;this.f[3]=271733878;this.f[4]=3285377520;this.j=this.h=0};
function dd(a,b,c){c||(c=0);var d=a.m;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.f[0];c=a.f[1];var h=a.f[2],g=a.f[3],k=a.f[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=g^c&(h^g);var l=1518500249}else f=c^h^g,l=1859775393;else 60>e?(f=c&h|g&(c|h),l=2400959708):
(f=c^h^g,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=g;g=h;h=(c<<30|c>>>2)&4294967295;c=b;b=f}a.f[0]=a.f[0]+b&4294967295;a.f[1]=a.f[1]+c&4294967295;a.f[2]=a.f[2]+h&4294967295;a.f[3]=a.f[3]+g&4294967295;a.f[4]=a.f[4]+k&4294967295}
cd.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.g,d=0,e=this.l,f=this.h;d<b;){if(0==f)for(;d<=c;)dd(this,a,d),d+=this.g;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.g){dd(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.g){dd(this,e);f=0;break}}this.h=f;this.j+=b}};
cd.prototype.digest=function(){var a=[],b=8*this.j;56>this.h?this.update(this.i,56-this.h):this.update(this.i,this.g-(this.h-56));for(var c=this.g-1;56<=c;c--)this.l[c]=b&255,b/=256;dd(this,this.l);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.f[c]>>d&255,++b;return a};function ed(a){return"string"==typeof a.className?a.className:a.getAttribute&&a.getAttribute("class")||""}
function fd(a,b){"string"==typeof a.className?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function gd(a,b){if(a.classList)var c=a.classList.contains(b);else c=a.classList?a.classList:ed(a).match(/\S+/g)||[],c=0<=Oa(c,b);return c}
function hd(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):gd(a,"inverted-hdpi")&&fd(a,Pa(a.classList?a.classList:ed(a).match(/\S+/g)||[],function(b){return"inverted-hdpi"!=b}).join(" "))}
;var id="StopIteration"in x?x.StopIteration:{message:"StopIteration",stack:""};function jd(){}
jd.prototype.next=function(){throw id;};
jd.prototype.D=function(){return this};
function kd(a){if(a instanceof jd)return a;if("function"==typeof a.D)return a.D(!1);if(Ca(a)){var b=0,c=new jd;c.next=function(){for(;;){if(b>=a.length)throw id;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function ld(a,b){if(Ca(a))try{F(a,b,void 0)}catch(c){if(c!==id)throw c;}else{a=kd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==id)throw c;}}}
function md(a){if(Ca(a))return Ua(a);a=kd(a);var b=[];ld(a,function(c){b.push(c)});
return b}
;function nd(a,b){this.h={};this.f=[];this.F=this.g=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof nd)for(c=od(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function od(a){pd(a);return a.f.concat()}
m=nd.prototype;m.equals=function(a,b){if(this===a)return!0;if(this.g!=a.g)return!1;var c=b||qd;pd(this);for(var d,e=0;d=this.f[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function qd(a,b){return a===b}
m.isEmpty=function(){return 0==this.g};
m.clear=function(){this.h={};this.F=this.g=this.f.length=0};
m.remove=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)?(delete this.h[a],this.g--,this.F++,this.f.length>2*this.g&&pd(this),!0):!1};
function pd(a){if(a.g!=a.f.length){for(var b=0,c=0;b<a.f.length;){var d=a.f[b];Object.prototype.hasOwnProperty.call(a.h,d)&&(a.f[c++]=d);b++}a.f.length=c}if(a.g!=a.f.length){var e={};for(c=b=0;b<a.f.length;)d=a.f[b],Object.prototype.hasOwnProperty.call(e,d)||(a.f[c++]=d,e[d]=1),b++;a.f.length=c}}
m.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.h,a)?this.h[a]:b};
m.set=function(a,b){Object.prototype.hasOwnProperty.call(this.h,a)||(this.g++,this.f.push(a),this.F++);this.h[a]=b};
m.forEach=function(a,b){for(var c=od(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
m.clone=function(){return new nd(this)};
m.D=function(a){pd(this);var b=0,c=this.F,d=this,e=new jd;e.next=function(){if(c!=d.F)throw Error("The map has changed since the iterator was created");if(b>=d.f.length)throw id;var f=d.f[b++];return a?f:d.h[f]};
return e};function rd(a){var b=[];sd(new td,a,b);return b.join("")}
function td(){}
function sd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),sd(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),ud(d,c),c.push(":"),sd(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":ud(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var vd={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},wd=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function ud(a,b){b.push('"',a.replace(wd,function(c){var d=vd[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).substr(1),vd[c]=d);return d}),'"')}
;function xd(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}}
;function N(a){this.f=0;this.m=void 0;this.i=this.g=this.h=null;this.j=this.l=!1;if(a!=ya)try{var b=this;a.call(void 0,function(c){yd(b,2,c)},function(c){yd(b,3,c)})}catch(c){yd(this,3,c)}}
function zd(){this.next=this.context=this.onRejected=this.g=this.f=null;this.h=!1}
zd.prototype.reset=function(){this.context=this.onRejected=this.g=this.f=null;this.h=!1};
var Ad=new Nc(function(){return new zd},function(a){a.reset()});
function Bd(a,b,c){var d=Ad.get();d.g=a;d.onRejected=b;d.context=c;return d}
function Cd(a){return new N(function(b,c){c(a)})}
N.prototype.then=function(a,b,c){return Dd(this,A(a)?a:null,A(b)?b:null,c)};
N.prototype.$goog_Thenable=!0;function Ed(a,b){return Dd(a,null,b,void 0)}
N.prototype.cancel=function(a){if(0==this.f){var b=new Fd(a);Wc(function(){Gd(this,b)},this)}};
function Gd(a,b){if(0==a.f)if(a.h){var c=a.h;if(c.g){for(var d=0,e=null,f=null,h=c.g;h&&(h.h||(d++,h.f==a&&(e=h),!(e&&1<d)));h=h.next)e||(f=h);e&&(0==c.f&&1==d?Gd(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):Hd(c),Id(c,e,3,b)))}a.h=null}else yd(a,3,b)}
function Jd(a,b){a.g||2!=a.f&&3!=a.f||Kd(a);a.i?a.i.next=b:a.g=b;a.i=b}
function Dd(a,b,c,d){var e=Bd(null,null,null);e.f=new N(function(f,h){e.g=b?function(g){try{var k=b.call(d,g);f(k)}catch(l){h(l)}}:f;
e.onRejected=c?function(g){try{var k=c.call(d,g);void 0===k&&g instanceof Fd?h(g):f(k)}catch(l){h(l)}}:h});
e.f.h=a;Jd(a,e);return e.f}
N.prototype.w=function(a){this.f=0;yd(this,2,a)};
N.prototype.B=function(a){this.f=0;yd(this,3,a)};
function yd(a,b,c){if(0==a.f){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.f=1;a:{var d=c,e=a.w,f=a.B;if(d instanceof N){Jd(d,Bd(e||ya,f||null,a));var h=!0}else if(xd(d))d.then(e,f,a),h=!0;else{if(Da(d))try{var g=d.then;if(A(g)){Ld(d,g,e,f,a);h=!0;break a}}catch(k){f.call(a,k);h=!0;break a}h=!1}}h||(a.m=c,a.f=b,a.h=null,Kd(a),3!=b||c instanceof Fd||Md(a,c))}}
function Ld(a,b,c,d,e){function f(k){g||(g=!0,d.call(e,k))}
function h(k){g||(g=!0,c.call(e,k))}
var g=!1;try{b.call(a,h,f)}catch(k){f(k)}}
function Kd(a){a.l||(a.l=!0,Wc(a.C,a))}
function Hd(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.i=null);return b}
N.prototype.C=function(){for(var a;a=Hd(this);)Id(this,a,this.f,this.m);this.l=!1};
function Id(a,b,c,d){if(3==c&&b.onRejected&&!b.h)for(;a&&a.j;a=a.h)a.j=!1;if(b.f)b.f.h=null,Nd(b,c,d);else try{b.h?b.g.call(b.context):Nd(b,c,d)}catch(e){Od.call(null,e)}Oc(Ad,b)}
function Nd(a,b,c){2==b?a.g.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function Md(a,b){a.j=!0;Wc(function(){a.j&&Od.call(null,b)})}
var Od=Pc;function Fd(a){E.call(this,a)}
D(Fd,E);Fd.prototype.name="cancel";function O(a){M.call(this);this.l=1;this.i=[];this.j=0;this.f=[];this.h={};this.m=!!a}
D(O,M);m=O.prototype;m.subscribe=function(a,b,c){var d=this.h[a];d||(d=this.h[a]=[]);var e=this.l;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.l=e+3;d.push(e);return e};
function Pd(a,b,c,d){if(b=a.h[b]){var e=a.f;(b=Sa(b,function(f){return e[f+1]==c&&e[f+2]==d}))&&a.N(b)}}
m.N=function(a){var b=this.f[a];if(b){var c=this.h[b];0!=this.j?(this.i.push(a),this.f[a+1]=ya):(c&&Ta(c,a),delete this.f[a],delete this.f[a+1],delete this.f[a+2])}return!!b};
m.M=function(a,b){var c=this.h[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.m)for(e=0;e<c.length;e++){var h=c[e];Qd(this.f[h+1],this.f[h+2],d)}else{this.j++;try{for(e=0,f=c.length;e<f;e++)h=c[e],this.f[h+1].apply(this.f[h+2],d)}finally{if(this.j--,0<this.i.length&&0==this.j)for(;c=this.i.pop();)this.N(c)}}return 0!=e}return!1};
function Qd(a,b,c){Wc(function(){a.apply(b,c)})}
m.clear=function(a){if(a){var b=this.h[a];b&&(F(b,this.N,this),delete this.h[a])}else this.f.length=0,this.h={}};
m.o=function(){O.L.o.call(this);this.clear();this.i.length=0};function Rd(a){this.f=a}
Rd.prototype.set=function(a,b){void 0===b?this.f.remove(a):this.f.set(a,rd(b))};
Rd.prototype.get=function(a){try{var b=this.f.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Rd.prototype.remove=function(a){this.f.remove(a)};function Sd(a){this.f=a}
D(Sd,Rd);function Td(a){this.data=a}
function Ud(a){return void 0===a||a instanceof Td?a:new Td(a)}
Sd.prototype.set=function(a,b){Sd.L.set.call(this,a,Ud(b))};
Sd.prototype.g=function(a){a=Sd.L.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Sd.prototype.get=function(a){if(a=this.g(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Vd(a){this.f=a}
D(Vd,Sd);Vd.prototype.set=function(a,b,c){if(b=Ud(b)){if(c){if(c<C()){Vd.prototype.remove.call(this,a);return}b.expiration=c}b.creation=C()}Vd.L.set.call(this,a,b)};
Vd.prototype.g=function(a){var b=Vd.L.g.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<C()||c&&c>C())Vd.prototype.remove.call(this,a);else return b}};function Wd(){}
;function Xd(){}
D(Xd,Wd);Xd.prototype.clear=function(){var a=md(this.D(!0)),b=this;F(a,function(c){b.remove(c)})};function Yd(a){this.f=a}
D(Yd,Xd);m=Yd.prototype;m.isAvailable=function(){if(!this.f)return!1;try{return this.f.setItem("__sak","1"),this.f.removeItem("__sak"),!0}catch(a){return!1}};
m.set=function(a,b){try{this.f.setItem(a,b)}catch(c){if(0==this.f.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
m.get=function(a){a=this.f.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.f.removeItem(a)};
m.D=function(a){var b=0,c=this.f,d=new jd;d.next=function(){if(b>=c.length)throw id;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
m.clear=function(){this.f.clear()};
m.key=function(a){return this.f.key(a)};function Zd(){var a=null;try{a=window.localStorage||null}catch(b){}this.f=a}
D(Zd,Yd);function $d(a,b){this.g=a;this.f=null;if(Rb&&!(9<=Number(cc))){ae||(ae=new nd);this.f=ae.get(a);this.f||(b?this.f=document.getElementById(b):(this.f=document.createElement("userdata"),this.f.addBehavior("#default#userData"),document.body.appendChild(this.f)),ae.set(a,this.f));try{this.f.load(this.g)}catch(c){this.f=null}}}
D($d,Xd);var be={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},ae=null;function ce(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return be[b]})}
m=$d.prototype;m.isAvailable=function(){return!!this.f};
m.set=function(a,b){this.f.setAttribute(ce(a),b);de(this)};
m.get=function(a){a=this.f.getAttribute(ce(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.f.removeAttribute(ce(a));de(this)};
m.D=function(a){var b=0,c=this.f.XMLDocument.documentElement.attributes,d=new jd;d.next=function(){if(b>=c.length)throw id;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
m.clear=function(){for(var a=this.f.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);de(this)};
function de(a){try{a.f.save(a.g)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function ee(a,b){this.g=a;this.f=b+"::"}
D(ee,Xd);ee.prototype.set=function(a,b){this.g.set(this.f+a,b)};
ee.prototype.get=function(a){return this.g.get(this.f+a)};
ee.prototype.remove=function(a){this.g.remove(this.f+a)};
ee.prototype.D=function(a){var b=this.g.D(!0),c=this,d=new jd;d.next=function(){for(var e=b.next();e.substr(0,c.f.length)!=c.f;)e=b.next();return a?e.substr(c.f.length):c.g.get(e)};
return d};function fe(a,b){1<b.length?a[b[0]]=b[1]:1===b.length&&Object.assign(a,b[0])}
;var ge=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};y("yt.config_",ge,void 0);function P(a){fe(ge,arguments)}
function Q(a,b){return a in ge?ge[a]:b}
function he(){return Q("PLAYER_CONFIG",{})}
function ie(a){var b=ge.EXPERIMENT_FLAGS;return b?b[a]:void 0}
;function je(){var a=ke;z("yt.ads.biscotti.getId_")||y("yt.ads.biscotti.getId_",a,void 0)}
function le(a){y("yt.ads.biscotti.lastId_",a,void 0)}
;var me=[];function ne(a){me.forEach(function(b){return b(a)})}
function oe(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){pe(b),ne(b)}}:a}
function pe(a){var b=z("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=Q("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0]),P("ERRORS",b))}
function qe(a){var b=z("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,void 0):(b=Q("ERRORS",[]),b.push([a,"WARNING",void 0,void 0,void 0]),P("ERRORS",b))}
;function re(a){a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length)try{var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),h=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?Ba(b[f])?Va(b[f],h):b[f]=[b[f],h]:b[f]=h}catch(k){if("q"!=e[0]){var g=Error("Error decoding URL component");g.params={key:e[0],value:e[1]};pe(g)}}}return b}
function se(a){var b=[];Xa(a,function(c,d){var e=encodeURIComponent(String(d)),f;Ba(c)?f=c:f=[c];F(f,function(h){""==h?b.push(e):b.push(e+"="+encodeURIComponent(String(h)))})});
return b.join("&")}
function te(a){"?"==a.charAt(0)&&(a=a.substr(1));return re(a)}
function ue(a,b){return ve(a,b||{},!0)}
function ve(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=te(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);return Nb(a,e)+d}
;function we(a){var b=xe;a=void 0===a?z("yt.ads.biscotti.lastId_")||"":a;b=Object.assign(ye(b),ze(b));b.ca_type="image";a&&(b.bid=a);return b}
function ye(a){var b={};b.dt=Fc;b.flash="0";a:{try{var c=a.f.top.location.href}catch(f){a=2;break a}a=c?c===a.g.location.href?0:1:2}b=(b.frm=a,b);b.u_tz=-(new Date).getTimezoneOffset();var d=void 0===d?L:d;try{var e=d.history.length}catch(f){e=0}b.u_his=e;b.u_java=!!L.navigator&&"unknown"!==typeof L.navigator.javaEnabled&&!!L.navigator.javaEnabled&&L.navigator.javaEnabled();L.screen&&(b.u_h=L.screen.height,b.u_w=L.screen.width,b.u_ah=L.screen.availHeight,b.u_aw=L.screen.availWidth,b.u_cd=L.screen.colorDepth);
L.navigator&&L.navigator.plugins&&(b.u_nplug=L.navigator.plugins.length);L.navigator&&L.navigator.mimeTypes&&(b.u_nmime=L.navigator.mimeTypes.length);return b}
function ze(a){var b=a.f;try{var c=b.screenX;var d=b.screenY}catch(r){}try{var e=b.outerWidth;var f=b.outerHeight}catch(r){}try{var h=b.innerWidth;var g=b.innerHeight}catch(r){}b=[b.screenLeft,b.screenTop,c,d,b.screen?b.screen.availWidth:void 0,b.screen?b.screen.availTop:void 0,e,f,h,g];c=a.f.top;try{var k=(c||window).document,l="CSS1Compat"==k.compatMode?k.documentElement:k.body;var n=(new lc(l.clientWidth,l.clientHeight)).round()}catch(r){n=new lc(-12245933,-12245933)}k=n;n={};l=new Lc;x.SVGElement&&
x.document.createElementNS&&l.set(0);c=Ac();c["allow-top-navigation-by-user-activation"]&&l.set(1);c["allow-popups-to-escape-sandbox"]&&l.set(2);x.crypto&&x.crypto.subtle&&l.set(3);x.TextDecoder&&x.TextEncoder&&l.set(4);l=Mc(l);n.bc=l;n.bih=k.height;n.biw=k.width;n.brdim=b.join();a=a.g;return n.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[a.visibilityState||a.webkitVisibilityState||a.mozVisibilityState||""]||0,n.wgl=!!L.WebGLRenderingContext,n}
var xe=new function(){var a=window.document;this.f=window;this.g=a};
y("yt.ads_.signals_.getAdSignalsString",function(a){return se(we(a))},void 0);C();function R(a){a=Ae(a);return"string"===typeof a&&"false"===a?!1:!!a}
function Be(a,b){var c=Ae(a);return void 0===c&&void 0!==b?b:Number(c||0)}
function Ae(a){var b=Q("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:Q("EXPERIMENT_FLAGS",{})[a]}
;var Ce=void 0!==XMLHttpRequest?function(){return new XMLHttpRequest}:void 0!==ActiveXObject?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function De(){if(!Ce)return null;var a=Ce();return"open"in a?a:null}
function Ee(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function S(a,b){A(a)&&(a=oe(a));return window.setTimeout(a,b)}
function T(a){window.clearTimeout(a)}
;var Fe={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},Ge="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" "),
He=!1;
function Ie(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=K(1,a),e=J(K(3,a));d&&e?(d=c,c=a.match(Kb),d=d.match(Kb),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?J(K(3,c))==e&&(Number(K(4,c))||null)==(Number(K(4,a))||null):!0;d=R("web_ajax_ignore_global_headers_if_set");for(var f in Fe)e=Q(Fe[f]),!e||!c&&!Je(a,f)||d&&void 0!==b[f]||(b[f]=e);if(c||Je(a,"X-YouTube-Utc-Offset"))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());(c||Je(a,"X-YouTube-Time-Zone"))&&(f="undefined"!=typeof Intl?
(new Intl.DateTimeFormat).resolvedOptions().timeZone:null)&&(b["X-YouTube-Time-Zone"]=f);if(c||Je(a,"X-YouTube-Ad-Signals"))b["X-YouTube-Ad-Signals"]=se(we(void 0));return b}
function Ke(a){var b=window.location.search,c=J(K(3,a)),d=J(K(5,a));d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=te(b),f={};F(Ge,function(h){e[h]&&(f[h]=e[h])});
return ve(a,f||{},!1)}
function Je(a,b){var c=Q("CORS_HEADER_WHITELIST")||{},d=J(K(3,a));return d?(c=c[d])?0<=Oa(c,b):!1:!0}
function Le(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=Me(a,b);var d=Ne(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(h){if(!e){e=!0;f&&T(f);var g=h.ok,k=function(l){l=l||{};var n=b.context||x;g?b.onSuccess&&b.onSuccess.call(n,l,h):b.onError&&b.onError.call(n,l,h);b.ia&&b.ia.call(n,l,h)};
"JSON"==(b.format||"JSON")&&(g||400<=h.status&&500>h.status)?h.json().then(k,function(){k(null)}):k(null)}});
b.oa&&0<b.timeout&&(f=S(function(){e||(e=!0,T(f),b.oa.call(b.context||x))},b.timeout))}else Oe(a,b)}
function Oe(a,b){var c=b.format||"JSON";a=Me(a,b);var d=Ne(a,b),e=!1,f,h=Pe(a,function(g){if(!e){e=!0;f&&T(f);var k=Ee(g),l=null,n=400<=g.status&&500>g.status,r=500<=g.status&&600>g.status;if(k||n||r)l=Qe(c,g,b.qb);if(k)a:if(g&&204==g.status)k=!0;else{switch(c){case "XML":k=0==parseInt(l&&l.return_code,10);break a;case "RAW":k=!0;break a}k=!!l}l=l||{};n=b.context||x;k?b.onSuccess&&b.onSuccess.call(n,g,l):b.onError&&b.onError.call(n,g,l);b.ia&&b.ia.call(n,g,l)}},b.method,d,b.headers,b.responseType,
b.withCredentials);
b.O&&0<b.timeout&&(f=S(function(){e||(e=!0,h.abort(),T(f),b.O.call(b.context||x,h))},b.timeout));
return h}
function Me(a,b){b.tb&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=Q("XSRF_FIELD_NAME",void 0),d=b.Za;d&&(d[c]&&delete d[c],a=ue(a,d));return a}
function Ne(a,b){var c=Q("XSRF_FIELD_NAME",void 0),d=Q("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.A,h=Q("XSRF_FIELD_NAME",void 0),g;b.headers&&(g=b.headers["Content-Type"]);b.sb||J(K(3,a))&&!b.withCredentials&&J(K(3,a))!=document.location.hostname||"POST"!=b.method||g&&"application/x-www-form-urlencoded"!=g||b.A&&b.A[h]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=te(e),gb(e,f),e=b.qa&&"JSON"==b.qa?JSON.stringify(e):Mb(e));f=e||f&&!ab(f);!He&&f&&"POST"!=b.method&&(He=!0,pe(Error("AJAX request with postData should use POST")));
return e}
function Qe(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=JSON.parse(a));break;case "XML":if(b=(b=b.responseXML)?Re(b):null)d={},F(b.getElementsByTagName("*"),function(e){d[e.tagName]=Se(e)})}c&&Te(d);
return d}
function Te(a){if(Da(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=Eb(a[b],null);a[c]=d}else Te(a[b])}}
function Re(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function Se(a){var b="";F(a.childNodes,function(c){b+=c.nodeValue});
return b}
function Pe(a,b,c,d,e,f,h){function g(){4==(k&&"readyState"in k?k.readyState:0)&&b&&oe(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=De();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",g,!1):k.onreadystatechange=g;R("debug_forward_web_query_parameters")&&(a=Ke(a));k.open(c,a,!0);f&&(k.responseType=f);h&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=Ie(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;var Ue={},Ve=0;
function We(a,b,c,d,e){e=void 0===e?"":e;a&&(c&&(c=zb,c=!(c&&0<=c.toLowerCase().indexOf("cobalt"))),c?a&&(a instanceof H||(a="object"==typeof a&&a.K?a.J():String(a),xb.test(a)||(a="about:invalid#zClosurez"),a=new H(ub,a)),b=wb(a),"about:invalid#zClosurez"===b?a="":(b instanceof Cb?a=b:(d="object"==typeof b,a=null,d&&b.ga&&(a=b.da()),b=mb(d&&b.K?b.J():String(b)),a=Eb(b,a)),a instanceof Cb&&a.constructor===Cb&&a.h===Db?a=a.f:(Aa(a),a="type_error:SafeHtml"),a=encodeURIComponent(String(rd(a.toString())))),/^[\s\xa0]*$/.test(a)||
(a=pc("IFRAME",{src:'javascript:"<body><img src=\\""+'+a+'+"\\"></body>"',style:"display:none"}),(9==a.nodeType?a:a.ownerDocument||a.document).body.appendChild(a))):e?Pe(a,b,"POST",e,d):Q("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)||d?Pe(a,b,"GET","",d):Xe(a,b)||Ye(a,b))}
function Xe(a,b){if(!ie("web_use_beacon_api_for_ad_click_server_pings"))return!1;if(ie("use_sonic_js_library_for_v4_support")){a:{try{var c=new Na({url:a,ab:!0});if(c.j?c.h&&c.f&&c.f[1]||c.i:c.g){var d=J(K(5,a));var e=!(!d||!d.endsWith("/aclk")||"1"!==Pb(a,"ri"));break a}}catch(f){}e=!1}if(!e)return!1}else if(e=J(K(5,a)),!e||-1==e.indexOf("/aclk")||"1"!==Pb(a,"ae")||"1"!==Pb(a,"act"))return!1;return Ze(a)?(b&&b(),!0):!1}
function Ze(a,b){try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,void 0===b?"":b))return!0}catch(c){}return!1}
function Ye(a,b){var c=new Image,d=""+Ve++;Ue[d]=c;c.onload=c.onerror=function(){b&&Ue[d]&&b();delete Ue[d]};
c.src=a}
;var $e=z("ytPubsubPubsubInstance")||new O;O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.N;O.prototype.publish=O.prototype.M;O.prototype.clear=O.prototype.clear;y("ytPubsubPubsubInstance",$e,void 0);var af=z("ytPubsubPubsubSubscribedKeys")||{};y("ytPubsubPubsubSubscribedKeys",af,void 0);var bf=z("ytPubsubPubsubTopicToKeys")||{};y("ytPubsubPubsubTopicToKeys",bf,void 0);var cf=z("ytPubsubPubsubIsSynchronous")||{};y("ytPubsubPubsubIsSynchronous",cf,void 0);
function df(a,b){var c=ef();if(c){var d=c.subscribe(a,function(){var e=arguments;var f=function(){af[d]&&b.apply&&"function"==typeof b.apply&&b.apply(window,e)};
try{cf[a]?f():S(f,0)}catch(h){pe(h)}},void 0);
af[d]=!0;bf[a]||(bf[a]=[]);bf[a].push(d);return d}return 0}
function ff(a){var b=ef();b&&("number"===typeof a?a=[a]:"string"===typeof a&&(a=[parseInt(a,10)]),F(a,function(c){b.unsubscribeByKey(c);delete af[c]}))}
function gf(a,b){var c=ef();c&&c.publish.apply(c,arguments)}
function hf(a){var b=ef();if(b)if(b.clear(a),a)jf(a);else for(var c in bf)jf(c)}
function ef(){return z("ytPubsubPubsubInstance")}
function jf(a){bf[a]&&(a=bf[a],F(a,function(b){af[b]&&delete af[b]}),a.length=0)}
;var kf=window,U=kf.ytcsi&&kf.ytcsi.now?kf.ytcsi.now:kf.performance&&kf.performance.timing&&kf.performance.now&&kf.performance.timing.navigationStart?function(){return kf.performance.timing.navigationStart+kf.performance.now()}:function(){return(new Date).getTime()};var lf=Be("initial_gel_batch_timeout",1E3),mf=Math.pow(2,16)-1,nf=null,of=0,pf=void 0,qf=0,rf=0,sf=0,tf=!0,uf=z("ytLoggingTransportLogPayloadsQueue_")||{};y("ytLoggingTransportLogPayloadsQueue_",uf,void 0);var vf=z("ytLoggingTransportGELQueue_")||new Map;y("ytLoggingTransportGELQueue_",vf,void 0);var wf=z("ytLoggingTransportTokensToCttTargetIds_")||{};y("ytLoggingTransportTokensToCttTargetIds_",wf,void 0);
function xf(){T(qf);T(rf);rf=0;pf&&pf.isReady()?(yf(vf),"log_event"in uf&&yf(Object.entries(uf.log_event)),vf.clear(),delete uf.log_event):zf()}
function zf(){R("web_gel_timeout_cap")&&!rf&&(rf=S(xf,6E4));T(qf);var a=Q("LOGGING_BATCH_TIMEOUT",Be("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&tf&&(a=lf);qf=S(xf,a)}
function yf(a){var b=pf,c=Math.round(U());a=p(a);for(var d=a.next();!d.done;d=a.next()){var e=p(d.value);d=e.next().value;var f=e.next().value;e=eb({context:Af(b.f||Bf())});e.events=f;(f=wf[d])&&Cf(e,d,f);delete wf[d];Df(e,c);Ef(b,"log_event",e,{retry:!0,onSuccess:function(){of=Math.round(U()-c)}});
tf=!1}}
function Df(a,b){a.requestTimeMs=String(b);R("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);var c=Q("EVENT_ID",void 0);if(c){var d=Q("BATCH_CLIENT_COUNTER",void 0)||0;!d&&R("web_client_counter_random_seed")&&(d=Math.floor(Math.random()*mf/2));d++;d>mf&&(d=1);P("BATCH_CLIENT_COUNTER",d);c={serializedEventId:c,clientCounter:String(d)};a.serializedClientEventId=c;nf&&of&&R("log_gel_rtt_web")&&(a.previousBatchInfo={serializedClientEventId:nf,roundtripMs:String(of)});nf=c;of=0}}
function Cf(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
;var Ff=Be("initial_gel_batch_timeout",1E3),Gf=Math.pow(2,16)-1,Hf=null,If=0,Jf={log_event:"events",log_interaction:"interactions"},Kf=new Set(["log_event"]),Lf={},Mf=0,Nf=0,Of=0,Pf=!0,V=z("ytLoggingTransportLogPayloadsQueue_")||{};y("ytLoggingTransportLogPayloadsQueue_",V,void 0);var Qf=z("ytLoggingTransportTokensToCttTargetIds_")||{};y("ytLoggingTransportTokensToCttTargetIds_",Qf,void 0);
function Rf(){if(R("use_typescript_transport"))xf();else if(T(Mf),T(Nf),Nf=0,!ab(V)){for(var a in V){var b=Lf[a];if(b&&b.isReady()){var c=void 0,d=a,e=Jf[d],f=Math.round(U());for(c in V[d]){var h=eb({context:Af(b.f||Bf())});h[e]=Sf(d,c);var g=Qf[c];if(g)a:{var k=h,l=c;if(g.videoId)var n="VIDEO";else if(g.playlistId)n="PLAYLIST";else break a;k.credentialTransferTokenTargetId=g;k.context=k.context||{};k.context.user=k.context.user||{};k.context.user.credentialTransferTokens=[{token:l,scope:n}]}delete Qf[c];
g=h;g.requestTimeMs=f;R("unsplit_gel_payloads_in_logs")&&(g.unsplitGelPayloadsInLogs=!0);if(n=Q("EVENT_ID",void 0))k=Q("BATCH_CLIENT_COUNTER",void 0)||0,!k&&R("web_client_counter_random_seed")&&(k=Math.floor(Math.random()*Gf/2)),k++,k>Gf&&(k=1),P("BATCH_CLIENT_COUNTER",k),n={serializedEventId:n,clientCounter:k},g.serializedClientEventId=n,Hf&&If&&R("log_gel_rtt_web")&&(g.previousBatchInfo={serializedClientEventId:Hf,roundtripMs:If}),Hf=n,If=0;Ef(b,d,h,{retry:Kf.has(d),onSuccess:Ka(Tf,U())})}delete V[a];
Pf=!1}}ab(V)||Uf()}}
function Uf(){R("web_gel_timeout_cap")&&!Nf&&(Nf=S(Rf,6E4));T(Mf);var a=Q("LOGGING_BATCH_TIMEOUT",Be("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&Pf&&(a=Ff);Mf=S(Rf,a)}
function Sf(a,b){b=void 0===b?"":b;V[a]=V[a]||{};V[a][b]=V[a][b]||[];return V[a][b]}
function Tf(a){If=Math.round(U()-a)}
;var Vf=0;y("ytDomDomGetNextId",z("ytDomDomGetNextId")||function(){return++Vf},void 0);var Wf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function Xf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in Wf||(this[b]=a[b]);var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==
this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.f=a.pageX;this.g=a.pageY}}catch(e){}}
function Yf(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.f=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.g=a.clientY+b}}
Xf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
Xf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
Xf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var $a=z("ytEventsEventsListeners")||{};y("ytEventsEventsListeners",$a,void 0);var Zf=z("ytEventsEventsCounter")||{count:0};y("ytEventsEventsCounter",Zf,void 0);
function $f(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return Za(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,h=Da(e[4])&&Da(d)&&cb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||h)})}
var ag=Wa(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function X(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=$f(a,b,c,d);if(e)return e;e=++Zf.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var h=f?function(g){g=new Xf(g);if(!tc(g.relatedTarget,function(k){return k==a}))return g.currentTarget=a,g.type=b,c.call(a,g)}:function(g){g=new Xf(g);
g.currentTarget=a;return c.call(a,g)};
h=oe(h);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),ag()||"boolean"===typeof d?a.addEventListener(b,h,d):a.addEventListener(b,h,!!d.capture)):a.attachEvent("on"+b,h);$a[e]=[a,b,c,h,d];return e}
function bg(a){a&&("string"==typeof a&&(a=[a]),F(a,function(b){if(b in $a){var c=$a[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?ag()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete $a[b]}}))}
;var cg=window.ytcsi&&window.ytcsi.now?window.ytcsi.now:window.performance&&window.performance.timing&&window.performance.now&&window.performance.timing.navigationStart?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};function dg(a){this.w=a;this.f=null;this.j=0;this.m=null;this.l=0;this.h=[];for(a=0;4>a;a++)this.h.push(0);this.i=0;this.G=X(window,"mousemove",B(this.H,this));a=B(this.B,this);A(a)&&(a=oe(a));this.I=window.setInterval(a,25)}
D(dg,M);dg.prototype.H=function(a){void 0===a.f&&Yf(a);var b=a.f;void 0===a.g&&Yf(a);this.f=new kc(b,a.g)};
dg.prototype.B=function(){if(this.f){var a=cg();if(0!=this.j){var b=this.m,c=this.f,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.j);this.h[this.i]=.5<Math.abs((d-this.l)/this.l)?1:0;for(c=b=0;4>c;c++)b+=this.h[c]||0;3<=b&&this.w();this.l=d}this.j=a;this.m=this.f;this.i=(this.i+1)%4}};
dg.prototype.o=function(){window.clearInterval(this.I);bg(this.G)};function eg(){}
function fg(a,b){return gg(a,1,b)}
;function hg(){}
q(hg,eg);function gg(a,b,c){isNaN(c)&&(c=void 0);var d=z("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):S(a,c||0)}
hg.prototype.start=function(){var a=z("yt.scheduler.instance.start");a&&a()};
hg.prototype.pause=function(){var a=z("yt.scheduler.instance.pause");a&&a()};
za(hg);hg.getInstance();var ig={};
function jg(a){var b=void 0===a?{}:a;a=void 0===b.Da?!0:b.Da;b=void 0===b.Oa?!1:b.Oa;if(null==z("_lact",window)){var c=parseInt(Q("LACT"),10);c=isFinite(c)?C()-Math.max(c,0):-1;y("_lact",c,window);y("_fact",c,window);-1==c&&kg();X(document,"keydown",kg);X(document,"keyup",kg);X(document,"mousedown",kg);X(document,"mouseup",kg);a&&(b?X(window,"touchmove",function(){lg("touchmove",200)},{passive:!0}):(X(window,"resize",function(){lg("resize",200)}),X(window,"scroll",function(){lg("scroll",200)})));
new dg(function(){lg("mouse",100)});
X(document,"touchstart",kg,{passive:!0});X(document,"touchend",kg,{passive:!0})}}
function lg(a,b){ig[a]||(ig[a]=!0,fg(function(){kg();ig[a]=!1},b))}
function kg(){null==z("_lact",window)&&jg();var a=C();y("_lact",a,window);-1==z("_fact",window)&&y("_fact",a,window);(a=z("ytglobal.ytUtilActivityCallback_"))&&a()}
function mg(){var a=z("_lact",window);return null==a?-1:Math.max(C()-a,0)}
;var ng=z("ytLoggingGelSequenceIdObj_")||{};y("ytLoggingGelSequenceIdObj_",ng,void 0);
function og(a,b,c,d){d=void 0===d?{}:d;var e={};e.eventTimeMs=Math.round(d.timestamp||U());e[a]=b;e.context={lastActivityMs:String(d.timestamp?-1:mg())};R("log_sequence_info_on_gel_web")&&d.P&&(a=e.context,b=d.P,ng[b]=b in ng?ng[b]+1:0,a.sequence={index:ng[b],groupKey:b},d.rb&&delete ng[d.P]);d=d.ca;R("use_typescript_transport")?(a="",d&&(a={},d.videoId?a.videoId=d.videoId:d.playlistId&&(a.playlistId=d.playlistId),wf[d.token]=a,a=d.token),d=vf.get(a)||[],vf.set(a,d),d.push(e),c&&(pf=new c),c=Be("web_logging_max_batch")||
100,e=U(),d.length>=c?xf():10<=e-sf&&(zf(),sf=e)):(d?(a={},d.videoId?a.videoId=d.videoId:d.playlistId&&(a.playlistId=d.playlistId),Qf[d.token]=a,d=Sf("log_event",d.token)):d=Sf("log_event"),d.push(e),c&&(Lf.log_event=new c),c=Be("web_logging_max_batch")||100,e=U(),d.length>=c?Rf():10<=e-Of&&(Uf(),Of=e))}
;function pg(){for(var a={},b=p(Object.entries(te(Q("DEVICE","")))),c=b.next();!c.done;c=b.next()){var d=p(c.value);c=d.next().value;d=d.next().value;"cbrand"===c?a.deviceMake=d:"cmodel"===c?a.deviceModel=d:"cbr"===c?a.browserName=d:"cbrver"===c?a.browserVersion=d:"cos"===c?a.osName=d:"cosver"===c?a.osVersion=d:"cplatform"===c&&(a.platform=d)}return a}
;function qg(){return"INNERTUBE_API_KEY"in ge&&"INNERTUBE_API_VERSION"in ge}
function Bf(){return{innertubeApiKey:Q("INNERTUBE_API_KEY",void 0),innertubeApiVersion:Q("INNERTUBE_API_VERSION",void 0),Ea:Q("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),Fa:Q("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:Q("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),Ha:Q("INNERTUBE_CONTEXT_HL",void 0),Ga:Q("INNERTUBE_CONTEXT_GL",void 0),Ia:Q("INNERTUBE_HOST_OVERRIDE",void 0)||"",Ja:!!Q("INNERTUBE_USE_THIRD_PARTY_AUTH",!1)}}
function Af(a){a={client:{hl:a.Ha,gl:a.Ga,clientName:a.Fa,clientVersion:a.innertubeContextClientVersion,configInfo:a.Ea}};var b=window.devicePixelRatio;b&&1!=b&&(a.client.screenDensityFloat=String(b));b=Q("EXPERIMENTS_TOKEN","");""!==b&&(a.client.experimentsToken=b);b=[];var c=Q("EXPERIMENTS_FORCED_FLAGS",{});for(d in c)b.push({key:d,value:String(c[d])});var d=Q("EXPERIMENT_FLAGS",{});for(var e in d)e.startsWith("force_")&&void 0===c[e]&&b.push({key:e,value:String(d[e])});0<b.length&&(a.request={internalExperimentFlags:b});
Q("DELEGATED_SESSION_ID")&&!R("pageid_as_header_web")&&(a.user={onBehalfOfUser:Q("DELEGATED_SESSION_ID")});R("enable_device_forwarding_from_xhr_client")&&(a.client=Object.assign(a.client,pg()));return a}
function rg(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||Q("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.ob||Q("AUTHORIZATION"))||(a?b="Bearer "+z("gapi.auth.getToken")().nb:b=Kc([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=Q("SESSION_INDEX",0),R("pageid_as_header_web")&&(d["X-Goog-PageId"]=Q("DELEGATED_SESSION_ID")));return d}
function sg(a){a=Object.assign({},a);delete a.Authorization;var b=Kc();if(b){var c=new cd;c.update(Q("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();c=3;Ca(b);void 0===c&&(c=0);if(!ec){ec={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var h=d.concat(e[f].split(""));dc[f]=h;for(var g=0;g<h.length;g++){var k=h[g];void 0===ec[k]&&(ec[k]=g)}}}c=dc[c];d=[];for(e=0;e<b.length;e+=3){var l=b[e],n=(f=e+1<b.length)?
b[e+1]:0;k=(h=e+2<b.length)?b[e+2]:0;g=l>>2;l=(l&3)<<4|n>>4;n=(n&15)<<2|k>>6;k&=63;h||(k=64,f||(n=64));d.push(c[g],c[l],c[n]||"",c[k]||"")}a.hash=d.join("")}return a}
;function tg(a,b,c,d){ic.set(""+a,b,{la:c,path:"/",domain:void 0===d?"youtube.com":d,secure:!1})}
;function ug(){var a=new Zd;(a=a.isAvailable()?new ee(a,"yt.innertube"):null)||(a=new $d("yt.innertube"),a=a.isAvailable()?a:null);this.f=a?new Vd(a):null;this.g=document.domain||window.location.hostname}
ug.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.f)try{this.f.set(a,b,C()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(rd(b))}catch(f){return}else e=escape(b);tg(a,e,c,this.g)};
ug.prototype.get=function(a,b){var c=void 0,d=!this.f;if(!d)try{c=this.f.get(a)}catch(e){d=!0}if(d&&(c=ic.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
ug.prototype.remove=function(a){this.f&&this.f.remove(a);var b=this.g;ic.remove(""+a,"/",void 0===b?"youtube.com":b)};var vg=new ug;function wg(a,b,c,d){if(d)return null;d=vg.get("nextId",!0)||1;var e=vg.get("requests",!0)||{};e[d]={method:a,request:b,authState:sg(c),requestTime:Math.round(U())};vg.set("nextId",d+1,86400,!0);vg.set("requests",e,86400,!0);return d}
function xg(a){var b=vg.get("requests",!0)||{};delete b[a];vg.set("requests",b,86400,!0)}
function yg(a){var b=vg.get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(U())-d.requestTime)){var e=d.authState,f=sg(rg(!1));cb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(U())),Ef(a,d.method,e,{}));delete b[c]}}vg.set("requests",b,86400,!0)}}
;function zg(a){var b=this;this.f=null;a?this.f=a:qg()&&(this.f=Bf());gg(function(){yg(b)},0,5E3)}
zg.prototype.isReady=function(){!this.f&&qg()&&(this.f=Bf());return!!this.f};
function Ef(a,b,c,d){!Q("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&qe(Error("Missing VISITOR_DATA when sending innertube request."));var e={headers:{"Content-Type":"application/json"},method:"POST",A:c,qa:"JSON",O:function(){d.O()},
oa:d.O,onSuccess:function(w,t){if(d.onSuccess)d.onSuccess(t)},
na:function(w){if(d.onSuccess)d.onSuccess(w)},
onError:function(w,t){if(d.onError)d.onError(t)},
vb:function(w){if(d.onError)d.onError(w)},
timeout:d.timeout,withCredentials:!0},f="",h=a.f.Ia;h&&(f=h);h=a.f.Ja||!1;var g=rg(h,f,d);Object.assign(e.headers,g);e.headers.Authorization&&!f&&(e.headers["x-origin"]=window.location.origin);var k=ue(""+f+("/youtubei/"+a.f.innertubeApiVersion+"/"+b),{alt:"json",key:a.f.innertubeApiKey}),l;if(d.retry&&R("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=f&&(l=wg(b,c,g,h))){var n=e.onSuccess,r=e.na;e.onSuccess=function(w,t){xg(l);n(w,t)};
c.na=function(w,t){xg(l);r(w,t)}}try{R("use_fetch_for_op_xhr")?Le(k,e):(e.method="POST",e.A||(e.A={}),Oe(k,e))}catch(w){if("InvalidAccessError"==w)l&&(xg(l),l=0),qe(Error("An extension is blocking network request."));
else throw w;}l&&gg(function(){yg(a)},0,5E3)}
;function Ag(a,b,c){c=void 0===c?{}:c;var d=zg;Q("ytLoggingEventsDefaultDisabled",!1)&&zg==zg&&(d=null);og(a,b,d,c)}
;function Bg(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d=Error.call(this,a);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.args=[].concat(c instanceof Array?c:ba(p(c)))}
q(Bg,Error);var Cg=new Set,Dg=0;function Eg(a){Fg(a,"WARNING")}
function Fg(a,b,c,d,e){e=void 0===e?{}:e;e.name=c||Q("INNERTUBE_CONTEXT_CLIENT_NAME",1);e.version=d||Q("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0);c=e||{};b=void 0===b?"ERROR":b;b=void 0===b?"ERROR":b;d=window&&window.yterr||!1;if(a&&d&&!(5<=Dg)&&(R("console_log_js_exceptions")&&(d=[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Error Params: "+JSON.stringify(a.params)),d.push("File name: "+a.fileName),d.push("Stacktrace: "+a.stack),window.console.log(d.join("\n"),
a)),0!==a.f)){d=a.g;e=a.columnNumber;if(a.args&&a.args.length)for(var f=0,h=0;h<a.args.length;h++){var g=a.args[h],k="params."+h;f+=k.length;if(g)if(Array.isArray(g))for(var l=c,n=0;n<g.length&&!(g[n]&&(f+=Gg(n,g[n],k,l),500<f));n++);else if("object"===typeof g)for(l in l=void 0,n=c,g){if(g[l]&&(f+=Gg(l,g[l],k,n),500<f))break}else c[k]=String(JSON.stringify(g)).substring(0,500),f+=c[k].length;else c[k]=String(JSON.stringify(g)).substring(0,500),f+=c[k].length;if(500<=f)break}else if(a.hasOwnProperty("params"))if(g=
a.params,"object"===typeof a.params)for(h in k=0,g){if(g[h]&&(f="params."+h,l=String(JSON.stringify(g[h])).substr(0,500),c[f]=l,k+=f.length+l.length,500<k))break}else c.params=String(JSON.stringify(g)).substr(0,500);a=fc(a);(d=d||a.stack)||(d="Not available");g={stackTrace:d};a.fileName&&(g.filename=a.fileName);h=a.lineNumber.toString();isNaN(h)||!e||isNaN(e)||(g.lineNumber=Number(h),g.columnNumber=Number(e),h=h+":"+e);window.yterr&&A(window.yterr)&&(a.params=c,window.yterr(a));if(!(Cg.has(a.message)||
0<=d.indexOf("/YouTubeCenter.js")||0<=d.indexOf("/mytube.js"))){if(R("kevlar_gel_error_routing")){k=b;e={level:"ERROR_LEVEL_UNKNOWN",message:a.message};"ERROR"===k?e.level="ERROR_LEVEL_ERROR":"WARNING"===k&&(e.level="ERROR_LEVEL_WARNNING");g={isObfuscated:!0,browserStackInfo:g};k={pageUrl:window.location.href,kvPairs:[]};f=p(Object.keys(c));for(l=f.next();!l.done;l=f.next())l=l.value,k.kvPairs.push({key:"client."+l,value:String(c[l])});Ag("clientError",{errorMetadata:k,stackTrace:g,logMessage:e});
Rf()}b={Za:{a:"logerror",t:"jserror",type:a.name,msg:a.message.substr(0,250),line:h,level:b,"client.name":c.name},A:{url:Q("PAGE_NAME",window.location.href),file:a.fileName},method:"POST"};c.version&&(b["client.version"]=c.version);if(b.A){d&&(b.A.stack=d);d=p(Object.keys(c));for(e=d.next();!e.done;e=d.next())e=e.value,b.A["client."+e]=c[e];if(c=Q("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(d=p(Object.keys(c)),e=d.next();!e.done;e=d.next())e=e.value,b.A[e]=c[e];c=Q("SERVER_NAME",void 0);
d=Q("SERVER_VERSION",void 0);c&&d&&(b.A["server.name"]=c,b.A["server.version"]=d)}Oe(Q("ECATCHER_REPORT_HOST","")+"/error_204",b);Cg.add(a.message);Dg++}}}
function Gg(a,b,c,d){c+="."+a;a=String(JSON.stringify(b)).substr(0,500);d[c]=a;return c.length+a.length}
;function Hg(a,b,c,d,e,f){Fg(a,void 0===b?"ERROR":b,c,d,f)}
;var Ig=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};y("yt.msgs_",Ig,void 0);function Jg(a){fe(Ig,arguments)}
;function Kg(a){a&&(a.dataset?a.dataset[Lg("loaded")]="true":a.setAttribute("data-loaded","true"))}
function Mg(a,b){return a?a.dataset?a.dataset[Lg(b)]:a.getAttribute("data-"+b):null}
var Ng={};function Lg(a){return Ng[a]||(Ng[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var Og=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,Pg=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Qg(a,b,c){c=void 0===c?null:c;if(window.spf&&spf.script){c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(Og,""),c=c.replace(Pg,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Rg(a,b,c)}
function Rg(a,b,c){c=void 0===c?null:c;var d=Sg(a),e=document.getElementById(d),f=e&&Mg(e,"loaded"),h=e&&!f;f?b&&b():(b&&(f=df(d,b),b=""+Ea(b),Tg[b]=f),h||(e=Ug(a,d,function(){Mg(e,"loaded")||(Kg(e),gf(d),S(Ka(hf,d),0))},c)))}
function Ug(a,b,c,d){d=void 0===d?null:d;var e=qc(document,"SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);Gb(e,uc(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function Vg(a){a=Sg(a);var b=document.getElementById(a);b&&(hf(a),b.parentNode.removeChild(b))}
function Wg(a,b){if(a&&b){var c=""+Ea(b);(c=Tg[c])&&ff(c)}}
function Sg(a){var b=document.createElement("a");Fb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Jb(a)}
var Tg={};var Xg=[],Yg=!1;function Zg(){if("1"!=Ya(he(),"args","privembed")){var a=function(){Yg=!0;"google_ad_status"in window?P("DCLKSTAT",1):P("DCLKSTAT",2)};
Qg("//static.doubleclick.net/instream/ad_status.js",a);Xg.push(fg(function(){Yg||"google_ad_status"in window||(Wg("//static.doubleclick.net/instream/ad_status.js",a),Yg=!0,P("DCLKSTAT",3))},5E3))}}
function $g(){return parseInt(Q("DCLKSTAT",0),10)}
;function ah(){this.g=!1;this.f=null}
ah.prototype.initialize=function(a,b,c,d,e,f){var h=this;f=void 0===f?!1:f;b?(this.g=!0,Qg(b,function(){h.g=!1;window.botguard?bh(h,c,d,f):(Vg(b),Eg(new Bg("Unable to load Botguard","from "+b)))},e)):a&&(eval(a),window.botguard?bh(this,c,d,f):Eg(Error("Unable to load Botguard from JS")))};
function bh(a,b,c,d){if(d)try{a.f=new window.botguard.bg(b,c?function(){return c(b)}:ya)}catch(e){Eg(e)}else{try{a.f=new window.botguard.bg(b)}catch(e){Eg(e)}c&&c(b)}}
ah.prototype.dispose=function(){this.f=null};var ch=new ah,dh=!1,eh=0,fh="";function gh(a){R("botguard_periodic_refresh")?eh=U():R("botguard_always_refresh")&&(fh=a)}
function hh(a){if(a){if(ch.g)return!1;if(R("botguard_periodic_refresh"))return 72E5<U()-eh;if(R("botguard_always_refresh"))return fh!=a}else return!1;return!dh}
function ih(){return!!ch.f}
function jh(a){a=void 0===a?{}:a;a=void 0===a?{}:a;return ch.f?ch.f.invoke(void 0,void 0,a):null}
;var kh=C().toString();
function lh(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;16>a;a++){b=C();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(256*Math.random())}if(kh)for(a=1,b=0;b<kh.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^kh.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var mh=z("ytLoggingDocDocumentNonce_")||lh();y("ytLoggingDocDocumentNonce_",mh,void 0);var nh=1;function oh(a){this.f=a}
function ph(a){var b={};void 0!==a.f.trackingParams?b.trackingParams=a.f.trackingParams:(b.veType=a.f.veType,void 0!==a.f.veCounter&&(b.veCounter=a.f.veCounter),void 0!==a.f.elementIndex&&(b.elementIndex=a.f.elementIndex));void 0!==a.f.dataElement&&(b.dataElement=ph(a.f.dataElement));void 0!==a.f.youtubeData&&(b.youtubeData=a.f.youtubeData);return b}
oh.prototype.toString=function(){return JSON.stringify(ph(this))};function qh(a){a=void 0===a?0:a;return 0==a?"client-screen-nonce":"client-screen-nonce."+a}
function rh(a){a=void 0===a?0:a;return 0==a?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function sh(a){return Q(rh(void 0===a?0:a),void 0)}
y("yt_logging_screen.getRootVeType",sh,void 0);function th(){var a=sh(0),b;a?b=new oh({veType:a,youtubeData:void 0}):b=null;return b}
function uh(){var a=Q("csn-to-ctt-auth-info");a||(a={},P("csn-to-ctt-auth-info",a));return a}
function vh(a){a=void 0===a?0:a;var b=Q(qh(a));if(!b&&!Q("USE_CSN_FALLBACK",!0))return null;b||0!=a||(R("kevlar_client_side_screens")||R("c3_client_side_screens")?b="UNDEFINED_CSN":b=Q("EVENT_ID"));return b?b:null}
y("yt_logging_screen.getCurrentCsn",vh,void 0);function wh(a,b,c){var d=uh();(c=vh(c))&&delete d[c];b&&(d[a]=b)}
function xh(a){return uh()[a]}
y("yt_logging_screen.getCttAuthInfo",xh,void 0);function yh(a,b,c,d){c=void 0===c?0:c;if(a!==Q(qh(c))||b!==Q(rh(c)))if(wh(a,d,c),P(qh(c),a),P(rh(c),b),0==c||R("web_screen_associated_all_layers"))b=function(){setTimeout(function(){a&&og("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:mh,clientScreenNonce:a},zg)},0)},"requestAnimationFrame"in window?window.requestAnimationFrame(b):b()}
y("yt_logging_screen.setCurrentScreen",yh,void 0);function zh(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=Q("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){d=a;var e=void 0===e?!0:e;var f=Q("VALID_SESSION_TEMPDATA_DOMAINS",[]),h=J(K(3,window.location.href));h&&f.push(h);h=J(K(3,d));if(0<=Oa(f,h)||!h&&0==d.lastIndexOf("/",0))if(R("autoescape_tempdata_url")&&(f=document.createElement("a"),Fb(f,d),d=f.href),d){h=d.match(Kb);d=h[5];f=h[6];h=h[7];var g="";d&&(g+=d);f&&(g+="?"+f);h&&(g+="#"+h);d=g;f=d.indexOf("#");if(d=0>f?d:d.substr(0,f))if(e&&!b.csn&&(b.itct||
b.ved)&&(b=Object.assign({csn:vh()},b)),k){var k=parseInt(k,10);isFinite(k)&&0<k&&(e=b,b="ST-"+Jb(d).toString(36),e=e?Mb(e):"",tg(b,e,k||5))}else k=b,e="ST-"+Jb(d).toString(36),k=k?Mb(k):"",tg(e,k,5)}}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var l=void 0===l?{}:l;var n=void 0===n?"":n;var r=void 0===r?window:r;c=r.location;a=Nb(a,l)+n;a=a instanceof H?a:yb(a);c.href=wb(a)}return!0}
;function Ah(a,b){this.version=a;this.args=b}
;function Bh(a,b){this.topic=a;this.f=b}
Bh.prototype.toString=function(){return this.topic};var Ch=z("ytPubsub2Pubsub2Instance")||new O;O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.N;O.prototype.publish=O.prototype.M;O.prototype.clear=O.prototype.clear;y("ytPubsub2Pubsub2Instance",Ch,void 0);var Dh=z("ytPubsub2Pubsub2SubscribedKeys")||{};y("ytPubsub2Pubsub2SubscribedKeys",Dh,void 0);var Eh=z("ytPubsub2Pubsub2TopicToKeys")||{};y("ytPubsub2Pubsub2TopicToKeys",Eh,void 0);var Fh=z("ytPubsub2Pubsub2IsAsync")||{};y("ytPubsub2Pubsub2IsAsync",Fh,void 0);
y("ytPubsub2Pubsub2SkipSubKey",null,void 0);function Gh(a,b){var c=Hh();c&&c.publish.call(c,a.toString(),a,b)}
function Ih(a){var b=Jh,c=Hh();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var h=z("ytPubsub2Pubsub2SkipSubKey");h&&h==d||(h=function(){if(Dh[d])try{if(f&&b instanceof Bh&&b!=e)try{var g=b.f,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!g.F){var l=new g;g.F=l.version}var n=g.F}catch(r){}if(!n||k.version!=n)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{f=Reflect.construct(g,
Ua(k.args))}catch(r){throw r.message="yt.pubsub2.Data.deserialize(): "+r.message,r;}}catch(r){throw r.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+r.message,r;}a.call(window,f)}catch(r){pe(r)}},Fh[b.toString()]?z("yt.scheduler.instance")?fg(h):S(h,0):h())});
Dh[d]=!0;Eh[b.toString()]||(Eh[b.toString()]=[]);Eh[b.toString()].push(d);return d}
function Kh(){var a=Lh,b=Ih(function(c){a.apply(void 0,arguments);Mh(b)});
return b}
function Mh(a){var b=Hh();b&&("number"===typeof a&&(a=[a]),F(a,function(c){b.unsubscribeByKey(c);delete Dh[c]}))}
function Hh(){return z("ytPubsub2Pubsub2Instance")}
;function Nh(a){Ah.call(this,1,arguments);this.csn=a}
q(Nh,Ah);var Jh=new Bh("screen-created",Nh),Oh=[],Ph=0;function Qh(a,b,c){var d=R("use_default_events_client")?void 0:zg;b={csn:a,parentVe:ph(b),childVes:Qa(c,function(f){return ph(f)})};
c=p(c);for(var e=c.next();!e.done;e=c.next())e=ph(e.value),(ab(e)||!e.trackingParams&&!e.veType)&&Hg(Error("Child VE logged with no data"),"WARNING");c={ca:xh(a),P:a};"UNDEFINED_CSN"==a?Rh("visualElementAttached",b,c):d?og("visualElementAttached",b,d,c):Ag("visualElementAttached",b,c)}
function Rh(a,b,c){Oh.push({payloadName:a,payload:b,options:c});Ph||(Ph=Kh())}
function Lh(a){if(Oh){for(var b=p(Oh),c=b.next();!c.done;c=b.next())c=c.value,c.payload&&(c.payload.csn=a.csn,og(c.payloadName,c.payload,null,c.options));Oh.length=0}Ph=0}
;function Sh(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||db(b);this.assets=a.assets||{};this.attrs=a.attrs||db(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Sh.prototype.clone=function(){var a=new Sh,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==Aa(c)?a[b]=db(c):a[b]=c}return a};function Th(){M.call(this);this.f=[]}
q(Th,M);Th.prototype.o=function(){for(;this.f.length;){var a=this.f.pop();a.target.removeEventListener(a.name,a.pb)}M.prototype.o.call(this)};var Uh=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Vh(a){a=a||"";if(window.spf){var b=a.match(Uh);spf.style.load(a,b?b[1]:"",void 0)}else Wh(a)}
function Wh(a){var b=Xh(a),c=document.getElementById(b),d=c&&Mg(c,"loaded");d||c&&!d||(c=Yh(a,b,function(){Mg(c,"loaded")||(Kg(c),gf(b),S(Ka(hf,b),0))}))}
function Yh(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=uc(a);d.rel="stylesheet";d.href=kb(a).toString();(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function Xh(a){var b=qc(document,"A");Fb(b,new H(ub,a));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Jb(a)}
;function Zh(a,b,c,d){M.call(this);var e=this;this.m=this.X=a;this.U=b;this.w=!1;this.api={};this.V=this.G=null;this.H=new O;Bc(this,Ka(Cc,this.H));this.j={};this.R=this.W=this.h=this.ba=this.f=null;this.I=!1;this.l=this.B=null;this.Y={};this.ta=["onReady"];this.aa=null;this.ja=NaN;this.S={};this.i=d;$h(this);this.Z("WATCH_LATER_VIDEO_ADDED",this.La.bind(this));this.Z("WATCH_LATER_VIDEO_REMOVED",this.Ma.bind(this));this.Z("onAdAnnounce",this.va.bind(this));this.ua=new Th(this);Bc(this,Ka(Cc,this.ua));
this.T=0;c?this.T=S(function(){e.loadNewVideoConfig(c)},0):d&&(ai(this),bi(this))}
q(Zh,M);m=Zh.prototype;m.getId=function(){return this.U};
m.loadNewVideoConfig=function(a){if(!this.g){this.T&&(T(this.T),this.T=0);a instanceof Sh||(a=new Sh(a));this.ba=a;this.f=a.clone();ai(this);this.W||(this.W=ci(this,this.f.args.jsapicallback||"onYouTubePlayerReady"));this.f.args.jsapicallback=null;if(a=this.f.attrs.width)this.m.style.width=Ec(Number(a)||a);if(a=this.f.attrs.height)this.m.style.height=Ec(Number(a)||a);bi(this);this.w&&di(this)}};
function ai(a){var b;a.i?b=a.i.rootElementId:b=a.f.attrs.id;a.h=b||a.h;"video-player"==a.h&&(a.h=a.U,a.f.attrs.id=a.U);a.m.id==a.h&&(a.h+="-player",a.f.attrs.id=a.h)}
m.Aa=function(){return this.ba};
function di(a){a.f&&!a.f.loaded&&(a.f.loaded=!0,"0"!=a.f.args.autoplay?a.api.loadVideoByPlayerVars(a.f.args):a.api.cueVideoByPlayerVars(a.f.args))}
function ei(a){var b=!0,c=fi(a);c&&a.f&&(a=gi(a),b=Mg(c,"version")===a);return b&&!!z("yt.player.Application.create")}
function bi(a){if(!a.g&&!a.I){var b=ei(a);if(b&&"html5"==(fi(a)?"html5":null))a.R="html5",a.w||hi(a);else if(ii(a),a.R="html5",b&&a.l)a.X.appendChild(a.l),hi(a);else{a.f&&(a.f.loaded=!0);var c=!1;a.B=function(){c=!0;if(a.i)var d=a.i.serializedExperimentFlags;else a.f&&a.f.args&&(d=a.f.args.fflags);d="true"==re(d||"").player_bootstrap_method?z("yt.player.Application.createAlternate")||z("yt.player.Application.create"):z("yt.player.Application.create");var e=a.f?a.f.clone():void 0;d(a.X,e,a.i);hi(a)};
a.I=!0;b?a.B():(Qg(gi(a),a.B),(b=a.i?a.i.cssUrl:a.f.assets.css)&&Vh(b),ji(a)&&!c&&y("yt.player.Application.create",null,void 0))}}}
function fi(a){var b=mc(a.h);!b&&a.m&&a.m.querySelector&&(b=a.m.querySelector("#"+a.h));return b}
function hi(a){if(!a.g){var b=fi(a),c=!1;b&&b.getApiInterface&&b.getApiInterface()&&(c=!0);c?(a.I=!1,b.isNotServable&&a.f&&b.isNotServable(a.f.args.video_id)||ki(a)):a.ja=S(function(){hi(a)},50)}}
function ki(a){$h(a);a.w=!0;var b=fi(a);b.addEventListener&&(a.G=li(a,b,"addEventListener"));b.removeEventListener&&(a.V=li(a,b,"removeEventListener"));var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=0;d<c.length;d++){var e=c[d];a.api[e]||(a.api[e]=li(a,b,e))}for(var f in a.j)a.G(f,a.j[f]);di(a);a.W&&a.W(a.api);a.H.M("onReady",a.api)}
function li(a,b,c){var d=b[c];return function(){try{return a.aa=null,d.apply(b,arguments)}catch(e){"sendAbandonmentPing"!=c&&(e.params=c,a.aa=e,qe(e))}}}
function $h(a){a.w=!1;if(a.V)for(var b in a.j)a.V(b,a.j[b]);for(var c in a.S)T(parseInt(c,10));a.S={};a.G=null;a.V=null;for(var d in a.api)a.api[d]=null;a.api.addEventListener=a.Z.bind(a);a.api.removeEventListener=a.Qa.bind(a);a.api.destroy=a.dispose.bind(a);a.api.getLastError=a.Ba.bind(a);a.api.getPlayerType=a.Ca.bind(a);a.api.getCurrentVideoConfig=a.Aa.bind(a);a.api.loadNewVideoConfig=a.loadNewVideoConfig.bind(a);a.api.isReady=a.Ka.bind(a)}
m.Ka=function(){return this.w};
m.Z=function(a,b){var c=this,d=ci(this,b);if(d){if(!(0<=Oa(this.ta,a)||this.j[a])){var e=mi(this,a);this.G&&this.G(a,e)}this.H.subscribe(a,d);"onReady"==a&&this.w&&S(function(){d(c.api)},0)}};
m.Qa=function(a,b){if(!this.g){var c=ci(this,b);c&&Pd(this.H,a,c)}};
function ci(a,b){var c=b;if("string"==typeof b){if(a.Y[b])return a.Y[b];c=function(){var d=z(b);d&&d.apply(x,arguments)};
a.Y[b]=c}return c?c:null}
function mi(a,b){var c="ytPlayer"+b+a.U;a.j[b]=c;x[c]=function(d){var e=S(function(){if(!a.g){a.H.M(b,d);var f=a.S,h=String(e);h in f&&delete f[h]}},0);
bb(a.S,String(e))};
return c}
m.va=function(a){gf("a11y-announce",a)};
m.La=function(a){gf("WATCH_LATER_VIDEO_ADDED",a)};
m.Ma=function(a){gf("WATCH_LATER_VIDEO_REMOVED",a)};
m.Ca=function(){return this.R||(fi(this)?"html5":null)};
m.Ba=function(){return this.aa};
function ii(a){a.cancel();$h(a);a.R=null;a.f&&(a.f.loaded=!1);var b=fi(a);b&&(ei(a)||!ji(a)?a.l=b:(b&&b.destroy&&b.destroy(),a.l=null));for(a=a.X;b=a.firstChild;)a.removeChild(b)}
m.cancel=function(){this.B&&Wg(gi(this),this.B);T(this.ja);this.I=!1};
m.o=function(){ii(this);if(this.l&&this.f&&this.l.destroy)try{this.l.destroy()}catch(b){pe(b)}this.Y=null;for(var a in this.j)x[this.j[a]]=null;this.ba=this.f=this.api=null;delete this.X;delete this.m;M.prototype.o.call(this)};
function ji(a){return a.f&&a.f.args&&a.f.args.fflags?-1!=a.f.args.fflags.indexOf("player_destroy_old_version=true"):!1}
function gi(a){return a.i?a.i.jsUrl:a.f.assets.js}
;var ni={},oi="player_uid_"+(1E9*Math.random()>>>0);function pi(a){delete ni[a.getId()]}
;function qi(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];if(!ri(a)||c.some(function(e){return!ri(e)}))throw Error("Only objects may be merged.");
c=p(c);for(d=c.next();!d.done;d=c.next())si(a,d.value);return a}
function si(a,b){for(var c in b)if(ri(b[c])){if(c in a&&!ri(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});si(a[c],b[c])}else if(ti(b[c])){if(c in a&&!ti(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);ui(a[c],b[c])}else a[c]=b[c];return a}
function ui(a,b){for(var c=p(b),d=c.next();!d.done;d=c.next())d=d.value,ri(d)?a.push(si({},d)):ti(d)?a.push(ui([],d)):a.push(d);return a}
function ri(a){return"object"===typeof a&&!Array.isArray(a)}
function ti(a){return"object"===typeof a&&Array.isArray(a)}
;function vi(a,b){Ah.call(this,1,arguments)}
q(vi,Ah);function wi(a,b){Ah.call(this,1,arguments)}
q(wi,Ah);var xi=new Bh("aft-recorded",vi),yi=new Bh("timing-sent",wi);var zi=window;function Ai(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
var Bi=zi.performance||zi.mozPerformance||zi.msPerformance||zi.webkitPerformance||new Ai;var Ci=!1;B(Bi.clearResourceTimings||Bi.webkitClearResourceTimings||Bi.mozClearResourceTimings||Bi.msClearResourceTimings||Bi.oClearResourceTimings||ya,Bi);function Di(a){var b=Ei(a);if(b.aft)return b.aft;a=Q((a||"")+"TIMING_AFT_KEYS",["ol"]);for(var c=a.length,d=0;d<c;d++){var e=b[a[d]];if(e)return e}return NaN}
function Fi(a){var b;(b=z("ytcsi."+(a||"")+"data_"))||(b={tick:{},info:{}},La("ytcsi."+(a||"")+"data_",b));return b}
function Gi(a){a=Fi(a);a.info||(a.info={});return a.info}
function Ei(a){a=Fi(a);a.tick||(a.tick={});return a.tick}
function Hi(a){var b=Fi(a).nonce;b||(b=lh(),Fi(a).nonce=b);return b}
function Ii(a){var b=Ei(a||""),c=Di(a);c&&!Ci&&(Gh(xi,new vi(Math.round(c-b._start),a)),Ci=!0)}
;function Ji(){var a=z("ytcsi.debug");a||(a=[],y("ytcsi.debug",a,void 0),y("ytcsi.reference",{},void 0));return a}
function Ki(a){a=a||"";var b=z("ytcsi.reference");b||(Ji(),b=z("ytcsi.reference"));if(b[a])return b[a];var c=Ji(),d={timerName:a,info:{},tick:{},span:{}};c.push(d);return b[a]=d}
;var Li=z("ytLoggingLatencyUsageStats_")||{};y("ytLoggingLatencyUsageStats_",Li,void 0);function Mi(){this.f=0}
function Ni(){Mi.instance||(Mi.instance=new Mi);return Mi.instance}
Mi.prototype.tick=function(a,b,c){Oi(this,"tick_"+a+"_"+b)||Ag("latencyActionTicked",{tickName:a,clientActionNonce:b},{timestamp:c})};
Mi.prototype.info=function(a,b){var c=Object.keys(a).join("");Oi(this,"info_"+c+"_"+b)||(a.clientActionNonce=b,Ag("latencyActionInfo",a))};
Mi.prototype.span=function(a,b){var c=Object.keys(a).join("");Oi(this,"span_"+c+"_"+b)||(a.clientActionNonce=b,Ag("latencyActionSpan",a))};
function Oi(a,b){Li[b]=Li[b]||{count:0};var c=Li[b];c.count++;c.time=U();a.f||(a.f=gg(function(){var d=U(),e;for(e in Li)Li[e]&&6E4<d-Li[e].time&&delete Li[e];a&&(a.f=0)},0,5E3));
return 5<c.count?(6===c.count&&1>1E5*Math.random()&&(c=new Bg("CSI data exceeded logging limit with key",b),0===b.indexOf("info")?Eg(c):Fg(c)),!0):!1}
;var Y={},Pi=(Y.ad_allowed="adTypesAllowed",Y.yt_abt="adBreakType",Y.ad_cpn="adClientPlaybackNonce",Y.ad_docid="adVideoId",Y.yt_ad_an="adNetworks",Y.ad_at="adType",Y.browse_id="browseId",Y.p="httpProtocol",Y.t="transportProtocol",Y.cpn="clientPlaybackNonce",Y.ccs="creatorInfo.creatorCanaryState",Y.cseg="creatorInfo.creatorSegment",Y.csn="clientScreenNonce",Y.docid="videoId",Y.GetHome_rid="requestIds",Y.GetSearch_rid="requestIds",Y.GetPlayer_rid="requestIds",Y.GetWatchNext_rid="requestIds",Y.GetBrowse_rid=
"requestIds",Y.GetLibrary_rid="requestIds",Y.is_continuation="isContinuation",Y.is_nav="isNavigation",Y.b_p="kabukiInfo.browseParams",Y.is_prefetch="kabukiInfo.isPrefetch",Y.is_secondary_nav="kabukiInfo.isSecondaryNav",Y.prev_browse_id="kabukiInfo.prevBrowseId",Y.query_source="kabukiInfo.querySource",Y.voz_type="kabukiInfo.vozType",Y.yt_lt="loadType",Y.mver="creatorInfo.measurementVersion",Y.yt_ad="isMonetized",Y.nr="webInfo.navigationReason",Y.nrsu="navigationRequestedSameUrl",Y.ncnp="webInfo.nonPreloadedNodeCount",
Y.pnt="performanceNavigationTiming",Y.prt="playbackRequiresTap",Y.plt="playerInfo.playbackType",Y.pis="playerInfo.playerInitializedState",Y.paused="playerInfo.isPausedOnLoad",Y.yt_pt="playerType",Y.fmt="playerInfo.itag",Y.yt_pl="watchInfo.isPlaylist",Y.yt_pre="playerInfo.preloadType",Y.yt_ad_pr="prerollAllowed",Y.pa="previousAction",Y.yt_red="isRedSubscriber",Y.rce="mwebInfo.responseContentEncoding",Y.scrh="screenHeight",Y.scrw="screenWidth",Y.st="serverTimeMs",Y.aq="tvInfo.appQuality",Y.br_trs="tvInfo.bedrockTriggerState",
Y.kebqat="kabukiInfo.earlyBrowseRequestInfo.abandonmentType",Y.kebqa="kabukiInfo.earlyBrowseRequestInfo.adopted",Y.label="tvInfo.label",Y.is_mdx="tvInfo.isMdx",Y.preloaded="tvInfo.isPreloaded",Y.upg_player_vis="playerInfo.visibilityState",Y.query="unpluggedInfo.query",Y.upg_chip_ids_string="unpluggedInfo.upgChipIdsString",Y.yt_vst="videoStreamType",Y.vph="viewportHeight",Y.vpw="viewportWidth",Y.yt_vis="isVisible",Y.rcl="mwebInfo.responseContentLength",Y.GetSettings_rid="requestIds",Y.GetTrending_rid=
"requestIds",Y.GetMusicSearchSuggestions_rid="requestIds",Y.REQUEST_ID="requestIds",Y),Qi="isContinuation isNavigation kabukiInfo.earlyBrowseRequestInfo.adopted kabukiInfo.isPrefetch kabukiInfo.isSecondaryNav isMonetized navigationRequestedSameUrl performanceNavigationTiming playerInfo.isPausedOnLoad prerollAllowed isRedSubscriber tvInfo.isMdx tvInfo.isPreloaded isVisible watchInfo.isPlaylist playbackRequiresTap".split(" "),Ri={},Si=(Ri.ccs="CANARY_STATE_",Ri.mver="MEASUREMENT_VERSION_",Ri.pis="PLAYER_INITIALIZED_STATE_",
Ri.yt_pt="LATENCY_PLAYER_",Ri.pa="LATENCY_ACTION_",Ri.yt_vst="VIDEO_STREAM_TYPE_",Ri),Ti="all_vc ap c cver cbrand cmodel cplatform ctheme ei l_an l_mm plid srt yt_fss yt_li vpst vpni2 vpil2 icrc icrt pa GetAccountOverview_rid GetHistory_rid cmt d_vpct d_vpnfi d_vpni nsru pc pfa pfeh pftr pnc prerender psc rc start tcrt tcrc ssr vpr vps yt_abt yt_fn yt_fs yt_pft yt_pre yt_pt yt_pvis ytu_pvis yt_ref yt_sts tds".split(" ");function Ui(a){return!!Q("FORCE_CSI_ON_GEL",!1)||R("csi_on_gel")||!!Fi(a).useGel}
function Vi(a){a=Fi(a);if(!("gel"in a))a.gel={gelTicks:{},gelInfos:{}};else if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}return a.gel}
;function Wi(a,b,c){if(null!==b)if(Gi(c)[a]=b,Ui(c)){var d=b;b=Vi(c);if(b.gelInfos)b.gelInfos["info_"+a]=!0;else{var e={};b.gelInfos=(e["info_"+a]=!0,e)}if(a in Pi){if(a.match("_rid")){var f=a.split("_rid")[0];a="REQUEST_ID"}b=Pi[a];0<=Oa(Qi,b)&&(d=!!d);a in Si&&"string"===typeof d&&(d=Si[a]+d.toUpperCase());a=d;d=b.split(".");for(var h=e={},g=0;g<d.length-1;g++){var k=d[g];h[k]={};h=h[k]}h[d[d.length-1]]="requestIds"===b?[{id:a,endpoint:f}]:a;f=qi({},e)}else 0<=Oa(Ti,a)||Eg(new Bg("Unknown label logged with GEL CSI",
a)),f=void 0;f&&Ui(c)&&(b=Ki(c||""),qi(b.info,f),b=Vi(c),"gelInfos"in b||(b.gelInfos={}),qi(b.gelInfos,f),c=Hi(c),Ni().info(f,c))}else Ki(c||"").info[a]=b}
function Xi(a,b,c){var d=Ei(c);if(R("use_first_tick")&&Yi(a,c))return d[a];if(!b&&"_"!==a[0]){var e=a;Bi.mark&&(0==e.lastIndexOf("mark_",0)||(e="mark_"+e),c&&(e+=" ("+c+")"),Bi.mark(e))}e=b||U();d[a]=e;e=Vi(c);e.gelTicks&&(e.gelTicks["tick_"+a]=!0);c||b||U();if(Ui(c)){Ki(c||"").tick[a]=b||U();e=Hi(c);if("_start"===a){var f=Ni();Oi(f,"baseline_"+e)||Ag("latencyActionBaselined",{clientActionNonce:e},{timestamp:b})}else Ni().tick(a,e,b);Ii(c);e=!0}else e=!1;if(!e){if(!z("yt.timing."+(c||"")+"pingSent_")&&
(f=Q((c||"")+"TIMING_ACTION",void 0),e=Ei(c),z("ytglobal.timing"+(c||"")+"ready_")&&f&&Yi("_start")&&Di(c)))if(Ii(c),c)Zi(c);else{f=!0;var h=Q("TIMING_WAIT",[]);if(h.length)for(var g=0,k=h.length;g<k;++g)if(!(h[g]in e)){f=!1;break}f&&Zi(c)}Ki(c||"").tick[a]=b||U()}return d[a]}
function Yi(a,b){var c=Ei(b);return a in c}
function Zi(a){if(!Ui(a)){var b=Ei(a),c=Gi(a),d=b._start,e=Q("CSI_SERVICE_NAME","youtube"),f={v:2,s:e,action:Q((a||"")+"TIMING_ACTION",void 0)},h=c.srt;void 0!==b.srt&&delete c.srt;b.aft=Di(a);var g=Ei(a),k=g.pbr,l=g.vc;g=g.pbs;k&&l&&g&&k<l&&l<g&&Gi(a).yt_pvis&&"youtube"===e&&(Wi("yt_lt","hot_bg",a),e=b.vc,k=b.pbs,delete b.aft,c.aft=Math.round(k-e));for(var n in c)"_"!==n.charAt(0)&&(f[n]=c[n]);b.ps=U();n={};e=[];for(var r in b)"_"!==r.charAt(0)&&(k=Math.round(b[r]-d),n[r]=k,e.push(r+"."+k));f.rt=
e.join(",");b=!!c.ap;R("debug_csi_data")&&(c=z("yt.timing.csiData"),c||(c=[],La("yt.timing.csiData",c)),c.push({page:location.href,time:new Date,args:f}));c="";for(var w in f)f.hasOwnProperty(w)&&(c+="&"+w+"="+f[w]);f="/csi_204?"+c.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b){var t=void 0===t?"":t;Ze(f,t)||We(f,void 0,void 0,void 0,t)}else We(f);y("yt.timing."+(a||"")+"pingSent_",!0,void 0);Gh(yi,new wi(n.aft+(Number(h)||0),a))}}
if(R("overwrite_polyfill_on_logging_lib_loaded")){var $i=window;$i.ytcsi&&($i.ytcsi.info=Wi,$i.ytcsi.tick=Xi)};function aj(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function bj(a,b,c){"string"===typeof a&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});a:{if((b=a.mediaContentUrl)&&(b=/\/([ve]|embed)\/([^#?]+)/.exec(b))&&b[2]){b=b[2];break a}b=null}a.videoId=b;return cj(a)}
function cj(a,b,c){if("string"===typeof a)return{videoId:a,startSeconds:b,suggestedQuality:c};b=["endSeconds","startSeconds","mediaContentUrl","suggestedQuality","videoId"];c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}
function dj(a,b,c,d){if(Da(a)&&!Ba(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};"string"===typeof a&&16===a.length?b.list="PL"+a:b.playlist=a;return b}
;function ej(a){a=void 0===a?!1:a;M.call(this);this.f=new O(a);Bc(this,Ka(Cc,this.f))}
D(ej,M);ej.prototype.subscribe=function(a,b,c){return this.g?0:this.f.subscribe(a,b,c)};
ej.prototype.j=function(a,b){this.g||this.f.M.apply(this.f,arguments)};function fj(a,b,c){ej.call(this);this.h=a;this.i=b;this.l=c}
q(fj,ej);function gj(a,b,c){if(!a.g){var d=a.h;d.g||a.i!=d.f||(a={id:a.l,command:b},c&&(a.data=c),d.f.postMessage(rd(a),d.i))}}
fj.prototype.o=function(){this.i=this.h=null;ej.prototype.o.call(this)};function hj(a){M.call(this);this.f=a;this.f.subscribe("command",this.ra,this);this.h={};this.j=!1}
q(hj,M);m=hj.prototype;m.start=function(){this.j||this.g||(this.j=!0,gj(this.f,"RECEIVING"))};
m.ra=function(a,b,c){if(this.j&&!this.g){var d=b||{};switch(a){case "addEventListener":"string"===typeof d.event&&(a=d.event,a in this.h||(c=B(this.Sa,this,a),this.h[a]=c,this.addEventListener(a,c)));break;case "removeEventListener":"string"===typeof d.event&&ij(this,d.event);break;default:this.i.isReady()&&this.i.isExternalMethodAvailable(a,c||null)&&(b=jj(a,b||{}),c=this.i.handleExternalCall(a,b,c||null),(c=kj(a,c))&&this.j&&!this.g&&gj(this.f,a,c))}}};
m.Sa=function(a,b){this.j&&!this.g&&gj(this.f,a,this.ea(a,b))};
m.ea=function(a,b){if(null!=b)return{value:b}};
function ij(a,b){b in a.h&&(a.removeEventListener(b,a.h[b]),delete a.h[b])}
m.o=function(){var a=this.f;a.g||Pd(a.f,"command",this.ra,this);this.f=null;for(var b in this.h)ij(this,b);M.prototype.o.call(this)};function lj(a,b){hj.call(this,b);this.i=a;this.start()}
q(lj,hj);lj.prototype.addEventListener=function(a,b){this.i.addEventListener(a,b)};
lj.prototype.removeEventListener=function(a,b){this.i.removeEventListener(a,b)};
function jj(a,b){switch(a){case "loadVideoById":return b=cj(b),[b];case "cueVideoById":return b=cj(b),[b];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return b=dj(b),[b];case "cuePlaylist":return b=dj(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];
case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function kj(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
lj.prototype.ea=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return hj.prototype.ea.call(this,a,b)};
lj.prototype.o=function(){hj.prototype.o.call(this);delete this.i};function mj(a,b,c){M.call(this);var d=this;c=c||Q("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname;this.h=b||null;this.w="*";this.i=c;this.sessionId=null;this.channel="widget";this.B=!!a;this.m=function(e){a:if(!("*"!=d.i&&e.origin!=d.i||d.h&&e.source!=d.h||"string"!==typeof e.data)){try{var f=JSON.parse(e.data)}catch(h){break a}if(!(null==f||d.B&&(d.sessionId&&d.sessionId!=f.id||d.channel&&d.channel!=f.channel))&&f)switch(f.event){case "listening":"null"!=
e.origin&&(d.i=d.w=e.origin);d.h=e.source;d.sessionId=f.id;d.f&&(d.f(),d.f=null);break;case "command":d.j&&(!d.l||0<=Oa(d.l,f.func))&&d.j(f.func,f.args,e.origin)}}};
this.l=this.f=this.j=null;window.addEventListener("message",this.m)}
q(mj,M);mj.prototype.sendMessage=function(a,b){var c=b||this.h;if(c){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var d=JSON.stringify(a);c.postMessage(d,this.w)}catch(e){qe(e)}}};
mj.prototype.o=function(){window.removeEventListener("message",this.m);M.prototype.o.call(this)};function nj(){var a=this.g=new mj(!!Q("WIDGET_ID_ENFORCE")),b=B(this.Pa,this);a.j=b;a.l=null;this.g.channel="widget";if(a=Q("WIDGET_ID"))this.g.sessionId=a;this.i=[];this.l=!1;this.j={}}
m=nj.prototype;m.Pa=function(a,b,c){"addEventListener"==a&&b?(a=b[0],this.j[a]||"onReady"==a||(this.addEventListener(a,oj(this,a)),this.j[a]=!0)):this.ma(a,b,c)};
m.ma=function(){};
function oj(a,b){return B(function(c){this.sendMessage(b,c)},a)}
m.addEventListener=function(){};
m.za=function(){this.l=!0;this.sendMessage("initialDelivery",this.fa());this.sendMessage("onReady");F(this.i,this.sa,this);this.i=[]};
m.fa=function(){return null};
function pj(a,b){a.sendMessage("infoDelivery",b)}
m.sa=function(a){this.l?this.g.sendMessage(a):this.i.push(a)};
m.sendMessage=function(a,b){this.sa({event:a,info:void 0==b?null:b})};
m.dispose=function(){this.g=null};function qj(a){nj.call(this);this.f=a;this.h=[];this.addEventListener("onReady",B(this.Na,this));this.addEventListener("onVideoProgress",B(this.Wa,this));this.addEventListener("onVolumeChange",B(this.Xa,this));this.addEventListener("onApiChange",B(this.Ra,this));this.addEventListener("onPlaybackQualityChange",B(this.Ta,this));this.addEventListener("onPlaybackRateChange",B(this.Ua,this));this.addEventListener("onStateChange",B(this.Va,this));this.addEventListener("onWebglSettingsChanged",B(this.Ya,
this))}
q(qj,nj);m=qj.prototype;m.ma=function(a,b,c){if(this.f.isExternalMethodAvailable(a,c)){b=b||[];if(0<b.length&&aj(a)){var d=b;if(Da(d[0])&&!Ba(d[0]))d=d[0];else{var e={};switch(a){case "loadVideoById":case "cueVideoById":e=cj.apply(window,d);break;case "loadVideoByUrl":case "cueVideoByUrl":e=bj.apply(window,d);break;case "loadPlaylist":case "cuePlaylist":e=dj.apply(window,d)}d=e}b.length=1;b[0]=d}this.f.handleExternalCall(a,b,c);aj(a)&&pj(this,this.fa())}};
m.Na=function(){var a=B(this.za,this);this.g.f=a};
m.addEventListener=function(a,b){this.h.push({eventType:a,listener:b});this.f.addEventListener(a,b)};
m.fa=function(){if(!this.f)return null;var a=this.f.getApiInterface();Ta(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c];if(0===e.search("get")||0===e.search("is")){var f=0;0===e.search("get")?f=3:0===e.search("is")&&(f=2);f=e.charAt(f).toLowerCase()+e.substr(f+1);try{var h=this.f[e]();b[f]=h}catch(g){}}}b.videoData=this.f.getVideoData();b.currentTimeLastUpdated_=C()/1E3;return b};
m.Va=function(a){a={playerState:a,currentTime:this.f.getCurrentTime(),duration:this.f.getDuration(),videoData:this.f.getVideoData(),videoStartBytes:0,videoBytesTotal:this.f.getVideoBytesTotal(),videoLoadedFraction:this.f.getVideoLoadedFraction(),playbackQuality:this.f.getPlaybackQuality(),availableQualityLevels:this.f.getAvailableQualityLevels(),currentTimeLastUpdated_:C()/1E3,playbackRate:this.f.getPlaybackRate(),mediaReferenceTime:this.f.getMediaReferenceTime()};this.f.getVideoUrl&&(a.videoUrl=
this.f.getVideoUrl());this.f.getVideoContentRect&&(a.videoContentRect=this.f.getVideoContentRect());this.f.getProgressState&&(a.progressState=this.f.getProgressState());this.f.getPlaylist&&(a.playlist=this.f.getPlaylist());this.f.getPlaylistIndex&&(a.playlistIndex=this.f.getPlaylistIndex());this.f.getStoryboardFormat&&(a.storyboardFormat=this.f.getStoryboardFormat());pj(this,a)};
m.Ta=function(a){pj(this,{playbackQuality:a})};
m.Ua=function(a){pj(this,{playbackRate:a})};
m.Ra=function(){for(var a=this.f.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.f.getOptions(e);b[e]={options:f};for(var h=0,g=f.length;h<g;h++){var k=f[h],l=this.f.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
m.Xa=function(){pj(this,{muted:this.f.isMuted(),volume:this.f.getVolume()})};
m.Wa=function(a){a={currentTime:a,videoBytesLoaded:this.f.getVideoBytesLoaded(),videoLoadedFraction:this.f.getVideoLoadedFraction(),currentTimeLastUpdated_:C()/1E3,playbackRate:this.f.getPlaybackRate(),mediaReferenceTime:this.f.getMediaReferenceTime()};this.f.getProgressState&&(a.progressState=this.f.getProgressState());pj(this,a)};
m.Ya=function(){var a={sphericalProperties:this.f.getSphericalProperties()};pj(this,a)};
m.dispose=function(){nj.prototype.dispose.call(this);for(var a=0;a<this.h.length;a++){var b=this.h[a];this.f.removeEventListener(b.eventType,b.listener)}this.h=[]};function rj(a,b,c){M.call(this);this.f=a;this.i=c;this.j=X(window,"message",B(this.l,this));this.h=new fj(this,a,b);Bc(this,Ka(Cc,this.h))}
q(rj,M);rj.prototype.l=function(a){var b;if(b=!this.g)if(b=a.origin==this.i)a:{b=this.f;do{b:{var c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(b=a.data,"string"===typeof b)){try{b=JSON.parse(b)}catch(d){return}b.command&&(c=this.h,c.g||c.j("command",b.command,b.data,a.origin))}};
rj.prototype.o=function(){bg(this.j);this.f=null;M.prototype.o.call(this)};function sj(){var a=db(tj),b;return Ed(new N(function(c,d){a.onSuccess=function(e){Ee(e)?c(e):d(new uj("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new uj("Unknown request error","net.unknown",e))};
a.O=function(e){d(new uj("Request timed out","net.timeout",e))};
b=Oe("//googleads.g.doubleclick.net/pagead/id",a)}),function(c){c instanceof Fd&&b.abort();
return Cd(c)})}
function uj(a,b){E.call(this,a+", errorCode="+b);this.errorCode=b;this.name="PromiseAjaxError"}
q(uj,E);function vj(){this.g=0;this.f=null}
vj.prototype.then=function(a,b,c){return 1===this.g&&a?(a=a.call(c,this.f),xd(a)?a:wj(a)):2===this.g&&b?(a=b.call(c,this.f),xd(a)?a:xj(a)):this};
vj.prototype.getValue=function(){return this.f};
vj.prototype.$goog_Thenable=!0;function xj(a){var b=new vj;a=void 0===a?null:a;b.g=2;b.f=void 0===a?null:a;return b}
function wj(a){var b=new vj;a=void 0===a?null:a;b.g=1;b.f=void 0===a?null:a;return b}
;function yj(a){E.call(this,a.message||a.description||a.name);this.isMissing=a instanceof zj;this.isTimeout=a instanceof uj&&"net.timeout"==a.errorCode;this.isCanceled=a instanceof Fd}
q(yj,E);yj.prototype.name="BiscottiError";function zj(){E.call(this,"Biscotti ID is missing from server")}
q(zj,E);zj.prototype.name="BiscottiMissingError";var tj={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},Aj=null;function ke(){if("1"===Ya(he(),"args","privembed"))return Cd(Error("Biscotti ID is not available in private embed mode"));Aj||(Aj=Ed(sj().then(Bj),function(a){return Cj(2,a)}));
return Aj}
function Bj(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new zj;a=JSON.parse(a.substr(4));if(1<(a.type||1))throw new zj;a=a.id;le(a);Aj=wj(a);Dj(18E5,2);return a}
function Cj(a,b){var c=new yj(b);le("");Aj=xj(c);0<a&&Dj(12E4,a-1);throw c;}
function Dj(a,b){S(function(){Ed(sj().then(Bj,function(c){return Cj(b,c)}),ya)},a)}
function Ej(){try{var a=z("yt.ads.biscotti.getId_");return a?a():ke()}catch(b){return Cd(b)}}
;function Fj(a){if("1"!==Ya(he(),"args","privembed")){a&&je();try{Ej().then(function(){},function(){}),S(Fj,18E5)}catch(b){pe(b)}}}
;var Z=z("ytglobal.prefsUserPrefsPrefs_")||{};y("ytglobal.prefsUserPrefsPrefs_",Z,void 0);function Gj(){this.f=Q("ALT_PREF_COOKIE_NAME","PREF");var a=ic.get(""+this.f,void 0);if(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Z[d]=c.toString())}}}
m=Gj.prototype;m.get=function(a,b){Hj(a);Ij(a);var c=void 0!==Z[a]?Z[a].toString():null;return null!=c?c:b?b:""};
m.set=function(a,b){Hj(a);Ij(a);if(null==b)throw Error("ExpectedNotNull");Z[a]=b.toString()};
m.remove=function(a){Hj(a);Ij(a);delete Z[a]};
m.save=function(){tg(this.f,this.dump(),63072E3)};
m.clear=function(){for(var a in Z)delete Z[a]};
m.dump=function(){var a=[],b;for(b in Z)a.push(b+"="+encodeURIComponent(String(Z[b])));return a.join("&")};
function Ij(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function Hj(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function Jj(a){a=void 0!==Z[a]?Z[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
za(Gj);var Kj=null,Lj=null,Mj=null,Nj={};function Oj(a){var b=a.id;a=a.ve_type;var c=nh++;a=new oh({veType:a,veCounter:c,elementIndex:void 0,dataElement:void 0,youtubeData:void 0});Nj[b]=a;b=vh();c=th();b&&c&&Qh(b,c,[a])}
function Pj(a){var b=a.csn;a=a.root_ve_type;if(b&&a&&(yh(b,a),a=th()))for(var c in Nj){var d=Nj[c];d&&Qh(b,a,[d])}}
function Qj(a){Nj[a.id]=new oh({trackingParams:a.tracking_params})}
function Rj(a){var b=vh(),c=Nj[a.id];if(b&&c){a=R("use_default_events_client")?void 0:zg;c={csn:b,ve:ph(c),gestureType:"INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK"};var d={ca:xh(b),P:b};"UNDEFINED_CSN"==b?Rh("visualElementGestured",c,d):a?og("visualElementGestured",c,a,d):Ag("visualElementGestured",c,d)}}
function Sj(a){a=a.ids;var b=vh();if(b)for(var c=0;c<a.length;c++){var d=Nj[a[c]];if(d){var e=b,f=R("use_default_events_client")?void 0:zg;d={csn:e,ve:ph(d),eventType:1};var h={ca:xh(e),P:e};"UNDEFINED_CSN"==e?Rh("visualElementShown",d,h):f?og("visualElementShown",d,f,h):Ag("visualElementShown",d,h)}}}
;y("yt.setConfig",P,void 0);y("yt.config.set",P,void 0);y("yt.setMsg",Jg,void 0);y("yt.msgs.set",Jg,void 0);y("yt.logging.errors.log",Hg,void 0);
y("writeEmbed",function(){var a=Q("PLAYER_CONFIG",void 0);Fj(!0);"gvn"==a.args.ps&&(document.body.style.backgroundColor="transparent");var b=document.referrer,c=Q("POST_MESSAGE_ORIGIN");window!=window.top&&b&&b!=document.URL&&(a.args.loaderUrl=b);Q("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");b="player";var d=void 0===d?!0:d;b="string"===typeof b?mc(b):b;var e=oi+"_"+Ea(b),f=ni[e];f&&d?a&&a.args&&a.args.fflags&&a.args.fflags.includes("web_player_remove_playerproxy=true")?f.api.loadVideoByPlayerVars(a.args||
null):f.loadNewVideoConfig(a):(f=new Zh(b,e,a,void 0),ni[e]=f,gf("player-added",f.api),Bc(f,Ka(pi,f)));a=f.api;Kj=a;a.addEventListener("onScreenChanged",Pj);a.addEventListener("onLogClientVeCreated",Oj);a.addEventListener("onLogServerVeCreated",Qj);a.addEventListener("onLogVeClicked",Rj);a.addEventListener("onLogVesShown",Sj);d=Q("POST_MESSAGE_ID","player");Q("ENABLE_JS_API")?Mj=new qj(a):Q("ENABLE_POST_API")&&"string"===typeof d&&"string"===typeof c&&(Lj=new rj(window.parent,d,c),Mj=new lj(a,Lj.h));
c=Q("BG_P",void 0);hh(c)&&(Q("BG_I")||Q("BG_IU"))&&(dh=!0,ch.initialize(Q("BG_I",null),Q("BG_IU",null),c,gh,void 0,!!Q("BG_CE",!1)));Zg()},void 0);
y("yt.www.watch.ads.restrictioncookie.spr",function(a){We(a+"mac_204?action_fcts=1");return!0},void 0);
var Tj=oe(function(){Xi("ol",void 0,void 0);var a=Gj.getInstance(),b=!!((Jj("f"+(Math.floor(119/31)+1))||0)&67108864),c=1<window.devicePixelRatio;if(document.body&&gd(document.body,"exp-invert-logo"))if(c&&!gd(document.body,"inverted-hdpi")){var d=document.body;if(d.classList)d.classList.add("inverted-hdpi");else if(!gd(d,"inverted-hdpi")){var e=ed(d);fd(d,e+(0<e.length?" inverted-hdpi":"inverted-hdpi"))}}else!c&&gd(document.body,"inverted-hdpi")&&hd();b!=c&&(b="f"+(Math.floor(119/31)+1),d=Jj(b)||
0,d=c?d|67108864:d&-67108865,0==d?delete Z[b]:(c=d.toString(16),Z[b]=c.toString()),a.save())}),Uj=oe(function(){var a=Kj;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();Q("PL_ATT")&&ch.dispose();a=0;for(var b=Xg.length;a<b;a++){var c=Xg[a];if(!isNaN(c)){var d=z("yt.scheduler.instance.cancelJob");d?d(c):T(c)}}Xg.length=0;Vg("//static.doubleclick.net/instream/ad_status.js");Yg=!1;P("DCLKSTAT",0);Dc(Mj,Lj);if(a=Kj)a.removeEventListener("onScreenChanged",Pj),a.removeEventListener("onLogClientVeCreated",Oj),a.removeEventListener("onLogServerVeCreated",Qj),a.removeEventListener("onLogVeClicked",Rj),a.removeEventListener("onLogVesShown",
Sj),a.destroy();Nj={}});
window.addEventListener?(window.addEventListener("load",Tj),window.addEventListener("unload",Uj)):window.attachEvent&&(window.attachEvent("onload",Tj),window.attachEvent("onunload",Uj));La("yt.abuse.player.botguardInitialized",z("yt.abuse.player.botguardInitialized")||ih);La("yt.abuse.player.invokeBotguard",z("yt.abuse.player.invokeBotguard")||jh);La("yt.abuse.dclkstatus.checkDclkStatus",z("yt.abuse.dclkstatus.checkDclkStatus")||$g);
La("yt.player.exports.navigate",z("yt.player.exports.navigate")||zh);La("yt.util.activity.init",z("yt.util.activity.init")||jg);La("yt.util.activity.getTimeSinceActive",z("yt.util.activity.getTimeSinceActive")||mg);La("yt.util.activity.setTimestamp",z("yt.util.activity.setTimestamp")||kg);}).call(this);
