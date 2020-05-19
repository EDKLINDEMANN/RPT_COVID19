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
    return IOLStringUtilsModule;
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * Represents a data layer dimension
 */
var IOLDataLayerItem = /** @class */ (function () {
    function IOLDataLayerItem(itemDimensionName, itemType, itemDefaultValue, itemValue) {
        this.itemDimensionName = itemDimensionName;
        this.itemType = itemType;
        this.itemDefaultValue = itemDefaultValue;
        this.itemValue = itemValue;
    }
    /**
     * Return the value of the dimension
     */
    IOLDataLayerItem.prototype.getValue = function () {
        return this.itemValue ? this.itemValue : this.itemDefaultValue;
    };
    return IOLDataLayerItem;
}());
/**
 * Represent the type of event for the dimension
 */
var IOLDataLayerType;
(function (IOLDataLayerType) {
    IOLDataLayerType[IOLDataLayerType["PAGEVIEW"] = 0] = "PAGEVIEW";
    IOLDataLayerType[IOLDataLayerType["EVENT"] = 1] = "EVENT";
    IOLDataLayerType[IOLDataLayerType["BOTH"] = 2] = "BOTH";
})(IOLDataLayerType || (IOLDataLayerType = {}));

/**
 * Represent the data layer sent to the Tag Manager
 */
var IOLDataLayerObject = /** @class */ (function () {
    function IOLDataLayerObject(pageTitle, contentType, contentTitle, contentId, contentEpisodeId, contentProgramName, contentAuthor, contentKeywords, contentVideoPlay, contentVideoType, contentLiveType, version, platform, adunit, internalOrigin) {
        this.MAX_LENG = 150;
        this.dimensionsValues = [];
        // Saber qual o formato do conteúdo, se são galerias, videos, páginas de secção, página conteúdo, (Para saber as Galerias dentro dos artigos, o Tipo conteúdo é Galeria e depois na origem interna temos a info de que é artigo)
        this.dimensionsValues.push(new IOLDataLayerItem("Tipo_Conteudo", IOLDataLayerType.BOTH, "", contentType.charAt(0).toUpperCase() + contentType.slice(1)));
        this.pageTitle = IOLStringUtilsModule.simplifyAndCutEncodedString(pageTitle, this.MAX_LENG);
        //Titulo da Página
        this.dimensionsValues.push(new IOLDataLayerItem("virtualPageTitle", IOLDataLayerType.BOTH, "", this.pageTitle));
        //Titulo do video ou da galeria ou artigo
        this.dimensionsValues.push(new IOLDataLayerItem("Titulo", IOLDataLayerType.BOTH, "", IOLStringUtilsModule.simplifyAndCutEncodedString(contentTitle, this.MAX_LENG)));
        //Id do conteúdo, no tagmanager chama-se multimedia id
        this.dimensionsValues.push(new IOLDataLayerItem("Multimedia_Id", IOLDataLayerType.BOTH, "Sem ID", contentId));
        //Id do episódio
        this.dimensionsValues.push(new IOLDataLayerItem("Episodio_Id", IOLDataLayerType.EVENT, "Sem Episodio", contentEpisodeId));
        //Nome do programa, tanto para videos como para páginas
        this.dimensionsValues.push(new IOLDataLayerItem("Programa_Nome", IOLDataLayerType.BOTH, "Sem Programa", IOLStringUtilsModule.simplifyAndCutEncodedString(contentProgramName, this.MAX_LENG)));
        //Autor do artigo
        this.dimensionsValues.push(new IOLDataLayerItem("Autor", IOLDataLayerType.PAGEVIEW, "Sem Autor", IOLStringUtilsModule.simplifyAndCutEncodedString(contentAuthor, this.MAX_LENG)));
        //Tópicos dos artigos
        this.dimensionsValues.push(new IOLDataLayerItem("Tags", IOLDataLayerType.PAGEVIEW, "Sem Tags", IOLStringUtilsModule.simplifyAndCutEncodedString(contentKeywords, this.MAX_LENG)));
        //Saber qual a versão do player que utilizamos
        this.dimensionsValues.push(new IOLDataLayerItem("versao player", IOLDataLayerType.EVENT, "", version));
        //Se o play programa foi gerado em simultaneo que o Video Play
        this.dimensionsValues.push(new IOLDataLayerItem("Videoplay_Simultaneo", IOLDataLayerType.EVENT, "", contentVideoPlay));
        //Tipo do video, se é integra, cliq, live ou macro
        this.dimensionsValues.push(new IOLDataLayerItem("Tipo", IOLDataLayerType.EVENT, "", contentVideoType));
        //Se o program está a ser trasmitido em direto, online ou vod
        this.dimensionsValues.push(new IOLDataLayerItem("Live", IOLDataLayerType.EVENT, "", contentLiveType));
        //A plataforma pelo qual o conteúdo está a ser visto, IA, AMP, WEB e APP
        this.dimensionsValues.push(new IOLDataLayerItem("Plataforma", IOLDataLayerType.BOTH, "", platform.toUpperCase()));
        //Nome da adunit do dfp
        this.dimensionsValues.push(new IOLDataLayerItem("AdUnit", IOLDataLayerType.BOTH, "", adunit.toLowerCase()));
        //Nome do local onde o utilizador clicou já no site para ir ter ao conteúdo
        this.dimensionsValues.push(new IOLDataLayerItem("origem_interna", IOLDataLayerType.PAGEVIEW, "Externo||Nao Definido||Nao Definido||Nao Definido", internalOrigin));
    }
    /**
     * Convert to a JSON object depending on the event type
     * @param {IOLDataLayerType} dataLayerType
     */
    IOLDataLayerObject.prototype.toObject = function (dataLayerType) {
        var obj = {};
        var values = this.dimensionsValues.filter(function (value, index) {
            return value.itemType === dataLayerType ||
                value.itemType === IOLDataLayerType.BOTH;
        });
        values.forEach(function (element) {
            obj[element.itemDimensionName] = element.getValue();
        });
        return obj;
    };
    /**
     * Create the JSON Object for a Virtual Page View
     * @param {string} pageUrl
     * @param {string} pageTitle
     * @param {object} extraValuesObject
     */
    IOLDataLayerObject.prototype.toUpdateVirtualPageViewObj = function (pageUrl, extraValuesObject) {
        var initObjc = {
            virtualPageURL: pageUrl,
            event: "VirtualPageview"
        };
        if (extraValuesObject)
            initObjc = __assign(__assign({}, initObjc), extraValuesObject);
        return __assign(__assign({}, initObjc), this.toObject(IOLDataLayerType.PAGEVIEW));
    };
    /**
     * Create the JSON Object for an Event
     * @param {string} eventCategory
     * @param {string} eventLabel
     * @param {string} eventAction
     * @param {string} eventType
     * @param {object} extraValuesObject
     */
    IOLDataLayerObject.prototype.toEventObject = function (eventCategory, eventLabel, eventAction, eventType, extraValuesObject) {
        var initObjc = {
            eventCategory: eventCategory,
            eventLabel: eventLabel,
            eventAction: eventAction,
            event: eventType
        };
        if (extraValuesObject)
            initObjc = __assign(__assign({}, initObjc), extraValuesObject);
        return __assign(__assign({}, initObjc), this.toObject(IOLDataLayerType.EVENT));
    };
    return IOLDataLayerObject;
}());

/**
 * Analyics Module
 */
var IOLAnalytics = /** @class */ (function () {
    /**
     * Loads the IOLAnalytics Module, which includes:
     *  1. Reading the cookies for the internal origin
     *  2. Reading the content metadata
     *  3. Creating the data layer
     *  4. Loading the GTM
     */
    function IOLAnalytics() {
        this.MAX_LENG = 150;
        this.COOKIE_NAME = "analytics_origin";
        this.INTERNAL_URLS = {
            "iol.pt": "IOL",
            "tvi.iol.pt": "TVI",
            "tvi24.iol.pt": "TVI24",
            "tviplayer.iol.pt": "TVIPLAYER",
            "maisfutebol.iol.pt": "MAISFUTEBOL",
            "selfie.iol.pt": "SELFIE",
            "autoportal.iol.pt": "AUTOPORTAL",
            "lux.iol.pt": "LUX"
        };
        this.readCookies();
        this.readMetadata();
        this.createDataLayer();
        this.loadGTM();
    }
    /**
     * Checks the cookies for internal origin
     */
    IOLAnalytics.prototype.readCookies = function () {
        this.cookie_origin = IOLCookiesUtilsModule.getCookie(this.COOKIE_NAME);
        IOLCookiesUtilsModule.removeCookie(this.COOKIE_NAME, "/", "iol.pt");
    };
    /**
     * Gets the content information from the metatags
     */
    IOLAnalytics.prototype.readMetadata = function () {
        this.iol_ctags = document
            .querySelector("meta[property='iol:ctags']")
            .getAttribute("content");
        this.iol_tags = document
            .querySelector("meta[property='iol:tags']")
            .getAttribute("content");
        this.iol_author = document
            .querySelector("meta[property='iol:author']")
            .getAttribute("content");
        this.iol_content_type = document
            .querySelector("meta[property='iol:content_type']")
            .getAttribute("content");
        this.iol_section = document
            .querySelector("meta[property='iol:section']")
            .getAttribute("content");
        this.iol_platform = document
            .querySelector("meta[property='iol:platform']")
            .getAttribute("content");
        this.iol_adunit = document
            .querySelector("meta[property='iol:adunit']")
            .getAttribute("content");
        this.iol_programme_name = document
            .querySelector("meta[property='iol:programme_name']")
            .getAttribute("content");
        this.iol_episode = document
            .querySelector("meta[property='iol:episode']")
            .getAttribute("content");
        this.iol_content = document
            .querySelector("meta[property='iol:content']")
            .getAttribute("content");
        this.iol_content_title = document
            .querySelector("meta[property='iol:content_title']")
            .getAttribute("content");
        this.iol_gtm = document
            .querySelector("meta[property='iol:gtm']")
            .getAttribute("content");
        this.iol_project = document
            .querySelector("meta[property='iol:project']")
            .getAttribute("content");
        //definir os dados a enviar para o dário e guardar na meta
        if (this.cookie_origin)
            this.iol_page_origin = this.cookie_origin;
        else {
            this.iol_page_origin = this.getReferrer() + "||Nao Definido||Nao Definido||Nao Definido";
        }
    };
    /**
     * Gets the URL referal
     */
    IOLAnalytics.prototype.getReferrer = function () {
        var referrer = this.INTERNAL_URLS[IOLStringUtilsModule.getDomainFromURL(document.referrer)];
        return referrer ? referrer : "Externo";
    };
    /**
     * Creates the default Data Layer
     */
    IOLAnalytics.prototype.createDataLayer = function () {
        this.dataLayerObj = new IOLDataLayerObject(this.iol_content_title, this.iol_content_type, this.iol_content_title, this.iol_content, this.iol_episode, this.iol_programme_name, this.iol_author, this.iol_tags, "", "", "", "", this.iol_platform, this.iol_adunit, this.iol_page_origin);
        window.dataLayer = [
            this.dataLayerObj.toObject(IOLDataLayerType.PAGEVIEW)
        ];
    };
    /**
     * Loads Google Tag Manager
     */
    IOLAnalytics.prototype.loadGTM = function () {
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
            j["async"] = true;
            j["src"] = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", this.iol_gtm);
    };
    /**
     * Listen to click on anchor elements that aren't already measeured
     * @param {boolean} onload
     */
    IOLAnalytics.prototype.clickListener = function (onload) {
        if (onload) {
            var _this = this;
            document.addEventListener("DOMContentLoaded", function () {
                _this.loadClickListener();
            });
        }
        else {
            this.loadClickListener();
        }
    };
    /**
     * Listen to click on anchor elements that aren't already measured
     */
    IOLAnalytics.prototype.loadClickListener = function () {
        var _this = this;
        var elementsToMeasure = document.querySelectorAll("a:not(.not-measure):not(.already-measured)");
        elementsToMeasure.forEach(function (element) {
            element.classList.add("already-measured");
            element.addEventListener("click", function () {
                var identity = this.getAttribute("data-iol-identity");
                if (!identity) {
                    var parent = this.parentNode.parentNode;
                    identity = parent.getAttribute("data-iol-identity");
                    while (parent.classList.length === 0 && !identity) {
                        parent = parent.parentNode;
                        identity = parent.getAttribute("data-iol-identity");
                    }
                }
                var origin = _this.iol_project.toUpperCase() + "||" + (_this.iol_section ? _this.iol_section.toLowerCase() : "Não Definido") + "||" + (_this.iol_content_type
                    ? _this.iol_content_type.toLowerCase()
                    : "Não Definido") + "||" + identity.toLowerCase();
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 60 * 1000);
                IOLCookiesUtilsModule.createCookie(_this.COOKIE_NAME, origin, expirationDate, "/", "iol.pt");
            });
        });
    };
    /**
     * Sets the internal origin
     * @param {string} identity
     * @param {boolean} isRedirect
     */
    IOLAnalytics.prototype.setInternalOrigin = function (identity, isRedirect) {
        var origin = this.defineInternalOrigin(identity, isRedirect);
        if (!isRedirect) {
            if (typeof window.dataLayer !== "undefined" && origin) {
                window.dataLayer.push({ origem_interna: origin });
            }
        }
    };
    /**
     * Defines the internal origin, in case of a redirect also creates the cookie
     * @param {string} identity
     * @param {boolean} isRedirect
     */
    IOLAnalytics.prototype.defineInternalOrigin = function (identity, isRedirect) {
        var origin = this.iol_project.toUpperCase() + "||" + this.iol_section.toLowerCase() + "||" + this.iol_content_type.toLowerCase() + "||" + identity.toLowerCase();
        if (isRedirect) {
            var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 60 * 1000);
            IOLCookiesUtilsModule.createCookie(this.COOKIE_NAME, origin, expirationDate, "/", "iol.pt");
            return "";
        }
        return origin;
    };
    /**
     * Sends a VirtualPageView
     */
    IOLAnalytics.prototype.updateVirtualPageView = function (pageUrl, dataLayerObj, extraValuesObject) {
        if (dataLayerObj === void 0) { dataLayerObj = undefined; }
        if (extraValuesObject === void 0) { extraValuesObject = undefined; }
        if (dataLayerObj) {
            var obj = dataLayerObj.toUpdateVirtualPageViewObj(pageUrl, extraValuesObject);
            window.dataLayer.push(obj);
        }
    };
    /**
     * Sends a event to Tag Manager
     * @param {string} category
     * @param {string} label
     * @param {string} action
     * @param {string} eventType
     * @param {IOLDataLayerObject} dataLayerObj
     * @param {object} extraValuesObject
     */
    IOLAnalytics.prototype.sendEvent = function (category, label, action, eventType, dataLayerObj, extraValuesObject) {
        if (extraValuesObject === void 0) { extraValuesObject = undefined; }
        if (dataLayerObj) {
            var obj = dataLayerObj.toEventObject(category, label, action, eventType, extraValuesObject);
            window.dataLayer.push(obj);
        }
        else {
            //clean up datalayer Dário
            if (extraValuesObject) {
                window.dataLayer.push(extraValuesObject);
            }
        }
    };
    /**
     * * Create a {IOLDataLayerObject} simplyfied
     * @param {string}  contentType
     * @param {string}  contentTitle
     * @param {string}  contentId
     * @param {string}  platform
     * @param {string}  adunit
     * @param {string}  internalOrigin
     * @param {boolean} isRedirect
     */
    IOLAnalytics.prototype.createSimpleDataLayerObject = function (contentType, contentTitle, contentId, platform, adunit, internalOrigin, isRedirect) {
        return new IOLDataLayerObject(this.dataLayerObj.pageTitle, contentType, contentTitle, contentId, "", "", "", "", "", "", "", "", platform, adunit, this.defineInternalOrigin(internalOrigin, isRedirect));
    };
    /**
     * Create a {IOLDataLayerObject}
     * @param {string} contentType
     * @param {string} contentTitle
     * @param {string} contentId
     * @param {string} contentEpisodeId
     * @param {string} contentProgramName
     * @param {string} contentAuthor
     * @param {string} contentKeywords
     * @param {string} contentVideoPlay
     * @param {string} contentVideoType
     * @param {string} contentLiveType
     * @param {string} version
     * @param {string} platform
     * @param {string} adunit
     * @param {string} internalOrigin
     * @param {boolean} isRedirect
     */
    IOLAnalytics.prototype.createDataLayerObject = function (contentType, contentTitle, contentId, contentEpisodeId, contentProgramName, contentAuthor, contentKeywords, contentVideoPlay, contentVideoType, contentLiveType, version, platform, adunit, internalOrigin, isRedirect) {
        return new IOLDataLayerObject(this.dataLayerObj.pageTitle, contentType, contentTitle, contentId, contentEpisodeId, contentProgramName, contentAuthor, contentKeywords, contentVideoPlay, contentVideoType, contentLiveType, version, platform, adunit, this.defineInternalOrigin(internalOrigin, isRedirect));
    };
    return IOLAnalytics;
}());

