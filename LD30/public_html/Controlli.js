document.addEventListener('keydown', function(event) {
	if (!possoFareTurno()) return;
    if(event.keyCode == 37|| event.keyCode == 65) {
//        left_arrow_pressed = true;
		protagonista.girati(2);
		protagonista.avanzaUno();
    }
    else if(event.keyCode == 39|| event.keyCode == 68) {
//        right_arrow_pressed = true;
		protagonista.girati(1);
		protagonista.avanzaUno();
    }
    if (event.keyCode == 38 || event.keyCode == 87) {
//        up_arrow_pressed = true;
		protagonista.girati(3);
		protagonista.avanzaUno();
    }
    else if(event.keyCode == 40|| event.keyCode == 83) {
//        down_arrow_pressed = true;
		protagonista.girati(0);
		protagonista.avanzaUno();
    }
    else if (event.keyCode == 32) {
		protagonista.attacca();
    }
	turno();
});