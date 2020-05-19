var adUnit = "/1111242/zap_lateral_topo_300x250";
var currentAdUnit=undefined;

if(adUnit == "/1111242/zap_lateral_topo_300x250" && top.window.getDevice() == "phone") {
	currentAdUnit = "inline-mrec"
} else if(adUnit == "/1111242/zap_lateral_topo_300x250") {
	currentAdUnit = "mrec-lateral-topo"
}

if(adUnit == "/1111242/zap_lateral_fundo_300x250" && top.window.getDevice() == "phone") {
	currentAdUnit = "content-footer-mrec"
} else if(adUnit == "/1111242/zap_lateral_fundo_300x250") {
	currentAdUnit = "mrec-lateral-fundo"
}


var tkeys = top.googletag.pubads().getTargetingKeys();
var targeting = {isPassback:true};

if(currentAdUnit && top.window.hbTargeting){
	targeting = top.window.hbTargeting[currentAdUnit];
	targeting.isPassback=true;
}
tkeys.forEach(function(el){
	targeting[el] = top.googletag.pubads().getTargeting(el);
});

//prepare full targeting string for new passback
var targetingString=""
for (var key in targeting) {
    if(targeting.hasOwnProperty(key)){
        var values = targeting[key]
        if(Array.isArray(values)){
            values = values.join('","')
        }
        targetingString+='.setTargeting("'+key+'",["'+values+'"])'
    }
}

top.googletag.pubads().setTargeting(targeting)
//document.write("<scri"+"pt type='text/javascript' src='https://www.googletagservices.com/tag/js/gpt.js'> googletag.pubads().definePassback('/1111242/zap_lateral_topo_300x250', [[300,250],[300,600]]).updateTargetingFromMap("+JSON.stringify(targeting)+").display(); </scr"+"ipt>");
document.write("<scr"+"ipt async src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'></scr"+"ipt> <div id='passback'> <scr"+"ipt> window.googletag = window.googletag || {cmd: []};  googletag.cmd.push(function() { googletag.defineSlot('/1111242/zap_lateral_topo_300x250', [[300,250],[300,600]], 'passback')"+targetingString+".addService(googletag.pubads());googletag.pubads().set('page_url', '"+window.location+"');googletag.enableServices();googletag.display('passback'); });</scr"+"ipt></div>");

function calculateHeight(input) {
    var margin=20;
    if(input < 250+margin) {
        console.log("[DEBUG]:"+window.name+" - m.");
        return 250;
    } else {
        console.log("[DEBUG]:"+window.name+" - h.");
        return 600;
    }
}
//resize iframe
window.onload = function(){
    console.log("Loaded")
    setTimeout(function(){
        console.log("Starting")

        var gptMinHeight = undefined;
        var gptDivs = [];

        //select the iframe from the parent context identified by this passbacks' window.name
        var adFrame = top.document.querySelector("iframe[id='"+window.name+"']") || top.document.querySelector("iframe[id*='"+window.name+"']");
        // find our ad divs
        AdSenseads = document.querySelectorAll("div[id*='google']");
        GPTads = document.querySelectorAll("div[id*='gpt']");
        CriteoAds = document.querySelectorAll("div[id*='criteo_slot']");

        

        //get querySelectorAll results as an array regardless.
        var gpt = [].slice.call(GPTads);
        var ads = [].slice.call(AdSenseads);
        var criteo = [].slice.call(CriteoAds);

        var bothAds = [];
        var adHeights =  [];

        //merge the divs found earlier
        var gptDivs = bothAds.concat(gpt,ads,criteo);
        
        //loop through the iframes and only keep iframes that actually have a size
        gptDivs.forEach(function(current,index){
            //only keep div heights that have a size greater than 0
            if(current.offsetHeight > 0){
                adHeights.push(current.offsetHeight);
            }
        });

        //Get the maximum value of the heights array
        if(adHeights.length>0){
            // we have sizes
            gptMinHeight = adHeights.reduce(function(prev,current){
                return Math.max(prev,current)
            });
        } else {
            //gptMinHeight= 250;
            if(adFrame){
            }
        }

        //resize the parent iframe if larger than current ads
        if(typeof(gptMinHeight != 'undefined')) {
            if(adFrame && gptMinHeight > 0){
                adFrame.height = calculateHeight(gptMinHeight)
            }
        }

    },1000);
};
