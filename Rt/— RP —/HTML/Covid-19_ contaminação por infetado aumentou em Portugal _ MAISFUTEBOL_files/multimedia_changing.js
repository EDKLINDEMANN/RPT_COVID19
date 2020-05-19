function changeToVideo(loadDivArtigoId, elem, index) {
    $(`#iol-player-${loadDivArtigoId}`).show();
    $(`#iol-player-${loadDivArtigoId}`).iolplayer("stop");
    $(`#iol-cover-${loadDivArtigoId}`).hide();
    $(`#iol-gallery-${loadDivArtigoId}`).empty();

 updateVirtualPageView("Video", $(elem).data("id"), $(elem).data("title"));
    $(`#iol-player-${loadDivArtigoId}`).iolplayer("change", index);
    smoothlyScroll(`#loadDivArtigo-${loadDivArtigoId}`);
    $(`#iol-player-${loadDivArtigoId}`).iolplayer("play");

}


function changeToGallery(loadDivArtigoId, galleryId, title, smartTopToken, cover) {
    $(`#iol-cover-${loadDivArtigoId}`).hide();
    
    $(`#iol-player-${loadDivArtigoId}`).iolplayer("stop");
    $(`#iol-player-${loadDivArtigoId}`).hide();

    var obj = {
        galId: galleryId,
        pub: $(`#iol-gallery-${loadDivArtigoId}`).data("adunit"),
        
        smartToken: smartTopToken,
        alwaysShowPub: true,
        responsive: {
            0: {
                nav: false
            },
            1024: {
                nav: true
            }
        }
    };
    
    if(cover){
        obj['coverId'] = cover;
    }
        
    $(`#iol-gallery-${loadDivArtigoId}`).iolgallery(obj);
    updateVirtualPageView("Galeria", galleryId, title);
    smoothlyScroll(`#loadDivArtigo-${loadDivArtigoId}`);
}

function changeToCover(loadDivArtigoId) {
    $(`#iol-gallery-${loadDivArtigoId}`).empty();
    $(`#iol-cover-${loadDivArtigoId}`).fadeIn();
    
    $(`#iol-player-${loadDivArtigoId}`).iolplayer("stop");
    $("#iol-player").hide();

    smoothlyScroll(`#loadDivArtigo-${loadDivArtigoId}`);
    
    updateVirtualPageView("Capa", "", "");
}



function smoothlyScroll(target) {
    $('html, body').animate({
        scrollTop: $(target).offset().top - 80
    }, 1000);
}


function updateVirtualPageView(contentType, id, title) {
    if (window.iol_analytics) {
        var pageTitle = document
                .querySelector("meta[property='iol:content_title']")
                .getAttribute("content");

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
                        "destaque multimedia",
                        false
                        )
                );

    }
}

