// TagR Container Script
// Version 6.3.2-3-eu
// EU Version
(function (window, document) {

    //For Debuging
    var min = 1;
    var max = 10000;
    var randomStr = Math.floor(Math.random() * (+max - +min)) + +min;

    /*
    Support for polyfill start
     */
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            if (search instanceof RegExp) {
                throw TypeError('first argument must not be a RegExp');
            }
            if (start === undefined) {
                start = 0;
            }
            return this.indexOf(search, start) !== -1;
        };
    }
    //Array for debuging, add log -> CONTAINR_LOGS.push({msg: "Lorem Ipsum..."}); (extendet with other parameter
    if (typeof CONTAINR_LOGS === "undefined") {
        CONTAINR_LOGS = [];
    }

    window.addEventListener("message", function (event) {
        if (event.data == "CONTAINR_LOGS") {
            console.dir(CONTAINR_LOGS);
        }
    });


    //sourceUrl
    var SOURCE_URL = "TAGR";
    //Containr Version
    var CONTAINER_VERSION = '6.3.2-3-eu';
    //Flag var for is TagR always called
    var isAllowedCallTagR = true;
    //Timeout (ms) for fallbackTagr call
    var timeoutFallbackTagR = 100; //on prod set 100, 60000 (60sec) is just for tests
    //Check Consent Timer for Iframe (sendMessage)
    var timeoutSendMessageIframe = 1500;
    //Flag var for sendMessage in iFrame
    var isAllowedCallSendMessageInIframe = true;
    //Number of attempts call cmp over iFrame
    var numberAttemptsCallCmpIframe = 1;


    // Properties too important to miss.
    var hostProp = 'host',
        tagTypeProp = 'tagType',
        tagIdProp = 'tagid';
    // Properties that are used by name. Map parameters must be either one of these
    // or start with 'src.', 'trb.', or 'xdu.'.
    var impProps = ["redirect_url"]; // if changed consider impact on getRedirectParam
    var validMatch = new RegExp('^src|trb|tagr|xdu\\.');



    'use strict';
    window.pCache = window.pCache || [];
    window.isConsentCheckDone = window.isConsentCheckDone || false; //Use this flag to avoid multiple instance processing.
    window.isCMPPresent = window.isCMPPresent || false;


    var consentServletCommunicator = {
        hostName: '',
        getCheckConsent: function () {
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [ConsentServlet call] getCheckConsent, hostName: ' + consentServletCommunicator.hostName
            });
            console.log("consentServletCommunicator.hostName: " + consentServletCommunicator.hostName);
            httpRequest("GET", consentServletCommunicator.hostName, null, consentServletCommunicator.getConsentCallBack);
            //consentServletCommunicator.getConsentCallBack("1,1,1");

        },
        saveConsent: function (consentData) {
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [ConsentServlet call] saveConsent'
            });
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') DEBUG | consentData',
                obj: consentData
            });


            if (typeof consentData.consentData !== "undefined") {

                var requestData = consentServletCommunicator.parseConsentInfo(consentData);

                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [ConsentServlet call] call httpRequest | requestData: ' + requestData + '' +
                        ' | consentServletCommunicator.hostName: ' + consentServletCommunicator.hostName
                });

                httpRequest("POST", consentServletCommunicator.hostName, requestData, consentServletCommunicator.saveConsentCallBack);
            }
        },
        saveConsentCallBack: function (response) {
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [ConsentServlet call] saveConsentCallBack'
            });

            if (response != undefined) {

                var responseArray = response.split(",");

                if (isAllowedCallTagR) {
                    TagR.process(responseArray);
                } else {
                    CONTAINR_LOGS.push({
                        msg: '(' + randomStr + ') [CONTAINR] TagR allways called, multiple not allowed'
                    });
                }

            } else {
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [CONTAINER] Response is not valid from Post Consent from Consent Servlet',
                    type: 'error'
                });
            }
        },
        getConsentCallBack: function (response) {

            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [ConsentServlet call] getConsentCallBack, response: ' + response
            });

            var cmp = (window.isCMPPresent === true) ? 1 : 0;
            if (cmp == 0) { // CMP is not present

                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [CONTAINER] CMP is not present'
                });

                if (isAllowedCallTagR) {
                    TagR.process(getDefaultConsentServletResponseAsList);
                } else {
                    CONTAINR_LOGS.push({
                        msg: '(' + randomStr + ') [CONTAINR] TagR allways called, multiple not allowed'
                    });
                }

            } else if (cmp == 1) { // CMP is present
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [CONTAINER] CMP is present'
                });

                if (response != undefined && response != "") {
                    var responseArray = response.split(",");
                    if (responseArray[0] == 0) { // Consent Check is not required

                        if (isAllowedCallTagR) {
                            TagR.process(responseArray);
                        } else {
                            CONTAINR_LOGS.push({
                                msg: '(' + randomStr + ') [CONTAINR] TagR allways called, multiple not allowed'
                            });
                        }
                    } else if (responseArray[0] == 1) { //Consent Check is required
                        CMPCommunicator.checkConsent(); // check consent
                    }
                } else {

                    console.warn("[CONTAINER] Response is not valid from Get Consent from Consent Servlet");
                }
            }
        },
        update: function (vendorConsents) {
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') consentServletCommunicator.update' + vendorConsents
            });
            consentServletCommunicator.saveConsent(vendorConsents);
        },

        parseConsentInfo: function (consentData) {
            var decodedConsentDataUtf8 = "";


            try {
                var preparedConsentData = consentData.consentData.replace(/_/g, "/").replace(/-/g, "+"); //without replace chars "_" and "-", atob response invalid character in string
                decodedConsentDataUtf8 = atob(preparedConsentData);

                var decodedConsentDataBinary = string2Binary(decodedConsentDataUtf8);

                var createdTimeStamp = consentMetaData.created(decodedConsentDataBinary);
                var lastUpdatedTimeStamp = consentMetaData.lastUpdated(decodedConsentDataBinary);
                var consentDate = consentMetaData.created(decodedConsentDataBinary);
                var providerID = consentMetaData.cmpId(decodedConsentDataBinary);
                var version = consentMetaData.version(decodedConsentDataBinary);
                var cmpVersion = consentMetaData.cmpVersion(decodedConsentDataBinary);
                var consentScreen = consentMetaData.consentScreen(decodedConsentDataBinary);
                var consentLanguage = consentMetaData.consentLanguage(decodedConsentDataBinary);
                var vendorListVersion = consentMetaData.vendorListVersion(decodedConsentDataBinary);
                var purposesAllowed = consentMetaData.purposesAllowed(decodedConsentDataBinary);
                var maxVendorId = consentMetaData.maxVendorId(decodedConsentDataBinary);
                var encodingType = consentMetaData.encodingType(decodedConsentDataBinary); //0=BitField, 1=Range
                var defaultConsent = consentMetaData.defaultConsent(decodedConsentDataBinary);
                var numEntries = consentMetaData.numEntries(decodedConsentDataBinary);
                var singleOrRange = consentMetaData.singleOrRange(decodedConsentDataBinary); //0=Single VendorId, 1=VendorId range

                var vendorConsentVal = defaultConsent;
                //repeat the range with num entries


                if ((typeof maxVendorId !== "undefined") && encodingType == 0) {
                    vendorConsentVal = consentMetaData.getVendorConsentOnBitEncoding(decodedConsentDataBinary, maxVendorId, 98);
                    CONTAINR_LOGS.push({
                        msg: '(' + randomStr + ') [98 - vendorConsentVal By Bit Encoding] ' + vendorConsentVal
                    });
                } else if (numEntries > 0 && encodingType == 1 && singleOrRange == 0) {
                    var isExistVendorId = consentMetaData.getVendorIdFromBitStr(decodedConsentDataBinary, 98);

                    if (isExistVendorId) {
                        vendorConsentVal = (defaultConsent == 0) ? 1 : 0;
                        CONTAINR_LOGS.push({
                            msg: '(' + randomStr + ') [isExistVendorId] ' + isExistVendorId
                        });
                    }
                    CONTAINR_LOGS.push({
                        msg: '(' + randomStr + ') [98 - vendorConsentVal By Range, Single VendorId] ' + vendorConsentVal
                    });

                } else if (numEntries > 0 && encodingType == 1 && singleOrRange == 1) {
                    isExistVendorId = consentMetaData.isVendorIdInRange(maxVendorId, 98);

                    if (isExistVendorId) {
                        vendorConsentVal = (defaultConsent == 0) ? 1 : 0;
                        CONTAINR_LOGS.push({
                            msg: '(' + randomStr + ') [isExistVendorId] ' + isExistVendorId
                        });
                    }
                    CONTAINR_LOGS.push({
                        msg: '(' + randomStr + ') [98 - vendorConsentVal By Range Encoding] ' + vendorConsentVal
                    });
                } else {
                    var i = 0;
                    while (i <= numEntries) {
                        var singleVendorId = consentMetaData.singleVendorId(decodedConsentDataBinary, i);

                        if (singleVendorId == 98) {
                            vendorConsentVal = (defaultConsent == 0) ? 1 : 0;
                            CONTAINR_LOGS.push({
                                msg: '(' + randomStr + ') [singleVendorId] ' + singleVendorId
                            });
                        }
                        i++;
                    }
                }

                //If all purposesAllowed disallowed, consent is 0
                if (purposesAllowed == 0) {
                    vendorConsentVal = 0;
                }

                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [createdTimeStamp] ' + createdTimeStamp
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [lastUpdatedTimeStamp] ' + lastUpdatedTimeStamp
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [consentDate] ' + consentDate
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [providerID] ' + providerID
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [version] ' + version
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [cmpVersion] ' + cmpVersion
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [consentScreen] ' + consentScreen
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [consentLanguage] ' + consentLanguage
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [vendorListVersion] ' + vendorListVersion
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [purposesAllowed] ' + purposesAllowed
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [maxVendorId] ' + maxVendorId
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [encodingType] ' + encodingType
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [defaultConsent] ' + defaultConsent
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [numEntries] ' + numEntries
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [singleOrRange] ' + singleOrRange
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [vendorConsentVal] ' + vendorConsentVal
                });

                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [decodedConsentDataBinary] ' + decodedConsentDataBinary
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [consentData.consentData] ' + consentData.consentData
                });
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [preparedConsentData] ' + preparedConsentData
                });



            } catch (e) {
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') Unable to parse the consentData.consentData : ' + consentData.consentData
                });
            }


            if (providerID == undefined || providerID == '') {
                providerID = "unknown";
            }

            var reuqestData = '';
            if (consentDate != undefined && consentDate != '') {
                reuqestData = "sourceUrl=" + SOURCE_URL +
                    "&providerID=" + providerID +
                    "&consentDate=" + consentDate +
                    "&consent=" + vendorConsentVal;
            } else {
                reuqestData = "sourceUrl=" + SOURCE_URL +
                    "&providerID=" + providerID +
                    "&consent=" + vendorConsentVal;
            }

            if ((typeof preparedConsentData !== "undefined") || (preparedConsentData != '')) {
                reuqestData = reuqestData + "&consentString=" + encodeURIComponent(preparedConsentData);
            }

            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') requestData: ' + reuqestData
            });
            return reuqestData;
        },
        parseCookieFormatString: function (input, key) {
            return input.split(';').map(function (x) {
                return x.trim().split('=');
            }).reduce(
                function (a, b) {
                    a[b[0]] = b[1];
                    return a;
                }, {})[key];
        }
    };

    /*This class return metadata val as a decimal of binary data*/
    var consentMetaData = {
        version: function (str) { //0-5 (Version) - Val: "1" for this version | Notes: Incremented when consent string format changes
            var result = str.substring(0, 6);
            result = binary2Decimal(result);
            return result;
        },
        created: function (str) { //6-41 (Created) - Val: Epoch deciseconds when consent string value was first created | Notes: Deciseconds fits into 36 bits with enough precision to record a user's consent action timing. Javascript: Math.round((new Date()).getTime()/100)
            var result = str.substring(6, 42);
            result = Math.round(binary2Decimal(result) / 10);
            return result;
        },
        lastUpdated: function (str) { //42-77 (LastUpdated) - Val: Epoch deciseconds when consent string value was last updated | Notes: -||-
            var result = str.substring(42, 78);
            result = Math.round(binary2Decimal(result) / 10);
            return result;
        },
        cmpId: function (str) { //78-89 (CmpId) - Val: Consent Manager Provider ID that last updated the consent string value | Notes: A unique ID will be assigned to each Consent Manager Provider
            var result = str.substring(78, 90);
            result = binary2Decimal(result);
            return result;
        },
        cmpVersion: function (str) {
            var result = str.substring(90, 102);
            result = binary2Decimal(result);
            return result;
        },
        consentScreen: function (str) {
            var result = str.substring(102, 108);
            result = binary2Decimal(result);
            return result;
        },
        consentLanguage: function (str) {
            var result = str.substring(108, 120);
            result = binary2Decimal(result);
            return result;
        },
        vendorListVersion: function (str) {
            var result = str.substring(120, 132);
            result = binary2Decimal(result);
            return result;
        },
        purposesAllowed: function (str) {
            var result = str.substring(132, 156);
            result = binary2Decimal(result);
            return result;
        },
        maxVendorId: function (str) {
            var result = str.substring(156, 172);
            result = binary2Decimal(result);
            return result;
        },
        encodingType: function (str) {
            var result = str.substring(172, 173); //EncodingType 	1 bit (172) 	0=BitField 1=Range 	The consent encoding used. Either a BitFieldSection or RangeSection follows. Consent string encoding logic should choose the encoding that results in the smaller output.
            result = binary2Decimal(result);
            return result;
        },
        defaultConsent: function (str) {
            var result = str.substring(173, 174);
            result = binary2Decimal(result);
            return result;
        },
        numEntries: function (str) {
            var result = str.substring(174, 186);
            result = binary2Decimal(result);
            return result;
        },
        singleOrRange: function (str) {
            var result = str.substring(186, 187);
            result = binary2Decimal(result);
            return result;
        },
        singleVendorId: function (str, i) {

            var shiftBit = 0;
            if (i > 0) {
                shiftBit = (i * 16) + i;
            }

            var result = str.substring(187 + shiftBit, 203 + shiftBit);
            result = binary2Decimal(result);
            return result;
        },
        getVendorIdFromBitStr: function (str, vendorId) {

            var binaryVendorId = decimal2Binary(vendorId, 16);

            var isExistVendorIdInStr = false;

            try {
                var result = str.substring(187, str.length);
                if (result.includes(binaryVendorId)) {
                    isExistVendorIdInStr = true;
                }
            } catch (e) {
                //
            }

            return isExistVendorIdInStr;
        },
        getVendorConsentOnBitEncoding: function (str, maxVendorId, vendorId) {
            var vendorBitPos = vendorId - 1;
            var bitConsentStr = str.substring(173, maxVendorId + 1);

            return bitConsentStr[vendorBitPos];
        },
        isVendorIdInRange: function (maxVendorId, vendorId) {
            var isVendorIdInRangeBoolean = false;
            if (vendorId >= 1 && vendorId <= maxVendorId) {
                isVendorIdInRangeBoolean = true;
            }
            return isVendorIdInRangeBoolean;
        }
    };


    /*This class is responsible for communicating with CMP when inside a IFrame */
    var insideIframeCommunicator = {
        observers: [],
        sendMessage: function (_command, _parameter) {

            //Check is response message, if not send again message
            setTimeout(function () {
                if (isAllowedCallSendMessageInIframe && numberAttemptsCallCmpIframe > 0) {
                    CMPCommunicator.checkConsent();
                } else if (isAllowedCallSendMessageInIframe && numberAttemptsCallCmpIframe == 0 && isAllowedCallTagR) {

                    //CMP no respond, call Tag
                    TagCall.errorLog = true;
                    TagCall.errorCode = "CMP_NO_RESPOND_IFRAME";
                    TagCall.errorDesc = "CMP_NO_RESPOND_ON_SEND_MESSAGE_IFRAME_COMMUNICATOR";
                    var defaultConsentServletResponse = getDefaultConsentServletResponseAsList;
                    TagR.process(defaultConsentServletResponse);
                }

                numberAttemptsCallCmpIframe--;

            }, timeoutSendMessageIframe);


            for (var e, n = window; !e;) {
                try {
                    //n.frames.__cmpLocator && (e = n)
                    if (n.frames["__cmpLocator"]) {
                        e = n;
                    }

                } catch (r) {}
                if (n === window.top) break;
                n = n.parent
            }
            if (!e) {

                setTimeout(function () {
                        insideIframeCommunicator.sendMessage(_command, _parameter);
                    },
                    1000);
                return;
            }
            var callId = Math.random() + ""; //?
            var message = {
                __cmpCall: {
                    command: _command,
                    parameter: _parameter,
                    callId: callId
                }
            };

            e.postMessage(message, "*");
        },
        handleResponse: function (event) {
            var t = "string" == typeof event.data && event.data.includes("cmpReturn") ? JSON.parse(event.data) : event.data;

            if (t.__cmpReturn) {

                var vendorConsents = t.__cmpReturn.returnValue;
                if (isAllowedCallSendMessageInIframe) {
                    insideIframeCommunicator.notifyAll(vendorConsents);
                }
                isAllowedCallSendMessageInIframe = false;
            }
        },
        notifyAll: function (data) {
            for (var i = 0; i < insideIframeCommunicator.observers.length; i++) {
                insideIframeCommunicator.observers[i].update(data);
            }
        },
        addObserver: function (observer) {
            insideIframeCommunicator.observers.push(observer);
        }
    };


    /*This class is responsible for communicating with CMP when in same frame */
    var inSameFrameCommunicator = {
        observers: [],
        sendMessage: function (_command, _parameter) {

            if (window.__cmp) {
                window.__cmp(_command, _parameter, inSameFrameCommunicator.handleResponse); //The callback is called only after consent is obtained from the UI or existing cookies.
            } else {
                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') No __cmp stub / implementation available to call ',
                    type: "error"
                });
            }
        },
        handleResponse: function (vendorConsents, success) {

            if (success) {
                inSameFrameCommunicator.notifyAll(vendorConsents);
            } else {
                //To be decided
            }
        },
        notifyAll: function (data) {
            for (var i = 0; i < inSameFrameCommunicator.observers.length; i++) {
                inSameFrameCommunicator.observers[i].update(data);
            }
        },
        addObserver: function (observer) {
            inSameFrameCommunicator.observers.push(observer);
        }
    };


    var CMPCommunicator = {
        checkConsent: function () {

            fallbackTagR();

            var command = 'getConsentData';
            if (IN_IFRAME) {
                insideIframeCommunicator.sendMessage(command, null);
            } else {
                inSameFrameCommunicator.sendMessage(command, null);
            }
        }

    };



    var TagCall = {
        ignoreNewVisitor: false,
        errorLog: false,
        errorCode: '',
        errorDesc: '',
        u: '//{1}/t/v2/',
        c: function (p, i) {
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [CONTAINER] TagR call...'
            });
            var performRedirect = false; //based on EU region and tagType is learn make true (Reverted)
            var imageSrc = TagCall.buildTagCall(p, i, performRedirect);
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [CONTAINER] TagR-RP call = ' + imageSrc
            });
            var protocol = "https:"; // MTRTF-3716
            isAllowedCallTagR = false; //flag for is Alowed Call TagrR (multitiple)

            if (imageSrc) {
                if (performRedirect === true) {
                    window.location = imageSrc;
                } else {
                    (new Image).src = protocol + imageSrc;
                }
            }
        },
        buildTagCall: function (p, i, returnRedirect) {
            if (returnRedirect === true) {
                return TagCall.getRedirectParam(p);
            } else {
                var redirectValue = '';
                var redirectParamUrl = TagCall.getRedirectParam(p);

                if (redirectParamUrl) {
                    redirectValue = "&redirect_url=" + redirectParamUrl;
                    delete p["redirect_url"];
                }
                if (TagCall.errorLog == true) {
                    //TagCall if error logged
                    CONTAINR_LOGS.push({
                        msg: '(' + randomStr + ') [CONTAINR] tagCall errorLog: ' + TagCall.errorLog
                    });
                    return TagCall.u.replace('{1}', p[hostProp]) + p[tagTypeProp] + '?tagid=' + i + TagCall.buildQueryString(p) +
                        '&depp=' + CONTAINER_VERSION + '&err.code=' + TagCall.errorCode + '&err.desc=' + TagCall.errorDesc + '' + redirectValue;
                } else if (TagCall.ignoreNewVisitor == true) {
                    return TagCall.u.replace('{1}', p[hostProp]) + p[tagTypeProp] + '?tagid=' + i + TagCall.buildQueryString(p) +
                        '&depp=' + CONTAINER_VERSION + redirectValue;
                } else {
                    return TagCall.u.replace('{1}', p[hostProp]) + p[tagTypeProp] + '?tagid=' + i + TagCall.buildQueryString(p) +
                        '&depp=' + CONTAINER_VERSION + redirectValue;
                }

            }
        },
        buildQueryString: function (obj) {
            var s = [];
            for (var p in obj) {
                // If this is a property we care about (matches our syntax)...
                if (obj.hasOwnProperty(p) && isValid(p)) {
                    // Make sure both the value and the parameter are properly encoded.
                    var key = encodeIfNeeded(p);
                    var value = encodeIfNeeded(obj[p]);
                    // If we still have a key/value pair, add them.
                    if (key && value) {
                        s.push(key + "=" + value);
                    }
                }
            }
            return s.length > 0 ? '&' + s.join('&') : '';
        },
        getRedirectParam: function (obj) {
            var redirectParam = impProps[0];
            if (obj[redirectParam]) {
                return decodeURIComponent(obj[redirectParam]);
            } else {
                return null;
            }
        }
    };

    var TagR = {
        cacheArgs: [],
        tagrCache: function (args) {
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [CONTAINER] tagrCache ' + args
            });
            if (args[1] != undefined) {
                consentServletCommunicator.hostName = args[1].host;
                TagR.cacheArgs.push(args);
            }
        },
        process: function (responseArray) {

            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [CONTAINER] process '
            });

            for (var i = 0; i < TagR.cacheArgs.length; i++) {
                var params = [].slice.call(TagR.cacheArgs[i]);
                if (hasRequiredProps(params[1]) && responseArray != undefined) {
                    if (responseArray[2] == 1 || responseArray[2] == -1 && responseArray[1] == 1) { //positive consent or Unknown consent & NoInfoIsConsent=true
                        TagCall.c(params[1], params[0]);
                    } else if (responseArray[2] == 0 || responseArray[2] == -1 && responseArray[1] == 0) { //negative consent or Unknown consent & NoInfoIsConsent=false
                        if (params[1].tagType != "learn") { // No learn tagType - add ignoreNewVisitor flag while TagR call

                            TagCall.ignoreNewVisitor = true;
                            CONTAINR_LOGS.push({
                                msg: '(' + randomStr + ') DEBUG | ignoreNewVisitor = ' + TagCall.ignoreNewVisitor
                            });
                            TagCall.c(params[1], params[0]);
                        }

                        if (params[1].tagType == "learn") {
                            isAllowedCallTagR = false;
                            CONTAINR_LOGS.push({
                                msg: '(' + randomStr + ') [CONTAINER] Negative consent and learn tag'
                            });
                        }
                    } else {
                        CONTAINR_LOGS.push({
                            msg: '(' + randomStr + ') [CONTAINER] TagCall with params: ' + params[1] + ',' + params[0]
                        });

                        TagCall.c(params[1], params[0]);
                    }
                } else {
                    CONTAINR_LOGS.push({
                        msg: '(' + randomStr + ') Missing required parameters ' + hostProp + ' and/or ' + tagTypeProp + '',
                        type: "error"
                    });
                }
            }
        }
    };

    var IN_IFRAME = inIframe(); //flag to decide if we are inside Iframe or not

    if (IN_IFRAME) {
        window.addEventListener("message", insideIframeCommunicator.handleResponse, false);
    }


    // Were we called via script URL (e.g. trafficked via a 3rd-party ad-server where we can only use the script url)
    // Grab our queue (for processing below).
    var mpfContainr = window.mpfContainr;
    // Were we called via URl only? (e.g. trafficked via a 3rd-party ad-server)
    // Grab the script tag we were loaded via (should be the last one).  Changed: grab all and filter
    var scriptTags = document.getElementsByTagName("script");

    for (var t in scriptTags) {
        var scriptSrc = scriptTags[t].src;
        if (scriptSrc && (scriptSrc.indexOf("containr.js") > -1 || scriptSrc.indexOf("containr_eu.js") > -1) && scriptSrc.indexOf("?") > -1 && scriptSrc.indexOf("tagType=imp")) {
            var params = getParamsFromElementSrc(scriptSrc);
            // Get the tagId
            var tagId = params[tagIdProp];
            if (tagId) {
                // Delete it from the map and push the whole thing into the queue.
                delete params[tagIdProp];
                // Make sure the queue is defined.
                if (!mpfContainr || typeof mpfContainr.q === 'undefined') {
                    var queue = [];
                    window.mpfContainr = function () {
                        queue.push(arguments);
                    };
                    mpfContainr = window.mpfContainr;
                    mpfContainr.q = queue;
                }
                mpfContainr(tagId, params);
            }
            pCache.push(scriptSrc);
        }
    }

    // Process all the calls in the queue.
    if (mpfContainr != undefined) {
        for (var i in mpfContainr.q || []) {
            processQueue(mpfContainr.q[i]);
        }
    }

    // swap original function with just loaded one and process anything new added to the queue.
    window.mpfContainr = function () {
        processQueue(arguments);
    };


    //try to get info if CMP present, by CORS catch error and notify servlet, call the fallbackTagR()
    try {
        if (top.__cmp && typeof top.__cmp === "function") {
            window.isCMPPresent = true;
        }
    } catch (e) {
        //Add new TagR metric to report on deployment errors &err.code=xx&err.desc=xx
        CONTAINR_LOGS.push({
            msg: '(' + randomStr + ') [CONTAINR] Permission denied top.__cmp'
        });

        TagCall.errorLog = true;
        TagCall.errorCode = e.name;
        TagCall.errorDesc = e.message;
        var defaultConsentServletResponse = getDefaultConsentServletResponseAsList;
        TagR.process(defaultConsentServletResponse);

    }


    inSameFrameCommunicator.addObserver(consentServletCommunicator);
    insideIframeCommunicator.addObserver(consentServletCommunicator);


    function processQueue(args) {
        TagR.tagrCache(args);
    }

    function hasRequiredProps(p) {
        var hasRequiredProp;
        if (typeof p !== 'undefined') {
            if (p[hostProp] && p[tagTypeProp]) {
                hasRequiredProp = true;
            } else {
                hasRequiredProp = false;
            }
        } else {
            hasRequiredProp = false;
        }
        return hasRequiredProp;
    }

    function isValid(propName) {
        return propName !== hostProp &&
            propName !== tagTypeProp &&
            (impProps.indexOf(propName) >= 0 || validMatch.test(propName));
    }

    function encodeIfNeeded(value) {
        try {
            return value !== decodeURIComponent(value) ? value : encodeURIComponent(value);
        } catch (e) {
            console.warn("Value: %s is not a valid URI component! %o", value, e);
        }
        return null;
    }

    function getParamsFromElementSrc(elementSrc) {
        elementSrc = void 0 !== elementSrc ? elementSrc : window.location.href;
        for (var r, n = /\+/g, o = /[&\?]([^&=]+)=?([^&]*)/g, a = function (t) {
                return decodeURIComponent(t.replace(n, " "))
            }, s = {}; r = o.exec(elementSrc);) s[a(r[1])] = a(r[2]);
        return s;
    }

    function httpRequest(methodName, hostName, requestData, callback) {
        var url = '';
        // var protocol = window.location.protocol;  // FIX FOR MTRTF-3716
        var protocol = "https:";

        /* if (!protocol.includes("http") && !protocol.includes("https")) {
            protocol = "http:"; //set default protocol if not detected
        } */

        var cmp;
        if (methodName === "GET") {
            cmp = (window.isCMPPresent === true) ? '1' : '0';
            url = protocol + "//" + hostName + "/t/consent?cmp=" + cmp;
        } else {
            url = protocol + "//" + hostName + "/t/consent/";
        }
        var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        CONTAINR_LOGS.push({
            msg: '(' + randomStr + ') Method : ' + methodName + ', url : ' + url
        });
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200 && callback != "") {
                callbackFunction(hostName, xhttp, callback);
            }
        };

        xhttp.ontimeout = function () {
            // XMLHttpRequest timed out
            CONTAINR_LOGS.push({
                msg: '(' + randomStr + ') [xhttp.ontimeout] method: ' + methodName + ', url: ' + url
            });

            //By Timeout default (0,0,-1)
            TagR.process(getDefaultConsentServletResponseAsList);
        };

        xhttp.open(methodName, url, true);
        xhttp.timeout = 2000; // time in milliseconds
        xhttp.withCredentials = true;
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(requestData);
    }

    function callbackFunction(hostName, xhttp, callback) {
        CONTAINR_LOGS.push({
            msg: '(' + randomStr + ') [CONTAINR:callbackFunction] xhttp.responseText: ' + xhttp.responseText
        });

        if (xhttp.responseText != undefined && xhttp.responseText != "") {
            var response = xhttp.responseText;
            callback(response);
        } else {
            console.warn("[CONTAINR] Missing responseText from servlet, response from servlet is: '" + xhttp.responseText + "', *called fallbackTagR*");
            fallbackTagR(); //if response from servlet undefined or empty
        }
    }


    function getDefaultConsentServletResponse() {
        var defaultConsentServletResponse = "0,0,-1"; //Default response by timeout
        return defaultConsentServletResponse;
    }

    function getDefaultConsentServletResponseAsList() {
        var defaultConsentServletResponse = getDefaultConsentServletResponse;
        var responseArray = defaultConsentServletResponse.split(",");
        return responseArray;
    }

    function decimal2Binary(num, binaryLenght) {
        var binaryVal = parseInt(98, 10).toString(2);
        var binaryValLenght = binaryVal.length;

        var loopCount = binaryLenght - binaryValLenght;
        var result = addCharToString(binaryVal, "0", loopCount);

        return result;
    }

    function addCharToString(str, char, loop) {
        while (loop > 0) {
            str = char + str;
            loop--;
        }
        return str;
    }

    function string2Binary(str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
            result += strlpad(str.charCodeAt(i).toString(2), "0", 8);
        }
        return result;
    }

    function binary2Decimal(str) {

        var result = parseInt(str, 2);

        return result;
    }

    function strlpad(str, pad, len) {
        while (str.length < len) {
            str = pad + str;
        }
        return str;
    }

    /**
     * Checks if it is run from within an iframe
     * @function inIframe
     * @returns {Boolean} - true if in iframe, otherwise false
     */
    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function fallbackTagR() {
        setTimeout(function () {

            if (isAllowedCallTagR) {
                var requestData = "sourceUrl=" + SOURCE_URL +
                    "&consent=-1";

                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [ConsentServlet call] call httpRequest from fallbackTagR | requestData: ' + requestData + '' +
                        ' | consentServletCommunicator.hostName: ' + consentServletCommunicator.hostName
                });

                httpRequest("POST", consentServletCommunicator.hostName, requestData, "");

                var defaultConsentServletResponse = getDefaultConsentServletResponseAsList;
                TagR.process(defaultConsentServletResponse);

            } else {

                CONTAINR_LOGS.push({
                    msg: '(' + randomStr + ') [CONTAINR] TagR before fired!'
                });
            }

        }, timeoutFallbackTagR);
    }


    CONTAINR_LOGS.push({
        msg: '(' + randomStr + ') *** [CONTAINR] consentServletCommunicator.getCheckConsent ***'
    });
    consentServletCommunicator.getCheckConsent();


}(window, document));