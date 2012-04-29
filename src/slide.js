define(["parallax"], function(Parallax){
  
  return function(element){
    var _parallaxes = [];

    var parallaxElements = document.querySelectorAll("*[data-parallax]");

    for (var i = parallaxElements.length - 1; i >= 0; i--) {
      _parallaxes.push(new Parallax(parallaxElements[i]));
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

});