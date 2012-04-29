define(["../slide", "../panels", "../timer"], function(Slide, Panels, Timer){
	var CENTER_RECT = [408, 209, 200, 130],
			THRESHOLD = 0.5,
			RADIUS = 250;
	
	var _lastX = 0, _lastY = 0, _elapsedTime = 0;
	var _slideElement = document.getElementById("deck-slide");
	var _deckBackgroundElement = document.getElementById("deck-background");
	var _deckBackgroundBlurredElement = document.getElementById("deck-background-blurred");
	var _ak47Element = document.getElementById("ak47");
	var _ak47NonBlurredElement = document.getElementById("ak47-non-blurred");
	var _ak47BlurredElement = document.getElementById("ak47-blurred");
	
	var _panels = new Panels(_slideElement, THRESHOLD, 1, 2);

	var _centerPoint = [window.innerWidth / 2, window.innerHeight / 2];

	var _timer = new Timer(_slideElement, 10000, {
    complete: function(){
      if(_panels.last < THRESHOLD){
        Slide.play("death-slide");
      }
      else{
        Slide.play("peace-slide");
      }
    }
  });

  var slide = new Slide("deck-slide", {
	
		update: function() {
			// Move a little with a sin
			_elapsedTime += 0.1;
			_deckBackgroundElement.style.left = Math.sin(_elapsedTime * 0.2) * 16 + "px";
			_deckBackgroundElement.style.top = Math.sin(_elapsedTime * 0.55) * 4 + "px";
			
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

			var diff = [ _centerPoint[0] - _lastX, _centerPoint[1] - _lastY ],
					length = Math.sqrt(diff[0]*diff[0] + diff[1]*diff[1]);

			var p = length / RADIUS;
			_panels.update(p);

		},
		start: function(){
			setTimeout(function(){
				_panels.start(true);
				_timer.start();
			}, 1000);
      var panelVideos = document.querySelectorAll("#deck-slide video");
      for (var i = panelVideos.length - 1; i > -1; i--) {
        panelVideos[i].play();
      }
		},
		stop: function(){
			_panels.stop();
			_timer.stop();
      var panelVideos = document.querySelectorAll("#deck-slide video");
      for (var i = panelVideos.length - 1; i > -1; i--) {
        panelVideos[i].pause();
      }
		}
  });
  
  function onMouseMove(e){
    _lastX = e.clientX;  
		_lastY = e.clientY;
  }

  _slideElement.addEventListener("mousemove", onMouseMove, false);

});