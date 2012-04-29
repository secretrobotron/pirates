define(["../slide", "../tween", "../timer"], function(Slide, Tween, Timer){

  var DISTANCE_MULTIPLIER = 30;
  var SLIDE_DURATION = 7000;
  var _mouseY = 0;
  var slideElement = document.getElementById("rocket-slide");
  var rocketElement = document.getElementById("rocket");

  var _videos = slideElement.querySelectorAll("video");
  
  var _rocketTween = new Tween(0.5);
  var _rocketOffset = [rocketElement.offsetTop, rocketElement.offsetLeft];

  var _lastPercentage = 0.5;

  var _timer = new Timer(slideElement, SLIDE_DURATION, {
    complete: function(){
      Slide.play("motorboat-slide", _lastPercentage > 0.5);
    }
  });
  
  var panelVideos = document.querySelectorAll("#rocket-slide > [data-choice-panel] video");
  
  var slide = new Slide("rocket-slide", {
    update: function(){
      var slideHeight = slideElement.clientHeight;
      var percentage = Math.min(_mouseY, slideHeight) / slideHeight;
      _rocketTween.set(1 - percentage);
      
      rocketElement.style.top = _rocketOffset[0] - _rocketTween.value * DISTANCE_MULTIPLIER * 0.92 + "px";
      rocketElement.style.left = _rocketOffset[1] - _rocketTween.value * DISTANCE_MULTIPLIER + "px";
      _panels.update(percentage);
      _lastPercentage = percentage;
    },
    start: function(){
      slideElement.addEventListener("mousemove", onMouseMove, false);
      _rocketTween.start();
      _timer.start();
      document.querySelector("#rocket-slide [data-choice-panel='left'] video").currentTime = 6;
      document.querySelector("#rocket-slide [data-choice-panel='right'] video").currentTime = 16;
      for (var i = _videos.length - 1; i >= 0; i--) {
        _videos[i].play();
      };
    },
    stop: function(){
       _rocketTween.stop();
      for (var i = _videos.length - 1; i >= 0; i--) {
        _videos[i].pause();
      };
    }
  });
  
  function onMouseMove(e) {
    _mouseY = e.clientY;
  }
});