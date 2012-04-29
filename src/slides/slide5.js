define(["../slide", "../panels"], function(Slide, Panels){
  
  var slideElement = document.getElementById("start-slide");
  var videoElement = document.getElementById("start-video");
  
  var slide = new Slide("start-slide", {
    update: function(){
      // Move to next slide when video has finished
    },
    start: function(){
      _panels.start();
    },
    stop: function(){
      _panels.stop();
    }
  });
  
  function onEnded(e) {
    console.log("ENDED");
  }
  
  videoElement.addEventListener("ended", onEnded, false);
});