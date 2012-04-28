require([], function(){

  var gl = CubicVR.init();
  var canvas = CubicVR.getCanvas();

  if (!gl) {
      alert("Sorry, no WebGL support.");
      return;
  };

  var scene = new CubicVR.loadCollada("assets/collada/map.dae","assets/media");
  scene.camera = new CubicVR.Camera(canvas.width, canvas.height, 80);
  scene.camera.position = [0, 0, 0];
  scene.camera.target = [0, 0, -1];

  scene.bindLight(
    new CubicVR.Light({
      type:CubicVR.enums.light.type.SPOT,
      intensity: 20,
      diffuse: [1, 1, 1],
      specular: [1, 1, 1],
      position: [0, 0, 0.1]
    })
  );

  CubicVR.addResizeable(scene);

  CubicVR.MainLoop(function(timer, gl) {
    scene.render();
  });

  mvc = new CubicVR.MouseViewController(canvas, scene.camera);

});