---
---

/* Global variables */
const TIPS = [
  "Do NOT mix drugs and alcohol.",
  "Make sure to remain hydrated and drink about two cups of water (500ml) every hour. Be careful to not consume water too quickly- this can cause an electrolyte imbalance that could become fatal.",
  "You WILL NOT be punished for your drug/alcohol use retroactively if you seek help from an official. Your safety is our first priority.",
  "Eat before, during, and after the event.",
  "Alternate between alcoholic and non-alcoholic drinks.",
  "Choose beer or cider instead of shots.",
  "Keep track of the number of drinks you have (especially the amount of liquor).",
  "One drink is a 12 oz beer, 5 oz of wine, or 1.5 oz of liquor.",
  "Tell your friends to let you know when you’ve had too much to drink.",
  "Pace your drinks to one or less per hour, and avoid drinking games.",
  "Don’t take (or give) unwanted peer pressure",
  "Have a designated driver, or sign up for <a href='http://as.ucsd.edu/saferides' target='_blank'>A.S. Safe Rides</a>!",
  "If you see someone in medically dangerous conditions, do not be afraid to reach out to a security guard, police officer, event staff or event volunteer to ask for help.",
  "Consent is a voluntary, sober, imaginative, enthusiastic, creative, wanted, informed, mutual, honest, and verbal agreement. Consent is an active agreement: Consent cannot be coerced.",
  "A person who is intoxicated cannot legally give consent. If you're too drunk to make decisions and communicate with your partner, you're too drunk to consent.",
  "If you choose to drink, do so in moderation. Never take drinks from strangers, accept a drink from an open container or leave your drink unattended."
];

var PAUSED = true; // Boolean indicating if tips are paused
var PREV_TIP_TIME = getSeconds(); // Time that last tip was shown
var INTERVAL = 10; // How often tips rotate (s)
var FIRST_TIP = false; // Boolean indicating if first tip has been loaded
var $TIP_CONTAINER = $("#tip-container");
var $TIPS = $("#tips");

var PALM = 480;
var MOBILE = false;
if ($(window).width() <= 480) {
  MOBILE = true;
}

function getSeconds() {
  return new Date().getTime() / 1000;
}

/* Name: getNextTip
 * Description: Retrieves current tip index and increments to get the next tip.
 * Parameters: None
 * Return: Returns the next tip.
 */
function getNextTip() {
  var tipIndex;
  var tip;

  // Retrieve tipIndex from storage, set to 0 if not found
  if ((tipIndex = localStorage.getItem("tipIndex"))) {
    tipIndex = parseInt(tipIndex);

    // Reset to 0 if reached end
    if (tipIndex + 1 >= TIPS.length) {
      // console.log("RESTARTING TIPS");
      tipIndex = 0;
      tip = TIPS[tipIndex];
    } else {
      tip = TIPS[++tipIndex];
    }
  } else {
    tipIndex = 0;
    tip = TIPS[tipIndex];
  }

  // console.log("Showing tip #" + (tipIndex + 1));

  // Update tipIndex in storage and return new tip
  var s = getSeconds();
  localStorage.setItem("tipIndex", tipIndex);
  PREV_TIP_TIME = s;
  return tip;
}

/* Name: setTip
 * Description: Calls getNextTip() to update the current tip on screen.
 * Parameters: None
 * Return: None
 */
function setTip() {
  // Return if tip container is hidden
  if ($TIP_CONTAINER.is(":hidden")) {
    return;
  }

  if ($TIPS.html().length == 0) {
    $TIPS.html(getNextTip()).fadeIn();
  } else {
    $TIPS
      .fadeOut(function() {
        $(this).html(getNextTip());
      })
      .fadeIn();
  }
}

/* Main function */
$(document).ready(function() {
  /* Hide tips on mobile */
  $(window).resize(function() {
    var width = $(window).width();
    if (width <= PALM && MOBILE == false) {
      MOBILE = true;
      $TIP_CONTAINER.fadeOut();
    } else if (width > PALM && MOBILE == true) {
      MOBILE = false;
    }
  });

  /* Detect window focus to pause/unpause tips */
  var hidden, visibilityState, visibilityChange;

  if (typeof document.hidden !== "undefined") {
    (hidden = "hidden"),
      (visibilityChange = "visibilitychange"),
      (visibilityState = "visibilityState");
  } else if (typeof document.msHidden !== "undefined") {
    (hidden = "msHidden"),
      (visibilityChange = "msvisibilitychange"),
      (visibilityState = "msVisibilityState");
  }

  var document_hidden = document[hidden];

  document.addEventListener(visibilityChange, function() {
    if (document_hidden != document[hidden]) {
      if (document[hidden]) {
        // Document hidden
        PAUSED = true;
      } else {
        // Document shown
        PAUSED = false;
      }
      document_hidden = document[hidden];
    }
  });

  /* Toggle health and safety  */
  $(window).scroll(function(event) {
    if (MOBILE) {
      return;
    }

    var scroll = $(window).scrollTop();

    var $lineupBlock = $("#lineup-block");
    // Calc breakpoint for tips
    var lineupRect = $lineupBlock[0].getBoundingClientRect();
    var tipsBreakpoint = lineupRect.bottom;

    // Get tips visibility
    var tipsHidden = $TIP_CONTAINER.is(":hidden");

    // Show health + safety when bottom of lineup scrolls into view
    if (scroll >= tipsBreakpoint && tipsHidden) {
      $TIP_CONTAINER.fadeIn();
      if (!FIRST_TIP) {
        setTip();
        FIRST_TIP = true;
      }
      PAUSED = false;
    } else if (scroll < tipsBreakpoint && !tipsHidden) {
      $TIP_CONTAINER.fadeOut();
      PAUSED = true;
    }
  });

  setInterval(function() {
    if (!PAUSED && !MOBILE && document.hasFocus()) {
      var s = getSeconds();
      var difference = s - PREV_TIP_TIME;
      if (difference >= INTERVAL) {
        setTip();
      }
    }
  }, 1000);
});
