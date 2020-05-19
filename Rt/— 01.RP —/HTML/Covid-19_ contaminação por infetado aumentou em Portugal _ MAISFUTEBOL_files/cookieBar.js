//CHECK JQUERY
if (typeof jQuery !== 'undefined') {
    init();
} else {
    (function () {
        // Load the scripts
        loadScripts();

        // Poll for jQuery to come into existance
        var checkReady = function (callback) {
            if (window.jQuery) {
                callback(jQuery);
            } else {
                window.setTimeout(function () {
                    checkReady(callback);
                }, 20);
            }
        };

        // Start polling...
        checkReady(function ($) {
            $(function () {
                init();
            });
        });
    })();
}


function init() {
    if (window.location.origin.indexOf("dev.") == -1 && window.location.origin.indexOf("stg.") == -1) {


        $("head").prepend('<link type="text/css" rel="stylesheet" href="https://cdn.iol.pt/utils/BarraCookie/css/quantcast.css"/>');
        $("head").prepend('<script type="text/javascript" src="https://cdn.iol.pt/js/jquery.cookie.js"></script>');

        //testing
        var host = window.location.origin.replace("dev.", "");
        var target = host.replace(window.location.protocol, "").replace("//", "").replace("www.", "").split(".")[0];

        var url_cookies = "https://cdn.iol.pt/utils/BarraCookie/view/cookies.html?host=" + window.location.hostname;
        var cookies = $("script[data-cookies]").attr("data-cookies");


        if (cookies !== undefined && cookies === "true") {
            var mcdCookie = 'complianceCookiePolicy-' + window.location.hostname;
            $.get(url_cookies, function (data) {
                var cookies_msg = $('<div></div>').html(data).find(".cookieCompliancePolicyBox");
                $("body").append(cookies_msg);
            });
        }
    }
}

function loadScripts() {
    var script;

    script = document.createElement("script");

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    script = document.createElement("script");
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.0/masonry.pkgd.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    script = document.createElement("script");
    script.src = 'https://cdn.iol.pt/js/jquery.cookie.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
}
