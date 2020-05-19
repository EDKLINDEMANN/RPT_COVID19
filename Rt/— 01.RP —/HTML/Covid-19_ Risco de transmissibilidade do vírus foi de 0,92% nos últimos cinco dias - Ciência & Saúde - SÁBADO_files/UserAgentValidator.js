/// based on https://www.chromium.org/updates/same-site/incompatible-clients
var UserAgentValidator = function () {
    var _shouldSendSameSiteNone = function (useragent) {
        try {
            if (useragent === undefined || useragent === null || useragent === '')
                useragent = navigator.userAgent;
            return !isSameSiteNoneIncompatible(useragent);
        } catch (e) {
            console.log(e);
        }
        return false;
    }

    // Classes of browsers known to be incompatible.

    var isSameSiteNoneIncompatible = function (useragent) {
        return hasWebKitSameSiteBug(useragent)
            || dropsUnrecognizedSameSiteCookies(useragent)
            || isUnMappedBrowser(useragent)
            ;
    }

    var hasWebKitSameSiteBug = function (useragent) {
        return isIosVersion(12, useragent)
            || (isMacosxVersion(10, 14, useragent) && (isSafari(useragent) || isMacEmbeddedBrowser(useragent)));
    }

    var dropsUnrecognizedSameSiteCookies = function (useragent) {
        return (isChromiumBased(useragent) && isChromiumVersionAtLeast(51, useragent) && !isChromiumVersionAtLeast(67, useragent))
            || (isUcBrowser(useragent) && !isUcBrowserVersionAtLeast(12, 13, 2, useragent))
            || (isFirefoxBrowser(useragent) && !isFirefoxBrowserVersionAtLeast(69, useragent))
            || isInternetExplorerBrowser(useragent)
            ;
    }

    // Regex parsing of User-Agent string. (See note above!)

    var isIosVersion = function (major, useragent) {
        var regex = /\(iP.+; CPU .*OS (\d+)[_\d]*.*\) AppleWebKit\//;
        // Extract digits from first capturing group.
        return regex.test(useragent) && useragent.match(regex)[1] == major.toString();
    }

    var isMacosxVersion = function (major, minor, useragent) {
        var regex = /\(Macintosh;.*Mac OS X (\d+)_(\d+)[_\d]*.*\) AppleWebKit\//;
        // Extract digits from first and second capturing groups.
        return regex.test(useragent) &&
            (useragent.match(regex)[1] == major.toString()) &&
            (useragent.match(regex)[2] == minor.toString());
    }

    var isSafari = function (useragent) {
        var safari_regex = /Version\/.* Safari\//;
        return safari_regex.test(useragent) &&
            !isChromiumBased(useragent);
    }

    var isMacEmbeddedBrowser = function (useragent) {
        var regex = /^Mozilla\/[\.\d]+ \(Macintosh;.*Mac OS X [_\d]+\) AppleWebKit\/[\.\d]+ \(KHTML, like Gecko\)$/;
        return regex.test(useragent);
    }

    var isChromiumBased = function (useragent) {
        var regex = /Chrom(e|ium)/;
        return regex.test(useragent);
    }

    var isChromiumVersionAtLeast = function (major, useragent) {
        var regex = /Chrom[^ \/]+\/(\d+)[\.\d]*/;
        if (!regex.test(useragent))
            return false;
        // Extract digits from first capturing group.
        var version = parseInt(useragent.match(regex)[1])
        return version >= major;
    }

    var isUcBrowser = function (useragent) {
        var regex = /"UCBrowser\//;
        return regex.test(useragent);
    }

    var isUcBrowserVersionAtLeast = function (major, minor, build, useragent) {
        var regex = /UCBrowser\/(\d+)\.(\d+)\.(\d+)[\.\d]*/;
        if (!regex.test(useragent))
            return false;

        // Extract digits from three capturing groups.
        var major_version = parseInt(useragent.match(regex)[1]);
        var minor_version = parseInt(useragent.match(regex)[2]);
        var build_version = parseInt(useragent.match(regex)[3]);
        if (major_version != major)
            return major_version > major;
        if (minor_version != minor)
            return minor_version > minor;
        return build_version >= build;
    }

    var isFirefoxBrowser = function (useragent) {
        var regex = /Firefox/;
        return regex.test(useragent);
    }

    var isFirefoxBrowserVersionAtLeast = function (major, useragent) {
        var regex = /Firefox+\/(\d+)[\.\d]*/;
        if (!regex.test(useragent))
            return false;
        // Extract digits from first capturing group.
        var version = parseInt(useragent.match(regex)[1])
        return version >= major;
    }

    var isInternetExplorerBrowser = function (useragent) {
        var regex = /MSIE/;
        return regex.test(useragent);
    }

    var isUnMappedBrowser = function (useragent) {
        return /Windows Mobile/.test(useragent)
            || !(/Chrome\//.test(useragent)
                || /Safari\//.test(useragent)
                || /AppleWebKit\//.test(useragent)
                || /Firefox\//.test(useragent)
                || /UCBrowser\//.test(useragent))
            ;
    }


    return {
        shouldSendSameSiteNone: _shouldSendSameSiteNone
    };
}();

