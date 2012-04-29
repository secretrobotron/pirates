define(["../slide"], function(Slide){
	var CENTER_RECT = [200, 130];
	
	var _lastX = 0, _lastY = 0;
	var _centerRectX = 0, _centerRectY = 0;
	
	var _slideElement = document.getElementById("deck-slide");
	var _twoMenElement = document.getElementById("two-men");
	var _twoMenNonBlurredElement = document.getElementById("two-men-non-blurred");
	var _twoMenBlurredElement = document.getElementById("two-men-blurred");
	var _deckBackgroundElement = document.getElementById("two-men");
	var _ak47Element = document.getElementById("ak47");
	var _ak47NonBlurredElement = document.getElementById("ak47-non-blurred");
	var _ak47BlurredElement = document.getElementById("ak47-blurred");
	
	_centerRectX = _twoMenElement.offsetLeft;
	_centerRectY = _twoMenElement.offsetTop;

  var slide = new Slide("deck-slide", {
	
	update: function(){
		// If mouse within center
		var centerX = _centerRectX + parseInt(_slideElement.style.left);
		if (((_lastX > centerX) && (_lastX < CENTER_RECT[0] + centerX)) &&
			((_lastY > _centerRectY) && (_lastY < CENTER_RECT[1] + _centerRectY)))
		{
			_ak47Element.style.webkitTransform = _ak47Element.style.transform = "rotate(5deg)";
			_ak47BlurredElement.style.opacity = 0;
			_twoMenBlurredElement.style.opacity = 1;
		}
		else
		{
			_ak47Element.style.webkitTransform = _ak47Element.style.transform = "rotate(-15deg)";
			_ak47BlurredElement.style.opacity = 1;
			_twoMenBlurredElement.style.opacity = 0;
		}
    }
  });
  
  function onMouseMove(e){
    _lastX = e.clientX;  
	_lastY = e.clientY;
  }

  _slideElement.addEventListener("mousemove", onMouseMove, false);

});