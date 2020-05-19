///PROD FILE
var CofinaSSOApi = function () {

    //#region default values
    var _defaultValues = {
        SSOSiteUrl: 'https://aminhaconta.xl.pt/',
        SSOLayer: 'sso_layer',
        AppID: '',
        SiteHost: window.location.host,
        SSORootDivID: 'cofinasso-root',
        SSORootIframe: 'cofinasso-arbitation',
        SSOFavouriteNewsIframe: 'cofinasso-favourite-news',
        SSORootIframeCommunication: 'cofinasso-arbitation-communication',
        SSOLoginCookieName: "cof_site_user",
        SSORedirectProtectionCookieName: "cof_redir_protect",
        DonAskNickSelectionCookieName: "cof_dontask_nick_cookie",
        ThirdpartyScriptUrl: '//aminhaconta.xl.pt/Api/Js/ThirdpartySSOApi.js',
        UserAgentValidatorUrl: '//aminhaconta.xl.pt/Api/Js/UserAgentValidator.js',
        UseThirdparty: true,
        AlwaysShowLoginInLayer: true,
        SSOHost: 'aminhaconta.xl.pt',
        LogToConsole: false
    };

    var _communicationMethods = {
        CloseCurrentLayer: "CLOSE_CURRENT_LAYER",
        CloseCurrentLayerWithCheckLogin: "CLOSE_CURRENT_LAYER_WITH_CHECK_LOGIN",
        CloseNickLayerAndSetDontAskCookie: "CLOSE_NICK_LAYER_AND_SEND_DONT_ASK_COOKIE",
        OpenNickSelectionFrame: "OPEN_SITE_NICK_NAME_SELECTION_FRAME",
        EndedSettingDefaultVars: "LOAD_DEFAULT_VARS_ENDED",
        GetCampaign: "GET_CAMPAIGN",
        AddFavouriteSucess: "ADD_FAVOURITE_SUCESS",
        AddFavouriteError: "ADD_FAVOURITE_ERROR",
        OpenCofinaConversionLayer: "OPEN_COFINA_CONVERSION_LAYER"
    };


    //#endregion

    //#region console
    var _log = function (data) {
        if (_defaultValues.LogToConsole)
            console.warn(data);
    };
    //#endregion

    var _registerUserAgentValidatorScript = function () {
        if (window.UserAgentValidator)
            return;

        var script = document.createElement("script");

        var url = _defaultValues.UserAgentValidatorUrl + (_defaultValues.UserAgentValidatorUrl.indexOf('?') > -1 ? "&" : "?") + "_=" + String(Math.random() * 100000);
        script.src = url;
        script.type = "text/javascript";
        script.async = "async";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    //#region thirdparty
    var _registerThirdparty = function () {
        var script = document.createElement("script");

        var url = _defaultValues.ThirdpartyScriptUrl + (_defaultValues.ThirdpartyScriptUrl.indexOf('?') > -1 ? "&" : "?") + "_=" + String(Math.random() * 100000);
        script.src = url;
        script.type = "text/javascript";
        script.async = "async";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    var _thirpartySessionValidation = function (uid) {

        if (_isNullOrEmpty(uid))
            uid = "";

        _thirdpartyUid = uid;


        var siteLoginToken = _checkCookie(_defaultValues.SSOLoginCookieName);

        if (_isNullOrEmpty(siteLoginToken))
            siteLoginToken = "";
        else {
            try {

                //resolução de problema com as cookies no iPad.
                if (document.referrer.toLowerCase().indexOf("check_login") != -1) {

                    var redirectProtectionCookie = _checkCookie(_defaultValues.SSORedirectProtectionCookieName);

                    if (_isNullOrEmpty(redirectProtectionCookie)) {
                        _createCookieWithMinutes(_defaultValues.SSORedirectProtectionCookieName, "1", 0.3);
                    }
                    else if (redirectProtectionCookie == "1")
                        _createCookieWithMinutes(_defaultValues.SSORedirectProtectionCookieName, "2", 0.3);
                    else {
                        siteLoginToken = "";
                        _createCookie(_defaultValues.SSOLoginCookieName, siteLoginToken, 365);
                    }
                }
            }
            catch (errRedirectProtection) {
                _log(errRedirectProtection);
            }
        }

        _setArbitationFrame(_defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/CHECK_LOGIN_FROM_THIRDPARTY?returnUrl=" + encodeURIComponent(window.top.location.href) + "&siteLoginToken=" + siteLoginToken + "&thirdpartyUID=" + uid);
    };

    var _openCofinaConversionLayer = function () {
        _createFullScreenLayer(600, 400, _defaultValues.SSOSiteUrl + "conversions/cofina.aspx?isLayer=1&site=" + encodeURIComponent(window.top.location.hostname) + "&returnUrl=" + encodeURIComponent(window.top.location.href) + "&thirdpartyUserId=" + _thirdpartyUid);
    };
    //#endregion

    //#region vars
    var _thirdpartyUid = '';
    var _rootFrame = null;
    var _favouritesFrame = null;
    var _rootDiv = null;
    var _mustCheckLogin = false;
    var _favouriteNewsCallback = null;
    var _favouriteNewsAddCallback = null;
    var _favouriteNewsRemoveCallback = null;
    //#endregion

    //#region utils

    //#region common
    var _getScrollXY = function () {
        var scrOfX = 0, scrOfY = 0;
        if (typeof (window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [scrOfX, scrOfY];
    };

    var _isNullOrEmpty = function (text) {
        if (text == null)
            return true;

        return text == 'undefined' || text == '';
    };

    var _setBrowserScroll = function (disable) {
        //document.getElementsByTagName('body')[0].style.overflow = disable ? "hidden" : "auto";
    };

    var _getDocumentMaxHeight = function () {
        var body = document.body,
            html = document.documentElement;

        return Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
    };

    var _closeLayer = function () {
        var element = document.getElementById(_defaultValues.SSOLayer);

        if (element != null)
            document.getElementsByTagName('body')[0].removeChild(element);

        _setBrowserScroll(false);
    };

    var _createIframe = function (url, width, height, scrollbars, visible, allowCache) {

        if (_isNullOrEmpty(url))
            return;

        var iframe = document.createElement("iframe");

        if (!allowCache) {
            if (url.indexOf("?") != -1)
                url += "&";
            else
                url += "?";


            url += "_=" + String(Math.random());


        }

        if (url.indexOf("?") != -1)
            url += "&";
        else
            url += "?";

        url += "siteHost=" + _defaultValues.SiteHost;

        iframe.src = url;

        if (width != null)
            iframe.style.width = String(width) + "px";

        if (height != null)
            iframe.style.height = String(height) + "px";

        if (!scrollbars)
            iframe.setAttribute("scrolling", "no");
        else
            iframe.setAttribute("scrolling", "auto");

        if (!visible)
            iframe.style.display = "none";

        iframe.setAttribute("frameBorder", "0");


        return iframe;
    };

    var _appendTo = function (nodeName, nodeToAppend) {
        var s = document.getElementsByTagName(nodeName)[0]; s.appendChild(nodeToAppend);
    };
    //#endregion

    //#region cookies
    var _checkCookie = function (name) {
        var cookieValue = "";
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                cookieValue = c.substring(nameEQ.length, c.length);
        }

        if (!_isNullOrEmpty(cookieValue)) {
            return decodeURIComponent(cookieValue).replace(new RegExp(/\+/g), ' ');
        }

        return null;
    };

    var _createCookieWithMinutes = function (name, value, minutes) {
        var expires = "";
        if (minutes) {
            var date = new Date();
            if (minutes != null) {
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            else
                expires = ";";
        }

        var sameSite = "; ";
        if (typeof UserAgentValidator != "undefined" && UserAgentValidator.shouldSendSameSiteNone(navigator.userAgent)) {
            sameSite += " SameSite=None; Secure";
        }
        document.cookie = name + "=" + value + expires + "; path=/" + sameSite;
    };

    var _createCookie = function (name, value, days) {
        if (days) {
            _createCookieWithMinutes(name, value, (days * 24 * 60));
        }
        else {
            _createCookieWithMinutes(name, value);
        }
    };
    //#endregion

    //#region layers
    var _createFullScreenLayer = function (contentWidth, contentHeight, contentUrl, closeCallBack) {
        _setBrowserScroll(true);

        var layerHeight = _getDocumentMaxHeight();

        document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                CofinaSSOApi.closeLayer();

                if (closeCallBack) {
                    closeCallBack();
                }
            }
        };

        var layer = document.createElement("div");
        layer.style.zIndex = "10000000000";
        layer.style.top = "0px";
        layer.style.left = "0px";
        layer.style.position = "fixed";
        layer.style.width = "100%";
        layer.style.height = (layerHeight + "px");
        layer.style.background = "url('" + _defaultValues.SSOSiteUrl + "i/overlay.png')";

        //layer.setAttribute("style", "z-index:2147483638;top:0px;left:0px;position:absolute;width:100%;height:" + layerHeight + "px;background: url('" + _defaultValues.SSOSiteUrl + "i/overlay.png')");
        layer.onclick = function () {
            CofinaSSOApi.closeLayer();

            if (closeCallBack) {
                closeCallBack();
            }

        };
        //layer.setAttribute("onclick", "CofinaSSOApi.closeLayer();");
        layer.id = _defaultValues.SSOLayer;

        _appendTo("body", layer);

        if (contentHeight > layerHeight)
            contentHeight = layerHeight - 20;

        var windowHeight = "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;

        var contentTopMargin = Math.ceil((windowHeight - contentHeight) / 2);// + _getScrollXY()[1];

        if (contentTopMargin < 0)
            contentTopMargin = 0;

        var windowWidth = "innerWidth" in window
            ? window.innerWidth
            : document.documentElement.offsetWidth;

        var contentLeftMargin = Math.ceil((windowWidth - contentWidth) / 2);

        if (contentLeftMargin < 0)
            contentLeftMargin = 0;


        var insidePositionDiv = document.createElement("div");
        insidePositionDiv.style.marginLeft = String(contentLeftMargin + "px");
        insidePositionDiv.style.width = contentWidth + "px";
        insidePositionDiv.style.marginTop = String(contentTopMargin + "px");
        insidePositionDiv.style.display = "block";
        //insidePositionDiv.setAttribute("style", "margin: 0 auto;width:" + contentWidth + "px;padding-top:" + contentTopMargin + "px;");

        layer.appendChild(insidePositionDiv);

        var insideDiv = document.createElement('div');
        insideDiv.style.width = contentWidth + "px";
        insideDiv.style.height = contentHeight + "px";
        insideDiv.style.position = "fixed";
        //insideDiv.setAttribute('style', "width:" + contentWidth + "px;height:" + contentHeight + "px;position:fixed;");

        insidePositionDiv.appendChild(insideDiv);

        var layerCloseBtn = document.createElement('img');
        layerCloseBtn.title = "Fechar";
        layerCloseBtn.alt = "Fechar";
        layerCloseBtn.src = _defaultValues.SSOSiteUrl + "/img/bt_fechar.png";
        layerCloseBtn.style.position = "absolute";
        layerCloseBtn.style.top = "10px";
        //layerCloseBtn.style.width = "10px";
        layerCloseBtn.style.cursor = "pointer";
        layerCloseBtn.style.right = "10px";
        //layerCloseBtn.setAttribute("onclick", "CofinaSSOApi.closeLayer();");
        layerCloseBtn.onclick = function () {
            CofinaSSOApi.closeLayer();

            if (closeCallBack) {
                closeCallBack();
            }
        };

        insideDiv.appendChild(layerCloseBtn);

        var insideLayerIframe = _createIframe(contentUrl, contentWidth, contentHeight, true, true, true);


        insideDiv.appendChild(insideLayerIframe);
        insideLayerIframe.style.background = "#fff";
    };

    var _openNickSelectionLayer = function () {
        if (_isNullOrEmpty(_checkCookie(_defaultValues.DonAskNickSelectionCookieName))) {
            _createCookie(_defaultValues.DonAskNickSelectionCookieName, "1", 1000);
            _createFullScreenLayer(600, 400, _defaultValues.SSOSiteUrl + "api/layers/nickselection.aspx");
        }
    }
    //#endregion

    //#region iframes
    var _createFrames = function () {
        _rootDiv = document.createElement('div');
        _rootDiv.style.position = "absolute";
        _rootDiv.style.top = "-10000px";
        _rootDiv.style.height = "0px";
        _rootDiv.style.width = "0px";
        //_rootDiv.setAttribute("style", "position: absolute; top: -10000px; height: 0px; width: 0px;");
        _rootDiv.setAttribute("id", _defaultValues.SSORootDivID);

        _rootFrame = document.createElement('iframe');
        _rootFrame.setAttribute("id", _defaultValues.SSORootIframe);
        _rootFrame.setAttribute("name", _defaultValues.SSORootIframe);
        _rootFrame.setAttribute("title", "Cofina SSO Arbitration");

        _rootDiv.appendChild(_rootFrame);


        _favouritesFrame = document.createElement('iframe');
        _favouritesFrame.setAttribute("id", _defaultValues.SSOFavouriteNewsIframe);
        _favouritesFrame.setAttribute("name", _defaultValues.SSOFavouriteNewsIframe);
        _favouritesFrame.setAttribute("title", "Cofina SSO Favourite News");

        _rootDiv.appendChild(_favouritesFrame);


        _appendTo('body', _rootDiv);
    };

    var _setArbitationFrame = function (url) {

        var ord = Math.random() * 10000000000;

        url += (url.indexOf('?') == -1 ? "?" : "&") + "ord=" + ord;

        var newRoot = _rootFrame.cloneNode(true);
        newRoot.setAttribute("src", url);

        _rootFrame.parentNode.replaceChild(newRoot, _rootFrame);

        _rootFrame = newRoot;

    };
    //#endregion
    //#endregion

    //#region init
    var _init = function () {
        _createFrames();
        _setArbitationFrame(_defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/SET_DEFAULT_VARS?host=" + _defaultValues.SiteHost);

        try {
            if (window.addEventListener) {
                window.addEventListener('message', CofinaSSOApi.messageHandler, false);
            }
            else {
                window.attachEvent('onmessage', CofinaSSOApi.messageHandler);
            }
        }
        catch (ex) {
            _log('Unable to register message handler');
            _log(ex);
        }
    };

    var _messageHandler = function (event) {
        try {
            if (event == null || event.origin == null || event.data == null || event.origin.toLowerCase().indexOf(_defaultValues.SSOHost) == -1)
                return;

            var data = event.data;

            var msgIsString = typeof data === "string";

            if (msgIsString) {
                _log(data);
                _handleCommunication(data);
            }
            else if (data.methodCall) {
                _log(data.methodCall);
                eval(data.methodCall);
            }
        }
        catch (ex) {
            _log(ex);
        }
    };

    var _initApplication = function (appID, isSecure, loginCheck) {


        if (_isNullOrEmpty(appID)) {
            throw "Must set AppID";
        }

        _defaultValues.AppID = appID;

        isSecure = (window.location.href.indexOf('https://') > -1);

        if (isSecure) {
            _defaultValues.SSOSiteUrl = _defaultValues.SSOSiteUrl.replace(/http:/gi, 'https:');
        }

        _createFrames();

        if (loginCheck) {
            var siteLoginToken = _checkCookie(_defaultValues.SSOLoginCookieName);

            if (_isNullOrEmpty(siteLoginToken))
                siteLoginToken = "";

            _setArbitationFrame(_defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/SET_APP?appID=" + _defaultValues.AppID + "&loginCheck=1&returnUrl=" + encodeURIComponent(window.top.location.href) + "&siteLoginToken=" + siteLoginToken);


        }
        else {
            _setArbitationFrame(_defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/SET_APP?appID=" + _defaultValues.AppID);
        }
    }

    var _initCommunication = function () {
        var currentUrl = String(document.URL).toUpperCase();

        if (_isNullOrEmpty(currentUrl) || currentUrl.indexOf("#") == -1 && currentUrl.length > currentUrl.indexOf("#"))
            return;

        var currentMethod = currentUrl.substring(currentUrl.indexOf("#") + 1);
        _handleCommunication(currentMethod);
    };

    var _handleCommunication = function (method) {
        try {
            switch (method) {
                case _communicationMethods.OpenNickSelectionFrame:
                    window.top.CofinaSSOApi.openNickSelectionLayer();
                    break;
                case _communicationMethods.CloseCurrentLayer:
                    window.top.CofinaSSOApi.closeLayer();
                    break;
                case _communicationMethods.CloseCurrentLayerWithCheckLogin:

                    window.top.CofinaSSOApi.closeLayer();

                    setTimeout(function () {
                        window.top.CofinaSSOApi.checkLogin();
                    }, 500);

                    break;
                case _communicationMethods.CloseNickLayerAndSetDontAskCookie:
                    _createCookie(_defaultValues.DonAskNickSelectionCookieName, "1", 30);
                    window.top.CofinaSSOApi.closeLayer();
                    break;
                case _communicationMethods.EndedSettingDefaultVars:
                    window.top.CofinaSSOApi.checkLogin();
                    break;
                case _communicationMethods.GetCampaign:
                    window.top.CofinaSSOApi.getCampaign();
                    break;
                case _communicationMethods.AddFavouriteSucess:
                    window.top.CofinaSSOApi.callFavouriteAddCallback(true);
                    break;
                case _communicationMethods.AddFavouriteError:
                    window.top.CofinaSSOApi.callFavouriteAddCallback(false);
                    break;
                case _communicationMethods.RemoveFavouriteSucess:
                    window.top.CofinaSSOApi.callFavouriteRemoveCallback(true);
                    break;
                case _communicationMethods.RemoveFavouriteError:
                    window.top.CofinaSSOApi.callFavouriteRemoveCallback(false);
                    break;
                case _communicationMethods.OpenCofinaConversionLayer:
                    window.top.CofinaSSOApi.openCofinaConversionLayer();
                    break;

            }
        }
        catch (err) {
            _log(err);
            _log(method);
        }
    };
    //#endregion

    //#region login
    var _getAppLoginLayer = function () {
        if (_isNullOrEmpty(_defaultValues.AppID)) {
            throw "Must set appID, use the initApplication method first with current app ID";
        }

        _createFullScreenLayer(380, 600, _defaultValues.SSOSiteUrl + "Login" + "?appID=" + _defaultValues.AppID);
    }

    var _getAppLogin = function () {
        window.top.location = _defaultValues.SSOSiteUrl + "Login" + "?appID=" + _defaultValues.AppID + "&returnUrl=" + encodeURIComponent(window.top.location.href);
    }

    var _getLoginLayer = function () {
        _createFullScreenLayer(380, 600, _defaultValues.SSOSiteUrl + "Login" + "?returnUrl=" + encodeURIComponent(window.top.location.href) + "&isLayer=1");
    };

    var _gotoLogin = function () {
        var windowHeight = "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (_defaultValues.AlwaysShowLoginInLayer && windowHeight > 620 && !isMobile && location.protocol == 'https:') {
            _createFullScreenLayer(340, 680, _defaultValues.SSOSiteUrl + "Login" + "?returnUrl=" + encodeURIComponent(window.top.location.href) + "&isLayer=1");
        }
        else {
            window.top.location = _defaultValues.SSOSiteUrl + "Login" + "?returnUrl=" + encodeURIComponent(window.top.location.href);
        }

    };

    var _gotoLogout = function () {
        window.top.location = _defaultValues.SSOSiteUrl + "Logout" + "?returnUrl=" + encodeURIComponent(window.top.location.href);
    };

    var _gotoAccount = function () {
        window.top.location = _defaultValues.SSOSiteUrl + "PersonalArea/PersonalInfo/PersonalInfo";
    };

    var _gotoAccountFavouriteNews = function () {
        window.top.location = _defaultValues.SSOSiteUrl + "PersonalArea/Activity/FavouriteNews";
    };

    var _gotoPasswordRecover = function () {
        window.top.location = _defaultValues.SSOSiteUrl + "PasswordRecover";
    };

    var _gotoRegistration = function () {
        window.top.location = _defaultValues.SSOSiteUrl + "Registration/NewRegistration";
    };

    var _gotoAppRegistrationLayer = function () {
        if (_isNullOrEmpty(_defaultValues.AppID)) {
            throw "Must set appID, use the initApplication method first with current app ID";
        }

        _createFullScreenLayer(380, 600, _defaultValues.SSOSiteUrl + "Registration/NewRegistration" + "?appID=" + _defaultValues.AppID);
    }

    var _checkLogin = function () {

        if (!_mustCheckLogin)
            return;

        var siteLoginToken = _checkCookie(_defaultValues.SSOLoginCookieName);

        if (_isNullOrEmpty(siteLoginToken))
            siteLoginToken = "";
        else {
            try {

                //resolução de problema com as cookies no iPad.
                if (document.referrer.toLowerCase().indexOf("check_login") != -1) {

                    var redirectProtectionCookie = _checkCookie(_defaultValues.SSORedirectProtectionCookieName);

                    if (_isNullOrEmpty(redirectProtectionCookie)) {
                        _createCookieWithMinutes(_defaultValues.SSORedirectProtectionCookieName, "1", 0.3);
                    }
                    else if (redirectProtectionCookie == "1")
                        _createCookieWithMinutes(_defaultValues.SSORedirectProtectionCookieName, "2", 0.3);
                    else {
                        siteLoginToken = "";
                        _createCookie(_defaultValues.SSOLoginCookieName, siteLoginToken, 365);
                    }
                }
            }
            catch (errRedirectProtection) {
                _log(errRedirectProtection);
            }
        }

        _setArbitationFrame(_defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/CHECK_LOGIN?returnUrl=" + encodeURIComponent(window.top.location.href) + "&siteLoginToken=" + siteLoginToken);

        if (!_isNullOrEmpty(siteLoginToken) && _favouriteNewsCallback != null) {
            var scriptUrl = _defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/GET_FAVOURITE_NEWS?siteUrl= " + encodeURIComponent(window.top.location.href) + "&callback=" + _favouriteNewsCallback + "&_=" + String(Math.random() * 10000000000);

            try {
                var script = document.createElement("script");
                script.src = scriptUrl;
                script.type = "text/javascript";
                document.getElementsByTagName("head")[0].appendChild(script);
            }
            catch (scriptErr) {
                _log(scriptErr);
            }

        }

    };
    //#endregion

    //#region campanhas
    var _getCampaign = function () {
        //só conseguiremos fazer em caso de haver jquery
        try {
            if (window.$ && window.$.getScript) {
                $.getScript(_defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/GET_CAMPAIGN?ord=" + String(Math.random() * 10000000000));
            }
        }
        catch (err) {
            _log(err);
        }
    };

    var _getCampaignById = function (id) {
        //só conseguiremos fazer em caso de haver jquery
        try {
            if (window.$ && window.$.getScript) {
                $.getScript(_defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/GET_CAMPAIGN_BY_ID?cId=" + id + "&ord=" + String(Math.random() * 10000000000));
            }
        }
        catch (err) {
            _log(err);
        }
    };
    //#endregion

    //#region FavouriteNews
    var _addNewsToFavourites = function (newsUrl) {

        if (_rootFrame == null)
            return;

        if (_isNullOrEmpty(newsUrl))
            return;

        var loginToken = _checkCookie(_defaultValues.SSOLoginCookieName);

        if (_isNullOrEmpty(loginToken))
            return;

        newsUrl = String(newsUrl).toLowerCase();

        if (newsUrl.indexOf("://") < 0) {
            var host = "http://" + window.top.location.host;

            if (newsUrl[0] != "/")
                newsUrl = "/" + newsUrl;

            newsUrl = host + newsUrl;
        }

        var readed = "0";
        if (String(newsUrl).toLowerCase() == String(window.top.location.href).toLowerCase()) {
            readed = "1";
        }

        var url = _defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/ADD_NEWS_TO_FAVOURITES?readed=" + readed + "&url=" + encodeURIComponent(newsUrl) + "&_=" + String(Math.random() * 10000000000);

        _setFavouritesFrame(url);


    };

    var _removeNewsFromFavourites = function (newsUrl) {

        if (_rootFrame == null)
            return;

        if (_isNullOrEmpty(newsUrl))
            return;

        var loginToken = _checkCookie(_defaultValues.SSOLoginCookieName);

        if (_isNullOrEmpty(loginToken))
            return;

        newsUrl = String(newsUrl).toLowerCase();

        if (newsUrl.indexOf("://") < 0) {
            var host = "http://" + window.top.location.host;

            if (newsUrl[0] != "/")
                newsUrl = "/" + newsUrl;

            newsUrl = host + newsUrl;
        }

        var url = _defaultValues.SSOSiteUrl + "Api/Handlers/Arbitration/REMOVE_NEWS_FROM_FAVOURITES?siteUrl= " + encodeURIComponent(window.top.location.href) + "&url=" + encodeURIComponent(newsUrl) + "&_=" + String(Math.random() * 10000000000);

        _setFavouritesFrame(url);
    };

    var _setFavouritesFrame = function (url) {



        var ord = Math.random() * 10000000000;

        url += (url.indexOf('?') == -1 ? "?" : "&") + "ord=" + ord;

        var newFavourites = _favouritesFrame.cloneNode(true);
        newFavourites.setAttribute("src", url);

        _favouritesFrame.parentNode.replaceChild(newFavourites, _favouritesFrame);

        _favouritesFrame = newFavourites;

    };
    //#endregion



    return {
        init: function () {
            _registerUserAgentValidatorScript();
            _init();
            if (_defaultValues.UseThirdparty) {
                _registerThirdparty();
            }
        },
        initWithCheckLogin: function () {
            _mustCheckLogin = true;
            _registerUserAgentValidatorScript();
            _init();

            if (_defaultValues.UseThirdparty) {
                _registerThirdparty();
            }
        },
        initApplication: function (appID, isSecure, loginCheck) {
            _registerUserAgentValidatorScript();
            _initApplication(appID, isSecure, loginCheck);
        },
        initCommunication: function () {
            _registerUserAgentValidatorScript();
            _initCommunication();
        },
        checkLogin: function () {
            _checkLogin();
        },
        closeLayer: function () {
            _closeLayer();
        },
        getAppLoginLayer: function () {
            _getAppLoginLayer();
        },
        getAppLogin: function () {
            _getAppLogin();
        },
        gotoLogin: function () {
            _gotoLogin();
        },
        getLoginLayer: function () {
            _getLoginLayer();
        },
        gotoLogout: function () {
            _gotoLogout();
        },
        gotoAccount: function () {
            _gotoAccount();
        },
        gotoAccountFavouriteNews: function () {
            _gotoAccountFavouriteNews();
        },
        gotoPasswordRecover: function () {
            _gotoPasswordRecover();
        },
        gotoRegistration: function () {
            _gotoRegistration();
        },
        gotoAppRegistrationLayer: function () {
            _gotoAppRegistrationLayer();
        },
        openNickSelectionLayer: function () {
            _openNickSelectionLayer();
        },
        getCampaign: function () {
            _getCampaign();
        },
        getCampaignById: function (id) {
            _getCampaignById(id);
        },
        checkCookie: function (name) {
            return _checkCookie(name);
        },
        createCookie: function (name, value, days) {
            _createCookie(name, value, days);
        },
        createFullScreenLayer: function (contentWidth, contentHeight, contentUrl, closeCallBack) {
            _createFullScreenLayer(contentWidth, contentHeight, contentUrl, closeCallBack);
        },
        addNewsToFavourites: function (newsUrl) {
            _addNewsToFavourites(newsUrl);
        },
        removeNewsFromFavourites: function (newsUrl) {
            _removeNewsFromFavourites(newsUrl);
        },
        callFavouriteRemoveCallback: function (val) {
            if (!_isNullOrEmpty(_favouriteNewsRemoveCallback)) {
                var scriptCode = "try{if(window." + _favouriteNewsRemoveCallback + " != null){ window." + _favouriteNewsRemoveCallback + "(" + String(val) + "); }}catch(errCallFavouriteNewsRemoveCallback){}";

                eval(scriptCode);
            }
        },
        setFavouriteNewsCallback: function (callbackFunctionName, addCallback) {
            if (!_isNullOrEmpty(callbackFunctionName)) {
                _favouriteNewsCallback = callbackFunctionName;
            }

            if (!_isNullOrEmpty(addCallback)) {
                _favouriteNewsAddCallback = addCallback;
            }
        },
        callFavouriteAddCallback: function (val) {
            if (!_isNullOrEmpty(_favouriteNewsAddCallback)) {
                var scriptCode = "try{if(window." + _favouriteNewsAddCallback + " != null){ window." + _favouriteNewsAddCallback + "(" + String(val) + "); }}catch(errCallFavouriteAddCallback){}";

                eval(scriptCode);

            }
        },
        thirpartySessionValidation: function (uid) {
            _thirpartySessionValidation(uid);
        },
        openCofinaConversionLayer: function () {
            _openCofinaConversionLayer();
        },
        messageHandler: function (event) {
            _messageHandler(event);
        },
        enableDebug: function () {
            _defaultValues.LogToConsole = true;
            _log('Debug enabled');
        }
    }
}();
