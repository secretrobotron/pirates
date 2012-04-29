define([], function(){
  
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

  return function(update){

    var _this = this,
        _stopFlag = true;

    function loop(){
      if(!_stopFlag){
        update();
        requestAnimFrame(loop);
      }
    }

    _this.start = function(){
      _stopFlag = false;
      requestAnimFrame(loop);
    };

    _this.stop = function(){
      _stopFlag = false;
    };

  };

});