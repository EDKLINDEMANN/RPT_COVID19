(function() { var script = function(control) {
// render script default
control.on("preRender", function () {
    if (control._helper_fn === undefined)
        control._helper_fn = {};

    control._helper_fn.optToStr = function (opts) {
        return "&" + Object.keys(opts).map(function (v) {
            return v + "=" + opts[v];
        }).join("&");
    }

    control._helper_fn.trackRecommendation = function (event, extra) {
        if (PbaSiteTracker && PbaSiteTracker.trackRecommendation && PbaSiteTracker.trackRecommendation.constructor === Function) {
            extra = extra ? (Array.isArray(extra) ? extra : [extra]) : [];

            control.getResponse() && control.getResponse().recommendation && extra.push({
                value: control.getResponse().recommendation.method || "",
                name: "method"
            });

            control.getOptions() && control.getOptions().rec_pos && extra.push({
                value: control.getOptions().rec_pos || "",
                name: "rec_pos"
            });

            control.getOptions() && control.getOptions().cat && extra.push({
                value: control.getOptions().cat || "",
                name: "cat"
            });

            PbaSiteTracker.trackRecommendation(event, extra)
        }
    };

    control._helper_fn.trackRecommendationViewed = function (event, extra) {
        if (PbaSiteTracker && PbaSiteTracker.trackRecommendationViewed && PbaSiteTracker.trackRecommendationViewed.constructor === Function) {
            extra = extra ? (Array.isArray(extra) ? extra : [extra]) : [];

            control.getResponse() && control.getResponse().recommendation && extra.push({
                value: control.getResponse().recommendation.method || "",
                name: "method"
            });

            control.getOptions() && control.getOptions().rec_pos && extra.push({
                value: control.getOptions().rec_pos || "",
                name: "rec_pos"
            });

            control.getOptions() && control.getOptions().cat && extra.push({
                value: control.getOptions().cat || "",
                name: "cat"
            });

            PbaSiteTracker.trackRecommendationViewed(event, extra)
        }
    };


    control._helper_fn.addEvent = function (object, type, callback) {
        if (object == null || typeof (object) == 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on" + type] = callback;
        }
    };

    control._helper_fn.isElementInViewport = function (el) {
        var rect = el.getBoundingClientRect(),
            midH = rect.height / 2,
            midW = rect.width / 2;


        return (
            rect.bottom >= midH &&
            rect.right >= midW &&
            rect.top <= ((window.innerHeight || document.documentElement.clientHeight) - midH) &&
            rect.left <= ((window.innerWidth || document.documentElement.clientWidth) - midW)
            );
    };

    control._helper_fn.checkElementViewed = function (event) {
        if (!control.__viewedReported && control._helper_fn.isElementInViewport(control.getWidget())) {
            control.__viewedReported = true;
            console.log("Recommendation Viewed")
            control._helper_fn.trackRecommendationViewed(event, control.__viewedReportExtra);
        }
    };

    control._helper_fn.reportRecommendationViewed = function (extra) {
        control.__viewedReported = false;
        control.__viewedReportExtra = extra;
        control._helper_fn.addEvent(window, "scroll", control._helper_fn.checkElementViewed);
        control._helper_fn.checkElementViewed();
    };

    control._helper_fn.optToRange = function (opt, min, max) {
        var range = {};
        if (opt && opt.toString && opt.toString.constructor == Function && !isNaN(+min) && !isNaN(+max) && +min <= +max) {
            var split = opt.toString().split(',');
            split.forEach(function (v) {
                var r = v.split('-');
                if (r.length > 2) return;
                var v1 = r[0] === '*' ? +min : Math.max(+min, +r[0]);
                var v2 = r[r.length - 1] === '*' ? +max : Math.min(+max, +r[r.length - 1]);
                if (!isNaN(v1) && !isNaN(v2) && v1 <= v2) {
                    for (var i = v1; i <= v2; i++) {
                        range[i] = null;
                    }
                }
            });
        }
        return Object.keys(range).map(function (v) { return +v });
    };
});


// render script tmpl_cm_2017
control.on("preRender", function (self) {
    control.on("changeRecommendationUrl", function (url) {
        var curl = location.href;
        var idx = curl.lastIndexOf('/') + 1;
		var id = curl.replace(/^http[s]?:\/\/www.cmjornal.*.pt\/.*\/(.+)\?.*/i,"CM#$1");
		id = id.replace(/^http[s]?:\/\/www.cmjornal.*.pt\/.*\/([\w-]+)$/i,"CM#$1");
		//var id = "CM#" + curl.substring(idx).replace(".html","");
		
        var opts = {
            from_id: encodeURIComponent(id.replace(".html","")),
            cid: "COF",
            suid: (control.getOptions().suid || ""),
            abtest: (control.getOptions().abtest || ""),
            rec_pos: (control.getOptions().rec_pos || ""),
            cat: "CM $siteID",
			siteid: "CM"
        };

        return url + control._helper_fn.optToStr(opts);
    });

    control.transformimages = function (url) {
        if (url) {
            var u = Array.isArray(url) ? url[0] : url;
            return "https://cdn.cmjornal.pt/images/" + u;
        }
    };

    control.transformimagesSquare = function (url) {
        return url + "/160";
    };

	control.checkIMG = function (img) {
		if(img){
			return "";
		}
		else{
			return "hidden;";
		}
	};
	
    control.transformHref = function (href) {
        if (href) {
            var idx = href.indexOf("correio-da-manha");
            return "https://www.cmjornal.pt" + href.substring(idx + 16).replace("//", "/") + "?Ref=DET_Recomendadas_pb";
        }
    };

    control.leituraRapidaOnClick = function (value) {
        return function () {
            var extra = [{
                value: value,
                name: "id"
            },
            {
                value: control.getResponse().recommendation.method,
                name: "method"
            },
            {
                value: "qck",
                name: "rec_pos"
            }];
            PbaSiteTracker.trackRecommendation(event, extra);

            GetQuickReadAjax('50', value);
        };
    };

    control.transformClick = function (value) {
        return function () {
            var extra = [{
                value: value,
                name: "id"
            },
            {
                value: control.getResponse().recommendation.method,
                name: "method"
            },
            {
                value: "COF",
                name: "cid"
            }];

            PbaSiteTracker.trackRecommendation(event, extra);
        };
    };

    control.mediaTypeClass = function (value, path, data, index, node) {
        var cclass = node && node.getAttribute && node.getAttribute.constructor === Function && node.getAttribute("class") || "";
        var type = "";
        if (value) {
            var split = value.split("/").splice(1, 2);
            type = split.join(" ");
        }

        return cclass + " " + type;
    }

    function addEvent(object, type, callback) {
        if (object == null || typeof (object) == 'undefined') return;
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
        } else if (object.attachEvent) {
            object.attachEvent("on" + type, callback);
        } else {
            object["on" + type] = callback;
        }
    };

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect(),
            midH = 5,
            midW = 5;


        return (
            rect.bottom >= midH &&
            rect.right >= midW &&
            rect.top <= ((window.innerHeight || document.documentElement.clientHeight) - midH) &&
            rect.left <= ((window.innerWidth || document.documentElement.clientWidth) - midW)
            );
    }

    function checkElementViewed() {
        if (!_viewedReported && isElementInViewport(self.getWidget()) && self.getResponse()) {
            _viewedReported = true;
            var curl = location.href;
            var idx = curl.lastIndexOf('/') + 1;
            var id = curl.substring(idx, curl.length - 5);

            var extra = [{
                value: id,
                name: "id"
            },
            {
                value: self.getResponse().recommendation.method,
                name: "method"
            }];
            PbaSiteTracker.trackRecommendationViewed(event, extra);

        }
    }

    checkElementViewed();

    /* Events*/
    var _viewedReported = false;
    addEvent(window, "scroll", checkElementViewed);
});

control.on("postRender", function () {
  if ((control.getResponse() && control.getResponse().recommendation && control.getResponse().recommendation.count || 0) == 0)
    control.getWidget().style.display = 'none';
});
};
__pbarecommendation._pbarec_1.scriptReady(script); })();
