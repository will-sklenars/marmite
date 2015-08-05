var rotationParamsArray = []
var revolutionParamsArray = []

var THREE = require('three')
var $ = require('jquery')

require('./lib/CanvasRenderer')
require('./lib/OrbitControls')
require('./lib/Projector')
require('./lib/nav')

var scene = new THREE.Scene();

//the commented code is for toast planet and universe backdrop
// var light = new THREE.PointLight(0xEEEEEE);
// light.position.set(20, 0, 20);
// scene.add(light);

// // Load the background texture
// var backgroundtexture = THREE.ImageUtils.loadTexture( '../images/universe.jpg' );
// var backgroundMesh = new THREE.Mesh(
//     new THREE.PlaneGeometry( 2, 2, 0 ),
//     new THREE.MeshBasicMaterial({
//         map: backgroundtexture
//     }));

//   backgroundMesh .material.depthTest = false;
//   backgroundMesh .material.depthWrite = false;

//   // Create your background scene
//   var backgroundScene = new THREE.Scene();
//   var backgroundCamera = new THREE.Camera();
//   backgroundScene .add(backgroundCamera );
//   backgroundScene .add(backgroundMesh );

var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2050

var controls = new THREE.OrbitControls( camera );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2()

// --------------------------- navbar ---------------------------

var container = document.createElement( 'div' );
document.body.appendChild( container );

var openNav = document.createElement( 'div' );
openNav.class = 'open_nav'
openNav.innerHTML = '<a class="open_nav">team marmite</a>';
container.appendChild( openNav );

var navjar = document.createElement('nav');
navjar.style.textAlign = 'center';
navjar.innerHTML = '<p><a href="https://github.com/SkwynethPaltrow" target="_blank">will</a></p><p><a href="https://github.com/hoanganhdinhtrinh" target="_blank">hoang</a></p><p><a href="https://github.com/kylesnowschwartz" target="_blank">kyle</a></p><p><a href="https://github.com/teaiheb" target="_blank">te aihe</a></p> <p class="close_nav">(close)</p>';
document.body.appendChild( navjar )

// ---------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

// var toastmap = THREE.ImageUtils.loadTexture('../images/hi_res_toast.jpg');
var geometry = new THREE.SphereGeometry( 7000, 80, 80 );
// var material = new THREE.MeshBasicMaterial( {map: toastmap, side: THREE.DoubleSide} );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent: true, side: THREE.DoubleSide} );
var toast = new THREE.Mesh(geometry, material )
scene.add( toast )

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
// document.addEventListener( 'mousedown', onDocumentMouseDownShift, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
window.addEventListener( 'resize', onWindowResize, false );



function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentTouchStart( event ) {

  event.preventDefault();

  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;
  onDocumentMouseDown( event );

}

function onDocumentMouseDown( event ) {

  // event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( [toast] );

  if ( intersects.length > 0 ) {

  var labelmap = THREE.ImageUtils.loadTexture('../images/marmitegasm_label2.jpg');
  var topmap = THREE.ImageUtils.loadTexture('../images/cap_red.jpg');
  var bottommap = THREE.ImageUtils.loadTexture('../images/bottom.jpg');

  var materials = [
  new THREE.MeshBasicMaterial(
      {
        map: labelmap
      }),
  new THREE.MeshBasicMaterial(
      {
        map: bottommap
      }),
  new THREE.MeshBasicMaterial(
      {
        map: topmap
      })
  ]

  var geometry = new THREE.CylinderGeometry(75, 75, 150, 70, 5, false)
  // var material = new THREE.MeshBasicMaterial( {map: map} );

  var marmite = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ) )
  var cylinderEdges = new THREE.EdgesHelper( marmite, 0xffffff);

  var caps = marmite.geometry.faces.slice(-140)
  var bottomcaps = caps.slice(-70)
  var topcaps = caps.slice(0,70)
  $.each(topcaps, function(index, value) { value.materialIndex = 2;})
  $.each(bottomcaps, function(index, value) { value.materialIndex = 1;})

  material.vertexColors = THREE.FaceColors;

  marmite.position.copy(intersects[ 0 ].point )
  marmite.position.z += getRandomNumber(800, 1500)
  marmite.initialPosition = [marmite.position.x, marmite.position.y, marmite.position.z]

  marmite.scale.set(2,2,2)

  rotationParams = []
  for (var i = 0; i < 3; i++) {
    rotationParams.push(getRandomNumber(0.003, 0.0001))
  };
  marmite.rotationParams = rotationParams // adding the rotation params to the marmite object

  revolutionParams = []
  for (var i = 0; i < 3; i++) {
    // the first of the two `getRandom` assigns the speed of the movement, the 2nd is to assign how far the object will move on each oscilation
    revolutionParams.push([getRandomNumber(0.00009, 0.0003), getRandomNumber(500, 1000)]);
  };
  marmite.revolutionParams = revolutionParams; // adding the movement to the marmite object


  marmites.push( marmite ) //push marmite to an array for easy reference in the render function
  scene.add( marmite );

  var intersects2 = raycaster.intersectObjects( marmites )


  }
  if (intersects2.length > 0  ){
  console.log(event)
      intersected_marmite = intersects2[0].object

    scene.remove(intersected_marmite);
    scene.remove(marmite);
  };
}

var marmites = []

function render() {
  requestAnimationFrame( render );

  for ( var i = 0; i < marmites.length; i++){
      marmites[i].rotation.x = Date.now() * marmites[i].rotationParams[0];
      marmites[i].rotation.y = Date.now() * marmites[i].rotationParams[1];
      marmites[i].rotation.z = Date.now() * marmites[i].rotationParams[2];

      marmites[i].position.x = Math.sin( Date.now() * marmites[i].revolutionParams[0][0] ) * marmites[i].revolutionParams[0][1] + marmites[i].initialPosition[0];
      marmites[i].position.y = Math.sin( Date.now() * marmites[i].revolutionParams[1][0] ) * marmites[i].revolutionParams[1][1] + marmites[i].initialPosition[1];
      marmites[i].position.z = Math.sin( Date.now() * marmites[i].revolutionParams[2][0] ) * marmites[i].revolutionParams[2][1] + marmites[i].initialPosition[2];
  }


  renderer.autoClear = false;
  renderer.clear();
  // renderer.render(backgroundScene , backgroundCamera );
  renderer.render(scene, camera);
}
render();

function getRandomNumber(min, max) {
   return Math.random() * (max - min) + min;
}

var audio = new Audio('../audio/danube.mp3');
audio.play();

