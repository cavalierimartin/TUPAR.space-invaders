var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = null;
var imageReady = false;
var fila = 3;
var columna = 7;
enemigos = new Array(fila);
var contador = 0;
var bajar = false;
var perdio = false;
var gano = false;
var score = 0;
var anim = 0;
	    
function onLoad() {  
	canvas.style = "background:url('galaxy1000x600.png');"
	img = new Image();
	misil = new Misil();
	nave = new Nave();
	enemigo = new Enemigo();
	generarEnemigos(enemigos);
	img.onerror = function(){
		alert("Error");
	}
	img.onload = function () {
		imageReady = true;
		nave.navePosX = (canvas.width/2) - (nave.widthNave/2);
		nave.navePosY = (canvas.height) - (nave.heightNave+10);
		setTimeout(update, 1000/15 );
	}

	img.src = "spriteSpaceInvaders2.png";
}

//-------------------------------- Teclas -------------------------------------//
      
document.onkeydown = checkKey;
function checkKey(e) {
	e = e || window.event;
	if (e.keyCode == '39') { //Flecha derecha
		nave.inicNaveX = 82;
		nave.widthNave = 32;
		if ((nave.navePosX + nave.widthNave + 20) < canvas.width){
			nave.navePosX = nave.navePosX + 10;
		}
	}
	else if (e.keyCode == '37') { //Flecha Izquierda
		nave.inicNaveX = 50;
		nave.widthNave = 32;
		if ((nave.navePosX - 20) > 0){
			nave.navePosX = nave.navePosX - 10;
		}
	}
	else if (e.keyCode == '32'){ // Barra espaciadora
		if (!misil.disparado){
			misil.misilPosX = nave.navePosX + 10;
			misil.misilPosY = nave.navePosY - 14;
			misil.disparado = true;
		}
	}
	document.onkeyup = function(){
		nave.inicNaveX = 0;
		nave.widthNave = 50;
	}
}

//-------------------------------- Nave -------------------------------------//

function Nave(){
	this.navePosX = 0;
	this.navePosY = 0;
	this.inicNaveX = 0;
	this.inicNaveY = 0;
	this.widthNave = 50;
	this.heightNave = 61;
}

Nave.prototype.draw=function(contex){
	ctx.drawImage(img, this.inicNaveX, this.inicNaveY, this.widthNave, this.heightNave, this.navePosX, this.navePosY, this.widthNave, this.heightNave);
}

//-------------------------------- Misil -------------------------------------//

function Misil(){
	this.misilPosX = 0;
	this.misilPosY = 0;
	this.inicMisilX = 125;
	this.inicMisilY = 0;
	this.widthMisil = 61;
	this.heightMisil = 39;
	this.disparado = false;
	this.pego = false;
}

Misil.prototype.draw=function(contex){
	if (this.disparado == true){
		ctx.drawImage(img, this.inicMisilX, this.inicMisilY, this.widthMisil, this.heightMisil, this.misilPosX, this.misilPosY, this.widthMisil, this.heightMisil);
	}
}

Misil.prototype.update=function(){
	if (this.disparado == false){
		return;
	}	
	else{		
		this.misilPosY = this.misilPosY - 25;
		if (this.pego){
			this.misilPosY = -1;
		}
		if (this.misilPosY < 0){
			this.disparado = false;
			this.pego = false;
		}
	}
}

Misil.prototype.impacto=function(){
	for (var i = 0; i < fila; i++){
		for (var j = 0; j < columna; j++){
			if ((this.misilPosX > enemigos[i][j].enemigoPosX) && (this.misilPosX < (enemigos[i][j].enemigoPosX + enemigos[i][j].widthEnemigo)) && (this.misilPosY > enemigos[i][j].enemigoPosY) && (this.misilPosY < (enemigos[i][j].enemigoPosY + enemigos[i][j].heightEnemigo)) && (enemigos[i][j].muerto != 0)){
				this.pego = true;
				enemigos[i][j].heightEnemigo = 57;
				enemigos[i][j].enemigoPosX += 10;
				enemigos[i][j].enemigoPosY += 4;
//for...
				enemigos[i][j].widthEnemigo = 61;
				enemigos[i][j].inicEnemigoX = 0;
				enemigos[i][j].inicEnemigoY = 134;
				enemigos[i][j].draw();
				enemigos[i][j].inicEnemigoX = 61;
				enemigos[i][j].inicEnemigoY = 134;
				enemigos[i][j].draw();
				enemigos[i][j].inicEnemigoX = 122;
				enemigos[i][j].inicEnemigoY = 134;
				enemigos[i][j].draw();
				enemigos[i][j].inicEnemigoX = 183;
				enemigos[i][j].inicEnemigoY = 134;
				enemigos[i][j].draw();
				enemigos[i][j].inicEnemigoX = 0;
				enemigos[i][j].inicEnemigoY = 192;
				enemigos[i][j].draw();
				enemigos[i][j].inicEnemigoX = 61;
				enemigos[i][j].inicEnemigoY = 192;
				enemigos[i][j].draw();
				enemigos[i][j].inicEnemigoX = 122;
				enemigos[i][j].inicEnemigoY = 192;
				enemigos[i][j].draw();
				enemigos[i][j].destruir();
				score+=100;							
			}
		}
	}
}


//-------------------------------- Enemigo -------------------------------------//

function Enemigo(){
	this.enemigoPosX = 0;
	this.enemigoPosY = 0;
	this.inicEnemigoX = 0;
	this.inicEnemigoY = 61;
	this.widthEnemigo = 94;
	this.heightEnemigo = 70;
	this.muerto = 1;
}

Enemigo.prototype.draw=function(contex){
	if (this.muerto != 0){
		ctx.drawImage(img, this.inicEnemigoX, this.inicEnemigoY, this.widthEnemigo, this.heightEnemigo, this.enemigoPosX, this.enemigoPosY, this.widthEnemigo, this.heightEnemigo);
	}	
}

Enemigo.prototype.destruir=function(){	
	this.muerto = 0;
}


//-------------------------------- General -------------------------------------//

function generarEnemigos(enemigos){
	for (var i = 0; i < fila; i++){
		enemigos[i] = new Array(columna);
		for (var j = 0; j < columna; j++){
			enemigos[i][j] = new Enemigo();
			enemigos[i][j].enemigoPosX = (20 + (20 * j) + (enemigo.widthEnemigo * j));
			enemigos[i][j].enemigoPosY = (20 + (20 * i) + (enemigo.heightEnemigo * i));
		}
	}
}

function graficaEnemigos(enemigos){			
	if (contador < 49){
		grafica(enemigos, false);
		contador++;
	}
	else if (contador > 48){
		grafica(enemigos, true);
		contador++;
		if (contador > 97){
			contador = 0;
			bajar = true;
		}
	}
}

function grafica(enemigos, direccion){
	for (var i = 0; i < fila; i++){
		for (var j = 0; j < columna; j++){
			enemigo = enemigos[i][j];
			enemigo.draw(ctx);
			if (!direccion){
				enemigo.inicEnemigoX = 95;
				enemigo.enemigoPosX+=4;
				enemigo.enemigoPosY+=0.8;
			}
			else{
				enemigo.inicEnemigoX = 0;
				enemigo.enemigoPosX-=4;
				enemigo.enemigoPosY+=0.8;
			}
		}
	}
}

function perder(enemigos){
	for (var i = 0; i < fila; i++){
		for (var j = 0; j < columna; j++){
			if ((enemigos[i][j].enemigoPosY > canvas.height-(nave.heightNave*2)) && (enemigos[i][j].muerto != 0)){
				perdio = true;
			}
		}
	}
}

function victoria(enemigos){
	for (var i = 0; i < fila; i++){
		for (var j = 0; j < columna; j++){
		 	if (enemigos[i][j].muerto != 0){
				return;
			}	
		}
	}
	gano = true;		
}

function update() {		
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	nave.draw(ctx);		
	graficaEnemigos(enemigos);
	misil.update();
	misil.impacto();
	misil.draw(ctx);	
	victoria(enemigos);
	perder(enemigos);
	ctx.textAlign="center";
	ctx.fillStyle="#69bd44"
	ctx.font="30px AngryBirds";
	ctx.fillText("SCORE: " + score,canvas.width/2,24);	
	
	if ((!perdio) && (!gano)){
			setTimeout( update, 200);
	}
	else if (perdio){
			canvas.style.backgroundImage="url(game-over2.jpg)";
	}
	else if (gano){
			ctx.clearRect (0,0,canvas.width, canvas.heigh);
			canvas.style.backgroundImage="url(victoria2.jpg)";
	}
}
