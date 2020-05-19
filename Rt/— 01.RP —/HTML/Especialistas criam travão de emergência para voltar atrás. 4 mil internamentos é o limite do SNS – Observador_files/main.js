var DATOS = [
	{
		"tipo": "img",
		"id": "fondo",
		"class": "fondo",
		"src": "fondo.jpg"
	},
	{
		"tipo": "img",
		"id": "logo",
		"class": "elemento",
		"src": "logo.png"
	},
	{
		"tipo": "img",
		"id": "cp1",
		"class": "elemento",
		"src": "cp1.png"
	},
	{
		"tipo": "img",
		"id": "cp2",
		"class": "elemento",
		"src": "cp2.png"
	},
	{
		"tipo": "img",
		"id": "cp3",
		"class": "elemento",
		"src": "cp3.png"
	},
	{
		"tipo": "forma",
		"id": "linea1",
		"class": "elemento"
	},
	{
		"tipo": "forma",
		"id": "linea2",
		"class": "elemento"
	},
	{
		"tipo": "img",
		"id": "cp4",
		"class": "elemento",
		"src": "cp4.png"
	},
	{
		"tipo": "img",
		"id": "cp5_1",
		"class": "elemento",
		"src": "cp5_1.png"
	},
	{
		"tipo": "img",
		"id": "cp5_2",
		"class": "elemento",
		"src": "cp5_2.png"
	},
	{
		"tipo": "img",
		"id": "legal",
		"class": "elemento",
		"src": "cp_legal.png"
	},
	{
		"tipo": "img",
		"id": "cp_claim",
		"class": "elemento",
		"src": "cp_claim.png"
	},
	{
		"tipo": "img",
		"id": "cta",
		"class": "elemento",
		"src": "cta.png"
	}

]




var contenedor, loader, images, imagesLoaded, fontsReady;
function setup() {

	// fuentes
	fontsReady = false;
	try {
		document.fonts.ready.then(function() {
			//console.log("fonts ready")
			fontsReady = true;
			imageLoaded();
		});
	} catch(error) {
		fontsReady = true;
	}

	// Container
	contenedor = document.createElement('div');
	contenedor.id = 'container-banner';
	document.body.appendChild(contenedor);

	// loader
	loader = document.createElement('div');
	loader.id = 'loader';
	var loadercell = document.createElement('div');
	var imgLoader = new Image();
	imgLoader.src = "buffer.svg";
	loader.appendChild(loadercell).appendChild(imgLoader);
	contenedor.appendChild(loader);

	// Click
	var divClick = document.createElement('div');
	divClick.setAttribute("id", 'eleClickTag');

	divClick.addEventListener("click", function(){
			window.open(clickTag);
	});

	contenedor.appendChild(divClick);

	loadImages();

}

function loadImages() {
	images = [];
	imagesLoaded = 0;
	for (var i = 0; i < DATOS.length; i++) {
		var dato = DATOS[i];
		var item;
		if(dato.src && dato.src != '') {
			item = new Image();
			images.push(item);
			item.onload = imageLoaded;
			item.src = dato.src;

		} else {
			item = document.createElement('div');
			if(dato.txt) item.innerHTML = dato.txt;
			if(dato.background && dato.background != '') {
				var bg = new Image();
				images.push(bg);
				bg.onload = imageLoaded;
				bg.src = dato.background;
			}
		}

		if(dato.class) item.className = dato.class;
		item.classList.add('base');
		if(dato.id) {
			item.id = dato.id;
			window[item.id] = item;		// convierto la id en var de js para el timeline
		} else {
			console.log("WARNING: Hay un elemento sin id definida, no será accesible via jsvar directamente");
		}

	}

}

function imageLoaded(e) {
	if(e) imagesLoaded++;
	if(fontsReady && imagesLoaded>=images.length) init();
}

function init() {
	//console.log("init")
	contenedor.removeChild(loader);
	// pongo los elementos en pantalla
	for (var i = 0; i < DATOS.length; i++) {
		var dato = DATOS[i];
		if(dato.id) {
			var item = window[dato.id];
			if(dato.background && dato.background != '') item.style.backgroundImage = 'url("'+dato.background+'")';
			if(dato.parent) {
				document.getElementById(dato.parent).appendChild(item);
			} else {
				contenedor.appendChild(item);
			}
		}
	}

	start();
}

function start() {
	// Variables
	var tc      = 0.5,
		atc      = '-=0.5',
		pPos	= '+=10',
		pNeg	= '-=10',
		ws		= '+=1.1',
		wl		= '+=2.7',
		wll		= '+=3.5',
		esc_cta	= 0.5,

		fr5 = [cp5_1, cp5_2],


		// Timeline (cada frame está separado con una línea en blanco)
		TL = new TimelineMax({ repeat: 0, repeatDelay: 0 } );
		TL
		//.set(caja, { height: '0px'})

		.fromTo(fondo, tc, { scale: 1.5, opacity: 1}, { scale: 1 })
		.addLabel('loop')
		.fromTo(cp1, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)})

		.to(cp1, tc*1.8, { opacity: 0, y:-30 , ease: Back.easeIn.config(0.5)},wl)
		.fromTo(cp2, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)})
		.fromTo(cp3, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)},ws)
		//		.fromTo(linea1, tc*1.5, { opacity: 0, scaleX:0}, {transformOrigin:'0% 100%', opacity: 1, scaleX:1, ease: Back.easeOut.config(0.5)})

		.to([cp2,cp3,linea1], tc*1.8, { opacity: 0, y:-30 , ease: Back.easeIn.config(0.5)},wl)

		.fromTo(cp4, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)})

		.to(cp4, tc*1.8, { opacity: 0, y:-30 , ease: Back.easeIn.config(0.5)},wl)
		.staggerFromTo(fr5, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)}, .5)

		//		.fromTo(linea2, tc*1.5, { opacity: 0, scaleX:0}, {transformOrigin:'0% 100%', opacity: 1, scaleX:1, ease: Back.easeOut.config(0.5)})
		.fromTo(cta, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)})
		.fromTo(legal, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)})
		.fromTo(cp_claim, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)},'-=0.6')
		.fromTo(logo, tc*1.5, { opacity: 0, y:30}, { opacity: 1, y:0, ease: Back.easeOut.config(0.5)},'-=0.6')


		.to([fr5,cta,cp_claim, legal,logo, linea2], tc, { opacity: 0,onComplete:function(){
			TL.seek('loop');
		}},wll)
		/**/

}

window.onload = setup;
