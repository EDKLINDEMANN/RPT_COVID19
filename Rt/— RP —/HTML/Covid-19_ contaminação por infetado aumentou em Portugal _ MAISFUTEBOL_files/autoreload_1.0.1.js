var IOLReload = (function () {
    var iolReloadInterval;
    var reloadTime;
    var reloadCount


    var init = function (seconds) {
        reloadTime = seconds;
        reloadCount = 0;
    };

    var createReloadInterval = function () {
        iolReloadInterval = setInterval(function () {
            reloadCount++;
            AsyncDFPModule.refreshSlots();
            dataLayer.push({ 'virtualPageURL': location.pathname, 'virtualPageTitle': document.title, 'event': 'VirtualPageview', 'autoreload': ( reloadTime / 60) + 'min', 'autoreloadcount': reloadCount });
            console.log("VOCÊ ACABA DE FAZER O " +  reloadCount + "º REFRESH");
        }, reloadTime * 1000);
    };

    var resetReloadTimer = function () {
        clearInterval(iolReloadInterval);
        createReloadInterval();
    };

    var startReloadInterval = function (seconds) {
        init(seconds);
        createReloadInterval();
    }

    /** Exports the public methods */
    return {
        start : startReloadInterval,
        resetTimer: resetReloadTimer
    };
})();