/* Mediation-Client-Passback v2.9.0 Updated : 2019-11-20 */
!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var i=n(1),o=n(9),r=n(4),a=window.APN_macros.uuid,s=window.APN_macros.enableMediationEvents,c=r.reduce(window.APN_macros.ads,function(e,t){return t&&t.content_source?(!r.isTypeSupported(t.ad_type)||"csm"!==t.content_source&&"ssm"!==t.content_source&&"rtb"!==t.content_source||e.push(t),e):e},[]);try{var d=new i(c,o.createPlaceholder(),a,s);window.APN_macros=null,window.addEventListener("message",r.handleMessageFromHost),d.on("done",function(){d.logOutcome()}),d.start()}catch(u){r.handleError(u,a)}},function(e,t,n){function i(e,t,n,i){var o;if(void 0===e||e instanceof Array==!1)throw new Error("Passback requires an array of ads");this._uuid=n,this._container=t,this._ads=d(e),this._enableMediationEvents=i,o=this._ads[this._ads.length-1],this._endCall=d(o),l.validateChain(e),this._logger=new r}var o=n(2),r=n(3),a=n(6),s=n(11),c=n(9),d=n(12),u=n(4),l=n(13),h=n(14),f=n(5),p=n(15);n(8)(),i.prototype.start=function(){if(window.postMessage){var e=this._ads;this.next(e[0],e.slice(1))}else"rtb"===this._endCall.content_source?this.startEndCall(this._endCall):this.trigger("done")},i.prototype.next=function(e,t){function n(e,t){if(u.isSafeFrameEnabled()){var n={name:"emitEvent",targetId:r._uuid,cmd:[r._uuid,e,t]},i=window.MediationData.host;r._enableMediationEvents&&window.parent.postMessage(JSON.stringify(n),i)}else window.parent.apntag&&window.parent.apntag.emitEvent&&r._enableMediationEvents&&window.parent.apntag.emitEvent(r._uuid,e,t)}function i(i){var o,a;if(!i||"object"!=typeof i){var s=new Error("An internal error has occurred with mediationjs.");throw s.name="adRequestFailure",r._logger.flush(),r.trigger("done"),s}if(i.adFilled?(o="SUCCESS",r.clearChain(d)):o=i.timedOut?"TIMEOUT":"NOBID",a=i.latency,m&&l.setSession(m),"SUCCESS"===o)r._logger.log(e,{code:o,reason:h[o],latency:a,url:f.response_url}),p.log(f.response_url,{reason:h[o],latency:a}),r.trigger("done"),n("adLoadedMediated",e),n("adLoaded",e);else{if(n("adNoBidMediated",e),!t.length){var u=new Error("All ads resulted in no bid and no RTB ad was provided");throw u.name="adNoBid",r._logger.log(e,{code:o,reason:h[o],latency:a}),r._logger.flush(),u}r._logger.log(e,{code:o,reason:h[o],latency:a,url:f.response_url}),p.log(f.response_url,{reason:h[o],latency:a}),"rtb"!==c.content_source?r.next(c,d):r.startEndCall(r._endCall,{code:o,reason:h[o],latency:a})}}var o,r=this,s="__adnxs_passback__"+u.id(),c=t[0],d=t.slice(1),f=u.getAdObject(e),m="rtb"!==e.content_source?u.getSessionId(f.response_url):null,g=e.viewability;g=g&&g.config?g.config:f.viewability,o=new a({passbackId:s,width:f.handler[0].params.width,height:f.handler[0].params.height,content:f.handler[0].content,timeout:f.timeout_ms,container:this._container,trackers:f.trackers,viewability:g,uuid:this._uuid}),this._logger.log(e,{code:"INIT",url:f.request_url}),p.log(f.request_url),o.once("complete",function(e){try{i(e)}catch(t){u.handleError(t,r._uuid)}}),u.nextTick(function(){o.startRequest()})},i.prototype.clearChain=function(e){return e&&e.length?(u.each(e,function(e){if("rtb"!==e.content_source){var t=u.getSessionId(u.getAdObject(e).response_url);l.setSession(t)}}),void 0):!1},i.prototype.startEndCall=function(e,t){var n,i,o,r,a,c=this,d=u.getAdObject(e);d.banner?(i=d.banner.content,o=d.banner.width,r=d.banner.height,a=f.MEDIA_TYPES.BANNER):d["native"]?(i=e,a=f.MEDIA_TYPES.NATIVE):d.video&&(i=e,a=f.MEDIA_TYPES.VIDEO),t&&c._logger.log(e,{code:"CONTINUE",reason:t.reason,latency:t.latency,content:i}),n=new s({width:o,height:r,content:i,container:this._container,trackers:d.trackers,adType:a,uuid:this._uuid,enableMediationEvents:this._enableMediationEvents,currentAd:e}),u.nextTick(function(){n.startRequest(),n.onUpdate(c.resizer),c.trigger("done")})},i.prototype.logOutcome=function(){this._logger.flush()},i.prototype.resizer=function(e){var t=c.getIframeDocument(e),n=c.getViewport(t),i=c.getIframeWindow(e),o=n[0],r=n[1];if(o>0&&r>0&&(e.width!=o||e.height!=r)){e.width=o,e.height=r;try{if(i.ucTag&&i.ucTagData&&i.ucTagData.size){var a=i.ucTagData.size.split("x");a[0]>0&&a[1]>0&&window.parent.apntag&&window.parent.apntag.resizeAd&&window.parent.apntag.resizeAd(this.apntag_targetId,a)}}catch(s){}}},o.mixin(i.prototype),e.exports=i},function(e){e.exports={mixin:function(e){e.on=function(e,t,n){n=n||!1,this.events=this.events||{},this.events[e]=this.events[e]||[],this.events[e].push([t,n])},e.once=function(e,t){this.on(e,t,!0)},e.trigger=function(e){this.events=this.events||{};var t=(this.events[e]||[]).length,n=Array.prototype.slice.call(arguments,1);if(t)for(var i=t-1;i>=0;i--)this.events[e][i][0].apply(this,n),this.events[e][i][1]&&this.events[e].splice(i,1)},e.offAll=function(){this.events={}}}}},function(e,t,n){function i(){this._logs=[]}function o(e){return"creative ids "+e}function r(){console.group?console.group.apply(console,arguments):console.log&&console.log.apply(console,arguments)}function a(){console.groupCollapsed?console.groupCollapsed.apply(console,arguments):r.apply(this,arguments)}function s(){console.groupEnd&&console.groupEnd()}function c(e){switch(e){case"SUCCESS":return"green";case"CONTINUE":return"orange";case"NOBID":return"orange";default:return"red"}}function d(e){var t=["anx-mediation: ",e.code,e.latency?e.latency+"ms":"--"];return t.join(" ")}var u=n(4);i.prototype.flush=function(){if(this._logs.length>0){var e,t=this._logs[this._logs.length-1]||{},n=u.reduce(this._logs,function(e,t){return e[t.creativeIds]||(e[t.creativeIds]=[]),e[t.creativeIds]=e[t.creativeIds].concat(t),e},{});r("anx-mediation %c"+t.code,"color: "+c(t.code)),u.each(this._logs,function(t){var i;e!==t.creativeIds&&(e&&s(),i=n[t.creativeIds][n[t.creativeIds].length-1],e=t.creativeIds,a("anx-mediation: %c"+i.code+" %c"+o(t.creativeIds),"color: "+c(i.code),"color: black"));var r=d(t);console.log(r)}),e&&s(),s()}},i.prototype.log=function(e,t){var n,i=u.getAdObject(e);n="rtb"===e.content_source&&e.creative_id?[e.creative_id].join(","):u.map(i.handler||[],function(e){return e.params.creativeId}).join(",");var o;"rtb"===e.content_source&&(i.banner?o=i.banner.content?i.banner.content:i.handler[0].content:i["native"]&&(o=i["native"])),this._logs=this._logs.concat({creativeIds:n,code:t.code,reason:t.reason,latency:t.latency,url:t.url,content:o})},e.exports=i},function(e,t,n){var i=n(5);e.exports={browserVar:void 0,noop:function(){},find:function(e,t){for(var n,i=e.length,o=0;i>o;){if(t(e[o])){n=e[o];break}o++}return n||null},reduce:function(e,t,n){return this.each(e,function(e,i){n=t(n,e,i)}),n},map:function(e,t){var n=[];return this.each(e,function(e){n.push(t(e))}),n},each:function(e,t){var n=e.length,i=0;if(!n)return!1;for(;n>i;)t(e[i],i,e),i++},getSessionId:function(e){var t=e.match(/[?&]info=([^&]+)/);return t&&t[1]?t[1]:""},doGet:function(e){var t=new Image;t.src=e},id:function(){return Math.random().toString(36).substr(2,9)+Date.now()},nextTick:function(e){setTimeout(e,0)},getAdObject:function(e){if(!e||"object"!=typeof e)throw new Error("No ad object passed in");if(e.csm)return e.csm;if(e.ssm)return e.ssm;if(e.rtb)return e.rtb;throw new Error("Ad did not contain `csm`, `ssm`, or `rtb` object")},isTypeSupported:function(e){return e===i.MEDIA_TYPES.BANNER||e===i.MEDIA_TYPES.NATIVE||e===i.MEDIA_TYPES.VIDEO?!0:!1},handleError:function(t,n){if(!window.parent.apntag)throw t;var i="adNoBid"===t.name?"adNoBid":"adRequestFailure"===t.name?"adRequestFailure":"adError",o={errMessage:t.message,exception:t};if(e.exports.isSafeFrameEnabled())var r={name:"emitEvent",cmd:[n,i,o]},a=window.MediationData.host;"adNoBid"===t.name?e.exports.isSafeFrameEnabled()?window.parent.postMessage(JSON.stringify(r),a):window.parent.apntag.emitEvent(n,i):e.exports.isSafeFrameEnabled()?window.parent.postMessage(JSON.stringify(r),a):window.parent.apntag.emitEvent(n,i,o)},isSafeFrameEnabled:function(){return"undefined"!=typeof $sf?!0:!1},customSize:null,handleMessageFromHost:function(t){var n;if(n=e.exports.isSafeFrameEnabled()?window.MediationData.host:window.parent.location.protocol+"//"+window.parent.location.host,t.origin===n){var i;try{i=JSON.parse(t.data)}catch(o){return}"resizeAd"===i.name&&(e.exports.customSize=i.size)}},getBrowser:function(){if(void 0===this.browserVar){for(var t=e.exports.getUA(),n=[{name:i.BROWSERS.MOBILE,stringSearch:"Mobi"},{name:i.BROWSERS.EDGE},{name:i.BROWSERS.CHROME},{name:i.BROWSERS.FIREFOX},{name:i.BROWSERS.IE,versionSearch:/MSIE\s(\d+)/},{name:i.BROWSERS.SAFARI,versionSearch:/Version\/(\d+)/},{name:i.BROWSERS.IE,stringSearch:"Trident",versionSearch:/rv:(\d+)/}],o="",r="",a=0;a<n.length;a++){var s,c=n[a],d=c.stringSearch||c.name,u=d+"\\/(\\d+)",l=c.versionSearch||u;if(-1!==t.indexOf(d)){o=c.name,s=t.match(l),s&&(r=s&&s[1]);break}}this.browserVar={name:o,version:r}}return this.browserVar},getUA:function(){return navigator.userAgent}}},function(e){e.exports={HOST_CDN:"cdn.adnxs.com",HOST_ACDN:"acdn.adnxs.com",BROWSERS:{CHROME:"Chrome",SAFARI:"Safari",FIREFOX:"Firefox",IE:"IE",EDGE:"Edge",MOBILE:"Mobile"},MEDIA_TYPES:{BANNER:"banner",NATIVE:"native",VIDEO:"video"}}},function(e,t,n){function i(e){if(void 0===e||"object"!=typeof e)throw new Error("MediationFrame invoked without a `params` object");var t=this,n=t._passbackId=e.passbackId;t._width=e.width,t._height=e.height,t._postMessage=new a,t._timeout=e.timeout,t._content=e.content,t._container=e.container,t._trackers=e.trackers,t._uuid=e.uuid,t._viewability=e.viewability,t._timeout&&(h=t._timeout),t._iframe=s.createFrame(t._width,t._height,n||""),n&&(window[n]=function(e){e?(s.showFrame(t._iframe),l[n]=window.setTimeout(function(){l[n]=null,t._onComplete(e,!1)},h)):t._onComplete(e,!1)}),t._postMessage.on("message",function(e){e===t._passbackId&&t._onComplete(!1,!1)})}function o(e,t){var n=e;return t&&(n="<script>"+d.replace(/\${PASSBACK_ID}/g,t)+"</script>"+n,n+="<script>window.ADNXSMediation.ready();</script>"),n}var r=n(2),a=n(7),s=n(9),c=n(4),d=n(10),u=n(5),l={},h=1e3;i.prototype.startRequest=function(){var e=this,t=this._iframe,n=o(this._content,this._passbackId);c.getBrowser().name!==u.BROWSERS.IE&&c.getBrowser().name!==u.BROWSERS.EDGE&&(t.src="about:blank"),this._startTime=Date.now(),this._container.appendChild(t),s.iframeWrite(t,s.getHTMLWithContent(n)),this._timeout&&(this._timeoutId=window.setTimeout(function(){e._onComplete(!1,!0)},this._timeout))},i.prototype._insertViewability=function(){if(this._viewability)try{var e=this._iframe,t=function(t){var n=s.getIframeDocument(e),i=n.createDocumentFragment(),o=i.appendChild(n.createElement("div")),r=c.getBrowser();r.name===u.BROWSERS.IE&&"8"===r.version?(o.innerHTML="x"+t,o.removeChild(o.firstChild)):o.innerHTML=t;for(var a=o.getElementsByTagName("script"),d=0;d<a.length;d++){var l=a[d],h=l.parentElement;h.removeChild(l);var f=n.createElement("script");f.src=l.src,f.async=!0,h.appendChild(f)}n.body.appendChild(o)};if(-1!==this._viewability.indexOf("document.write")){var n=document.write;try{document.write=t,new Function(this._viewability)()}catch(i){}document.write=n}else t(this._viewability)}catch(o){}},i.prototype._onComplete=function(e,t){var n,i=this._iframe,o=new Date-this._startTime;if(n=c.customSize?c.customSize:[this._width,this._height],e&&c.isSafeFrameEnabled()){var r={name:"resizeAd",targetId:this._uuid,cmd:n},a=window.MediationData.host;window.parent.postMessage(JSON.stringify(r),a)}else e&&window.parent.apntag&&window.parent.apntag.resizeAd&&window.parent.apntag.resizeAd(this._uuid,n);if(l[this._passbackId]){if(t)return;e||clearTimeout(l[this._passbackId])}e||(window[this._passbackId]=c.noop),t?s.removeFrame(i):e?(s.showFrame(i),this._insertViewability()):e||(s.hideFrame(i),window.setTimeout(s.removeFrame(i),200)),e&&this._trackers&&c.each(this._trackers,function(e){e.impression_urls&&c.each(e.impression_urls,function(e){c.doGet(e)})}),this._timeoutId&&window.clearTimeout(this._timeoutId),this.trigger("complete",{adFilled:e,timedOut:t||!1,latency:o})},i.prototype.onUpdate=function(e){var t=this._iframe,n=s.getIframeDocument(t),i=function(){e(t)};i(),s.observeDOM(n,i)},r.mixin(i.prototype),e.exports=i},function(e,t,n){function i(){function e(e){return-1===a.indexOf(e.origin)&&e.origin.replace("http://","")!==window.location.host&&e.origin.replace("https://","")!==window.location.host?!1:(n.trigger("message",e.data),void 0)}function t(){window.ADNXSOffEvent("message",e,!1)}var n=this;window.ADNXSOnEvent("message",e,!1),this.close=t,this.onMessage=e}n(8)();var o=n(2),r=n(5),a=["http://"+r.HOST_CDN,"https://"+r.HOST_CDN,"http://"+r.HOST_ACDN,"https://"+r.HOST_ACDN];o.mixin(i.prototype),e.exports=i},function(e){function t(e){e=e||window;var t=function(){var e="test";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}();e.console=e.console||{log:function(){}},e.ADNXSOnEvent=e.addEventListener?e.addEventListener:function(t,n){e.attachEvent("on"+t,n)},e.ADNXSOffEvent=e.removeEventListener?e.removeEventListener:function(t,n){e.detachEvent("on"+t,n)},Date.now=Date.now||function(){return(new Date).getTime()},e.__anx_local_storage__=t?e.localStorage:{getItem:function(t){return e.__anx_local_storage_store=e.__anx_local_storage_store||{},e.__anx_local_storage_store[t]||[]},setItem:function(t,n){e.__anx_local_storage_store=e.__anx_local_storage_store||{},e.__anx_local_storage_store[t]=n},removeItem:function(t){e.__anx_local_storage_store=e.__anx_local_storage_store||{},delete e.__anx_local_storage_store[t]}},"function"!==Object.keys&&(Object.keys=function(e){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.keys called on non-object");var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var n;if(null==this)throw new TypeError('"this" is null or not defined');var i=Object(this),o=i.length>>>0;if(0===o)return-1;var r=+t||0;if(1/0===Math.abs(r)&&(r=0),r>=o)return-1;for(n=Math.max(r>=0?r:o-Math.abs(r),0);o>n;){if(n in i&&i[n]===e)return n;n++}return-1})}e.exports=t},function(e,t,n){var i=null,o=n(4),r=n(5);e.exports={getIframeDocument:function(e){var t=e.document;return e.contentDocument&&e.contentDocument.documentElement?t=e.contentDocument:e.contentWindow&&e.contentWindow.document&&(t=e.contentWindow.document),t},getIframeWindow:function(e){return e.contentWindow},iframeWrite:function(e,t){if(o.getBrowser().name!=r.BROWSERS.IE){var n=this.getIframeDocument(e);n.open("text/html","replace"),n.write(t),n.close()}else{var i=this.getIframeWindow(e);i.contents=t,e.src='javascript:window["contents"]'}},createFrame:function(e,t,n){var i=document.createElement("iframe");return i.id=n,i.width=e,i.height=t,i.frameBorder="0",i.marginWidth="0",i.marginHeight="0",i.scrolling="no",i.setAttribute("border","0"),i.setAttribute("allowtransparency","true"),i.style.visibility="hidden",i.style.display="none",i},showFrame:function(e){e.style.display="",e.style.visibility="visible"},hideFrame:function(e){e.style.display="none",e.style.visibility="hidden"},removeFrame:function(e){e.remove?e.remove():e.parentNode&&e.parentNode.removeChild(e)},getHTMLWithContent:function(e){return["<!DOCTYPE html>","<html>","<head>",'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">','<meta http-equiv="X-UA-Compatible" content="IE=edge">','<meta name="viewport" content="width=device-width, initial-scale=1">','<meta http-Equiv="Cache-Control" Content="no-cache">','<meta http-Equiv="Pragma" Content="no-cache">','<meta http-Equiv="Expires" Content="0">',"</head>","<body>",e,"</body>","</html>"].join("")},createPlaceholder:function(){if(i)return i;for(var e=document.createElement("div"),t=document.getElementsByTagName("script"),n=t[t.length-1],o=t.length-1;o>0;o--)if(/mediation\.js/.test(t[o].src)){n=t[o];break}return n.parentNode.insertBefore(e,n),i=e,e},getViewport:function(e){var t=e&&e.documentElement&&e.documentElement.scrollWidth,n=e&&e.documentElement&&e.documentElement.scrollHeight;return[t,n]},observeDOM:function(e,t){if(e){var n=window.MutationObserver||window.WebKitMutationObserver,i=window.addEventListener;if(n){var o=new n(function(e){(e[0].addedNodes.length||e[0].removedNodes.length)&&t()});o.observe(e,{childList:!0,subtree:!0})}else i?(e.addEventListener("DOMNodeInserted",t,!1),e.addEventListener("DOMNodeRemoved",t,!1)):e.attachEvent&&e.attachEvent("onreadystatechange",t)}}}},function(e){e.exports='!function(n){function t(n){function t(n,e){n.postMessage("${PASSBACK_ID}","*"),n.top!==n&&e<50&&setTimeout(t(n.parent,++e),0)}n&&"noad"===n.data&&t(this.parent,0)}function e(n,t,e){n.addEventListener?n.addEventListener(t,e,!1):n.attachEvent&&n.attachEvent("on"+t,e)}function o(t){var e=n.parent["${PASSBACK_ID}"];e&&"function"==typeof e?e(t):console.log("anx-mediation: WARN > Couldn\'t callback into mediation with filled: ",t)}function i(t){e(n,"load",function(){m.getTargetId()?r(n,function(){setTimeout(t,0)}):setTimeout(t,0)})}function c(){ADNXSMediation.isAsync()||(s("load",c,!1),o(!0))}function a(n){var t=n.document;return n.contentDocument&&n.contentDocument.documentElement?t=n.contentDocument:n.contentWindow&&n.contentWindow.document&&(t=n.contentWindow.document),t}function r(n,t){function o(){if(u===++d)return t()}var i,c,u=0,d=0,f=m.getTargetId();try{if(i=a(n),i.querySelectorAll(f).length)return t();c=i.querySelectorAll("frame,iframe"),u=c.length}catch(n){return t()}if(0===u)return t();for(var s=0;s<u;s++){var l=c[s];e(l,"load",function(){r(l,o)})}}function u(n){f=n}e(n,"message",t);var d={wait:function(){i(c)},domready:function(){o(!0)},async:function(){}},f="wait",s=n.removeEventListener||function(t,e){n.detachEvent("on"+t,e)},l=function(){o(!1)},A=function(){o(!0)},m={noAd:l,noad:l,adFilled:A,adfilled:A,setAsync:function(){u("async"),n.ADNXSAsync=!0},isAsync:function(){return!!n.ADNXSAsync},setStrategy:u,setTargetId:function(t){n.ADNXSTargetId=t},getTargetId:function(){return n.ADNXSTargetId},ready:function(){var t=n.parent["${PASSBACK_ID}"];(d[f]||d.wait)(t)}};n.ADNXSMediation=m,n.ADNXSAsync=!1}(this);'},function(e,t,n){function i(e){if(void 0===e||"object"!=typeof e)throw new Error("LastFrame invoked without a `params` object");var t=this._passbackId=e.passbackId;this._width=e.width,this._height=e.height,this._uuid=e.uuid,this._content=e.content,this._container=e.container,this._trackers=e.trackers,this._adType=e.adType,this._currentAd=e.currentAd,this._enableMediationEvents=e.enableMediationEvents,this._iframe=r.createFrame(this._width,this._height,t||"")}var o=n(2),r=n(9),a=n(8),s=n(4),c=n(5);i.prototype.startRequest=function(){if(s.isSafeFrameEnabled()){var e=window.MediationData.host;if(this._adType===c.MEDIA_TYPES.NATIVE||this._adType===c.MEDIA_TYPES.VIDEO)t={name:"mediatedNative",targetId:this._uuid,content:this._currentAd},window.parent.postMessage(JSON.stringify(t),e);else{var t={name:"resizeAd",targetId:this._uuid,cmd:[this._width,this._height]};window.parent.postMessage(JSON.stringify(t),e);var n={name:"emitEvent",targetId:this._uuid,cmd:[this._uuid,"adLoaded",this._currentAd]};this._enableMediationEvents&&window.parent.postMessage(JSON.stringify(n),e)}}else this._adType===c.MEDIA_TYPES.NATIVE||this._adType===c.MEDIA_TYPES.VIDEO?window.parent.apntag&&window.parent.apntag.handleMediationBid&&window.parent.apntag.handleMediationBid(this._uuid,this._currentAd):window.parent.apntag&&window.parent.apntag.resizeAd&&(window.parent.apntag.resizeAd(this._uuid,[this._width,this._height]),this._enableMediationEvents&&window.parent.apntag.emitEvent(this._uuid,"adLoaded",this._currentAd));var i=this._iframe;s.getBrowser().name!==c.BROWSERS.IE&&s.getBrowser().name!==c.BROWSERS.EDGE&&(i.src="about:blank"),this._adType!==c.MEDIA_TYPES.NATIVE&&this._adType!==c.MEDIA_TYPES.VIDEO&&(this._container.appendChild(i),r.iframeWrite(i,r.getHTMLWithContent(this._content)),r.showFrame(i)),this._adType===c.MEDIA_TYPES.VIDEO&&i.parentNode.removeChild(i),this._trackers&&s.each(this._trackers,function(e){e.impression_urls&&s.each(e.impression_urls,function(e){s.doGet(e)})})},i.prototype.onUpdate=function(e){var t=this._iframe,n=r.getIframeDocument(t),i=function(){e(t)};a(t),t.ADNXSOnEvent("load",i,!1),i(),r.observeDOM(n,i)},o.mixin(i.prototype),e.exports=i},function(e){function t(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)||"object"==typeof e}function n(e){var i=null;if(e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)){var o=0,r=e.length;for(i=[],o;r>o;o++)i[o]=t(e[o])?n(e[o]):e[o];return i}if("object"==typeof e){i={};for(var a in e)e.hasOwnProperty(a)&&(i[a]=t(e[a])?n(e[a]):e[a]);return i}return e}e.exports=n},function(e,t,n){var i=n(4),o="adnxs_mediation",r=20;e.exports={getSessions:function(){var e;try{e=window.__anx_local_storage__.getItem(o).split(",")}catch(t){e=[]}return e},setSession:function(e){var t=this.getSessions();if(this.hasSessionBeenCalled(e))throw new Error("anx-mediation: SESSION-ERROR: Session already queried: ",e);return t.length>=r&&(t=t.slice(t.length-r+1,t.length)),t.push(e),window.__anx_local_storage__.setItem(o,t.join(",")),t},hasSessionBeenCalled:function(e){return!!i.find(this.getSessions(),function(t){return t===e})},getThreshold:function(){return r},validateChain:function(e){var t=this;i.each(e,function(e){if("rtb"!==e.content_source){var n=i.getSessionId(i.getAdObject(e).response_url);if(t.hasSessionBeenCalled(n))throw new Error("anx-mediation: CHAIN-ERROR: Chain has already been called!")}})}}},function(e){e.exports={SUCCESS:0,TIMEOUT:1,NOBID:2,INTERNALERROR:3,INVALIDREQUEST:5}},function(e,t,n){var i=n(4);e.exports={log:function(e,t){t?i.doGet(e+"&reason="+t.reason+"&latency="+t.latency):i.doGet(e)}}}]);