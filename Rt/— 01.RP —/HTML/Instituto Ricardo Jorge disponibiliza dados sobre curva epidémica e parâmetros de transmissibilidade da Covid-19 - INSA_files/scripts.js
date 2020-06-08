var $ = jQuery.noConflict();


function tabs()
{

    var tabsContainer = jQuery('.tabs');

    if (tabsContainer.length > 0) {
        tabsContainer.each(function(){

            var tabHeads = jQuery(this).find('.tab-head li');
            var tabBodies = jQuery(this).find('.tab-body');
            var trigger = jQuery(this).find('.tab-head a');
            var activeTabHeadId = jQuery(this).find('.tab-head li.active a').data('tab');

            jQuery(this).find('div#'+activeTabHeadId).addClass('active');

            trigger.on('click', function(e){
                e.preventDefault();

                if (!jQuery(this).parent('li').hasClass('active')) {
                    tabHeads.removeClass('active');
                    jQuery(this).parent('li').addClass('active');
                    tabBodies.removeClass('active').hide();
                    var currentTabId = jQuery(this).data('tab');
                    jQuery(this).closest('.tabs').find('div#'+currentTabId).addClass('active').fadeIn();
                }

            });
        });
    }
}


function tabsYear()
{

    var tabsContainer = jQuery('.tabs-year');

    if (tabsContainer.length > 0) {
        tabsContainer.each(function(){

            var tabHeads = jQuery(this).find('.tab-year-head li');
            var tabBodies = jQuery(this).find('.tab-year-body');
            var trigger = jQuery(this).find('.tab-year-head a');
            var activeTabHeadId = jQuery(this).find('.tab-year-head li.active a').data('tab-year');

            jQuery(this).find('div#'+activeTabHeadId).addClass('active');

            trigger.on('click', function(e){
                e.preventDefault();

                if (!jQuery(this).parent('li').hasClass('active')) {
                    tabHeads.removeClass('active');
                    jQuery(this).parent('li').addClass('active');
                    tabBodies.removeClass('active').hide();
                    var currentTabId = jQuery(this).data('tab-year');
                    jQuery(this).closest('.tabs-year').find('div#'+currentTabId).addClass('active').fadeIn();
                }

            });
        });
    }
}
function mainImg(){
    if(jQuery('.str .top-image').length){
        var width = jQuery('.str .top-image').width();
        var height = width/2.64;

        jQuery('.top-image').css('height', height + 'px');
    }
}

function boxImgH(){
    if(jQuery('.str .col-image .inner-slide').length){
        var h = jQuery('.str .col-image').height();
        jQuery('.str .col-image .inner-slide').css('height', h+'px');
    }
}

function tabsResize() {
    tabsResizeTabOutWrap();
    tabsResizeTabs();
}
function tabsResizeTabs() {
    //reset
    tabsResizeReset('.tab-head li', 0, 0);
    tabsDoResize('.tabs', '.tab-head li', 0, 0);
}
function tabsResizeReset(selector, paddingLeft, paddingRight)
{
    jQuery(selector).each(function (index) {
        jQuery(this).css('padding-left', paddingLeft + 'px');
        jQuery(this).css('padding-right', paddingRight +'px');
        jQuery(this).css('width', '');
        jQuery(this).removeClass('tab-first');
        jQuery(this).removeClass('tab-other-lines');
    });
}
function tabsDoResize(selector, itemsSelector, paddingLeft, paddingRight)
{
    jQuery(selector).each(function () {
        var totalWidth = jQuery(this).width();
        var itemsWidth = 0;
        var totalItems = jQuery(itemsSelector, this).length;
        var lines = new Array();

        //calcular com as widths definidas pelos styles % ( responsive )
        jQuery(itemsSelector, this).each(function (index) {
            jQuery(this).css('padding-left', paddingLeft + 'px');
            jQuery(this).css('padding-right', paddingRight +'px');
            jQuery(this).css('width', 'auto');
            //itemsWidth += parseInt(jQuery(this).outerWidth(), 10);
            itemsWidth += jQuery(this)[0].getBoundingClientRect().width;
            jQuery(this).css('width', '');

            if(itemsWidth > totalWidth)
            {
                //itemsWidth = parseInt(jQuery(this).outerWidth(), 10);
                itemsWidth = jQuery(this)[0].getBoundingClientRect().width;
                lines.push(index - 1);
            }
        });

        if(jQuery(window).width() < 768)
        {
            return;
        }

        lines.push(totalItems - 1);

        var startIndex = 0;
        var firstLine = true;
        for(var i = 0; i < lines.length;i++)
        {
            var elems = jQuery(itemsSelector, this).slice(startIndex, lines[i] + 1);

            itemsWidth = (firstLine ? 0 :1 );//border-left first item
            jQuery.each(elems, function (index) {
                jQuery(this).css('padding-left', paddingLeft + 'px');
                jQuery(this).css('padding-right', paddingRight +'px');
                jQuery(this).css('width', 'auto');
                //itemsWidth += parseInt(jQuery(this).outerWidth(), 10);
                itemsWidth += jQuery(this)[0].getBoundingClientRect().width;
                jQuery(this).css('width', '');
            });

            var partialItens = lines[i] - startIndex;

            var padding = ((totalWidth - itemsWidth) / (partialItens + 1)) / 2;

            jQuery.each(elems, function (index) {
                if(index == 0)
                {
                    jQuery(this).addClass('tab-first');
                }
                if(!firstLine)
                {
                    jQuery(this).addClass('tab-other-lines');
                }
                var paddingLeft = parseInt(jQuery(this).css('padding-left'), 10);
                var paddingRight = parseInt(jQuery(this).css('padding-right'), 10);
                jQuery(this).css('width', 'auto');
                jQuery(this).css('padding-left',  paddingLeft + padding + 'px');
                jQuery(this).css('padding-right', paddingRight + padding + 'px');
            });

            startIndex = lines[i] + 1;
            firstLine = false;
        }

    });
}
function tabsResizeTabOutWrap() {
    jQuery('.tab-out-wrap .tab-labels a').each(function (index) {
        jQuery(this).css('padding-left', '10px');
        jQuery(this).css('padding-right', '9px');
        jQuery(this).css('width', '');
        jQuery(this).removeClass('tab-first');
        jQuery(this).removeClass('tab-other-lines');
    });

    //.tab-out-wrap .tab-content .linkbutton
    jQuery('.tab-out-wrap').each(function () {
        var totalWidth = jQuery(this).width();
        var itemsWidth = 0;
        var totalItems = jQuery('.tab-labels a:visible', this).length;
        var lines = new Array();

        //calcular com as widths definidas pelos styles % ( responsive )
        jQuery('.tab-labels a:visible', this).each(function (index) {
            jQuery(this).css('padding-left', '10px');
            jQuery(this).css('padding-right', '9px');
            jQuery(this).css('width', 'auto');
            //itemsWidth += parseInt(jQuery(this).outerWidth(), 10);
            itemsWidth += jQuery(this)[0].getBoundingClientRect().width;
            jQuery(this).css('width', '');

            if(itemsWidth > totalWidth)
            {
                //itemsWidth = parseInt(jQuery(this).outerWidth(), 10);
                itemsWidth = jQuery(this)[0].getBoundingClientRect().width;
                lines.push(index - 1);
            }
        });

        if(jQuery(window).width() < 768)
        {
            return;
        }

        lines.push(totalItems - 1);

        var startIndex = 0;
        var firstLine = true;
        for(var i = 0; i < lines.length;i++)
        {
            var elems = jQuery('.tab-labels a:visible', this).slice(startIndex, lines[i] + 1);

            itemsWidth = 0;
            jQuery.each(elems, function (index) {
                jQuery(this).css('padding-left', '10px');
                jQuery(this).css('padding-right', '9px');
                jQuery(this).css('width', 'auto');
                if(index == 0)
                {
                    jQuery(this).addClass('tab-first');
                }
                //itemsWidth += parseInt(jQuery(this).outerWidth(), 10);
                itemsWidth += jQuery(this)[0].getBoundingClientRect().width;
                jQuery(this).css('width', '');
            });

            var partialItens = lines[i] - startIndex;
            //console.log('totalWidth', totalWidth);
            //console.log('itemsWidth', itemsWidth);
            //console.log('partialItens', partialItens);
            var padding = ((totalWidth - itemsWidth) / (partialItens + 1)) / 2;
            //var padding = parseInt( ((totalWidth - itemsWidth) / (partialItens + 1)) / 2 , 10);

            //console.log('buttonsWidth', buttonsWidth);
            //console.log('padding', padding);

            jQuery.each(elems, function (index) {
                var paddingLeft = parseInt(jQuery(this).css('padding-left'), 10);
                var paddingRight = parseInt(jQuery(this).css('padding-right'), 10);
                if(!firstLine)
                {
                    jQuery(this).addClass('tab-other-lines');
                }

                jQuery(this).css('width', 'auto');
                jQuery(this).css('padding-left',  paddingLeft + padding + 'px');
                jQuery(this).css('padding-right', paddingRight + padding + 'px');
            });

            startIndex = lines[i] + 1;
            firstLine = false;
        }
    });
}

function buttonsResize() {
    //.tab-out-wrap .tab-content .linkbutton
    jQuery('.tab-out-wrap .tab-content').each(function () {
        var totalWidth = jQuery(this).width();
        var buttonsWidth = 0;
        var totalItems = jQuery('.linkbutton', this).length;
        var lines = new Array();



        //calcular com as widths definidas pelos styles % ( responsive )
        jQuery('.linkbutton', this).each(function (index) {
            if(index > 0)
            {
                jQuery(this).css('margin-left', '5px');
            }
            jQuery(this).css('padding-left', '15px');
            jQuery(this).css('padding-right', '15px');
            jQuery(this).css('width', 'auto');
            buttonsWidth += parseInt(jQuery(this).outerWidth(), 10);
            jQuery(this).css('width', '');

            if(buttonsWidth > totalWidth)
            {
                buttonsWidth = parseInt(jQuery(this).outerWidth(), 10);
                lines.push(index - 1);
            }
        });

        if(totalWidth < 480)
        {
            jQuery('.linkbutton', this).each(function (index) {
                jQuery(this).css('margin-left', '0px');
            });
            return;
        }

        lines.push(totalItems - 1);

        var startIndex = 0;
        for(var i = 0; i < lines.length;i++)
        {
            var elems = jQuery('.linkbutton', this).slice(startIndex, lines[i] + 1);

            buttonsWidth = 0;
            jQuery.each(elems, function (index) {
                jQuery(this).css('padding-left', '15px');
                jQuery(this).css('padding-right', '15px');
                jQuery(this).css('width', 'auto');
                //console.log(index, parseInt(jQuery(this).outerWidth(), 10));
                buttonsWidth += parseInt(jQuery(this).outerWidth(), 10);
                jQuery(this).css('width', '');
            });

            var partialItens = lines[i] - startIndex;

            var padding = ((totalWidth - buttonsWidth - (partialItens * 5) - 1 ) / (partialItens + 1)) / 2;

            //console.log('buttonsWidth', buttonsWidth);
            //console.log('padding', padding);

            jQuery.each(elems, function (index) {
                if(index == 0)
                {
                    jQuery(this).css('margin-left', 0);
                }
                var paddingLeft = parseInt(jQuery(this).css('padding-left'), 10);
                var paddingRight = parseInt(jQuery(this).css('padding-right'), 10);
                jQuery(this).css('width', 'auto');
                jQuery(this).css('padding-left',  paddingLeft + padding + 'px');
                jQuery(this).css('padding-right', paddingRight + padding + 'px');
            });

            startIndex = lines[i] + 1;
        }
    });

}

function homepageVideoBox() {

    var boxVideoElem = jQuery('.homepage-block .box-video').first();
    if(boxVideoElem)
    {
        jQuery('iframe', boxVideoElem).css('height', '');
        if(jQuery(window).width() > 991)
        {
            var parentContainer = jQuery(boxVideoElem).parent().parent();
            var leftHeight = jQuery('div', parentContainer).first().height();

            var boxVideoContentHeight = jQuery('.box-video-description', boxVideoElem).first().outerHeight();
            jQuery('iframe', boxVideoElem).css('height', (leftHeight - boxVideoContentHeight - 2) + 'px');//2px form the border
        }
    }
}

jQuery(document).ready(
    function()
    {




        tabs();

        tabsYear();

        tabsResize();

        setTimeout(function(){ buttonsResize();tabsResize(); homepageVideoBox();}, 700);

        jQuery(window).resize(function(){

            tabsResize();
            buttonsResize();
        });




        jQuery('.tab-out-wrap .tab-labels a:not([target])').click(function(e){
            e.preventDefault();
            var container = jQuery(this).closest('.tab-out-wrap');

            jQuery('.tab-labels a', container).removeClass('activelink');
            jQuery(this).addClass('activelink');
            jQuery('.tab-content > ul > li', container).removeClass('activelink');
            jQuery('.tab-content > ul > li[data="' + jQuery(this).attr('href') + '"]', container).addClass('activelink');

            buttonsResize();
        });



        jQuery('.tab-out-wrap .tab-content ul li .tab-accordion .single-question a').click(function(e){
            e.preventDefault();
            var dat = jQuery(this).closest('li').attr('data');
            if ( jQuery(this).hasClass('open') ) {
                jQuery(this).siblings('p').slideUp();
                jQuery(this).removeClass('open');
            } else {
                jQuery('.tab-out-wrap .tab-content ul li[data="'+dat+'"] .tab-accordion .single-question a').removeClass('open');
                jQuery(this).addClass('open');
                jQuery('.tab-out-wrap .tab-content ul li[data="'+dat+'"] .tab-accordion .single-question p').slideUp();
                jQuery(this).siblings('p').slideDown();
            }
        });

        jQuery('.accordion-item-title').click(function(e){
            e.preventDefault();
            var dat = jQuery(this).closest('li').attr('data');
            if ( jQuery(this).hasClass('open') ) {
                jQuery(this).siblings('.accordion-item-content').slideUp();
                jQuery(this).removeClass('open');
            } else {
                jQuery(this).parents('.accordion').find(".accordion-item-title").removeClass('open');
                jQuery(this).addClass('open');
                jQuery(this).parents('.accordion').find(".accordion-item-content").slideUp();
                //jQuery('.tab-page section.main .container.gen .tab-out-wrap .tab-content ul li[data="'+dat+'"] .tab-accordion .single-question p').slideUp();
                jQuery(this).siblings('.accordion-item-content').slideDown();
            }
        });
    }
);


jQuery(window).load(function(){

    var color = jQuery('.breadcrumbs > span:last-of-type').css('background-color');
    jQuery('.breadcrumbs').css('background-color', color);

    if ( jQuery(window).width()>750 ) {
        var elementHeights = jQuery('.row-x.feat .col-33-left .col-content').map(function() {
            return jQuery(this).innerHeight();
        }).get();
        var maxHeight = Math.max.apply(null, elementHeights);
        jQuery('.row-x.feat .col-33-left .col-content').height(maxHeight);
    }

    jQuery(window).resize(function(){
        if ( jQuery(window).width()>750 ) {
            jQuery('.row-x.feat .col-33-left .col-content').removeAttr("style");
            var elementHeights = jQuery('.row-x.feat .col-33-left .col-content').map(function() {
                return jQuery(this).height();
            }).get();
            var maxHeight = Math.max.apply(null, elementHeights);
            jQuery('.row-x.feat .col-33-left .col-content').height(maxHeight);
        } else {
            jQuery('.row-x.feat .col-33-left .col-content').removeAttr("style");
        }
    });




    if ( jQuery(window).width()>750 ) {
        var maxHeight = jQuery('.aio .big-box-custom-page .box-in > ul').height();
        jQuery('.aio .big-box-custom-page .box-in > ul > li').outerHeight(maxHeight);
    }

    jQuery(window).resize(function(){
        if ( jQuery(window).width()>750 ) {
            jQuery('.aio .big-box-custom-page .box-in > ul > li').removeAttr("style");
            var maxHeight = jQuery('.aio .big-box-custom-page .box-in > ul').height();
            jQuery('.aio .big-box-custom-page .box-in > ul > li').outerHeight(maxHeight);
        } else {
            jQuery('.aio .big-box-custom-page .box-in > ul > li').removeAttr("style");
        }
    });


});

function assignFileName(file){
    var value = file.value;
    value = value.split(/(\\|\/)/g).pop();
    var label = document.getElementById("label2_text");
    label.value=value;
    label.style.width = ((label.value.length + 1) * 7) + 'px';
    var box = document.getElementById("label2");
    box.style.visibility = "visible";
}
    function clearFile(){
        var file = document.getElementById("file");
        var label2 = document.getElementById("label2");
        file.type = "";
        file.type = "file";
        label2.value = "";
        label2.style.visibility = "hidden";
    }
