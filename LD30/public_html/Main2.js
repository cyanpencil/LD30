var scene, camera, spotLight;
var targetList = [];
var projector, mouse = { x: 0, y: 0 };
var cubetto1, cubetto2, cubetto3;  
var icosaedro, icosaedro2;
var tutorial;

//var wave, wave2, wave3;
var bottone1, bottone2, bottone3, bottone4, bottone5;
var wave1, wave2, wave3, wave4, wave5, wave6, wave7;
var cubetto_boost1, cubetto_boost2, cubetto_boost3;
var cubetto_boost1_filler, cubetto_boost2_filler, cubetto_boost3_filler;
            
$(function () {
    
    scene = new THREE.Scene();
    
    var cameradelay = 40;
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 80;
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer({antialias : false});
    renderer.setClearColor( 0x000000, 0);
    renderer.setSize(window.innerWidth - 30, window.innerHeight - 60);
    
    

    //piano di prova
    var planeGeometry = new THREE.PlaneGeometry(200,120);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x044d5e
    });
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.castShadow = false;
    plane.receiveShadow  = false;
    //plane.rotation.x=-0.5*Math.PI;
    plane.position.x=-5;
    plane.position.y=40;
    plane.position.z=-15;
    scene.add(plane);
    
    var tutorialGeometry = new THREE.PlaneGeometry(110, 55);
    var tutorialTextureMap = THREE.ImageUtils.loadTexture("drawables/tutorial_1.png")
    var tutorialMaterial = new THREE.MeshPhongMaterial({
        map: tutorialTextureMap,
        transparent: true,
        emissive: 0xffffff
    });
    tutorial = new THREE.Mesh(tutorialGeometry, tutorialMaterial);
    tutorial.position.z = 15;
    tutorial.position.x = 0;
    tutorial.position.y = 9;
    scene.add(tutorial);
    
    //titolo
    var titleMap = THREE.ImageUtils.loadTexture("drawables/title.png");
    var titleGeometry = new THREE.PlaneGeometry(100, 75);
    var titleMaterial = new THREE.MeshPhongMaterial({
        emissive: 0x305b70,
        map: titleMap,
        transparent: true
    });
    var title = new THREE.Mesh(titleGeometry,titleMaterial);
    title.position.z = -13;
    scene.add(title);
    
    /////////////////////HERE COMES THE SUNSHINE
    
    
    
    
    
    
    
    
    
    
    
    ///////////////////ONDE SPLINE
    var numPoints = 100;

    spline = new THREE.SplineCurve3([
        new THREE.Vector3(0, -5, 0),
        new THREE.Vector3(15, 3, 0),
        new THREE.Vector3(30, -3, 0),
        new THREE.Vector3(45, 3, 0),
        new THREE.Vector3(60, -3, 0),
        new THREE.Vector3(75, 3, 0),
        new THREE.Vector3(90, -3, 0),
        new THREE.Vector3(105, 3, 0),
        new THREE.Vector3(120, -3, 0),
    ]);

    var material = new THREE.LineBasicMaterial({
        color: 0xffffff,
    });

    var geometry = new THREE.Geometry();
    var splinePoints = spline.getPoints(numPoints);

    for(var i = 0; i < splinePoints.length; i++){
        geometry.vertices.push(splinePoints[i]);  
    }
    wave1 = new THREE.Line(geometry, material);
    wave1.position.x = camera.position.x - 60;
    wave1.position.z = 18;
    scene.add(wave1);
    wave2 = new THREE.Line(geometry, material);
    wave2.position.x = camera.position.x - 58;
    wave2.position.z = 18;
    scene.add(wave2);
    wave3 = new THREE.Line(geometry, material);
    wave3.position.x = camera.position.x - 56;
    wave3.position.z = 18;
    scene.add(wave3);
    wave4 = new THREE.Line(geometry, material);
    wave4.position.x = camera.position.x - 56;
    wave4.position.z = 18;
    scene.add(wave4);
    wave5 = new THREE.Line(geometry, material);
    wave5.position.x = camera.position.x - 56;
    wave5.position.z = 18;
    scene.add(wave5);
    wave6 = new THREE.Line(geometry, material);
    wave6.position.x = camera.position.x - 56;
    wave6.position.z = 18;
    scene.add(wave6);
    wave7 = new THREE.Line(geometry, material);
    wave7.position.x = camera.position.x - 56;
    wave7.position.z = 18;
    scene.add(wave7);
    
    
    ///////////////////////////////////////////////// EWW RAYCASTING PROVA
    ///////////////////////////////////////////////// PROFESSIONAL RAYCASTING

    var unAltroMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    var unAltroMaterial2 = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, vertexColors: THREE.FaceColors, wireframe: true} );
    var faceColorMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: true} );
	
    var cubettoGeometry = new THREE.BoxGeometry(10, 10, 10);
    
    var cubetto1Material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: true} );
    var cubetto2Material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: true} );
    var cubetto3Material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: true} );
    var cubetto4Material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: true} );
    var cubetto5Material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, wireframe: true} );
    
    var bottoneGeometry = new THREE.PlaneGeometry(10, 10);
    
    var bottone1TextureMap = THREE.ImageUtils.loadTexture("drawables/bottonespeed.png");
    var bottone2TextureMap = THREE.ImageUtils.loadTexture("drawables/bottonesteer.png");
    var bottone3TextureMap = THREE.ImageUtils.loadTexture("drawables/bottonelight.png");
    var bottone4TextureMap = THREE.ImageUtils.loadTexture("drawables/bottoneboost.png");
    var bottone5TextureMap = THREE.ImageUtils.loadTexture("drawables/bottonesize.png");
    
    var bottone1Material = new THREE.MeshPhongMaterial({
        map: bottone1TextureMap,
        transparent: true,
        emissive: 0xffffff
    });
    
    var bottone2Material = new THREE.MeshPhongMaterial({
        map: bottone2TextureMap,
        transparent: true,
        emissive: 0xffffff
    });
    
    var bottone3Material = new THREE.MeshPhongMaterial({
        map: bottone3TextureMap,
        transparent: true,
        emissive: 0xffffff
    });
    
    var bottone4Material = new THREE.MeshPhongMaterial({
        map: bottone4TextureMap,
        transparent: true,
        emissive: 0xffffff
    });
    
    var bottone5Material = new THREE.MeshPhongMaterial({
        map: bottone5TextureMap,
        transparent: true,
        emissive: 0xffffff
    });
    
    bottone1 = new THREE.Mesh(bottoneGeometry, bottone1Material);
    bottone2 = new THREE.Mesh(bottoneGeometry, bottone2Material);
    bottone3 = new THREE.Mesh(bottoneGeometry, bottone3Material);
    bottone4 = new THREE.Mesh(bottoneGeometry, bottone4Material);
    bottone5 = new THREE.Mesh(bottoneGeometry, bottone5Material);
    
    bottone1.position.y = 40;
    bottone2.position.y = 40;
    bottone3.position.y = 40;
    bottone4.position.y = 40;
    bottone5.position.y = 40;
    
    scene.add(bottone1);
    scene.add(bottone2);
    scene.add(bottone3);
    scene.add(bottone4);
    scene.add(bottone5);
    
    cubetto1 = new THREE.Mesh(cubettoGeometry, cubetto1Material);
    cubetto2 = new THREE.Mesh(cubettoGeometry, cubetto2Material);
    cubetto3 = new THREE.Mesh(cubettoGeometry, cubetto3Material);
    cubetto4 = new THREE.Mesh(cubettoGeometry, cubetto4Material);
    cubetto5 = new THREE.Mesh(cubettoGeometry, cubetto5Material);
    cubetto1.position.y = 40;
    cubetto2.position.y = 40;
    cubetto3.position.y = 40;
    cubetto4.position.y = 40;
    cubetto5.position.y = 40;
    scene.add(cubetto1);
    scene.add(cubetto2);
    scene.add(cubetto3);
    scene.add(cubetto4);
    scene.add(cubetto5);

    targetList.push(cubetto1);
    targetList.push(cubetto2);
    targetList.push(cubetto3);
    targetList.push(cubetto4);
    targetList.push(cubetto5);
    
    
    //cubetti del boost!!!
    cubetto_boost1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), unAltroMaterial2); 
    cubetto_boost2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), unAltroMaterial2);
    cubetto_boost3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), unAltroMaterial2);
    
    cubetto_boost1_filler = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), unAltroMaterial);
    cubetto_boost2_filler = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), unAltroMaterial);
    cubetto_boost3_filler = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), unAltroMaterial);
    
    cubetto_boost1.position.z = 60;
    cubetto_boost2.position.z = 60;
    cubetto_boost3.position.z = 60;
    
    cubetto_boost1_filler.position.z = 60;
    cubetto_boost2_filler.position.z = 60;
    cubetto_boost3_filler.position.z = 60;
    
    cubetto_boost1_filler.scale.set(1, 0.01, 1);
    cubetto_boost2_filler.scale.set(1, 0.01, 1);
    cubetto_boost3_filler.scale.set(1, 0.01, 1);
    
    scene.add(cubetto_boost1);
    scene.add(cubetto_boost2);
    scene.add(cubetto_boost3);
    
    cubetto_boost2.visible = false;
    cubetto_boost3.visible = false;
    
    scene.add(cubetto_boost1_filler);
    scene.add(cubetto_boost2_filler);
    scene.add(cubetto_boost3_filler);

    // initialize object to perform world/screen calculations
    projector = new THREE.Projector();

    // when the mouse moves, call the given function
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    
    
    
    var icosaedroGeometry = new THREE.IcosahedronGeometry(2);
    icosaedro = new THREE.Mesh(icosaedroGeometry, faceColorMaterial);
    scene.add(icosaedro);
    icosaedro.rotation.z = 2;
    
    icosaedro2 = icosaedro.clone();
    scene.add(icosaedro2);

    $("#WebGL-output").append(renderer.domElement);                
    
    loadSprites();
    
    inizializzaModelli();
    
    setTimeout(engine_main_loop, 0);
    
    makeGUI();
    
    


    var update = function() {
        //in pratica passo come argomento tutta la funzione update(), dicendogli che deve animarla all'infinito
        requestAnimationFrame(update);
        
        
        
        //Inserire qui tutte le funzioni di animazione (esempio i pesci che ondeggiano)
        for (var i = 0; i < array_pesci.length; i++) {
            array_pesci[i].ondeggia();
            rotateAroundWorldAxis(array_pesci[i].mesh, new THREE.Vector3(0,0,1), array_pesci[i].angolo_dove_dovrebbe_guardare - array_pesci[i].angolo_direzione);
            array_pesci[i].angolo_direzione = array_pesci[i].angolo_dove_dovrebbe_guardare;
        }
        
        updateGUI();
        updateLuce();
        updateBoost();
        
        plane.position.x = camera.position.x;
        plane.position.y = camera.position.y;
        
        icosaedro.position.set(camera.position.x+18, camera.position.y-8, camera.position.z-30);
        icosaedro2.rotation.x += 1/64;
        icosaedro2.position.set(camera.position.x+18, camera.position.y-4, camera.position.z-30);
        icosaedro.rotation.x += 1/64;
        
        testo_profondita.mesh.position.set(camera.position.x+18, camera.position.y-8.3, camera.position.z-30);
        testo_monete.mesh.position.set(camera.position.x+18, camera.position.y-4.3, camera.position.z-30);

        testo_prezzo1.mesh.position.set(camera.position.x - 30, 30, 0);
        testo_prezzo2.mesh.position.set(camera.position.x - 15, 30, 0);
        testo_prezzo3.mesh.position.set(camera.position.x, 30, 0);
        testo_prezzo4.mesh.position.set(camera.position.x + 15, 30, 0);
        testo_prezzo5.mesh.position.set(camera.position.x + 30, 30, 0);
        
        
     
        
        
        renderer.render(scene, camera);
    };

    update();
});

function onDocumentMouseDown( event ) 
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	
        tutorial.visible = false;
        
	//console.log("Click.");
	scene.remove(tutorial);
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
        
        
	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( targetList );
	
	// if there is one (or more) intersections
	//if ( intersects.length > 0 )
	//{
		//console.log("Hit @ " + toString( intersects[0].point ) );
		// change the color of the closest face.
		//intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
                if (intersects[0].object==cubetto1) {
                    cubetto1.material.color.setRGB(1-(num_upgrade_velocita+1)*0.2, 1, 1 );
                    console.log("yeah1");
                    upgrade_velocita();
                }
                if (intersects[0].object==cubetto2) {
                    cubetto2.material.color.setRGB(1-(num_upgrade_manovrabilita+1)*0.2, 1, 1);
                    console.log("yeah2");
                    upgrade_manovrabilita();
                }
                if (intersects[0].object==cubetto3) {
                    cubetto3.material.color.setRGB(1-(num_upgrade_luce+1)*0.2, 1, 1);
                    console.log("yeah3");
                    upgrade_luce();
                }
                if (intersects[0].object==cubetto4) {
                    cubetto4.material.color.setRGB(1-(num_upgrade_boost+1)*0.3, 1, 1 );
                    console.log("yeah4");
                    upgrade_boost();
                }
                if (intersects[0].object==cubetto5) {
                    cubetto5.material.color.setRGB(1-(num_upgrade_size+1)*0.2, 1, 1 );
                    console.log("yeah5");
                    upgrade_size();
                }
		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	//}

}

