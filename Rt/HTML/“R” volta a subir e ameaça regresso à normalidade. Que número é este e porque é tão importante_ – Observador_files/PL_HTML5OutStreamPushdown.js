/*   Author: Custom Format Group  */
window.ebO && ebO.extensionHooks && ebO.extensionHooks.push(function (adConfig) {
	"use strict";

	//=================================================
	// Variables
	//-------------------------------------------------

	var scriptName		= "PL_HTML5OutStreamPushdown";
	var scriptVersion	= "2.1.1";					//you'll increase this by 0.0.1 each version until released, when it becomes 1.0.0
	var lastModified	= "2016-12-15";
	var lastUploaded	= "2016-12-15";				//this might be different to modified if it was uploaded 3 days later for example

	var templateVersion = "2.0.18";					//template version on which this custom script is based
	var isDebug         = false;						//For enabling/disabling the self.log function (Set this to false on release)
	var overrideVars    = false;
	//Programmatic Start
	var progFormatID    = 9;						// change this to the ID of your format in the programmatic tool
	//Programmatic End

	var adId = adConfig.adId;
	var rnd  = adConfig.rnd;
	var uid  = adConfig.uid;
	var self;										//our custom object with our functions and properties (not the same as ad)
	var ad;											//the ad object that we no longer extend
	var os;
	var browser;

	adConfig.enablePoliteForCS = true;				//Only have this line in your format if you have coded and tested it for polite compatibility

	EBG.customFormats      = EBG.customFormats || {};
	EBG.customFormats[uid] = EBG.customFormats[uid] || {};

	try {
		if(parent.EBG) {
			parent.EBG.customFormats      = parent.EBG.customFormats || {};
			parent.EBG.customFormats[uid] = EBG.customFormats[uid];
		}
	}
	catch(e){}
	//-------------------------------------------------

	//Programmatic Start  !! BEWARE: If removing the programmatic code, you need to consider the custom var initialization needs moving back to handleBeforeShowAd like it used to be
	// Programmatic Code To Interrupt Showing Of The Banner
	var adSelf = null;

	var MyAd = function (adConfig) {
		EBG.callSuperConstructor(MyAd , this, [adConfig]);
	};

	MyAd.prototype = {
		_show: function () {
			adSelf = this;
			self.defaultCustomFormatVars  = 
			{
				mdShouldAutoExpand:	EBG.API.Ad.getAdData(uid,"uponShow") > 1 && EBG.API.Ad.shouldExpand(uid),
				mdAutoRepositionInterval: 100,
				mdAutoExpandPercent: 50,
				mdProgEnable: false,
				mdProgSettingsFolderPath: "//services.serving-sys.com/programmatic/DomainList/",				
				mdAdBuilder: !!EBG.API.Ad.getAdData(uid,"adBuilder"),
				mdCreateAdSlot: false,
				mdPushdownAnim: true,
				mdExpandDuration: 1,
				mdEaseType: 2,
				mdExpandEase: 4,
				mdCollapseEase:0,
				mdMaxPanelWidth: 400,
				mdDelayCollapse: 15,
				mdShowPlayButton: true,
				mdShowAudioButton: true,
				mdShowCloseButton: true,
				mdShowClickthroughButton: true,
				mdDesktopPanelName: 'panel_desktop',
				mdMobilePanelName: 'panel_mobile',
				mdMinPanelWidth: 100,
				mdEyeDivZIndex: "undefined",
				mdTargetElement: "body",
				mdTags: "p",
				mdAdvanced:false
			};
			
			self.initCustomVars();

			var progMan = new self.ProgrammaticManager(function(result) {
				// result is a key value object; key is file url and value is the call response.
				// we handle the result directly in our Programmatic Manager, however, so result is unused here
				EBG.callSuperFunction(MyAd, adSelf, "_show", [adConfig]);
			});
		}
	};

	var eventSub = new EBG.Events.EventSubscription(EBG.Events.EventNames.CREATE_AD,
		function (event) {
			EBG.declareClass(MyAd, event.eventData.currentClass);
			event.eventData.currentClass = MyAd;
		});

	eventSub.timing = EBG.Events.EventTiming.BEFORE;
	eventSub.dispatcherFilters = {"_adConfig.rnd":rnd};
	EBG.eventMgr.subscribeToEvent(eventSub);


	// End Programmatic Code To Interrupt Showing Of The Banner
	//Programmatic End


	//=================================================
	// Constructor
	//-------------------------------------------------
	/**
	 * Creates the CustomFormat object.
	 *
	 * @constructor
	 * @this {CustomFormat}
	 */
	function CustomFormat() {
		self = this;	//use self instead of this for guaranteed reference to this object and not window (on event handlers)

		EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.SHOW_AD,self.handlers.handleBeforeShowAd,EBG.Events.EventTiming.BEFORE,{myAd:uid});

		// How to unsubscribe:
		// EBG.API.EventManager.unsubscribeFromEvent(EBG.Events.EventNames.SHOW_AD,self.handlers.handleBeforeShowAd,EBG.Events.EventTiming.BEFORE,{myAd:uid});
	}
	//-------------------------------------------------



	//-------------------------------------------------------------------------------------------------------------------------------------------------------
	//=================================================
	// Public methods/functions/properties
	//-------------------------------------------------
	CustomFormat.prototype = {
		isDebug: isDebug,			//this is only here so it can be overridden by a custom script plugin
		wasPolite:undefined,
		isPolite: undefined,
		//Programmatic Start
		pm: null,
		stylesheetOnExpand: {},		// stores the different expand panel stylesheets for removal at a later time
		stylesheetOnCollapse: {},	// stores the different collapse panel stylesheets for removal at a later time
		//Programmatic End
		//if you want to override an event handler, overwrite its entry in the handlers object to point to your function
		//=================================================
		// Event Handlers
		//-------------------------------------------------
		handlers: {
			// In the event of having more than 1 subscription for a specific event/timing pair, just number each one (including the first, e.g.: SHOW_AD_BEFORE1)
			handleBeforeShowAd:			function(){return self._handleBeforeShowAd.apply(this,arguments);},
			handleAfterShowAd:			function(){return self._handleAfterShowAd.apply(this,arguments);},
			handleBeforeExpand:			function(){return self._handleBeforeExpand.apply(this,arguments);},
			handleAfterExpand:			function(){return self._handleAfterExpand.apply(this,arguments);},
			handleBeforeCollapse:		function(){return self._handleBeforeCollapse.apply(this,arguments);},
			handleBeforeAddCreatives:	function(){return self._handleBeforeAddCreatives.apply(this,arguments);},
			handleOntimePageResize:		function(){return self._handleOntimePageResize.apply(this,arguments);},
			handleOntimePageScroll:		function(){return self._handleOntimePageScroll.apply(this,arguments);},
			handleVisibilityCheck:		function(){return self._handleVisibilityCheck.apply(this,arguments);},
			handleOntimeOrientation:	function(){return self._handleOntimeOrientation.apply(this,arguments);},
			handleBeforeAnimation:		function(){return self._handleBeforeAnimation.apply(this,arguments);},
			handleOntimeAnimation:		function(){return self._handleOntimeAnimation.apply(this,arguments);},
			handleAfterAnimation:		function(){return self._handleAfterAnimation.apply(this,arguments);},
			handlePanelChange:			function(){return self._handlePanelChange.apply(this,arguments);} ,
			handleCreativeContainerReady:function(){return self._handleCreativeContainerReady.apply(this, arguments);},
			//Programmatic Start
			handleAfterCollapse:		function(){return self._handleAfterCollapse.apply(this,arguments);},
			handleBeforePageUnload:		function(){return self._handleBeforePageUnload.apply(this, arguments);}		//no comma
			//Programmatic End
		},

		_handleBeforeShowAd: function(event) {
			self.log("handleBeforeShowAd: isDefaultImage="+event.eventData.isDefaultImage+", dlm="+EBG.API.Ad.getAdData(uid,"dlm")+", uponShow="+EBG.API.Ad.getAdData(uid,"uponShow")); //add ,event if you want to see all properties traced
			if (event.eventData.isDefaultImage) return;		// don't do anything else if we're just serving a default image
			if(self.mdAdBuilder && !self.mdAdvanced) return;
			ad           = event.dispatcher;
			self.os      = EBG.API.os;
			self.browser = EBG.API.browser;
			
			self.browserData         = EBG.API.Adaptor.getBrowserData();
			self.repositionInterval  = undefined;
			self.displayWin          = EBG.API.Adaptor.getDisplayWin();
			
			self.ebDivParent;
			self.panelRef;
			
			self.originalPanelWidth  = 0;
			self.originalPanelHeight = 0;
			self.isPanelExpanded     = false;
			self.isFirstExpand       = true;
			self.currentPanelName;
			self.bannerRepo;
			self.isAnimationPlaying  = false;
			self.isIntervalRunning   = false;
			self.isFullyExpanded     = false;
			self.panelsData          = EBG.API.Ad.getAdData(uid,"panels");
			self.operationType;
			self.savedLeft           = -1000;
			self.isExpanded 		 = false;
			var adBuilderFound       = false;
			
			for(var asset in adConfig.assets){if(asset === "scripts/runad.js"){adBuilderFound = true;break;}};
			
			self.isPolite = self.wasPolite = EBG.API.Ad.getAdData(uid,"dlm") === 1;
			
			// if 1x1 ad always autoExpand 
			if(adConfig.width == 1 && adConfig.height == 1)self.setDefault("mdShouldAutoExpand",true,true);
			
			if(!self.mdPushdownAnim)self.setDefault("mdExpandDuration",0,true);
			
			var repos = parseInt(self.mdAutoRepositionInterval,10);
			if(!isNaN(repos) && repos > 0) {
				EBG.API.Ad.setAdData(uid, {
					locationPolling: EBG.Initializer._setLocationPolling(repos),	//force repos to between 10 and 100
					forceLocationPolling:true										//ensure client doesn't use mutationobserver
				});
			}

			self.repositionInterval = undefined;
			self.displayWin = EBG.API.Adaptor.getDisplayWin();
			self.displayWin.gEbPIT = self.displayWin.gEbPIT || {};
			self.subs = self.displayWin.gEbPIT.subscriptions = self.displayWin.gEbPIT.subscriptions || {};

			self.initPanelSetting();
			adConfig.uponShow = 1;
			
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.SHOW_AD,					self.handlers.handleAfterShowAd,		EBG.Events.EventTiming.AFTER,	{"myAd":uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.ADD_CREATIVES,				self.handlers.handleBeforeAddCreatives,	EBG.Events.EventTiming.BEFORE,	{"myAd":uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.EXPAND,						self.handlers.handleBeforeExpand,		EBG.Events.EventTiming.BEFORE,	{"myAd":uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.EXPAND,						self.handlers.handleAfterExpand,		EBG.Events.EventTiming.AFTER,	{"myAd":uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.COLLAPSE,					self.handlers.handleBeforeCollapse,		EBG.Events.EventTiming.BEFORE,	{"myAd":uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.ANIMATION, 					self.handlers.handleBeforeAnimation,	EBG.Events.EventTiming.BEFORE);
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.ANIMATION, 					self.handlers.handleOntimeAnimation,	EBG.Events.EventTiming.ONTIME);
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.ANIMATION, 					self.handlers.handleAfterAnimation,		EBG.Events.EventTiming.AFTER);
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.CREATIVE_CONTAINER_READY, 	self.handlers.handleCreativeContainerReady,	EBG.Events.EventTiming.ONTIME,	{myAd:uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.CHANGE_PANEL_POSITION,	    self.handlers.handleBeforePanelChange,	EBG.Events.EventTiming.BEFORE,	{"myAd":uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.CHANGE_PANEL_POSITION,		self.handlers.handlePanelChange,EBG.Events.EventTiming.BEFORE,	{"myAd":uid});
			
			//Programmatic Start
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.COLLAPSE,					self.handlers.handleAfterCollapse,			EBG.Events.EventTiming.AFTER,	{myAd:uid});
			EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.PAGE_UNLOAD,				self.handlers.handleBeforePageUnload,		EBG.Events.EventTiming.BEFORE);
			//Programmatic End
			
			self.addWindowListener("message", "handleMessageReceived", self._handleMessageReceived);

			self.ebDiv  = EBG.API.Ad.getPlaceholder(uid);
			self.panels = EBG.API.Ad.getAdData(uid,"panels");

			if(!self.isPolite) {
				EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.VISIBILITY_CHECK, self.handlers.handleVisibilityCheck, EBG.Events.EventTiming.ONTIME,{"myAd":uid});
				self._subscribeToResizeScrollOrientation("_handleBeforeShowAd:not polite");
				self.defaultPanel = ad._panels[EBG.API.Ad.getAdData(uid,"defaultPanelName").toLowerCase()];
			}
		},

		_handleAfterShowAd: function(event) {
			self.log("handleAfterShowAd: isDefaultImage="+event.eventData.isDefaultImage+", dlm="+EBG.API.Ad.getAdData(uid,"dlm")+", uponShow="+EBG.API.Ad.getAdData(uid,"uponShow"));  //add ,event if you want to see all properties traced
			self.ebDiv.style.display    = 'block';
			// temp fix set visibility to hidden ? adkit issue with banner flashing on load
			self.ebDiv.style.visibility = 'hidden';
			// temp fix set height to auto, bannerDiv wont pushdown if set to display block. 
			self.ebDiv.style.height     = 'auto';
			if(self.mdAdBuilder && self.mdAdvanced){
				self.ebDiv.style.margin = '0 auto'; 
			}
			self.ebDivParent = self.ebDiv.parentNode;
			self.setDefault("mdAutoExpandPercent",(self.mdAutoExpandPercent>100)?100:self.mdAutoExpandPercent,true);
			
			if (!self.wasPolite) {
				self.iframe    = EBG.API.Banner.getElements(uid).banner;
				self.bannerDiv = EBG.API.Banner.getElements(uid).bannerDiv;
				
				if(self.ebDivParent.offsetWidth < self.mdMaxPanelWidth) {
					EBG.API.Adaptor.setStyleToElems([self.ebDiv,self.iframe,self.bannerDiv],{width:EBG.px(self.ebDivParent.offsetWidth)});
				}
				self.positionAd();
				
				//Programmatic Start
				self._onloadInjectCSSandJS(event);		//if we aren't a polite load, now is the onload time to call this
				//Programmatic End
			}
			self.adBuilderBannerResize();
			self.changeZindex();
			self._handleOntimePageScroll();
		},

		//Programmatic Start
		_onloadInjectCSSandJS: function(event) {
			// Execute JS and inject CSS if any was used in Programmatic Settings
			if (EBG.API.Ad.getCustomVar(uid, "_mdCssOnLoad")) {
				self.stylesheetOnLoad = self.addStylesheetToHead(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdCssOnLoad"),event.dispatcher));
				self.log("Injecting CSS on load; removing on unload? " + EBG.API.Ad.getCustomVar(uid, "_mdCssOnLoadRemoveOnUnload"),EBG.API.Ad.getCustomVar(uid, "_mdCssOnLoad"));
			}
			if (EBG.API.Ad.getCustomVar(uid, "_mdJsOnLoad")) {
				self.execJS(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdJsOnLoad"),event.dispatcher));
				self.log("Executing JS on load",EBG.API.Ad.getCustomVar(uid, "_mdJsOnLoad"));
			}
		},
		//Programmatic End

		_handleBeforeExpand: function(event) {
			self.log("_handleBeforeExpand: panelName="+event.dispatcher.panelName);  //add ,event if you want to see all properties traced
			self.defaultPanel = ad._panels[EBG.API.Ad.getAdData(uid,"defaultPanelName").toLowerCase()];

			// temp fix to correct clipping setting in animator
			var panelName   = event.eventData.props.panel.name;
			var panelObj    = EBG.API.Panel.getElements(uid,panelName);
			var panelWidth  = self.panelsData[panelName].width;
			var panelHeight = self.panelsData[panelName].height;
						
			if(self.operationType == "expand")panelObj.panelDiv.style.clip = "rect(0px,"+panelWidth+"px,0px,0px)";	
				else if(self.operationType == "collapse")panelObj.panelDiv.style.clip = "rect(0px,"+panelWidth+"px,"+panelHeight+"px,0px)";	
			
			if(self.skipAnimation()) {	
				self.isFullyExpanded = false;
				panelObj.panelDiv.style.clip ="";
			}
			self.panelRef = EBG.API.Panel.getElements(uid,event.eventData.props.panel.name).panelDiv;
			if(self.mdShouldAutoExpand) ad.panelFrequencyMgr.onExpand();
			
			self.changeZindex();
			//Programmatic Start
			// Execute JS and inject CSS if any was used in Programmatic Settings
			var isDefaultPanelExpanding = event.dispatcher.panelName.toLowerCase() === self.defaultPanel.name.toLowerCase();

			// check the settings in the programmatic settings admin tool
			// Use these to determine if we actually need to inject css for this panel expansion
			if (EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpand")) {
				var injectOnAnyPanel = [7,8,9,10,11,12].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpandType"))>=0;
				var injectFirstPanelOnly = [4,5,6,10,11,12].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpandType"))>=0;
				if ( ( injectOnAnyPanel || isDefaultPanelExpanding ) && (!injectFirstPanelOnly || !EBG.API.Ad.isExpanded(uid)) ) {
					self.stylesheetOnExpand[event.dispatcher.panelName.toLowerCase()] = self.addStylesheetToHead(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdCssOnPanelExpand"),event.dispatcher));
				}
			}

			// check the settings in the programmatic settings admin tool
			// Use these to determine if we actually need to execute for this panel expansion
			if (EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelExpand")) {
				var execOnAnyPanel = (EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelExpandType") === 3 || EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelExpandType") === 4);
				var execFirstPanelOnly = (EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelExpandType") === 2 || EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelExpandType") === 4);
				if ( ( execOnAnyPanel || isDefaultPanelExpanding ) && (!execFirstPanelOnly || (!EBG.API.Ad.isExpanded(uid)) ) ) {
					self.execJS(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdJsOnPanelExpand"),event.dispatcher));
				}
			}
			//Programmatic End
		},

		_handleAfterExpand: function(event) {
			self.log("_handleAfterExpand: panelName="+event.dispatcher.panelName);  //add ,event if you want to see all properties traced
			
			if(self.skipAnimation()) {
				self.bannerDiv.style.height = EBG.px(self.originalPanelHeight);
				var panelObj = EBG.API.Panel.getElements(uid, event.eventData.props.panel.name);
				self.isFullyExpanded = true;

				var message = {	adId: adId,type: "EXPAND_ANIM_START"};
				panelObj.panel.contentWindow.postMessage(JSON.stringify(message), '*');
				
				var message = {	adId: adId,type: "EXPAND_ANIM_COMPLETE"};
				panelObj.panel.contentWindow.postMessage(JSON.stringify(message), '*');
				EBG.API.EventManager.dispatchEvent(EBG.Events.EventNames.VISIBILITY_CHECK, null, {});
			}	
			self.panelRef.style.maxWidth = EBG.px(self.mdMaxPanelWidth);
			self.resizeBannerPanel();
		},

		_handleBeforeCollapse: function(event) {
			self.log("_handleBeforeCollapse: panelName="+event.dispatcher.panelName);  //add ,event if you want to see all properties traced
		},
		
		_handleAfterCollapse: function(event) {
			self.log("_handleAfterCollapse: panelName="+event.dispatcher.panelName);  //add ,event if you want to see all properties traced
			self.isExpanded    = false;
			self.isPanelExpanded = false;
			self.resizeBannerPanel();
			
			//Programmatic Start
			var isDefaultPanelCollapsing = event.dispatcher.panelName.toLowerCase() === self.defaultPanel.name;

			var injectOnAnyPanel;
			// check the settings in the programmatic settings admin tool
			// Use these to determine if  need to remove css for this panel collapse
			if (EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpand")) {
				injectOnAnyPanel = [7,8,9,10,11,12].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpandType"))>=0;
				var removeOnCollapse = [2,3,5,6,8,9,11,12].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpandType"))>=0;
				var removeIfLastPanel = [3,6,9,12].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpandType"))>=0;
				if ( ( injectOnAnyPanel || isDefaultPanelCollapsing ) && (removeOnCollapse && (!removeIfLastPanel || !EBG.API.Ad.isExpanded(uid)) ) ) {
					self.stylesheetOnExpand[event.dispatcher.panelName.toLowerCase()].parentNode.removeChild(self.stylesheetOnExpand[event.dispatcher.panelName.toLowerCase()]);
					delete self.stylesheetOnExpand[event.dispatcher.panelName.toLowerCase()];
				}
			}

			// if no panels are expanded after this panel collapses, we need to traverse through all panels potentially in stylesheetOnExpand and
			// if any of them are set to have their code removed on panel collapse (when no other panels still expanded), we need
			// to remove them.  There should only be a maximum of a single panel in that object
			if (!EBG.API.Ad.isExpanded(uid) && [3,6,9,12].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelExpandType"))>=0) {
				var i;
				for (i in self.stylesheetOnExpand) {
					if (!self.stylesheetOnExpand.hasOwnProperty(i)) continue;
					self.stylesheetOnExpand[i].parentNode.removeChild(self.stylesheetOnExpand[i]);
					delete self.stylesheetOnExpand[i];
				}
			}

			// check the settings in the programmatic settings admin tool
			// Use these to determine if we actually need to inject css for this panel collapse
			if (EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelCollapse")) {
				injectOnAnyPanel = [3,4].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelCollapseType"))>=0;
				var injectLastPanelOnly = [2,4].indexOf(EBG.API.Ad.getCustomVar(uid, "_mdCssOnPanelCollapseType"))>=0;
				if ( ( injectOnAnyPanel || isDefaultPanelCollapsing ) && (!injectLastPanelOnly || !EBG.API.Ad.isExpanded(uid)) ) {
					self.stylesheetOnCollapse[event.dispatcher.panelName.toLowerCase()] = self.addStylesheetToHead(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdCssOnPanelCollapse"),event.dispatcher));
				}
			}

			// check the settings in the programmatic settings admin tool
			// Use these to determine if we actually need to execute js for this panel collapse
			if (EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelCollapse")) {
				var execOnAnyPanel = (EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelCollapseType") === 3 || EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelCollapseType") === 4);
				var onLastPanelExpanded = (EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelCollapseType") === 2 || EBG.API.Ad.getCustomVar(uid, "_mdJsOnPanelCollapseType") === 4);
				if ( ( execOnAnyPanel || isDefaultPanelCollapsing ) && (!onLastPanelExpanded || (!EBG.API.Ad.isExpanded(uid)) ) ) {
					self.execJS(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdJsOnPanelCollapse"),event.dispatcher));
				}
			}
			//Programmatic End
		},
		
		_handleBeforeAnimation: function(event) {
			var el = EBG.API.Adaptor.getElementById(event.eventData.elementId);
			if(self.operationType == "expand") {	
				self.isFullyExpanded = false;
				if(event.eventData.animationId == uid && el.nodeName == "IFRAME") {	
					var message = {	adId: adId,type: "EXPAND_ANIM_START"};
					el.contentWindow.postMessage(JSON.stringify(message), '*');
				}
			}
			
			if(self.operationType == "collapse") {
				if(event.eventData.animationId == uid && el.nodeName == "IFRAME") {
					var message = {	adId: adId,type: "COLLAPSE_ANIM_START"};
					el.contentWindow.postMessage(JSON.stringify(message), '*');
				}
			}	
		},
		
		_handleOntimeAnimation: function(event) {
			var el = EBG.API.Adaptor.getElementById(event.eventData.elementId);
			if(self.operationType == "expand") {
				// do something on expand
			}	
			if(self.operationType == "collapse") {
				// do something on collapse
			}
		},
		
		_handleAfterAnimation: function(event) {
			var panelName   = self.currentPanelName;
			var panelObj    = EBG.API.Panel.getElements(uid,panelName);
			var panelWidth  = self.panelsData[panelName].width;
			var panelHeight = self.panelsData[panelName].height;
						
			self.isAnimationPlaying = false;
			var el = EBG.API.Adaptor.getElementById(event.eventData.elementId);
			if(self.operationType == "expand") {
				self.bannerDiv.style.height = EBG.px(self.originalPanelHeight);
				if(event.eventData.animationId == uid && el.nodeName == "IFRAME") {
					self.isFullyExpanded = true;
					//temporary fix - issue with animation duration set to 0 prevents style from being set.
					panelObj.panelDiv.style.clip = "rect(0px,"+panelWidth+"px,"+panelHeight+"px,0px)";
					var message = {	adId: adId,type: "EXPAND_ANIM_COMPLETE"};
					el.contentWindow.postMessage(JSON.stringify(message), '*');
					EBG.API.EventManager.dispatchEvent(EBG.Events.EventNames.VISIBILITY_CHECK, null, {});
					self.operationType = "";
				}
				self.resizeBannerPanel();
			}
			
			if(self.operationType == "collapse") {
				if(event.eventData.animationId == uid && el.nodeName == "IFRAME") {
					self.isFullyExpanded = false;
					//temporary fix - issue with animation duration set to 0 prevents style from being set.
					self.bannerDiv.style.height = EBG.px(EBG.API.Ad.getAdData(uid, "height"));
					var message = {	adId: adId,type: "COLLAPSE_ANIM_COMPLETE"};
					el.contentWindow.postMessage(JSON.stringify(message), '*');
					self.operationType = "";
				}
			}
		},

		_handleBeforeAddCreatives: function(event) {
			self.log("_handleBeforeAddCreatives:"+event.eventData.creativeType+":panelName="+(event.eventData.panelName || "banner"));  //add ,event if you want to see all properties traced

			//check in event data for whether this is a banner or panel, and if a panel, which panel is it
			//you can then modify what you need to before the banner/panel are created. You can modify
			//the expand/collapse parameters here too. The ADD_CREATIVES is dispatched after the panel's
			//CC object is created with all the default parameters, but just before the HTML tags are
			//written to the page, so in addition to modify the expand/collapse params, you can also
			//modify the HTML tags that are about to be written.

			//if(event.eventData.creativeType === EBG.Events.EventNames.ADD_BANNER_PRELOAD_IMAGE_CREATIVE) {	//adding the preload img
			//}

			if(event.eventData.creativeType === EBG.Events.EventNames.ADD_HTML5_MAIN_CREATIVE) {	
				//adding the HTML5 banner
				if(self.isPolite) {
					self._subscribeToResizeScrollOrientation("_handleBeforeAddCreatives:banner:was polite");
					//self.isPolite = false;	//not polite anymore (note: we still have self.wasPolite if we want to know if we 'were')
				}
			}
			else if(event.eventData.creativeType === EBG.Events.EventNames.ADD_HTML5_PANEL_CREATIVE) {
				//event.eventData.panelName is being added
				self.defaultPanel = ad._panels[EBG.API.Ad.getAdData(uid,"defaultPanelName").toLowerCase()]; //you may want to know this before now, but default panel isn't "set" until first panel gets added
			}
		},

		_handleAfterAddCreatives: function(event) {
			self.log("_handleAfterAddCreatives:"+event.eventData.creativeType+":panelName="+(event.eventData.panelName || "banner"));  //add ,event if you want to see all properties traced
		},

		_subscribeToResizeScrollOrientation: function(trig) {
			if(!self.subscribedRSO) {	
				//time to subscribe to Resize/Scroll/Orientation events, as long as we didn't already do that
				//comment out those you don't need, and add any mouse-based subscriptions here
				EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.PAGE_RESIZE,		self.handlers.handleOntimePageResize,			EBG.Events.EventTiming.ONTIME,	{myAd:uid});
				EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.PAGE_SCROLL,		self.handlers.handleOntimePageScroll,			EBG.Events.EventTiming.ONTIME,	{myAd:uid});
				EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.SCREEN_ORIENTATION,	self.handlers.handleOntimeOrientation,			EBG.Events.EventTiming.ONTIME);
				self.subscribedRSO = true;
				self.log("_subscribeToResizeScrollOrientation:triggered by "+trig);
			}
		},

		_handleMessageReceived: function(event, params) {
			try{
	        	if(!self.IsJsonString(event.data)){return}
	            var data = event ? JSON.parse(event.data) : params;
				if (!data.data || !data.data.hasOwnProperty("uid") || data.data.uid !== uid) {
					return;
				}
	            if (data.type === "removeAd") {
					self.removeAd();
				}
				else if (data.type === "ANIMATE_EXPAND_PANEL") {
	            	self.isPanelExpanded = true;
	            }
	            else if (data.type === "ANIMATE_COLLAPSE_PANEL") {
					//animationProps = data.data.animationProps;
	            	self.animateCollapse(self.currentPanelName);
	            }
	            else if (data.type === "INIT_PANEL") { 
					self.loadPanelManually(data.data.panelName,false);	            	
	            }
	            else if (data.type === "start_tracker" || data.type === "SPRITEPLAYER_EVENT_PLAY" || data.type === "SPRITEPLAYER_EVENT_END" || data.type === "SPRITEPLAYER_EVENT_PAUSE" || data.type === "MAIN_VIDEO_PLAY" || data.type === "SPRITEPLAYER_IMAGES_LOADED") {
	            	var panelObj = EBG.API.Panel.getElements(uid,self.currentPanelName);
					var message = {
						adId: adId,
						type: data.type
					};
					panelObj.panel.contentWindow.postMessage(JSON.stringify(message), "*");
				}
			}
			catch (error) {
				self.log("onMessageReceived:catch",error);
			}
		},

		messageHandlers: {
			addCustomScriptEventListener: function(msg) {
				self.subs[msg.data.listenerId] = msg.data;
			},

			dispatchCustomScriptEvent: function(msg) {
				for (var i in self.subs) {
					if (!self.subs[i]) continue;
					var isEventMatch = self.subs[i].eventName === msg.data.eventName;
					var isCurrentAd = msg.data.uid === self.subs[i].uid;
					var isOutOfAdScope = !isCurrentAd && !msg.data.interAd;
					if (!isEventMatch || isOutOfAdScope) continue;
					if (self.subs[i].callback) {
						try {
							self.subs[i].callback(msg.data);
						}
						catch(e) {
							delete self.subs[i];		//delete 'lost' listener
						}
					}
					else {
						var listenerIds = [];
						listenerIds[listenerIds.length] = self.subs[i].listenerId;
						msg.data.listenerIds = listenerIds;
						try{self.CCs[self.subs[i].creativeIFrameId]._sendMessage("eventCallback", msg.data);}catch (error) {}
					}
				}
			},

			removeCustomScriptEventListener: function(msg) {
				delete self.subs[msg.data.listenerId];
				if(msg.data.creativeIFrameId) delete self.CCs[msg.data.creativeIFrameId];
			},

			removeAd: function() {
				self.removeAd();
			},

			setCreativeVersion: function(msg) {
				if(msg.data.creativeVersion)
					self.handleSetCreativeVersion(msg.data);
			}
		},
		
		_handlePanelChange: function(event) {
			var panelCC = EBG.getCC(uid,self.currentPanelName);
			
			//check for bad panel position temp fix reset panel left and top to 0;
			if(panelCC.props.panel.left != 0) {	
				EBG.API.Panel.modify(uid,self.currentPanelName,{left:0,top:0});
			}			
			
			if(isFullyExpanded)self.resizeBannerPanel();
			//return false
		},

		_handleOntimePageResize: function(event) {
			self.adBuilderBannerResize();
			self.resizeBannerPanel();
		},

		_handleOntimePageScroll: function(event) {
			//do something on scroll
		},

		_handleOntimeOrientation: function(event) {
			self.adBuilderBannerResize();
			self.resizeBannerPanel();
		},

		_handleCreativeContainerReady: function(event) {
			self.log("_handleCreativeContainerReady:"+(event.dispatcher.panelName || "banner"));
			//Programmatic Start
			if(!event.dispatcher.panelName) {
				self.ebDiv.style.visibility = 'visible';
				if(self.isPolite) {
					self.isPolite = false;	//not polite anymore (note: we still have self.wasPolite if we want to know if we 'were')
				
					EBG.API.EventManager.subscribeToEvent(EBG.Events.EventNames.VISIBILITY_CHECK, 	self.handlers.handleVisibilityCheck, 	EBG.Events.EventTiming.ONTIME,	{"myAd":uid});
				
					self.iframe    = EBG.API.Banner.getElements(uid).banner;
					self.bannerDiv = EBG.API.Banner.getElements(uid).bannerDiv;
					
					if(self.ebDivParent.offsetWidth < self.mdMaxPanelWidth) {
						EBG.API.Adaptor.setStyleToElems([self.ebDiv,self.iframe,self.bannerDiv],{width:EBG.px(self.ebDivParent.offsetWidth)});
					}
					self.positionAd();

					//Programmatic Start
					self._onloadInjectCSSandJS(event);		//if we were a polite load, banner ready is our onload time to call this
					//Programmatic End
				}
				self.adBuilderBannerResize();
				
			}
			
			var ifrmCC = event.dispatcher;
			self.CCs = self.CCs || {};
			self.CCs[ifrmCC.iframeId] = ifrmCC;
			ifrmCC._sendMessage("sendCreativeId", {creativeIFrameId:ifrmCC.iframeId, uid:uid});
		},

		//Programmatic Start
		_handleBeforePageUnload: function(event) {
			// Execute JS and inject CSS if any was used in Programmatic Settings

			// remove any css that was injected on ad load if option selected to remove on ad unload
			if (EBG.API.Ad.getCustomVar(uid, "_mdCssOnLoad") && EBG.API.Ad.getCustomVar(uid, "_mdCssOnLoadRemoveOnUnload")) {
				self.stylesheetOnLoad.parentNode.removeChild(self.stylesheetOnLoad);
			}
			if (EBG.API.Ad.getCustomVar(uid, "_mdCssOnUnload")) {
				// inject CSS to top window, but save reference to it in case we need to remove it on ad unload (_mdCssOnLoadRemoveOnUnload)
				self.stylesheetOnUnload = self.addStylesheetToHead(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdCssOnUnload"),event.dispatcher));
			}

			if (EBG.API.Ad.getCustomVar(uid, "_mdJsOnUnload")) {
				self.execJS(self.tokenReplace(EBG.API.Ad.getCustomVar(uid,"_mdJsOnUnload"),event.dispatcher));
				// execute JS on top window
			}
		},
		//Programmatic End

		_handleVisibilityCheck : function(event) {
			var panels = EBG.API.Ad.getAdData(uid,"panels");
			if(!self.currentPanelName) self.initPanelSetting();
			// check if the ebDiv is in the viewport , passing in panel width and height so that the panel will expand fully in the viewport. 
			var panelDimension = self.getPanelSize();
			var bannerVisibility = (EBG.posHelper.calculateVisibilityPercentage(self.ebDiv.id,panelDimension.width,panelDimension.height)*100);
			if(bannerVisibility >= self.mdAutoExpandPercent && !EBG.API.Ad.isExpanded(uid, self.currentPanelName) && self.isFirstExpand && self.mdShouldAutoExpand) {
				self.loadPanelManually(self.currentPanelName,true);
			}
			
			if(EBG.API.Ad.isExpanded(uid, self.currentPanelName)) {
				var panelObj          = EBG.API.Panel.getElements(uid,self.currentPanelName);
				var panelVisibility   = (EBG.posHelper.calculateVisibilityPercentage(panelObj.panel.id,panelDimension.width,panelDimension.height)*100);
				// verticalPercentage used for backwards compatability
				var visibilityDetails = {visiblePercent:panelVisibility, verticalPercentage:panelVisibility};
				var message = {adId: adId,type: "PAGE_SCROLL",visibilityDetails:visibilityDetails};
					panelObj.panel.contentWindow.postMessage(JSON.stringify(message), "*");
			}
		},
		
		//-------------------------------------------------
		//End of Event Handlers Section
		//=================================================



		//=================================================
		// Custom Event Method
		//-------------------------------------------------

		dispatchCustomScriptEvent: function(eventName, params) {
			var paramsData = {type:"dispatchCustomScriptEvent",data:params||{}};
			paramsData.data.uid = uid;
			paramsData.data.eventName = eventName;
			self._handleMessageReceived(undefined, paramsData);
		},

		addCustomScriptEventListener: function(eventName, callback, interAd) {
			var data = {uid:uid,listenerId:Math.ceil(Math.random()*1000000000),eventName:eventName,interAd:!!(interAd),callback:callback};
			self._handleMessageReceived(undefined,{data:data,type:"addCustomScriptEventListener"});
			return data.listenerId;
		},

		removeCustomScriptEventListener: function(listenerId) {
			self._handleMessageReceived(undefined, {data:{uid:uid,listenerId:listenerId},type:"removeCustomScriptEventListener"});
		},

		//-------------------------------------------------
		//End of Custom Event Method
		//=================================================

		resizeBannerPanel: function() {
			if(EBG.isPreview) return;
			var panelObj    = EBG.API.Panel.getElements(uid,self.currentPanelName);

			if(self.ebDivParent.offsetWidth < self.mdMinPanelWidth) {
				var rval = self.calculateAspectRatioFit(self.originalPanelWidth, self.originalPanelHeight, self.mdMinPanelWidth, self.originalPanelHeight);
				
				if(!self.isAnimationPlaying){
					EBG.API.Adaptor.setStyleToElems([self.ebDiv, self.iframe,self.bannerDiv], {width:EBG.px(rval.width)});
					self.bannerDiv.style.height =  EBG.px(rval.height);
				}
				if(EBG.API.Ad.isExpanded(uid, self.currentPanelName)) {
					EBG.API.Panel.modify(uid,self.currentPanelName, {width:rval.width, height:rval.height},true);
					panelObj.panelDiv.style.clip = "rect(0px,"+rval.width+"px,"+rval.height+"px,0px)";
				}	
			}
			else if(self.ebDivParent.offsetWidth < self.originalPanelWidth) {		
				var rval = self.calculateAspectRatioFit(self.originalPanelWidth, self.originalPanelHeight, self.ebDivParent.offsetWidth, self.originalPanelHeight);
				if(!self.isAnimationPlaying){
					EBG.API.Adaptor.setStyleToElems([self.ebDiv,self.iframe, self.bannerDiv], {width:EBG.px(rval.width)});
					self.bannerDiv.style.height = EBG.px(rval.height);
				}
				if(EBG.API.Ad.isExpanded(uid,self.currentPanelName)) {
					 EBG.API.Panel.modify(uid, self.currentPanelName, {width:rval.width, height:rval.height}, true);
					 panelObj.panelDiv.style.clip = "rect(0px,"+rval.width+"px,"+rval.height+"px,0px)";
				}
			}
			else {
				EBG.API.Adaptor.setStyleToElems([self.ebDiv, self.iframe, self.bannerDiv], {width:EBG.px(self.originalPanelWidth)});
				if(!self.isAnimationPlaying){
					self.bannerDiv.style.height = EBG.px(self.originalPanelHeight);
				}
				if(EBG.API.Ad.isExpanded(uid, self.currentPanelName)) {
					EBG.API.Panel.modify(uid,self.currentPanelName, {width: self.originalPanelWidth, height:self.originalPanelHeight}, true);
					panelObj.panelDiv.style.clip = "rect(0px,"+self.originalPanelWidth+"px,"+self.originalPanelHeight+"px,0px)";
				}
			}
			
			if(self.browser.ie) {	
				if(EBG.API.Ad.isExpanded(uid,self.currentPanelName))
					EBG.adaptor.clip(self.panelRef,0, self.panelRef.offsetWidth, self.panelRef.offsetHeight, 0); 
			}
		},

		adBuilderBannerResize: function() {
			if(!self.mdAdBuilder && !self.mdAdvanced) return;
			self.iframe    = EBG.API.Banner.getElements(uid).banner;
			self.ebDiv  = EBG.API.Ad.getPlaceholder(uid);
			self.iframe.style.height = adConfig.defaultHeight + 'px';
			self.ebDiv.style.maxWidth = self.iframe.style.maxWidth = adConfig.defaultWidth+'px';
		},

		getPanelSize: function() {
			if(EBG.isPreview){
				return {width: self.originalPanelWidth, height:self.originalPanelHeight};
			}
			if(self.ebDivParent.offsetWidth < self.mdMinPanelWidth) {
				var rval = self.calculateAspectRatioFit(self.originalPanelWidth, self.originalPanelHeight, self.mdMinPanelWidth, self.originalPanelHeight);
				return {width:rval.width, height:rval.height};
			}
			else if(self.ebDivParent.offsetWidth < self.originalPanelWidth) {		
				var rval = self.calculateAspectRatioFit(self.originalPanelWidth, self.originalPanelHeight, self.ebDivParent.offsetWidth, self.originalPanelHeight);
				return {width:rval.width, height:rval.height};
			}
			else {
				return {width: self.originalPanelWidth, height:self.originalPanelHeight};
			}
		},
			
		positionAd: function() {
			if(!self.mdCreateAdSlot)return;
			// split tags string in to array 
			var tags = self.mdTags.split(",");
			// look for target element, if it doesn't exist then assign the target as the body 
			var targetElement =  EBG.API.Adaptor.getDisplayWin().document.querySelectorAll(self.mdTargetElement);	
			if(targetElement.length == 0)self.setDefault("mdTargetElement", "body",true);
			
			// loop through tags that are children of the targetElement
			for(var i = 0;i < tags.length;i++) {
				var targetElement = EBG.API.Adaptor.getDisplayWin().document.querySelectorAll(self.mdTargetElement+" "+tags[i]);	
				
				// check in targetElement exsits, loop through and position the tag, if no element found, ebDiv will not be repositioned
				if(targetElement.length > 0) {
					// if length is 1 then append to parent node. 
					if(targetElement.length == 1 ) {
						targetElement[0].parentNode.appendChild(self.ebDiv);
					}
					else {			
						// if length is greater than 1 find the first tag that isnt in the viewport, else append to the parent
						for(var x = 1; x < targetElement.length;x++) {
							var tagPos = self.isInViewport(targetElement[x]);
							if(!tagPos.isFullVisible) {	
								targetElement[x].parentNode.insertBefore(self.ebDiv,targetElement[x]);
								break;
							}
							else {
								targetElement[x].parentNode.appendChild(self.ebDiv);
							}
						}	
					}
					break;
				}
			}
		},
				
		animateCollapse: function(_panelName) {
			var easeType       = self.getEaseType(self.mdEaseType,self.mdCollapseEase);
			var panelWidth     = self.panelsData[_panelName].width;
			var panelHeight    = self.panelsData[_panelName].height;
			self.operationType = "collapse";
			var animateObj     = {clip: "rect(0px,"+panelWidth+"px,0px,0px)",duration:(self.mdExpandDuration*1000), easing:easeType, animationId:uid};
			var eventData      = {panelName:_panelName,pushdown:false,animate:animateObj} ;
				
			if(self.skipAnimation())delete eventData.animate;
			ad._handleCollapse({eventData:eventData});
		},
		
		loadPanelManually: function(_panelName, _isAuto) {
			if(self.isExpanded) return;
			self.isExpanded    = true;
			var easeType       = self.getEaseType(self.mdEaseType,self.mdExpandEase);
			self.isFirstExpand = false;
			var rval           = self.getPanelSize();
			EBG.API.Adaptor.setStyleToElems([self.ebDiv,self.iframe,self.bannerDiv],{width:EBG.px(rval.width)});
			var panelWidth  = self.panelsData[_panelName].width;
			var panelHeight = self.panelsData[_panelName].height;
			self.operationType = "expand";
			var animateObj     = { clip: "rect(0px,"+panelWidth+"px,"+rval.height+"px,0px)", duration: (self.mdExpandDuration*1000), easing:easeType, animationId:uid}
			var eventData      = {panelName:_panelName,pushdown:true,animate:animateObj} ;
			
			if(!self.skipAnimation()) self.isAnimationPlaying = true;
			if(self.skipAnimation())delete eventData.animate;
			ad._handleExpand({eventData:eventData});
		},
		
		initPanelSetting: function() {	
			if(self.mdAdvanced) {
				self.currentPanelName    = EBG.API.Ad.getAdData(uid,"defaultPanelName");
			}else if(self.os.mobile) {
				self.currentPanelName    = self.mdMobilePanelName;
			}
			else {
				self.currentPanelName    = self.mdDesktopPanelName;
			}

			if(self.currentPanelName){
				var panelObj             = adConfig.panels[self.currentPanelName];
				self.originalPanelWidth  = panelObj.width;
				self.originalPanelHeight = panelObj.height;
			}
		},
		
		calculateAspectRatioFit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
			var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
			return { width: srcWidth * ratio, height: srcHeight * ratio };
		},
		
		isInViewport: function(_elem, _width, _height) {
			var vp   = EBG.API.Adaptor.getViewPortMetrics();
			var elem = _elem.getBoundingClientRect();
			elem     = {width:elem.width, height:elem.height, top:elem.top, right:elem.right, bottom:elem.bottom, left:elem.left};
			if(_width != undefined) {
				elem.width = _width;
				elem.right = elem.left + elem.width;
			}
			if(_height != undefined) {
				elem.height = _height;
				elem.bottom = elem.top + elem.height;
			}
			var isWithin = {
				top: function() {
					if(elem.top >=  0 && elem.top <=  vp.Height) {
						return true;
					}
					return false;
				},
				right: function() {
					if(elem.right >=  0 && elem.right <=  vp.Width) {
						return true;
					}
					return false;
				},
				left: function() {
					if(elem.left >=  0 && elem.left <=  vp.Width) {
						return true;
					}
					return false;
				},
				bottom: function() {
					if(elem.bottom >=  0 && elem.bottom <=  vp.Height) {
						return true;
					}
					return false;
				},
				isHorizontalVisible: function() {
					return (isWithin.left() && isWithin.right());
				},
				isVerticalVisible: function() {
					return (isWithin.top() && isWithin.bottom());
				},
				horizontalVisiblePerc: function() {
					var percentage = 0;
					if(isWithin.left() && isWithin.right()) {
						percentage = 100;
					}
					else if(isWithin.left()) {
						percentage = ((vp.Width - elem.left) / (elem.right - elem.left)) * 100;
					}
					else if(isWithin.right()) {
						percentage = (elem.right / (elem.right - elem.left)) * 100;
					}
					return percentage;
				},
				verticalVisiblePerc: function() {
					var percentage = 0;
					if(isWithin.top() && isWithin.bottom()) {
						percentage = 100;
					}
					else if(isWithin.top()) {
						percentage = ((vp.Height - elem.top) / (elem.bottom - elem.top)) * 100;
					}
					else if(isWithin.bottom()) {
						percentage = (elem.bottom / (elem.bottom - elem.top)) * 100;
					}
					return percentage;
				},
				all: function() {
					return (isWithin.top() && isWithin.right() && isWithin.left() && isWithin.bottom());
				},
				isPartiallyVisible: function() {
					if((isWithin.top() && isWithin.left()) || (isWithin.right() && isWithin.top()) || (isWithin.bottom() && isWithin.right()) || (isWithin.left() && isWithin.bottom())) {
						return true
					}
					return false;
				}
			};

			return {
				verticalPercentage 	 : (EBG.isPreview)?100:isWithin.verticalVisiblePerc(),
				horizontalPercentage : (EBG.isPreview)?100:isWithin.horizontalVisiblePerc(),
				isFullVisible 		 : (EBG.isPreview)?true:isWithin.all(),
				isHorizontalVisible  : (EBG.isPreview)?true:isWithin.isHorizontalVisible(),
				isVerticalVisible 	 : (EBG.isPreview)?true:isWithin.isVerticalVisible(),
				isPartiallyVisible   : (EBG.isPreview)?true:isWithin.isPartiallyVisible()
			}
		},
		
		getEaseType: function(easeType, ease) {
			var easing,easeTypeArray,returnValue;
			
			if(easeType == 1) {			// Javascript Easing
				easing = EBG.Animation.Easing;
				easeTypeArray =[
				easing.linear,			// no easing no acceleration
				easing.easeInQuad, 		// accelerating for zero velocity
				easing.easeOutQuad,		// decelerating from zero velocity
				easing.easeInOutQuad,	// accelrate until halfway then decelerate
				easing.easeInCubic,		// accelerating for zero velocity
				easing.easeOutCubic,	// decelerating from zero velocity
				easing.easeInOutCubic,	// accelrate until halfway then decelerate
				easing.easeInQuart,		// accelerating for zero velocity
				easing.easeOutQuart,	// decelerating from zero velocity
				easing.easeInOutQuart,	// accelrate until halfway then decelerate
				easing.easeInQuint,		// accelerating for zero velocity
				easing.easeOutQuint,	// decelerating from zero velocity
				easing.easeInOutQuint	// accelrate until halfway then decelerate
				]
			}
			else if(easeType == 2) {	// CSS Easing
				easing = EBG.Animation.TransitionEasing;
				easeTypeArray =[
				easing.linear,			// no easing no acceleration
				easing.ease, 			// accelerating for zero velocity
				easing.easeIn,			// accelrate until halfway then decelerate
				easing.easeOut,			// decelerating from zero velocity
				easing.easeInOut		// accelrate until halfway then decelerate
				]
			}
			else {						// default Ease setting if none found
				return  EBG.Animation.TransitionEasing.linear;
			}

			returnValue = easeTypeArray[0];
			if(ease < easeTypeArray.length-1)returnValue = easeTypeArray[ease];	
								
			return returnValue;
		},	
		
		skipAnimation: function() {
			var skipAnimation = false;
			
			if(self.os.ios && self.os.ver < 8)skipAnimation = true;
			if(self.os.android && self.os.verN <= 4.2)skipAnimation = true;
			
			return skipAnimation;
		},

		//=================================================
		// Custom Vars Related Functions
		//-------------------------------------------------
		initCustomVars: function() {
			for (var cv in self.defaultCustomFormatVars) {
				if (!self.defaultCustomFormatVars.hasOwnProperty(cv)) continue;
				self.setDefault(cv, self.defaultCustomFormatVars[cv],overrideVars); // once undefined allowed to be set by type (not "undefined"), replace this line with API setCustomVar
			}
			self.setDefaultWithAppend("mdCustomFormatScriptVer",scriptName + "," + scriptVersion,"|");
		},

		setDefault: function(varName, defaultValue, optional_override) {
			EBG.API.Ad.setCustomVar(uid, varName, defaultValue, !!optional_override);
			self[varName] = EBG.API.Ad.getCustomVar(uid, varName);
		},

		//this one lets you append strings to an existing string custom var, with optional delimiter
		setDefaultWithAppend: function(varName, defaultValue, optionalDelimiter) {
			var delim = optionalDelimiter || "";
			var val = EBG.API.Ad.getCustomVar(uid,varName);		//see if we already have a string in there
			val = typeof val === "string" ? (val + delim + defaultValue) : defaultValue;
			self.setDefault(varName, val, true);
		},
		//-------------------------------------------------
		//End of Custom Vars Related Functions Section
		//=================================================


		//=================================================
		// CSS Related Functions
		//-------------------------------------------------

		restoreOriginalStyle: function() {
			self.ebDiv.style.left = "";
			self.ebDiv.style.top = "";
			self.ebDiv.style.position = "";
		},

		getComputedStyle: function(elem, property) {
			var retVal = null;
			try{retVal = self.displayWin.getComputedStyle(elem).getPropertyValue(property);}catch(e){}
			return retVal;
		},

		removeCSSTransforms: function(elem) {
			do {
				EBG.API.Adaptor.setStyle(elem, {webkitTransform: "none"});
			}
			while (elem = elem.parentElement);
		},
		//-------------------------------------------------
		//End of CSS Related Functions Section
		//=================================================


		//=================================================
		// Expandable Functions Section (NOTE: Remove If your format is a Single Expandable!!!!)
		//-------------------------------------------------
		updateZIndex: function() {
			// force the top ad div to use the z-index set in the placement settings
			EBG.API.Adaptor.setStyle(self.ebDiv, {zIndex:self.iframe.style.zIndex});
		},

		switchToFixedPositioning: function() {
			EBG.API.Adaptor.setStyle(self.ebDiv, {left:0,top:0,position:"fixed"});
		},

		collapseIFrame: function() {
			var h = EBG.px(EBG.API.Ad.getAdData(uid,"height")), w = EBG.px(EBG.API.Ad.getAdData(uid,"width"));
			var clp = "rect(0px " + w + " " + h + " 0px)";
			EBG.API.Adaptor.setStyle(self.ebDiv, {left:0,top:0,height:h,width:w,clip:clp});
		},

		getOffsetTop: function(elem) {
			var boundingRect = elem.getBoundingClientRect();
			return boundingRect.top;
		},

		getOffsetLeft: function(elem) {
			var boundingRect = elem.getBoundingClientRect();
			return boundingRect.left;
		},

		getViewPortHeight: function() {
			return os.mobile ? EBG.px(EBG.API.Adaptor.getViewPortMetrics().Height) : "100vh";
		},

		getViewPortWidth: function() {
			return os.mobile ? EBG.px(EBG.API.Adaptor.getViewPortMetrics().Width) : "100vw";
		},
		//-------------------------------------------------
		//End of Expandable Functions Section
		//=================================================

		//=================================================
		// Utility Functions
		//-------------------------------------------------
		log: function() {	// this is a closure-compiled version of the original code
			if(self.isDebug) {var b,a,c;b=Array.prototype.slice.call(arguments);a=new Date();a=scriptName+" ("+a.getFullYear()+"-"+a.getMonth()+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes()+":"+a.getSeconds()+"."+a.getMilliseconds()+"): ";b.unshift(a);try {window.console && console.log && (console.log.apply?console.log.apply(console,b):console.log(b));}catch(d){}}
		},
		
		IsJsonString: function(str) {
		    try {
		        JSON.parse(str);
		    } catch (e) {
		        return false;
		    }
		    return true;
		},
		
		changeZindex: function() {
			var zIndex = EBG.API.Ad.getCustomVar(uid, "mdEyeDivZIndex");
			if(typeof zIndex !== "undefined" && !adConfig.isPreview) {
				EBG.API.Adaptor.setStyle(EBG.API.Adaptor.getEyeDiv(), {zIndex:parseInt(zIndex)});		
			}
		},

		removeAd: function() {
			EBG.API.Ad.unload(uid);
		},

		addWindowListener: function(eventName, handlerIndex, func) {	//add an overrideable listener
			self.handlers[handlerIndex] = function(){return func.apply(this,arguments);};	//make this handler overrideable by plugin script
			if(self.displayWin.addEventListener)
				self.displayWin.addEventListener(eventName, self.handlers[handlerIndex], false);
			else if(self.displayWin.attachEvent)
				self.displayWin.attachEvent("on"+eventName, self.handlers[handlerIndex]);
		},

		removeWindowListener: function(eventName, handlerIndex, func) {	//remove an overrideable listener
			if(self.displayWin.removeEventListener)
				self.displayWin.removeEventListener(eventName, self.handlers[handlerIndex], false);
			else if(self.displayWin.detachEvent)
				self.displayWin.detachEvent("on"+eventName, self.handlers[handlerIndex]);
			delete self.handlers[handlerIndex];
		},

		handleSetCreativeVersion: function(event) {	//handle the setCreativeVersion event received from the HTML5 Banner
			self.versions["creativeIds"] +=	((self.versions["creativeIds"] !== "" ? "|" : "") + event.creativeId);
			self.versions["creativeVers"] += ((self.versions["creativeVers"] !== "" ? "|" : "") + event.creativeVersion);
			self.versions["creativeLastMods"] += ((self.versions["creativeLastMods"] !== "" ? "|" : "") + event.creativeLastModified);
		},

		//Programmatic Start
		tokenReplace: function(str, panel) {
			var replaced = str.replace(/\%ebDivID\%/g,self.ebDiv.id);
			if (panel && panel.panelName) {
				replaced = replaced.replace(/\%panelIframeID\%/g,panel.iframeId);
				// sometimes the div is already removed, you can't access the ID, so when this happens, just don't replace
				if (panel._iframe.parentNode && panel._iframe.parentNode.id) replaced = replaced.replace(/\%panelDivID\%/g,panel._iframe.parentNode.id);
			}
			replaced = replaced.replace(/\%bannerIframeID\%/g,self.iframe.id);
			replaced = replaced.replace(/\%bannerDivID\%/g,self.iframe.parentNode.id);
			replaced = replaced.replace(/\%defaultPanelName\%/g,ad._defaultPanel);
			replaced = replaced.replace(/\%adid\%/g,adId);
			replaced = replaced.replace(/\%rnd\%/g,rnd);
			replaced = replaced.replace(/\%uid\%/g,uid);
			replaced = self.htmlUnencode(replaced);
			return replaced;
		},

		htmlUnencode: function(str) {
			var elem = document.createElement("div");
			elem.innerHTML = str;
			return (elem.innerText || elem.text || elem.textContent);
		},

		addStylesheetToHead: function(styleSheetRules) {
			var styleElement = self.pm.topDoc.createElement('style');
			styleElement.setAttribute('type','text/css');
			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = styleSheetRules;
			}
			else {
				styleElement.appendChild(self.pm.topDoc.createTextNode(styleSheetRules));
			}
			self.pm.topDoc.getElementsByTagName('head')[0].appendChild(styleElement);
			return styleElement;
		},

		execJS: function(jsToExec) {
			try {
				self.pm.topWin.eval(jsToExec);
			}
			catch (err) {}
		},
		//Programmatic End

		reportCFVersions: function() {		//report 'our' versions in this ad, may or may not be called by our own reportCFV function
			var saveDebug = self.isDebug;	//save current debug state
			self.isDebug = true;			//ensure it's true for this version log
			var delim = "", s = "reportCFVersions:uid:" +uid+ ": ";
			for(var v in self.versions){if(self.versions.hasOwnProperty(v)){s+=(delim+v+": "+self.versions[v]);delim=", ";}}
			self.log(s);
			self.isDebug = saveDebug;		//restore debug to what it was
		},

		versions: {
			"scriptVer":		scriptVersion,
			"scriptLastMod":	lastModified,
			"templateVer":		templateVersion,
			"creativeIds":		"",
			"creativeVers":		"",
			"creativeLastMods":	""
		},
		//-------------------------------------------------
		//End of Utility Functions
		//=================================================

		//Programmatic Start
		//-------------------------------------------------
		//Start of ProgrammaticManager Class
		//=================================================

		ProgrammaticManager: function (progReadyCallback) {
			/** start constructor **/
			self.pm = this;
			self.pm.constructor = function() {
				self.pm.readyCallback = progReadyCallback;
				self.pm.topWin = self.pm.getTopWin(window);
				self.pm.topDoc = self.pm.topWin.document;
				self.pm.PROGRAMMATIC_SETTINGS_FILENAME = "ProgrammaticSettings_" + progFormatID + ".json";
				self.pm.DEFAULT_PROGRAMMATIC_SETTING_FOLDER = "_default_";
				self.pm.mdSettingsFolderPath = EBG.API.Ad.getCustomVar(uid, "mdProgSettingsFolderPath");
				self.pm.currentFileRequested = null;
				self.pm.currentDetectMethod = null;
				var enabled = EBG.API.Ad.getCustomVar(uid, "mdProgEnable");

				// getter
				self.pm.isEnabled = function() {
					return (!!enabled);
				};

				if (self.pm.isEnabled()) {
					self.pm.getProgrammaticSettings();
				}
				else {
					self.pm.beginExperience();
				}
			};

			self.pm.getProgrammaticSettings = function() {
				var queries = self.pm.getQueryVariables();
				var domainName;
				// detect domain using cookie settings or querystring force
				// When using ProgrammaticPreview, query string values are used
				if (queries && queries.domain) {
					self.pm.currentDetectMethod = "queries";
					domainName = queries.domain;
				}
				else {
					// first try determining the domain using cookies.  Quick and no requests necessary
					self.pm.currentDetectMethod = "cookies";
					domainName = self.pm.getDomainUsingCookies(self.pm.topDoc.domain);

					// if we didn't detect the domain using cookies, try using our known TLD list
					if (!domainName) {
						var tldLength = self.pm.knownTLD(self.pm.topDoc.domain);
						if (tldLength) {
							// we know the domain is using a "known" tld, so we just grab the section immediately before that
							self.pm.currentDetectMethod = "tld";
							domainName = self.pm.topDoc.domain;
							domainName = domainName.substring(Math.max(domainName.lastIndexOf(".",domainName.length-tldLength-1),0)+1);
						}
					}
				}
				// if testing using cookies and it fails, we end up setting domain to default at end
				if (domainName) {	// domain detected, ready to load
					self.pm.loadSettingsFile(domainName);
				}
				else { // detect domain attempting to load settings file
					self.pm.getDomainUsingClientLoad(self.pm.topDoc.domain);
				}
			};
			self.pm.getTopWin = function(thisWin) {	// taken from PL_DetectServingEnvironment_All.js
				thisWin = thisWin || window;
				var topWin;
				try  { // first just try to grab top document.  If we're in a friendly iframe, or script tag, this will work fine
					topWin = top.document && top;
				}
				catch (err) { // if we fail/error out on getting top, try looping through parents to get the top-most window
					topWin = self.pm.getParentestFriendlyWin(thisWin);
				}
				return topWin;
			};
			self.pm.getParentestFriendlyWin = function(curWin, refWin) { // using curWin as our current window, try to determine how high up through parents we can go to find
			//	the top most friendly window object.
				var pfWin;
				try {
					refWin = refWin || curWin.parent;
					pfWin = curWin.document && curWin;
					if (refWin !== curWin) {
						pfWin = refWin.document && refWin;
						if (refWin !== top) {
							pfWin = self.pm.getParentestFriendlyWin(refWin) || pfWin;
						}
					}
				}
				catch (err)  {
					if (refWin !== top) {
						pfWin = self.pm.getParentestFriendlyWin(refWin) || pfWin;
					}
				}
				return pfWin;
			};
			self.pm.getQueryVariables = function() {
				var qsv = {};	// query string variables object
				var kv = {};	// key value pairs object
				var query = self.pm.topWin.location.search.substring(1);	// remove leading questionmark from querystring
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					kv.name = decodeURIComponent(vars[i].substring(0,vars[i].indexOf("=")));
					kv.value = decodeURIComponent(vars[i].substring(vars[i].indexOf("=")+1));
					qsv[kv.name] = kv.value;
				}
				return qsv;
			};
			self.pm.loadSettingsFile = function(domain) {
				self.pm.currentFileRequested = domain;
				EBG.getDataFromRemoteServer(self.pm.buildSettingsURL(domain), self.pm.parseJSON, self.pm, true);
			};
			// this function returns the length of the TLD if the TLD is known, otherwise returns 0
			self.pm.knownTLD = function(testDomain) {
				// this list of TLDs provided by R&D from top 10000 sites that served impressions for ads
				var knownTLDs = ['.com','.net','.mobi','.cci.fr','.fr','.com.au','.es','.co.uk','.de','.com.cn','.it','.be','.fi','.co.il','.co.jp','.ne.jp','.jp','.nl','.me','.com.pl','.pl','.tv','.qc.ca','.ca','.io','.com.vn','.net.vn','.vn','.com.br','.gr','.com.ar','.com.tr','.co.th','.cz','.ch','.dk','.org','.no','.biz','.co.nz','.se','.pt','.com.my','.co','.co.in','.ro','.com.hk','.fm','.com.tw','.com.al','.al','.cc','.web.id','.co.za','.com.mx','.video','.at','.info','.trade','.cl','.sk','.to','.pe','.cn','.us','.in','.lt','.mx','.bg','.eu','.co.id','.com.sg','.gg','.hn','.my','.la','.com.pk','.pk','.com.kw','.guru','.hk','.hr','.lv','.rs','.ee','.com.uy','.asia','.mus.br','.cat','.gov.au','.id','.ru','.gov.uk','.com.cy','.tw','.nu','.online','.ie','.in.th','.hu','.news','.free','.tf','.com.sa','.sa','.lk','.website','.ba','.sc','.com.ph','.ph','.media','.pr','.xyz','.az','.app','.gen.tr','.md','.net.br','.cf','.com.gh','.club','.lu','.com.do','.ws','.co.kr','.eus','.one','.net.au','.social','.si','.am','.pw','.mk','.im','.best','.com.ua','.ua','.lat','.pm','.com.lb','.ae','.dj','.win','.tt'];
				for (var i=0; i<knownTLDs.length; i++) {
					if (testDomain.substr(-knownTLDs[i].length) === knownTLDs[i] ) return knownTLDs[i].length;
				}
				return 0;
			};
			self.pm.getDomainUsingCookies = function(testDomain) {
				if (!self.pm.topDoc || !navigator.cookieEnabled) return false;
				try {
					var i=0;
					var s="_"+uid+"_"+(new Date()).getTime();
					var p=testDomain.split(".");
					while(i<(p.length-1) && self.pm.topDoc.cookie.indexOf(s+"="+s) === -1) {
						testDomain = p.slice(-1-(++i)).join(".");
						self.pm.topDoc.cookie = s+"="+s+";domain="+testDomain+";";
					}
					if (self.pm.topDoc.cookie.indexOf(s+"="+s) === -1) testDomain = self.pmDEFAULT_PROGRAMMATIC_SETTING_FOLDER;
					try {
						self.pm.topDoc.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+testDomain+";";
					}
					catch (err) {}
					return testDomain;
				}
				catch (err) {
					return false;
				}
			};
			self.pm.getDomainUsingClientLoad = function(docDomain, domsToIgnore) {
				var domainAsArray;
				var domainParts = 0;
				var checkDomain = '';
				var checkURL = '';
				var filesToCheck = [];
				domsToIgnore = [].concat(domsToIgnore);

				self.pm.currentDetectMethod = "clientLoad";

				domainAsArray=docDomain.split(".");

				while (domainParts < domainAsArray.length - 1) {
					checkDomain = domainAsArray.slice(-1-(++domainParts)).join(".");
					if (domsToIgnore.indexOf(checkDomain)>=0) continue;
					checkURL = self.pm.buildSettingsURL(checkDomain);
					filesToCheck[filesToCheck.length] = checkURL;
				}

				filesToCheck[filesToCheck.length] = self.pm.buildSettingsURL(self.pm.DEFAULT_PROGRAMMATIC_SETTING_FOLDER);

				function loadFile(url) {
					EBG.getDataFromRemoteServer(url,function(result) {
						if (result) {
							self.pm.parseJSON(result);
						}
						else {
							if (filesToCheck.length > 0) {
								loadFile(filesToCheck.shift());
							}
							else {
								// No settings were found, load ad anyway without override
								self.pm.beginExperience();
							}
						}
					}, this, true);
				}

				loadFile(filesToCheck.shift());
			};
			self.pm.buildSettingsURL = function(domainToBuild) {
				return self.pm.topDoc.location.protocol + self.pm.mdSettingsFolderPath + domainToBuild + "/" + self.pm.PROGRAMMATIC_SETTINGS_FILENAME + "?ord=" + uid;
			};
			self.pm.unbuildSettingsURL = function(urlToUnbuild) {
				var pattern = new RegExp(self.pm.topDoc.location.protocol + self.pm.mdSettingsFolderPath + "(.*)/" + self.pm.PROGRAMMATIC_SETTINGS_FILENAME  + "\\?ord=" + uid);
				return pattern.exec(urlToUnbuild)[1];
			};
			self.pm.parseJSON = function (response) {
				if (!response) {
					// If we don't have a response, it could mean we need to try loading our default folder
					// It could also mean, if it came from the KnownTLD, we must now use the regular requests method.
					// if our default setting file WAS the one that had no response, no other option
					// must simply load the ad without any programmatic settings
					 if (self.pm.currentDetectMethod === "tld")  {
						// need to get files by client request, IGNORING the current file which was part of the known TLD....
						self.pm.getDomainUsingClientLoad(self.pm.topDoc.domain, self.pm.currentFileRequested);
						return;
					}
					else if (self.pm.currentFileRequested !== self.pm.DEFAULT_PROGRAMMATIC_SETTING_FOLDER) {
						self.pm.loadSettingsFile(self.pm.DEFAULT_PROGRAMMATIC_SETTING_FOLDER,self.pm.parseJSON);
						return;
					}
					else {
						self.pm.beginExperience();
						return;
					}
				}

				try {
					// wrapped in try/catch in case anything breaks we still are able to load our ad experience

					// read setting file, apply custom variable settings, then do the below line to show the panel
					var responseSettings = JSON.parse(response).programmaticSettings;	// Programmatic Settings
					var queries = self.pm.getQueryVariables();
					var programmaticSettings = null;

					if (queries && queries.settingType) {
						switch (queries.settingType)  {
							case "Folder" :
								if (responseSettings.hasOwnProperty("folder") && responseSettings.folder.hasOwnProperty(queries.settingDetail)) {
									programmaticSettings = responseSettings.folder[queries.settingDetail];
								}
								break;
							case "Subdomain" :
								if (responseSettings.hasOwnProperty("subdomain") && responseSettings.subdomain.hasOwnProperty(queries.settingDetail)) {
									programmaticSettings = responseSettings.subdomain[queries.settingDetail];
								}
								break;
							case "Global" :
								if (responseSettings.hasOwnProperty("global")) {
									programmaticSettings = responseSettings.global;
								}
								break;
						}
					}
					else {
						var setting;
						if ( responseSettings.folder) {
							var f = responseSettings.folder;
							for (setting in f) {
								if (programmaticSettings) continue;
								if (f.hasOwnProperty(setting) && self.pm.hasFolder(setting)) {
									programmaticSettings = f[setting];
								}
							}
						}
						if (!programmaticSettings && responseSettings.subdomain) {
							var s = responseSettings.subdomain;
							for (setting in s) {
								if (programmaticSettings) continue;
								if (s.hasOwnProperty(setting) && self.pm.hasSubdomain(setting)) {
									programmaticSettings = s[setting];
								}
							}
						}
						if (!programmaticSettings && responseSettings.global) {
							programmaticSettings = responseSettings.global;
							// simply grab first "global" setting and apply it to custom vars
						}
					}

					// If it is NOT ready, then add an event handler to do the below once it IS ready
					if (programmaticSettings) self.pm.setProgrammaticSettings(programmaticSettings);
					self.pm.beginExperience();
				}
				catch (err) {
					// if anything broke during parsing, simply begin the ad experience
					self.pm.beginExperience();
				}
			};
			self.pm.hasFolder = function(folderToTest) {
				return (self.pm.topDoc.location.pathname.indexOf(folderToTest) !== -1);
			};
			self.pm.hasSubdomain = function(subdomainToTest) {
				return (self.pm.topDoc.location.hostname.indexOf(subdomainToTest) !=- 1 || self.pm.topDoc.location.host.indexOf(subdomainToTest) !== -1);
			};
			self.pm.setProgrammaticSettings = function(programmaticSettings) {
				for (var customVar in programmaticSettings) {
					if (!programmaticSettings.hasOwnProperty(customVar)) continue;
					self.setDefault(customVar,programmaticSettings[customVar],true);
				}
			};
			self.pm.beginExperience = function() {
				if (self.pm.readyCallback) window.setTimeout(self.pm.readyCallback,1);
			};

			self.pm.constructor();	// call constructor
		}
		//-------------------------------------------------
		//End of ProgrammaticManager Class
		//=================================================
		//Programmatic End

	};

	EBG.reportCFV = function(){for(var i in EBG.customFormats){if(EBG.customFormats.hasOwnProperty(i)){for(var x in EBG.customFormats[i]){if(EBG.customFormats[i].hasOwnProperty(x)){try{EBG.customFormats[i][x].reportCFVersions();}catch(e){}}}}}};

	/***************************************************************************/
	/*Initialization : Must be down here after the prototype is fully defined  */
	/***************************************************************************/
	EBG.customFormats[uid][scriptName] = new CustomFormat(); //create our 'self' class object which holds all of our functionality
});
