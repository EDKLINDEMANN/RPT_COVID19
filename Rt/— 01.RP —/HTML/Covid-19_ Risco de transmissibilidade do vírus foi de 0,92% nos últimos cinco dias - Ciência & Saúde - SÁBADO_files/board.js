var Wvar = {};
var wamid = null;
var typ = "1";

(function (window) {
  var attrsElement = document.querySelector("script[weborama_board]");
  function parseProfile(p) {
    console.log(p);
  }
  if (attrsElement.getAttribute("events")) {
    if (attrsElement.getAttribute("events").length > 0) {
      var eventsArray = attrsElement.getAttribute("events").split(":");
      for (var i = 0; i < eventsArray.length; i++) {
        window.addEventListener(eventsArray[i], function (e) {
          console.log(e);
        });
      }
    }
  }

  if (attrsElement.getAttribute("wam_api")) {
    if (attrsElement.getAttribute("wam_api") === "true" && attrsElement.getAttribute("wam_token")) {
      if (attrsElement.getAttribute("wam_token").length > 0) {
        var wsc = document.createElement("script");
        wsc.type = "text/javascript";
        wsc.src =
          "https://bsd.frontend.weborama.fr/bsd?format=jsonp&token=" + attrsElement.getAttribute("wam_token") + "&callback=parseProfile&strict=1";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(wsc, s);
      }
    }
  }

  if (attrsElement.getAttribute("wam_id")) {
    if (attrsElement.getAttribute("wam_id").length > 0) {
      wamid = attrsElement.getAttribute("wam_id");
      typ = "1";
      var last_words = [];
      var words = location.pathname.split(/[/,-]/);
      words.forEach(function (value, index) {
        if (value.length > 0) {
          last_words.push(value);
        }
      });
      var host = location.host.replace("www.", "");
      host = host.replace(".com", "");
      host = host.replace(".pt", "");
      host = host.replace(".com.pt", "");
      Wvar = {
        group: attrsElement.getAttribute("wam_label"),
        path: location.href,
        url: location.href,
        ref: document.referrer,
        site: host.toUpperCase(),
      };
      if (window.$_fields) {
        if (window.$_fields.AreaName) {
          Wvar["areaname"] = window.$_fields.AreaName;
        }
        if (window.$_fields.ContentTypeName) {
          Wvar["content"] = window.$_fields.ContentTypeName;
        }
      } else {
        console.warn("No fields available!");
      }
      Wvar["'words'"] = last_words;
      if (attrsElement.getAttribute("crm_id")) {
        if (attrsElement.getAttribute("crm_id").length > 0) {
          Wvar["crm_id"] = attrsElement.getAttribute("crm_id");
        }
      }
      console.log(Wvar);
      var w = document.createElement("script");
      w.type = "text/javascript";
      w.src = document.location.protocol + "//cstatic.weborama.fr/js/wam/customers/wamfactory_dpm.wildcard.min.js?rnd=" + new Date().getTime();
      w.async = true;
      var body = document.getElementsByTagName("script")[0];
      body.parentNode.insertBefore(w, body);
    }
  }
})(window);
