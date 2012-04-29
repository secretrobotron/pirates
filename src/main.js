require([
    "slide",
    "slides/slide1",
    "slides/slide2"
  ], function(Slide){

  Slide.sort();

  Slide.play();

});