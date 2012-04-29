define(["../slide", "../panels"], function(Slide, Panels){

  var _elapsedTime = 0;
  var slideElement = document.getElementById("ship-slide"),
      videos = slideElement.querySelectorAll("*[data-choice-panel] video");
      
  // Seperate elements
  var peopleElements = [document.getElementById("hostage-left"), document.getElementById("hostage-right"),
    document.getElementById("hijacker-right"), document.getElementById("hijacker-left")];
  var peopleOffsets = [peopleElements[0].offsetTop, peopleElements[1].offsetTop,
    peopleElements[2].offsetTop, peopleElements[3].offsetTop];
  
  var shipElements = [document.getElementById("ship-background"), document.getElementById("ship-foreground")];
  var shipOffsets = [
    [shipElements[0].offsetTop, shipElements[0].offsetLeft],
    [shipElements[1].offsetTop, shipElements[1].offsetLeft]];

  var _panels = new Panels(slideElement);

  var slide = new Slide("ship-slide", {
    update: function(){
      _elapsedTime += 0.1;
      
      // Calculate offsets
      var offsetX = Math.sin(_elapsedTime * 0.2) * 16;
      var offsetY = Math.sin(_elapsedTime * 0.55) * 4;
      
      // Apply offsets
      for (var i = peopleElements.length - 1; i > -1; i--) {
        peopleElements[i].style.top = peopleOffsets[i] + offsetY + "px";
      }
      for (var i = shipElements.length - 1; i > -1; i--) {
        shipElements[i].style.top = shipOffsets[i][0] + offsetY + "px";
        shipElements[i].style.left = shipOffsets[i][1] + offsetX + "px";
      }
    },
    start: function(){
    },
    stop: function(){
    }
  });

});