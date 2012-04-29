define([], function(){

  var PARALLAX_FACTOR = 0.08;

  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  return function(element){
    var _originalPosition = [element.offsetLeft, element.offsetTop],
        _parallaxFactor = element.getAttribute("data-parallax-z") || PARALLAX_FACTOR,
        _parallaxAxis = element.getAttribute("data-parallax-axis") || "xy",
        _targetPosition = _originalPosition.slice(),
        _currentPosition = _originalPosition.slice(),
        _stopFlag = false,
        _this = this;

    function onMouseMove(e){
      var diffX = e.clientX - window.innerWidth / 2,
          diffY = e.clientY - window.innerHeight / 2;

      if(_parallaxAxis.indexOf("x") > -1){
        _targetPosition[0] = _originalPosition[0] + (-diffX - element.clientWidth / 2) * _parallaxFactor;
      }
      if(_parallaxAxis.indexOf("y") > -1){
        _targetPosition[1] = _originalPosition[1] + (-diffY - element.clientHeight / 2) * _parallaxFactor;
      }
    }


    function updateLoop(){
      if(!_stopFlag){
        _currentPosition[0] -= (_currentPosition[0] - _targetPosition[0]) * 0.1;
        _currentPosition[1] -= (_currentPosition[1] - _targetPosition[1]) * 0.1;
        element.style.left = _currentPosition[0] + "px";
        element.style.top = _currentPosition[1] + "px";
        requestAnimFrame(updateLoop);
      }
    }

    this.start = function(){
      window.addEventListener("mousemove", onMouseMove, false);
      _stopFlag = false;
      requestAnimFrame(updateLoop);
    };

    this.stop = function(){
      window.removeEventListener("mousemove", onMouseMove, false);
      _stopFlag = true;
    };

    _this._element = element;
  }

});