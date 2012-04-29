define(["../slide"], function(Slide){
	var CENTER_SIZE = 100;
	
	var _lastX = 0, _lastY = 0;
	var _slideElement = document.getElementById("deck-slide");

  var slide = new Slide("deck-slide", {
    update: function(){
		// If mouse within center
		var halfWidth = window.innerWidth / 2;
		var halfHeight = window.innerHeight / 2;
		if (Math.abs(halfWidth - _lastX) < CENTER_SIZE &&
			Math.abs(halfHeight - _lastY) < CENTER_SIZE)
		{
			// Play transation
		}
    }
  });
  
  function onMouseMove(e){
    _lastX = e.clientX;  
	_lastY = e.clientY;
  }

  _slideElement.addEventListener("mousemove", onMouseMove, false);

});