define(["../slide", "../panels"], function(Slide, Panels){

  var AFTER_ROCKET_TIME = 11.2;

  var slideElement = document.getElementById("motorboat-slide"),
      video = slideElement.querySelector("#motorboat-slide video");

  function onVideoEnded(e){
    Slide.play("ship-slide");
  }

  var slide = new Slide("motorboat-slide", {
    update: function(){
    },
    start: function(slide, options){
      // last slide, user chose to explode things with rockets
      if(!options){
        video.currentTime = AFTER_ROCKET_TIME;
      }
      video.play();
      video.addEventListener("ended", onVideoEnded, false);
    },
    stop: function(){
      video.pause();
      video.removeEventListener("ended", onVideoEnded, false);
    }
  });

});