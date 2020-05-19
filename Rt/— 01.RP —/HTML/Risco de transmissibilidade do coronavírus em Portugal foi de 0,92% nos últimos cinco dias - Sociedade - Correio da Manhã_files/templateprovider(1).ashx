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


// render script cofina_multi_201807
control.on("preRender", function (self) {
  function getFromPub() {
    return location.search !== "" ?
      location.search.substr(1).split("&").filter(function (f) {
        var split = f.split("=");
        return split.length === 2 && split[0] === "from_pub";
      }).reduce(function (p, c) {
        return c.substr(c.indexOf("=") + 1);
      }, "") :
      "";
  }

  function createRestrictions(siteid) {
    var href = "";
    switch (siteid) {
      case "CMTV": //Negócios - CM - Record - Correio da Manhã
        href = `(NOT CMTV $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break
      case "CM": //Negócios - CM - Record - Correio da Manhã
        href = `(NOT CM $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break;
      case "REC":
        href = `(NOT REC $siteID) AND (NOT MAX $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break;
      case "NEG":
        href = `(NOT NEG $siteID) AND (NOT CM $siteID) AND (NOT CMTV $siteID) AND (NOT FLA $siteID) AND (NOT CMVIDAS $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break;
      case "FLA":
      case "Fla":
        href = `(NOT FLA $siteID) AND (NOT AMAQ $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break;
      case "MAX":
      case "Max":
        href = `(NOT MAX $siteID) AND (NOT CM $siteID) AND (NOT CMTV $siteID) AND (NOT REC $siteID) AND (NOT AMAQ $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break;
      case "SAB":
        href = `(NOT SAB $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break;
      case "AMAQ":
        href = `(NOT AMAQ $siteID) AND (NOT FLA $siteID) AND (NOT CMVIDAS $siteID) AND (NOT MAX $siteID) AND (NOT Record $Autor) AND (NOT CM $Autor) AND (NOT Negócios $Autor) AND (NOT Correio da Manhã $Autor)`;
        break;
	  case "CMVIDAS":
		href = `(NOT CMVIDAS $siteID) AND (NOT REC $siteID) AND (NOT NEG $siteID) AND (NOT Must $siteID) AND (NOT AMAQ $siteID)`;
		break;
      default:
        return "";
    }

    var frompub = getFromPub();
    if (frompub)
      href += `AND (NOT ${frompub} $siteID)`;

    return href;
  }

  function getFromId() {
    var curl = location.href;
    var idx = curl.lastIndexOf('/') + 1;
    let rx = /([^\?\#\.]*)/.exec(curl.substring(idx));
    return rx.length ? rx[1] : '';
  }

  control.on("changeRecommendationUrl", function (url) {
    var id = getFromId();

    var urlsplt = url.split("?");
    var opts = urlsplt[1].split("&").reduce(function (p, c) {
      var pair = c.split("=");
      p[pair[0]] = pair[1];
      return p;
    }, {});

    opts.count = 100;
    opts.from_id = id;
    opts.cid = "COF";
    opts.suid = (control.getOptions().suid || "");
    opts.abtest = (control.getOptions().abtest || "");
    opts.rec_pos = (control.getOptions().rec_pos || "");
    opts.config = (control.getOptions().config || "Outras");
    opts.cat = createRestrictions(control.getOptions().site_id || control.getOptions().siteid || "");
    opts.siteid = (control.getOptions().site_id || control.getOptions().siteid);

    return `${urlsplt[0]}?${control._helper_fn.optToStr(opts)}`;
  });

  control.on("recommendationData", function (data) {
    var newdata = [];
    var siteids = [];
    var backup = [
      []
    ];

    // remove da lista todas as recomendações do site origem
    if (location.search !== "") {
      let from_pub = location.search.substr(1).split("&").filter(function (f) {
        var split = f.split("=");
        return split.length === 2 && split[0] === "from_pub";
      }).reduce(function (p, c) {
        return c.substr(c.indexOf("=") + 1);
      }, "");

      if (from_pub)
        data = data.filter(function (f) {
          let sid = f.xml_data && f.xml_data.xml_data && f.xml_data.xml_data.siteID || "";
          return from_pub !== sid;
        });
    }

    while (newdata.length < control.getOptions().number_items && data.length) {
      var el = data.shift();
      var siteid = el.xml_data && el.xml_data.xml_data && el.xml_data.xml_data.siteID || "";
      if (siteid && siteids.indexOf(siteid) < 0) {
        siteids.push(siteid);
		switch(control.getOptions().siteid)
		{
			case "CM":
				if (siteid === "NEG")
					siteids.push("REC");
				if (siteid === "REC")
					siteids.push("NEG");
				break;
			case "CMTV":
				if (siteid === "CM")
				{
					siteids.push("REC");
					siteids.push("NEG");
				}
				if (siteid === "REC")
				{
					siteids.push("CM");
					siteids.push("NEG");
				}
				if (siteid === "NEG")
				{
					siteids.push("REC");
					siteids.push("CM");
				}
				break;
			case "REC":
				if (siteid === "CM")
					siteids.push("NEG");
				if (siteid === "NEG")
					siteids.push("CM");
				break;
			case "SAB":
				if (siteid === "CM")
				{
					siteids.push("REC");
					siteids.push("NEG");
				}
				if (siteid === "REC")
				{
					siteids.push("CM");
					siteids.push("NEG");
				}
				if (siteid === "NEG")
				{
					siteids.push("CM");
					siteids.push("REC");
				}
				break;
			case "FLA":
				if(siteid === "CMTV")
				{
					siteids.push("SAB");
					siteids.push("CMVIDAS");
					siteids.push("MAX");
				}
				if(siteid === "SAB")
				{
					siteids.push("CMTV");
					siteids.push("CMVIDAS");
					siteids.push("MAX");
				}
				if(siteid === "CMVIDAS")
				{
					siteids.push("CMTV");
					siteids.push("SAB");
					siteids.push("MAX");
				}
				if(siteid === "MAX")
				{
					siteids.push("CMTV");
					siteids.push("SAB");
					siteids.push("CMVIDAS");
				}
				break;
			case "CMVIDAS":
				if(siteid === "CM")
				{
					siteids.push("CMTV");
				}
				if(siteid === "CMTV")
				{
					siteids.push("CM");
				}
				break;
			case "MAX":
				if (siteid === "FLA")
					siteids.push("CMVIDAS");
				if (siteid === "CMVIDAS")
					siteids.push("FLA");
			case "AMAQ":
				if(siteid === "CM")
				{
					siteids.push("REC");
					siteids.push("NEG");
				}
				if(siteid === "REC")
				{
					siteids.push("CM");
					siteids.push("NEG");
				}
				if(siteid === "NEG")
				{
					siteids.push("CM");
					siteids.push("REC");
				}
				break;
		}
		
        //if (control.getOptions().siteid !== "AMAQ" && control.getOptions().siteid !== "CMTV") {
        //  if (siteid === "REC")
        //    siteids.push("CM");
        //  else if (siteid === "CM")
        //    siteids.push("REC");
        //}
        newdata.push(el);
      } else {
        var added = false;
        for (var i = 0; i < backup.length && !added; i++) {
          var exists = backup[i].filter(function (f) {
            var bksid = f.xml_data && f.xml_data.xml_data && f.xml_data.xml_data.siteID || "";
            return siteid === bksid;
          }).length > 0;

          if (!exists) {
            added = true;
            backup[i].push(el);
          }
        }
        if (!added) {
          backup.push([el]);
        }
      }
    }



    while (newdata.length < control.getOptions().number_items && backup.length) {
      var bk = backup[0].shift();
      if (backup[0].length === 0) backup.shift();
      newdata.push(bk);
    }

    // Adicionar recomendação CMTV a todas as publicações
    if (siteids.indexOf("CMTV") < 0) {
      let cmtvnews = data.filter(el => {
        var siteid = el.xml_data && el.xml_data.xml_data && el.xml_data.xml_data.siteID || "";
        return siteid === "CMTV";
      });
      if (cmtvnews.length) {
        newdata[newdata.length - 1] = cmtvnews[0];
      }

    }

    // Adicionar uma recomendação da CM à CMTV
    if (control.getOptions().siteid === "CMTV") {
      if (siteids.indexOf("CM") < 0) {
        let cmnews = data.filter(el => {
          var siteid = el.xml_data && el.xml_data.xml_data && el.xml_data.xml_data.siteID || "";
          return siteid === "CM";
        });
        if (cmnews.length) {
          newdata[newdata.length - 1] = cmnews[0];
        }

      }
    }

    return newdata;
  });

  control.transformHref = function (xmldata, obj) {
    var href;
    switch (xmldata && xmldata.siteID) {
      case "CM":
        href = control.transformCMHref(xmldata.FriendlyUrl);
        break;
      case "REC":
        href = control.transformRecordHref(xmldata.FriendlyUrl);
        break;
      case "NEG":
        href = control.transformNegociosHref(xmldata.FriendlyUrl);
        break;
      case "FLA":
      case "Fla":
        href = control.transformFlashHref(xmldata.FriendlyUrl);
        break;
      case "MAX":
      case "Max":
        href = control.transformMaximaHref(xmldata.FriendlyUrl);
        break;
      case "SAB":
        href = control.transformSabadoHref(xmldata.FriendlyUrl);
        break;
      case "AMAQ":
        href = control.transformMaquinaHref(xmldata.FriendlyUrl);
        break;
      case "CMTV":
        href = control.transformCMTVHref(xmldata.FriendlyUrl);
        break;
      case "CMVIDAS":
        href = control.transformCMVIDASHref(xmldata.FriendlyUrl);
        break;
      case "Must":
        href = control.transformMUSTHref(xmldata.FriendlyUrl);
        break;
      default:
        href = "";
        break;
    }

    if (href !== "" && (control.getOptions().site_id || control.getOptions().siteid))
      href += "&from_pub=" + (control.getOptions().site_id || control.getOptions().siteid);

    return href;
  };

  control.transformImages = function (xmldata, obj) {
    switch (xmldata && xmldata.siteID) {
      case "CM":
        return control.transformCMImages(xmldata.img_374x246);
      case "CMTV":
        return control.transformCMTVImages(xmldata.img_374x246);
      case "REC":
        return control.transformRecordImages(xmldata.img_374x246);
      case "NEG":
        return control.transformNegociosImages(xmldata.img_374x246);
      case "FLA":
      case "Fla":
        return control.transformFlashImages(xmldata.img_374x246);
      case "MAX":
      case "Max":
        return control.transformMaximaImages(xmldata.img_374x246);
      case "SAB":
        return control.transformSabadoImages(xmldata.img_374x246);
      case "AMAQ":
        return control.transformMaquinaImages(xmldata.img_374x246);
      case "CMVIDAS":
        return control.transformCMVIDASImages(xmldata.img_374x246);
      case "Must":
        return control.transformMUSTImages(xmldata.img_374x246);
      default:
        return "";
    }
  }

  control.showImage = function (xmldata, obj) {
    switch (xmldata && xmldata.siteID) {
      case "CM":
      case "CMTV":
      case "REC":
      case "NEG":
      case "FLA":
      case "Fla":
      case "MAX":
      case "Max":
      case "SAB":
      case "AMAQ":
      case "CMVIDAS":
      case "Must":
        return !!xmldata.img_374x246;
      default:
        return false;
    }
  }

  control.transformLogoPublicacao = function (xmldata, obj) {
    switch (xmldata && xmldata.siteID) {
      case "CM":
        return "https://barra.xl.pt/responsive/Assets/i/cm.png";
      case "CMTV":
        return "https://barra.xl.pt/responsive/Assets/i/cmtv.png";
      case "REC":
        return "https://barra.xl.pt/responsive/Assets/i/record.png";
      case "NEG":
        return "https://barra.xl.pt/responsive/Assets/i/1/negocios_02.png";
      case "FLA":
      case "Fla":
        return "https://barra.xl.pt/responsive/Assets/i/flash.jpg";
      case "MAX":
      case "Max":
        return "https://barra.xl.pt/responsive/Assets/i/4/maxima2.png";
      case "SAB":
        return "https://barra.xl.pt/responsive/Assets/i/2/sabado.png";
      case "AMAQ":
        return "https://barra.xl.pt/responsive/Assets/i/maquina.jpg";
      case "CMVIDAS":
        return "https://barra.xl.pt/responsive/Assets/i/2/vidas_bcofina.png";
      case "Must":
        return "https://barra.xl.pt/responsive/Assets/i/2/must_BarraCofina.png";
      default:
        return "";
    }
  }
  control.transformLogoName = function (xmldata, obj) {
    switch (xmldata && xmldata.siteID) {
      case "CM":
        return "Correio da Manhã";
      case "CMTV":
        return "CMTV";
      case "REC":
        return "Record";
      case "NEG":
        return "Jprnal de Negócios";
      case "FLA":
        return "Flash!";
      case "MAX":
        return "Máxima";
      case "SAB":
        return "Sábado";
      case "AMAQ":
        return "Aquela Máquina";
      case "CMVIDAS":
        return "Vidas";
      default:
        return "";
    }
  }


  control.transformClick = function (value) {
    return function () {
      var extra = [{
        value: value,
        name: "id"
      }, {
        value: control.getResponse().recommendation.method,
        name: "method"
      }, {
        value: "multi",
        name: "rec_pos"
      }];

      window.PbaSiteTracker && window.PbaSiteTracker.trackRecommendation(event, extra);
    };
  };

  function refsiteid(siteid) {
    switch (siteid) {
      case "CM":
        return "cm";
      case "CMTV":
        return "cmtv";
      case "REC":
        return "record";
      case "NEG":
        return "negocios";
      case "FLA":
      case "Fla":
        return "flash";
      case "MAX":
      case "Max":
        return "maxima";
      case "SAB":
        return "sabado";
      case "AMAQ":
        return "aquelamaquina";
      case "CMVIDAS":
        return "vidas";
      default:
        return "";
    }
  };

  /* Record */

  control.transformRecordHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.record.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.record.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformRecordImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.record.pt/images/" + u;
    }
  };

  control.transformRecordAreaName = function (area) {
    if (Array.isArray(area)) {
      return area.length ? area[area.length - 1] : "";
    } else
      return area;
  }

  /* Record End*/

  /* Maxima */

  control.transformMaximaHref = function (href) {
    if (href) {
      var utm_content = refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      if (getFromId() != "") {
        //detalhe da noticia
        return "https://www.maxima.pt" + href.substring(5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      } else {
        //HomePage
        return "https://www.maxima.pt" + href.substring(5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      }
    }
  };

  control.transformMaximaImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.maxima.pt/images/" + u;
    }
  };

  control.transformMaximaAreaName = function (area) {
    if (Array.isArray(area)) {
      return area.length ? area[area.length - 1] : "";
    } else
      return area;
  }

  /* Maxima End*/

  /* Flash */

  control.transformFlashHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.flash.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.flash.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformFlashImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.flash.pt/images/" + u;
    }
  };

  /* Flash End*/

  /* Aquela Máquina */

  control.transformMaquinaHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.aquelamaquina.pt" + href.substring(href.indexOf("/", 1)).replace("//", "/") + ".html?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.aquelamaquina.pt" + href.substring(href.indexOf("/", 1)).replace("//", "/") + ".html?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformMaquinaImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.aquelamaquina.pt/images/" + u;
    }
  };

  /* Aquela Máquina End*/

  /* CM */

  control.transformCMHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.cmjornal.pt" + href.substring(href.indexOf("/", 1)).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.cmjornal.pt" + href.substring(href.indexOf("/", 1)).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformCMImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.cmjornal.pt/images/" + u;
    }
  };

  /* CM End*/

  /* CMTV */
  control.transformCMTVHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.cm-tv.pt" + href.substring(href.indexOf("/", 1)).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.cm-tv.pt" + href.substring(href.indexOf("/", 1)).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformCMTVImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.cmjornal.pt/images/" + u;
    }
  };

  /* CMTV END */

  /* Negocios */

  control.transformNegociosHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.jornaldenegocios.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.jornaldenegocios.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformNegociosImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.jornaldenegocios.pt/images/" + u;
    }
  };

  /* CM End*/

  /* Sábado */

  control.transformSabadoHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.sabado.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.sabado.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformSabadoImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.sabado.pt/images/" + u;
    }
  };

  /* Sabado End*/

  /* CMVIDAS */

  control.transformCMVIDASHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.vidas.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.vidas.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformCMVIDASImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.vidas.pt/images/" + u;
    }
  };

  control.transformCMVIDASAreaName = function (area) {
    if (Array.isArray(area)) {
      return area.length ? area[area.length - 1] : "";
    } else
      return area;
  }

  /* CMVIDAS End*/

  /* MUST */

  control.transformMUSTHref = function (href) {
    if (href) {
      if (getFromId() != "")
        return "https://www.must.jornaldenegocios.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=det_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
      else
        return "https://www.must.jornaldenegocios.pt/" + href.substring(href.indexOf("site") + 5).replace("//", "/") + "?utm_source=priberam&utm_medium=referral&utm_campaign=cruzados&utm_term=hp_outras_noticias_cofina&utm_content=" + refsiteid(control.getOptions().site_id || control.getOptions().siteid);
    }
  };

  control.transformMUSTImages = function (url) {
    if (url) {
      var u = Array.isArray(url) ? url[0] : url;
      return "https://cdn.must.jornaldenegocios.pt/images/" + u;
    }
  };

  control.transformMUSTAreaName = function (area) {
    if (Array.isArray(area)) {
      return area.length ? area[0] : "";
    } else
      return area;
  };



  /* MUST End*/

  function addEvent(object, type, callback) {
    if (object == null || typeof (object) == 'undefined')
      return;
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
        rect.left <= ((window.innerWidth || document.documentElement.clientWidth) - midW));
    } else
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
      }, {
        value: self.getResponse().recommendation.method,
        name: "method"
      }, {
        value: control.getOptions().rec_pos || "",
        name: "rec_pos"
      }];
      window.PbaSiteTracker && window.PbaSiteTracker.trackRecommendationViewed(event, extra);

    }
  }

  checkElementViewed();

  /* Events*/
  var _viewedReported = false;
  addEvent(window, "scroll", checkElementViewed);
});

control.on("postRender", function (self) {});
};
__pbarecommendation._pbarec_0.scriptReady(script); })();
