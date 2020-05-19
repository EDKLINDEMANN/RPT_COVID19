if (typeof(inDapIF) != 'undefined' && inDapIF) {
   var d = window.parent.document;
    var w = window.parent;
   if (typeof w.SAPO === 'undefined') {
		w.SAPO = {};
	} else {
		w.SAPO = w.SAPO;
	}
  } else if ('undefined' != typeof sas_in_iframe_popout && sas_in_iframe_popout) {
   var d = sas_topmost_iframe().ownerDocument;
   var w = top.window;
    if (typeof w.SAPO === 'undefined') {
		w.SAPO = {};
	} else {
		w.SAPO = w.SAPO;
	}
  } else{
	  var w = window;
	  var d = window.document;
	  if (typeof SAPO === 'undefined') {
	w.SAPO = {};
} else {
	w.SAPO = w.SAPO;
}
	  
  }


w.SAPO.namespace = function(ns) {
    if (!ns || !ns.length) {
        return null;
    }
    var levels = ns.split(".");
    var nsobj = SAPO;
    for (var i = (levels[0] === "SAPO") ? 1 : 0; i < levels.length; ++i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }
    return nsobj;
};
w.SAPO.verify = function(ns, minVersion) {
    if (!ns) {
        return;
    }
    var levels = ns.split(".");
    var nsobj = SAPO;
    for (var k = levels[0] === 'SAPO' ? 1 : 0, m = levels.length; k < m; k++) {
        nsobj = nsobj[levels[k]];
        if (!nsobj) {
            throw new Error('SAPO.verify: ' + ns + ' not found');
        }
    }
    if (!minVersion) {
        return;
    }
    if (typeof nsobj === 'function') {
        nsobj = nsobj.prototype;
    }
    var lhs = String(nsobj.version).match(/\d+/g) || [0];
    var rhs = String(minVersion).match(/\d+/g) || [0];
    for (k = 0, m = Math.min(lhs.length, rhs.length); k < m; k++) {
        if (lhs[k] < rhs[k]) {
            throw new Error('SAPO.verify: ' + ns + ' has low version (' + nsobj.version + ' < ' + minVersion + ')');
        }
    }
    if (lhs.length < rhs.length) {
        throw new Error('SAPO.verify: ' + ns + ' has low version (' + nsobj.version + ' < ' + minVersion + ')');
    }
};
w.SAPO.Class = function(name, baseClass, properties) {
    var derivedFunction = function() {
        if (this.__dont_init) {
            return;
        }
        if (this === window || !this) {
            throw new Error('Call "new ' + name + '(...);"');
        }
        if (derivedFunction['abstract']) {
            throw new Error("Abstract class: don't instantiate");
        }
        if (baseClass) {
            var abstractBackup = baseClass['abstract'];
            if (abstractBackup) {
                baseClass['abstract'] = false;
            }
            baseClass.apply(this, arguments);
            if (abstractBackup) {
                baseClass['abstract'] = abstractBackup;
            }
        }
        if (properties && typeof properties.init === 'function') {
            properties.init.apply(this, arguments);
        }
    };
    derivedFunction.name = derivedFunction.displayName = name;
    derivedFunction['abstract'] = properties['abstract'];
    if (baseClass) {
        baseClass.prototype.__dont_init = 1;
        derivedFunction.prototype = new baseClass();
        delete baseClass.prototype.__dont_init;
    }
    derivedFunction.prototype.toString = function() {
        return '[object ' + name + ']';
    };
    if (properties) {
        SAPO.extendObj(derivedFunction.prototype, properties);
    }
    return derivedFunction;
};
w.SAPO.safeCall = function(object, listener) {
    function rethrow(exception) {
        setTimeout(function() {
            if (exception.message) {
                exception.message += '\n' + (exception.stacktrace || exception.stack || '');
            }
            throw exception;
        }, 1);
    }
    if (object === null) {
        object = window;
    }
    if (typeof listener === 'string' && typeof object[listener] === 'function') {
        try {
            return object[listener].apply(object, [].slice.call(arguments, 2));
        } catch (ex) {
            rethrow(ex);
        }
    } else if (typeof listener === 'function') {
        try {
            return listener.apply(object, [].slice.call(arguments, 2));
        } catch (ex) {
            rethrow(ex);
        }
    } else if (typeof object === 'function') {
        try {
            return object.apply(window, [].slice.call(arguments, 1));
        } catch (ex) {
            rethrow(ex);
        }
    }
};
w.s$ = function(element) {
    if (arguments.length > 1) {
        for (var i = 0, elements = [], length = arguments.length; i < length; i++) {
            elements.push(s$(arguments[i]));
        }
        return elements;
    }
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    return element;
};
Function.prototype.bindObj = function() {
    if (arguments.length < 2 && arguments[0] === undefined) {
        return this;
    }
    var __method = this;
    var args = [];
    for (var i = 0, total = arguments.length; i < total; i++) {
        args.push(arguments[i]);
    }
    var object = args.shift();
    var fn = function() {
        return __method.apply(object, args.concat(function(tmpArgs) {
            var args2 = [];
            for (var j = 0, total = tmpArgs.length; j < total; j++) {
                args2.push(tmpArgs[j]);
            }
            return args2;
        }(arguments)));
    };
    fn.toString = function() {
        return String(__method);
    };
    fn.name = fn.displayName = __method.name;
    return fn;
};
Function.prototype.bindObjEvent = function() {
    var __method = this;
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var object = args.shift();
    return function(event) {
        return __method.apply(object, [event || window.event].concat(args));
    };
};
Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};
w.SAPO.extendObj = function(destination, source) {
    if (source) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];
            }
        }
    }
    return destination;
};
if (typeof w.SAPO.Browser === 'undefined') {
    w.SAPO.Browser = {
        IE: false,
        GECKO: false,
        OPERA: false,
        SAFARI: false,
        KONQUEROR: false,
        CHROME: false,
        model: false,
        version: false,
        userAgent: false,
        init: function() {
            this.detectBrowser();
            this.setDimensions();
            this.setReferrer();
        },
        setDimensions: function() {
            var myWidth = 0,
                myHeight = 0;
            if (typeof window.innerWidth === 'number') {
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
            this.windowWidth = myWidth;
            this.windowHeight = myHeight;
        },
        setReferrer: function() {
            this.referrer = document.referrer !== undefined ? document.referrer.length > 0 ? window.escape(document.referrer) : false : false;
        },
        detectBrowser: function() {
            var sAgent = navigator.userAgent;
            this.userAgent = sAgent;
            sAgent = sAgent.toLowerCase();
            if ((new RegExp("applewebkit\/")).test(sAgent)) {
                if ((new RegExp("chrome\/")).test(sAgent)) {
                    this.CHROME = true;
                    this.model = 'chrome';
                    this.version = sAgent.replace(new RegExp("(.*)chrome\/([^\\s]+)(.*)"), "$2");
                    this.cssPrefix = '-webkit-';
                    this.domPrefix = 'Webkit';
                } else {
                    this.SAFARI = true;
                    this.model = 'safari';
                    this.version = sAgent.replace(new RegExp("(.*)applewebkit\/([^\\s]+)(.*)"), "$2");
                    this.cssPrefix = '-webkit-';
                    this.domPrefix = 'Webkit';
                }
            } else if ((new RegExp("opera")).test(sAgent)) {
                this.OPERA = true;
                this.model = 'opera';
                this.version = sAgent.replace(new RegExp("(.*)opera.([^\\s$]+)(.*)"), "$2");
                this.cssPrefix = '-o-';
                this.domPrefix = 'O';
            } else if ((new RegExp("konqueror")).test(sAgent)) {
                this.KONQUEROR = true;
                this.model = 'konqueror';
                this.version = sAgent.replace(new RegExp("(.*)konqueror\/([^;]+);(.*)"), "$2");
                this.cssPrefix = '-khtml-';
                this.domPrefix = 'Khtml';
            } else if (/(msie|trident)/i.test(sAgent)) {
                this.IE = true;
                this.model = 'ie';
                if (/rv:((?:\d|\.)+)/.test(sAgent)) {
                    this.version = sAgent.match(/rv:((?:\d|\.)+)/)[1];
                } else {
                    this.version = sAgent.replace(/(.*)\smsie\s([^;]+);(.*)/, "$2");
                }
                this.cssPrefix = '-ms-';
                this.domPrefix = 'ms';
            } else if ((new RegExp("gecko")).test(sAgent)) {
                this.GECKO = true;
                var re = new RegExp("(camino|chimera|epiphany|minefield|firefox|firebird|phoenix|galeon|iceweasel|k\\-meleon|seamonkey|netscape|songbird|sylera)");
                if (re.test(sAgent)) {
                    this.model = sAgent.match(re)[1];
                    this.version = sAgent.replace(new RegExp("(.*)" + this.model + "\/([^;\\s$]+)(.*)"), "$2");
                    this.cssPrefix = '-moz-';
                    this.domPrefix = 'Moz';
                } else {
                    this.model = 'mozilla';
                    var reVersion = new RegExp("(.*)rv:([^)]+)(.*)");
                    if (reVersion.test(sAgent)) {
                        this.version = sAgent.replace(reVersion, "$2");
                    }
                    this.cssPrefix = '-moz-';
                    this.domPrefix = 'Moz';
                }
            }
        },
        debug: function() {
            var str = "known browsers: (ie, gecko, opera, safari, konqueror) \n";
            str += [this.IE, this.GECKO, this.OPERA, this.SAFARI, this.KONQUEROR] + "\n";
            str += "model -> " + this.model + "\n";
            str += "version -> " + this.version + "\n";
            str += "\n";
            str += "original UA -> " + this.userAgent;
            alert(str);
        }
    };
    w.SAPO.Browser.init();
}
w.SAPO.logReferer = function(classURL) {
    var thisOptions = SAPO.extendObj({
        s: 'js.sapo.pt',
        swakt: '59a97a5f-0924-3720-a62e-0c44d9ea4f16',
        pg: false,
        swasection: false,
        swasubsection: '',
        dc: '',
        ref: false,
        etype: 'libsapojs-view',
        swav: '1',
        swauv: '1',
        bcs: '1',
        bsr: '1',
        bul: '1',
        bje: '1',
        bfl: '1',
        debug: false
    }, arguments[1] || {});
    if (typeof classURL !== 'undefined' && classURL !== null) {
        if (!thisOptions.pg) {
            thisOptions.pg = classURL;
        }
        if (!thisOptions.swasection) {
            thisOptions.swasection = classURL;
        }
        if (!thisOptions.ref) {
            thisOptions.ref = location.href;
        }
        var waURI = 'http://wa.sl.pt/wa.gif?';
        var waURISSL = 'https://wa.sl.pt/wa.gif?';
        var aQuery = ['pg=' + encodeURIComponent(thisOptions.pg), 'swasection=' + encodeURIComponent(thisOptions.swasection), 'swasubsection=' + encodeURIComponent(thisOptions.swasubsection), 'dc=' + encodeURIComponent(thisOptions.dc), 's=' + thisOptions.s, 'ref=' + encodeURIComponent(thisOptions.ref), 'swakt=' + thisOptions.swakt, 'etype=' + encodeURIComponent(thisOptions.etype), 'swav=' + encodeURIComponent(thisOptions.swav), 'swauv=' + encodeURIComponent(thisOptions.swauv), 'bcs=' + encodeURIComponent(thisOptions.bcs), 'bsr=' + encodeURIComponent(thisOptions.bsr), 'bul=' + encodeURIComponent(thisOptions.bul), 'bje=' + encodeURIComponent(thisOptions.bje), 'bfl=' + encodeURIComponent(thisOptions.bfl), ''];
        var waLogURI = ((location.protocol === 'https:') ? waURISSL : waURI);
        var img = new Image();
        img.src = waLogURI + aQuery.join('&');
    }
};
w.SAPO._require = function(uri, callBack) {
    if (typeof uri !== 'string') {
        return;
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    var aHead = document.getElementsByTagName('HEAD');
    if (aHead.length > 0) {
        aHead[0].appendChild(script);
    }
    if (document.addEventListener) {
        script.onload = function(e) {
            if (typeof callBack !== 'undefined') {
                callBack();
            }
        };
    } else {
        script.onreadystatechange = function(e) {
            if (this.readyState === 'loaded') {
                if (typeof callBack !== 'undefined') {
                    callBack();
                }
            }
        };
    }
    script.src = uri;
};
w.SAPO.require = function(reqArray, callBack) {
    var objectsToCheck = [];
    var uriToAdd = [];
    var _isSAPOObject = function(param) {
        if (typeof param === 'string') {
            if (/^SAPO\./.test(param)) {
                return true;
            }
        }
        return false;
    };
    var _isObjectUri = function(param) {
        if (typeof param === 'object' && param.constructor === Object) {
            if (typeof param.uri === 'string') {
                return true;
            }
        }
        return false;
    };
    var _isObjectArray = function(param) {
        if (typeof param === 'object' && param.constructor === Array) {
            return true;
        }
        return false;
    };
    var _parseSAPOObject = function(param) {
        var aSAPO = param.split('.');
        var sapoURI = aSAPO.join('/');
        return 'http://js.sapo.pt/' + sapoURI + '/';
    };
    var _parseObjectUri = function(param) {
        return param.uri;
    };
    var _objectExists = function(objStr, ver) {
        if (typeof objStr !== 'undefined') {
            var aStrObj = objStr.split('.');
            var objParent = window;
            for (var k = 0, aStrObjLength = aStrObj.length; k < aStrObjLength; k++) {
                if (typeof objParent[aStrObj[k]] !== 'undefined') {
                    objParent = objParent[aStrObj[k]];
                } else {
                    return false;
                }
            }
            if (typeof ver !== 'undefined' && ver !== null) {
                if (typeof objParent.version !== 'undefined') {
                    if (objParent.version === ver) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            }
            return true;
        }
    };
    var requestRecursive = function() {
        if (uriToAdd.length > 1) {
            SAPO._require(uriToAdd[0], requestRecursive);
            uriToAdd.splice(0, 1);
        } else if (uriToAdd.length === 1) {
            if (typeof callBack !== 'undefined') {
                SAPO._require(uriToAdd[0], callBack);
            } else {
                SAPO._require(uriToAdd[0]);
            }
            uriToAdd.splice(0, 1);
        } else if (uriToAdd.length === 0) {
            if (typeof callBack !== 'undefined') {
                callBack();
            }
        }
    };
    if (typeof reqArray !== 'undefined') {
        var cur = false;
        var curURI = false;
        if (typeof reqArray === 'string') {
            if (_isSAPOObject(reqArray)) {
                if (!_objectExists(reqArray)) {
                    uriToAdd.push(_parseSAPOObject(reqArray));
                }
            } else {
                uriToAdd.push(reqArray);
            }
        } else {
            for (var i = 0, reqArrayLength = reqArray.length; i < reqArrayLength; i++) {
                cur = reqArray[i];
                if (_isSAPOObject(cur)) {
                    if (!_objectExists(cur)) {
                        objectsToCheck.push(cur);
                        uriToAdd.push(_parseSAPOObject(cur));
                    }
                } else if (_isObjectArray(cur)) {
                    if (cur.length > 0) {
                        if (_isSAPOObject(cur[0])) {
                            if (!_objectExists(cur[0])) {
                                if (cur.length === 2) {
                                    uriToAdd.push(_parseSAPOObject(cur[0]) + cur[1] + '/');
                                } else {
                                    uriToAdd.push(_parseSAPOObject(cur[0]));
                                }
                            }
                        }
                    }
                } else {
                    if (typeof cur === 'string') {
                        uriToAdd.push(cur);
                    } else {
                        if (_isObjectUri(cur)) {
                            if (typeof cur.check === 'string') {
                                if (typeof cur.version === 'string') {
                                    if (!_objectExists(cur.check, cur.version)) {
                                        uriToAdd.push(_parseObjectUri(cur));
                                    }
                                } else {
                                    if (!_objectExists(cur.check)) {
                                        uriToAdd.push(_parseObjectUri(cur));
                                    }
                                }
                            } else {
                                uriToAdd.push(_parseObjectUri(cur));
                            }
                        }
                    }
                }
            }
        }
        if (arguments.length === 3) {
            if (typeof arguments[2] === 'boolean') {
                if (arguments[2] === true) {
                    for (var l = 0, uriToAddLength = uriToAdd.length; l < uriToAddLength; l++) {
                        w.SAPO._require(uriToAdd[l]);
                    }
                    if (typeof callBack !== 'undefined') {
                        callBack();
                    }
                    return;
                }
            }
            requestRecursive();
        } else {
            requestRecursive();
        }
    }
};
(function() {

  if (typeof(inDapIF) != 'undefined' && inDapIF) {
   this.d = window.parent.document;
   this.w = window.parent;
  } else if ('undefined' != typeof sas_in_iframe_popout && sas_in_iframe_popout) {
   this.d = sas_topmost_iframe().ownerDocument;
   this.w = top.window;
  } else {
	  this.d = window.document;
   this.w = window;
	  
  }

    window.TakeOver = function() {
        this._init(window.TakeOverAds || {});
    };
    window.TakeOver.prototype = {
        _init: function(options) {
            this._baseURI = options.baseURI || window.location.protocol + '//js.sapo.pt/';
            this._options = w.SAPO.extendObj({
                html: null,
                container: false,
                containerPosition: 'bottom',
                zoneId: false,
                cpid: false,
                aff: false,
                baseURI: '',
                theme: 'dark',
               //cssURI: this._baseURI + 'Assets/Images/ProjectTakeover/takeover.css',
				cssURI: 'https://reclames.impresa.pt/staticfilesbb2017a/takeover.css',
                cssURI_bsu2: 'https://reclames.impresa.pt/staticfilesbb2017a/takeover_bsu2.css',
                capping: 3,
                responseTimeout: 10000,
                cookieNamePrefix: 'takeover_',
                cookieCustom: false,
                bodyClassName: false,
                cookieExpires: 60 * 60 * 24 * 7,
                onToggleCallBack: false,
                campaignId: '',
                addButton: true,
                hasBSU: true
            }, options);
            this._contentElm = false;
            this._ifrElm = false;
            this._ifrWin = false;
            this._displayRemaining = false;
            this._timeout = false;
            this._isOpened = true;
            this._run();
        },
        _run: function() {
            var bsuTicks = 0,
                bsuCheckTick, maxTicks = 7,
                tickMS = 1000;
            var tickCB = function() {
                bsuTicks++;
                var hasBSU = document.getElementById('bsu_container') || document.getElementById('bsu-v2-ctn');
                if (hasBSU || bsuTicks >= maxTicks) {
                    clearInterval(bsuCheckTick);
                    return this._loadAd();
                }
            };
            if (this._options.hasBSU === false) {
                return this._loadAd();
            }
            bsuCheckTick = setInterval(tickCB.bindObj(this), tickMS);
        },
        _addCss: function() {
            var existingLinkTags = document.getElementsByTagName('link'),
                href;
            var bsu2 = !!document.getElementById('bsu-v2-ctn'),
                cssURI = bsu2 ? this._options.cssURI_bsu2 : this._options.cssURI;
            for (var i = 0, len = existingLinkTags.length; i < len; i++) {
                href = existingLinkTags[i].getAttribute('href');
                if (href.indexOf(cssURI) !== -1) {
                    return;
                }
            }
            var style = d.createElement("link");
            style.media = 'screen';
            style.type = 'text/css';
            style.href = cssURI;
            style.rel = "stylesheet";
            this._getInclusionElementsTarget().appendChild(style);
        },
        _getInclusionElementsTarget: function() {
            var head = d.getElementsByTagName("head");
            return (head && head[0]) ? head[0] : document.documentElement;
        },
        _loadAd: function() {
            var cookie = this._getCookie();
            this._displayRemaining = cookie === false ? this._options.capping + 1 : +cookie;
            if (this._displayRemaining > 0) {
                this._displayRemaining -= 1;
            }
            this._setCookie();
            this._isOpened = this._displayRemaining > 0 || cookie === false;
            this._addCss();
            this._createIframeContent();
            var containerHTML = d.getElementById(this._options.html);
            this._createIframe(containerHTML.textContent || containerHTML.innerText);
            containerHTML.parentNode.removeChild(containerHTML);
            if (this._options.bodyClassName) {
                this._addBodyClassName();
            }
        },
        _addBodyClassName: function() {
            if (this._isOpened) {
                this._removeClassName(document.body, 'sapo_takeover_generic_expanded');
                this._removeClassName(document.body, 'sapo_takeover_generic_collapsed');
                this._addClassName(document.body, 'sapo_takeover_generic_expanded');
            } else {
                this._removeClassName(document.body, 'sapo_takeover_generic_expanded');
                this._removeClassName(document.body, 'sapo_takeover_generic_collapsed');
                this._addClassName(document.body, 'sapo_takeover_generic_collapsed');
            }
        },
        _getIframeToggleClassName: function() {
            var closedStr = this._isOpened ? '' : '_closed';
            return 'sapo_takeover_iframetoggle' + closedStr;
        },
        _getIframeContentClassName: function() {
            var closedStr = this._isOpened ? '' : '_closed';
            var theme = this._options.theme;
            return 'sapo_takeover_iframecontent' + closedStr + ' sapo_takeover_theme_' + theme;
        },
        _createIframeContent: function() {
            this._contentElm = document.createElement('div');
            this._contentElm.className = this._getIframeContentClassName();
            this._contentElm.style.display = "none";
        },
        _createIframe: function(html) {
            this._ifrElm = document.createElement('iframe');
            this._ifrElm.setAttribute('frameborder', '0');
            this._ifrElm.setAttribute('scrolling', 'no');
            this._ifrElm.setAttribute('allowfullscreen', 'true');
            this._ifrElm.setAttribute('width', '100%');
            this._ifrElm.setAttribute('height', '100%');
            this._ifrElm.className = 'sapo_takeover_iframe';
            this._ifrElm.style.zIndex = '5';
            this._ifrElm.src = 'about:blank';
            this._contentElm.appendChild(this._ifrElm);
            this._addIfrContent();
            this._addButton();
            if (this._ifrWin) {
                this._writeIframeHTML(html);
            }
            setTimeout(function() {
                this._ifrElm.style.width = (this._ifrElm.offsetWidth - 1) + "px";
                setTimeout(function() {
                    this._ifrElm.style.width = "";
                }.bindObj(this), 50);
            }.bindObj(this), 250);
        },
        _addButton: function() {
            if (!this._options.addButton) {
                return;
            }
            this._toggleElm = document.createElement('button');
            this._toggleElm.setAttribute('type', 'button');
            this._toggleElm.className = this._getIframeToggleClassName();
            this._toggleElm.style.zIndex = '10';
            this._toggleElm.innerHTML = (this._isOpened) ? 'Fechar' : 'Abrir';
            if (!d.addEventListener) {
                this._toggleElm.style.backgroundImage = 'url(https://reclames.impresa.pt/staticfiles/seta_to_dark.png)';
            }
            var handler = this._onToggleButtonClick.bindObjEvent(this);
            if (this._toggleElm.addEventListener) {
                this._toggleElm.addEventListener('click', handler, false);
            } else if (this._toggleElm.attachEvent) {
                this._toggleElm.attachEvent('onclick', handler);
            } else {
                this._toggleElm.onclick = handler;
            }
            this._contentElm.appendChild(this._toggleElm);
        },
        _getCookieName: function() {
            if (this._options.cookieCustom && typeof(this._options.cookieCustom) === 'string') {
                return this._options.cookieCustom;
            } else {
                return this._options.cookieNamePrefix + this._options.campaignId;
            }
        },
        _onToggleButtonClick: function(event) {
            var elm = this._toggleElm,
                container = this._contentElm;
            this._isOpened = !this._isOpened;
            this._setCookie();
            container.className = this._getIframeContentClassName();
            elm.className = this._getIframeToggleClassName();
            elm.innerHTML = (this._isOpened) ? 'Fechar' : 'Abrir';
            if (this._options.bodyClassName) {
                this._addBodyClassName();
            }
            if (typeof(this._options.onToggleCallBack) === 'function' && typeof(event) !== 'undefined') {
                this._options.onToggleCallBack(event, this._isOpened);
            }
        },
        _addIfrContent: function() {
            if (!this._options.container) {
                var bsuRoot = d.getElementById('bsu_root'),
                    insertBeforeElm;
                if (!bsuRoot && !d.getElementById('bsu_container')) {
                    this._contentElm.style.marginTop = 0;
                }
                if (bsuRoot !== null) {
                    insertBeforeElm = bsuRoot.nextSibling;
                    if (!insertBeforeElm) {
                        insertBeforeElm = bsuRoot;
                    }
                } else if (document.body !== null) {
                    insertBeforeElm = d.body.firstChild;
                }
                if (insertBeforeElm) {
                    insertBeforeElm.parentNode.insertBefore(this._contentElm, insertBeforeElm);
                    this._ifrWin = this._ifrElm.contentWindow;
                }
            } else {
                var container = s$(this._options.container);
                if (container !== null) {
                    if (this._options.containerPosition === 'top' && container.firstChild !== null) {
                        container.insertBefore(this._contentElm, container.firstChild);
                    } else {
                        container.appendChild(this._contentElm);
                    }
                    this._ifrWin = this._ifrElm.contentWindow;
                }
            }
        },
        _writeIframeHTML: function(html) {
            if (this._ifrElm.contentWindow) {
                if (window.addEventListener) {
                    this._ifrElm.contentWindow.document.open('text/html', 'replace');
                    this._ifrElm.contentWindow.document.write(html);
                    this._ifrElm.contentWindow.document.close();
                } else {
                    this._ifrElm.contentWindow.contents = html;
                    this._ifrElm.src = 'javascript:window["contents"]';
                }
            }
        },
        _getCookie: function() {
            var name = this._getCookieName();
            var cookie = document.cookie || false;
            if (cookie) {
                cookie = cookie.replace(new RegExp("; ", "g"), ';');
                var aCookie = cookie.split(';');
                var aItem = [];
                if (aCookie.length > 0) {
                    for (var i = 0; i < aCookie.length; i++) {
                        aItem = aCookie[i].split('=');
                        if (aItem.length === 2 && aItem[0] === name) {
                            return aItem[1];
                        }
                    }
                }
            }
            return false;
        },
        _setCookie: function() {
            var name = this._getCookieName(),
                value = this._isOpened ? this._displayRemaining : '0',
                expires = this._options.cookieExpires;
            var sExpires = '';
            if (!name || !expires) {
                return;
            }
            if (expires && typeof(expires) !== 'undefined' && !isNaN(expires)) {
                var oDate = new Date();
                var sDate = (parseInt(Number(oDate.valueOf()), 10) + (Number(parseInt(expires, 10)) * 1000));
                var nDate = new Date(sDate);
                var expiresString = nDate.toGMTString();
                var re = new RegExp("([^\\s]+)(\\s\\d\\d)\\s(\\w\\w\\w)\\s(.*)");
                expiresString = expiresString.replace(re, "$1$2-$3-$4");
                sExpires = 'expires=' + expiresString;
            }
            document.cookie = name + '=' + value + '; ' + sExpires + '; path=/; domain=' + window.location.hostname;
        },
        _addClassName: function(elm, className) {
            if (elm && className) {
                if (typeof elm.classList !== "undefined") {
                    elm.classList.add(className);
                } else if (!this._hasClassName(elm, className)) {
                    elm.className += (elm.className ? ' ' : '') + className;
                }
            }
        },
        _removeClassName: function(elm, className) {
            if (elm && className) {
                if (typeof elm.classList !== "undefined") {
                    elm.classList.remove(className);
                } else {
                    if (typeof elm.className === "undefined") {
                        return false;
                    }
                    var elmClassName = elm.className,
                        re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
                    elmClassName = elmClassName.replace(re, ' ');
                    elmClassName = elmClassName.replace(/^\s+/, '').replace(/\s+$/, '');
                    elm.className = elmClassName;
                }
            }
        },
        _hasClassName: function(elm, className) {
            if (elm && className) {
                if (typeof elm.classList !== "undefined") {
                    return elm.classList.contains(className);
                } else {
                    if (typeof elm.className === "undefined") {
                        return false;
                    }
                    var elmClassName = elm.className;
                    if (typeof elmClassName.length === "undefined") {
                        return false;
                    }
                    if (elmClassName.length > 0) {
                        if (elmClassName === className) {
                            return true;
                        } else {
                            var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
                            if (re.test(elmClassName)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
    };
    new TakeOver();
})();