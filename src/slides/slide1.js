define(["../slide", "../rAFLoop", "../tween", "../swipe"], function(Slide, rAFLoop, Tween, Swipe){

  var _stoppedParallax = false,
      _titleElement = document.getElementById("intro-title"),
      _arrow = document.getElementById("intro-arrow"),
      _arrowTween = new Tween(0),
      _lastX = window.innerWidth,
      _swipe;

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
    Slide.next();
    _swipe.stop();
  }

  _swipe = new Swipe(function(){
      next();
    }, function(p){
      _arrowTween.set(p*1.5);
    });

  _swipe.start();

  _titleElement.addEventListener("click", function(e){
    next();
  }, false);

});