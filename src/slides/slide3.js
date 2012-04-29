define(["../slide"], function(Slide){
	var CENTER_RECT = [408, 209, 200, 130];
	
	var _lastX = 0, _lastY = 0, _lastTime = 0;
	var _slideElement = document.getElementById("deck-slide");
	var _deckBackgroundElement = document.getElementById("deck-background");
	var _deckBackgroundBlurredElement = document.getElementById("deck-background-blurred");
	var _ak47Element = document.getElementById("ak47");
	var _ak47NonBlurredElement = document.getElementById("ak47-non-blurred");
	var _ak47BlurredElement = document.getElementById("ak47-blurred");

  var slide = new Slide("deck-slide", {
	
	update: function() {
		// Move a little with a sin
		_lastTime += 0.1;
		_deckBackgroundElement.style.left = Math.sin(_lastTime * 0.2) * 16 + "px";
		_deckBackgroundElement.style.top = Math.sin(Math.sin(_lastTime)) * 4 + "px";
		
		// Check mouse center
		var centerX = CENTER_RECT[0] + parseInt(_slideElement.style.left);
		if (((_lastX > centerX) && (_lastX < CENTER_RECT[2] + centerX)) &&
			((_lastY > CENTER_RECT[1]) && (_lastY < CENTER_RECT[3] + CENTER_RECT[1])))
		{
			_ak47Element.style.webkitTransform = _ak47Element.style.transform = "rotate(5deg)";
			_ak47BlurredElement.style.opacity = 0;
			_deckBackgroundBlurredElement.style.opacity = 1;
		}
		else
		{
			_ak47Element.style.webkitTransform = _ak47Element.style.transform = "rotate(-15deg)";
			_ak47BlurredElement.style.opacity = 1;
			_deckBackgroundBlurredElement.style.opacity = 0;
		}
    }
  });
  
  function onMouseMove(e){
    _lastX = e.clientX;  
	_lastY = e.clientY;
  }

  _slideElement.addEventListener("mousemove", onMouseMove, false);

});