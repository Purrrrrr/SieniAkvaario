var maindiv;
var textdiv;
var pomputettavat_vauhtix=new Array();
var pomputettavat_vauhtiy=new Array();
var pomputettavat_x=new Array();
var pomputettavat_y=new Array();
var pomputettavat_w=new Array();
var pomputettavat_h=new Array();
var pomputettavat_r=new Array();
var pomputettavat_massa=new Array();
var t;
var t2;
var painovoimavakio = 1;
var pomppuisuusvakio = 400;
var gravityangle = 5;
var gravity_max = 100;
var min_x;
var min_y;
var max_x;
var max_y;
var max_speed = 3;
var firste;

function aloitapomputus() {
clearTimeout(t);
clearTimeout(t2);
maindiv = document.getElementById('akvaario');
textdiv = document.getElementById('teksti')
min_x = maindiv.offsetLeft;
min_y = maindiv.offsetTop;
max_x = maindiv.offsetLeft+maindiv.offsetWidth;
max_y = maindiv.offsetTop+maindiv.offsetHeight;
	for(var x = 0; x < maindiv.childNodes.length; x++ ) {
		if (maindiv.childNodes[x].nodeType == 1) {
		maindiv.childNodes[x].style.position = 'absolute';
 		maindiv.childNodes[x].style.visibility = 'visible'; 
		pomputettavat_x[x] = maindiv.offsetLeft+maindiv.offsetWidth*(0.5+(Math.random()-0.5)*.2);
		pomputettavat_y[x] = maindiv.offsetTop+maindiv.offsetHeight*(0.5+(Math.random()-0.5)*.2);
		pomputettavat_w[x] = maindiv.childNodes[x].offsetWidth;
		pomputettavat_h[x] = maindiv.childNodes[x].offsetHeight;
		pomputettavat_r[x] = (pomputettavat_h[x]+pomputettavat_w[x])/4;
		pomputettavat_vauhtix[x] = Math.random()*max_speed*2 - max_speed;
		pomputettavat_vauhtiy[x] = Math.random()*max_speed*2 - max_speed;
		pomputettavat_massa[x] = maindiv.childNodes[x].offsetWidth*maindiv.childNodes[x].offsetHeight;
		maindiv.childNodes[x].style.left = pomputettavat_x[x] + "px";
	 	maindiv.childNodes[x].style.top = pomputettavat_y[x] + "px";
	 	}
	}

pomputa();
esitäasioita();
firste = liikeEnergia();
}

function pomputa() {
// grav = gravity_max/Math.ceil(gravityangle*gravityangle*8);
// 	if (gravityangle < 0)
// 	grav = -grav;
	for( var x = 0; maindiv.childNodes[x]; x++ ) {
		if (maindiv.childNodes[x].nodeType == 1) {
		pomputettavat_x[x] += pomputettavat_vauhtix[x];
		pomputettavat_y[x] += pomputettavat_vauhtiy[x];
		seinätarkastus(x, 0.999);
// 		Suuri keskuspainovoima
// 		painovoimoi(x, maindiv.offsetTop+maindiv.offsetHeight/2, maindiv.offsetLeft+maindiv.offsetWidth/2, -128, 5);
// 		Yksittäiset painovoimat joka sienelle
			for( var x2 = 0; maindiv.childNodes[x2]; x2++ ) {
				if (maindiv.childNodes[x2].nodeType == 1 && x2 != x) {
				painovoimoi(x, pomputettavat_y[x2]+pomputettavat_h[x2]/2, pomputettavat_x[x2]+pomputettavat_w[x2]/2, pomputettavat_massa[x2], pomputettavat_r[x2]);
				}
			}
		//kitkauta2(x, 1-Math.sin(gravityangle*Math.PI)/200-0.003)
// 		kitkauta2(x, 0.9999);
		//Painovoimia nurkissa:
		/*painovoimoi(x, max_y, max_x, grav, 0);
		painovoimoi(x, maindiv.offsetTop, max_x, grav, 0);
		painovoimoi(x, maindiv.offsetTop, maindiv.offsetLeft, grav, 0);
		painovoimoi(x, max_y, maindiv.offsetLeft, grav, 0);*/
		maindiv.childNodes[x].style.left = Math.round(pomputettavat_x[x]) + "px";
		maindiv.childNodes[x].style.top = Math.round(pomputettavat_y[x]) + "px";
		}
	}
// gravityangle -= 0.003;
// 	if (gravityangle > 5)
// 	gravityangle = -5;
t=setTimeout("pomputa()",70);
}

function esitäasioita() {
// textdiv.innerHTML = "Painovoima keskellä 5<br />Painovoima kulmissa " + Math.round(grav*100)/100
//  + "<br />Nopeuskerroin " + Math.round(10000-Math.sin(gravityangle*Math.PI)*50-30)/10000;

textdiv.innerHTML = 'Liike-energian muutos simulaation aikana:' + Math.round(liikeEnergia()-firste);
t2=setTimeout("esitäasioita()",1000);
}

function liikeEnergia() {
var e = 0;
	for( var x = 0; maindiv.childNodes[x]; x++ ) {
		if (maindiv.childNodes[x].nodeType == 1) {
		e += pomputettavat_massa[x]*(pomputettavat_vauhtix[x]*pomputettavat_vauhtix[x]+pomputettavat_vauhtiy[x]*pomputettavat_vauhtiy[x]);
		}
	}
return e;
}

function lopeta() {
clearTimeout(t);
}

function seinätarkastus(x, bounciness) {
	if (pomputettavat_x[x]+maindiv.childNodes[x].offsetWidth > max_x) {
	pomputettavat_vauhtix[x] *= -bounciness;
	pomputettavat_x[x] -= (pomputettavat_x[x]+maindiv.childNodes[x].offsetWidth-max_x)*2
	}
	if (pomputettavat_x[x] < min_x) {
	pomputettavat_vauhtix[x] *= -bounciness;
	pomputettavat_x[x] += (min_x-pomputettavat_x[x])*2
	}
	if (pomputettavat_y[x]+maindiv.childNodes[x].offsetHeight > max_y) {
	pomputettavat_vauhtiy[x] *= -bounciness;
	pomputettavat_y[x] -= (pomputettavat_y[x]+maindiv.childNodes[x].offsetHeight-max_y)*2
	}
	if (pomputettavat_y[x] < min_y) {
	pomputettavat_vauhtiy[x] *= -bounciness;
	pomputettavat_y[x] += (min_y-pomputettavat_y[x])*2
	}
}

function kitkauta1(x, strenght) {
	if (pomputettavat_vauhtix[x] > 0) pomputettavat_vauhtix[x] -= strenght;
	else pomputettavat_vauhtix[x] += strenght;
	if (pomputettavat_vauhtiy[x] > 0) pomputettavat_vauhtiy[x] -= strenght;
	else pomputettavat_vauhtiy[x] += strenght;
}

function kitkauta2(x, coefficient) {
pomputettavat_vauhtix[x] *= coefficient;
pomputettavat_vauhtiy[x] *= coefficient;
}

function kitkauta3(x, coefficient, minspeed) {
	if (Math.pow(Math.pow(pomputettavat_vauhtix[x], 2),Math.pow(pomputettavat_vauhtiy[x],2), 0.5) > minspeed) {
	pomputettavat_vauhtix[x] *= coefficient;
	pomputettavat_vauhtiy[x] *= coefficient;
	}
}

function painovoimoi(x, gy, gx, mass, gravity_object_radius) {
var grav_element = maindiv.childNodes[x];
var mass_x = pomputettavat_x[x]+grav_element.offsetWidth/2;
var mass_y = pomputettavat_y[x]+grav_element.offsetHeight/2;
var angle;
var diff_y = mass_y-gy;
var diff_x = mass_x-gx;
var strenght = painovoimavakio*mass*pomputettavat_massa[x]
// textdiv.innerHTML = strenght;
var r = Math.pow(diff_x*diff_x+diff_y*diff_y, 0.5);
var forcevector = 0;
	if (r > gravity_object_radius)
	forcevector = strenght*Math.pow(r, -2);
	else 
	forcevector = strenght*r/Math.pow(gravity_object_radius, 3);
//Eräänlainen törmäyksenestoyritelmä. Ei oikein toimi...
// 	if (r < gravity_object_radius+pomputettavat_r[x])
// 	forcevector -= pomppuisuusvakio*(gravity_object_radius+pomputettavat_r[x]-r);
forcevector /= pomputettavat_massa[x];
	if (diff_x == 0)
		if (diff_y > 0)
		angle = Math.PI*3/2;
		else angle = Math.PI/2;
	else if (diff_x > 0)
	angle = Math.atan(diff_y/diff_x)+Math.PI;
	else
	angle = Math.atan(diff_y/diff_x);
pomputettavat_vauhtix[x] += forcevector*Math.cos(angle);
pomputettavat_vauhtiy[x] += forcevector*Math.sin(angle);
}