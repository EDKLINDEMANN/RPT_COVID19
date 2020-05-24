var terr = new Array();
function CargarTerritorios(territorios)
{
terr=territorios.split(","); 
}

function MostrarInf(posicionx,posiciony, varposiciontexto,valor,periodo, lineapadre)
{

var identificador= new Array();
identificador= lineapadre.split("_");
var svg=document.getElementById(identificador[1]);
var x = terr.length ;
for (i=0; i<=x-1; i++)
{
if ('LLin_' + identificador[1] + '_' + terr[i]!=lineapadre)
{
svg.getElementById('Linea_' + identificador[1] + '_' + terr[i]).setAttribute('opacity', '0.2');
}
}
svg.getElementById('AIN' + identificador[1] ).setAttribute('visibility', 'visible');
svg.getElementById('tEjeY' + identificador[1] ).setAttribute('opacity', '0.2');
svg.getElementById('tEjeX' + identificador[1]).setAttribute('opacity', '0.2');
var colorrelleno =svg.getElementById(lineapadre).getAttribute('stroke');
var svgElement = svg.getElementById('l1AIN'+ identificador[1] );
svgElement.style.stroke = colorrelleno;
svgElement =svg.getElementById(lineapadre).parentNode ;
svgElement.setAttribute('opacity', '1');
svg.getElementById('l1AIN' + identificador[1]).setAttribute('x2', posicionx);
svg.getElementById('l1AIN' + identificador[1]).setAttribute('y1', posiciony);
svg.getElementById('l1AIN' + identificador[1]).setAttribute('y2', posiciony);
var svgElement = svg.getElementById('l2AIN' + identificador[1]);
svgElement.style.stroke = colorrelleno;
svg.getElementById('l2AIN' + identificador[1]).setAttribute('x1', posicionx);
svg.getElementById('l2AIN' + identificador[1]).setAttribute('x2', posicionx);
svg.getElementById('l2AIN' + identificador[1]).setAttribute('y1', posiciony);
var svgElement = svg.getElementById('CAIN' + identificador[1]);
svgElement.style.fill = colorrelleno;
svgElement.style.stroke = colorrelleno;
svg.getElementById('CAIN' + identificador[1]).setAttribute('cx', posicionx);
svg.getElementById('CAIN' + identificador[1]).setAttribute('cy', posiciony);
var posicion = posiciony + (varposiciontexto/2);
var svgElement = svg.getElementById('t1AIN' + identificador[1]);
svgElement.style.fill = colorrelleno;
svg.getElementById('t1AIN' + identificador[1]).setAttribute('y', posicion);
svg.getElementById('t1AIN' + identificador[1]).setAttribute('transform','rotate(180 0, ' + posiciony + ') scale(-1,1)');
var svgElement = svg.getElementById('t2AIN'+ identificador[1]);
svgElement.style.fill = colorrelleno;
svg.getElementById('t2AIN' + identificador[1]).setAttribute('x', posicionx);
svg.getElementById('t1AIN' + identificador[1]).firstChild.nodeValue = valor ;
svg.getElementById('t2AIN' + identificador[1]).firstChild.nodeValue = periodo ;
}

function MostrarLin(lineapadre)
{
var identificador= new Array();
identificador= lineapadre.split("_");
var svg=document.getElementById(identificador[1]);
var x = terr.length ;
for (i=0; i<=x-1; i++)
{
if ('LLin_' + identificador[1] + '_' + terr[i]!=lineapadre)
{
svg.getElementById('Linea_' + identificador[1] + '_' + terr[i]).setAttribute('opacity', '0.2');
}
}
}


function OcultarInf(lineapadre)
{
var identificador= new Array();
identificador= lineapadre.split("_");
var svg=document.getElementById(identificador[1]);
svg.getElementById('AIN' + identificador[1]).setAttribute('visibility', 'hidden');
svg.getElementById('tEjeY' + identificador[1]).setAttribute('opacity', '1');
svg.getElementById('tEjeX' + identificador[1]).setAttribute('opacity', '1');
var x = terr.length ;
for (i=0; i<=x-1; i++)
{
if ('LLin_' + identificador[1] + '_' + terr[i]!=lineapadre)
{
document.getElementById('Linea_' + identificador[1] + '_' + terr[i]).setAttribute('opacity', '1');
}
}
}

function ChangeOpacityLin(lineapadre)
{
var identificador= new Array();
identificador= lineapadre.split("_");
var svg=document.getElementById(identificador[1]);
var x = terr.length ;
for (i=0; i<=x-1; i++)
{
if ('LLin_' + terr[i]!=lineapadre)
{
svg.getElementById('Linea_' + identificador[1] + '_' + terr[i]).setAttribute('opacity', '1');
}
}
}

function OcultarLin(evt,lineapadre)
{
var target = evt.target;
var identificador= new Array();
identificador= lineapadre.split("_");
var svg=document.getElementById(identificador[1]);
var mitexto= new Array();
mitexto=target.getAttribute('id').split("_");
var x = terr.length ;
for (i=0; i<=x-1; i++)
{
if ('LLin_' + identificador[1] + '_'+ terr[i]==lineapadre)
{
if (svg.getElementById('Linea_' + identificador[1] + '_' + terr[i]).getAttribute('visibility')=='visible'){

svg.getElementById('Linea_' + identificador[1] + '_' + terr[i]).setAttribute('visibility', 'hidden');

if (mitexto.length==3) {svg.getElementById( mitexto[0] + '_' + mitexto[1] ).setAttribute('opacity','0.2');}
else {target.setAttribute('opacity','0.2'); }

}
else
{ svg.getElementById('Linea_' + identificador[1] + '_' + terr[i]).setAttribute('visibility', 'visible'); 
if (mitexto.length==3) {svg.getElementById( mitexto[0] + '_' + mitexto[1] ).setAttribute('opacity','1');}
else {target.setAttribute('opacity','1'); }

}
}
}
}


