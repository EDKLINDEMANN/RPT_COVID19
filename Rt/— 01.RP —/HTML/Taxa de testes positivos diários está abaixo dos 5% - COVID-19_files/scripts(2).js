jQuery(document).ready(function ($) {


    var aria = jQuery(this).attr('aria-expanded');

    jQuery('.menu_toggler').on('click', function (e) {
        e.preventDefault();
        jQuery('.header-nav').css('top', '-24px');
        aria == true;
        jQuery(this).attr('data-state', 'opened');
        jQuery('.menu_toggler_after').attr('data-state', 'opened');
        jQuery('.menu_toggler_after').css('display', 'block');
        jQuery(this).css('display', 'none');
        
    })

    //jQuery('.banner_search_icon').on('click', function (e) {
    //    e.preventDefault();
    //    jQuery('.header-nav').css('top', '-24px');
    //    aria == true;
    //    jQuery(this).attr('data-state', 'opened');
    //    jQuery('.menu_toggler').attr('data-state', 'opened');

    //})

    jQuery('.menu_toggler_after').on('click', function (e) {
        e.preventDefault();
        jQuery('.header-nav').css('top', '-10000px');
        aria == false;
        jQuery(this).attr('data-state', 'closed');
        jQuery('.menu_toggler').attr('data-state', 'closed');
        jQuery('.menu_toggler').css('display', 'block');
        jQuery(this).css('display', 'none');

    })


    jQuery('.fake_lupa_icon').on("click", function () {
        jQuery('.banner_submiter').css('display', 'block');
        jQuery('.div_search').css('width', 160);
        jQuery('.fake_lupa_icon').css('display', 'none');  
        jQuery('.banner_inputer').focus();
    });

    jQuery('.banner_submiter').on("click", function () {
        jQuery('.banner_submiter').css('display', 'none');
        jQuery('.div_search').css('width', 0);
        jQuery('.fake_lupa_icon').css('display', 'block');  
    })

    $mobile = $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    if (!$mobile) {     

        $("#showGoogleTranslate").on("click", function (event) {
            $(".goog-te-menu-frame:first").hide();
            $(".goog-te-menu-frame:first").show();
            var transflag = $(".translate_insta");
            var glob = $(".goog-te-menu-frame");
            $(".goog-te-menu-frame:first").css({ position: "fixed", left: transflag.offset().left + (transflag.width() - glob.width()), top: 85 });
            $(".goog-te-menu-frame:first").focus();
            event.stopPropagation();
            aria_livre_mens('Mensagem da tecnologia de apoio: o tradutor encontra-se no final da p&#xE1;gina.');
        });


    } else {

        $("#showGoogleTranslate").on("click", function (event) {
            $(".goog-te-menu-frame:first").hide();
            $(".goog-te-menu-frame:first").show();
            var transflag = $(".translate_insta_mobile");
            var glob = $(".goog-te-menu-frame");
            $(".goog-te-menu-frame:first").css({ position: "fixed", left: 160, top: 410 });
            $(".goog-te-menu-frame:first").focus();
            event.stopPropagation();
            aria_livre_mens('Mensagem da tecnologia de apoio: o tradutor encontra-se no final da p&#xE1;gina.');
        });
    }




})

jQuery(document).on("click.drowdown", function (event) {
    jQuery(".goog-te-menu-frame:first").hide();
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'pt,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function aria_livre_mens(mens) {
    var el = document.createElement("div");
    var id = "speak-" + Date.now();
    el.setAttribute("id", id);
    el.setAttribute("aria-live", "polite");
    el.classList.add("sr-only");
    document.body.appendChild(el);

    window.setTimeout(function () {
        document.getElementById(id).innerHTML = mens;
    }, 100);

    window.setTimeout(function () {
        document.body.removeChild(document.getElementById(id));
    }, 1000);
}
