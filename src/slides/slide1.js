define(["../slide"], function(Slide){

  var PERCENT_OFF = 25;

  var _stoppedParallax = false;

  var _titleElement = document.getElementById("intro-title")

  var slide = new Slide("intro-slide", {
    update: function(){
      var rect = _titleElement.getBoundingClientRect();
    }
  });

  _titleElement.addEventListener("click", function(e){
    Slide.next(slide);
  }, false);

});