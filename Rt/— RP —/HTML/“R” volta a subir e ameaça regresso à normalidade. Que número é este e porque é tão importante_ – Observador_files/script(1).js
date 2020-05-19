/*******************
 VARIABLES
*******************/
var creativeVersion = "1.1.1",	/* format versioning code, please do not alter or remove this variable */
customJSVersion = null,			/* format versioning code, please do not alter or remove this variable */
container,
closeButton,
videoRef,
audioButton,
clickthroughButton,
playButton,
isAudioMute 	 = true,
isVideoPlaying   = false,
isInViewportView = false,
isExpanded 		 = false,
isVideoEnded 	 = false,
userPausedVideo  = false,
delayCollapseTimeout,
replayButton,
videoContainer,
isInteractionFired = false,
panelName ='panel_desktop';

var mdPushdownAnim;
var mdAutoExpandPercent;
var mdExpandDuration;
var mdDelayCollapse;
var mdShowPlayButton;
var mdShowAudioButton;
var mdShowClickthroughButton;
var mdShowCloseButton;
var mdDesktopPanelName;
var mdMobilePanelName;
	
var adId;
var rnd;
var uid;
var sdkData;

/*******************
 INITIALIZATION
*******************/
	function checkIfAdKitReady(event) {
		adkit.onReady(initializeCreative);
	}
	
	function initializeCreative(event) {
		
		window.addEventListener("message", onMessageReceived);
		
		initCustomVars();
		initializeGlobalVariables();
		initializeCloseButton();
		addEventListeners();
		setCreativeVersion();		// format versioning code, please do not alter or remove this function
		updateAudioIcon(isAudioMute);
		if(!mdShowCloseButton)hideCloseButton();
		if(!mdShowClickthroughButton) hideClickThrough();
		if(!mdShowPlayButton) hidePlayPause();
		if(!mdShowAudioButton) hideAudioIcon();
	}
	
	function initCustomVars() {
		mdPushdownAnim           = EB.API.getCustomVar("mdPushdownAnim");
		mdAutoExpandPercent      = EB.API.getCustomVar("mdAutoExpandPercent");
		mdExpandDuration         = EB.API.getCustomVar("mdExpandDuration");
		mdDelayCollapse          = EB.API.getCustomVar("mdDelayCollapse");
		mdShowPlayButton         = EB.API.getCustomVar("mdShowPlayButton");
		mdShowAudioButton        = EB.API.getCustomVar("mdShowAudioButton");
		mdShowClickthroughButton = EB.API.getCustomVar("mdShowClickthroughButton");
		mdShowCloseButton        = EB.API.getCustomVar("mdShowCloseButton");
		mdDesktopPanelName       = EB.API.getCustomVar("mdDesktopPanelName");
		mdMobilePanelName        = EB.API.getCustomVar("mdMobilePanelName");
		mdAutoExpandPercent      = (mdAutoExpandPercent>100)?100:mdAutoExpandPercent;
	
	}

	function initializeGlobalVariables() {
		adId    = EB._adConfig.adId;
		rnd     = EB._adConfig.rnd;
		uid     = EB._adConfig.uid;
		sdkData = EB.getSDKData();
		
		container 			= document.getElementById("container");
		closeButton 		= document.getElementById('close-button');
		videoRef 			= document.getElementById('video');
		audioButton 		= document.getElementById('audio-button');
		playButton 			= document.getElementById('play-button');
		replayButton 		= document.getElementById('replay-button');
		clickthroughButton 	= document.getElementById('clickthrough-button');
		videoContainer 		= document.getElementById('video-container');
		trackVideoInteractions(videoRef);
	}
	
	function initializeCloseButton() {
		var enableSDKDefaultCloseButton = EB._adConfig && EB._adConfig.hasOwnProperty("mdEnableSDKDefaultCloseButton") && EB._adConfig.mdEnableSDKDefaultCloseButton;
		if (sdkData !== null) {
			if (sdkData.SDKType === "MRAID" && !enableSDKDefaultCloseButton) {
				// set sdk to use custom close button
				EB.setExpandProperties({
					useCustomClose: true
				});
			}
		}
	}
	
	function addEventListeners() {
		videoRef.addEventListener('ended', 			onVideoEnd);
		videoRef.addEventListener('play', 			onVideoPlay);
		videoRef.addEventListener('pause', 			onVideoPause);
		document.addEventListener('mouseover', 		onDocumentMouseOver);
		document.addEventListener('mouseout', 		onDocumentMouseOut);
		audioButton.addEventListener('click', 		onAudioToggle);
		playButton.addEventListener('click', 		onVideoToggle);
		replayButton.addEventListener('click', 		onReplayClick);
		clickthroughButton.addEventListener('click', onClickThroughClick);
		videoContainer.addEventListener('click', 	onClickThroughClick);
	}

	function removeCloseBtnListener(){
		closeButton.removeEventListener('click', 		onCloseClick);
	}
	
	function collapse() {
		removeCloseBtnListener();
		pauseVideo();
		EB._sendMessage("ANIMATE_COLLAPSE_PANEL", {
			panelName: panelName,
			actionType: EBG.ActionType.USER
		});	
		
	}

	function delayCollapse() {
		document.addEventListener('mousedown', cancelDelayCollapse);
		delayCollapseTimeout = setTimeout(collapse,mdDelayCollapse*1000);
	}

	function cancelDelayCollapse() {
		document.removeEventListener('mousedown', cancelDelayCollapse);
		clearTimeout(delayCollapseTimeout);
	}

	function hideCloseButton() {
		closeButton.style.display = 'none';
	}

	function showCloseButton() {
		closeButton.style.display = '';
	}

	function hideClickThrough() {
		clickthroughButton.style.display = 'none';
	}

	function showClickThrough() {
		clickthroughButton.style.display = '';
	}

	function onCloseClick(event) {
		collapse();
	}

	function onClickThroughClick(event) {
		userPausedVideo = true;
		pauseVideo();
		EB.clickthrough();
	}

	function onReplayClick(event) {
		isVideoEnded = false
		showControlls();
		cancelDelayCollapse();
		document.removeEventListener('mouseover', onDocumentMouseOver);
		document.removeEventListener('mouseout',  onDocumentMouseOut);
		isAudioMute = videoRef.muted = false;
		updateAudioIcon(isAudioMute);
		playVideo();
		toggleReplay(false);
		onVideoPlay();
	}

	function onVideoToggle(event) {
		try{
			if(isVideoPlaying){
				userPausedVideo = true;
				pauseVideo();
			}
			else{
				userPausedVideo = false;
				playVideo();
			}
		}catch(e){}
	}

	function onAudioToggle(event) {
		isAudioMute = videoRef.muted = !isAudioMute;
		updateAudioIcon(isAudioMute);
	}

	function playVideo() {
		if(!isInteractionFired){
			isInteractionFired = true;
			EB.automaticEventCounter('DESKTOP_VIDEO_PLAY');
		}
		videoRef.play();
		isVideoPlaying = true;
		togglePlayPause(isVideoPlaying);
	}

	function pauseVideo() {
		videoRef.pause();
		isVideoPlaying = false;
		togglePlayPause(isVideoPlaying);
	}

	function updateAudioIcon(_isMute) {
		try{
			if(_isMute) {
				audioButton.className = 'audio-mute';
			}
			else{
				audioButton.className = 'audio-unmute';
			}
		}catch(e){}
	}

	function hideAudioIcon() {
		audioButton.style.display = 'none';	
	}

	function showAudioIcon() {
		audioButton.style.display = '';	
	}

	function togglePlayPause(_isPlaying) {
		try{
			if(_isPlaying) {
				playButton.className = 'video-paused';
			}
			else{
				playButton.className = 'video-playing';
			}
		}catch(e){}
	}

	function fixIERedraw(_elm) {
		_elm.style.opacity = 0.9;
		setTimeout(function(){
			_elm.style.opacity = 1;
		},500);
	}

	function hidePlayPause() {
		playButton.style.display = 'none';
	}

	function showPlayPause() {
		playButton.style.display = '';
	}

	function toggleReplay(_show) {
		try{
			if(_show){
				replayButton.style.display = 'block';
			}
			else{
				replayButton.style.display = 'none';
			}
		}catch(e){}
	}

	function hideControlls() {
		hideAudioIcon();
		hidePlayPause();
	}

	function forceRedrawControlls() {
		forceResizeOnSafari(audioButton);
		forceResizeOnSafari(playButton);
		forceResizeOnSafari(closeButton);
		if(EB.API.browser.ie) fixIERedraw(document.body);
	}

	function showControlls() {
		if(mdShowAudioButton) showAudioIcon();
		if(mdShowPlayButton) showPlayPause();
	}

	function onDocumentMouseOver(event) {
		if (!isAudioMute) return;
		updateAudioIcon(false);
		videoRef.muted = false;
	}

	function onDocumentMouseOut(event) {
		if(!isAudioMute) return;
		updateAudioIcon(true);
		videoRef.muted = true;
	}

	function onVideoPlay(event) {
		isVideoEnded   = false;
		isVideoPlaying = true;
		togglePlayPause(true);
		showControlls();
	}

	function onVideoPause(event) {
		isVideoPlaying = false;
		try{
			togglePlayPause(false);
		}catch(e){}
	}

	function onVideoEnd(event) {
		isVideoEnded   = true;
		isVideoPlaying = false;
		togglePlayPause(false);
		toggleReplay(true);
		hideControlls();
		if(mdDelayCollapse > 0) {
			delayCollapse();
		}
		else{
			collapse();
		}
	}

	function trackVideoInteractions(video) {
		var videoTrackingModule = new EBG.VideoModule(video);
	}

	function onExpandAnimationComplete(){
		closeButton.addEventListener('click', onCloseClick);
		isExpanded = true;
		if(isInViewportView) {
			playVideo();
			if(EB.API.browser.ie) videoRef.muted = true;
		}
		forceRedrawControlls();
	}
	function onPageScroll(visiblePercent){
		if(visiblePercent >= mdAutoExpandPercent) {
			isInViewportView = true;
			if(isExpanded && !isVideoEnded && !userPausedVideo) playVideo();
		}
		else{
			isInViewportView = false;
			pauseVideo();
		}
	}
	function onCollapseAnimationStart(){
		pauseVideo();
	}

	function onCollapseAnimationComplete(_panelName){
		panelName = _panelName;
	}
/*******************
 EVENT HANDLERS
*******************/
	function onMessageReceived(event) {
		try {
			var messageData = JSON.parse(event.data);
			if (messageData.adId && messageData.adId === adId && messageData.type) {
				if (messageData.type === "PAGE_SCROLL") {
					// messageData.visiblePercent : Value in percentage, Indicate the Panel vertical visibility in viewport area.
					onPageScroll(messageData.visibilityDetails.visiblePercent);
				}
				else if (messageData.type === "EXPAND_ANIM_START") {

				}
				else if (messageData.type === "EXPAND_ANIM_COMPLETE") {
					onExpandAnimationComplete();
				}
				else if (messageData.type === "COLLAPSE_ANIM_START") {
					onCollapseAnimationStart();
				}
				else if (messageData.type === "COLLAPSE_ANIM_COMPLETE") {
					onCollapseAnimationComplete(messageData.panelName);
				}
			}
		} 
		catch (error) {
			EBG.log.debug(error);
		}
	}

/*******************
 UTILITIES
*******************/
	
	function forceResizeOnSafari(element) {
	  var disp = element.style.display;
	  element.style.display = 'none';
	  var trick = element.offsetHeight;
	  element.style.display = disp;
	}
	
	/* versioning display function starts, you may remove these functions from your product */
	function displayVersion(version) {
		var divTag = document.createElement("div");
		divTag.className = version.className;
		divTag.innerHTML = version.label + ": " + version.version;
		document.getElementsByTagName("body")[0].appendChild(divTag);
	}

	function displayCreativeVersion() {
		displayVersion({
			label: "Creative Version",
			version: creativeVersion,
			className: "creativeVersion"
		});
	}

	function displayCustomJSVersion() {
		displayVersion({
			label: "Custom JS Version",
			version: customJSVersion,
			className: "customJSVersion"
		});
	}

	/* versioning display function ends */
	
	/* format versioning code starts, please do not alter or remove these functions */

	function setCreativeVersion() {
		if (!EB._isLocalMode){
			EB._sendMessage("SET_CREATIVE_VERSION", {
				creativeVersion: creativeVersion,
				uid: EB._adConfig.uid
			});	
		}
		if (typeof displayCreativeVersion === "function") {
			//displayCreativeVersion();
		}
		setCustomJSVersion();
	}
	
	function setCustomJSVersion() {
		window.addEventListener("message", function(event) {
			try {
				var data = JSON.parse(event.data);
				if (!data.data.hasOwnProperty("uid") || data.data.uid !== EB._adConfig.uid) {
					return;
				}
				if (data.type === "SET_CUSTOMJS_VERSION") {
					if (data.data.hasOwnProperty("customJSVersion")) {
						customJSVersion = data.data.customJSVersion;
						if (typeof displayCustomJSVersion === "function") {
							//displayCustomJSVersion();
						}
					}
				}
			}
			catch (error)
			{
			}
		});	
	}
	
	window.addEventListener("load", checkIfAdKitReady);