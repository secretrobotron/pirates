define(["rAFLoop"], function(rAFLoop){

  DEFAULT_SPEED = 0.1;
  
  return function(value, speed){

    var _updateLoop,
        _speed = speed || DEFAULT_SPEED,
        _target = value || 0,
        _this = this;

    _this.value = _target || 0;

    function update(){
      _this.value -= (_this.value - _target) * _speed;
    }

    _updateLoop = new rAFLoop(update);
    _this.stop = _updateLoop.stop;
    _this.start = _updateLoop.start;

    _this.set = function(newValue){
      _target = newValue;
    };
    
  };

});