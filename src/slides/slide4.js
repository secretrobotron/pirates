define(["../slide", "../panels"], function(Slide, Panels){
  // Wait for panels to display after a certain amount of time...
  var SHOW_PANELS_DELAY = 5.0,
      VIDEO_END_WINDOW = 2;
  
  var slideElement = document.getElementById("waiting-slide");
  var panels = document.querySelectorAll("#waiting-slide > [data-choice-panel]");
  var centerVideo = document.getElementById("waiting-video");
  
  var showingPanels = false;
  var _panels = new Panels(slideElement);

  var slide = new Slide("waiting-slide", {
    update: function(){
      
      if (!showingPanels && centerVideo.currentTime >= SHOW_PANELS_DELAY) {
        for (var i = panels.length - 1; i >= 0; i--) {
          panels[i].style.opacity = 1;
        }
        
        showingPanels = true;
      }

      if(centerVideo.currentTime > centerVideo.duration - VIDEO_END_WINDOW){
        if(_panels.last === 0){
          //right
          Slide.play("deck-slide");
        }
        else{
          //left
          Slide.play("ship-slide");
        }
      }
      
      // Check if video has ended
      
    },
    start: function(){
      _panels.start();
    },
    stop: function(){
      _panels.stop();
    }
  });

});