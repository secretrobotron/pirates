define(["../slide"], function(Slide){
	var CENTER_SIZE = 100;
	
	var _lastX = 0, _lastY = 0;
	var _slideElement = document.getElementById("deck-slide");
	var _ak47Element = document.getElementById("ak47");
	var _ak47NonBlurredElement = document.getElementById("ak47-non-blurred");
	var _ak47BlurredElement = document.getElementById("ak47-blurred");

  var slide = new Slide("deck-slide", {
    update: function(){
		// If mouse within center
		var halfWidth = window.innerWidth / 2;
		var halfHeight = window.innerHeight / 2;
		if (Math.abs(halfWidth - _lastX) < CENTER_SIZE &&
			Math.abs(halfHeight - _lastY) < CENTER_SIZE)
		{
			_ak47NonBlurredElement.style.opacity = 1;
			//_ak47BlurredElement.style.opacity = 0;
		}
		else
		{
			_ak47NonBlurredElement.style.opacity = 0;
			//_ak47BlurredElement.style.opacity = 1;
		}
    }
  });
  
  function onMouseMove(e){
    _lastX = e.clientX;  
	_lastY = e.clientY;
  }

  _slideElement.addEventListener("mousemove", onMouseMove, false);

});