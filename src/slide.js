define(["parallax", "rAFLoop"], function(Parallax, rAFLoop){
  
  var __currentSlide = 0,
      __slides = [];

  function Slide(elementID, events){
    var _element = document.getElementById(elementID),
        _updateEvent = events.update || function(){},
        _startEvent = events.start || function(){},
        _stopEvent = events.stops || function(){},
        _stopFlag = false,
        _rAFLoop,
        _this = this;

    var _parallaxes = [];

    var parallaxElements = document.querySelectorAll("*[data-parallax]");
    for (var i = parallaxElements.length - 1; i >= 0; i--) {
      _parallaxes.push(new Parallax(parallaxElements[i]));
    };

    function updateLoop(){
      _updateEvent(_this);
    }

    _rAFLoop = new rAFLoop(updateLoop);

    this.start = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].start();
      };
      _element.style.left = window.innerWidth + 100 + "px";
      _element.setAttribute("current", true);
      setTimeout(function(){
        _element.style.left = window.innerWidth / 2 - _element.clientWidth / 2 + "px";
        _rAFLoop.start();
        _startEvent(_this);
      }, 10);
    };

    this.stop = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].stop();
      };
      _element.style.left = (-_element.clientWidth - 100) + "px";
      setTimeout(function(){
        _rAFLoop.stop();
        _element.removeAttribute("current");
        _stopEvent(_this);
      }, 1000);
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

    _element.style.left = window.innerWidth + 100 + "px";

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