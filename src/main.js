require([], function(){

  var _mousePosition = [0, 0],
      _currentViewPosition = [0, 0];

  var gl = CubicVR.init();
  var canvas = CubicVR.getCanvas();

  if (!gl) {
      alert("Sorry, no WebGL support.");
      return;
  };

  var scene = new CubicVR.loadCollada("assets/collada/map.dae","assets/media");
  scene.camera = new CubicVR.Camera(canvas.width, canvas.height, 60);
  scene.camera.position = [0, 0, 20];
  scene.camera.target = [0, 0, -1];

  var _cameraLight = new CubicVR.Light({
    type:CubicVR.enums.light.type.POINT,
    intensity: 1,
    diffuse: [1, 1, 1],
    specular: [1, 1, 1],
    position: [0, 0, 0.1]
  });

  scene.bindLight(_cameraLight);

  CubicVR.addResizeable(scene);

  document.addEventListener("mousemove", function(e){
    _mousePosition = [
      e.clientX,
      e.clientY
    ];
  }, false);

  CubicVR.MainLoop(function(timer, gl) {
    var xDiff =  (_mousePosition[0] - canvas.width / 2) * 0.001;
    var yDiff =  (_mousePosition[1] - canvas.height / 2) * 0.001;

    _currentViewPosition[0] -= (_currentViewPosition[0] - xDiff) * 0.1;
    _currentViewPosition[1] -= (_currentViewPosition[1] - yDiff) * 0.1;

    scene.camera.position[2] -= 0.05;
    
    scene.camera.target = [
      _currentViewPosition[0],
      _currentViewPosition[1],
      scene.camera.position[2] - 1
    ];

    _cameraLight.position = scene.camera.position.slice();

    scene.evaluate(timer.getSeconds());
    scene.render();
  });

  mvc = new CubicVR.MouseViewController(canvas, scene.camera);

});