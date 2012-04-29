define(["../slide", "../panels"], function(Slide, Panels){

  var slideElement = document.getElementById("ship-slide");

  var _panels = new Panels(slideElement);

  var slide = new Slide("ship-slide", {
    update: function(){
    },
    start: function(){
      _panels.start();
    },
    stop: function(){
      _panels.stop();
    }
  });

});