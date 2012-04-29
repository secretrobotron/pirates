define(["../slide", "../panels"], function(Slide, Panels){

  var slideElement = document.getElementById("ship-slide"),
      videos = slideElement.querySelectorAll("*[data-choice-panel] video");

  var _panels = new Panels(slideElement);

  var slide = new Slide("ship-slide", {
    update: function(){
    },
    start: function(){
      _panels.start();
      for (var i = videos.length - 1; i >= 0; i--) {
        videos[i].play();
      };
    },
    stop: function(){
      _panels.stop();
      for (var i = videos.length - 1; i >= 0; i--) {
        videos[i].pause();
      };
    }
  });

});