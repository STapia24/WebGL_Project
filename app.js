let scene, camera, renderer, controls, light, listener, audioLoader, geometry, texture, material;
let court, ball, net, ball1, ball2, ball3, ball4, ball5, ball6;

const courtTexture = new THREE.TextureLoader().load('textures/CourtTexture0.jpg'),
netTexture = new THREE.TextureLoader().load('textures/NetTexture.jpg'),
ballTexture = new THREE.TextureLoader().load('textures/BallTexture.png'),
domeTexture = new THREE.TextureLoader().load('textures/OutsideTexture.jfif'),
floorTexture = new THREE.TextureLoader().load('textures/GrassTexture.jpg'),
courtMaterial = new THREE.MeshStandardMaterial( {map: courtTexture, side: THREE.DoubleSide} ),
netMaterial = new THREE.MeshBasicMaterial( {map: netTexture, side: THREE.DoubleSide} ),
ballMaterial = new THREE.MeshStandardMaterial( {map: ballTexture} ),
domeMaterial = new THREE.MeshBasicMaterial( {map: domeTexture, side: THREE.BackSide} ),
floorMaterial = new THREE.MeshStandardMaterial({map: floorTexture});

const ballInitialZ = 13, 
ballInitialY = 0.1,
ballInitialX = 4.5;

let directionX = -1,
directionZ = -1;


const init = function(){
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);

renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x3a3b3c);
document.body.appendChild(renderer.domElement);

light = new THREE.PointLight(0xffffff, 2, 0, 2);
light.castShadow = true;

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 200;

light.position.x = 1;
light.position.y = 30;
light.position.z = 1;

scene.add(light);

// Net
geometry = new THREE.PlaneGeometry(15.07, 0.91);
net = new THREE.Mesh(geometry, netMaterial);
net.position.y = 0.464;
scene.add(net);

// Tennis Court
geometry = new THREE.PlaneGeometry(50, 30);
court = new THREE.Mesh( geometry, courtMaterial);
court.rotation.x = -1 * Math.PI / 2;
court.rotation.z = -1 * Math.PI / 2;
court.position.x = 0;
court.position.y = 0;
court.position.z = 0;
court.receiveShadow = true;
scene.add(court);

// Moving Tennis Ball
geometry = new THREE.SphereGeometry(0.12, 32, 16);
ball = new THREE.Mesh(geometry, ballMaterial);
ball.position.z = ballInitialZ;
ball.position.y = ballInitialY;
ball.position.x = ballInitialX;
ball.castShadow = true;
scene.add(ball);

//Static Ball 1
geometry = new THREE.SphereGeometry(0.12, 32, 16);
ball1 = new THREE.Mesh(geometry, ballMaterial);
ball1.position.z = 22;
ball1.position.y = 0.1;
ball1.position.x = 0.3;
ball1.castShadow = true;
scene.add(ball1);

// Static Ball 2
geometry = new THREE.SphereGeometry(0.12, 32, 16);
ball2 = new THREE.Mesh(geometry, ballMaterial);
ball2.position.z = 22;
ball2.position.y = 0.1;
ball2.position.x = -0.2;
ball2.castShadow = true;
scene.add(ball2);

//Static Ball 3
geometry = new THREE.SphereGeometry(0.12, 32, 16);
ball3 = new THREE.Mesh(geometry, ballMaterial);
ball3.position.z = 21.6;
ball3.position.y = 0.1;
ball3.position.x = 0.1;
ball3.castShadow = true;
scene.add(ball3);

geometry = new THREE.SphereGeometry(0.12, 32, 16);
ball4 = new THREE.Mesh(geometry, ballMaterial);
ball4.position.z = 21.6;
ball4.position.y = 0.1;
ball4.position.x = 0.5;
ball4.castShadow = true;
scene.add(ball4);

geometry = new THREE.SphereGeometry(0.12, 32, 16);
ball5 = new THREE.Mesh(geometry, ballMaterial);
ball5.position.z = 21.5;
ball5.position.y = 0.1;
ball5.position.x = -0.5;
ball5.castShadow = true;
scene.add(ball5);

geometry = new THREE.SphereGeometry(0.12, 32, 16);
ball6 = new THREE.Mesh(geometry, ballMaterial);
ball6.position.z = 21.1;
ball6.position.y = 0.1;
ball6.position.x = 0.1;
ball6.castShadow = true;
scene.add(ball6);

// Ambient Dome
geometry = new THREE.SphereGeometry(30, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const dome = new THREE.Mesh(geometry, domeMaterial);
dome.position.x = 0;
dome.position.y = 0;
dome.position.z = 0;
scene.add(dome);

camera.position.z = 20;
camera.position.y = 3;

geometry = new THREE.PlaneGeometry(60, 60);
material = new THREE.MeshBasicMaterial( {color: 0x394571} )
floor = new THREE.Mesh(geometry, floorMaterial);
floor.rotation.x = -1 * Math.PI / 2;
floor.rotation.z = -1 * Math.PI / 2;
floor.position.x = 0;
floor.position.y = -0.01;
floor.position.z = 0;
floor.receiveShadow = true;
scene.add(floor);

controls = new THREE.OrbitControls(camera, renderer.domElement);
}

const animate = function() {
	requestAnimationFrame(animate);

	controls.update();

	light.target = net;

	if(directionZ == -1){

		if(ball.position.z != -13){
			if(ball.position.z >= 0){
				ball.position.x -= 0.25;
				ball.position.z -= .8125;
				ball.position.y += 0.1;
			} 
			else if(ball.position.z <= 0){
				ball.position.x -= 0.25;
				ball.position.z -= .8125;
				ball.position.y -= 0.1;
			}		
		} 
		else { 
			ball.position.y = 0.1;
			directionZ = 1
		}
	} 
	

	if(directionZ == 1) {	
		
		if(ball.position.z != 13){
			if(ball.position.z <= 0){
				ball.position.x += 0.25;
				ball.position.z += .8125;
				ball.position.y += 0.1;
			} 
			else if(ball.position.z >= 0){
				ball.position.x += .25;
				ball.position.z += .8125;
				ball.position.y -= 0.1;
			}		
		}
		else { 
			ball.position.y = 0.1;
			directionZ = -1
		}
	} 

		ball.rotation.x -= 0.1;
		ball.rotation.z -= 0.05;

	renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();