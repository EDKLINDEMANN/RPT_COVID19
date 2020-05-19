/**
 * 2018/03
 * Module for asynchronously from DFP
 * 
 * Slots Configuration Object:
 * {
 *       containsLazySlots: <true|false>,                                        --> Depending if will be using lazy loading in the page 
 *        entries: [                                                              --> Array of slots to be declared
 *           {
 *           name: "lsb1",                                                       --> Unique name for the slot, that identifies it                 
 *               sizes: [[980, 250], [970, 250], [728, 90], [320, 50], [1, 1]],  --> All the sizes that can have
 *               segmentation: "LDB1",                                           --> DPF segmentation 7811748/testecatia_web_pt/MPU1 or 7811748/testecatia_web_pt/homepage/MPU1
 *               isLazy: false,                                                  --> If it's loaded only when visible
 *               automaticalyDisplayed: false,                                   --> If it should be immediately loaded in the page
 *               isRefreshable: true,                                            --> If can be refreshable
 *               viewports: [                                                    --> The different sizes by viewport
 *                   {     
 *                       viewport: [0, 0],                                       --> From [768x500, 768x500[                              
 *                       sizes: [[320, 50], [1, 1]]
 *                   },
 *                   {
 *                       viewport: [768, 500],                                   --> From [768x500, 992x600[
 *                       sizes: [[728, 90], [1, 1]]
 *                   }, {
 *                       viewport: [992, 600],                                   --> From [992x600,  ∞ [
 *                       sizes: [[728, 90], [970, 250], [980, 250], [1, 1]]
 *                   }
 *               ],
 *               key_values: {                                                   --> Key-Value array for targetting the format in dfp
 *                   "pos": "ldb1",
 *                   "request_ad": "Topo"
 *               }
 *           },
 *           ....
 *       ]
 *   }
 */
var AsyncDFPModule = (function () {
    /** googletag reference after loaded */
    var dfpGoogleTag;
    /** Slots to be used in the page */
    var slots = {};
    /** Slots that should be lazy loaded */
    var lazySlots = [];
    /** Slots that can be refreshed */
    var refreshableSlots = [];
    /** DFP Ad Unit */
    var dfpAdUnit;
    /** Indicates if lazy loading listener is registered */
    var hasLazyLoadingListener = false;
    /** Keeps track of the lazy loading ads that are already loaded */
    var adsLoaded = 0;


    /**
     * Creates all the slots based on the slots configuration and services. Must be the first fucntion to be called
     * @param  {object} gt 
     * @param  {string} adunit
     * @param  {object} slotsConfig
     */
    var init = function (gt, adUnit, slotsConfig) {
        dfpGoogleTag = gt;
        dfpAdUnit = adUnit;
        createSlots(slotsConfig);

        /* Infinite scroll requires SRA */
        dfpGoogleTag.pubads().enableSingleRequest();

        /* Disable initial load, we will use refresh() to fetch ads.
         Calling this function means that display() calls just
         register the slot as ready, but do not fetch ads for it. */
        if (slotsConfig.containsLazySlots) {
            dfpGoogleTag.pubads().disableInitialLoad();
            window.addEventListener('scroll', LazyLoadingListener);
            hasLazyLoadingListener = true;
        }

        var dfpPageConfig = {
            allowOverlayExpansion: true,
            allowPushExpansion: true,
            sandbox: true
        };
        dfpGoogleTag.pubads().setSafeFrameConfig(dfpPageConfig);
        dfpGoogleTag.pubads().collapseEmptyDivs(true);
        dfpGoogleTag.enableServices();
    };

    /**
     * Refresh all the refreshable slots or a specific slot by it's name
     * @param  {string} slotsName
     */
    var refreshSlots = function (slotsName) {
        if (dfpGoogleTag) {
            if (slotsName == undefined) {
                dfpGoogleTag.pubads().refresh(refreshableSlots);
            } else {
                dfpGoogleTag.pubads().refresh([slots[slotsName]]);
            }
        }
    };

    /**
     * Creates all the new slots based on the slots configuration nad if necessary reload the LazyLoadingListener
     * @param  {object} slotsConfig
     */
    var addNewSlots = function (slotsConfig) {
        if (dfpGoogleTag) {
            dfpGoogleTag.cmd.push(function () {
                createSlots(slotsConfig);

                if (!hasLazyLoadingListener) {
                    window.addEventListener('scroll', LazyLoadingListener);
                    hasLazyLoadingListener = true;
                }
            });
        }
    };

    var isSlotPresent = function (slotsName) {
        for (var item in slots) {
            if (item == slotsName) {
                return true;
            }
        }
        return false;
    };
    /**
     * Loads the slot by it's name and depending on the shouldDisplay shows the ad
     * @param  {string} slotName
     * @param  {boolean} shouldDisplay
     */
    var loadAd = function (slotName, shouldDisplay) {
        if (dfpGoogleTag) {
            dfpGoogleTag.cmd.push(function () {
                dfpGoogleTag.display(slotName);
                if (shouldDisplay) {
                    refreshSlots(slotName);
                }
            });
        }
    };

    /**
     * Creates all the new slots based on the slots configuration
     * @param  {object} slotsConfig
     */
    var createSlots = function (slotsConfig) {
        if (dfpGoogleTag) {
            slotsConfig.entries.forEach(element => {
                let mapping;
                if (element.viewports == undefined) {
                    slots[element.name] = dfpGoogleTag.defineSlot(`${dfpAdUnit}/${element.segmentation}`, element.sizes, element.name)
                        .addService(dfpGoogleTag.pubads())
                        .setTargeting("sizes", element.sizes);
                }
                else {
                    mapping = dfpGoogleTag.sizeMapping();
                    element.viewports.forEach(vp => {
                        mapping.addSize(vp.viewport, vp.sizes);
                    });

                    slots[element.name] = dfpGoogleTag.defineSlot(`${dfpAdUnit}/${element.segmentation}`, element.sizes, element.name)
                        .defineSizeMapping(mapping.build())
                        .addService(dfpGoogleTag.pubads())
                        .setTargeting("sizes", element.sizes);
                }

                if (element.key_values != undefined) {
                    for (kv in element.key_values) {
                        slots[element.name].setTargeting(kv, element.key_values[kv]);
                    }
                }

                if (element.isLazy) {
                    var obj = {
                        name: element.name,
                        value: slots[element.name],
                        loaded: false,
                        isRefreshable: element.isRefreshable
                    };

                    if (element.shouldLoadFunction) {
                        obj["shouldLoad"] = new Function(element.shouldLoadArguments, element.shouldLoadFunction);
                    }

                    if (element.scrollReference) {
                        obj["scrollReference"] = element.scrollReference;
                    }

                    lazySlots.push(obj);

                }

                if (!element.isLazy && element.automaticalyDisplayed) {
                    dfpGoogleTag.display(element.name);
                    dfpGoogleTag.pubads().refresh([slots[element.name]]);
                }

                if (!element.isLazy && element.isRefreshable) { //lazy are added after
                    refreshableSlots.push(slots[element.name]);
                }
            });
        }
    };


    /**
     * Listener for displaying the lazy loading ads based on it's position 
     * SEE https://css-tricks.com/the-difference-between-throttling-and-debouncing/
     */
    var LazyLoadingListener = function () {
        if (dfpGoogleTag && document.readyState !== 'loading') {
            if (lazySlots.length == adsLoaded) {
                window.removeEventListener('scroll', LazyLoadingListener);
                hasLazyLoadingListener = false;
                lazySlots = [];
                adsLoaded = 0;
            }

            $.each(lazySlots, function (index, element) {
                if (!element.loaded) {
                    var slotID = `#${element.name}`;
                    var referenceScroll = element.scrollReference ? $(element.scrollReference) : undefined;
                    if ($(slotID).length > 0) {
                        var slotPos = referenceScroll !== undefined ? (referenceScroll.offset().top - window.innerHeight) : ($(slotID).offset().top - window.innerHeight);
                        var scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

                        if (slotPos > 0 && scrollPos >= slotPos) {
                            if (!element.shouldLoad || element.shouldLoad && element.shouldLoad()) {
                                dfpGoogleTag.cmd.push(function () {
                                    dfpGoogleTag.pubads().refresh([element.value]);
                                    element.loaded = true;
                                    adsLoaded++;
                                    console.log("lazy loaded: " + element.name);
                                });
                            }
                        }
                    }
                }
            });
        }
    };

    /** Exports the public methods */
    return {
        init: init,
        refreshSlots: refreshSlots,
        addNewSlots: addNewSlots,
        loadAd: loadAd,
        isSlotPresent: isSlotPresent
    };
})();