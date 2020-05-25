//defaultSlots
var slots = {
    containsLazySlots: true,
    entries: [
        {
            name: "mpuhalf",
            sizes: [[300, 250], [300, 600]],
            segmentation: "MPU_HALF",
            isLazy: false,
            automaticalyDisplayed: true,
            isRefreshable: true,
            key_values: {
                "pos": "mpuhalf",
                "request_ad": "MREC+HALPAGE"
            }
        },
        {
            name: "300x100",
            sizes: [300, 100],
            segmentation: "300x100",
            isLazy: false,
            automaticalyDisplayed: false,
            isRefreshable: true,
            key_values: {
                "pos": "300x100",
                "request_ad": "Topo"
            }
        },
        {
            name: "popin",
            sizes: [388, 120],
            segmentation: "POPIN",
            isLazy: false,
            automaticalyDisplayed: false,
            isRefreshable: false,
            viewports: [
                {
                    viewport: [768, 500],
                    sizes: [388, 120]
                }],
            key_values: {
                "pos": "popin",
                "request_ad": "PopIn"
            }
        },
        {
            name: "inter",
            sizes: [1, 1],
            segmentation: "INTER",
            isLazy: false,
            automaticalyDisplayed: false,
            isisRefreshable: false,
            viewports: [
                {
                    viewport: [0, 0],
                    sizes: [1, 1]
                }
            ],
            key_values: {
                "pos": "inter",
                "format": "Intro"
            }
        },
        {
            name: "billboardxl",
            sizes: ['fluid', [2, 1], [980, 250], [970, 250]],
            segmentation: "BILLBOARDXL",
            isLazy: false,
            automaticalyDisplayed: false,
            isRefreshable: true,
            viewports: [
                {
                    viewport: [0, 0],
                    sizes: ['fluid', [2, 1]]
                },
                {
                    viewport: [992, 600],
                    sizes: ['fluid', [2, 1], [980, 250], [970, 250]]
                }
            ],
            key_values: {
                "pos": "billboardxl",
                "request_ad": "Topo"
            }
        }
    ]
};
switch (ASYNC_PAGE) {
    case "hp":

        break;
    case "listagens":

        break;
    case "artigo":
        slots["entries"].push({
            name: "incontent",
            sizes: [3, 3],
            segmentation: "INCONTENT",
            isLazy: false,
            automaticalyDisplayed: false,
            isRefreshable: true,
            key_values: {
                "pos": "incontent",
                "request_ad": "INCONTENT"
            }
        });
        
        slots["entries"].push(        {
            name: "mpu2",
            sizes: [300, 250],
            segmentation: "MPU2",
            isLazy: false,
            automaticalyDisplayed: true,
            isRefreshable: true,
            key_values: {
                "pos": "mpu2",
                "request_ad": "MREC2"
            }
        });
        slots["entries"].push({
            name: "branded",
            sizes: ['fluid'],
            segmentation: "BRANDED_CONTENT",
            isLazy: true,
            automaticalyDisplayed: false,
            isRefreshable: true,
            key_values: {
                "pos": "branded",
                "request_ad": "branded"
            }
        });
        slots["entries"].push({
            name: "ldb1",
            sizes: [320, 50],
            segmentation: "LDB",
            isLazy: true,
            automaticalyDisplayed: false,
            isRefreshable: true,

            key_values: {
                "pos": "ldb",
                "request_ad": "Topo"
            }
        });
        break;
    case "video":
    case "galeria":
        slots["entries"].push({
            name: "branded",
            sizes: ['fluid'],
            segmentation: "BRANDED_CONTENT",
            isLazy: true,
            automaticalyDisplayed: false,
            isRefreshable: true,
            key_values: {
                "pos": "branded",
                "request_ad": "branded"
            }
        });
        break;
}

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
var adUnit = ADPUB;
//Necessário para ter a API READY
googletag.cmd.push(function () {
    AsyncDFPModule.init(googletag, adUnit, slots);
});

function generateNextSlot(reference, isParentReference, slotInfo) {
    var slotname = slotInfo.formatName + ((slotInfo.suffix === 0 || !slotInfo.suffix) ? '' : slotInfo.suffix);
    if (AsyncDFPModule.isSlotPresent(slotname)) {
        googletag.cmd.push(function () {
            AsyncDFPModule.loadAd(slotname, true);
        });
    } else {

        if (reference)
            createNewContainerDiv(reference, isParentReference, slotname, slotInfo.class);

        AsyncDFPModule.addNewSlots({
            containsLazySlots: true,
            entries: [
                {
                    name: slotname,
                    sizes: slotInfo.sizes,
                    segmentation: slotInfo.segmentation,
                    isLazy: slotInfo.isLazy ? slotInfo.isLazy : true,
                    shouldLoadArguments: slotInfo.args,
                    shouldLoadFunction: slotInfo.validation,
                    scrollReference: slotInfo.scrollReference,
                    automaticalyDisplayed: slotInfo.automaticalyDisplayed ? slotInfo.automaticalyDisplayed : false,
                    isRefreshable: slotInfo.isRefreshable ? slotInfo.isRefreshable : true,
                    key_values: {
                        "pos": slotInfo.formatName,
                        "request_ad": slotInfo.segmentation
                    }
                }
            ]
        });
        console.log('criada a slot - ' + slotname);
        googletag.cmd.push(function () {
            AsyncDFPModule.loadAd(slotname, false);
        });
        console.log('feito o load! - ' + slotname);
    }
}

/**
 * For articles
 * @param {type} prefix
 * @param {type} startidx
 * @param {type} slotsizes
 * @param {type} segmentation
 * @returns {undefined}
 */
function generateNextSimpleSlot(name, suffix, slotsizes, segmentation) {

    generateNextSlot(undefined, false, {
        formatName: name,
        suffix: suffix,
        sizes: slotsizes,
        segmentation: segmentation,
        isLazy: true,
        automaticalyDisplayed: false,
        isRefreshable: true
    });
}


function createNewContainerDiv(reference, isParentReference, slotname, classes) {
    var targetElement = $(reference);
    elContainer = document.createElement('div');
    elContainer.setAttribute("id", slotname);
    elContainer.setAttribute("class", classes);
    isParentReference ? targetElement.append(elContainer) : targetElement.after(elContainer);
}