define(["../slide"], function(Slide){
  
  function onVideoEnded(){
    Slide.play("peace-slide");
  }

  var slide = new Slide("reverse-slide",{
    update: function(){

    },
    start: function(){
      var video = slide._element.getElementsByTagName("video")[0];
      video.play();
      video.addEventListener("ended", onVideoEnded, false);

    },
    stop: function(){
      var video = slide._element.getElementsByTagName("video")[0];
      video.pause();
      video.removeEventListener("ended", onVideoEnded, false);
    }
  });

});