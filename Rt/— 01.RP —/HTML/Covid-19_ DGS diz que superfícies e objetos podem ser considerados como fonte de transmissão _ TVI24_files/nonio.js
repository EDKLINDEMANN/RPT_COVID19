/* Collect Script - NONIO - Weborama Portugal @ v0.0.2 */
var wamid = null;
var Wvar = [];
var typ = null;

function getDomain() {
  let parts = document.location.hostname.split(".");
  return parts.length > 2 ? parts.slice(parts.length - 2).join(".") : document.location.host;
}
(function (window) {
  var attrsElement = document.querySelector("script[collect]");
  if (attrsElement.getAttribute("events")) {
    if (attrsElement.getAttribute("events").length > 0) {
      var eventsArray = attrsElement.getAttribute("events").split(":");
      for (var i = 0; i < eventsArray.length; i++) {
        document.addEventListener(eventsArray[i], function (e) {
          console.log(e);
        });
      }
    }
  }

  window.nonio = {
    profile: [],
    setStore: function (storageValue) {
      var expires = "";
      var days = 60;
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
      document.cookie = "wbn=" + storageValue + expires + "; path=/ ; domain=" + getDomain() + "; SameSite=None; Secure";
      localStorage.setItem("wbn", storageValue);
    },
    getStore: function () {
      var value = "; " + document.cookie;
      var parts = value.split("; wbn=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    },
    getProfile: function () {
      var xhttp = new XMLHttpRequest();
      xhttp.withCredentials = true;
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status >= 200) {
          nonio.profile = JSON.parse(xhttp.responseText);
        }
      };
      xhttp.open("GET", "https://bsd.frontend.weborama.fr/bsd?format=json&token=" + attrsElement.getAttribute("wam_profile") + "&strict=1p", true);
      xhttp.send();
    },

    detectBlocker: function () {
      if (!document.getElementById("ad-blocker-detector")) {
        var box = document.createElement("div");
        box.setAttribute("id", "ad-blocker-detector");
        box.setAttribute("class", "ads ad adsbox ad-placement");
        box.setAttribute("style", "height:1px !important;width:1px !important;position:absolute !important,left:0px;top:0px;opacity:0 !important;");
        document.body.appendChild(box);
      }
      return getComputedStyle(document.getElementById("ad-blocker-detector"))["display"] == "none" ? true : false;
    },
    uuid: function (length) {
      var text = "";
      var possible = "ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    detectDevice: function () {
      var res = { mobile: false, browser: null };
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        res.mobile = true;
      }
      if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
        res.browser = "opera";
      }
      if (navigator.userAgent.indexOf("Chrome") != -1) {
        res.browser = "chrome";
      }
      if (navigator.userAgent.indexOf("Safari") != -1) {
        res.browser = "safari";
      }
      if (navigator.userAgent.indexOf("Firefox") != -1) {
        res.browser = "firefox";
      }
      if (navigator.userAgent.indexOf("Edg") != -1) {
        res.browser = "edge";
      }
      if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
        res.browser = "ie";
      }
      return res;
    },
    inject: function (params) {
      var ifr = document.createElement("iframe");
      ifr.src = "https://tag29.ams3.digitaloceanspaces.com/c/c.html?" + params;
      document.body.appendChild(ifr);
    },
    init: function () {
      var attrsElement = document.querySelector("script[collect]");
      //nonio.detectDevice();
      //nonio.detectBlocker();
      if (attrsElement.getAttribute("wam_profile")) {
        nonio.getProfile();
      }
      if (nonio.getStore() === undefined) {
        nonio.setStore(nonio.uuid(20));
      }
      if (attrsElement.getAttribute("wam_id")) {
        if (attrsElement.getAttribute("wam_id").length > 0) {
          wamid = attrsElement.getAttribute("wam_id");
          typ = "1";
          if (attrsElement.getAttribute("wam_label").length > 0) {
            Wvar.push("label", attrsElement.getAttribute("wam_label"));
          }
          if (nonio.getStore()) {
            Wvar.push("sid", nonio.getStore());
          }
          Wvar.push("w", screen.width);
          Wvar.push("h", screen.height);
          if (navigator.cookieEnabled) {
            Wvar.push("ce", navigator.cookieEnabled);
          } else {
            Wvar.push("ce", "?");
          }
          if (navigator.language) {
            Wvar.push("l", navigator.language);
          } else {
            Wvar.push("l", "?");
          }
          var w = document.createElement("script");
          w.type = "text/javascript";
          w.onerror = function (e) {
            console.log(e);
          };
          w.src = document.location.protocol + "//cstatic.weborama.fr/js/wam/customers/wamfactory_dpm.wildcard.min.js?rnd=" + new Date().getTime();
          w.async = true;
          var body = document.getElementsByTagName("script")[0];
          body.parentNode.insertBefore(w, body);
        }
      }
    },
    event: function (type, key, value) {
      window.wamf.eventSend(type, key, value);
    },
    collect: function (data) {
      if (data["uid"]) {
        nonio.event("2", "uid", data["uid"]);
      }
    },
  };
  nonio.init();
})(window);
