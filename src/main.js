require([
    "slide",
    "slides/slide1",
    //"slides/slide2",
	"slides/slide3"
  ], function(Slide){

  Slide.sort();

  setTimeout(function(){
    Slide.play();
  }, 10);

});