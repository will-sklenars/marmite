var container
var lastTimeMsec
var marmites = []
var camera, controls, scene, renderer
var onRenderFcts = []

var THREE = require('three')
var TOOLS = require('./lib/tools')
var $ = require('jquery')
var Marmite = require('./lib/marmite');

require('./lib/CanvasRenderer')
require('./lib/OrbitControls')

init()

function init() {

  // ---------------------- set up scene ---------------------
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 30000 );
  camera.position.x = -50
  camera.position.y = -50
  camera.position.z = -50

  controls = new THREE.OrbitControls( camera );

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );
}

// ---------------------- user interaction ------------------------

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

document.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown() {
  var marmite = new Marmite()
  marmite.addToScene(scene)
  marmites.push(marmite)
}

// --------------------update marmites----------------------------

onRenderFcts.push( function (delta, now) {
  marmites.forEach( function (marmite) {
    marmite.update(delta, now)
  })
})

// ------------------render the scene--------------------------

onRenderFcts.push(function () {
  renderer.render( scene, camera );
})

// ----------------------RAF loop------------------------------

requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec  = nowMsec
  // call each update function
  onRenderFcts.forEach(function(onRenderFct){
    onRenderFct(deltaMsec/1000, nowMsec/1000)
  })
})
