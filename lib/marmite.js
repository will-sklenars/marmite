
module.exports = Marmite

var THREE = require('three')
var $ = require('jquery')
var TOOLS = require('./tools')

function Marmite (opts) {
  this.createdAt = performance.now()/1000
  this.mesh = this.createMesh()
  this.rotationParams = this.createRotationParams()
  this.translationParams = this.createTranslationParams()
}

Marmite.prototype.createMesh = function () {
  var geometry = new THREE.CylinderGeometry(75, 75, 150, 70, 5, false)
  var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ) )
  var caps = mesh.geometry.faces.slice(-140)
  var bottomcaps = caps.slice(-70)
  var topcaps = caps.slice(0,70)
  $.each(topcaps, function(index, value) { value.materialIndex = 2;})
  $.each(bottomcaps, function(index, value) { value.materialIndex = 1;})
  return mesh
}

Marmite.prototype.createTranslationParams = function () {
  var translationParams = []
    for (var i = 0; i < 3; i++) {
      // the first of the two `getRandom` assigns the speed of the movement, the 2nd is to assign how far the object will move on each oscilation
      translationParams.push([TOOLS.getRandomNumber(0, 0.8), TOOLS.getRandomNumber(0, 5000)])
    }
  return translationParams
}

Marmite.prototype.createRotationParams = function () {
  var rotationParams = []
  for (var i = 0; i < 3; i++) {
    rotationParams.push(TOOLS.getRandomNumber(0, 5))
  }
  return rotationParams
}

Marmite.prototype.update = function(delta, now) {
  this.mesh.rotation.x = (now - this.createdAt) * this.rotationParams[0]
  this.mesh.rotation.y = (now - this.createdAt) * this.rotationParams[1]
  this.mesh.rotation.z = (now - this.createdAt) * this.rotationParams[2]

  this.mesh.position.x = Math.sin( (now - this.createdAt) * this.translationParams[0][0] ) * this.translationParams[0][1]
  this.mesh.position.y = Math.sin( (now - this.createdAt) * this.translationParams[1][0] ) * this.translationParams[1][1]
  this.mesh.position.z = Math.sin( (now - this.createdAt) * this.translationParams[2][0] ) * this.translationParams[2][1]
}

Marmite.prototype.addToScene = function (scene) {
  scene.add(this.mesh)
}

var labelmap = THREE.ImageUtils.loadTexture('../images/marmitegasm_label2.jpg')
var topmap = THREE.ImageUtils.loadTexture('../images/cap_red.jpg')
var bottommap = THREE.ImageUtils.loadTexture('../images/bottom.jpg')

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