//ATTENZIONE:
//DIREZIONI:
// 0 - SUD
// 1 - EST
// 2 - OVEST
// 3 - NORD

Personaggio.prototype = new THREE.Object3D();
Personaggio.prototype.constructor = Personaggio;

var AZIONE_ATTACCA = 0;
var AZIONE_MUOVI = 1;


function Personaggio(mesh, x, y, z) {
	THREE.Object3D.call(this);
	this.mesh = mesh;
	this.add(mesh);
	this.direzione = 0;
	this.step_length = 5;
	this.durataAttacco = 0.3;
	
	this.position.x = x;
	this.position.y = y;
	this.position.z = z;
	this.target_x = this.position.x;
	this.target_y = this.position.y;
	this.target_z = this.position.z;
	this.old_x = this.position.x;
	this.old_y = this.position.x;
	this.old_z = this.position.x;
	
	this.hasWeapon = false;
	this.weapon = null;
	this.weapon_x = -6;
	this.weapon_y = 4;
	this.weapon_z = 0;
	
	this.prossimaAzione = 0;
}

Personaggio.prototype.update = function() {
	if (this.prossimaAzione == AZIONE_MUOVI) {
		var ratio = (Date.now() - whenTurnoStarted) / turnoDuration;
		if (ratio < 1) {
			this.position.x = this.old_x + (this.target_x - this.old_x) * ratio;
			this.position.y = this.old_y + (this.target_y - this.old_y) * ratio;
			this.position.z = this.old_z + (this.target_z - this.old_z) * ratio;
		}
		else {
			this.position.set(this.target_x, this.target_y, this.target_z);
		}
	}
	else if (this.prossimaAzione == AZIONE_ATTACCA) {
		var ratio = (Date.now() - whenTurnoStarted) / turnoDuration;
		if (this.hasWeapon) {
			if (ratio < this.durataAttacco) 						this.weapon.rotation.x += .3;
			else if (ratio > 1 - this.durataAttacco && ratio < 1) 	this.weapon.rotation.x -= .3;
			else if (ratio > 1) 									this.weapon.rotation.x = 0;
		}
		else {
			if (ratio < this.durataAttacco) 						this.mesh.position.z += .3;
			else if (ratio > 1 - this.durataAttacco && ratio < 1) 	this.mesh.position.z -= .3;
			else if (ratio > 1) 									this.mesh.position.z = 0;
		}
	}
}

Personaggio.prototype.girati = function(direzione) {
	switch(direzione) {
		case 0: this.rotation.y = 0;				break;
		case 1: this.rotation.y = Math.PI/2;		break;
		case 2: this.rotation.y = Math.PI * 3 / 2;	break;
		case 3: this.rotation.y = Math.PI;			break;
	}
	this.direzione = direzione;
}

Personaggio.prototype.avanzaUno = function () {
	this.old_x = this.position.x;
	this.old_y = this.position.y;
	this.old_z = this.position.z;
	switch(this.direzione) {
		case 0: this.target_z += this.step_length;	break;
		case 1: this.target_x += this.step_length;	break;
		case 2: this.target_x -= this.step_length;	break;
		case 3: this.target_z -= this.step_length;	break;
	}
	this.prossimaAzione = AZIONE_MUOVI;
}

Personaggio.prototype.attacca = function() {
	this.prossimaAzione = AZIONE_ATTACCA;
}

Personaggio.prototype.addWeapon = function (weapon) {
	this.hasWeapon = true;
	this.weapon = weapon;
	this.weapon.position.set(this.weapon_x, this.weapon_y, this.weapon_z);
	this.add(weapon);
}