// create the geometry
var positions = new THREE.Float32BufferAttribute(flatten(teapot.positions), 3);
var cells = flatten(teapot.cells);
var geometry = new THREE.BufferGeometry();
geometry.addAttribute('position', positions);
geometry.setIndex(cells);

// create the material
var material = new THREE.MeshBasicMaterial({color: 0xff0000});

// combine them to form a mesh
var mesh = new THREE.Mesh(geometry, material);

// add it to a scene
var scene = new THREE.Scene();
scene.add(mesh);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a renderer and render it
var canvas = document.querySelector('canvas');
var renderer = new THREE.WebGLRenderer({canvas: canvas});

var theta = 0;
var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  camera.position.setFromSpherical({radius: 30, phi: Math.PI / 2, theta: theta});
  camera.lookAt(0, 0, 0);
  theta += 0.005;
}
animate();

function flatten(ary) {
    return ary.reduce((acc, val) => acc.concat(val), []);
}
