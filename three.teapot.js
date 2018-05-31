var canvas = document.querySelector('canvas');

var geometry = new THREE.BufferGeometry();
geometry.setIndex(flatten(teapot.cells));
geometry.addAttribute('position', new THREE.Float32BufferAttribute(flatten(teapot.positions), 3));
var material = new THREE.MeshBasicMaterial({color: 0xff0000});
var mesh = new THREE.Mesh(geometry, material);
var scene = new THREE.Scene();
scene.add(mesh);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
