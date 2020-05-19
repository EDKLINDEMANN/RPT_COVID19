/*******************
 VARIABLES
*******************/
var creativeVersion = "1.1.1";	// format versioning code, please do not alter or remove this variable
var customJSVersion = null;		// format versioning code, please do not alter or remove this variable 
var container;
var isPanelExpanded = false;

var mdDesktopPanelName;
var mdMobilePanelName;
var mdShouldAutoExpand;

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
		setCreativeVersion();		// format versioning code, please do not alter or remove this function
	}

	function initCustomVars() {
		mdMobilePanelName = EB.API.getCustomVar("mdMobilePanelName");
		mdDesktopPanelName = EB.API.getCustomVar("mdDesktopPanelName");
		mdShouldAutoExpand = EB.API.getCustomVar("mdShouldAutoExpand");
	}

	function expandPanel() {
		var panelName = '';
		if(EB.API.os.mobile) {
			panelName = mdMobilePanelName;
		}else{
			panelName = mdDesktopPanelName;
		}
		if(mdShouldAutoExpand) {
			EB._sendMessage("INIT_PANEL", {panelName: panelName});
		}
	} 

	function initializeGlobalVariables() {
		adId    = EB._adConfig.adId;
		rnd     = EB._adConfig.rnd;
		uid     = EB._adConfig.uid;
		sdkData = EB.getSDKData();
	}
	
	
/*******************
 EVENT HANDLERS
*******************/
	function onMessageReceived(event) {
		//EBG.log.debug("event: "+event);
		try {
			var messageData = JSON.parse(event.data);
		
			if (messageData.adId && messageData.adId === adId) {
				if (messageData.type && messageData.type === "PAGE_SCROLL") {
					// messageData.visiblePercent : Value in percentage, Indicate the Panel vertical visibility in viewport area.
					
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

	function setCustomVar(customVarName, defaultValue, parseNum) {	//create global var with name = str, taking value from adConfig if it's there, else use default
		var value = defaultValue;
		if(!EB._isLocalMode){
			var value = EB._adConfig.hasOwnProperty(customVarName) ? EB._adConfig[customVarName] : defaultValue;
		}
		if (value === "true") value = true; //PENDING if we really need this check
		if (value === "false") value = false; //PENDING if we really need this check
		if (value === "undefined") value = undefined;
		if (arguments.length == 3 && parseNum && typeof value === "string") value = parseFloat(value);
		window[customVarName] = value;
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
							displayCustomJSVersion();
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