(function(){

  var _parallaxElements;

  document.addEventListener("mousemove", function(e){
    var diffX = e.clientX - window.innerWidth / 2,
        diffY = e.clientY - window.innerHeight / 2;

    for (var i = _parallaxElements.length - 1; i >= 0; i--) {
      var element = _parallaxElements[i];
      element.style.top = (window.innerHeight / 2) - (element.clientHeight / 2) - diffY * 0.05 + "px";
      element.style.left = (window.innerWidth / 2) - (element.clientWidth / 2) - diffX * 0.05 + "px";
    };

  }, false);

  document.addEventListener("DOMContentLoaded", function(e){
    _parallaxElements = document.querySelectorAll("*[data-parallax]");
  }, false);

}());
