define([], function(){

  SWIPE_DISTANCE = 100;
  
  return function(onSwipeSuccess, onSwipeFail){

    var _lastX,
        _startTime,
        _this = this;

    function onMouseMove(e){
      if(e.clientX < _lastX){
        _lastX = e.clientX;
        onSwipeFail(0);
      }
      else{
        var diff = e.clientX - _lastX;
        if(diff > SWIPE_DISTANCE){
          onSwipeSuccess();
        }
        else{
          _lastX = e.clientX;
          onSwipeFail(Math.max(0, Math.min(1, diff/SWIPE_DISTANCE))); 
        }
      }
    }

    this.start = function(){
      window.addEventListener("mousemove", onMouseMove, false);
      _lastX = window.innerWidth;
    };

    this.stop = function(){
      window.removeEventListener("mousemove", onMouseMove, false);
    };

  };

});