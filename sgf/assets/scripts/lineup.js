"use strict";

var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

function disableAF() {
  $("#lineup-container .portable-hide").removeClass("portable-hide").addClass("hide");
  $("#lineup-noscript").removeClass("desk-hide");
  console.log("Lineup autofocus disabled");
}

$(document).ready(function () {
  if (is_safari) {
    disableAF();
  }

  var top, left, lens, blur, clear, bg;

  bg = $("#lineup");
  lens = $("#lens");
  blur = $(".blur");
  clear = $(".clear");

  $("#lineup-input").mousemove(function (e) {
    // Only run if manual focus is on
    if (bg.hasClass("auto-focus")) {
      return;
    }

    var moveX = e.offsetX;
    var moveY = e.offsetY;

    clear.css({
      "clip-path": "circle(6vw at " + moveX + "px " + moveY + "px)",
      opacity: "1"
    });
  });

  $("#lineup-input").mouseleave(function (e) {
    console.log("leave: " + e.target);

    // Only run if manual focus is on
    if (bg.hasClass("auto-focus")) {
      return;
    }

    clear.css({
      "clip-path": "circle(0)",
      opacity: "0"
    });
  });
});