(function(){

  var PARALLAX_FACTOR = 0.08;

  var __slides = [];

  function Slide(element){
    var _parallaxes = [];

    var parallaxElements = document.querySelectorAll("*[data-parallax]");

    for (var i = parallaxElements.length - 1; i >= 0; i--) {
      _parallaxes.push(new ParallaxItem(parallaxElements[i]));
    };

    this.start = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].start();
      };
      element.setAttribute("current", true);
    };

    this.stop = function(){
      for (var i = _parallaxes.length - 1; i >= 0; i--) {
        _parallaxes[i].stop();
      };
      element.removeAttribute("current");
    };

    this.element = element;
  }

  function ParallaxItem(element){
    var originalPosition = [element.offsetLeft, element.offsetTop],
        parallaxFactor = element.getAttribute("data-parallax-z") || PARALLAX_FACTOR,
        parallaxAxis = element.getAttribute("data-parallax-axis") || "xy";

    function onMouseMove(e){
      var diffX = e.clientX - window.innerWidth / 2,
          diffY = e.clientY - window.innerHeight / 2;

      if(parallaxAxis.indexOf("x") > -1){
        element.style.left = originalPosition[0] + (-diffX - element.clientWidth / 2) * parallaxFactor + "px";  
      }
      if(parallaxAxis.indexOf("y") > -1){
        element.style.top = originalPosition[1] + (-diffY - element.clientHeight / 2) * parallaxFactor + "px";
      }
    }

    this.start = function(){
      window.addEventListener("mousemove", onMouseMove, false);
    };

    this.stop = function(){
      window.removeEventListener("mousemove", onMouseMove, false);
    };
  }

  document.addEventListener("DOMContentLoaded", function(e){
    var slideElements = document.getElementsByClassName("slide");
    for (var i = slideElements.length - 1; i >= 0; i--) {
      __slides.push(new Slide(slideElements[i]));
    };
    __slides.sort(function(a, b){
      return a.element.getAttribute("data-order") < b.element.getAttribute("data-order");
    });
    __slides[0].start();
  }, false);

}());
