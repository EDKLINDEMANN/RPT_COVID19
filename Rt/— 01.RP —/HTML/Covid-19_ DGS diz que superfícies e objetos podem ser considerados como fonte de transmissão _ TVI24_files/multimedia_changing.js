function changeToVideo(loadDivArtigoId, index) {
    $(`#iol-player-${loadDivArtigoId}`).show();
    $(`#iol-player-${loadDivArtigoId}`).iolplayer("stop");
    $(`#iol-cover-${loadDivArtigoId}`).hide();
    $(`#iol-gallery-${loadDivArtigoId}`).empty();


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
    smoothlyScroll(`#loadDivArtigo-${loadDivArtigoId}`);
}

function changeToCover(loadDivArtigoId) {
    $(`#iol-gallery-${loadDivArtigoId}`).empty();
    $(`#iol-cover-${loadDivArtigoId}`).fadeIn();
    
    $(`#iol-player-${loadDivArtigoId}`).iolplayer("stop");
    $("#iol-player").hide();

    smoothlyScroll(`#loadDivArtigo-${loadDivArtigoId}`);
}

