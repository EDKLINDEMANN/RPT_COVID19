function getGigyaApiKey() {
    let gigyaApiKeys = new Map();
    gigyaApiKeys.set('localhost', '3_zx4G3-qClULLsApo-hbeiJ_qfoVLsA7NxPgMgcJhrCxM0vSHHvw-TKOC0Kx4qdO2');
    gigyaApiKeys.set('runspec.com', '3_zx4G3-qClULLsApo-hbeiJ_qfoVLsA7NxPgMgcJhrCxM0vSHHvw-TKOC0Kx4qdO2');
    gigyaApiKeys.set('iol.pt', '3_oTkfUCZDoU_1PAIlnCN14iyJAdTwDWmHJC3iJW3WZOnEvgc5oDyjr3e2wsDwzwzu');
    gigyaApiKeys.set('nit.pt', '3_kKl9f7kvN6lFtE2Byywq6sR-hcTygsyiMNZ6ESiAbPalkcitShJi5SXiXOYHXoHL');

    // calculate base domain
    const parts = document.location.hostname.split('.');
    let tld = '';
    if (parts.length >= 2) {
        let count = 0;
        while (count < 2) {
            tld = '.' + parts[parts.length - count - 1] + tld;
            count++;
        }
        if (tld.charAt(0) === '.') tld = tld.substring(1);
    }
    tld = tld || document.location.hostname;

    // get gigya key from the dictionary
    let key = null;
    if (gigyaApiKeys.has(tld)) key = gigyaApiKeys.get(tld);
    if (!key) key = gigyaApiKeys.get('iol.pt'); // use default

    return key;
}

(function () {
  try {
    if (sessionStorage) {
      let vc = Number(sessionStorage.getItem('__vc') || 0);
      vc = vc + 1;
      sessionStorage.setItem('__vc', vc.toString());
    }
  } catch(e) { }
})();

var iol_bar_loaded = false;
(function () {

  if (!iol_bar_loaded) {
    iol_bar_loaded = true;

    // enable gigya SSO (https://developers.gigya.com/display/GD/Blocked+Third-Party+Cookies)
    window.__gigyaConf = {
      enableSSOToken: true
    };

    document.currentScript = document.currentScript || (function () {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();

    function getQueryParameter(param) {
        var reg = new RegExp( '[?&]' + param + '=([^&#]*)', 'i' );
        var value = reg.exec(document.currentScript.src);
        return value ? value[1] : null;
    };

    var replaceUrl = getQueryParameter('replaceURL');
    if (replaceUrl) window['iolOverrideBarUrl'] = replaceUrl;

    var e = document.createElement('app-iol-bar');
    e.id = "barraIOL";
    window.document.body.insertAdjacentElement("afterbegin", e);

    document.addEventListener("DOMContentLoaded", function (event) {
      var scriptElement = document.createElement("script");
      scriptElement.innerText = "(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'}); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-WK2B3GD');";
      document.getElementsByTagName('head')[0].appendChild(scriptElement);
    });

    // must load in order
    var appScripts = [
      "https://cloud.weborama.design/nonio.js", // DMP Weborama
      "https://cdns.gigya.com/js/gigya.js?apiKey=" + getGigyaApiKey(), // GIGYA script for SSO
      // barraIOL app following
      "https://cdn.iol.pt/BarraIOL/dist/runtime-es2015.js",
      "https://cdn.iol.pt/BarraIOL/dist/polyfills-es2015.js",
      "https://cdn.iol.pt/BarraIOL/dist/styles-es2015.js",
      "https://cdn.iol.pt/BarraIOL/dist/main-es2015.js"
    ];

    function loadScript(appScripts, index) {

      if (index >= appScripts.length) return;

      var script = document.createElement('script');
      if (appScripts[index].indexOf('weborama.design/nonio.js') >= 0) {
        script.setAttribute('collect', '');
        script.setAttribute('wam_label', 'MCD');
        script.setAttribute('wam_id', '7859');
      }
      script.onload = function () {
        loadScript(appScripts, index + 1);
      };
      script.onerror = function () {
        console.log('IOL: Failed startup loading script (' + appScripts[index]+ ')');
        loadScript(appScripts, index + 1);
      };
      script.src = appScripts[index];
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    loadScript(appScripts, 0);
  }

})();
