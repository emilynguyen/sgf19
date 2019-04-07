---
---

function disableAF() {
  $("#lineup-container .portable-hide")
    .removeClass("portable-hide")
    .addClass("hide");
  $("#lineup-noscript").removeClass("desk-hide");
  console.log("Lineup autofocus disabled");
}

$(document).ready(function() {
  if (is_safari) {
    disableAF();
  }

  var top, left, lens, blur, clear, bg;

  bg = $("#lineup");
  lens = $("#lens");
  blur = $(".blur");
  clear = $(".clear");

  $(".lineup-text").mousemove(function(e) {
    // Only run if manual focus is on
    if (bg.hasClass("auto-focus")) {
      return;
    }
    clear.css({
      "clip-path": "circle(7vw at " + e.offsetX + "px " + e.offsetY + "px)",
      opacity: "1"
    });
  });

  $(".lineup-text").mouseleave(function(e) {
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
