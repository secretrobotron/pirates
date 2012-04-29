define(["../slide", "../rAFLoop", "../tween", "../swipe"], function(Slide, rAFLoop, Tween, Swipe){

  var _stoppedParallax = false,
      _titleElement = document.getElementById("intro-title"),
      _arrow = document.getElementById("intro-arrow"),
      _arrowTween = new Tween(0),
      _lastX = window.innerWidth,
      _swipe;

  function checkAssets(){
    var videos = document.getElementsByTagName("video"),
        loaded = 0;
    for (var i = videos.length - 1; i >= 0; i--) {
      if(videos[i].readyState === 4){
        ++loaded;
      }
    }
    if(loaded < videos.length){
      document.getElementById("loading").innerHTML = "Loading... " + loaded + "/" + videos.length;
      return false;
    }
    return true;
  }

  var slide = new Slide("intro-slide", {
    update: function(){
      var rect = _titleElement.getBoundingClientRect();
      _arrow.style.opacity = (_arrowTween.value);
    },
    start: function(){
      _arrowTween.start();
      var loadCheckInterval = setInterval(function(){
        if(checkAssets()){
          document.getElementById("loading").style.display = "none";
          clearInterval(loadCheckInterval);
          _swipe.start();
          _titleElement.addEventListener("click", function(e){
            next();
          }, false);
          document.getElementById("waiting-slide-left").currentTime = 5;
        }
      }, 500);
    },
    stop: function(){
      _arrowTween.stop();
      _swipe.stop();
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

});