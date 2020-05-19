/*
Author: Carl Campos
Created On: 01/06/2015
Last Update: 11/14/2019
Script Name: PL_AddCSS_NCM.js
Script URL: http://ds.serving-sys.com/BurstingRes/CustomScripts/PL_AddCSS_NCM.js

11/27/2015 - Rey: Updated the getAdElemID function to use the placeholderID for the bannerdivparent selector.
11/14/2019 - Added bannerdivhtml5 selector

Examples:
(multiple CSSs for different browsers)
http://ds.serving-sys.com/BurstingRes/CustomScripts/PL_AddCSS_NCM.js?css1=body%7Bmargin-top%3A50px%21%7D&brow1=ie&css2=bannerdiv%7Bleft%3A50%25%21%3Bmargin-left%3A-200px%21%7D&brow2=ff&css3=img%7Bbackground%3Aurl%28%22http%3A//someimg.com/img.jpg%22%29%21%7D&brow3=ch

(z-index CSS)
http://ds.serving-sys.com/BurstingRes/CustomScripts/PL_AddCSS_NCM.js?css1=div%23eyeDiv%7Bz-index%3A99999%21%7D

(event-based CSS)
http://ds.serving-sys.com/BurstingRes/CustomScripts/PL_AddCSS_NCM.js?css1=div%23eyeDiv%7Bz-index%3A99999%21%7D&event1=after-expand[panel1]



Parameters:
-- css1 [string][required] = CSS code to place on the page
 Example:
   eyeDiv{position:relative!}
   paneldiv[panel1]{left:50%!;margin-left:-450px!}paneldiv[panel2]{left:50%!;margin-left:200px!}
-- target1 [string][optional] =  target window on which to place the CSS. if not specified, defaults to the window where the ad is placed (or adwindow).
 Values: top, parent, iframe, adwindow
-- brow1 [string][optional] = browser on which to activate the CSS. if not specific, defaults to 'all' browsers.
 Values: ch, ff, sa, ie, op
-- flash1 [string][optional] = add the CSS only if Flash is installed/enabled.
 Values: true, false
-- event1 [string][optional] = Event name and its timing to attach to. If not specified, CSS is not tied to any event.
                               "Panel name" is required for expand and collapse events.
 Supported Events:
   expand
   collapse
 Example:
   before-collapse[panel1]
   before-expand[panel1]
   after-collapse[panel1]
   after-expand[panel1]
   ontime-collapse[panel1]
   ontime-expand[panel1]
-- inline1 [boolean][optional] = true or false; whether the CSS is inline or embedded. Defaults to false.
 Values: true, false

-- delay1 [string][optional] = add a delay (milliseconds) to adding the CSS. Defaults to no delay.
 Example:
   3000 = 3 seconds
   500  = half a second

-- urlbound1 [string][optional] = Used when some placements run on multiple site pages but we want the CSS to run only on 1 of those pages. You can add the URL here.


Notes:
** A script combining the functions/fixes collected from 70+ different CSS scripts.
** The parameters must be added in the URL.
** URL-escape the CSS parameters (css1, css2).
** The parameters names (css1, target1, etc) must be in lower case.
** Supports In-line CSS (but you still need to write the CSS in embedded form).
** Supports event-based CSS (only a selected few events). Please contact the author if you wish for some events to be added.
** ! is converted to !important.
*/

if(typeof(ebIndx) === "undefined") {
	var ebIndx;
	ebIndx=1;	
}

if (typeof String.prototype.toCamel !== 'function') {
  String.prototype.toCamel = function(){
    return this.replace(/[-_]([a-z])/g, function (g) { return g[1].toUpperCase(); })
  };
}

(function(){
	var cAdID = window.ebAdID;
	var cRand = window.ebRand;
	var ebAd;
	var customJSVars;
	var adIndx = [];
	
	function ebGetQuery(){
		var fileName = "PL_AddCSS_NCM.js";
		var lastQuery = "";
		var srcRegex = new RegExp(fileName.replace('.', '\\.') + '(\\?.*)?$','i');
		var scripts = document.getElementsByTagName("script");
		for(var i=0;i<scripts.length;i++){
			var script = scripts[i];
			if(script.src && script.src.match(srcRegex)){
				var query= script.src.match(/\?([^#]*)(#.*)?/);
				lastQuery = !query ? "" : query[1];
			}
		}
		var q=lastQuery.split('&');
		var gEbQuery=[];
		for(var i=0;i<q.length;i++){
			var qs=q[i].split('=');
			gEbQuery[qs[0]]=unescape(qs[1]);
		}
		return gEbQuery;
	}

	/*
	** Notice for some ad formats, EBG is quite late. We wait for EBG.
	*/
	function captureAd(){
		if(typeof(EBG) === "object") {
			var adsList = EBG.ads;
			for(i in adsList) {
				if(i == cAdID + "_" + cRand) {
					ebAd = adsList[i];
					return;
				}
			}
		}
		setTimeout(captureAd);
	}
	captureAd();
	
	/*
	** Load all of 'em CSS's
	*/
	function propagate() {
		if(typeof(ebAd) !== "undefined"){
			customJSVars = loadJSVars(ebAd);
			for(var i = 0; i < adIndx.length; i++) {
				var n = adIndx[i];
				var d = parseInt(customJSVars['delay'+n]);				
				var e = customJSVars['event'+n];
				if(e.length > 0) {
					if(eventIsValid(e)) {
						subscribeCSStoEvents(n);
					}
				}
				else {
					startCSS(n,d);
				}
			}
			return;
		}		
		setTimeout(propagate);
	}
	propagate();
	
	/*
	** Subscribe to events
	*/
	function subscribeCSStoEvents(i) {	
		var d = parseInt(customJSVars['delay'+i]);	
		var e = customJSVars['event'+i].split("-");
		var eTm = e[0];
		var eNm = e[1].split("[")[0];
		var ePnl = e[1].split("[")[1].split("]")[0];		
		var evtSubscription;
		
		evtSubscription = new EBG.Events.EventSubscription( eNm.toUpperCase() , function(e) {
			if(ePnl == e.eventData.props.panel.name) {
				startCSS(i,d);
			}
		});
		evtSubscription.timing = eTm.toUpperCase();
		
		EBG.eventMgr.subscribeToEvent(evtSubscription);
	}
	
	/*
	** Load and flatten customJSVars
	*/
	function loadJSVars(adObj) {
		//var js = adObj._adConfig.customJSVars;
		var js = ebGetQuery();
		var newvars = Object();
		var keys = ['css','target','brow','flash','event','inline','delay','urlbound'];
		for(i in js) {
			if(i.toLowerCase().indexOf('css') != -1) {
				var num = i.toLowerCase().split('css')[1].trim();
				if(num.length > 0) {
					adIndx.push(num);
				}
			}
		}		
		for(var i = 0; i < adIndx.length; i++) {
			for( var j=0; j < keys.length; j++) {
				var key = keys[j]+''+adIndx[i];
				if(keys[j] == 'css') {
					js[key] = js[key] ? parseCSS(js[key].toString()) : "";
				}
				else {
					js[key] = js[key] ? js[key].toString().trim().toLowerCase() : "";
				}
				newvars[key] = js[key];
			}
		}
		return newvars;
	}
	
	/*
	** Bulk of the CSS script
	*/
	function addCSS(i){
		if(typeof(i) === "undefined") return;
		
		var css = customJSVars['css'+i];
		var target = customJSVars['target'+i];
		var brow = customJSVars['brow'+i];
		var flash = customJSVars['flash'+i];
		var event = customJSVars['event'+i];
		var inline = customJSVars['inline'+i];
		var urlbound = customJSVars['urlbound'+i];
		
		if(flash == "true" && !flashEnabled()) return;
		if(brow.length > 0 && !showOnBrowser(brow)) return;
		if(urlbound.length > 0) {
			if(getParentPageURL().indexOf(urlbound) == -1) {
				return;
			}
		}
		
		var doc;
		if(target == 'top') {
			doc = top.document;
		}
		else if(target == 'iframe') {
			doc = window.document;
		}
		else if(target == 'parent') {
			doc = parent.document;
		}
		else {
			doc = EBG.adaptor.getDisplayWin().document;
		}
		
		if(inline == "true") {
			applyInlineCSS(css, doc);
		}
		else {
			var styleEl = doc.createElement("style");	
			styleEl.type = "text/css";
			styleEl.id = "ebStyle"+ebIndx;
			if (styleEl.styleSheet) {
				styleEl.styleSheet.cssText = css;
			}
			else {
				styleEl.appendChild(doc.createTextNode(css));
			}
			doc.getElementsByTagName("head")[0].appendChild(styleEl);
			ebIndx++;
		}
	}
	
	/*
	** Add some delay
	*/
	function delayCSS(i,d) {
		setTimeout( function() {
			addCSS(i);
		}, d);
	}
	
	/*
	** Whether to add delay or not
	*/
	function startCSS(i,d){
		if(d > 0) {
			delayCSS(i,d);
		}
		else {
			addCSS(i);
		}
	}
	
	/*
	** Make the CSS page-add-ready
	*/
	function parseCSS(css){
		var elArr = ['stdbannerdiv','stdbannerflash','banneriframe','banneriframediv','bannerdivparent','bannerdivhtml5','bannerdiv','bannerflash','paneldiv','panelflash','blankimg','defaultimg'];
		var cssArr = [];	
		var cssH = true;
		var cssB = false;
		var curH = "";
		var curB = "";

		for(var i = 0; i < css.length; i++) {
			if(css[i] == "{") {
				cssH = false;
				cssB = true;
			}
			else if(css[i] == "}") {
				cssH = true;
				cssB = false;				
				curH = curH.split(",");
				for(var k = 0; k < curH.length; k++) {
					for(var j = 0; j < elArr.length; j++) {
						if(curH[k].indexOf(elArr[j]) != -1) {
							if(elArr[j].indexOf("panel") != -1) {
								var panel = "";
								panel = curH[k].split("[")[1].split("]")[0];
								curH[k] = curH[k].replace("["+panel+"]","");
							}
							curH[k] = curH[k].replace(new RegExp(elArr[j],"g"),getAdElemID(elArr[j], panel));
						}
					}
				}
				curH = curH.join(",");
				cssArr.push( curH + "{" + curB + "}" );				
				curH="";
				curB="";
			}
			else {
				if(cssH) curH += css[i];
				else if(cssB) curB += css[i];
			}			
		}		
		if(cssArr.length > 0) {
			css = cssArr.join("").replace(new RegExp("!","g"),"!important");
		}		
		return css;
	}
	
	/*
	** The utility functions
	*/
	function getAdElemID(h, panel) {
		
		switch(h) {
			case "bannerdivparent": 
				h = (typeof(ebAd) !== "undefined") ? "div#"+ebAd._adConfig.placeHolderId : "div#ebDiv"+cRand; 
				break;
			case "bannerdivhtml5": h = "div#ebBannerDiv_"+cAdID+"_"+cRand; break;
			case "bannerdiv": h = "div#ebRichFlashBannerDiv_0_"+cAdID+"_"+cRand; break;
			case "bannerflash": h = "#ebRichBannerFlash_"+cAdID+"_"+cRand; break;
			case "stdbannerdiv": h = "div#ebStdBannerDiv_"+cAdID+"_"+cRand; break;
			case "banneriframediv": h = "div#ebIframeDiv_"+cAdID+"_"+cRand; break;
			case "banneriframe": h = "iframe#ebBannerIFrame_"+cAdID+"_"+cRand; break;
			case "stdbannerflash": h = "#ebStdBannerFlash_"+cAdID+"_"+cRand; break;
			case "paneldiv": h = "div[id^='ebAd"+cAdID+"_"+panel+"_div_']"; break;
			case "panelflash": h = "[id^='ebAd"+cAdID+"_"+panel+"_asset_']"; break;
			case "blankimg": h = "img#ebBlankImg_"+cAdID+"_"+cRand; break;
			case "defaultimg": h = "img#ebDefaultImg_"+cAdID+"_"+cRand; break;
		}
		return h;
	}
	function showOnBrowser(brow) {
		var cb = new Array();
		if(!!(window.opera && window.opera.version)) cb.push('op');
		if(testCSS('MozBoxSizing')) cb.push('ff');
		var isSafari = false;
		if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
			isSafari = true;
			cb.push('sa');
		}
		if(!isSafari && testCSS('WebkitTransform')) cb.push('ch');
		var isIE = /*@cc_on!@*/false || testCSS('msTransform');
		if(isIE) cb.push('ie');
		function testCSS(prop) {
			return prop in document.documentElement.style;
		}
		for(var i = 0; i < cb.length; i++) if(brow.indexOf(cb[i]) != -1) return true;
		return false;
	}
	function applyInlineCSS(css, doc) {
		var cssH = true;
		var cssB = false;
		var curH = "";
		var curB = "";

		for(var i = 0; i < css.length; i++) {
			if(css[i] == "{") {
				cssH = false;
				cssB = true;
			}
			else if(css[i] == "}") {
				cssH = true;
				cssB = false;
				
				var elObjs = doc.querySelectorAll(curH);
				for(var j = 0; j < elObjs.length; j++) {
					try {
						elObjs[j].style.cssText = curB;
					}
					catch(e){}
				}

				curH="";
				curB="";
			}
			else {
				if(cssH) curH += css[i];
				else if(cssB) curB += css[i];
			}			
		}	
	}	
	function flashEnabled() {
		var fIE;
		var fCheck;
		try { fIE = (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) !== false) }
		catch (e) {	fIE = false; }
		try { fCheck = ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || fIE); }
		catch (e) {}
		return fCheck;
	}	
	function getParentPageURL(){
		var pURL;
		if(window.self == window.top) {
			pURL = window.location.href;
		}
		else {
			var ref = window.document.referrer;
			if(ref.length > 0)
				pURL = ref;
		}
		return pURL;
	}
	function eventIsValid(e){
		var isValid = false;
		var eTm = "";
		var eNm = "";
		var ePnl = "";
		if(e.length > 0) {
			e = e.split("-");
			if(e.length == 2) {
				eTm = e[0];
				eNm = e[1].split("[")[0];
				ePnl = e[1].split("[")[1].split("]")[0];
			}
			if(eTm.length > 0 && eNm.length > 0 && ePnl.length > 0) {
				isValid = true;
			}
		}
		return isValid;
	}
})();