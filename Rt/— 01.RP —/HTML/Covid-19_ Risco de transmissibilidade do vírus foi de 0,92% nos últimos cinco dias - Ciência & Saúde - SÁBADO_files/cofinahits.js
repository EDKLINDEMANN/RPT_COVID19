var CofinaHits = function () {

    var _getConfigurationValue = function (name) {
        try {
            if (window._chc == null) {
                return "";
            }

            for (var i = 0; i < window._chc.length; i++) {
                if (window._chc[i].length == 2) {
                    if (window._chc[i][0] == name)
                        return window._chc[i][1];
                }
            }

            return "";
        }
        catch (err) {
            return "";
        }
    };

    var _collectData = function (contentID, contentTypeName, channelID, hitType, message, url, type) {
        try {
            var i = document.createElement("img");
            i.src = _getConfigurationValue("BaseUrl") + "/collect/" + type + "/pixel.gif?cid=" + contentID + "&ctn=" + contentTypeName + "&msg=" + encodeURIComponent(message ? message : "") + "&url=" + encodeURIComponent(url ? url : window.location.href) + "&ht=" + (hitType ? hitType : "HITS")  +"&s="+ _getConfigurationValue("Site") +"&ci="+ (channelID ? channelID : "") +"&_=" + String(Math.random() * 1000000000);

            document.appendChild(i);
        }
        catch (err) {

        }
    }
    
    return {
        hit: function (contentID, contentTypeName, channelID, hitType, message, url) {
            _collectData(contentID, contentTypeName, channelID, message, hitType, url, "hits");

        },
        share: function (contentID, contentTypeName, message, url) {
            _collectData(contentID, contentTypeName, null, null, message, url, "shares");
        }
    };

}();    