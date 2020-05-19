var elem = document.createElement('script');
//elem.src = 'https://quantcast.mgr.consensu.org/v13/cmp.js';
elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
elem.async = true;
elem.type = "text/javascript";
var scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);

//inject styles also
var stl = document.createElement('style')
stl.innerHTML = '.qc-cmp-button{background-color:#000 !important;border-color:#000 !important}.qc-cmp-button:hover{background-color:transparent !important;color:#000 !important;border-color:#000 !important}.qc-cmp-alt-action,.qc-cmp-link{color:#000 !important}.qc-cmp-button{color:#fff !important;margin-bottom:0}.qc-cmp-button.qc-cmp-secondary-button{color:#ccc !important;display:none}.qc-cmp-button.qc-cmp-button.qc-cmp-secondary-button:hover{color:#fff !important}.qc-cmp-button.qc-cmp-secondary-button{border-color:#fff !important;background-color:transparent !important}.qc-cmp-button.qc-cmp-secondary-button:hover{background-color:#fff !important}.qc-cmp-ui{background-color:#fff !important;min-height:150px !important}.qc-cmp-ui .qc-cmp-main-messaging,.qc-cmp-ui .qc-cmp-messaging,.qc-cmp-ui .qc-cmp-beta-messaging,.qc-cmp-ui .qc-cmp-title,.qc-cmp-ui .qc-cmp-sub-title,.qc-cmp-ui .qc-cmp-purpose-info,.qc-cmp-ui .qc-cmp-table,.qc-cmp-ui .qc-cmp-table-header,.qc-cmp-ui .qc-cmp-vendor-list,.qc-cmp-ui .qc-cmp-vendor-list-title{color:#000 !important}.qc-cmp-ui a,.qc-cmp-ui .qc-cmp-alt-action{color:#000 !important}.qc-cmp-ui .qc-cmp-ui-content{padding:12px 22px;overflow-y:auto}.qc-cmp-ui .qc-cmp-ui-content .qc-cmp-publisher-logo,.qc-cmp-ui .qc-cmp-ui-content .qc-cmp-title{margin-bottom:16px}.qc-cmp-ui .qc-cmp-ui-content .qc-cmp-alt-buttons{display:none}.qc-cmp-ui .qc-cmp-ui-content .qc-cmp-title{font-size:24px;line-height:34px}.qc-cmp-ui #qc-cmp-purpose-button{display:none}.qc-cmp-toggle-status{color:#ff7b3c}.qc-cmp-publisher-purposes-table .qc-cmp-table-header{background-color:#fafafa !important}.qc-cmp-publisher-purposes-table .qc-cmp-table-row{background-color:#fff !important}.qc-cmp-small-toggle.qc-cmp-toggle-on,.qc-cmp-toggle.qc-cmp-toggle-on{background-color:green !important;border-color:#222 !important}.qc-cmp-toggler.qc-cmp-vendors-purposes-toggler .qc-cmp-toggle-status{display:none}.qc-cmp-vendor-list-container{overflow-x:hidden}@media screen and (max-width: 375px){.qc-cmp-nav-bar-div-child{width:100%;justify-content:center}.qc-cmp-nav-bar-div-child .qc-cmp-save-and-exit{margin:0 0 10px 0}.qc-cmp-nav-bar-buttons-container{margin:0}.qc-cmp-nav-bar-buttons-container .qc-cmp-disable-button{margin-right:0 !important}.qc-cmp-nav-bar.qc-cmp-bottom *{width:100%}.qc-cmp-button.qc-cmp-save-and-exit{margin:10px auto 10px auto}.qc-cmp-alt-action.qc-cmp-left-nav-link{padding-right:20px}}.qc-cmp-back:before{content:"";display:inline-block;position:relative;top:1px;right:6px;width:12px;height:12px;background:url(\'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="%23000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M2 5l6 6 6-6"/%3E%3C/svg%3E\') 50% no-repeat; }h2.qc-cmp-title{ display:none;} .qc-cmp-link-text{margin-bottom:6px;} .qc-cmp-qc-link-container { padding:0!important; padding-right: 6px!important;} .qc-cmp-toggle{height:18px; width:36px } .qc-cmp-toggle-off{background-color:darkred;} .qc-cmp-main-messaging a {text-decoration:underline;}';
//scpt.parentNode.insertBefore(stl,scpt);

 (function() {
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
        var msgIsString = typeof event.data === "string";
        var json;
        if(msgIsString) {
        json = event.data.indexOf("__cmpCall") != -1 ? JSON.parse(event.data) : {};
        } else {
        json = event.data;
        }
        if (json.__cmpCall) {
        var i = json.__cmpCall;
        window.__cmp(i.command, i.parameter, function(retValue, success) {
            var returnMsg = {"__cmpReturn": {
            "returnValue": retValue,
            "success": success,
            "callId": i.callId
            }};
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
        b[2]({"gdprAppliesGlobally": gdprAppliesGlobally,
            "cmpLoaded": false}, true);
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
    'Initial Screen Title Text': 'Necessitamos do seu consentimento para continuar',
    'Initial Screen Reject Button Text': 'Não aceito',
    'Initial Screen Accept Button Text': 'Aceito',
    'Initial Screen Purpose Link Text': 'Mostrar objetivos',
    'Purpose Screen Title Text': 'Damos valor à sua privacidade',
    'Purpose Screen Body Text': 'Pode definir as preferências do consentimento e determinar de que forma pretende que os seus dados sejam utilizados com base nos objetivos indicados em baixo. Pode definir as suas preferências independentemente das preferências de parceiros terceiros. Cada objetivo tem uma descrição para que fique a saber de que forma nós e os nossos parceiros utilizamos os seus dados.',
    'Purpose Screen Enable All Button Text': 'Ativar todos os objetivos',
    'Purpose Screen Vendor Link Text': 'Ver lista completa de parceiros',
    'Purpose Screen Cancel Button Text': 'Cancelar',
    'Purpose Screen Save and Exit Button Text': 'Guardar e Aceitar',
    'Vendor Screen Title Text': 'Damos valor à sua privacidade',
    'Vendor Screen Body Text': 'Abaixo, pode definir as preferências de consentimento individualmente para cada parceiro. Expanda os itens da lista de cada parceiro para ver qual a finalidade de utilização dos seus dados. Isto poderá ajudá-lo a escolher os objetivos. Nalguns casos, os parceiros podem divulgar que utilizam os dados dos utilizadores sem pedirem os respetivos consentimentos, com base nos seus interesses legítimos. Pode clicar nas suas políticas de privacidade para obter mais informações e para optar ativamente por não participar.',
    'Vendor Screen Accept All Button Text': 'Aceitar tudo',
    'Vendor Screen Reject All Button Text': 'Rejeitar tudo',
    'Vendor Screen Purposes Link Text': 'Voltar aos objetivos',
    'Vendor Screen Cancel Button Text': 'Cancelar',
    'Vendor Screen Save and Exit Button Text': 'Guardar e Aceitar',
    'Initial Screen Body Text': 'Necessitamos do seu consentimento para continuar.  Ao carregar no botão “Aceito”, declara conhecer e aceitar a nossa <a href="https://www.aeiou.pt/privacy-policy/" target="_blank">Política de Privacidade, Cookies e de Protecção de Dados Pessoais</a>, que define de que forma e em que condições, no decorrer da sua visita ao nosso site, os seus dados pessoais ou o seu perfil de interacção, com seu conhecimento e consentimento, são recolhidos, tratados, preservados e protegidos. <a style="text-decoration:underline; cursor:pointer;" onclick="window.__cmpui(&quot;updateConsentUi&quot;,2)">Consultar detalhes</a>',
    'Publisher Name': 'Cool Beans, Lda / rede AEIOU Ad Networks',
    'Publisher Logo': 'https://www.aeiou.pt/logo_xs.png',
    'Publisher Purpose IDs': [1, 2, 3, 4, 5],
    'Consent Scope': 'global group',
    'Consent Scope Group URL': 'https://www.aeiou.pt/quantcast.html',
    'Group Hosted HTML Cookie Access URL': 'https://www.aeiou.pt/quantcast.html',
    'UI Layout': 'banner',
    'No Option': false,
    "Publisher Purpose Legitimate Interest IDs": [1, 2, 3, 4, 5],
    "Display Persistent Consent Link": false,
    "Default Value for Toggles":"on",
    'Non-Consent Display Frequency': 15,
    'Min Days Between UI Displays': 90,

});


//remove elements
window.addEventListener('load', function() {
document.body.appendChild(stl);
    var checkTime = 2000;
    var checker = setInterval(function() {
        var rjb = document.querySelector(".qc-cmp-horizontal-buttons>button:nth-child(1).qc-cmp-secondary-button")
        var mtv = document.querySelector(".qc-cmp-buttons #qc-cmp-purpose-button")
        
        if (rjb) {
            rjb.parentNode.removeChild(rjb);
        }
        if(mtv){
            mtv.parentNode.removeChild(mtv);
        }
    }, checkTime);

});

