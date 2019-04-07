'use strict';

var PREV_TRANSLATE = 0;
var BORDER_HEIGHT = parseFloat($('#content').css('margin-bottom'));

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

$(document).ready(function () {
  // Adjust landing border on iOS
  if (iOS) {
    alert("iossafari");
    // var visibleHeight = window.innerHeight;
    var visibleHeight = window.innerHeight;
    //var borderHeight = $("#landing-border").height() / 5;

    var newLandingHeight = visibleHeight - BORDER_HEIGHT * 2;
    document.getElementById("landing-block").style.height = newLandingHeight + "px";

    // var menuHeight = $("#measure").height() - visibleHeight;

    // var newBorderHeight = borderHeight + menuHeight;
    // $("#landing-border").css("height", newBorderHeight + "px");
    //  $("#landing-border").css("bottom", -newBorderHeight + "px");

    // document.getElementById('measure').innerHTML = `${borderHeight}, ${newBorderHeight}`;
  }
});

$(window).resize(function () {
  BORDER_HEIGHT = parseFloat($('#content').css('margin-bottom'));
});

$(window).scroll(function (event) {
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