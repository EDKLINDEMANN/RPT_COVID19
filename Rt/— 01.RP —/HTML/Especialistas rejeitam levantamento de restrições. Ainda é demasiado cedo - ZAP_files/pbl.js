//Xaxis Passback Lookup
var passback = (document.querySelector('script[src^="https://www.aeiou.pt/billboard_passback.js"]')? true : false);
top.window.billboard_xaxis = !passback;
top.window.bbSize = [0,0];
console.log("pb:",passback);
if (passback == true) {
	top.window.billboard_passback = passback;
	// query for AdX ads
	adxDom = document.querySelector("div[id^=google]") || document.querySelector("div[id^=gpt]");
console.log("adxdom",adxDom);
top.window.cenas = adxDom;
	adxAd = (adxDom?true:false);
//	adxAd = (document.querySelector("div[id^=google]")?true:false);
	top.window.billboard_adx_ad = adxAd;
	if(adxAd){
		if(adxDom.hasChildNodes()){ //only resize if div isn't empty
			console.info("Google Ad Found");
			top.window.bbSize[0] = adxDom.offsetWidth;
			top.window.bbSize[1] = adxDom.offsetHeight;
		console.log("bbSize",top.window.bbSize);
			var billboard = top.document.querySelector("#billboard"); 
			var billboardIframe = billboard.querySelector("iframe");

			console.log(billboard, billboardIframe);

			billboardIframe.style.width= adxDom.offsetWidth;
			billboardIframe.style.height= adxDom.offsetHeight;

			billboard.style.width=adxDom.offsetWidth;
			billboard.style.height=adxDom.offsetHeight;
	//		billboard.style.height = "250px";
	//		billboard.style.display = "block";
			
			if(adxDom.querySelector("iframe")){ // work with the iframes' sizes. TODO: fallback to other element defined sizes if there is no iframe inside the div
				top.window.bbSize[0]=adxDom.querySelector("iframe").width 
				top.window.bbSize[1]=adxDom.querySelector("iframe").height
			}		
/*			if(document.domain == "zap.aeiou.pt" || top.document.domain == "zap.aeiou.pt"){
				top.window.bbSize[0]=970
				top.window.bbSize[1]=250
			}*/
		}
	} else {
		if(top.window.nocollapse){
			if (top.document.domain == "zap.aeiou.pt" || document.domain == "zap.aeiou.pt"){
		        	var billboardWrapper = top.document.querySelector("#billboardWrapper");
		                billboardWrapper.style.height = "90px";
		                billboardWrapper.style.display = "block";
			}
			
			var billboard = top.document.querySelector("#billboard"); 
			billboard.style.height = "90px";
			billboard.style.display = "block";
		} else {
			console.log("ad collapsed");
			var billboard = top.document.querySelector("#billboardWrapper") || top.document.querySelector("#billboard");
			billboard.style.height = "0px";
			billboard.style.display = "none";
		}
	}
} else {
	console.log("xaxis got the impression");
	top.window.bbSize[0] = 970;
	top.window.bbSize[1] = 250;
	var billboard = top.document.querySelector("#billboard");
	billboard.style.height = "250px";
	if (top.document.domain == "bla.aeiou.pt" || document.domain == "bla.aeiou.pt"){
		var billboardWrapper = top.document.querySelector("#billboardWrapper");
		var blaLogo = top.document.querySelector(".blalogo");
		blaLogo.style.top ="265px";
		billboard.style.height = "250px";
		billboardWrapper.style.height ="275px";
		//hide sidebar
		window.setTakeover();
	}
/*	if (top.document.domain == "zap.aeiou.pt" || document.domain == "zap.aeiou.pt"){
                var billboardWrapper = top.document.querySelector("#billboardWrapper");
		console.log(billboardWrapper);
		billboardWrapper.style.height = "250px";
		billboardWrapper.style.display = "block";
	}*/
}
