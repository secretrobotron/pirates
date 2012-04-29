define([], function(){

  var PARALLAX_FACTOR = 0.08;

  return function(element){
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

});