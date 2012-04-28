(function(){

  var PARALLAX_FACTOR = 0.1;

  var _parallaxElements,
      _slides;

  window.addEventListener("mousemove", function(e){
    var diffX = e.clientX - window.innerWidth / 2,
        diffY = e.clientY - window.innerHeight / 2;

    for (var i = _parallaxElements.length - 1; i >= 0; i--) {
      var element = _parallaxElements[i];
      element.style.left = (-diffX - element.clientWidth / 2) * PARALLAX_FACTOR + "px";
      element.style.top = (-diffY - element.clientHeight / 2) * PARALLAX_FACTOR + "px";
    }
  }, false);

  window.addEventListener("click", function(e){
    console.log("32234234");
  }, false);

  document.addEventListener("DOMContentLoaded", function(e){
    _parallaxElements = document.querySelectorAll("*[data-parallax]");
    _slides = document.getElementsByClassName("slide");
  }, false);

}());
