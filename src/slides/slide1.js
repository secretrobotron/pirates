define(["../slide"], function(Slide){

  var MOUSE_SWIPE_DISTANCE = 100;

  var _stoppedParallax = false,
      _titleElement = document.getElementById("intro-title"),
      _lastX = window.innerWidth;

  var slide = new Slide("intro-slide", {
    update: function(){
      var rect = _titleElement.getBoundingClientRect();
    }
  });

  function onMouseMove(e){
    if(_lastX < e.clientX && e.clientX - _lastX > MOUSE_SWIPE_DISTANCE){
      Slide.next(slide);
      _titleElement.removeEventListener("mousemove", onMouseMove, false);
      return;
    }
    _lastX = e.clientX;    
  }

  _titleElement.addEventListener("mousemove", onMouseMove, false);

  _titleElement.addEventListener("click", function(e){
    Slide.next(slide);
  }, false);

});