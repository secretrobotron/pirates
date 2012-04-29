define(["../slide"], function(Slide){
  
  var slide = new Slide("death-slide",{
    update: function(){

    },
    start: function(){
      slide._element.getElementsByTagName("video")[0].play();
    },
    stop: function(){
      slide._element.getElementsByTagName("video")[0].pause();
    }
  });

});