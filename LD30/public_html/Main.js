var scene, camera, renderer;
var projector;
var tga_loader, json_loader;
var robe = [];
            
var cubetto1, obj;

var map1 = new Array(1, 0, 0, 1, 1, 1, 0, 0, 1);
//var boxTerrain;

$(function () {
    
	initialize();
    
    var planeGeometry = new THREE.PlaneGeometry(120,80);
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x844d5e
    });
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    //plane.rotation.x=-0.5*Math.PI;
    plane.position.x=0;
    plane.position.y=0;
    plane.position.z=-20;
    scene.add(plane);
    
    //--------GENERAZIONE DELLA MAPPA--------
    var boxTerrainGeometry = new THREE.BoxGeometry(5, 5, 5);
    var boxTerrainMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    
    for (var i=0; i<Math.sqrt(map1.length); i++){ 
            for(var j=0; j<Math.sqrt(map1.length); j++){
                if (map1[i*Math.sqrt(map1.length)+j] === 1){
                    var boxTerrain = new THREE.Mesh(boxTerrainGeometry,boxTerrainMaterial);
                    boxTerrain.position.x = j*5;
                    boxTerrain.position.y = 0;
                    boxTerrain.position.z = 20 + i*5;
                  scene.add(boxTerrain);
           }
        }
    }
    //---------------------------------------
    

	tga_loader = new THREE.TGALoader();
	json_loader = new THREE.JSONLoader();
	var textureProva = tga_loader.load("palette_default.tga");
	callbackKey = function(geometry) {createScene(geometry,  0, 0, 0, 2, textureProva)};
	json_loader.load("chr_fox.js", callbackKey);


	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.set(0, 0, 30);
	scene.add(pointLight);
        
        
	
	var loader = new THREE.OBJMTLLoader();
	loader.load('castle.obj', 'castle.mtl', function (object) {
		obj=object;
		obj.position.y = -10;
		obj.scale.set(1,1,1);
                obj.rotation.y = 10;
		scene.add(obj);
	});
	


    
//    var cubettoGeometry = new THREE.BoxGeometry(10, 10, 10);
//    var cubetto1Material = new THREE.MeshBasicMaterial({color: 0xffffff});
//    cubetto1 = new THREE.Mesh(cubettoGeometry, cubetto1Material);
//    scene.add(cubetto1);

});

function initialize() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0; camera.position.y = 20; camera.position.z = 80;
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({antialias : false});
    renderer.setClearColor( 0x000000, 0);
    renderer.setSize(window.innerWidth - 30, window.innerHeight - 60);
	renderer.gammaInput = true;
	renderer.gammeOutput = true;
	renderer.physicallyBasedShading = true;
	
	renderer.autoClear = false;

    // initialize object to perform world/screen calculations
    projector = new THREE.Projector();

    // when the mouse moves, call the given function
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    $("#WebGL-output").append(renderer.domElement);                
    
//    loadSprites();
//    inizializzaModelli();
    setTimeout(engine_main_loop, 0);
//    makeGUI();




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

    var update = function() {
        //in pratica passo come argomento tutta la funzione update(), dicendogli che deve animarla all'infinito
        requestAnimationFrame(update);
        
        
        //Inserire qui tutte le funzioni di animazione (esempio i pesci che ondeggiano)
		//E tutte le cose che si devono ridisegnare in un certo modo ogni frame
//		cubetto1.rotation.x += .1;
		for (var i = 0; i < robe.lenght; i++) {robe[i].rotation.y += .1;}
        //obj.rotation.y += .01;
        scene.overrideMaterial = depthMaterial;
		renderer.render( scene, camera, depthTarget );

		scene.overrideMaterial = null;
		composer.render();
    };
    update();
}

function createScene(geometry, x, y, z, scale, tmap) {
				tizia = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({map: tmap}));
//				tizia = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({map: tga_loader.load("palette_default.tga")}));
				tizia.position.set(x, y, z);
				tizia.scale.set(scale, scale, scale);
				robe.push(tizia);
				scene.add(tizia);
}

function onDocumentMouseDown( event ) {

}

