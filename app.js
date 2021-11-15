let scene, camera, renderer, controls, light, listener, audioLoader, geometry, texture, material;
let court, ball, net;

const courtTexture = new THREE.TextureLoader().load('textures/CourtTexture.jpg'),
netTexture = new THREE.TextureLoader().load('textures/NetTexture.jpg'),
ballTexture = new THREE.TextureLoader().load('textures/BallTexture.png'),
courtMaterial = new THREE.MeshBasicMaterial( {map: courtTexture, side: THREE.DoubleSide} ),
netMaterial = new THREE.MeshBasicMaterial( {map: netTexture, side: THREE.DoubleSide} ),
ballMaterial = new THREE.MeshBasicMaterial( {map: ballTexture} );

const ballInitialZ = 10, 
ballInitialY = 0.464;


const init = function(){
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add(camera);

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Net
geometry = new THREE.PlaneGeometry(11.07, 0.91);
material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
net = new THREE.Mesh( geometry, netMaterial );
net.position.y = 0.464;
scene.add( net );

// The tennis court
geometry = new THREE.PlaneGeometry( 12.97, 27.78 );
material = new THREE.MeshBasicMaterial( { color: 0x458169, side: THREE.DoubleSide } );
court = new THREE.Mesh( geometry, courtMaterial);
court.rotation.x = -1 * Math.PI / 2;
court.position.x = 0;
court.position.y = 0;
court.position.z = 0;
scene.add( court );

// Tennis Ball
geometry = new THREE.SphereGeometry(0.12, 32, 16);
material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
ball = new THREE.Mesh( geometry, ballMaterial );
ball.position.z = ballInitialZ;
ball.position.y = ballInitialY;
scene.add( ball );

camera.position.z = 20;
camera.position.y = 3;

controls = new THREE.OrbitControls(camera, renderer.domElement);
}

const animate = function() {
	requestAnimationFrame( animate );



	renderer.render( scene, camera );
};

init();
animate();