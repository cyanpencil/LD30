// ---- Loaders e Rendering -----//
var scene, camera, renderer;
var projector;
var tga_loader, json_loader;
// ---------- Mappa -------------//
var map1 = new Array(1, 0, 0, 1, 1, 1, 0, 0, 1);
var map1_lenght = Math.sqrt(map1.length);
var map1_block_lenght = 5;
var map1_position_x = 0, map1_position_y = 0, map1_position_z = 20;
// -------- Modelli -------------//
var robe = [];
var cubetto1, obj;

$(function () {
	initialize();
	loadModels();

    setTimeout(engine_main_loop, 0);
});

function initialize() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0; camera.position.y = 20; camera.position.z = 80;
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({antialias : false});
    renderer.setClearColor( 0x000000, 0);
    renderer.setSize(window.innerWidth - 30, window.innerHeight - 60);
//	renderer.gammaInput = true;
//	renderer.gammeOutput = true;
//	renderer.physicallyBasedShading = true;
//	renderer.autoClear = false;

    projector = new THREE.Projector();  // initialize object to perform world/screen calculations

    document.addEventListener( 'mousedown', onDocumentMouseDown, false ); // when the mouse moves, call the given function

    $("#WebGL-output").append(renderer.domElement);                
//    makeGUI();

	//------------------- SSAO, o qualcosa del genere :D --------------------//
	var depthShader = THREE.ShaderLib[ "depthRGBA" ];
	var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );
	depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
	depthMaterial.blending = THREE.NoBlending;

	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, camera ) );

	depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
	
	var effect = new THREE.ShaderPass( THREE.SSAOShader );
	effect.uniforms[ 'tDepth' ].value = depthTarget;
	effect.uniforms[ 'size' ].value.set( window.innerWidth, window.innerHeight );
	effect.uniforms[ 'cameraNear' ].value = camera.near;
	effect.uniforms[ 'cameraFar' ].value = camera.far;
	effect.renderToScreen = true;
	composer.addPass( effect );
	//------------------------------------------------------------------------//

    var update = function() {
        requestAnimationFrame(update); //in pratica passo come argomento tutta la funzione update(), dicendogli che deve animarla all'infinito
        
        //Inserire qui tutte le funzioni di animazione (esempio i pesci che ondeggiano)
		//E tutte le cose che si devono ridisegnare in un certo modo ogni frame
//		for (var i in robe) {i.rotation.y += .1;}

        scene.overrideMaterial = depthMaterial;
		renderer.render( scene, camera, depthTarget );
		scene.overrideMaterial = null;
		composer.render();
    };
    update();
}

function createScene(geometry, x, y, z, scale, tmap) {
				tizia = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: tmap}));
				tizia.position.set(x, y, z);
				tizia.scale.set(scale, scale, scale);
				tizia.rotation.y = 1;
				scene.add(tizia);
				robe.push(tizia);
}

function loadModels() {
    var planeGeometry = new THREE.PlaneGeometry(120,80);
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x844d5e
    });
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.position.set(0,0,-20);
    scene.add(plane);

	tga_loader = new THREE.TGALoader();
	json_loader = new THREE.JSONLoader();
	var textureProva = tga_loader.load("palette_default.tga");
	callbackKey = function(geometry) {createScene(geometry,  0, 0, 0, 2, textureProva)};
	json_loader.load("chr_fox.js", callbackKey);
	callbackKey2 = function(geometry) {createScene(geometry,  20, -10, 0, 2, textureProva)};
	json_loader.load("furetto.js", callbackKey2);

	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.set(0, 0, 30);
	scene.add(pointLight);
        
	var OBJMTLLoader = new THREE.OBJMTLLoader();
	OBJMTLLoader.load('castle.obj', 'castle.mtl', function (object) {
		obj = object;
		obj.position.set(-10, -10, 0);
		scene.add(obj);
	});

    //--------GENERAZIONE DELLA MAPPA--------
    var boxTerrainGeometry = new THREE.BoxGeometry(5, 5, 5);
    var boxTerrainMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    
    for (var i=0; i < map1_lenght; i++){ 
		for(var j=0; j < map1_lenght; j++){
			if (map1[i * map1_lenght + j] === 1){
				var boxTerrain = new THREE.Mesh(boxTerrainGeometry,boxTerrainMaterial);
				boxTerrain.position.set(map1_position_x + j * map1_block_lenght, map1_position_y, map1_position_z + i * map1_block_lenght);
				scene.add(boxTerrain);
			}
        }
    }
    //---------------------------------------
}

function onDocumentMouseDown( event ) {

}