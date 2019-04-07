---
---

var PREV_TRANSLATE = 0;
var BORDER_HEIGHT = parseFloat($('#content').css('margin-bottom'));

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

$(document).ready(function() {
  // Adjust landing border on iOS
  if (iOS) {
    var visibleHeight = window.innerHeight;
    var newLandingHeight = visibleHeight - BORDER_HEIGHT * 2;
    document.getElementById("landing-block").style.height =
      newLandingHeight + "px";
  }
});

$(window).resize(function() {
  BORDER_HEIGHT = parseFloat($('#content').css('margin-bottom'));
});

$(window).scroll(function(event) {
  /* Toggle border content color */
  var scroll = $(window).scrollTop();

  var $footer = $("#landing-block .footer");
  if (scroll <= 0 && $footer.hasClass("white")) {
    $footer.removeClass("white");
  } else if (scroll > 0 && !$footer.hasClass("white")) {
    $footer.addClass("white");
  }

  /* Translate white border */
  var distance = 200;

  var $border = $("#landing-border");
  var landingBorderHeight = $border.height();

  var end = $(window).height();

  var translate;

  if (scroll <= 0) {
    translate = 0;
  } else if (scroll > 0 && scroll <= end) {
    translate = scroll * 1.5;
  } else if (scroll > end) {
    translate = scroll + landingBorderHeight;
  }

  $border.css("transform", "translateY(" + translate + "px)");
});
