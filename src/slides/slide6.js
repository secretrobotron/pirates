define(["../slide", "../panels", "../tween"], function(Slide, Panels, Tween){

  var DISTANCE_MULTIPLIER = 30;
  var _mouseY = 0;
  var slideElement = document.getElementById("rocket-slide");
  var rocketElement = document.getElementById("rocket");
  
  var _panels = new Panels(slideElement, 0.5, 0.5, 0.5);
  var _rocketTween = new Tween(0.5);
  var _rocketOffset = [rocketElement.offsetTop, rocketElement.offsetLeft];
  
  var panelVideos = document.querySelectorAll("#rocket-slide > [data-choice-panel] video");
  
  var slide = new Slide("rocket-slide", {
    update: function(){
      var slideHeight = slideElement.clientHeight;
      var percentage = Math.min(_mouseY, slideHeight) / slideHeight;
      _rocketTween.set(1 - percentage);
      
      rocketElement.style.top = _rocketOffset[0] - _rocketTween.value * DISTANCE_MULTIPLIER * 0.92 + "px";
      rocketElement.style.left = _rocketOffset[1] - _rocketTween.value * DISTANCE_MULTIPLIER + "px";
      _panels.update(percentage);
    },
    start: function(){
      slideElement.addEventListener("mousemove", onMouseMove, false);
      _rocketTween.start();
      _panels.start(true);
    },
    stop: function(){
       _rocketTween.stop();
      _panels.stop();
      
      for (var i = panelVideos.length -1; i>-1; i--) {
        panelVideos[i].stop();
      }
    }
  });
  
  function onMouseMove(e) {
    _mouseY = e.clientY;
  }
});