"use strict";

var $LEAF_STRETCH = $(".leaf-stretch");
var $TEXT_CONTAINER = $("#about .text-container");
var $TEXT = $("#about .text");

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();

  var leafRect = $LEAF_STRETCH[0].getBoundingClientRect();
  var textRect = $TEXT[0].getBoundingClientRect();
  var leafTop = leafRect.top + scroll;
  var textBottom = textRect.bottom + scroll;
  var windowHeight = $(window).height();

  var offset = windowHeight / 2;

  // Breakpoints
  var start = leafTop - windowHeight / 2;
  var end = textBottom - offset + 20;

  var height = 0;
  // console.log(scroll + ", " + breakpoint);
  if (scroll >= start && scroll < end) {
    height = scroll - start;
  } else if (scroll > end) {
    height = end - start;
    //  return;
  }

  $LEAF_STRETCH.height(height);
  $TEXT_CONTAINER.height(height);
});