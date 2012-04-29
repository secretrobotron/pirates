define(["rAFLoop"], function(rAFLoop){
  
  var SIZE = 100;

  return function(parent, time, params){

    var _this = this;

    var _time = time || 1000,
        _starTime; 

    var _canvas = document.createElement("canvas");
    _canvas.width = SIZE;
    _canvas.height = SIZE;

    _canvas.className = "timer";

    var _ctx = _canvas.getContext("2d");

    var _updateLoop = new rAFLoop(function(){
      var timeLeft = _time - (Date.now() - _starTime),
          p = Math.max(0.01, timeLeft/_time);
      _ctx.lineCap = "round";
      _ctx.lineWidth = 10;
      _ctx.clearRect(0, 0, SIZE, SIZE);
      _ctx.beginPath();
      //_ctx.moveTo(SIZE/2, SIZE/2);
      _ctx.strokeStyle = "#fff";
      _ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      _ctx.arc(SIZE/2, SIZE/2, SIZE/2 - 10, 0, Math.PI*2*(1-p), true);
      //_ctx.lineTo(SIZE/2, SIZE/2);
      //_ctx.fill();
      _ctx.stroke();
    });

    parent.appendChild(_canvas);

    this.start = function(){
      _updateLoop.start();
      _starTime = Date.now();
    };

    this.stop = function(){
      _updateLoop.stop();
    };

  };

});