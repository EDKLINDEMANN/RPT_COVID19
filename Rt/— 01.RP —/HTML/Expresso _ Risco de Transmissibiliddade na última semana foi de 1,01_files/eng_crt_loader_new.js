var _ENG_CRT_OBJS = _ENG_CRT_OBJS || [];
window.Criteo = window.Criteo || {};
window.Criteo.events = window.Criteo.events || [];
window.crt_q = window.crt_q || [];
function parseCriteoBids (json) {
	// Initialize Bids Events Queue
	if (window.crt_q && Array.isArray(window.crt_q))
		BidsQueuedEvents = window.crt_q;
	// Add events listener
	window.crt_q = {
		"push": function () {
			var events = [];
			for (var _i = 0; _i < arguments.length; _i++) {
				events[_i] = arguments[_i];
			}
			if (typeof events === "undefined")
				return;
			for (var i = 0; i < events.length; i++) {
				var evt = events[i];
				if (typeof evt === "function") {
					evt();
				}
			}
		}
	};
	// Process queued json events
	window.crt_q.push.apply(window.crt_q, BidsQueuedEvents);   
};
var ENG_CRT = function(params)
{
	this.random_id = Math.ceil((Math.random()*10000000));
	this.crt_cb_data = {};
	this.zone_id = "";
	this.website_id="";
	this.is_already_run = false;
	this.is_imp_pixels_fired = false;
	this.criteo_tile_numbers = [];
};
ENG_CRT.prototype.run = function ()
{
	window["_engcrtCB"] = function (data)
	{
		_ENG_CRT_OBJS[0].crt_cb_data = data;
		if (data && data.products && data.products.length > 0) // currently identifying the caller with widget id, should be with response of random_id instead
		{
			if (typeof _ENGAGEYA_WIDGETS != "undefined")
			{
				for (var i=0;i<_ENGAGEYA_WIDGETS.length;i++)
				{
					_ENG_CRT_OBJS[0].build_layout_new(_ENGAGEYA_WIDGETS[i], data);
				}	
			}	
		}
	}
	if (!this.is_already_run)
	{
		_ENG_CRT_OBJS.push(this);	
		var crtObj = this.get_crt_object();
		this.zone_id = crtObj.zid;
		this.website_id = _ENGAGEYA_WIDGETS[0].website_id;
		this.criteo_tile_numbers = crtObj.tls.split(',');
		var websiteIdOrAddress = crtObj.swebid ? this.website_id : window.location.host;
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = 'https://static.criteo.net/js/ld/publishertag.js';
		var h = document.getElementsByTagName('script')[0];
		h.parentNode.insertBefore(s, h);
		this.validate_criteoJS_loaded_and_run(this,window["_engcrtCB"])
	}	
	this.is_already_run = true;
}
ENG_CRT.prototype.validate_criteoJS_loaded_and_run = function (callerObj, crtFunc)
{
	if (typeof(Criteo) == "undefined") 
	{
		console.log("waiting CRT JS");
		callerObj.num_of_CRT_JS_attempts--;
		if (callerObj.num_of_CRT_JS_attempts > 0)
		{
			window.setTimeout(function (){callerObj.validate_criteoJS_loaded_and_run(callerObj,crtFunc)},100);
			return;
		}	
	}
	else 
	{
		callerObj.init_criteo(crtFunc);
	}
}
ENG_CRT.prototype.init_criteo = function (crtFunc)
{
	var adUnits = this.get_ad_units(crtFunc);
	Criteo.events.push(function() {
        Criteo.RequestBids(adUnits, parseCriteoBids,1500);
    });
	window.crt_q = window.crt_q || [];
	window.crt_q.push (function() {
		Criteo.events.push(function() {
			var bid = Criteo.GetBidsForAdUnit('eng_crt_native_ad')[0];
			if (bid){
			   Criteo.RenderAd({bidId: bid.id, containerId: bid.impressionId});
			}
		});
		}
	);
}
ENG_CRT.prototype.get_ad_units = function (crtFunc)
{
	var adUnit = {
            "placements": [
            {
                "slotid": "eng_crt_native_ad",
                "zoneid": this.zone_id,
				"publishersubid": this.website_id,
				"nativeCallback": crtFunc
            }
            ]
        }
	return adUnit;
}
ENG_CRT.prototype.get_crt_object = function ()
{
	var crtObj = null;
	for (var i=0;i<_ENGAGEYA_WIDGETS.length;i++)
	{
		if (_ENGAGEYA_WIDGETS[i].get_add_data("criteo"))
		{
			crtObj = _ENGAGEYA_WIDGETS[i].get_add_data("criteo");
			break;
		}
	}
	return crtObj;
}
ENG_CRT.prototype.build_layout_new = function (widgetData, crtData)
{
	var criteoObj = widgetData.get_add_data("criteo");
	if (!criteoObj)
	{	
		return;
	}	
	if(widgetData.is_force_vertical_layout || ((widgetData.is_vertical_mobile_widget == true) && widgetData.is_mobile() && widgetData.width < widgetData.max_width_for_mobile))
	{
		this.build_mobile_layout(widgetData, crtData, criteoObj);
	}
	else
	{
		this.build_desktop_layout(widgetData, crtData, criteoObj);
	}
}
ENG_CRT.prototype.build_desktop_layout = function (widgetData, crtData, criteoObj)
{
	var criteoTilesArr = criteoObj.tls.split(",");
	var layout_default_css = ".eng_crt .eng_widget_img_w::after{background-image:none !important;}.eng_widget_href{overflow:hidden;}.eng_crt .eng_widget_img_w{border:1px solid #ededed;box-sizing:border-box;}";
	var slidesHolder = "";
	var widgetId = widgetData.widget_id;
	var widgetNumOfSlidesARow = widgetData.num_of_slides_a_row;
	var jq = widgetData.jq;
	var nomOfNonReplaceSlides = 0;
	var optout = '<div><span id="eng_oo_'+widgetId+'" class="eng_widget_oo" style="text-align:'+widgetData.widget_op_direction+';display:block;margin:5px 0px;"><img src="'+crtData.privacy.optout_image_url+'" style="width:auto;" onclick=\'_eng_open_link(event,"'+encodeURIComponent(crtData.privacy.optout_click_url)+'");return false;\'/></div>';
	var isFirstTile = true;
	for (var i=0;i<crtData.products.length && i < criteoTilesArr.length;i++)
	{
		var slideWrapper = "";
		var slideInnerHtml = "";
		var curCrtTile = criteoTilesArr[i]-1;
		var slideWrapperId = 'eng_sw_'+curCrtTile+'_'+widgetId;
		var slideToReplace = jq(widgetData.widget_wrapper_elm).find("#"+slideWrapperId);
		if (curCrtTile%widgetNumOfSlidesARow == 0)
		{
			layout_default_css += '#eng_sw_'+curCrtTile+'_'+widgetId+'{margin-'+widgetData.widget_direction+':0px !important;}';
		}
		
		var slideHref = '<a id="eng_href_'+curCrtTile+'_'+widgetId+'" class="eng_widget_href eng_crt" ';
		var slideImg = '<div id="eng_img_w_'+curCrtTile+'_'+widgetId+'" class="eng_widget_img_w"><img id="eng_img_'+curCrtTile+'_'+widgetId+'" class="eng_widget_img" ';
		var innerDiv = '<div id="eng_in_'+curCrtTile+'_'+widgetId+'" class="eng_widget_in">';
		var innerSpan = '<span id="eng_is_'+curCrtTile+'_'+widgetId+'" class="eng_widget_is">';
		var displayName = crtData.advertiser.domain;
		var displayNameSpan = displayName ? '<span id="eng_dn_'+curCrtTile+'_'+widgetId+'" class="eng_widget_dn" onclick=\'_eng_open_link(event,"'+encodeURIComponent(crtData.advertiser.logo_click_url)+'");return false;\'>' : "";
		var hrefTarget = 'target="_blank"';
		var cancelBubble = "";
		var onClick = 'onclick="'+cancelBubble+'"';
		slideHref += hrefTarget+' href="'+crtData.products[i].click_url+'" '+onClick+' title="'+crtData.products[i].description+'" onmousedown="this.href=\''+crtData.products[i].click_url+'\';'+cancelBubble+'return true;">';
		var shortenTitle = crtData.products[i].description.substring(0,100);
		var imgSrc = crtData.products[i].image.url;
		slideImg += 'src="'+imgSrc+'" data-pin-no-hover="true" /></div>';
		innerSpan += shortenTitle + '</span>';
		displayNameSpan += displayName ? (displayName + '</span>') : "";
		slideInnerHtml += slideHref + slideImg + innerDiv + innerSpan + displayNameSpan + optout +'</div></a>';
       
		if (slideToReplace && slideToReplace.length > 0)
		{
			if (isFirstTile)
			{
				var innerTilesHeight = jq(slideToReplace).find(".eng_widget_img").height();
				if (innerTilesHeight > 50)
				{
					layout_default_css += '.eng_crt .eng_widget_img_w{overflow:hidden;text-align:center;height:'+innerTilesHeight+'px !important}.eng_crt .eng_widget_img{height:'+innerTilesHeight+'px !important;display:inline-block !important;width:auto !important;}';
				}	
				slideInnerHtml += '<style>'+layout_default_css+'</style>';
				if (!this.is_imp_pixels_fired)
				{
					this.fire_impression_pixels(crtData.impression_pixels) + slideInnerHtml;
					this.is_imp_pixels_fired = true;
				}	
				isFirstTile = false;
			}
			jq(slideToReplace).html(slideInnerHtml);

		}
		else
		{
			slideWrapper += '<div id="'+slideWrapperId+'" class="eng_widget_sw">';
			slideWrapper += slideInnerHtml;
			slideWrapper += '</div>';
			nomOfNonReplaceSlides++;
			slidesHolder += slideWrapper;
		}
	}
	if (slidesHolder && nomOfNonReplaceSlides == widgetNumOfSlidesARow)
	{
        //change here
		try
		{
			var elm = document.createElement("div");
			elm.innerHTML = slidesHolder;
			if (!this.is_imp_pixels_fired)
			{
				this.fire_impression_pixels(crtData.impression_pixels)
				this.is_imp_pixels_fired = true;
			}
			var widgetSlidesWrapper = jq(widgetData.widget_wrapper_elm).find(".eng_asw");
			jq(widgetSlidesWrapper).append(elm);
		}
		catch(e){console.log(e);}
	}	
}
ENG_CRT.prototype.build_mobile_layout = function (widgetData, crtData, criteoObj)
{
	var criteoTilesArr = criteoObj.tls.split(",");
	var layout_default_css = ".eng_m_crt .eng_m_widget_img_w::after{background-image:none !important;}.eng_crt .eng_m_widget_img_w{border:1px solid #ededed;box-sizing:border-box;}";
	var slidesHolder = "";
	var widgetId = widgetData.widget_id;
	var widgetNumOfSlidesARow = widgetData.num_of_slides_a_row;
	var jq = widgetData.jq;
	var nomOfNonReplaceSlides = 0;
	var optout = '<div><span id="eng_m_oo_'+widgetId+'" class="eng_m_widget_oo" style="text-align:'+widgetData.widget_op_direction+';display:block;margin:5px 0px;"><img src="'+crtData.privacy.optout_image_url+'" style="width:auto;" onclick=\'_eng_open_link(event,"'+encodeURIComponent(crtData.privacy.optout_click_url)+'");return false;\'/></div>';
	var isFirstTile = true;
	for (var i=0;i<crtData.products.length && i < criteoTilesArr.length;i++)
	{
		var slideWrapper = "";
		var slideInnerHtml = "";
		var curCrtTile = criteoTilesArr[i]-1;
		var slideWrapperId = 'eng_m_sw_'+curCrtTile+'_'+widgetId;
		var slideToReplace = jq(widgetData.widget_wrapper_elm).find("#"+slideWrapperId);
		if (curCrtTile%widgetNumOfSlidesARow == 0)
		{
			layout_default_css += '#eng_m_sw_'+curCrtTile+'_'+widgetId+'{margin-'+widgetData.widget_direction+':0px !important;}';
		}
		slideWrapper += '<div id="'+slideWrapperId+'" class="eng_m_widget_sw">';
		var slideHref = '<a id="eng_m_href_'+curCrtTile+'_'+widgetId+'" style="display:inline !important;" class="eng_m_widget_href eng_m_crt" ';
		var slideImg = '<div id="eng_m_img_w_'+curCrtTile+'_'+widgetId+'" class="eng_m_widget_img_w"><img id="eng_img_'+curCrtTile+'_'+widgetId+'" class="eng_m_widget_img" ';
		var innerDiv = '<div id="eng_m_in_'+curCrtTile+'_'+widgetId+'" class="eng_m_widget_in">';
		var innerSpan = '<span id="eng_m_is_'+curCrtTile+'_'+widgetId+'" class="eng_m_widget_is">';
		var displayName = crtData.advertiser.domain;
		var displayNameSpan = displayName ? '<span id="eng_m_dn_'+curCrtTile+'_'+widgetId+'" class="eng_m_widget_dn" onclick=\'_eng_open_link(event,"'+encodeURIComponent(crtData.advertiser.logo_click_url)+'");return false;\'>' : "";
		var hrefTarget = 'target="_blank"';
		var cancelBubble = "";
		var onClick = 'onclick="'+cancelBubble+'"';
		slideHref += hrefTarget+' href="'+crtData.products[i].click_url+'" '+onClick+' title="'+crtData.products[i].description+'" onmousedown="this.href=\''+crtData.products[i].click_url+'\';'+cancelBubble+'return true;">';
		var shortenTitle = crtData.products[i].description.substring(0,100);
		var imgSrc = crtData.products[i].image.url;
		slideImg += 'src="'+imgSrc+'" data-pin-no-hover="true" /></div>';
		innerSpan += shortenTitle + '</span>';
		displayNameSpan += displayName ? (displayName + '</span>') : "";
        // change here
		slideInnerHtml += slideHref + slideImg + innerDiv + innerSpan + displayNameSpan + optout ;
		slideWrapper += slideInnerHtml;
		slideWrapper += '</div></a></div>';
		if (slideToReplace && slideToReplace.length > 0)
		{
			if (isFirstTile)
			{
				var innerTilesHeight = jq(slideToReplace).find(".eng_m_widget_img").height();
				if (innerTilesHeight > 50)
				{
					layout_default_css += '.eng_m_crt .eng_m_widget_img_w{overflow:hidden;text-align:center;height:'+innerTilesHeight+'px !important;}.eng_m_crt .eng_m_widget_img{display:inline-block !important;width:auto !important;height:'+innerTilesHeight+'px !important;}';
				}	
				slideInnerHtml += '<style>'+layout_default_css+'</style>';
				if (!this.is_imp_pixels_fired)
				{
					this.fire_impression_pixels(crtData.impression_pixels)
					this.is_imp_pixels_fired = true;
				}	
				isFirstTile = false;
			}
			jq(slideToReplace).html(slideInnerHtml);
		}
		else
		{
			nomOfNonReplaceSlides++;
			slidesHolder += slideWrapper;
		}	
	}
	if (slidesHolder)
	{
        //change here
		try
		{
			var elm = document.createElement("div");
			elm.innerHTML = slidesHolder;
			if (!this.is_imp_pixels_fired)
			{
				this.fire_impression_pixels(crtData.impression_pixels)
				this.is_imp_pixels_fired = true;
			}
			var widgetSlidesWrapper = jq(widgetData.widget_wrapper_elm).find(".eng_m_asw");
			jq(widgetSlidesWrapper).append(elm);
		}
		catch(e){console.log(e);}
	}	
}
ENG_CRT.prototype.fire_impression_pixels = function(urls)
{
	if (urls && urls != null && urls.length > 0)
	{
		for (var i=0;i<urls.length;i++)
		{
			var img = document.createElement('img');
			img.style.display = "none";
			img.width = 1;
			img.height = 1;
			img.src = urls[i].url;
			var h = document.getElementsByTagName('script')[0];
			h.parentNode.insertBefore(img, h);
		}
	}
}
var _eng_open_link = function(e,link)
{
	try
	{
		 if (typeof(e) == "undefined")
		  e = window.event;
		if (e.stopPropagation) {
		  e.stopPropagation();
		}
		e.cancelBubble = true;
		window.open(decodeURIComponent(link),"_blank");
	}
	catch(e)
	{
		console.log("ERROR CRT: ");console.log(e);	
	}
	return false;
}
var _eng_crt = _eng_crt || new ENG_CRT();
_eng_crt.run();
