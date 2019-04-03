var PREV_TRANSLATE = 0;

$(window).scroll(function(event) {
  /* Toggle border content color */
  var scroll = $(window).scrollTop();

  var $footer = $("#landing-block .footer");
  if (scroll <= 1 && $footer.hasClass("white")) {
    $footer.removeClass("white");
  } else if (scroll > 1 && !$footer.hasClass("white")) {
    $footer.addClass("white");
  }

  /* Translate white border  */
  var $border = $("#landing-border");
  var borderHeight = $border.height();

  var start = 0,
    end = borderHeight;
  var translate = 0 + $(window).scrollTop() * 1.5;

  // Check border position
  var borderRect = $border[0].getBoundingClientRect();
  var borderTop = borderRect.top;

  // Check if translate puts border out of view
  var vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  var pseudoTop = vh - $border.height() + PREV_TRANSLATE - scroll;

  if (translate < 0) translate = 0;

  // Only translate if still in view
  if (pseudoTop < vh) {
    $border.show();
    $border.css("transform", `translateY(${translate}px)`);
  } else {
    $border.hide();
  }

  PREV_TRANSLATE = translate;
});
