var DESKTOP_BROWSERS = {
    "edge": {
        "downloadURL": "https://www.microsoft.com/en-us/windows/microsoft-edge",
        "icon": "https://cdn.iol.pt/img/browsers/edge-color.svg"
    }, 
    "chrome": {
        "downloadURL": "https://www.google.com/chrome/browser/desktop/",
        "icon": "https://cdn.iol.pt/img/browsers/chrome-color.svg"
    },
    "firefox": {
        "downloadURL": "http://www.mozilla.org/firefox/new/",
        "icon": "https://cdn.iol.pt/img/browsers/firefox-color.svg"
    }
    
}

function outdatedCSS() {
    var head  =document.head;
    var style =document.createElement("style");
  
    style.innerHTML = "@import url('https://fonts.googleapis.com/css?family=Roboto');#outdated-browser, #outdated-browser *{box-sizing:border-box;font-family:'Roboto',sans-serif!important;}"
    +"#outdated-browser {text-align:center; background:#ddd;padding:32px;font-family:'Roboto', sans-serif}"
    +"#outdated-browser .closeIEWarning {text-align:center;}"
    +"#outdated-browser .closeIEWarning img {height:30px; width:30px}"
    +"#outdated-browser h2 {color:#333;line-height:36px;font-size:36px;padding:16px 0} #outdated-browser h3 {color:#333;line-height:16px;font-size:16px;padding:0;padding-bottom:8px;text-align:center} "
    +"#outdated-browser .browser {display:inline-block;width:100px;height:172px;padding:16px;margin:16px 8px 0 8px;text-align:center;text-transform:uppercase;font-size:16px;font-family:'Roboto', sans-serif} #outdated-browser .browser:hover{background:#eee}"
    +"#outdated-browser .browser img{margin-bottom:16px;width:68px;height:68px;}"
    +"#outdated-browser .instalar{line-height:16px;font-size:11px;color:#fff;background:#555;display:block;width:100%;padding:6px 4px;margin:0;} #outdated-browser .browser:hover .instalar{background:#333}"
    +"@media only screen and (max-width: 640px) {"
    +"#outdated-browser .browser {width:96px;height:172px;}"
    +"#outdated-browser .browser img{width:64px;height:64px;}"
    +"#outdated-browser .instalar {font-size:10px}"
    +"}"
    +"@media only screen and (max-width: 400px) {"
    +"#outdated-browser .browser {width:100%;height:inherit;font-size:14px}"
    +"#outdated-browser .instalar {font-size:10px}"
    +"#outdated-browser .browser img{width:64px;height:64px}}"
    +"#outdated-browser button.out-browser-button {border:0;background-color:#0091c8;color:#fff;margin-top:20px;padding:6px 16px;font-size:18px;text-transform:uppercase;box-shadow:0px 6px 12px rgba(0,0,0,.15);cursor: pointer}";
    head.appendChild(style);
}

function getCookieByName (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
}


function setCookie(){
    var now = new Date();
    var d = new Date();
    d.setDate(d.getDate());
    d.setHours(24, 59, 59);
    var expires = ";expires=" + d.toGMTString();  
    document.cookie = "outDatedCookie=Sim"+expires+";path=/";
}

/**
    * Valides the browser
    * Validates if it is a valid the browser (not valid: IE)
    */

function closeIEWarning() {
    setCookie();
   $("#outdated-browser").remove();
}


function addDivWithInfo(obj) {

    if(!window.jQuery){
		script = document.createElement("script");
	    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
	    script.type = 'text/javascript';

	    document.getElementsByTagName("head")[0].appendChild(script);
	}


    outdatedCSS();

    $("body").prepend("<div id='outdated-browser'></div>");
    var html = "<h2>Está a utilizar um browser desatualizado.</h2>" +
        //  "<h3>Isto significa que algumas funcionalidades podem não ter o resultado expectável, " +
        "<h3>O seu navegador não lhe permite a melhor experiência neste site. Recomendamos que instale um dos seguintes navegadores para poder tirar o melhor partido dos nossos conteúdos. Obrigado.</h3></div><div class='suggested-browsers'>";

    for (var browser in obj) {
        html += '<div id="' + browser + '" class="browser">' +

            '<a href="' + obj[browser].downloadURL + '" target="_blank" class="download" style="">' +
            '<img src="' + obj[browser].icon + '" alt="' + browser + '"  style=""/>' +
            '<h3>' + browser + '</h3>' +
            '<div class="instalar">instalar</div>' +
            '</a>' +
            '</div>';
    }

    html += "</div><div class='closeIEWarning'><button class='out-browser-button' onclick='closeIEWarning()'> Ok, eu compreendi </button></div><div>";

    $("#outdated-browser").html(html);
}

function isAValidBrowser() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return false;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return false;
    }

    // other browser
    return true;

}


$(document).ready(function () {  
    var isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    if(!getCookieByName("outDatedCookie")){
        if (!isAValidBrowser() && !isMobile && !getCookieByName("outDatedCookie")) {
            addDivWithInfo(DESKTOP_BROWSERS);
        }
    }   


    
});