var svgdoc;
var svgNS = 'http://www.w3.org/2000/svg';
var cartoNS = 'http://www.cylstat.net/attrib';
var xlinkNS = 'http://www.w3.org/2000/xlink/namespace/';
function MoveRec(evt, identificadorsvg, name, aa, valor, posicion) {

    var svgroot = document.getElementById(identificadorsvg);
    var elelemento = evt.target;
    var idTerritorioMapa = elelemento.getAttribute('id');
    var anchosvg = svgroot.getAttribute('width');

    var anchoEstandarGlobo = 140;
    
    xInic = evt.clientX
    yInic = evt.clientY 
    
    var coords = new Array();
    if (!svgroot.getScreenCTM) 
    { 
        var viewBoxArray = svgroot.getAttributeNS(null,"viewBox").split(" ");
        var myRatio = viewBoxArray[2]/viewBoxArray[3]; 
        if ((window.innerWidth/window.innerHeight) > myRatio) { this.scaleFactor = viewBoxArray[3] / window.innerHeight;}
        else { this.scaleFactor = viewBoxArray[2] / window.innerWidth;}
        this.offsetX = (window.innerWidth - viewBoxArray[2] * 1 / this.scaleFactor) / 2;
        this.offsetY = (window.innerHeight - viewBoxArray[3] * 1 / this.scaleFactor) / 2;
        coords["x"] = (xInic  - this.offsetX) * this.scaleFactor ;
        coords["y"] = (yInic - this.offsetY) * this.scaleFactor;
    }
    else {
        matrix=svgroot.getScreenCTM();
        coords["x"]= matrix.inverse().a*xInic+matrix.inverse().c*yInic+matrix.inverse().e;
        coords["y"]= matrix.inverse().b*xInic+matrix.inverse().d*yInic+matrix.inverse().f;
    }


    if (idTerritorioMapa.indexOf('base_region_') > -1) {
        
    }
    else{
        var grosor = svgroot.getElementById('Grupo1').getAttribute('stroke-width');
        elelemento.setAttribute('stroke-width', (grosor * 6));
    }

    var nameB =name.split("|");
    var aaB = aa.split("|");


    //svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('width', aaB[0] );
    if (aaB[0] > anchoEstandarGlobo) {
        anchoEstandarGlobo = aaB[0];
    }
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('width', anchoEstandarGlobo);
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('class', 'Globo_MapaSVG');
    /*svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('filter', 'url(#f3)');*/
    
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('height', aaB[1] *(nameB.length+2+1)  );
    var lax = coords["x"] - (anchoEstandarGlobo / 2);
    var lay=coords["y"]  -(aaB[1] *(nameB.length+2+1) ) - 15;
    if (lay<0) { lay=coords["y"]+10 + 15;}
    if (lax<0 ) {lax=0;}
    if (lax > (anchosvg - (anchoEstandarGlobo))) { lax = anchosvg - (anchoEstandarGlobo); }
    
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('x', lax);
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('y', lay);

    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('rx', 10);
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('ry', 10);

    var cadena="";
    var x=nameB.length;
    var i=0;
    for (i=1; i<=x; i++)
    {
        var GloboT = svgroot.getElementById('GloboT' + i +'_' + identificadorsvg);
        GloboT.firstChild.data = nameB[i-1];
        GloboT.setAttribute('x', lax + 5);
        GloboT.setAttribute('class', 'texto_Globo_MapaSVG');
        var posiciony= lay + (aaB[1] *(i));
        GloboT.setAttribute('y', posiciony );
    }
    
    GloboT = svgroot.getElementById('GloboT' + i +'_' + identificadorsvg);
    GloboT.firstChild.data =' Valor: ' + valor;
    GloboT.setAttribute('x', lax + 20);
    var posiciony= lay + (aaB[1] *(i));
    GloboT.setAttribute('y', posiciony );
    i=i+1;
    GloboT = svgroot.getElementById('GloboT' + i +'_' + identificadorsvg);
    GloboT.firstChild.data =' Ranking:' + posicion;
    GloboT.setAttribute('x', lax + 20);
    var posiciony= lay + (aaB[1] *(i));
    GloboT.setAttribute('y', posiciony);
    
}

function OBoc(evt, identificadorsvg) {
    var svgroot = document.getElementById(identificadorsvg);
    var elelemento = evt.target;
    var idTerritorioMapa = elelemento.getAttribute('id');
    
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('width',0);
    svgroot.getElementById('Globo_' + identificadorsvg).setAttribute('height',0);
    svgroot.getElementById('GloboT1_' + identificadorsvg).firstChild.data ="";
    svgroot.getElementById('GloboT2_' + identificadorsvg).firstChild.data ="";
    svgroot.getElementById('GloboT3_' + identificadorsvg).firstChild.data ="";
    svgroot.getElementById('GloboT4_' + identificadorsvg).firstChild.data = "";
    if (idTerritorioMapa.indexOf('base_region_') > -1) {
        
    }
    else{
        var grosor = svgroot.getElementById('Grupo1').getAttribute('stroke-width');
        elelemento.setAttribute('stroke-width', (grosor));
    }
}