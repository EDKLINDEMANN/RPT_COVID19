$(document).ready(function() {
  // navigation click actions
  $('.scroll-link').on('click', function(event){
    event.preventDefault();
    var sectionID = $(this).attr("data-id");
    scrollToID('#' + sectionID, 750);
  });
  // scroll to top action
  $('.scroll-top').on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop:0}, 'slow');
  });
  // mobile nav toggle
  $('#nav-toggle').on('click', function (event) {
    event.preventDefault();
    $('#main-nav').toggleClass("open");
  });
});
// scroll function
function scrollToID(id, speed){
  var offSet = 50;
  var targetOffset = $(id).offset().top - offSet;
  var mainNav = $('#main-nav');
  $('html,body').animate({scrollTop:targetOffset}, speed);
  if (mainNav.hasClass("open")) {
    mainNav.css("height", "1px").removeClass("in").addClass("collapse");
    mainNav.removeClass("open");
  }
}
if (typeof console === "undefined") {
    console = {
        log: function() { }
    };
}

//royalSlider
jQuery(document).ready(function($) {
  $(".royalSlider").royalSlider({
    // general options go gere
    autoScaleSlider: true,
    video: {
      autoHideArrows: true,
      autoHideControlNav: false,
      autoHideBlocks: true,
      youTubeCode: '<iframe src="https://www.youtube.com/embed/%id%?rel=1&autoplay=1&showinfo=0" frameborder="no" allowFullscreen></iframe>'
    }
  });
});

$(document).ready(function() {
  //Menu
var menuLink = $('.burger');
var menu = $('.menu');
var menu_md = $('.menu_md');
var close = $('.btn-close');
var navLink = $('ul li .navLink');


menuLink.click(function() {
  menu.toggleClass('menu_active');
  menu_md.toggleClass('menu_active_md');
});

close.click(function() {
  menu.toggleClass('menu_active');
  menu_md.toggleClass('menu_active_md');
});

navLink.on('click', function(event) {
  //event.preventDefault();
  var target = $(this).attr('href');
  var top = $(target).offset().top;
  $('html, body').animate({
    scrollTop: top
  }, 500);
  menu.toggleClass('menu_active');
  menu_md.toggleClass('menu_active_md');
});


});
