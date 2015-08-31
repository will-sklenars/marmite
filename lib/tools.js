var TOOLS = {}
module.exports = TOOLS

var $ = require('jquery')
var THREE = require('three')

TOOLS.navbarHTML = '<p><a href="https://github.com/SkwynethPaltrow" target="_blank">will</a></p><p><a href="https://github.com/hoanganhdinhtrinh" target="_blank">hoang</a></p><p><a href="https://github.com/kylesnowschwartz" target="_blank">kyle</a></p><p><a href="https://github.com/teaiheb" target="_blank">te aihe</a></p> <p class="close_nav">(close)</p>'


TOOLS.getRandomNumber = function(min, max) {
 return Math.random() * (max - min) + min;
}

TOOLS.createMarmite = function () {
  var geometry = new THREE.CylinderGeometry(75, 75, 150, 70, 5, false)
  var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ) )
  var caps = mesh.geometry.faces.slice(-140)
  var bottomcaps = caps.slice(-70)
  var topcaps = caps.slice(0,70)
  $.each(topcaps, function(index, value) { value.materialIndex = 2;})
  $.each(bottomcaps, function(index, value) { value.materialIndex = 1;})
  return mesh
}

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