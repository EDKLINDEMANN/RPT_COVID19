(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{3:function(o,t,i){o.exports=i("OmL/")},LboF:function(o,t,i){"use strict";var e,n={},a=function(){var o={};return function(t){if(void 0===o[t]){var i=document.querySelector(t);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(e){i=null}o[t]=i}return o[t]}}();function r(o,t){for(var i=[],e={},n=0;n<o.length;n++){var a=o[n],r=t.base?a[0]+t.base:a[0],l={css:a[1],media:a[2],sourceMap:a[3]};e[r]?e[r].parts.push(l):i.push(e[r]={id:r,parts:[l]})}return i}function l(o,t){for(var i=0;i<o.length;i++){var e=o[i],a=n[e.id],r=0;if(a){for(a.refs++;r<a.parts.length;r++)a.parts[r](e.parts[r]);for(;r<e.parts.length;r++)a.parts.push(g(e.parts[r],t))}else{for(var l=[];r<e.parts.length;r++)l.push(g(e.parts[r],t));n[e.id]={id:e.id,refs:1,parts:l}}}}function b(o){var t=document.createElement("style");if(void 0===o.attributes.nonce){var e=i.nc;e&&(o.attributes.nonce=e)}if(Object.keys(o.attributes).forEach((function(i){t.setAttribute(i,o.attributes[i])})),"function"==typeof o.insert)o.insert(t);else{var n=a(o.insert||"head");if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(t)}return t}var p,d=(p=[],function(o,t){return p[o]=t,p.filter(Boolean).join("\n")});function s(o,t,i,e){var n=i?"":e.css;if(o.styleSheet)o.styleSheet.cssText=d(t,n);else{var a=document.createTextNode(n),r=o.childNodes;r[t]&&o.removeChild(r[t]),r.length?o.insertBefore(a,r[t]):o.appendChild(a)}}function c(o,t,i){var e=i.css,n=i.media,a=i.sourceMap;if(n&&o.setAttribute("media",n),a&&btoa&&(e+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),o.styleSheet)o.styleSheet.cssText=e;else{for(;o.firstChild;)o.removeChild(o.firstChild);o.appendChild(document.createTextNode(e))}}var m=null,f=0;function g(o,t){var i,e,n;if(t.singleton){var a=f++;i=m||(m=b(t)),e=s.bind(null,i,a,!1),n=s.bind(null,i,a,!0)}else i=b(t),e=c.bind(null,i,t),n=function(){!function(o){if(null===o.parentNode)return!1;o.parentNode.removeChild(o)}(i)};return e(o),function(t){if(t){if(t.css===o.css&&t.media===o.media&&t.sourceMap===o.sourceMap)return;e(o=t)}else n()}}o.exports=function(o,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===e&&(e=Boolean(window&&document&&document.all&&!window.atob)),e));var i=r(o,t);return l(i,t),function(o){for(var e=[],a=0;a<i.length;a++){var b=n[i[a].id];b&&(b.refs--,e.push(b))}o&&l(r(o,t),t);for(var p=0;p<e.length;p++){var d=e[p];if(0===d.refs){for(var s=0;s<d.parts.length;s++)d.parts[s]();delete n[d.id]}}}}},"OmL/":function(o,t,i){var e=i("xDug");"string"==typeof e&&(e=[[o.i,e,""]]),i("LboF")(e,{insert:"head",singleton:!1}),e.locals&&(o.exports=e.locals)},xDug:function(o,t){o.exports=[[o.i,'@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");@import url(https://fonts.googleapis.com/css?family=Droid+Sans);@import url("https://fonts.googleapis.com/css?family=Hind+Guntur:300,400,500,600,700|Hind+Vadodara:300,400,500,600,700|Hind:300,400,500,600,700");#bIOL .debug{border:1px solid red !important}#bIOL,#bIOL *{box-sizing:border-box !important}#bIOL ul{-webkit-margin-before:0 !important;-webkit-margin-after:0 !important;-webkit-margin-start:0 !important;-webkit-margin-end:0 !important;-webkit-padding-start:0 !important}select::-ms-expand{display:none !important}@font-face{font-family:\'barraiol\';src:url(\'https://cdn.iol.pt/BarraIOL/dist/barraiol.eot?j0zr0i\');src:url(\'https://cdn.iol.pt/BarraIOL/dist/barraiol.eot?j0zr0i#iefix\') format("embedded-opentype"),url(\'https://cdn.iol.pt/BarraIOL/dist/barraiol.ttf?j0zr0i\') format("truetype"),url(\'https://cdn.iol.pt/BarraIOL/dist/barraiol.woff?j0zr0i\') format("woff"),url(\'https://cdn.iol.pt/BarraIOL/dist/barraiol.svg?j0zr0i#barraiol\') format("svg");font-weight:normal;font-style:normal}#bIOL i{font-family:\'barraiol\' !important;speak:none;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}#bIOL .bicon-close:before{content:"\\e904"}#bIOL .bicon-person:before{content:"\\e911"}#bIOL .bicon-notifications:before{content:"\\e90b"}#bIOL .bicon-shop:before{content:"\\e90c"}#bIOL .bicon-logo-nos:before{content:"\\e900"}#bIOL .bicon-check:before{content:"\\e901"}#bIOL .bicon-lock:before{content:"\\e903"}#bIOL .bicon-unlock-alt:before{content:"\\e906"}#bIOL .bicon-select-arrows:before{content:"\\e908"}#bIOL .bicon-social-facebook:before{content:"\\e909"}#bIOL .bicon-google-plus:before{content:"\\e90a"}#cookieComplianceBox{background-color:#000;filter:alpha(opacity=90);-moz-opacity:0.9;-khtml-opacity:0.9;opacity:0.9;height:80px;vertical-align:middle;font:12px \'Droid Sans\', sans-serif !important;width:100%;position:fixed;bottom:0px;display:table;z-index:2147483641}#cookieComplianceBox p{padding:7px 50px 7px 5px;color:#EDEDED;text-align:center;display:table-cell;vertical-align:middle;height:100%}.cookieLink,.cookieLink:hover,.cookieLink:visited{text-decoration:none;color:#3399ff}#close_mcd_cookie{position:fixed;width:50px;right:0px;bottom:0;text-decoration:none;display:block;float:right;overflow:hidden;text-align:center;height:80px;cursor:pointer;-webkit-transition:all 0.5s;transition:all 0.5s;vertical-align:middle}#close_mcd_cookie img{height:auto;width:30px;display:block;margin:25px auto}#bIOL{border-top:solid 2px #06c;border-bottom:solid 1px #999;width:100%;position:relative;background-color:#252525;font-family:"Roboto Condensed",sans-serif;font-size:16px;-webkit-font-smoothing:initial}#bIOL a{color:#06c;background-color:transparent;text-decoration:none}@media (min-width: 1024px){#bIOL a:hover{text-decoration:underline}}@media (min-width: 1025px){#bIOL .hideDesktop{display:none}}#bIOL .biol-login-link{color:#fff}#bIOL p{color:#fff;margin:1em 0;font-family:"Roboto Condensed",sans-serif}#bIOL b{font-weight:800}#bIOL h2{display:block;font-size:16px;margin:0;padding:8px 0 8px 0;font-weight:bold;font-family:"Roboto Condensed",sans-serif}#bIOL .biol-logo{height:32px;width:60px;background-position:center 4px;background-size:55%;font-size:0;text-indent:-999px;overflow:hidden;background-repeat:no-repeat;-webkit-transition:all 0.2s;transition:all 0.2s}#bIOL .biol-email-link{padding:0}#bIOL .biol-email-link .icon_mail{display:block;background-image:url("https://cdn.iol.pt/BarraIOL/images/email.svg");background-position:center;width:34px;height:30px;background-size:20px;background-repeat:no-repeat}#bIOL .biol-email-link span{display:none}@media (max-width: 1024px){#bIOL .biol-email-link span{display:inline-block}}#bIOL .setadown{background-image:url("https://cdn.iol.pt/BarraIOL/images/arrow_down.svg");display:inline-block;background-position:center;background-repeat:no-repeat;margin-left:20px;width:20px;height:32px;position:absolute;top:0;left:50%;padding:0 10px;opacity:0.5}#bIOL .setadown.x{-webkit-transform:rotate(180deg);transform:rotate(180deg)}body.overflow-hidden{overflow:hidden !important;position:fixed !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important}#bIOL .text-error{color:#c3403a}#bIOL .text-warning{color:#c98134}#bIOL .text-success{color:#729b3a}#bIOL .bg-error{background-color:#c3403a}#bIOL .bg-warning{background-color:#c98134}#bIOL .bg-success{background-color:#729b3a}#bIOL .biol-bg-brand{background-color:#06c}#bIOL ul{list-style-type:none;overflow:hidden;height:auto;display:block;text-transform:uppercase;font-size:13px;margin:0;-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;-webkit-padding-start:0}#bIOL ul li{float:left}#bIOL ul li.fl-r{float:right}#bIOL ul li a{display:block;text-align:center;line-height:31px;padding:0 10px;height:32px;-webkit-transition:all 0.2s;transition:all 0.2s;text-decoration:none;color:#ccc}@media (min-width: 1024px){#bIOL ul li a:hover{text-decoration:none}}#bIOL .biol-container{position:relative;margin:60px auto 120px auto;width:460px;padding:25px;color:#141414;font-family:"Roboto Condensed",sans-serif;box-shadow:0 20px 60px rgba(0,0,0,0.6);background-color:#fff}#bIOL .biol-modal,#bIOL .nonio-modal{z-index:9000000;display:block;position:fixed;bottom:0;left:0;right:0;top:34px;color:#fff;padding:20px 0 60px 0;overflow-y:auto;-webkit-overflow-scrolling:touch;background-color:rgba(0,0,0,0.92)}#bIOL a.biol-modal-close,#bIOL a.nonio-modal-close{position:absolute;top:0;right:0;display:block;width:60px;height:60px;line-height:60px;text-decoration:none !important;text-align:center;color:#2e2e2e;font-size:32px}@media (min-width: 1024px){#bIOL a.biol-modal-close:hover,#bIOL a.nonio-modal-close:hover{text-decoration:none !important;color:#141414}}#bIOL .nonio-img{max-width:100px;margin:10px 0}#bIOL .nonio-media img{margin:0 auto;display:block;max-width:200px;max-height:80px;margin-top:15px}#bIOL .nonio-about{text-align:center;padding-top:30px}#bIOL .nonio-about p{text-transform:uppercase !important;line-height:16px}#bIOL .nonio-about .fl_l{float:left;font-size:10px}#bIOL .nonio-about .fl_r{float:right;font-size:10px}#bIOL .nonio-about .nonio-img{margin:0}#bIOL .nonio-modal input,#bIOL .nonio-modal textarea,#bIOL .nonio-modal select,#bIOL .nonio-modal button{font-family:"Roboto Condensed",sans-serif}#bIOL .nonio-container{position:relative;color:#141414;width:100%;max-width:340px;padding:20px 30px;font-family:\'Roboto Condensed\', sans-serif;text-transform:uppercase;margin:10px auto 60px auto;text-align:center;background-color:#fff;box-shadow:0 20px 60px rgba(0,0,0,0.1)}#bIOL .nonio-container p{color:#141414;text-transform:none}#bIOL .nonio-container p a{color:#141414;text-decoration:underline;text-transform:uppercase}#bIOL .nonio-container .biol-btn{color:#fff;text-decoration:none}#bIOL .nonio-container .biol-btn-primary{background-color:#3a3837}#bIOL .nonio-container .biol-btn-default{background-color:#666 !important;border:5px solid red !important}#bIOL .nonio-container .nonio-btn-primary{background:#adadad}@media (min-width: 1024px){#bIOL .nonio-container .nonio-btn-primary:hover{background:#3a3837}#bIOL .nonio-container .nonio-btn-primary:active{background:#141414}}#bIOL .nonio-container .nonio-btn-default{background:#646464}@media (min-width: 1024px){#bIOL .nonio-container .nonio-btn-default:hover{background:#3a3837}#bIOL .nonio-container .nonio-btn-default:active{background:#141414}}#bIOL .biol-btn-link{margin-top:20px}#bIOL [type="submit"][disabled],#bIOL [type="submit"].nonio-btn-primary:disabled,#bIOL [type="submit"].biol-btn-primary:disabled{opacity:.75;background:#646464;border-radius:4px;text-transform:uppercase;width:100%}@media (min-width: 1024px){#bIOL [type="submit"][disabled]:active,#bIOL [type="submit"][disabled]:hover,#bIOL [type="submit"].nonio-btn-primary:disabled:active,#bIOL [type="submit"].nonio-btn-primary:disabled:hover,#bIOL [type="submit"].biol-btn-primary:disabled:active,#bIOL [type="submit"].biol-btn-primary:disabled:hover{opacity:.75;background:#646464}}#bIOL .nonio-bg-light{background-color:#fff}#bIOL .nonio-bg-medium{background-color:#646464}#bIOL .nonio-bg-dark{background-color:#3a3837}#bIOL .feedback{color:#fff;font-weight:200;font-size:14px;padding:10px;margin:10px 0 40px 0;box-shadow:0 20px 60px rgba(0,0,0,0.3);border-radius:2px;text-align:center}#bIOL .biol-btn{display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;border-radius:4px;text-transform:uppercase;width:100%;border:1px solid transparent;padding:8px 12px;font-size:16px;line-height:1.25;-webkit-transition:all .25s ease-in-out;transition:all .25s ease-in-out;text-decoration:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}@media (min-width: 1024px){#bIOL .biol-btn:hover{text-decoration:none;background-color:#000;color:#fff}}#bIOL .biol-btn-block{display:block;width:100%}#bIOL .biol-btn-login{position:relative;text-decoration:none;color:#fff}#bIOL .biol-btn-login i{font-size:26px;line-height:40px}@media (min-width: 1024px){#bIOL .biol-btn-login:hover i{text-decoration:none}}#bIOL .biol-btn-login span{text-decoration:none;text-align:left;padding-left:50px}#bIOL .biol-btn-primary{color:#fff;background-color:#06c}#bIOL .biol-btn-primary:hover{background-color:#004080;text-decoration:none}#bIOL .biol-i{display:inline-block;width:36px;height:36px;vertical-align:baseline}#bIOL .biol-fb{background-color:#fff;-webkit-mask:url("https://cdn.iol.pt/BarraIOL/images/logo_fb.svg") no-repeat 50% 50%;mask:url("https://cdn.iol.pt/BarraIOL/images/logo_fb.svg") no-repeat 50% 50%}#bIOL .biol-gp{background-color:#fff;-webkit-mask:url("#${dir-img}/logo_googleplus.svg") no-repeat 50% 50%;mask:url("https://cdn.iol.pt/BarraIOL/images/logo_googleplus.svg") no-repeat 50% 50%}#bIOL .biol-row{position:relative;display:-webkit-box;display:flex;flex-wrap:wrap}#bIOL .biol-row.biol-form-row{margin-right:-5px;margin-left:-5px}#bIOL .biol-row>[class^=biol-col-]{padding-left:12px;padding-right:12px}#bIOL .biol-col{flex-basis:0;-webkit-box-flex:1;flex-grow:1;max-width:100%}#bIOL .biol-col-6{width:50%;float:right}#bIOL .biol-col-4{width:33.33%;float:right}#bIOL .biol-col-8{width:66.66%;float:right}#bIOL .biol-pd-10{padding:0 10px}@media (min-width: 1025px){#bIOL .biol-sidebar{position:absolute;width:200px;left:-230px;top:-25px}}#bIOL .biol-sidebar .biol-nav{font-size:14px}#bIOL .biol-sidebar .biol-nav li{display:block;float:none}#bIOL .biol-sidebar .biol-nav li.biol-active{background-color:#000}#bIOL .biol-sidebar .biol-nav li.biol-active a{color:#f98100}#bIOL .biol-sidebar .biol-nav li a{text-align:right;color:#fff;padding:10px 20px;height:48px}@media (min-width: 1025px){#bIOL .biol-sidebar .biol-nav li a i{margin-right:10px}#bIOL .biol-sidebar .biol-nav li a:hover{text-decoration:none;background-color:#000;color:#fff}}#bIOL .biol-modal-header{text-align:center}#bIOL .biol-header-logo{max-width:100%;margin:0 auto}#bIOL #biol-menu{max-height:32px}#bIOL #biol-menu.visible{color:#ccc;display:block;height:auto;max-height:800px;-webkit-transition-timing-function:cubic-bezier(0, 1, 0.5, 1);transition-timing-function:cubic-bezier(0, 1, 0.5, 1);-webkit-transition:all 0.5s ease;transition:all 0.5s ease}#bIOL .biol-logout-link{background:#06c;color:#fff !important}@media (min-width: 1025px){#bIOL .biol-logout-link{border-top:solid 1px #000}}@media (max-width: 1024px){#bIOL .biol-logout-link{position:absolute;bottom:-70px;left:0;width:100% !important;text-align:center}}#bIOL #biol-login-wrapper{position:absolute;top:0;right:32px}@media (max-width: 1024px){#bIOL #biol-login-wrapper{right:0}}#bIOL ul#biol-login-wrapper.withoutEmail{right:0px !important}#bIOL .biol-avatar{display:block;width:26px;height:26px;margin-top:3px;float:left;border-radius:50%}@media (min-width: 1025px){#bIOL .biol-avatar{margin-right:10px}}#bIOL .biol-pickavatar{position:relative;display:block;width:128px;height:128px;overflow:hidden;margin:0 auto 16px auto;border:1px solid rgba(0,0,0,0.15)}@media (min-width: 1024px){#bIOL .biol-pickavatar:hover{border:1px solid #06c}#bIOL .biol-pickavatar:hover span{background-color:#06c;color:#fff}}#bIOL .biol-pickavatar img{width:100%}#bIOL .biol-pickavatar span{position:absolute;display:block;width:100%;height:32px;background-color:rgba(0,0,0,0.75);color:#06c;bottom:0;text-align:center;font-size:13px;line-height:32px}#bIOL .username{text-transform:none}@media (max-width: 1024px){#bIOL .username{display:none}}@media only screen and (min-width: 1025px){#bIOL .biol-d-lg-none{display:none !important}#bIOL .mt-lg-2{margin-top:32px}#bIOL .biol-logo{background-color:#0066CC;float:left}#bIOL ul{display:block !important}}@media only screen and (max-width: 1024px){#bIOL .biol-d-md-none{display:none !important}#bIOL .pa-md-r{position:absolute;right:0}#bIOL .visible-lg-down{display:block}#bIOL .hidden-lg-down{display:none}#bIOL .fl-md-r{float:right}#bIOL .biol-logo{float:none;margin:0 auto}#bIOL #biol-menu{display:none}#bIOL #biol-menu li{width:100%}#bIOL #biol-menu li.fl-r{float:none}#bIOL #biol-menu li a{font-size:16px;text-align:left;margin:0;line-height:52px;padding-left:80px;height:48px}#bIOL #biol-menu li.biol-login{background:#373737}#bIOL #biol-menu li.biol-login a{padding-left:20px}#bIOL .biol-container{width:480px;padding:50px 10px 10px 10px;margin-top:60px}#bIOL .biol-sidebar{width:100%;display:block;border:none;padding-right:0;margin-top:-120px;margin-left:-10px}#bIOL .biol-sidebar .biol-nav li{float:left;display:block;width:60px;height:60px;padding:0;margin:0}#bIOL .biol-sidebar .biol-nav li.biol-active{background-color:#fff}#bIOL .biol-sidebar .biol-nav li.biol-active a{color:#000}#bIOL .biol-sidebar .biol-nav li a{width:60px;height:60px;line-height:60px;padding:0;text-align:center}#bIOL .biol-sidebar .biol-nav li a i{font-size:24px;line-height:2.5}}@media only screen and (max-width: 700px){#bIOL .fl-sm-r{float:right}#bIOL .biol-container{width:100%}#bIOL .biol-modal,#bIOL .nonio-modal{padding:20px 15px 60px 15px}}#bIOL .biol-tab-content{display:none}#bIOL .biol-tab-content.current{display:flow-root}#bIOL #biol-tab-subscricoes h4{text-transform:uppercase;font-size:25px;margin:10px;text-align:center}#bIOL #biol-tab-subscricoes .biol-img-subs{width:100%;height:auto}#bIOL #biol-tab-subscricoes .biol-subscricao{margin:25px 0;padding:10px;background-color:#e6e6e6}#bIOL #biol-tab-subscricoes .biol-subscricao p{color:#000}#bIOL #biol-tab-subscricoes .biol-subscricao .biol-subscricao-produto{font-size:24px;font-weight:700;margin-top:0}#bIOL #biol-tab-subscricoes .biol-subscricao-info{width:100%;border-bottom:solid 1px #fff;margin:15px 0;border-collapse:collapse}#bIOL #biol-tab-subscricoes .biol-subscricao-info td{vertical-align:top;padding:3px;border-top:solid 1px #ffffff}#bIOL #biol-tab-subscricoes .biol-subscricao-info td.value{text-align:right}#bIOL #biol-tab-subscricoes .biol-subscricao-info td.ativa{background-color:green;text-align:center;color:#fff}#bIOL #biol-tab-subscricoes .biol-subscricao-info tr.biol-subscricao-prox{background-color:#fff;font-weight:700}#bIOL .rs-login{text-align:center !important}#bIOL .rs-login a{display:inline-block;width:40px;height:40px;margin:6px}#bIOL .rs-login a span{display:none}#bIOL .biol-criar-recuperar{line-height:50px;text-align:left;font-size:12px;display:block}#bIOL .biol-criar-recuperar .biol-recuperar{float:right}#bIOL .biol-criar-recuperar a{color:#333;font-size:14px;display:inline-block}#bIOL hr{display:block;margin:0 auto;border-style:inset;border-top:solid 1px #ccc;height:0;border-bottom:0}#bIOL .biol-alterar-photo{position:absolute;width:100%;height:32px;font-size:13px;text-align:center;bottom:0;border:none;line-height:32px;font-weight:400;background:rgba(255,255,255,0.3);color:#fff;-webkit-transition:all 1s;transition:all 1s;text-shadow:0 2px 2px #000}#bIOL .biol-pickavatar:hover .biol-alterar-photo{background:rgba(0,0,0,0.5);color:#fff;height:100%;line-height:128px}#bIOL .biol-pickavatar img{height:100%}#bIOL .biol-btn-default{background:rgba(128,128,128,0.5);color:#fff;border:none;text-shadow:1px 2px 1px #999}#bIOL .biol-btn-default:hover{background:rgba(128,128,128,0.75)}#bIOL .biol-btn-danger{background:#c3403a;color:#fff}#bIOL .btn-wa{width:auto}#bIOL .visible{display:block !important}#bIOL .hidden{display:none !important}#bIOL .mt-0{margin-top:0}#bIOL .mt-1{margin-top:10px}#bIOL .mt-2{margin-top:20px}#bIOL .mb-0{margin-bottom:0}#bIOL .mb-1{margin-bottom:10px}#bIOL .mb-2{margin-bottom:20px}#bIOL .fl-l{float:left}#bIOL .fl-n{float:none}#bIOL .ta-l{text-align:left}#bIOL .ta-c,#bIOL .text-center{text-align:center}#bIOL .ta-r,#bIOL .text-right{text-align:right}#bIOL .taj{text-align:justify !important}#bIOL .pd-t-0{padding-top:0}#bIOL .pd-t-1{padding-top:10px}#bIOL .fz-9{font-size:12px}#bIOL .fz-8{font-size:11px}#bIOL .fs-8125{font-size:13px}#bIOL .clearfix{display:inline-block}#bIOL .clearfix:after{content:".";display:block;clear:both;visibility:hidden;line-height:0;height:0}#bIOL html[xmlns] .clearfix{display:block}#bIOL * html .clearfix{height:1%}#footer-wrapper *{box-sizing:border-box}#footer-wrapper{font-family:\'Hind\', Arial, Helvetica;-webkit-font-smoothing:antialiased;font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;background-color:#252525}#footer-wrapper a{font-size:14px;color:#fff;text-decoration:none}#footer-wrapper a:hover{text-decoration:underline}#footer-wrapper .footer-top-links{background-color:#373737;color:#fff;text-align:center;box-shadow:0px 0px 32px 0px rgba(0,0,0,0.25);padding:14px 0 4px 0}#footer-wrapper .footer-top-links a{font-size:12px;line-height:14px;display:inline-block;margin-bottom:10px}.footer-top-links li{display:inline-block}.footer-top-links li::after{content:" | ";padding:0 5px;color:#888}.footer-top-links li:last-child::after{content:""}.footer-top-links li a{-webkit-box-decoration-break:clone;-o-box-decoration-break:clone;box-decoration-break:clone}.footer-top-links li a:hover{color:#fff}#footer-wrapper .footer-top-links li a{border-radius:4px;padding:1px 8px 0 8px}#footer-wrapper .footer-top-links li a:hover{background-color:#222222 !important;color:#fff;text-decoration:none}@media screen and (max-width: 600px){.footer-top-links ul{-webkit-column-count:2;-moz-column-count:2;column-count:2}.footer-top-links li{width:100%;padding:4px 10px;text-align:left}.footer-top-links li::after{content:""}}@media screen and (max-width: 460px){.footer-top-links ul{-webkit-column-count:auto;-moz-column-count:auto;column-count:auto}.footer-top-links li{width:100%;padding:4px 10px}}.footer-bottom-links-min{max-width:1280px;margin:40px auto;text-align:center;color:#fff}.footer-bottom-links-min li{display:inline-block;vertical-align:middle}.footer-bottom-links-min li::after{content:" | ";padding:0 10px}.footer-bottom-links-min li:last-child::after{content:"";padding:0}.footer-bottom-links-min a{text-transform:uppercase;-webkit-box-decoration-break:clone;-o-box-decoration-break:clone;box-decoration-break:clone}@media screen and (max-width: 960px){.footer-bottom-links-min{text-align:left;padding:10px}.footer-bottom-links-min ul{-webkit-column-count:3;-moz-column-count:3;column-count:3}.footer-bottom-links-min li{width:100%;padding:5px 10px}.footer-bottom-links-min li::after{content:"";padding:0}}@media screen and (max-width: 640px){.footer-bottom-links-min ul{-webkit-column-count:2;-moz-column-count:2;column-count:2}}@media screen and (max-width: 460px){.footer-bottom-links-min ul{-webkit-column-count:auto;-moz-column-count:auto;column-count:auto}}.footer-bottom-links-max{max-width:1280px;margin:25px auto}.footer-bottom-links-max dl{text-transform:uppercase;width:100%;margin:20px 0}.footer-bottom-links-max dt.footer-section-title{font-size:16px;font-weight:bold;color:#ccc;margin:20px 10px 20px 20px;color:#0071e2;border-left-color:transparent}.footer-bottom-links-max dd{display:block;margin:10px 10px 10px 20px}#footer-wrapper .section-link{color:#999}#footer-wrapper .section-link:hover{color:#fff}.links-large-sizer,.links-large-item{width:16.666666666666666%}@media screen and (max-width: 960px){.links-large-sizer,.links-large-item{width:33.333333333333333%}.links-large-item{border-top:1px solid #444}}@media screen and (max-width: 640px){.links-large-sizer,.links-large-item{width:50%}}@media screen and (max-width: 460px){.links-large-sizer,.links-large-item{width:100%}}.footer-bottom-logos{text-align:center;margin:40px 0}.footer-logos-img{margin:30px 0}.footer-logos-img a{display:inline-block;vertical-align:middle;margin:0 20px}.footer-logos-img img{display:block}.footer-copy{color:#fff;font-size:14px;margin:30px 0}@media screen and (max-width: 420px){.footer-bottom-logos{text-align:left}.footer-bottom-logos a{display:block;margin:20px}.footer-copy{margin:20px}}.clearfix:before,.clearfix:after{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}#bIOL .form-text{font-size:8pt !important;text-align:left !important;padding:4px !important}#bIOL .biol-form-group{color:#000 !important;margin-bottom:10px !important;text-align:left}#bIOL .biol-form-group.biol-col{padding:0 4px !important}#bIOL .biol-form-group label{font-size:16px !important;margin-right:50px}#bIOL .biol-form-group label span{color:#252525 !important}#bIOL .biol-form-group input[type="text"]:disabled{background:#bfbfbf !important;color:#999 !important;border:0 !important;box-shadow:none !important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#bIOL .biol-form-group input[type="text"]:disabled::-moz-selection{background:#bfbfbf}#bIOL .biol-form-group input[type="text"]:disabled::selection{background:#bfbfbf}#bIOL .biol-form-group textarea{resize:vertical !important}#bIOL input{margin:0}#bIOL ::-webkit-input-placeholder{color:#646464 !important;font-size:14px !important;font-style:normal !important;text-transform:uppercase !important}#bIOL :-moz-placeholder{color:#646464 !important;font-size:14px !important;font-style:normal !important;text-transform:uppercase !important}#bIOL ::-moz-placeholder{color:#646464 !important;font-size:14px !important;font-style:normal !important;text-transform:uppercase !important}#bIOL :-ms-input-placeholder{color:#646464 !important;font-size:14px !important;font-style:normal !important;text-transform:uppercase !important}#bIOL .biol-form-item,#bIOL .biol-form-group textarea{width:100% !important;padding:8px 12px !important;font-size:16px !important;line-height:1 !important;color:#252525 !important;background-color:#f0f0f0 !important;background-image:none !important;background-clip:padding-box !important;border:1px solid #ddd !important;border-radius:4px !important;-webkit-appearance:none !important;-moz-appearance:none !important;appearance:none !important}#bIOL .biol-form-item:focus,#bIOL .biol-form-group textarea:focus{border-color:#252525 !important;outline:0 !important}#bIOL .biol-form-password{color:#06c !important}#bIOL select.biol-form-item{height:38px !important;-webkit-appearance:none !important;-moz-appearance:none !important;appearance:none !important;background:#f0f0f0 url("https://cdn.iol.pt/BarraIOL/images/select-bg-dark.png") center right no-repeat !important;background-size:16px !important}#bIOL .biol-form-check{width:100% !important;position:relative !important;margin:0px auto !important}#bIOL .biol-form-check label{text-align:left !important}#bIOL [type="checkbox"],#bIOL [type="radio"]{display:none}#bIOL [type="checkbox"]+label,#bIOL [type="radio"]+label{display:inline-block !important;line-height:1.2 !important;position:relative !important;padding:10px 0 6px 30px !important;min-height:10px !important;font-size:14px !important;text-align:justify !important}#bIOL [type="checkbox"]+label.label-sm,#bIOL [type="radio"]+label.label-sm{font-size:12px !important}@media (min-width: 1024px){#bIOL [type="checkbox"]+label:hover,#bIOL [type="radio"]+label:hover{cursor:pointer}}#bIOL [type="checkbox"]+label{text-transform:none !important}#bIOL [type="checkbox"]+label:before,#bIOL [type="radio"]+label:before{content:"" !important;height:10px !important;width:10px !important;position:absolute !important;left:0 !important;top:8px !important;background-repeat:no-repeat !important;box-sizing:content-box}#bIOL [type="radio"][disabled]+label:before,#bIOL [type="checkbox"][disabled]+label:before{opacity:0.5}#bIOL input.radio[disabled]+label,#bIOL [type="checkbox"][disabled]+label{color:rgba(0,0,0,0.3)}#bIOL [type="checkbox"]:checked+label:after{content:\'\' !important;position:absolute !important;left:3px !important;top:12px !important;width:12px !important;height:5px !important;border-left:3px solid #333 !important;border-bottom:3px solid #333 !important;-webkit-transform:rotate(-45deg) !important;transform:rotate(-45deg) !important}#bIOL [type="checkbox"]+label:before{border:5px solid #ddd !important;background:#ddd !important}#bIOL [type="radio"]:checked+label:before{border:5px solid #fff !important;background:#333 !important}#bIOL [type="radio"]+label:before{background:#eee !important;border:5px solid #fff !important;border-radius:50% !important}#bIOL .biol-btn.apagar{position:relative;color:#dd0000;font-weight:800;border:1px solid #dd0000;padding:4px;width:120px;margin:10px auto;left:calc(50% - 62px)}#bIOL .label-sm.taj{text-align:justify !important}#bIOL .label-input label{font-size:14px !important}\n',"",""]]}},[[3,0]]]);