define(["slide"], function(Slide){

  var __slides = [];

  var slideElements = document.getElementsByClassName("slide");
  for (var i = slideElements.length - 1; i >= 0; i--) {
    __slides.push(new Slide(slideElements[i]));
  };
  __slides.sort(function(a, b){
    return a.element.getAttribute("data-order") > b.element.getAttribute("data-order");
  });
  __slides[0].start();


});
