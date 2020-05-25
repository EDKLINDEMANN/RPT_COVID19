'use strict';

/**
 *
 */
var IOLStringUtilsModule = /** @class */ (function () {
    function IOLStringUtilsModule() {
    }
    /**
     *
     * @param txt
     * @param separator
     */
    IOLStringUtilsModule.normalizeString = function (txt, separator) {
        if (separator === void 0) { separator = "-"; }
        if (!txt)
            return "";
        return txt
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]|_/g, "")
            .replace(/\s/g, separator);
    };
    /**
     *
     * @param text
     */
    IOLStringUtilsModule.stripHTMLFromString = function (text) {
        var e = document.createElement("div");
        e.innerHTML = text;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    };
    /**
     *
     * @param text
     * @param length
     */
    IOLStringUtilsModule.simplifyAndCutEncodedString = function (text, length) {
        var strNormalize = text;
        if (decodeURIComponent(text) !== text)
            strNormalize = decodeURIComponent(text);
        //remove &quot; and &amp;
        var parser = new DOMParser();
        var dom = parser.parseFromString("<!doctype html><body>" + strNormalize, "text/html");
        strNormalize = dom.body.textContent;
        strNormalize = strNormalize
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/['"]+/g, "")
            .replace(/[^\w\s]|_/g, "");
        strNormalize = encodeURIComponent(strNormalize);
        if (strNormalize.length > length) {
            strNormalize = strNormalize.substring(0, length);
            while (!IOLStringUtilsModule.isAValidadEncodedText(strNormalize)) {
                strNormalize = strNormalize.substring(0, strNormalize.lastIndexOf("%"));
            }
        }
        return decodeURIComponent(strNormalize);
    };
    /**
     *
     * @param text
     */
    IOLStringUtilsModule.isAValidadEncodedText = function (text) {
        try {
            decodeURIComponent(text);
            return true;
        }
        catch (err) {
            return false;
        }
    };
    /**
     * http://stg.tvi24.iol.pt/opiniao/miguel-sousa-tavares/s.... to tvi24.iol.pt
     * @param referrer
     */
    IOLStringUtilsModule.getDomainFromURL = function (referrer) {
        referrer = referrer.replace("https://", "");
        referrer = referrer.replace("http://", "");
        referrer = referrer.substring(0, referrer.indexOf("/"));
        referrer = referrer.replace("stg.", "");
        referrer = referrer.replace("dev.", "");
        referrer = referrer.replace("dev", "");
        referrer = referrer.replace("www.", "");
        return referrer;
    };
    IOLStringUtilsModule.getDomain = function (projectName) {
        var domain = this.DOMAINS[projectName.toUpperCase()];
        return domain ? domain : "";
    };
    IOLStringUtilsModule.DOMAINS = {
        "IOL": "https://iol.pt",
        "TVI": "https://tvi.iol.pt",
        "TVI24": "https://tvi24.iol.pt",
        "TVIPLAYER": "https://tviplayer.iol.pt",
        "MAISFUTEBOL": "https://maisfutebol.iol.pt",
        "SELFIE": "https://selfie.iol.pt",
        "AUTOPORTAL": "https://autoportal.iol.pt",
        "LUX": "https://lux.iol.pt"
    };
    return IOLStringUtilsModule;
}());

/**
 * Onlive Module
 */
var IOLOnliveLayout = /** @class */ (function () {
    function IOLOnliveLayout(onlive) {
        this.onlive = onlive;
    }
    IOLOnliveLayout.prototype.createOverlayContainer = function () {
        var onliveList = this.createOnliveHTML();
        var broadcastList = this.createBroadcastHTML();
        var onliveContainerClasses = "itens-" + this.onlive.onliveObject["size"] + " overlay " + (this.onlive.conditions["isClosed"] ? "minimize" : "");
        var closeHTML = "<div id=\"iol-onlive-container-close\">\n                      <img src=\"https://cdn.iol.pt/js/utils/Modules/IOLOnlive/dist/assets/live.gif\" width=\"14\"/> EM DIRETO <span class=\"icon-close\"></span>\n                    </div>";
        var markup = "<div id=\"iol-onlive-container\" class=\"" + onliveContainerClasses + "\">              \n                    " + (this.onlive.isClosable ? closeHTML : "") + "\n                    <div id=\"iol-onlive-container-inside\">\n                      " + onliveList + "\n                      " + broadcastList + "\n                    </div>\n                </div>";
        this.onlive.onliveElement.innerHTML = markup;
    };
    IOLOnliveLayout.prototype.createBannerContainer = function () {
        var onliveList = this.createOnliveHTML();
        var broadcastList = this.createBroadcastHTML();
        var onliveContainerClasses = "itens-" + this.onlive.onliveObject["size"] + " " + (this.onlive.conditions["isClosed"] ? "minimize" : "");
        var closeHTML = "<div id=\"iol-onlive-container-close\"><span class=\"icon-close\"></span></div>";
        var markup = "<div id=\"iol-onlive-container\" class=\"" + onliveContainerClasses + "\">              \n                    " + (this.onlive.isClosable ? closeHTML : "") + "\n                    <div id=\"iol-onlive-container-inside\">\n                      " + onliveList + "\n                      " + broadcastList + "\n                    </div>\n                </div>";
        this.onlive.onliveElement.innerHTML = markup;
    };
    IOLOnliveLayout.prototype.createOnliveHTML = function () {
        var _this = this;
        var onliveHTML = "";
        if (this.onlive.onliveObject["lives"] && this.onlive.onliveObject["lives"].length > 0) {
            this.onlive.onliveObject["lives"].forEach(function (element) {
                if (!_this.onlive.excludeList.includes(element.id.toString())) {
                    var video = element.urlPopin.replace(/[?]wmsAuthSign=(.*)/g, "");
                    var imageId = element.imageId ? element.imageId : _this.onlive.defaultImg;
                    var imageURL = "https://www.iol.pt/multimedia/oratvi/multimedia/imagem/id/" + imageId + "/";
                    var pageURL = IOLStringUtilsModule.getDomain(element.projecto) + "/direto/" + element.id + "/" + IOLStringUtilsModule.normalizeString(element.titulo) + "?autostart=true";
                    onliveHTML += _this.getLiveContainer("live", element.titulo, imageURL, video, "Em direto", pageURL);
                }
                else {
                    _this.onlive.onliveObject["size"]--;
                }
            });
        }
        return onliveHTML;
    };
    IOLOnliveLayout.prototype.createBroadcastHTML = function () {
        var _this = this;
        var broadcastHTML = "";
        if (this.onlive.onliveObject["broadcast"] && this.onlive.onliveObject["broadcast"].length > 0) {
            this.onlive.onliveObject["broadcast"].forEach(function (element) {
                if (!_this.onlive.excludeList.includes(element.id.toString())) {
                    var video = element.videoUrl
                        .replace("?", "")
                        .replace(/\/live_(tvi|tvi24)\/live_(tvi|tvi24)\/playlist.m3u8/g, "/edge_servers/" + element.channel.toLowerCase() + "-popin/playlist.m3u8");
                    broadcastHTML += _this.getLiveContainer("broadcast", element.title, element.cover, video, "Emiss\u00E3o " + element.channel, element.externalUrl);
                }
                else {
                    _this.onlive.onliveObject["size"]--;
                }
            });
        }
        return broadcastHTML;
    };
    IOLOnliveLayout.prototype.getLiveContainer = function (containerType, title, cover, videoURL, liveType, pageURL) {
        return "<div class=\"live-container " + containerType + "\">\n                <div class=\"live-wrapper\">\n                    <div class=\"video16x9\">\n                        " + this.getLivePlayer(cover, videoURL) + "\n                        <span class=\"icon-play_circle_outline\"></span>\n                    </div>\n                    <div class=\"live-title\">\n                      <div class=\"live-type\">" + liveType + "</div>\n                      " + title + "\n                    </div>\n                </div>\n                <a href=\"" + pageURL + "\"></a>\n            </div>";
    };
    IOLOnliveLayout.prototype.getLivePlayer = function (cover, videoURL) {
        if (this.onlive.conditions["tk"]) {
            return "<video data-setup='{\"controls\": false, \"autoplay\": true, \"preload\": \"auto\", \"muted\" : \"true\" }' class=\"live-video\" preload=\"auto\"\n        poster=\"" + cover + "200\">\n        <source src=\"" + videoURL + this.onlive.conditions["tk"] + "\" type='application/x-mpegURL' />\n        </video>";
        }
        else {
            return "<div class=\"live-cover\" style=\"background-image: url(" + cover + "200);\"></div>";
        }
    };
    return IOLOnliveLayout;
}());

var IOLDevicesUtilsModule = /** @class */ (function () {
    function IOLDevicesUtilsModule() {
    }
    IOLDevicesUtilsModule.isMobile = function () {
        var userAgent = navigator["userAgent"] || navigator["vendor"] || window["opera"];
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4)))
            return true;
        else
            return false;
    };
    IOLDevicesUtilsModule.isWifiConnection = function () {
        if (navigator["connection"]) {
            var type = navigator["connection"]["type"];
            if (type && type === "wifi") {
                return true;
            }
        }
        //unknown
        return false;
    };
    IOLDevicesUtilsModule.isASlowConnection = function () {
        if (navigator["connection"]) {
            var type = navigator["connection"]["effectiveType"];
            if (type && type !== "4g") {
                return true;
            }
        }
        //unknown
        return false;
    };
    return IOLDevicesUtilsModule;
}());

/**
 *
 */
var IOLCookiesUtilsModule = /** @class */ (function () {
    function IOLCookiesUtilsModule() {
    }
    IOLCookiesUtilsModule.getCookie = function (name) {
        var nameLenPlus = name.length + 1;
        return (document.cookie
            .split(";")
            .map(function (c) { return c.trim(); })
            .filter(function (cookie) {
            return cookie.substring(0, nameLenPlus) === name + "=";
        })
            .map(function (cookie) {
            return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null);
    };
    IOLCookiesUtilsModule.createCookie = function (name, value, expires, path, domain) {
        document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=" + path + ";domain=" + domain;
    };
    IOLCookiesUtilsModule.removeCookie = function (name, path, domain) {
        var date = new Date();
        date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
        document.cookie = name + "=\"\";expires=" + date.toUTCString() + ";path=" + path + ";domain=" + domain;
    };
    return IOLCookiesUtilsModule;
}());

var IOLServicesUtilsModule = /** @class */ (function () {
    function IOLServicesUtilsModule() {
    }
    IOLServicesUtilsModule.obtainAddress = function () {
        var request = new XMLHttpRequest();
        request.open("GET", "https://services.iol.pt/getgcc/ipdetails", false);
        request.send(null);
        if (request.status === 200) {
            var response = request.responseText;
            var data = response.split("|");
            return { code: data[0], country: data[1] };
        }
        return {};
    };
    IOLServicesUtilsModule.obtainTK = function (uname, address) {
        var tk = IOLCookiesUtilsModule.getCookie("jwiol");
        if (tk) {
            var tk_i = IOLCookiesUtilsModule.getCookie("jwiol_i");
            if (tk_i && tk_i == btoa(address["code"])) {
                return tk.includes("?wmsAuthSign=") ? tk : "?wmsAuthSign=" + tk;
            }
        }
        var request = new XMLHttpRequest();
        request.open("GET", "https://services.iol.pt/matrix?userId=" + uname, false);
        request.send(null);
        if (request.status === 200) {
            var response = request.responseText;
            var tk_1 = "?wmsAuthSign=" + response;
            var creationDate = new Date();
            var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 20 * 3600 * 1000);
            IOLCookiesUtilsModule.createCookie("jwiol", response, expirationDate, "iol.pt", "/");
            IOLCookiesUtilsModule.createCookie("jwiol_i", btoa(address["code"]), expirationDate, "/", "iol.pt");
            IOLCookiesUtilsModule.createCookie("jwiol_c", creationDate, expirationDate, "/", "iol.pt");
            return tk_1;
        }
        return "";
    };
    return IOLServicesUtilsModule;
}());

var IOLScriptLoaderModule = /** @class */ (function () {
    function IOLScriptLoaderModule() {
        this.promises = [];
    }
    IOLScriptLoaderModule.prototype.addScript = function (url) {
        if (!this.isScriptLoaded(url)) {
            var promise = new Promise(function (resolve, reject) {
                var script = document.createElement("script");
                script.src = url;
                script.addEventListener("load", function () { return resolve(script); }, false);
                script.addEventListener("error", function () { return reject(script); }, false);
                document.body.appendChild(script);
            });
            this.promises.push(promise);
        }
    };
    IOLScriptLoaderModule.prototype.isScriptLoaded = function (url) {
        return document.querySelector("script[src=\"" + url + "\"]") !== null;
    };
    IOLScriptLoaderModule.prototype.addStyle = function (url) {
        if (!this.isStyleLoaded(url)) {
            var promise = new Promise(function (resolve, reject) {
                var link = document.createElement("link");
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", url);
                link.addEventListener("load", function () { return resolve(link); }, false);
                link.addEventListener("error", function () { return reject(link); }, false);
                document.body.appendChild(link);
            });
            this.promises.push(promise);
        }
    };
    IOLScriptLoaderModule.prototype.isStyleLoaded = function (url) {
        return document.querySelector("link[href=\"" + url + "\"]") !== null;
    };
    IOLScriptLoaderModule.prototype.onLoaded = function (onLoaded, onError) {
        Promise.all(this.promises).then(function () { return onLoaded(); }, function () { return onError(); });
    };
    return IOLScriptLoaderModule;
}());

var IOLOnliveServices = /** @class */ (function () {
    function IOLOnliveServices(onlive) {
        this.onlive = onlive;
    }
    IOLOnliveServices.prototype.getLiveStreams = function (action) {
        var lives = [];
        var _this = this;
        lives = lives.concat(this.getBroadcast());
        lives = lives.concat(this.getOnlives());
        Promise.all(lives).then(function () {
            if (_this.onlive.onliveObject["broadcast"].length > 0 ||
                (_this.onlive.onliveObject["lives"] && _this.onlive.onliveObject["lives"].length > 0)) {
                _this.retrieveUserConditions(action);
            }
            else {
                console.log("IOLOnlive: Nothing to load");
            }
        });
    };
    IOLOnliveServices.prototype.getBroadcast = function () {
        var _this = this;
        var broadcasts = [];
        if (this.onlive.channelName && this.onlive.channelName.length > 0) {
            for (var index = 0; index < this.onlive.channelName.length; index++) {
                var broadcast = fetch("https://www.iol.pt/json_broadcast.html?canal=" + this.onlive.channelName[index])
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                    if (!_this.onlive.excludeList.includes(data.id)) {
                        _this.onlive.onliveObject["broadcast"].push(data);
                        _this.onlive.onliveObject["size"] += 1;
                    }
                })
                    .catch(function (error) {
                    console.log(error);
                });
                broadcasts.push(broadcast);
            }
        }
        return broadcasts;
    };
    IOLOnliveServices.prototype.getOnlives = function () {
        var _this = this;
        var onlives = [];
        if (this.onlive.project) {
            var onlive_url = this.onlive.project === "all"
                ? "https://services.iol.pt/onLive/getLives"
                : "https://services.iol.pt/onLive/getLivesByProject?project=" + this.onlive.project.toLowerCase();
            var onlive = fetch(onlive_url)
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                _this.onlive.onliveObject["lives"] = data;
                _this.onlive.onliveObject["size"] += _this.onlive.onliveObject["lives"]
                    ? _this.onlive.onliveObject["lives"].length
                    : 0;
            })
                .catch(function (error) {
                console.log(error);
            });
            onlives.push(onlive);
        }
        return onlives;
    };
    IOLOnliveServices.prototype.retrieveUserConditions = function (action) {
        this.onlive.conditions["device"] = IOLDevicesUtilsModule.isMobile() ? "mobile" : "desktop";
        this.onlive.conditions["connection"] = IOLDevicesUtilsModule.isWifiConnection() ? "wifi" : "not_wifi";
        this.onlive.conditions["speed"] = IOLDevicesUtilsModule.isASlowConnection() ? "slow" : "fast";
        var cookie = IOLCookiesUtilsModule.getCookie(this.onlive.cookieName);
        this.onlive.conditions["isClosed"] = cookie ? cookie === "true" : false;
        var mobileValidation = this.onlive.conditions["device"] === "mobile" &&
            this.onlive.conditions["speed"] === "fast" &&
            this.onlive.conditions["connection"] === "wifi";
        var desktopValidation = this.onlive.conditions["speed"] === "fast" && this.onlive.conditions["device"] === "desktop";
        var loadVideo = false;
        if (this.onlive.loadVideos && (mobileValidation || desktopValidation)) {
            this.onlive.conditions["address"] = IOLServicesUtilsModule.obtainAddress();
            this.onlive.conditions["tk"] = IOLServicesUtilsModule.obtainTK("", this.onlive.conditions["address"]);
            loadVideo = true;
        }
        this.loadExternalDependencies(loadVideo, action);
    };
    IOLOnliveServices.prototype.loadExternalDependencies = function (loadVideo, action) {
        if (!loadVideo && !this.onlive.isOverlay)
            action();
        var scriptLoader = new IOLScriptLoaderModule();
        if (this.onlive.isOverlay) {
            scriptLoader.addStyle("https://cdn.iol.pt/js/utils/Modules/IOLOnlive/dist/style/iol.onlive.css?v=" + this.onlive.CSS_VERSION);
        }
        if (loadVideo) {
            scriptLoader.addScript("https://cdn.iol.pt/js/utils/video-js-7.0.5/video.js");
            scriptLoader.addStyle("https://cdn.iol.pt/js/utils/video-js-7.0.5/video-js.min.css");
        }
        scriptLoader.onLoaded(function () {
            action();
        }, function () {
            console.log("IOLOnlive: Cannot load dependencies");
        });
    };
    IOLOnliveServices.prototype.loadCloseListener = function () {
        var _this_1 = this;
        var element = document.getElementById("iol-onlive-container-close");
        element.addEventListener("click", function () {
            var parent = document.getElementById("iol-onlive-container");
            var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 2 * 3600 * 1000);
            if (parent.classList.contains("minimize")) {
                parent.classList.remove("minimize");
                IOLCookiesUtilsModule.createCookie(_this_1.onlive.cookieName, false, expirationDate, "/", "iol.pt");
            }
            else {
                parent.classList.add("minimize");
                IOLCookiesUtilsModule.createCookie(_this_1.onlive.cookieName, true, expirationDate, "/", "iol.pt");
            }
        });
    };
    return IOLOnliveServices;
}());

/**
 * Onlive Module
 */
var IOLOnlive = /** @class */ (function () {
    function IOLOnlive(elementID, project, subproject, channelName, isClosable, isOverlay, loadVideos, excludeList) {
        var _this = this;
        this.CSS_VERSION = "3.3.3";
        this.onliveElement = document.getElementById(elementID);
        this.project = project ? project : "all";
        this.subproject = subproject;
        this.cookieName = "" + project.toLowerCase() + (subproject ? "-" + subproject.toLowerCase() : "") + "-iol-onlive-closed";
        this.channelName = channelName;
        this.isClosable = isClosable;
        this.isOverlay = isOverlay;
        this.loadVideos = loadVideos;
        this.excludeList = excludeList;
        this.defaultImg = isOverlay ? "5ebe73610cf29545b571a45f" : "5e7c94b60cf2f02ca42e698b";
        this.onliveObject = {};
        this.onliveObject["broadcast"] = [];
        this.onliveObject["size"] = 0;
        this.conditions = {};
        var onliveServices = new IOLOnliveServices(this);
        onliveServices.getLiveStreams(function () {
            var layout = new IOLOnliveLayout(_this);
            if (_this.onliveObject["size"] > 0) {
                if (_this.isOverlay)
                    layout.createOverlayContainer();
                else
                    layout.createBannerContainer();
                if (_this.isClosable)
                    onliveServices.loadCloseListener();
            }
        });
    }
    return IOLOnlive;
}());
