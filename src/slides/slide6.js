define(["../slide", "../panels", "../tween"], function(Slide, Panels, Tween){

  var DISTANCE_MULTIPLIER = 30;
  var _mouseY = 0;
  var slideElement = document.getElementById("rocket-slide");
  var rocketElement = document.getElementById("rocket");
  
  var _panels = new Panels(slideElement, 0.5, 0.5, 0.5);
  var _rocketTween = new Tween(0.5);
  var _rocketOffset = [rocketElement.offsetTop, rocketElement.offsetLeft];
  
  var slide = new Slide("rocket-slide", {
    update: function(){
      var slideHeight = slideElement.clientHeight;
      var percentage = Math.min(_mouseY, slideHeight) / slideHeight;
      _rocketTween.set(1 - percentage);
      
      console.log(_mouseY, _rocketTween.value);
      
      rocketElement.style.top = _rocketOffset[0] - _rocketTween.value * DISTANCE_MULTIPLIER * 0.92 + "px";
      rocketElement.style.left = _rocketOffset[1] - _rocketTween.value * DISTANCE_MULTIPLIER + "px";
    },
    start: function(){
      slideElement.addEventListener("mousemove", onMouseMove, false);
      _rocketTween.start();
      _panels.start();
    },
    stop: function(){
       _rocketTween.stop();
      _panels.stop();
    }
  });
  
  function onMouseMove(e) {
    _mouseY = e.clientY;
  }
});