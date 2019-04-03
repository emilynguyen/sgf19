/* AF/MF toggle */
var $switch = $("#focus-switch-container input");
var $switchLabel = $("#focus-switch-container .switch");
$switch.change(function() {
  // AF = checked; MF = unchecked
  $switchLabel.toggleClass("active");
  $("#lineup").toggleClass("auto-focus");
});
