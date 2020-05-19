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


// render script tmpl_cof_2017
control.on("preRender", function (self) {
  control.on("changeRecommendationUrl", function (url) {
    var curl = location.href;
	var id = "";
    switch(self.getOptions().siteid)
	{
		case "FLA":
			id = curl.replace(/^http[s]?:\/\/www.flash.*.pt\/.*\/(.+)\?.*/i, "Flash#$1");
			console.log(id);
			id = id.replace(/^http[s]?:\/\/www.flash.*.pt\/.*\/([\w-]+)$/i, "Flash#$1");
			console.log(id);
			break;
		case "MAX":
			id = curl.replace(/^http[s]?:\/\/www.maxima.*.pt\/.*\/(.+)\?.*/i, "Maxima#$1");
			id = id.replace(/^http[s]?:\/\/www.maxima.*.pt\/.*\/([\w-]+)$/i, "Maxima#$1");
			break;
		case "AMAQ":
			id = curl.replace(/^http[s]?:\/\/www.aquelamaquina.*.pt\/.*\/(.+)\.html\?.*/i, "AquelaMaquina#$1");
			id = id.replace(/^http[s]?:\/\/www.aquelamaquina.*.pt\/.*\/([\w-]+)\.html$/i, "AquelaMaquina#$1");
			break;
		case "SAB":
			id = curl.replace(/^http[s]?:\/\/www.sabado.*.pt\/.*\/(.+)\?.*/i, "Sabado#$1");
			id = id.replace(/^http[s]?:\/\/www.sabado.*.pt\/.*\/([\w-]+)$/i, "Sabado#$1");
			break;
	}

    var opts = {
      from_id: encodeURIComponent(id.replace(".html","")),
      cid: "COF",
      siteid: (control.getOptions().siteid || ""),
      suid: (control.getOptions().suid || ""),
      abtest: (control.getOptions().abtest || ""),
      rec_pos: (control.getOptions().rec_pos || ""),
      cat: (control.getOptions().cat || "")
    };

    return url + control._helper_fn.optToStr(opts);
  });


  /* Maxima */

  control.transformMaximaHref = function (href) {
    if (href) {
      return "https://www.maxima.pt" + href.substring(href.indexOf("/site") + 5).replace("//", "/") +"?ref=DET_Recomendadas_pb";
    }
  };

  control.transformImagesMaxima = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.maxima.pt/images/" + u;
    }
  };

  control.transformMaximaAreaName = function (area) {
    if (Array.isArray(area)) {
      return area.length ? area[area.length - 1] : "";
    }
    else
      return area;
  }

  /* Maxima End*/

  /* Flash */

  control.transformFlashHref = function (href) {
    if (href) {
      return "https://www.flash.pt" + href.substring(href.indexOf("/site") + 5).replace("//", "/") + "?ref=DET_Recomendadas_pb";
    }
  };

  control.transformImagesFlash = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.flash.pt/images/" + u;
    }
  };

  /* Flash End*/

  /* Aquela Máquina */

  control.transformMaquinaHref = function (href) {
    if (href) {
      return "https://www.aquelamaquina.pt" + href.substring(href.indexOf("/site") + 5).replace("//", "/") + ".html?ref=DET_Recomendadas_pb";
    }
  };

  control.transformImagesMaquina = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.aquelamaquina.pt/images/" + u;
    }
  };

  /* Aquela Máquina End*/

  /* Sábado */

  control.transformSabadoHref = function (href) {
    if (href) {
      return "https://www.sabado.pt" + href.substring(href.indexOf("/site") + 5).replace("//", "/") + "?ref=DET_Recomendadas_pb";
    }
  };

  control.transformImagesSabado = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.sabado.pt/images/" + u;
    }
  };

  function pad(n) {
    if (n < 10)
      return "0" + n;
    else
      return n;
  }

  control.transformSabadoHour = function (d, t, r, i, el) {
    var rec_date = "";
    try {
      var datetime = d.split("@");
      var date = datetime[0].split("/");
      var hour = datetime[1].split(":");

      var dt = new Date(date[2], (parseInt(date[1]) - 1), date[0], hour[0], hour[1]);
      var now = new Date();

      var str = "";
      if (dt.getFullYear() != now.getFullYear() || dt.getMonth() != now.getMonth() || dt.getDate() != now.getDate())
        str = pad(dt.getDate()) + "." + pad((dt.getMonth() + 1)) + "." + dt.getFullYear() + " ";
      str += pad(dt.getHours()) + ":" + pad(dt.getMinutes());

      rec_date = str;

    }
    catch (e) {
      rec_date = "";
    }

    var node = document.createTextNode(rec_date);
    console.log(el, node, el.firstChild);
    el.insertBefore(node, el.firstChild);
  };

  control.transformSabadoAreaName = function (area) {
    if (Array.isArray(area)) {
      return area.length ? area[area.length - 1] : "";
    }
    else
      return area;
  };

  control.transformSabadoAreaUrl = function (url) {
    var area = "";
    if (Array.isArray(url)) {
      area = url.length ? url[url.length - 1] : "";
    }
    else
      area = url;

    return "https://www.sabado.pt" + (area && area.substring(19));
  }

  control.transformSabadoAutor = function (a) {
    if (Array.isArray(a)) {
      return a.reduce(function (p, c, i) {

        return p + (i != a.length - 1 ? ", " : " e ") + c;
      })
    }
    else
      return a;
  }

  /* Sabado End*/

  control.transformimages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.cmjornal.pt/images/" + u;
    }
  };

  control.transformimagesSquare = function (url) {
    return url + "/160";
  };

  control.transformHref = function (href) {
    if (href) {
      var idx = href.indexOf("correio-da-manha");
      return "https://www.cmjornal.pt" + href.substring(idx + 16) + "?ref=DET_Recomendadas_pb";
    }
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
        value: "art",
        name: "rec_pos"
      }];

      window.PbaSiteTracker && window.PbaSiteTracker.trackRecommendation(event, extra);
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
    if (el) {
      var rect = el.getBoundingClientRect(),
        midH = rect.height / 2,
        midW = rect.width / 2;


      return (
        rect.bottom >= midH &&
        rect.right >= midW &&
        rect.top <= ((window.innerHeight || document.documentElement.clientHeight) - midH) &&
        rect.left <= ((window.innerWidth || document.documentElement.clientWidth) - midW)
      );
    }
    else
      return false;
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
      window.PbaSiteTracker && window.PbaSiteTracker.trackRecommendationViewed(event, extra);

    }
  }

  checkElementViewed();

  /* Events*/
  var _viewedReported = false;
  addEvent(window, "scroll", checkElementViewed);
});

control.on("postRender", function (self) {
  /* Flash */
  if (self.getOptions().siteid == "FLA") {
    var articles = self.getWidget().getElementsByTagName("article");
    if (articles && articles.length > 3) {
      var clearfix = document.createElement("div");
      clearfix.setAttribute("class", "clearfix");
      articles[3].parentNode.insertBefore(clearfix, articles[3]);
    }
  }
  /* Aquela Máquina */
  if (self.getOptions().siteid == "AMAQ") {
    var rows = self.getWidget().getElementsByClassName("recomendadosRow");
    Array.prototype.concat.apply([], self.getWidget().getElementsByClassName("bloco_recomendado")).forEach(function (f, i) {
      var container = i < 3 ? rows[0] : rows[1];
      container.insertBefore(f, container.getElementsByClassName("clearfix")[0]);
    });
  }
  /* Sabado */
  if (self.getOptions().siteid == "SAB") {
    var rows = self.getWidget().getElementsByClassName("row");
    Array.prototype.concat.apply([], self.getWidget().getElementsByClassName("recommendation-item")).forEach(function (f, i) {

      var container = rows[Math.floor(i / 2)];
      container.append(f);
    });
  }
})
};
__pbarecommendation._pbarec_0.scriptReady(script); })();
