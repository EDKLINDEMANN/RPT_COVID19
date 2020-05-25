$(document).ready(function () {
    var osClass = detectOS();
    $("body").addClass(osClass);

    addReadMoreButton();
    checkAdBlock();

    loadTimeline();
    loadDossier();

    fixedElements();
    createEventToBarraLoad();
    var bLazy = new Blazy({
        success: function (element) {
            setTimeout(function () {
                var parent = element.parentNode;
                parent.className = parent.className.replace(/\bloading\b/, '');
            }, 200);
        }
    });
});


$(document).on('click', '.sondagemBox .results a', function (e) {
    e.preventDefault();
    $('.sondagemBox .bar').toggle('slow');
    var texto = $('.texto', this).html();
    if (texto == 'Ver resultados') {
        $('.texto', this).html('Esconder resultados');
    } else {
        $('.texto', this).html('Ver resultados');
    }
});

$(document).on('click', '.btn-vote', function (e) {
    var form = $(this).parent('form');
    // check se foi escolhida resposta
    if (!$('input[name="respostaId"]:checked', form).length) {
        alert('Escolha primeiro uma das respostas. Obrigado.');
        return;
    }
    // envio da resposta
    var sondagemId = $('input[name="sondagemId"]', form).val();

    // desativar votar e mostrar loading
    $(this).attr('disabled', 'disabled').val('A enviar...');
    $.post('/vota.do', {'sondagemId': sondagemId, respostaId: $('input[name="respostaId"]:checked', form).val(), utilizador: $('input[name="utilizador"]').val()}).done(function () {
        console.log("Pedido com sucesso");
    })
            .fail(function (e) {
                var text = e.statusText.replace(/&amp;/g, "&").replace(/&#59;/g, ";");
                alert($('<div />').html(text).text());
            }).always(function (e) {
        $('.btn-vote', form).val('Obrigado'); // obrigado
        $('.btn-vote', form).addClass("inativo"); // inativo class 
        $('.bar', form).fadeIn('slow'); // mostrar resultados
        $('li', form).removeClass('selected');

    });
    return false;
});

$('.menu-mobile-open').click(function (e) {
    e.preventDefault();

    if ($(this).find(".icon-fechar").length > 0) {
        $('body').removeClass("body-hidden");
        $('html').removeClass("body-hidden");
        $(".menu-mobile-wrapper").fadeOut(200);
        $(".divCloseMenu").fadeOut(100);
        $(".icon-menu2").removeClass("icon-fechar");
        $(".menu-mobile").scrollTop(0)
    } else {
        $('body').addClass("body-hidden");
        $('html').addClass("body-hidden");
        $(".menu-mobile-wrapper").fadeIn(100);
        $(".divCloseMenu").fadeIn(100);
        $(".icon-menu2").addClass("icon-fechar");
    }

});


$('.divCloseMenu').click(function (e) {
    e.preventDefault();
    $('body').removeClass("body-hidden");
    $('html').removeClass("body-hidden");
    $(".menu-mobile-wrapper").fadeOut(200);
    $(".divCloseMenu").fadeOut(100);
    $(".icon-menu2").removeClass("icon-fechar");
    $(".menu-mobile").scrollTop(0)

});


/** VIDEO PAGE START **/
$("#showVideoDetail .more-detail").click(function (e) {
    e.preventDefault();
    if ($(this).hasClass("icon-expand-more")) {
        $(".videoDetailDiv").css({height: 'auto'});
        $(this).removeClass('icon-expand-more');
        $(this).addClass('icon-expand-less');
    } else {
        $(".videoDetailDiv").css({height: '0'});
        $(this).removeClass('icon-expand-less');
        $(this).addClass('icon-expand-more');
    }
});

$("#showInfoPrograma").click(function (e) {
    e.preventDefault();
    $('.programa-info').toggle();

});
/** VIDEO PAGE END **/


function fixedElements() {
    $('.menu-wrapper-sticky').hcSticky({
        stickTo: document
    });

    $('.topo-wrapper-sticky').hcSticky({
        stickTo: document
    });

    $('.shares-wrapper-sticky').hcSticky({
        top: 55,
        stickTo: '.articleBody'
    });

    if (window.innerWidth < 481 && $("body").hasClass("videoPage")) {
        $('.video-wrapper-sticky').hcSticky({
            stickTo: document,
            top: 0
        });
    }
}

function loadTimeline() {
    if ($('body').hasClass('_aominuto')) {
        loadMultimedia();
        // Infinite Scroll v3
        var container = $('#timeline-eventos').infiniteScroll({
            append: '.timeline-evento',
            path: '.paginationInfiniteNext',
            status: '.page-load-status',
            history: false
        });

        // use event for v2 callback
        container.on('append.infiniteScroll', function (event, response, path, items) {
            loadMultimedia();
        });
    }
}


function loadMultimedia() {
    $(".timeline-galeria").each(function () {
        var eventID = $(this).data("event-id");
        var token = $("#gallery-" + eventID).data("token");
        var galleryID = $("#gallery-" + eventID).data("gallery");
        var pub = $("#gallery-" + eventID).data("pub");

        $("#gallery-" + eventID).iolgallery({
            galId: galleryID,
            loop: true,
            pub: pub,
            smartToken: token,
            nav: true
        });
    });

    $(".timeline-video").each(function () {
        var eventID = $(this).data("event-id");
        var token = $("#player-" + eventID).data("token");
        var video = $("#player-" + eventID).data("video");
        var pub = $("#player-" + eventID).data("pub");

        $("#player-" + eventID).iolplayer({
            video: [video],
            smartToken: token,
            pub: pub,
            skin: {
                timeslider: {
                    progress: "#be0000"
                }
            }
        });
    });
}
function fitVids(container) {
    var elements = container.find("iframe[src*='youtube'],iframe[src*='dailymotion'],iframe[src*='facebook']");
    elements.each(function (index, elem) {
        var newparent = $("<div class='fitvid-mcd' style='position:relative; padding-bottom:56.25%; padding-top:30px; height:0; overflow:hidden;'></div>");
        newparent.insertBefore(elem);
        newparent.append(elem);
        $(elem).css({
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%"
        });
    });
}

function loadDossier() {
    var currentSlide = 0;

    //*** RESIZE EMBEDS ***//
    fitVids($(".dossier-section"));

    /* Clique numa opção de sondagem */
    $('.vote form li').click(function (event) {
        var form = $(this).closest('form');
        $('li', form).removeClass('selected');
        $(this).addClass('selected');
        $('input[type="radio"]', this).attr('checked', true);
    });

    $(".scrolldown a").click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);
    });

    $(".dossier-slide-mobile").click(function (event) {
        event.preventDefault();

        $(".dossier-slide-mobile .sectionNumber").removeClass("current");
        $($(this).find(".sectionNumber")).addClass("current");
        currentSlide = parseInt($(".sectionNumber", this)[0].textContent);
        $('html, body').animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 1000);
    });

    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var sections = $('.dossier-section');

        var slides_mobile = $('.dossier-slide-mobile');

        sections.each(function (index, value) {
            var top = $(this).offset().top - 30;
            var bottom = top + $(this).outerHeight();

            if (index !== currentSlide && scrollTop >= top && scrollTop <= bottom) {
                $(".dossier-slide-mobile .sectionNumber").removeClass("current");
                slides_mobile.filter(':eq(' + index + ')').find('.sectionNumber').addClass('current');
                currentSlide = index;
            }
        });
    });

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
    if (IOLAnalytics) {
        IOLAnalytics.updateVirtualPageView("continuar a ler", false, location.pathname, document.title);
    }
}

function addVirtualPageViewToNetscopeAndGoogleAnalytics(contentType, title) {
    var variables = {'virtualPageURL': location.pathname, 'virtualPageTitle': document.title, 'event': 'VirtualPageview', 'Plataforma': 'WEB'};

    if (contentType) {
        variables["Tipo_Conteudo"] = contentType;
    }

    title = title ? title : "";
    variables["Titulo"] = title;
    dataLayer.push(variables);
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


function adBlockDetected() {
    dataLayer.push({'eventCategory': 'Adblock', 'eventLabel': 'on', 'eventAction': 'blockAdBlock.js', 'event': 'gaEvent', 'eventValue': 1});
}

function checkAdBlock() {
    if (typeof blockAdBlock === 'undefined') {
        adBlockDetected();
    } else {
        blockAdBlock.onDetected(adBlockDetected);
    }
    // Change the options
    blockAdBlock.setOption('checkOnLoad', true);
}

//AQUI
function sondagemComLogin(elemToHide) {
    $(elemToHide).hide();
    if (window.iol.isUserLoggedIn()) {
        $(elemToHide).show();
        $("#loading").hide();
        $('input[name="utilizador"]').val(window.iol.getLoggedUser().id);
    } else {
        $("#loading").html('<div id="iol-forum-login-btn" ><b>Para participar faça </b><input type="button" onclick="callLogin()" value="Login" style="background-color:green;font-family: inherit;width: auto;padding: 8px 20px;cursor: pointer;color: #fff;text-transform: uppercase;font-size: 16px;border: 0;font-family: \'Roboto\', sans-serif;font-weight: 500;border-radius: 6px;"> </div>');
    }

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

function redirectToUrl(url) {
    if (url.indexOf("http") != -1 || url.indexOf("https") != -1) {
        window.location.href = url;
    } else {
        window.location.href = window.location.origin + url;
    }
}

function callLogin() {
    var loginLink = $('#biol-login-wrapper .biol-login-link')[0];
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initEvent('click', true, true);
    loginLink.dispatchEvent(mouseEvent);
}
