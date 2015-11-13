$(function() {
  var b = $('header');
  height = b.height();
  console.log(height);
  var padding = $("#wrap").css("padding-top");
  console.log(padding);
  padding = height + "px";
  $('#wrap').css('padding-top',height);
});
