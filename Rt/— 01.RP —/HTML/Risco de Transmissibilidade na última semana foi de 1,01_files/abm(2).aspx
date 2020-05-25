
// Absolute Banner Manager 
// Copyright(c) XIGLA SOFTWARE - http://www.xigla.com


// Flash Detection
function __xlaABMflash_detect(){

    // Flash detection
   var flashenabled = 0;
    var MM_contentVersion = 6;
    var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
    if ( plugin ) {
    	flashenabled=1
    }  else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		flashenabled = 1;
   }
   return flashenabled;
}
document.write('<scri' + 'pt language="javascript" src="https://xad.dnoticias.pt/absolutebm.aspx?z=11&fl=' + __xlaABMflash_detect() + '&' + Math.random() + '"></script>');
