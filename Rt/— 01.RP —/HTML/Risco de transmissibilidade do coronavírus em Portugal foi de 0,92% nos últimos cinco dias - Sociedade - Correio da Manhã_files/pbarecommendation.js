(function (w) {
  if (w.__pbarecommendation)
    return;

  var _idref = 0;

  function concat(obj1, obj2, overwrite) {
    for (prop in obj2) {
      if (obj2.hasOwnProperty(prop)) {
        if (overwrite == true || !obj1.hasOwnProperty(prop))
          obj1[prop] = obj2[prop];
      }
    }
    return obj1;
  };


  function serialize(obj, prefix) {
    var str = "";
    var lastprop = "";
    prefix = (prefix ? prefix : "");
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (lastprop.length > 0)
          str += lastprop + "&";
        lastprop = prefix + encodeURIComponent(prop.toString()) + "=" + encodeURIComponent(obj[prop] == undefined ? "" : obj[prop].toString());
      }
    }
    str += lastprop;
    return str;
  };

  function callAjax(url, callback) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        callback(xmlhttp.responseText);
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };

  w.__pbarecommendation = function (options) {
    /*
     * options
     * 
     * number_items: int - number elements
     * items_row: int - elements per row
     */
    var _defaultOpts = {
      //number_items: 5,
      //items_row: 5,
      replace: false,
      css: {
        name: null /* css by template with name */
        /* url: <url> external css template */
      },
      template: {
        /*id: id element in dom with id */
        name: null /* html template with name */
        /* url: <url> external html template */
      },
      js: {
        name: null /* js by template with name */
        /* url: <url> external js template */
      },
      templateprovider: "templateprovider.ashx", /* css and template provider url */
      recommendation: {
        /* data: {} static data */
        /* url: "recommendation.ashx" web service url */
      },
      user_id: null, /* null = use cookie */
      lazyload: false,
      lazyloadheight: 500,
    };

    return new function () {
      var self = this;

      var _options = concat({}, concat(options || {}, _defaultOpts));

      // Para aceitar cols e rows
      if (isNaN(+_options.items_row) && !isNaN(+_options.cols))
        _options.items_row = _options.cols;

      if (isNaN(+_options.number_items) && !isNaN(+_options.rows))
        _options.number_items = _options.rows * _options.cols;


      var _id = _options.id || "_pbarec_" + _idref++;

      var _cookie = "__PWL";
      var _recommendation_element = null;
      var _recommendation_data = null;
      var _recommendation_response = null;
      var _recommendation_template = null;
      var _cssReady = 0;
      var _jsLoading = false;
      var _lazyloaded = false;
      var _pollJS = [];
      var _on = {};

      var _pba_widget_id = "pba_recommendation_widget_" + _id;
      var _pba_css_id = "pba_recommendation_css_" + _id;

      var _needRender = true, _hasPreRender = false;

      function getRecommendationUrl() {
        var opt = concat({
          user: getUser(),
          mtd: getMethod(),
          site_id: getSiteID(),
          count: getCount()
        },
          getExtraParams(), true);

        return _options.recommendation.url + "?" + serialize(opt);
      }

      function getUser() {
        var index = document.cookie.indexOf(_cookie);
        if (index >= 0) {
          var user = document.cookie.substr(index + _cookie.length + 1);
          var index = user.indexOf(';');
          if (index >= 0)
            user = user.substr(0, user.indexOf(';'));
          if (user.length == 0)
            return false;
          else
            return user;
        }
        else
          return false;
      }

      function getMethod() {
        return _options && _options.method || "";
      }

      function getSiteID() {
        return _options && _options.site_id || "";
      }

      function getCount() {
        return _options && _options.number_items;
      }

      function getExtraParams() {
        return _options && _options.extra_params || {};
      }

      function isDomNode(node) {
        return (node || false) && node instanceof Node;
      }

      function addElement(elem, parent) {
        if (parent) {
          if (parent.hasChildNodes && parent.hasChildNodes())
            parent.insertBefore(elem, parent.firstChild);
          else
            parent.appendChild(elem);
        }
        else {
          var d = document.getElementsByTagName("script")[0];
          d.parentNode.insertBefore(elem, d);
        }
      }

      function loadScript(url, parent, extern) {

        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("async", true);
        script.setAttribute("src", url);

        if (extern) {
          //IE
          if (script.attachEvent) {
            script.attachEvent('onreadystatechange', function () {
              if (script.readyState == 'complete' || script.readyState == 'loaded')
                externJSLoaded();
            });
          }
          else if (script.addEventListener)
            script.addEventListener('load', externJSLoaded, false);
          else
            externJSLoaded();

        }

        var d = document.getElementsByTagName("script")[0];
        if (parent) {
          if (parent.hasChildNodes())
            parent.insertBefore(script, parent.firstChild);
          else
            parent.appendChild(script);
        }
        else {
          var d = document.getElementsByTagName("script")[0];
          d.parentNode.insertBefore(script, d);
        }
      }

      function loadCss(url, parent, callback) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;

        addElement(link, parent);

        var img = document.createElement('img');
        img.onerror = function () {
          if (callback) callback(link);
        }
        img.src = url;
      }

      function styleToObject(style) {
        return (style && style.constructor === String && style.split(";").reduce(function (p, c) {
          var val = c.split(":");
          if (val.length === 2) {
            p[val[0].toLowerCase().trim()] = val[1];
          }
          return p;
        }, {})) || {};
      }

      function objectToStyle(obj) {
        return ((obj && Object.keys(obj)) || []).reduce(function (p, c) {
          p += c + ":" + obj[c] + ";";
          return p;
        }, "");
      }

      var camelRegEx = new RegExp("[A-Z]", "g");
      function styleFromCamelCase(style) {
        return (style && style.constructor === String && style.replace(camelRegEx, function (m) { return "-" + m.toLowerCase(); })) || style;
      }

      /* deprecated */
      function removeScript(id, tag) {
        var d = document.getElementsByTagName("script")[0];
        var scripts = Array.apply([], d.parentElement.getElementsByTagName("script" || tag)).filter(function (i) {
          return i.getAttribute("id") == id;
        });

        for (var i = 0; i < scripts.length; i++) {
          scripts[i].parentElement.removeChild(scripts[i]);
        }
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

      function getValue(data, path) {
        if (data) {
          if (path) {
            var re = new RegExp(/(^[^\.\[]+)|(?:\.)([^\.\[]+)|(?:\[')([^\']+)|(?:\[\")([^\"]+)/g);
            var match = null;
            while ((match = re.exec(path)) !== null && data) {
              var val = match[1] || match[2] || match[3] || match[4];
              //console.log(val);
              data = data[val];
            }

            return data;
            var split = path.split(".");
            var prop;
            while (data && (prop = split.shift()) != null) {
              data = data[prop];
            }
            return data;
          }
          else
            return data;
        }
        return null;
      }

      function getNodeValue(node, data, name, path, index) {
        var transform = node.getAttribute("pba-transform-" + name);
        return transform && (transform = (getValue(self, transform) || getValue(w, transform))) && transform.constructor === Function ? transform(getValue(data, path), path, data, index, node) : getValue(data, path);
      }

      function bindData(data, nodes, deep, index, ignoreempty) {
        if (data && nodes) {
          if (!nodes.length) /* tenho algumas dúvidas se isto funcionará para todos os casos */
            nodes = [nodes];

          for (var i = 0; i < nodes.length; i++) {
            var elems = deep ? nodes[i].getElementsByTagName && nodes[i].getElementsByTagName("*") || null : [nodes[i]];
            for (var n = 0; n < (elems && elems.length || 0); n++) {
              var node = elems[n];
              var style = node.getAttribute("style") && styleToObject(node.getAttribute("style")) || {};
              if (node.attributes && node.setAttribute) {
                for (var j = 0; j < node.attributes.length; j++) {
                  var attr = node.attributes[j];
                  if (ignoreempty && attr.value === "")
                    continue;
                  if (attr.name.indexOf("pba-") == 0) {
                    var name = attr.name.substring(4);
                    if (name.indexOf('attr-') == 0 && name.length > 5) {
                      var attrname = name.substring(5);
                      var append = attr.value && attr.value.substr(0, 1) === '+';
                      var value = getNodeValue(node, data, attrname, append ? attr.value.substr(1) : attr.value, index);
                      if (value !== undefined) {
                        if (append && node.hasAttribute(attrname))
                          node.setAttribute(attrname, node.getAttribute(attrname) + " " + value);
                        else
                          node.setAttribute(attrname, value);

                      }
                    }
                    else if (name.indexOf('style-') === 0 && name.length > 6) {
                      var attrname = name.substring(6).toLowerCase();
                      var value = getNodeValue(node, data, attrname, attr.value, index);
                      if (value !== undefined)
                        style[attrname] = value;
                    }
                    else if (name.indexOf('on-') === 0 && name.length > 3) {
                      var attrname = name.substring(3).toLowerCase();
                      var f = getNodeValue(node, data, name, attr.value, index);
                      if (!ignoreempty && !(f && f.constructor === Function)) {
                        f = getValue(self, attr.value) || getValue(w, attr.value);
                      }

                      if (f && f.constructor === Function) {
                        addEvent(node, attrname, (function (fn) {
                          return function (event) {
                            fn(event, self);
                          }
                        })(f));
                      }
                    }
                    else if (name == 'show' || name == 'hide') {
                      var value = getNodeValue(node, data, name, attr.value, index);
                      var show = value ? name == 'show' : name != 'show';
                      style['display'] = show ? 'inherit' : 'none';
                    }
                    else if (name == 'if') {
                      var value = getNodeValue(node, data, name, attr.value, index);
                      if (value === false)
                        node.parentNode.removeChild(node);
                    }
                    else if (name == 'html') {
                      var value = getNodeValue(node, data, "html", attr.value, index);
                      node.innerHTML = value === undefined ? "" : value;
                    }
                    else if (name == 'text') {
                      var value = getNodeValue(node, data, "text", attr.value, index);
                      if (value) {
                        var tempnode = document.createElement("div");
                        tempnode.innerHTML = value;
                        while (tempnode.firstChild) {
                          node.appendChild(tempnode.firstChild);
                        }
                      }
                    }
                  }
                }

                if (Object.keys(style).length > 0)
                  node.setAttribute("style", objectToStyle(style));

              }
            }
          }
        }
      }

      function getRecommendationCustomTemplate(container, id) {
        if (container !== undefined && id !== undefined) {
          var scripts = container.getElementsByTagName("script");
          var script = null;
          for (var i = 0; i < scripts.length && script === null; i++) {
            if (scripts[i].getAttribute("id") == id) {
              script = document.createElement("div");
              script.innerHTML = scripts[i].innerHTML.trim();
            }
          }
          return script;
        }
        return null;
      }

      function createRecommendation(templatestr, data, parent) {
        var count = +_options.number_items;
        if (isNaN(count) || count < 0)
          count = data.length;
        var nrow = +_options.items_row;
        if (isNaN(nrow) || nrow <= 0 || nrow >= count)
          nrow = count;


        var tmplelem = document.createElement("div");
        tmplelem.innerHTML = templatestr.trim();

        bindData({ options: _options, response: _recommendation_response }, tmplelem, true, -1, true);

        var nodes = tmplelem.getElementsByTagName("*");
        var rec = null, etemplate = null;
        for (var i = 0; i < nodes.length && rec == null; i++) {
          if (nodes[i].getAttribute("pba-recommendation") != null) {
            rec = nodes[i];
            etemplate = nodes[i].getAttribute("pba-recommendation");
            rec.removeAttribute("pba-recommendation");
          }
        }

        if (rec != null) {
          var cnt = Math.min(count, data.length);

          for (var i = 0; i < cnt; i++) {
            if (data[i].index === undefined)
              data[i].index = i;

            var clone = i < cnt - 1 ? rec.cloneNode(true) : rec;
            var val = null;
            (val = getValue(data[i], etemplate)) != null || (val = getValue({ options: _options, response: _recommendation_response }, etemplate)) != null || (val = etemplate);

            if (val != null && (val = getRecommendationCustomTemplate(tmplelem, val)) != null) {
              while (clone.firstChild)
                clone.removeChild(clone.firstChild);
              val = val.cloneNode(true);

              bindData(data[i], clone, false, i);
              bindData(data[i], val, true, i);

              while (val.firstChild)
                clone.appendChild(val.firstChild);
            }
            else {

              nodes = Array.apply([], clone.getElementsByTagName("*"));
              nodes.unshift(clone);

              bindData(data[i], clone, false, i);
              bindData(data[i], nodes, false, i);
            }

            clone.setAttribute("class", "pba_recommendation_row_size_" + nrow + " " + (clone.getAttribute("class") || ""));
            rec.parentElement.insertBefore(clone, rec);
            if ((i + 1) % nrow === 0 && i < cnt - 1) {
              // consi
              var clear = document.createElement("div");
              clear.setAttribute("class", "clearfix");
              rec.parentElement.insertBefore(clear, rec);
            }
          }
        }

        parent.innerHTML = "";
        var container = parent;
        if (!_options.replace) {
          container = document.createElement("div");
          container.setAttribute("id", _pba_widget_id);
          parent.appendChild(container);
        }
        else if (!container.getAttribute("id"))
          container.setAttribute("id", _id);

        var classes = ["pba_recommendation_widget"];
        classes.push.apply(classes, (container.getAttribute("class") || "").split(" "));
        container.setAttribute("class", classes.filter(function (f) { return f; }).join(" "));

        var arr = Array.prototype.concat.apply([], tmplelem.childNodes);
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].nodeName.toLowerCase() !== "script")
            container.appendChild(arr[i]);
        }

      }

      function getRecommendation() {
        if (_options.recommendation) {
          if (_options.recommendation.data) {
            _recommendation_data = _options.recommendation.data;
            _recommendation_response = {};
          }
          else if (_options.recommendation.url) {
            var url = getRecommendationUrl();
            _on["changeRecommendationUrl"] && _on["changeRecommendationUrl"].forEach(function (f) { url = f(url, self); });

            callAjax(url, function (data) {
              var json = data && JSON.parse(data) || {};
              _recommendation_response = json;

              _recommendation_data = json.recommendation && json.recommendation.results && json.recommendation.results.result || {};
              _on["recommendationData"] && _on["recommendationData"].forEach(function (f) { _recommendation_data = f(_recommendation_data, self); });

            });
          }
        }
      }

      function getTemplate() {
        if (_options.template) {
          if (_options.template.id) {
            var template = document.getElementById(_options.template.id);
            if (template)
              _recommendation_template = template.innerHTML;
          }
          else if (_options.template.name) {
            var url = _options.templateprovider + "?type=html&name=" + _options.template.name;
            callAjax(url, function (data) {
              _recommendation_template = data;
            });
          }
          else if (_options.template.url) {
            callAjax(_options.template.url, function (data) {
              _recommendation_template = data;
            });
          }
          else {
            _recommendation_template = "<empty />";
          }
        }
        else {
          _recommendation_template = "<empty />";
        }
      }

      function getCss() {
        _cssReady = 0;
        if (_options.css) {
          var csslist = Array.isArray(_options.css) ? _options.css : [_options.css];
          for (var i = 0; i < csslist.length; i++) {
            var opt = csslist[i];
            if (opt.name || opt.url) {
              var url = null;
              if (opt.url)
                url = opt.url;
              else if (opt.name) {
                var id = _options.replace ? _id : _pba_widget_id;
                url = _options.templateprovider + "?type=css&id=" + id + "&name=" + opt.name + "&default=" + (opt.default !== false);
              }

              _cssReady++;
              var parent = document.getElementsByTagName("script")[0].parentNode;
              loadCss(url, parent, function (link) {
                link.setAttribute("id", _pba_css_id);
                _cssReady--;
              });
            }
          }
        }
      }

      function pollJS() {
        if (_jsLoading)
          return;
        if (_pollJS.length) {
          _jsLoading = true;
          var val = _pollJS.shift();
          loadScript(val.url, val.parent, val.extern);
        }
      }
      setInterval(pollJS, 1000); // para o caso de ficarem scripts pendurados

      function getJS() {
        _jsLoading = false;
        if (_options.js) {
          var jslist = Array.isArray(_options.js) ? _options.js : [_options.js];
          var templateproviderscripts = [];
          var parent = document.getElementsByTagName("script")[0].parentNode;

          jslist.forEach(function (opt) {
            if (opt.name || opt.url) {
              if (opt.url) {
                // os scripts podem ter dependências por isso faz-se um load "sincrono"
                _pollJS.push({ "url": opt.url, "parent": parent, "extern": true });
              }
              else if (opt.name)
                templateproviderscripts.push(opt.name);
            }
          });

          if (templateproviderscripts.length) {
            var url = _options.templateprovider + "?type=js&id=" + _id + "&name=" + templateproviderscripts.join("&name=")
            _pollJS.push({ "url": url, "parent": parent, "extern": false });
          }

          pollJS();
        }
      }

      if (_options.lazyload) {
        (function lazy() {
          if (_recommendation_element) {
            var rect = _recommendation_element.getBoundingClientRect();
            if (rect.top - (window.innerHeight || document.documentElement.clientHeight) < options.lazyloadheight) {
              getTemplate();
              getCss();
              getJS();
              _lazyloaded = true;
              return;
            }
          }

          if (_needRender)
            setTimeout(lazy, 100);

        })();
      }
      else {
        getTemplate();
        getCss();
        getJS();
      }

      setInterval(function () {
        // first get js
        if (!_hasPreRender && _pollJS.length == 0 && !_jsLoading && (!options.lazyload || _lazyloaded)) {
          _on["preRender"] && _on["preRender"].forEach(function (f) { f(self); });
          getRecommendation();
          _hasPreRender = true;
        }

        if (_needRender && _hasPreRender && _recommendation_data && _recommendation_template && _cssReady === 0) {
          if (_recommendation_element && isDomNode(_recommendation_element))
            createRecommendation(_recommendation_template, _recommendation_data, _recommendation_element);

          _needRender = false;
          _on["postRender"] && _on["postRender"].forEach(function (f) { f(self); });
        }
      }, 100);

      this.scriptReady = function (script) {
        script && script(self);
        _jsLoading = false;
        pollJS();
      };

      function externJSLoaded() {
        _jsLoading = false;
        pollJS();
      }

      /* Public methods */

      this.getExtraRecommendationParams = function () {
      };

      this.getOptions = function () {
        return _options;
      };

      this.getID = function () {
        return _id;
      };

      this.getWidget = function () {
        return _recommendation_element;
      };

      this.getResponse = function () {
        return _recommendation_response;
      };

      this.getRecommendationData = function () {
        return _recommendation_data;
      };

      this.setRecommendationData = function (data) {
        _recommendation_data = data;
        _needRender = true;
      };

      this.getTemplate = function () {
        return _recommendation_template;
      };

      this.getUser = function () {
        return getUser();
      };

      /*
       * Events - name:callback-return
       * "preRender" : f(this) - null
       * "postRender" : f(this) - null
       * "changeRecommendationUrl : f(url, this) - url
       * "recommendationData: f(data, this) - data
       */

      this.on = function (event, callback) {
        if (event && typeof (event) === "string" &&
          callback && callback.constructor === Function) {
          if (!_on[event])
            _on[event] = [];
          if (_on[event].indexOf(callback) < 0)
            _on[event].push(callback);
        }
        return this;
      };

      this.hasEvent = function (event) {
        return _on[event] && _on[event].length > 0 ? true : false;
      };

      // deprecated
      this.preRender = function (f) {
        return this.on("preRender", f);
      };

      // deprecated
      this.postRender = function (f) {
        return this.on("postRender", f);
      };

      this.getRecommendation = function () {
        getRecommendation();
      }

      this.reloadRecommendations = function () {
        _recommendation_data = null;
        _needRender = true;
        getRecommendation();
      }

      this.replace = function (elem) {
        if (elem && elem.constructor == String)
          elem = document.getElementById(elem);
        if (isDomNode(elem)) {
          _recommendation_element = elem;
          _needRender = true;
        }

        return this;
      };

      this.log = function () {
        var opt = concat({
          user: getUser(),
          mtd: getMethod(),
          count: getCount()
        },
          getExtraParams(), true);

        var url = _options.recommendation.url + "/log" + "?" + serialize(opt);
        callAjax(url, function () { });
      }

      /*
      this.changeTemplate = function () {
          // não sei se fará sentido implementar 
      };*/

      this.destroy = function () {
        var css = document.getElementById(_pba_css_id);
        if (css)
          css.parentNode.removeChild(css);
        if (_recommendation_element)
          _recommendation_element.innerHTML = "";

        _on = {};
        _needRender = true;
        _hasPreRender = false;

        return this;
      };

      // regist
      __pbarecommendation[_id] = self;
    };
  };

  /* helper function */
  w.__pbarecommendation.helper = {
    ajaxGet: callAjax
  };
})(window);