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
	//fai attenzione a questa linea
	setTimeout(aggiornaPosizioni, 0); //potrebbe rallentare molto. Attenzione. Non fare stupidaggini
}

function aggiornaPosizioni() {
		obj.rotation.x += .1;
		for (var i = 0; i < robe.length; i++) {robe[i].rotation.y += .01;}

		for (var i = 0; i < meshes.length; i++) {meshes[i].rotation.y += .01;}
		for (var i = 0; i < personaggi.length; i++) {personaggi[i].update();}
//		protagonista.avanzaUno();
}


function possoFareTurno() {
	if (Date.now() - whenTurnoStarted < turnoDuration) return false;
	else return true;
}

var whenTurnoStarted;
var turnoDuration = 300;
function turno() {
	//boh fai qualcosa
	whenTurnoStarted = Date.now();

}
		for (var i = 0; i < meshes.length; i++) {meshes[i].rotation.y += .01;}
		for (var i = 0; i < personaggi.length; i++) {personaggi[i].update();}
//		protagonista.avanzaUno();
}


function possoFareTurno() {
	if (Date.now() - whenTurnoStarted < turnoDuration) return false;
	else return true;
}

var whenTurnoStarted;
var turnoDuration = 300;
function turno() {
	//boh fai qualcosa
	whenTurnoStarted = Date.now();
}
