define(["../slide", "../rAFLoop", "../tween"], function(Slide, rAFLoop, Tween){

  var MOUSE_SWIPE_DISTANCE = 100;

  var _stoppedParallax = false,
      _titleElement = document.getElementById("intro-title"),
      _arrow = document.getElementById("intro-arrow"),
      _arrowTween = new Tween(0),
      _lastX = window.innerWidth;

  var slide = new Slide("intro-slide", {
    update: function(){
      var rect = _titleElement.getBoundingClientRect();
      _arrow.style.opacity = (_arrowTween.value);
    },
    start: function(){
      _arrowTween.start();
    },
    stop: function(){
      _arrowTween.stop();
    }
  });

  function next(){
    window.removeEventListener("mousemove", onMouseMove, false);
    Slide.next();
  }

  function onMouseMove(e){
    var diff = e.clientX - _lastX;
    if(_lastX < e.clientX && diff > MOUSE_SWIPE_DISTANCE){
      next();
      return;
    }
    _lastX = e.clientX;
    _arrowTween.set( Math.max(0, Math.min(1, diff/MOUSE_SWIPE_DISTANCE)) );
  }

  window.addEventListener("mousemove", onMouseMove, false);

  _titleElement.addEventListener("click", function(e){
    next();
  }, false);

});