define([
    "slide",
  ], function(Slide){


  var slides = document.querySelectorAll(".slide[data-src]"),
      srcs = [];
  for (var i = slides.length - 1; i >= 0; i--) {
    var src = slides[i].getAttribute("data-src");
    srcs.push("slides/" + src);
  };

  require(srcs, function(){
    Slide.sort();

    setTimeout(function(){
      Slide.play();
    }, 10);
  });

});