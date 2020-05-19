
$(document).ready(function () {
    var osClass = detectOS();
    $("body").addClass(osClass);
    createEventToBarraLoad();
    addReadMoreButton();
    addOneSignalButton();
    //checkAdBlock();
    loadLiveGameScore();

    var bLazy = new Blazy({
        success: function (element) {
            setTimeout(function () {
                var parent = element.parentNode;
                parent.className = parent.className.replace(/\bloading\b/, '');
            }, 200);
        }
    });
});


/********************************************** MENU START **********************************************/
$('.menuPhone').click(function (e) {
    e.preventDefault();
    if ($(".menuPhone .mf-icon-menu").length > 0) {
        $('.menuLateralPhone').animate({opacity: '1', filter: 'alpha(opacity=100)'}, 600);
        $(".moreDivContent").animate({opacity: '1'}, 600);
        $('.menuPhone .icon').addClass('mf-icon-close');
        $('.menuPhone .icon').removeClass('mf-icon-menu');
        $('.menuLateralPhone').css('height', '820px');
    } else {
        $('.menuPhone .icon').removeClass('mf-icon-close');
        $('.menuPhone .icon').addClass('mf-icon-menu');
        $('.menuLateralPhone').css('height', '0');
        $('.menuLateralPhone').css('min-height', '0');
        $(".moreDivContent").animate({opacity: '0'}, 600);
        $('.menuLateralPhone').animate({opacity: '0'}, 600);
        $('.subNav, .subNavItems').hide();
        $('.menuLateralPhone a').removeClass('menuopened');
    }
});

$('.menuTabletLink').click(function (e) {
    e.preventDefault();
    $('.column_left').animate({opacity: '1', filter: 'alpha(opacity=100)', height: 'toggle'}, 500);
});

$('#menuPesquisar').click(function (e) {
    e.preventDefault();
    $('.pesquisaDiv').show();
    $('.inputPesquisaTopo').focus();
});

$('.pesquisaDiv .mf-icon-close').click(function (e) {
    e.preventDefault();
    $('.pesquisaDiv').hide();
});

// menu mobile
$('.menuList ul').hide();
$('.menuList > ul').show();

if (window.innerWidth < 768) {
    $('.menuList a').click(function (e) {
        $(this).toggleClass('menuopened');
        $('.menuLateralPhone').css('height', 'auto');
        $('.menuLateralPhone').css('min-height', '820px');
        var li = $(this).closest('li');
        var submenu = $('ul:first', li);
        if (submenu.length > 0) {
            $(submenu).toggle();
            return false;
        }
    });
} else {
    $('.openSubNav').click(function (e) {
        e.preventDefault();
        $(".moreDivContent").animate({opacity: '0.4'}, 600);
        $('.openSubNav.menuopened').removeClass('menuopened');
        $('.menuLateralPhone').css('height', 'auto');
        $('.menuLateralPhone').css('min-height', '820px');
        $(this).addClass('menuopened');
        $('.subNav, .subNavItems').hide();
        console.log($(this).siblings());
        var $parent = $(this).closest('h3');
        var $subNav = $parent.siblings();
        $subNav.show();
    });

    $('.subNav > li > a').click(function (e) {
        if ($(this).attr('href') == '') {
            e.preventDefault();
        }
        $('.subNav > li > a').removeClass('menuopened');
        $(this).addClass('menuopened');
        $('.subNavItems').hide();
        $(this).siblings().show();

    });
}

$('.open-menu').click(function (e) {
    e.preventDefault();
    $('nav').toggle();
    if ($('.open-menu span').hasClass('icon-menu')) {
        $('.open-menu span').addClass('icon-cancel-2');
        $('.open-menu span').removeClass('icon-menu');
    } else {
        $('.open-menu span').removeClass('icon-cancel-2');
        $('.open-menu span').addClass('icon-menu');
    }


});

$('.icon-fechar').click(function (e) {
    e.preventDefault();
    $('.open-menu span').removeClass('icon-fechar');
    $('.open-menu span').addClass('icon-menu');
});

/********************************************** MENU END **********************************************/

function loadLiveGameScore() {
    var gameIndex = updateLiveMatchScore(0);

    setInterval(function () {
        gameIndex = updateLiveMatchScore(gameIndex);
    }, 30000);
}

function updateLiveMatchScore(gameIndex) {
    $.getJSON('/jogos_a_decorrer.html', function (data) {
        var currentGames = data.elementos;
        var aoVivoTop = $('.aoVivoTop');
        aoVivoTop.fadeOut('slow');

        if (currentGames.length > 0) {
            if (!gameIndex || gameIndex >= currentGames.length || gameIndex < currentGames.length)
                gameIndex = 0;

            $('a', aoVivoTop).attr('href', currentGames[gameIndex].url);
            $('.team1Cell', aoVivoTop).html(currentGames[gameIndex].jogo.equipaA.nome);
            $('.team2Cell', aoVivoTop).html(currentGames[gameIndex].jogo.equipaB.nome);
            if (currentGames[gameIndex].comProlongamento) {
                $('.resultCell1', aoVivoTop).html(currentGames[gameIndex].resultadoTempoExtraA);
                $('.resultCell2', aoVivoTop).html(currentGames[gameIndex].resultadoTempoExtraB);
            } else {
                $('.resultCell1', aoVivoTop).html(currentGames[gameIndex].resultadoFinalA);
                $('.resultCell2', aoVivoTop).html(currentGames[gameIndex].resultadoFinalB);
            }

            $(aoVivoTop).fadeIn('slow');
            gameIndex++;
            return gameIndex;
        }
    });
}


function addOneSignalButton() {
    var OneSignal = OneSignal || [];
    OneSignal.push(["init", {
            appId: "1b84512c-8e8c-4a81-b288-f87acf33638f",
            subdomainName: 'maisfutebol',
            welcomeNotification: {
                title: "MAISFUTEBOL",
                message: "Obrigado por usar os alertas do MAISFUTEBOL."
                        // "url": "" // Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage)
            },
            promptOptions: {
                showCredit: false, // Hide Powered by OneSignal
                actionMessage: 'Notificações MAISFUTEBOL',
                exampleNotificationTitleDesktop: 'MAISFUTEBOL',
                exampleNotificationMessageDesktop: 'Resumo',
                exampleNotificationTitleMobile: ' MAISFUTEBOL',
                exampleNotificationMessageMobile: 'Resumo',
                exampleNotificationCaption: '(pode cancelar a qualquer momento)',
                acceptButtonText: 'Continuar',
                cancelButtonText: 'Não, obrigado.'
            },
            notifyButton: {
                enable: true, /* Set to false to hide */
                size: 'large', // One of 'small', 'medium', or 'large'
                theme: 'default', // One of 'default' (red-white) or 'inverse" (white-red)
                position: 'bottom-right', // Either 'bottom-left' or 'bottom-right'
                offset: {
                    bottom: '60px',
                    left: '0px', // Only applied if bottom-left
                    right: '20px' // Only applied if bottom-right
                },
                prenotify: true, // Show an icon with 1 unread message for first-time site visitors
                showCredit: false, // Hide the OneSignal logo
                text: {
                    'tip.state.unsubscribed': 'Subscrever notificações',
                    'tip.state.subscribed': "Notificações ativas",
                    'tip.state.blocked': "Notificações inativas",
                    'message.prenotify': 'CANCELAR',
                    'message.action.subscribed': "Obrigado por subscrever!",
                    'message.action.resubscribed': "Obrigado por subscrever!",
                    'message.action.unsubscribed': "Notificações inativas",
                    'dialog.main.title': 'Gerir notificações',
                    'dialog.main.button.subscribe': 'SUBSCREVER',
                    'dialog.main.button.unsubscribe': 'CANCELAR',
                    'dialog.blocked.title': 'Unblock Notifications',
                    'dialog.blocked.message': "Follow these instructions to allow notifications:"
                }
            }
        }]);
}

function addReadMoreButton() {
    if ($('body').hasClass('_artigo')) {
        if (!$('body').hasClass('sponsored') && $('#intext_ad_container').length === 0) {
            var MAX_HEIGHT_OF_ARTICLE_SHOWN = $(window).width() < 1024 ? 1400 : 900;
            var ARTICLE_SHOWN_DIFFERENCE = 400;
            var articleHeight = $(".articleBody").height() - $('.relacionadosDiv').height();

            //At the beggin the height is 900px;
            if (articleHeight > MAX_HEIGHT_OF_ARTICLE_SHOWN && articleHeight - MAX_HEIGHT_OF_ARTICLE_SHOWN > ARTICLE_SHOWN_DIFFERENCE) {
                $(".articleBody").height(MAX_HEIGHT_OF_ARTICLE_SHOWN);
                $(".showMoreArticle").show();
            } else {
                $(".showMoreArticle").hide();
            }
        } else {
            $(".showMoreArticle").hide();
        }
    }
}

function closeReadMore() {
    $(".showMoreArticle").hide();
    $(".articleBody").height("auto");

    var pageTitle = document
            .querySelector("meta[property='iol:content_title']")
            .getAttribute("content");
    var id = document
            .querySelector("meta[property='iol:content']")
            .getAttribute("content");

    addVirtualPageViewToNetscopeAndGoogleAnalytics("Artigo", pageTitle, id, "continuar a ler");
}

function addVirtualPageViewToNetscopeAndGoogleAnalytics(contentType, title, id, internalOrigin) {

    if (window.iol_analytics) {
        var adunit = document
                .querySelector("meta[property='iol:adunit']")
                .getAttribute("content");

        var iolAnalytics = window.iol_analytics;
        iolAnalytics.updateVirtualPageView(
                location.pathname,
                iol_analytics.createSimpleDataLayerObject(
                        contentType,
                        title,
                        id,
                        "WEB",
                        adunit,
                        internalOrigin,
                        false
                        )
                );

    }

}

function detectOS() {
    var OSName;
    if (navigator.appVersion.indexOf("Android") !== -1)
        OSName = "os-android";
    else if (navigator.appVersion.indexOf("Win") !== -1)
        OSName = "os-win";
    else if (navigator.appVersion.indexOf("Mac") !== -1)
        OSName = "os-ios";
    else if (navigator.appVersion.indexOf("X11") !== -1)
        OSName = "os-unix";
    else if (navigator.appVersion.indexOf("Linux") !== -1)
        OSName = "os-linux";
    else {
        OSName = "";
    }

    return OSName;
}

function createEventToBarraLoad() {
    window.iol = window.iol || {};
    window.iol.onLoaded = function ()
    {
        var event = document.createEvent('Event');
        event.initEvent('onLoadWindowIol', true, true);
        elem.dispatchEvent(event);
        ;
    }
    window.iol.onUserLoggedIn = function () {
        if ($("#iol-forum-login-btn").length > 0) {
            location.reload();
        }

    }

}

function callLogin() {
    var loginLink = $('#biol-login-wrapper .biol-login-link')[0];
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initEvent('click', true, true);
    loginLink.dispatchEvent(mouseEvent);
}