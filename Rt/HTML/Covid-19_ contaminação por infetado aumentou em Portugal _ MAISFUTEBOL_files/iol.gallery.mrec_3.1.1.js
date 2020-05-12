(function($, window, document, undefined) {
  "use strict";

  //Gallery Options
  var defaultGalleryOptions = {
    galId: 0,
    coverId: 0,
    loadingIconSrc: "https://cdn.iol.pt/js/utils/gallery/loading.svg",
    smartToken: "",
    platform: "WEB", // Available values WEB|AMP|IA|APP
    pageUrl: "", // URL from the page that loads the gallery (for iframes)
    pageTitle: "", // Title from the page that loads the gallery (for iframes)
    loop: true,
    pub: "",
    nav: false,
    alwaysShowPub: false, //If false only show on the mobile version
    navHTML: ["", ""],
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    startPosition: 0,
    responsive: false,

    onChanged: function(event) {}
  };

  /**
   * IOL Gallery Construtor
   * @param {string} elem
   * @param {object} options
   */
  function IOLGallery(elem, options) {
    this.iolGallery = {};

    //Join default option with the param options
    this.iolGallery.options = $.extend({}, defaultGalleryOptions, options);

    //Jquery element that contains the gallery
    this.iolGallery.galleryElement = $(elem);

    //The first click on the gallery
    this.iolGallery.firstClick = false;
    //When is sent to a slide number
    this.iolGallery.isSentToSlide = false;
    //Quantity of slides for lazy loading
    this.iolGallery.quantity = 5;
    //Number of slides already loaded in the front of gallery
    this.iolGallery.loadedAtStart = 0;
    //Number of slides already loaded in the end of gallery
    this.iolGallery.loadedAtEnd = 0;
    //Total number of slides present in the gallery
    this.iolGallery.total = -1;
    //Number of slides not yet loaded in the gallery
    this.iolGallery.missing = -1;
    //Number of slides not yet loaded in the gallery
    this.iolGallery.lastIndex = 0;
    //Indicates the previous slides that was seen
    this.iolGallery.loading = false;
    //The number of remaining slides before loading more
    this.iolGallery.loadMoreAfter = 3;
    //The gallery title
    this.iolGallery.galleryTitle = "";
    //The gallery description
    this.iolGallery.galleryDescription = "";
    //Advertising source for the MRECS inside the gallery

    this.iolGallery.adSource =
      "https://cdn.iol.pt/js/pb.html?adUnit=" +
      this.iolGallery.options.pub +
      "/MPU_GAL&size=[300,250]";

    this.init();
  }

  /**
   * Initializes the gallery
   */
  IOLGallery.prototype = {
    init: function() {
      //Validate gallery id
      if (this.iolGallery.options.galId === 0) {
        return false;
      }

      //Create HTML div for gallery
      if (!Date.now) {
        Date.now = function() {
          return new Date().getTime();
        };
      }

      this.iolGallery.galleryDivId = "iolgallery_" + Date.now();
      //tabindex="0" used for keyup events
      this.iolGallery.galleryElement.html(
        '<div id="' +
          this.iolGallery.galleryDivId +
          '" tabindex="0" class="iolgallery"><div class="iolgallery-content"><div class="owl-carousel"></div></div></div>'
      );

      //Slideshow element
      this.iolGallery.slideshowElement = $(
        ".owl-carousel",
        this.iolGallery.galleryElement
      );

      var _this = this;
      this.initSlides(function() {
        _this.setupSlideshow();
        _this.setupEvents();
      });
    },

    /**
     * Gets all the images and loads the 5 first and 5 last, incluiding the pub
     * @param {function} callback
     */
    initSlides: function(callback) {
      var _this = this;
      $.getJSON(
        "https://www.iol.pt/json_gallery_with_cover.html",
        {
          gal_id: _this.iolGallery.options.galId,
          cover_id: _this.iolGallery.options.coverId,
          quantity: 500,
          loaded: 0
        },
        function(data) {
          _this.iolGallery.galleryTitle = data.gallery.title;
          _this.iolGallery.galleryDescription = data.gallery.description;

          _this.iolGallery.slides = data.gallery.images;
          _this.iolGallery.nextIndex = undefined;
          _this.iolGallery.prevIndex = undefined;

          _this.iolGallery.total = data.gallery.total;
          _this.iolGallery.pubPositions = [];

          //Sets the ad positions
          if (
            _this.iolGallery.options.pub != "sponsored" &&
            _this.iolGallery.options.alwaysShowPub
          ) {
            var pos = 2;
            while (pos <= _this.iolGallery.total) {
              _this.iolGallery.pubPositions.push({
                position: pos,
                type: "pub"
              });
              pos += 5;
            }
          }

          var count = 0;
          _this.iolGallery.pubPositions.forEach(element => {
            _this.iolGallery.slides.splice(
              element.position + count,
              0,
              element
            );
            count++;
          });

          var firstOnesIndex, lastOnesIndex;
          _this.iolGallery.missing = _this.iolGallery.slides.length;

          //Load all the images
          if (_this.iolGallery.slides.length <= _this.iolGallery.quantity * 3) {
            firstOnesIndex = _this.iolGallery.slides.length;
            lastOnesIndex = -1;
          } else {
            firstOnesIndex = _this.iolGallery.quantity;
            lastOnesIndex =
              _this.iolGallery.slides.length - _this.iolGallery.quantity;

            _this.iolGallery.nextIndex = firstOnesIndex;
            _this.iolGallery.prevIndex = lastOnesIndex;
          }

          var elem;

          for (var index = 0; index < firstOnesIndex; index++) {
            elem = $(_this.createSlide(index, _this.iolGallery.slides[index]));
            _this.iolGallery.slideshowElement.append(elem);
            _this.iolGallery.loadedAtStart++;
            _this.iolGallery.missing--;
          }

          // Need Load More
          if (lastOnesIndex != -1) {
            for (
              var index = lastOnesIndex;
              index < _this.iolGallery.slides.length;
              index++
            ) {
              elem = $(
                _this.createSlide(index, _this.iolGallery.slides[index])
              );
              _this.iolGallery.slideshowElement.append(elem);
              _this.iolGallery.loadedAtEnd++;
              _this.iolGallery.missing--;
            }
          }

          _this.iolGallery.slideshowElement.trigger("refresh.owl.carousel");
          callback.call();
        }
      );
    },

    /**
     * Defines the slide markup
     * @param {object} item
     */
    createSlide: function(pos, item) {
      var html = "";
      if (item.type != "pub") {
        var screenWidth =
          window.innerWidth >= 1024 ? 1300 : window.innerWidth * 2;
        var slideTitle =
          normaliza(item.title) === normaliza(this.iolGallery.galleryTitle) ||
          normaliza(item.title) ===
            normaliza(this.iolGallery.galleryDescription)
            ? ""
            : item.title;

        html = `<div class="iolgallery-slide-wrapper" id="${pos}">
                                <div class="iolgallery-slide owl-lazy" data-src="${
                                  item.path
                                }${screenWidth}"></div>
                                <div class="iolgallery-slide-title">
                                    <div class="iolgallery-slide-number" data-number="${
                                      item.number
                                    }"><span>${item.number}</span>/${
          this.iolGallery.total
        }</div> ${slideTitle}
                                    ${
                                      item.description
                                        ? `<div class="iolgallery-slide-description">${htmlDecode(
                                            item.description
                                          )}</div>`
                                        : ""
                                    }
                                </div>
                            </div>`;
      } else {
        html = `<div class="iolgallery-slide" id="pub${pos}"><div class="iolgallery-slide-pub"><div class="iolgallery-slide-pub-content">PUB</div></div></div>`;
      }

      return html;
    },

    /**
     * Setup of the OWLCarousel and of the events
     */
    setupSlideshow: function() {
      this.iolGallery.slideshowElement.owlCarousel({
        items: 1,
        lazyLoad: true,
        pub: this.iolGallery.options.pub,
        loop: this.iolGallery.options.loop,
        nav: this.iolGallery.options.nav,
        navText: this.iolGallery.options.navHTML,
        autoplay: this.iolGallery.options.autoplay,
        autoplayTimeout: this.iolGallery.options.autoplayTimeout,
        autoplayHoverPause: this.iolGallery.options.autoplayHoverPause,
        startPosition: this.iolGallery.options.startPosition,
        responsive: this.iolGallery.options.responsive
      });
    },

    /**
     * Setup the gallery events (onChange and onKeyup)
     */
    setupEvents: function() {
      var _this = this;

      //onChange
      this.iolGallery.slideshowElement.on("changed.owl.carousel", function(
        event
      ) {
        if (
          !event.property ||
          (event.property && event.property.name != "position")
        ) {
          return;
        }

        //when is triggered the to.owl.carousel event
        if (_this.iolGallery.isSentToSlide) {
          _this.iolGallery.isSentToSlide = false;
          return;
        }

        //Sends the gallery information for analytics
        _this.sendAnalyticsEvents();

        //Check first click and send SmartToken
        if (
          _this.iolGallery.options.smartToken &&
          !_this.iolGallery.firstClick
        ) {
          var URLVisit = `https://services.iol.pt/smartTopEncoded?token=${_this.iolGallery.options.smartToken}`;
          $(`#${_this.iolGallery.galleryDivId}`).append(
            `<img src='${URLVisit}' style="display:none;" height='1' width='1'/>`
          );
          _this.iolGallery.firstClick = true;
        }

        //Calls the onChange function called on the usage of iolgallery
        _this.iolGallery.options.onChanged.call(this, event);

        var diff = event.page.index - _this.iolGallery.lastIndex;
        var direction =
          diff > 0 ? (diff > 1 ? "prev" : "next") : diff < -1 ? "next" : "prev";

        _this.iolGallery.lastIndex = event.page.index;

        _this.loadPub(event);

        //Load next slides
        if (!_this.iolGallery.loading && _this.iolGallery.missing != 0) {
          if (
            (direction == "next" &&
              event.page.index < _this.iolGallery.loadedAtStart &&
              event.page.index + _this.iolGallery.loadMoreAfter >=
                _this.iolGallery.loadedAtStart) ||
            (direction == "prev" &&
              event.page.index -
                (event.page.count - _this.iolGallery.loadedAtEnd) >
                0 &&
              event.page.index - _this.iolGallery.loadMoreAfter <=
                event.page.count - _this.iolGallery.loadedAtEnd)
          ) {
            _this.iolGallery.loading = true;
            _this.loadMoreSlides(event.page.index, direction, function() {
              _this.iolGallery.loading = false;
            });
          }
        }
      });

      //onKeyup
      this.iolGallery.galleryElement.on("keyup", function(event) {
        if (event.keyCode === 37) {
          //left key
          $(".owl-prev").click();
        } else if (event.keyCode === 39) {
          //right key
          $(".owl-next").click();
        }
      });
    },

    /**
     * Sends the gallery information to the Google Analytics
     */
    sendAnalyticsEvents: function() {
      var pageUrl =
        this.iolGallery.options.pageUrl != ""
          ? this.iolGallery.options.pageUrl
          : location.pathname;
      var pageTitle =
        this.iolGallery.options.pageTitle != ""
          ? this.iolGallery.options.pageTitle
          : document.title;

      try {
        if (window.iol_analytics) {
          //new version
          let iolAnalytics = window.iol_analytics;
          iolAnalytics.updateVirtualPageView(
            pageUrl,
            iol_analytics.createSimpleDataLayerObject(
              "Galeria",
              this.iolGallery.galleryTitle,
              this.iolGallery.options.galId,
              this.iolGallery.options.platform,
              this.iolGallery.options.pub != "sponsored" &&
                this.iolGallery.options.alwaysShowPub
                ? `${this.iolGallery.options.pub}/MPU_GAL`
                : "",
              "slide",
              false
            )
          );
        } else {
          IOLAnalytics.updateVirtualPageView(
            "slide",
            false,
            location.pathname,
            document.title,
            {
              Tipo_Conteudo: "Galeria",
              Titulo: this.iolGallery.galleryTitle,
              Multimedia_Id: this.iolGallery.options.galId,
              Plataforma: this.iolGallery.options.platform
            }
          );
        }
      } catch (err) {
        if (dataLayer) {
          dataLayer.push({
            virtualPageURL: pageUrl,
            virtualPageTitle: pageTitle,
            event: "VirtualPageview",
            Tipo_Conteudo: "Galeria",
            Titulo: this.iolGallery.galleryTitle,
            Multimedia_Id: this.iolGallery.options.galId,
            Plataforma: this.iolGallery.options.platform
          });
        }
      }
    },

    loadPub: function(event) {
      var slide = $(
        $(`#${this.iolGallery.galleryDivId} .owl-item`)[event.item.index]
      );

      //Blocks for 1.5 seconds the slide with advertising and unblocks after the time has passed
      if (slide.find(".iolgallery-slide-pub").length >= 1) {
        $(`#${this.iolGallery.galleryDivId} .owl-carousel *`).bind(
          "touchmove",
          false
        );
        $(`#${this.iolGallery.galleryDivId} .owl-next`).css(
          "pointer-events",
          "none"
        );
        $(`#${this.iolGallery.galleryDivId} .owl-prev`).css(
          "pointer-events",
          "none"
        );

        var pub;
        pub = `<div class="a"></div>
                    <iframe width="300" height="250" frameborder="0" allowtransparency scrolling="no" allowfullscreen src="${this.iolGallery.adSource}"></iframe>
                    <br/>PUB
                    <img src="${this.iolGallery.options.loadingIconSrc}" width="34" style="width:20px; display:block; margin:25px auto 0 auto;transition:all 0.2s;"/>
                    <div class="b"></div>`;

        //Load the ad before showing
        slide.find(".iolgallery-slide-pub-content").html(pub);

        var _this = this;

        setTimeout(function() {
          $(`#${_this.iolGallery.galleryDivId} .owl-carousel *`).unbind(
            "touchmove"
          );
          $(`#${_this.iolGallery.galleryDivId} .owl-next`).css(
            "pointer-events",
            "auto"
          );
          $(`#${_this.iolGallery.galleryDivId} .owl-prev`).css(
            "pointer-events",
            "auto"
          );
          slide.find("img").css("opacity", "0");
        }, 1500);
      } else {
        //removes the ad after playing for refreshing
        $(".iolgallery-slide-pub-content").html("");
      }
    },

    /**
     * Loads the slides for the gallery
     *
     * @param {boolean} triggerSlideshow
     * @param {function} callback
     */
    loadMoreSlides: function(currentindex, direction, callback) {
      // check if more to load
      if (this.iolGallery.missing <= 0) {
        debugger;
        return;
      }

      var start, stop, owlIdx;

      if (direction == "next") {
        start = this.iolGallery.nextIndex;
        stop = this.iolGallery.nextIndex + this.iolGallery.quantity;
        stop =
          stop > this.iolGallery.prevIndex
            ? this.iolGallery.nextIndex + this.iolGallery.missing
            : stop;
        owlIdx = this.iolGallery.nextIndex;
        this.iolGallery.nextIndex = stop;
      } else {
        start = this.iolGallery.prevIndex - this.iolGallery.quantity;
        start =
          start < this.iolGallery.nextIndex
            ? this.iolGallery.prevIndex - this.iolGallery.missing
            : start;
        stop = this.iolGallery.prevIndex;
        owlIdx = this.iolGallery.nextIndex;
        this.iolGallery.prevIndex = start;

        this.iolGallery.isSentToSlide = true;
      }

      var elem;

      for (var index = start; index < stop; index++) {
        elem = $(this.createSlide(index, this.iolGallery.slides[index]));
        this.iolGallery.slideshowElement.trigger("add.owl.carousel", [
          elem,
          owlIdx++
        ]);
        if (direction == "next") {
          this.iolGallery.loadedAtStart++;
        } else {
          this.iolGallery.loadedAtEnd++;
        }
        this.iolGallery.missing--;
      }

      this.iolGallery.slideshowElement.trigger("refresh.owl.carousel");
      if (direction == "prev") {
        this.iolGallery.slideshowElement.trigger("to.owl.carousel", [
          currentindex + this.iolGallery.quantity,
          -1
        ]);
      }
      callback.call();
    }
  };

  /**
   * Cleans the string for comparation
   * @param {string} txt
   */
  function normaliza(txt) {
    if (txt === undefined || txt === "") return "";

    return txt
      .toLowerCase()
      .replace(new RegExp("\\p{InCombiningDiacriticalMarks}+", "g"), "")
      .replace(new RegExp("[^\\p{Alnum}]+", "g"), "-") // Replace all remaining non-alphanumeric characters by - and collapse when necessary.
      .replace(new RegExp("[^A-Za-z0-9]+$", "g"), "") // remove trailing punctuation
      .replace(new RegExp("^[^A-Za-z0-9]+", "g"), ""); // remove leading punctuation
  }

  /**
   * Converts encoded string to html string
   * @param {string} input
   */
  function htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  /**
   * Adds the function iolgallery to the JQuery prototype
   * @param {object} options
   */
  $.fn.iolgallery = function(options) {
    // Create new IOL Gallery
    if (options === undefined || typeof options === "object") {
      return this.each(function() {
        $(this).data("iolgallery", new IOLGallery(this, options));
      });

      // API Call to Public Method
    } else if (
      typeof options === "string" &&
      options[0] !== "_" &&
      options !== "init"
    ) {
      var args = arguments;
      var returns;

      this.each(function() {
        var instance = $.data(this, "iolgallery");

        // check if a valid instance and if public method exists
        if (
          instance instanceof IOLGallery &&
          typeof instance[options] === "function"
        ) {
          returns = instance[options].apply(
            instance,
            Array.prototype.slice.call(args, 1)
          );
        }
      });

      return returns !== undefined ? returns : this;
    }
  };
})(jQuery, window, document);
