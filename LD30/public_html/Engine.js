//Questo engine viene chiamato dentro Main, con setTimeout(engine_main_loop, 0), creando un altro thread
var t = Date.now();
var t_tick = 20;
var variazione = 0.05;
var t_sleep, lastFrameTime = 0, framesTime = 0, startFrame = 0;
function engine_main_loop() {    
    //fps
    lastFrameTime = Date.now() - startFrame;
    framesTime = (framesTime *(1 - variazione) + lastFrameTime*variazione);
    startFrame = Date.now();
    //motore
    tick();
    //loop
    t += t_tick;
    t_sleep = t - Date.now();
    if (t_sleep > 0) {setTimeout(engine_main_loop, t_sleep);}
    else {engine_main_loop();}
}

//Funzione chiamata da engine_main_loop. Chiamata 1/t_tick volte al secondo.
function tick() {
	aggiornaPosizioni();
}

function aggiornaPosizioni() {
		obj.rotation.x += .1;
		for (var i = 0; i < robe.length; i++) {robe[i].rotation.y += .01;}
}