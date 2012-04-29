define(["tween", "rAFLoop"], function(Tween, rAFLoop){
  
  var MIN_PANEL_WIDTH = 50,
      GROWTH_FACTOR = 0.7,
      MAX_PANEL_PERCENT = 0.3;

  return function(slideElement, threshold, ramp, lamp){

    var _this = this,
        _threshold = threshold || 0.5,
        _ramp = ramp || 1,
        _lamp = lamp || 1;

    _this.last = _threshold;

    var _leftPanel = slideElement.querySelector("*[data-choice-panel='left']"),
        _rightPanel = slideElement.querySelector("*[data-choice-panel='right']");

    var _leftTween = new Tween(),
        _rightTween = new Tween();

    var _leftMovie = _leftPanel.getElementsByTagName("video")[0],
        _rightMovie = _rightPanel.getElementsByTagName("video")[0];

    var _updateLoop = new rAFLoop(function(){
      var maxPanelWidth = slideElement.clientWidth * MAX_PANEL_PERCENT,
          lp = _leftTween.value / maxPanelWidth,
          rp = _rightTween.value / maxPanelWidth;
      _leftPanel.style.width = Math.max(MIN_PANEL_WIDTH, _leftTween.value) + "px";
      _rightPanel.style.width = Math.max(MIN_PANEL_WIDTH, _rightTween.value) + "px";
      if(_leftMovie){
        _leftMovie.volume = lp;
      }
      if(_rightMovie){
        _rightMovie.volume = lp;
      }
    });

    this.update = function(p){
      var maxPanelWidth = slideElement.clientWidth * MAX_PANEL_PERCENT;
      if(p > _threshold){
        _rightTween.set(Math.min(maxPanelWidth, p * _ramp * maxPanelWidth));
      }
      else{
        _rightTween.set(MIN_PANEL_WIDTH);
      }
      if(p < _threshold){
        _leftTween.set(Math.min(maxPanelWidth, (1-p) * _lamp * maxPanelWidth));
      }
      else{
        _leftTween.set(MIN_PANEL_WIDTH);
      }
      _this.last = p;
    };

    function onMouseMove(e){
      var diff = Math.max(0, Math.min(1,-window.innerWidth / 2 + e.clientX));
      _this.update(diff);
    }

    this.start = function(noMouse){
      if(!noMouse){
        window.addEventListener("mousemove", onMouseMove, false);
      }
      _this.last = _threshold;
      _updateLoop.start();
      _rightTween.start();
      _leftTween.start();
    };

    this.stop = function(noMouse){
      window.removeEventListener("mousemove", onMouseMove, false);
      _updateLoop.stop();
      _rightTween.stop();
      _leftTween.stop();
    };

  };

});