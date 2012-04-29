define(["../slide", "../panels"], function(Slide, Panels){
  var VIDEO_END_WINDOW = 50;
  
  var slideElement = document.getElementById("start-slide");
  var videoElement = document.getElementById("start-video");
  
  var slide = new Slide("start-slide", {
    update: function(){
      // Move to next slide when video has finished
      if (videoElement.currentTime > videoElement.duration - VIDEO_END_WINDOW) {
        Slide.play("waiting-slide");
      }
    },
    start: function(){
      videoElement.play();
    },
    stop: function(){
      
    }
  });
});