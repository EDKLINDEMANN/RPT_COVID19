///PROD FILE
var ThirdpartyLogin = function () {
    var _initProvider = function () {

        var _default = {
            clientSideUrl: 'https://cdns.gigya.com/js/gigya.js?apiKey=3_YSlY5IMn5vYKp-89zA5ZxwfsMCoXJcIhfkTQku0j7e6ZExbl1qaT4jhDKiIMTKqb',
            isContentGattingEnabled: true,
            contentGattingViewsCounterCookieName: 'cof_cg_views_phase3',
            SSOSiteUrl: '//aminhaconta.xl.pt/',
            SSOLoginCookieName: 'cof_site_user',
            allowLogoutFromThirdParty: false,
            excludedHosts: [],
            isTrackingEnabled: false
        };

        var _getQuerystringValue = function (name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        };

        var _isSiteExcludedFromGating = function () {
            try {
                var host = window.location.host;

                return _default.excludedHosts.indexOf(host) >= 0;
            }
            catch (err) {
                console.warn(err);
                return false;
            }
        };

        var _isUrlPartExcludedFromGating = function () {
            try {
                var url = window.location.href;
                if (url.indexOf('/detalhe/') == -1)
                    return;

                var excludedParts = [
                    "https://www.jornaldenegocios.pt/negocios-em-rede/"
                ];

                for (var i = 0; i < excludedParts.length; i++) {
                    if (url.indexOf(excludedParts[i]) > -1)
                        return true;
                }
            }
            catch (err) {
                console.warn(err);
                return false;
            }
        };

      
        var _registerJavascriptFile = function (scriptUrl, isAsync) {
            var script = document.createElement("script");
            script.src = scriptUrl;
            script.type = "text/javascript";

            if (isAsync) {
                script.async = "async";
            }

            document.getElementsByTagName("head")[0].appendChild(script);
        };

        var _isSafari = function () {

            var isChrome = /Chrome/i.test(navigator.userAgent);
            var isSafari = /Safari|AppleWebKit/i.test(navigator.userAgent);

            return isSafari && !isChrome;
        };

        var _isCofinaApp = function () {
            return /cofina-app/i.test(navigator.userAgent);
        };

        var _createCookie = function (name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }

            var sameSite = "; ";
            if (typeof UserAgentValidator != "undefined" && UserAgentValidator.shouldSendSameSiteNone(navigator.userAgent)) {
                sameSite += " SameSite=None; Secure";
            }

            document.cookie = name + "=" + value + expires + "; path=/" + sameSite;
        };


        

        var _initQuantcast = function () {
            try {
                var isApp = _getQuerystringValue('app') != null || _getQuerystringValue('iphone') != null;

                if (isApp)
                    return;

                var elem = document.createElement('script');
                elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
                elem.async = true;
                elem.type = "text/javascript";
                var scpt = document.getElementsByTagName('script')[0];
                scpt.parentNode.insertBefore(elem, scpt);
                (function () {
                    var gdprAppliesGlobally = false;
                    function addFrame() {
                        if (!window.frames['__cmpLocator']) {
                            if (document.body) {
                                var body = document.body,
                                    iframe = document.createElement('iframe');
                                iframe.style = 'display:none';
                                iframe.name = '__cmpLocator';
                                body.appendChild(iframe);
                            } else {
                                // In the case where this stub is located in the head,
                                // this allows us to inject the iframe more quickly than
                                // relying on DOMContentLoaded or other events.
                                setTimeout(addFrame, 5);
                            }
                        }
                    }
                    addFrame();
                    function cmpMsgHandler(event) {
                        if (event.data == null)
                            return;

                        var msgIsString = typeof event.data === "string";
                        var json;
                        if (msgIsString) {
                            json = event.data.indexOf("__cmpCall") != -1 ? JSON.parse(event.data) : {};
                        } else {
                            json = event.data;
                        }
                        if (json.__cmpCall) {
                            var i = json.__cmpCall;
                            window.__cmp(i.command, i.parameter, function (retValue, success) {
                                var returnMsg = {
                                    "__cmpReturn": {
                                        "returnValue": retValue,
                                        "success": success,
                                        "callId": i.callId
                                    }
                                };
                                event.source.postMessage(msgIsString ?
                                    JSON.stringify(returnMsg) : returnMsg, '*');
                            });
                        }
                    }
                    window.__cmp = function (c) {
                        var b = arguments;
                        if (!b.length) {
                            return __cmp.a;
                        }
                        else if (b[0] === 'ping') {
                            b[2]({
                                "gdprAppliesGlobally": gdprAppliesGlobally,
                                "cmpLoaded": false
                            }, true);
                        } else if (c == '__cmp')
                            return false;
                        else {
                            if (typeof __cmp.a === 'undefined') {
                                __cmp.a = [];
                            }
                            __cmp.a.push([].slice.apply(b));
                        }
                    }
                    window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
                    window.__cmp.msgHandler = cmpMsgHandler;
                    if (window.addEventListener) {
                        window.addEventListener('message', cmpMsgHandler, false);
                    }
                    else {
                        window.attachEvent('onmessage', cmpMsgHandler);
                    }
                })();

                window.__cmp('init', {
                    'Language': 'pt',
                    'Initial Screen Title Text': 'Damos valor à sua privacidade',
                    'Initial Screen Reject Button Text': 'Não aceito',
                    'Initial Screen Accept Button Text': 'Aceito',
                    'Initial Screen Purpose Link Text': 'Mostrar objetivos',
                    'Purpose Screen Title Text': 'Damos valor à sua privacidade',
                    'Purpose Screen Body Text': 'Pode definir as preferências do consentimento e determinar de que forma pretende que os seus dados sejam utilizados com base nos objetivos indicados em baixo. Pode definir as suas preferências independentemente das preferências de parceiros terceiros. Cada objetivo tem uma descrição para que fique a saber de que forma nós e os nossos parceiros utilizamos os seus dados.',
                    'Purpose Screen Enable All Button Text': 'Ativar todos os objetivos',
                    'Purpose Screen Vendor Link Text': 'Ver lista completa de parceiros',
                    'Purpose Screen Cancel Button Text': 'Cancelar',
                    'Purpose Screen Save and Exit Button Text': 'Guardar e sair',
                    'Vendor Screen Title Text': 'Damos valor à sua privacidade',
                    'Vendor Screen Body Text': 'Em baixo, pode definir as preferências de consentimento individualmente para cada companhia. Expanda os itens da lista de cada companhia para ver qual a finalidade de utilização dos seus dados. Isto poderá ajudá-lo a escolher os objetivos. Nalguns casos, as companhias podem divulgar que utilizam os dados dos utilizadores sem pedirem os respetivos consentimentos, com base nos seus interesses legítimos. Pode clicar nas suas políticas de privacidade para obter mais informações e para optar ativamente por não participar.',
                    'Vendor Screen Accept All Button Text': 'Aceitar tudo',
                    'Vendor Screen Reject All Button Text': 'Rejeitar tudo',
                    'Vendor Screen Purposes Link Text': 'Voltar aos objetivos',
                    'Vendor Screen Cancel Button Text': 'Cancelar',
                    'Vendor Screen Save and Exit Button Text': 'Guardar e sair',
                    'Initial Screen Body Text': 'Utilizamos cookies para melhorar experiência do utilizador, personalizar conteúdo e anúncios, fornecer funcionalidades de redes sociais e analisar o tráfego nos websites.Partilhamos informações com os nossos parceiros de redes sociais, de publicidade e de análise, que as podem combinar com outras informações que lhes forneceu ou recolhidas por estes a partir da utilização daqueles serviços. Consente? Mais informações sobre cookies e o processamento dos seus dados pessoais, consulte a <a href="https://aminhaconta.xl.pt/Layers/CookiesPolicy" target="_blank" style="text-decoration:underline;" class="cmpBtnCookies">Política de Cookies Cofina</a> e a <a href="https://aminhaconta.xl.pt/Layers/PrivacyPolicy" target="_blank" style="text-decoration:underline;" class="cmpBtnPrivacyPolicy">Política de Privacidade Cofina</a>.',
                    'Publisher Name': 'Cofina Media SA',
                    'Publisher Logo': 'https://aminhaconta.xl.pt/img/logos/cofina_media.png',
                    'Display UI': 'always',
                    'Publisher Purpose IDs': [1, 2, 3, 4, 5],
                    'Consent Scope': 'service',
                    'UI Layout': 'banner',
                    'Publisher Purpose Legitimate Interest IDs': [1, 2, 3, 4, 5],
                    'No Option': false,
                    'Default Value for Toggles': 'on',
                    'Back Label': 'Anterior',
                    'Display Persistent Consent Link': false,
                    'Third Party Vendors Label': "Parceiros/Terceiros",
                    'Min Days Between UI Displays': 365,
                    'Non-Consent Display Frequency': 7
                });

                var css = '.qc-cmp-button{background-color:#ED1C24!important;border-color:#ED1C24!important}.qc-cmp-button:hover{background-color:#333!important;border-color:#333!important}.qc-cmp-alt-action,.qc-cmp-link{color:#ED1C24!important}.qc-cmp-button{color:#FFF!important}.qc-cmp-button.qc-cmp-button.qc-cmp-secondary-button:hover,.qc-cmp-button.qc-cmp-secondary-button{color:#000!important;}.qc-cmp-button.qc-cmp-secondary-button{border-color:#646464!important;background-color:#646464!important;color:#fff!important}.qc-cmp-button.qc-cmp-secondary-button:hover{background-color:transparent!important;color:#646464!important}.qc-cmp-toggle-status,.qc-cmp-ui,.qc-cmp-ui .qc-cmp-alt-action,.qc-cmp-ui .qc-cmp-beta-messaging,.qc-cmp-ui .qc-cmp-main-messaging,.qc-cmp-ui .qc-cmp-messaging,.qc-cmp-ui .qc-cmp-purpose-info,.qc-cmp-ui .qc-cmp-sub-title,.qc-cmp-ui .qc-cmp-table,.qc-cmp-ui .qc-cmp-table-header,.qc-cmp-ui .qc-cmp-title,.qc-cmp-ui .qc-cmp-vendor-list,.qc-cmp-ui .qc-cmp-vendor-list-title,.qc-cmp-ui a{color:#000!important}.qc-cmp-ui{background-color:#f1f1f1!important}.qc-cmp-publisher-purposes-table .qc-cmp-table-header,.qc-cmp-vendors-purposes-table .qc-cmp-table-header{background-color:#fafafa!important}.qc-cmp-publisher-purposes-table .qc-cmp-table-row,.qc-cmp-vendors-purposes-table .qc-cmp-table-row{background-color:#fff!important}.qc-cmp-small-toggle.qc-cmp-toggle-on,.qc-cmp-toggle.qc-cmp-toggle-on{background-color:#00ff00!important;border-color:#00ff00!important}.qc-cmp-toggle-off{background-color:#ED1C24!important;border:#ED1C24!important}.qc-cmp-persistent-link{background-color:#E1E1E1!important;color:#fff!important}.qc-cmp-persistent-link:hover{color:#000!important}.qc-cmp-toggle-status{display:none}';
                head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style');

                style.type = 'text/css';
                if (style.styleSheet) {
                    // This is required for IE8 and below.
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }

                head.appendChild(style);

                //retirar legenda botoes ligar
                $('.qc-cmp-toggle-status').remove();

                $(document).on('click', '.cmpBtnCookies', function () {
                    COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Politica Cookies', '');
                });

                $(document).on('click', '.cmpBtnPrivacyPolicy', function () {
                    COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Politica Privacidade', '');
                });

                $(document).on('click', '#qcCmpButtons > .qc-cmp-button', function () {
                    COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Aceito', '');
                });

                $(document).on('click', '#qcCmpButtons > #qc-cmp-purpose-button', function () {
                    COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Mostrar Objetivos', '');


                });

                $(document).on('click', '.qc-cmp-alt-action.qc-cmp-left-nav-link', function () {
                    COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Lista Completa', '')
                });

                $(document).on('click', '.qc-cmp-button.qc-cmp-save-and-exit', function () {
                    var disabledOptionsCount = $('.qc-cmp-toggle.qc-cmp-toggle-off').length;
                    var totalOptions = $('.qc-cmp-toggle').length;

                    if (disabledOptionsCount == 0) {
                        COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Guardar e Sair', 'Todos', '0');
                    }
                    else if (disabledOptionsCount == totalOptions) {
                        COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Guardar e Sair', 'Nenhum', disabledOptionsCount);
                    }
                    else {
                        var text = new Array();
                        $('.qc-cmp-toggle.qc-cmp-toggle-off').each(function () {
                            text.push($(this).parent().parent().parent().children('h4').text());
                        });

                        COF.contagens.EventOnGoogleAnalytics('event', 'CMP', 'Guardar e Sair', text.join('_'), disabledOptionsCount);
                    }

                });
            }
            catch (err) {
            }
        }();

        var _initWeborama = function () {

            try {
                if (window.location.host.toLowerCase().indexOf("aquelamaquina") == -1 || !window.$)
                    return;

                $(function () {
                    $('<script collect wam_label="COFINA" wam_id="7859" src="https://cloud.weborama.design/nonio.js"></' + 'script>').appendTo(document.body);
                });


                _default.isTrackingEnabled = true;
            }
            catch (err) {

            }
        }();

        var _initGigya = function () {

            try {
                window.__gigyaConf = {
                    autoLogin: true,
                    enableSSOToken: true
                };

                _registerJavascriptFile(_default.clientSideUrl, true);


                window.__cofAddThirdpartyEventListner = window.__cofAddThirdpartyEventListner || function () {
                    try {
                        if (window.gigya && window.gigya.isReady) {

                            gigya.accounts.getAccountInfo({
                                callback: function (resp) {

                                    try {
                                        if (resp && resp.status && resp.status == "OK") {
                                            CofinaSSOApi.thirpartySessionValidation(resp.status == "OK" ? resp.UID : null);

                                            if (resp.UID && _default.isTrackingEnabled && nonio && nonio.collect) {
                                                nonio.collect({ uid: resp.UID });
                                            }
                                        }
                                        else {
                                            if (!_isSafari() && _default.allowLogoutFromThirdParty) {
                                                CofinaSSOApi.thirpartySessionValidation(null);
                                            }
                                        }

                                    }
                                    catch (getAccountInfoErr) {

                                    }



                                }
                            });
                        }
                        else {

                            setTimeout(__cofAddThirdpartyEventListner, 50);
                        }
                    }
                    catch (addThirdpartyErr) {

                    }
                };

                __cofAddThirdpartyEventListner();

            }
            catch (err) {

            }
        }();

        var _initContentGatting = function () {

            if (!_default.isContentGattingEnabled || _isSafari() || _isSiteExcludedFromGating() || _isCofinaApp() || _isUrlPartExcludedFromGating())
                return;

            var ssoCookieValue = CofinaSSOApi.checkCookie(_default.SSOLoginCookieName);

            //caso esteja logado não apresenta a layer
            if (ssoCookieValue != null && ssoCookieValue != "")
                return;

            //não tenha alguma layer aberta não deve apresentar
            if ($('#sso_layer').length > 0)
                return;

            var host = window.location.host;
            var currentUrl = window.location.href;
            //caso não seja detalhe não mostramos a layer
            if (!currentUrl.match(/\/detalhe\//gi))
                return;

            var referrer = document.referrer;
            if (!referrer)
                referrer = "";

            //caso seja premium não mostra a layer ou se for uma págiana de erro
            if ((window.$_fields && $_fields.IsPremium && $_fields.IsPremium == "true") || ($('#hdnIsPremium').val() == "1") || $('#errorPage').length > 0) {
                return;
            }

            var viewsCount = CofinaSSOApi.checkCookie(_default.contentGattingViewsCounterCookieName);
            if (!viewsCount)
                viewsCount = "";

            var scriptUrl = 'ContentGateHandler/JS?host=' + encodeURIComponent(host) + '&url=' + encodeURIComponent(currentUrl) + '&referrer=' + encodeURIComponent(referrer) + '&vc=' + viewsCount;

            var script = document.createElement("script");
            var url = _default.SSOSiteUrl + scriptUrl + "&" + "_=" + String(Math.random() * 100000);
            script.src = url;
            script.type = "text/javascript";
            script.async = "async";
            document.getElementsByTagName("head")[0].appendChild(script);
        }();

    };


    if (_initProvider)
        _initProvider();

}();

var ThirdpartyLayerLogin = function () {
    var _vars = {
        SSOSiteUrl: '//aminhaconta.xl.pt/'
    };
    var _privateMethods = function () {
        return {
            stringIsNullOrEmpty: function (text) {
                if (text == null)
                    return true;

                return text == 'undefined' || text == '';
            },
            registerJavascript: function (url) {
                if (this.stringIsNullOrEmpty(url))
                    return;
                url = url + (url.indexOf('?') > -1 ? "&" : "?") + "_=" + String(Math.random() * 100000);

                var script = document.createElement("script");
                script.src = url;
                script.type = "text/javascript";
                script.async = "async";
                document.getElementsByTagName("head")[0].appendChild(script);
            },
            createFormAndPost: function (postUrl, formData) {

                if (_privateMethods.stringIsNullOrEmpty(postUrl) || !formData || formData.length == 0)
                    return;

                var form = document.createElement("form");
                form.style.display = "none";
                form.method = "POST";
                form.action = postUrl;

                for (var i = 0; i < formData.length; i++) {
                    var el = document.createElement("input");
                    el.name = formData[i].name;
                    el.value = formData[i].value;
                    form.appendChild(el);
                }

                document.body.appendChild(form);

                form.submit();
            }
        };
    }();

    var _doLogin = function (email, password) {
        if (_privateMethods.stringIsNullOrEmpty(email) || _privateMethods.stringIsNullOrEmpty(password))
            return;

        var loginUrl = _vars.SSOSiteUrl + "ContentGateHandler/Login?e=" + email + "&p=" + encodeURIComponent(password) + "&returnUrl=" + encodeURIComponent(window.top.location.href);

        _privateMethods.registerJavascript(loginUrl);
    };

    var _handleLogin = function (resp) {
        if (!resp)
            return;

        if (!resp.Success) {
            $(".gatting_login .loader").hide();
            $(".gatting_login #frmLogin").show();
            $(".gatting_login .gatting_login_alternative").show();
            $(".gatting_login").removeClass("loading_open");

            if (resp.Messages && resp.Messages.length > 0) {
                $(".msg_erro").text(resp.Messages[0]);
            }
            else {
                $(".msg_erro").text("Ocorreu um erro. Por favor, tente novamente.");
            }
            return;
        }

        if (resp.FollowUrl || !_privateMethods.stringIsNullOrEmpty(resp.FollowUrl)) {
            window.top.location = resp.FollowUrl;
        }
        else {
            $(".gatting_login .loader").hide();
            $(".gatting_login #frmLogin").show();
            $(".gatting_login .gatting_login_alternative").show();
            $(".gatting_login").removeClass("loading_open");
            $(".msg_erro").text("Ocorreu um erro. Por favor, tente novamente.");
        }
    };

    var _doLoginWithFacebook = function () {
        if (!window.gigya)
            return;

        gigya.socialize.login({
            provider: 'facebook',
            callback: function (response) {
                if (response.status == "OK") {
                    gigya.accounts.getAccountInfo({
                        callback: function (resp) {
                            try {
                                if (resp && resp.status && resp.status == "OK") {
                                    var source = '';
                                    if (resp.data && resp.data.source) {
                                        source = resp.data.source;
                                    }

                                    if (source == '') {
                                        gigya.accounts.setAccountInfo({
                                            data: { source: 'cofina' }, callback: function () {
                                                //if needed, put code here
                                            }
                                        });
                                    }
                                }
                            }
                            catch (err) {

                            }
                        }
                    });

                    _privateMethods.createFormAndPost(_vars.SSOSiteUrl + "Oauth/SocialLogin", [
                        {
                            "name": "snData",
                            "value": JSON.stringify(response)
                        },
                        {
                            "name": "returnUrl",
                            "value": window.top.location.href
                        }
                    ]);
                }
            }
        });
    };

    var _doLoginWithGoogle = function () {
        gigya.socialize.login({
            provider: 'googleplus',
            callback: function (response) {
                if (response.status == "OK") {

                    gigya.accounts.getAccountInfo({
                        callback: function (resp) {
                            try {
                                if (resp && resp.status && resp.status == "OK") {
                                    var source = '';
                                    if (resp.data && resp.data.source) {
                                        source = resp.data.source;
                                    }

                                    if (source == '') {
                                        gigya.accounts.setAccountInfo({
                                            data: { source: 'cofina' }, callback: function () {
                                                //if needed, put code here
                                            }
                                        });
                                    }
                                }
                            }
                            catch (err) {

                            }
                        }
                    });

                    _privateMethods.createFormAndPost(_vars.SSOSiteUrl + "Oauth/SocialLogin", [
                        {
                            "name": "snData",
                            "value": JSON.stringify(response)
                        },
                        {
                            "name": "returnUrl",
                            "value": window.top.location.href
                        }
                    ]);
                }
            }
        });
    };

    return {
        doLogin: function (email, password) {
            _doLogin(email, password);
        },
        handleLoginFinish: function (resp) {
            _handleLogin(resp);
        },
        doLoginWithFacebook: function () {
            _doLoginWithFacebook();
        },
        doLoginWithGoogle: function () {
            _doLoginWithGoogle();
        }
    };
}();