define(["tween", "rAFLoop"], function(Tween, rAFLoop){
  
  var MIN_PANEL_WIDTH = 50,
      GROWTH_FACTOR = 0.7;

  return function(slideElement){

    var _this = this;

    var _leftPanel = slideElement.querySelector("*[data-choice-panel='left']"),
        _rightPanel = slideElement.querySelector("*[data-choice-panel='right']");

    var _leftTween = new Tween(),
        _rightTween = new Tween();

    var _updateLoop = new rAFLoop(function(){
      _leftPanel.style.width = Math.max(MIN_PANEL_WIDTH, _leftTween.value) + "px";
      _rightPanel.style.width = Math.max(MIN_PANEL_WIDTH, _rightTween.value) + "px";
    });

    function onMouseMove(e){
      var diff = -(window.innerWidth / 2 - e.clientX),
          slideWidthPortion = slideElement.clientWidth/5,
          thirdSlideWidth = slideElement.clientWidth/3;
      if(diff > slideWidthPortion){
        _rightTween.set(Math.min(thirdSlideWidth, diff * GROWTH_FACTOR));
      }
      else{
        _rightTween.set(MIN_PANEL_WIDTH);
      }
      if(diff < -slideWidthPortion){
        _leftTween.set(Math.min(thirdSlideWidth, -diff * GROWTH_FACTOR));
      }
      else{
        _leftTween.set(MIN_PANEL_WIDTH);
      }
    }

    this.start = function(){
      window.addEventListener("mousemove", onMouseMove, false);
      _updateLoop.start();
      _rightTween.start();
      _leftTween.start();
    };

    this.stop = function(){
      window.removeEventListener("mousemove", onMouseMove, false);
      _updateLoop.stop();
      _rightTween.stop();
      _leftTween.stop();
    };

  };

});