
 sizes ="[728,90],[970,250]";
switch (document.domain){
        case "zap.aeiou.pt":
         expandable = "zap_970x250";
	 sizes="[970,250]";
        break;
        case "tube.aeiou.pt":
         expandable = "tube_970x250";
        break;
        case "aeiou.pt":
         expandable = "aeiou_hp_970x250";
        break;
        case "www.aeiou.pt":
         expandable = "aeiou_hp_970x250";
        break;
        case "www.futebol365.pt":
        case "futebol365.pt":
         expandable = "futebol365_billboard_970x250";
         sizes="[970,250]";
        break;
}
var tkeys = top.googletag.pubads().getTargetingKeys();
var targeting = {isPassback:true}
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

//document.write ("<scr"+"ipt src='https://www.googletagservices.com/tag/js/gpt.js'>googletag.pubads().definePassback('/1111242/"+expandable+"', ["+sizes+"]).updateTargetingFromMap("+JSON.stringify(targeting)+").display();</scr"+"ipt>");

document.write("<scr"+"ipt async src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'></scr"+"ipt> <div id='passback'> <scr"+"ipt> window.googletag = window.googletag || {cmd: []};  googletag.cmd.push(function() { googletag.defineSlot('/1111242/"+expandable+"', ["+sizes+"], 'passback')"+targetingString+".addService(googletag.pubads());googletag.pubads().set('page_url', '"+window.location+"');googletag.enableServices();googletag.display('passback'); });</scr"+"ipt></div>");
