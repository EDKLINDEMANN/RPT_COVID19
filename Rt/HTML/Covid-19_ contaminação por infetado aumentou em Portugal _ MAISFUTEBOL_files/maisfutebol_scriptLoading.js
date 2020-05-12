var loadingModule = (function ($, window, document) {

    var scripts = {
        "head": [{
            "elementID": "head",
            "scripts": [
                {
                    "name": "Load Scripts necessary to scripts bellow",
                    "value": "<script data-cookies='true' type='text/javascript' src='https://cdn.iol.pt/js/utils/loadScripts.js'></script>"
                }, {
                    "name": "Script de Cookies",
                    "value": "<script data-cookies='true' type='text/javascript' src='https://cdn.iol.pt/utils/BarraCookie/js/cookieBar.js'></script>"
                },
                {
                    "name": "Script para bloqueio do IE",
                    "value": "<script data-cookies='true' type='text/javascript' src='https://cdn.iol.pt/js/utils/BrowserBlocking/outdatedbrowser.js'></script>"
                },
                {
                    "name": "Script para disparar eventos caso a origem não seja redes sociais",
                    "value": "<script type='module' src='https://cdn.iol.pt/js/utils/EventEmitterScript/index.js'></script>"
                }
            ]
        }],
        "body": {},
        "footer": [
            {
                "elementID": "#maisfutebol-footer-external-scripts",
                "scripts": [
                    {
                        "name": "Learning Tags",
                        "value": "<!-- Begin ContainR -->" +
                            "<script type='application/javascript'>!function(n,t,a,i){n.mpfContainr||(n.mpfContainr=function(){a.push(arguments)},mpfContainr.q=a,(i=t.createElement('script')).type='application/javascript',i.async=!0,i.src='//cdn.mookie1.com/containr.js',t.head.appendChild(i))}(window,document,[]);" +
                            "mpfContainr('V2_7901',{'host': 'pt-gmtdmp.mookie1.com', 'tagType': 'learn','src.rand': '[timestamp]', 'src.id' : 'MaisFutebol' });" +
                            "</script>" +
                            "<noscript>" +
                            "<iframe src='//pt-gmtdmp.mookie1.com/t/v2?tagid=V2_7901&isNoScript&src.rand=[timestamp]&src.id=MaisFutebol' height='0' width='0' style='display:none;visibility:hidden'></iframe>" +
                            "</noscript>" +
                            "<!-- End ContainR -->"

                    },
                    {
                        "name": "Learning Tags2",
                        "value": "<!-- Begin ContainR -->" +
                            "<script type='application/javascript'> !function(n,t,a,i){n.mpfContainr||(n.mpfContainr=function(){a.push(arguments)}," +
                            "mpfContainr.q=a,(i=t.createElement('script')).type='application/javascript',i.async=!0,i.src='//cdn.mookie1.com/containr.js'," +
                            "t.head.appendChild(i))}(window,document,[]);mpfContainr('V2_585595',{'host': 'pt-gmtdmp.mookie1.com', 'tagType': 'activity','src.rand' : '[timestamp]'}); </script>" +
                            "<noscript>" +
                            "<iframe src='//pt-gmtdmp.mookie1.com/t/v2?tagid=V2_585595&isNoScript&&src.rand=[timestamp]' height='0' width='0' style='display:none;visibility:hidden'></iframe>" +
                            "</noscript>" +
                            "<!-- End ContainR -->"
                    }
                    /*,
                    {
                        "name": "Google Tag Manager",
                        "value": "<!-- Google Tag Manager (noscript) -->" +
                            "<noscript><iframe src='https://www.googletagmanager.com/ns.html?id=GTM-KL5F4J7' height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript>" +
                            "<!-- End Google Tag Manager (noscript) -->"
                    },
                    {
                        "name": "JWPlayer",
                        "value": "<script type='text/javascript' src='https://content.jwplatform.com/libraries/KZNFnfpy.js'></script>"
                    },
                    {
                        "name": "Cookies",
                        "value": "<script type='text/javascript' src='//cdn.iol.pt/js/jquery.cookie.js'></script>"
                    },
                    {
                        "name": "Owl Carrosel",
                        "value": "<script type='text/javascript' src='//cdn.iol.pt/js/owl.carousel.min.js'></script>"
                    },
                    {
                        "name": "IOL Gallery",
                        "value": "<script type='text/javascript' src='//cdn.iol.pt/js/iol.gallery.mrec.js'></script>"
                    },
                    {
                        "name": "IOL Player",
                        "value": "<script type='text/javascript' src='//cdn.iol.pt/js/iol.player7.js'></script>"
                    },
                    {
                        "name": "Block AdBlock",
                        "value": "<script type='text/javascript' src='//cdn.iol.pt/js/utils/blockadblock.js'></script>"
                    },
                    {
                        "name": "Barra IOL",
                        "value": "<script type='text/javascript' src='http://cdn.iol.pt/BarraIOL/dist/assets/scripts/barra_IOL.js'></script>"
                    },*/
                ]
            }
        ]


    };

    var loadHeadScripts = function () {
        $($("script[src='https://embed.dugout.com/v3.1/maisfutebol.js']")[0]).remove();
        if (navigator.userAgent && navigator.userAgent.indexOf("bot") === -1 && navigator.userAgent.indexOf("Bot") === -1 && navigator.userAgent.indexOf("Google Page Speed Insights") === -1 && navigator.userAgent.indexOf("Chrome-Lighthouse") === -1) {
            loadScripts(scripts["head"]);
        }
    };

    var loadBodyScripts = function () {
        if (navigator.userAgent.indexOf("bot") === -1 && navigator.userAgent.indexOf("Bot") === -1 && navigator.userAgent.indexOf("Google Page Speed Insights") === -1 && navigator.userAgent.indexOf("Chrome-Lighthouse") === -1) {
            loadScripts(scripts["body"]);
        }
    };

    var loadFooterScripts = function () {
        if (navigator.userAgent.indexOf("bot") === -1 && navigator.userAgent.indexOf("Bot") === -1 && navigator.userAgent.indexOf("Google Page Speed Insights") === -1 && navigator.userAgent.indexOf("Chrome-Lighthouse") === -1) {
            loadScripts(scripts["footer"]);
        }
    };

    var loadScripts = function (loadingScripts) {

        for (var i = 0; i < loadingScripts.length; i++) {
            var elem = loadingScripts[i].elementID;
            var elemScripts = loadingScripts[i].scripts;

            for (var j = 0; j < elemScripts.length; j++) {
                $(elem).append(elemScripts[j].value);
            }
        }

    };

    return {
        loadHeadScripts: loadHeadScripts,
        loadBodyScripts: loadBodyScripts,
        loadFooterScripts: loadFooterScripts
    };
})(jQuery, window, document);
