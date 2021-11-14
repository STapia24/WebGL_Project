let scene, camera, renderer, controls, light, listener, audioLoader, geometry, texture, material;
let court, ball, net;

const courtTexture = new THREE.TextureLoader().load('textures/CourtTexture.jpg'),
netTexture = new THREE.TextureLoader().load('textures/NetTexture.jpg'),
courtMaterial = new THREE.MeshStandardMaterial( {map: courtTexture} ),
netMaterial = new THREE.MeshStandardMaterial( {map: netTexture} );

const init = function(){
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add(camera);

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Net
geometry = new THREE.PlaneGeometry(11.07, 0.91);
net = new THREE.Mesh( geometry, netMaterial );
net.position.y = 0.464;
scene.add( net );

// The tennis court
geometry = new THREE.PlaneGeometry( 12.97, 25.78 );
court = new THREE.Mesh( geometry, courtMaterial);
court.rotation.x = -1 * Math.PI / 2;
court.position.x = 0;
court.position.y = 0;
court.position.z = 0;

// Tennis Ball
geometry = new THREE.SphereGeometry(0.12, 32, 16);
material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
ball = new THREE.Mesh( geometry, material );
scene.add( ball );

scene.add( court );

camera.position.z = 30;
camera.position.y = 3;
}

const animate = function() {
	requestAnimationFrame( animate );



	renderer.render( scene, camera );
};

init();
animate();