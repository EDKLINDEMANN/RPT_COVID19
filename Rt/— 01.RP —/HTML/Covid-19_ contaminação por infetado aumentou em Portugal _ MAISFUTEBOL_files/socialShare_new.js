var SHARE_INFO = {
    'FACEBOOK': function (text, url, reference) {
        return {
            'shareURL': `https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${url}${getCampaign('facebook')}${reference}`,
            'popWidth': 600,
            'popHeight': 661
        };
    },
    'TWITTER': function (text, url, reference) {
        return {
            'shareURL': `https://twitter.com/share?url=${url}${getCampaign('twitter')}${reference}&via=maisfutebol&text=${text}&lang=pt&related=maisfutebol`,
            'popWidth': 585,
            'popHeight': 397
        };
    },
    'WHATSAPP': function (text, url, reference) {
        return {
            'shareURL': `https://api.whatsapp.com/send?text=${text} : ${url}${getCampaign('whatsapp')}${reference}`,
            'popWidth': 584,
            'popHeight': 400
        };
    }
};

function getCampaign(platform) {
    return encodeURIComponent(`utm_source=${platform}%26utm_medium=social%26utm_campaign=shared_site`);
}

function loadShareUrl(platform, title, url, reference, callback) {
    var popWidth = 600;
    var popHeight = 450;


    if (!url) {
        url = window.location.href;
        if (!window.location.search) {
            url += "?";
        } else {
            url += "&";
        }
    }else{
        if(url.includes("?")){
            url += "&";
        }else{
            url += "?";
        }
    }
    
    url = encodeURIComponent(url);

    var share = SHARE_INFO[platform](encodeURIComponent(title), url, encodeURIComponent(reference));
    

    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var systemZoom = width / window.screen.availWidth;
    var left = (width - share.popWidth) / 2 / systemZoom + dualScreenLeft;
    var top = (height - share.popHeight) / 2 / systemZoom + dualScreenTop;


    var params = 'width=' + popWidth + ', height=' + popHeight;
    params += ', top=' + top + ', left=' + left;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=no';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';

    window.open(share.shareURL, 'Popup', params);

    if (callback)
        callback();
}

/*function loadShareUrl(share_popup, location, callback) {

    var popWidth = 600;
    var popHeight = 450;


    if (location.includes("<PAGE_URL>")) {
        var url = window.location.href;
        if (!window.location.search) {
            url += "?";
        } else {
            url += "&";
        }
        location = location.replace("<PAGE_URL>", encodeURIComponent(url));
    }

    switch (share_popup) {
        case "facebook":
            popWidth = 600;
            popHeight = 661;
            break;
        case "twitter":
            popWidth = 585;
            popHeight = 397;
            break;
        case "whatsapp":
            popWidth = 584;
            popHeight = 400;
            break;
    }

    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var systemZoom = width / window.screen.availWidth;
    var left = (width - popWidth) / 2 / systemZoom + dualScreenLeft;
    var top = (height - popHeight) / 2 / systemZoom + dualScreenTop;


    var params = 'width=' + popWidth + ', height=' + popHeight;
    params += ', top=' + top + ', left=' + left;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=no';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';

    window.open(location, 'Popup', params);

    if (callback)
        callback();
}*/

function sendToAnalytics(socialNetwork, eventLabel) {
    dataLayer.push({'event': 'gaSocialEvent', 'socialNetwork': socialNetwork, 'socialAction': 'Share', 'socialTarget': '${param.urlShare}'});
    dataLayer.push({'eventCategory': 'Click', 'eventLabel': eventLabel, 'eventAction': '${param.urlShare}', 'event': 'gaEvent'});
}

