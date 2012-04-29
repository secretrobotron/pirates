define(["parallax"], function(Parallax){
  
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

  var __currentSlide = 0,
      __slides = [];

  function Slide(elementID, events){
    var _element = document.getElementById(elementID),
        _updateEvent = events.update || function(){},
        _stopFlag = false,
        _this = this;

    var _parallaxes = [];

    var parallaxElements = document.querySelectorAll("*[data-parallax]");
    for (var i = parallaxElements.length - 1; i >= 0; i--) {
      _parallaxes.push(new Parallax(parallaxElements[i]));
    };

    function updateLoop(){
      if(!_stopFlag){
        _updateEvent(_this);
        requestAnimFrame(updateLoop);
      }
    }

    this.start = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].start();
      };
      _element.setAttribute("current", true);
      _stopFlag = false;
      requestAnimFrame(updateLoop);
    };

    this.stop = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].stop();
      };
      _element.removeAttribute("current");
      _stopFlag = true;
    };

    this.startParallaxes = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].start();
      };
    };

    this.stopParallaxes = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].stop();
      };
    };

    this._element = _element;
    this._parallaxes = _parallaxes;

    __slides.push(this);
  }

  Slide.slides = __slides;

  Slide.sort = function(){
    Slide.slides.sort(function(a, b){
      return a._element.getAttribute("data-order") > b._element.getAttribute("data-order");
    });  
  };

  Slide.play = function(){
    __currentSlide = 0;
    __slides[0].start();
  };

  Slide.next = function(){
    __slides[__currentSlide].stop();
    var nextSlide = __slides[++__currentSlide];
    nextSlide.start();
  };

  return Slide;

});