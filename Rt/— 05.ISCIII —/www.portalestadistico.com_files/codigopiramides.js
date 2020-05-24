var cartoNS = 'http://www.carto.net/attrib';

function cambiar_color(colorBaseizq, colorBaseDrch, colorCompararIzq, colorCompararDrch){
    try {
    
       var s = document.getElementById('svgembed');
       var d = s.getSVGDocument(); 
       elementos  = 18 //d.getElementById("HistDrch").childNodes;
       for ( i=0; i< (elementos); i++ )
            { 
                elelemento =  d.getElementById("HistIzq" + (i+3));
               // alert(elelemento);
                elelemento.setAttribute('fill','blue');
            } 
       for ( i=0; i< (elementos); i++ )
            { 
                elelemento =  d.getElementById("HistDrch" + (i+3));
                elelemento.setAttribute('fill','red');
            } 

    } catch (Error) { alert(Error);
    } finally { }
 }
 
function MostrarValores (evt){
    
    var target = evt.target;
   target.setAttribute('fill-opacity','0.5');
    var porcentajeIZQ=target.getAttributeNS(cartoNS,"valorPorcentaje");
    var valorAbsolutoIZQ = target.getAttributeNS(cartoNS, "valorAbsoluto");
    
	var porcentajeIZQper=target.getAttributeNS(cartoNS,"valorPorcentajePer");
    var valorAbsolutoIZQper=target.getAttributeNS(cartoNS,"valorAbsolutoPer");
	var leyenda = document.getElementById('Leyenda');
	leyenda.setAttribute('visibility','visible');
    var id =target.getAttribute("id");
    if (id.indexOf("z")>-1){
    // mostramos las lineas verticales
    var idred= id.replace("HistIzq","Texto");
	id= id.replace("HistIzq","HistDrch");
	var drch =  document.getElementById(id);
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',drch.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	num = parseFloat(drch.getAttribute('x')) + parseFloat(drch.getAttribute('width'));
	linea.setAttribute('x1',num);
    linea.setAttribute('x2',num);
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',target.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	linea.setAttribute('x1',target.getAttribute('x'));
    linea.setAttribute('x2',target.getAttribute('x'));
    
	//los datos que obtenemos son los de la izquierda
	document.getElementById("Hombres").firstChild.nodeValue =  (valorAbsolutoIZQ) ;
	document.getElementById("Hombres_p").firstChild.nodeValue = porcentajeIZQ + '%';
	//document.getElementById("porcentajeHombres").firstChild.nodeValue = 'valor porcentaje Hombres:  ' + porcentajeIZQ;
	if(valorAbsolutoIZQper==null){ }
	else {
	 document.getElementById("HombresPer").firstChild.nodeValue =  (valorAbsolutoIZQper);
	document.getElementById("HombresPer_p").firstChild.nodeValue =  porcentajeIZQper + '%';
	}
	 
	    
	var texto =  document.getElementById(idred);
	texto.setAttribute('class','allTextoSeleccionado TextoSeleccionado');
	texto.setAttribute('x',parseFloat(texto.getAttribute('x'))-5);
	var edad = texto.firstChild.nodeValue;
	var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
	var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
	document.getElementById("re").firstChild.nodeValue =textoREdad + ': ' + edad ;
	
	drch.setAttribute('fill-opacity','0.5');
    var porcentajeDRCH=drch.getAttributeNS(cartoNS,"valorPorcentaje");
    var valorAbsolutoDRCH=drch.getAttributeNS(cartoNS,"valorAbsoluto");
	var porcentajeDRCHper=drch.getAttributeNS(cartoNS,"valorPorcentajePer");
    var valorAbsolutoDRCHper=drch.getAttributeNS(cartoNS,"valorAbsolutoPer");
    document.getElementById("Mujeres").firstChild.nodeValue = valorAbsolutoDRCH ;
	document.getElementById("Mujeres_p").firstChild.nodeValue = porcentajeDRCH + '%';
	if(valorAbsolutoDRCHper==null){ }
	else{
	 document.getElementById("MujeresPer").firstChild.nodeValue = valorAbsolutoDRCHper ;
	document.getElementById("MujeresPer_p").firstChild.nodeValue = porcentajeDRCHper + '%';
	}
	
 	document.getElementById("TotalMujeres").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalA");
	document.getElementById("TotalMujeres_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotal") +'%';
	document.getElementById("TotalMujeresPer").firstChild.nodeValue = drch.getAttributeNS(cartoNS, "valorTotalPA");
	document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = drch.getAttributeNS(cartoNS, "valorTotalP") +'%';
	

    }
    else {
	var idred= id.replace("HistDrch","Texto");
	id= id.replace("HistDrch","HistIzq");
	var drch =  document.getElementById(id);
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',drch.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	linea.setAttribute('x1',drch.getAttribute('x'));
    linea.setAttribute('x2',drch.getAttribute('x'));
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',target.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	num = parseFloat(target.getAttribute('x')) + parseFloat(target.getAttribute('width'));
	linea.setAttribute('x1',num);
    linea.setAttribute('x2',num);
    
	document.getElementById("Mujeres").firstChild.nodeValue =  (valorAbsolutoIZQ) ;
	document.getElementById("Mujeres_p").firstChild.nodeValue =  porcentajeIZQ + '%';
		if(valorAbsolutoIZQper==null){ 
	}
	else
	{
	document.getElementById("MujeresPer").firstChild.nodeValue =  (valorAbsolutoIZQper) ;
	document.getElementById("MujeresPer_p").firstChild.nodeValue =  porcentajeIZQper + '%';
	   
	}
	
	
	
	var texto =  document.getElementById(idred);
	texto.setAttribute('class','allTextoSeleccionado TextoSeleccionado');
	texto.setAttribute('x',parseFloat(texto.getAttribute('x'))-5);
	var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
	var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
	document.getElementById("re").firstChild.nodeValue =textoREdad + ': ' + texto.firstChild.nodeValue;

    drch.setAttribute('fill-opacity','0.5');
    var porcentajeDRCH=drch.getAttributeNS(cartoNS,"valorPorcentaje");
    var valorAbsolutoDRCH=drch.getAttributeNS(cartoNS,"valorAbsoluto");
	var porcentajeDRCHper=drch.getAttributeNS(cartoNS,"valorPorcentajePer");
    var valorAbsolutoDRCHper=drch.getAttributeNS(cartoNS,"valorAbsolutoPer");
	document.getElementById("Hombres").firstChild.nodeValue =  (valorAbsolutoDRCH);
	document.getElementById("Hombres_p").firstChild.nodeValue =  porcentajeDRCH + '%';
	if(valorAbsolutoDRCHper==null){ }
	else { 
	document.getElementById("HombresPer").firstChild.nodeValue =  (valorAbsolutoDRCHper) ;
	document.getElementById("HombresPer_p").firstChild.nodeValue =  porcentajeDRCHper + '%';
	}
	
	document.getElementById("TotalMujeres").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalA");
	document.getElementById("TotalMujeres_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotal") + '%';

	document.getElementById("TotalMujeresPer").firstChild.nodeValue = drch.getAttributeNS(cartoNS, "valorTotalPA");
	document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = drch.getAttributeNS(cartoNS, "valorTotalP") + '%';
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',drch.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	linea.setAttribute('x1',drch.getAttribute('x'));
    linea.setAttribute('x2',drch.getAttribute('x'));
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',target.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	num = parseFloat(target.getAttribute('x')) + parseFloat(target.getAttribute('width'));
	linea.setAttribute('x1',num);
    linea.setAttribute('x2',num);
	}
}

function MostrarValores(evt, valorPorcentajeIZQ, valorAbsolutoIZQ, valorPorcentajePerIZQ, valorAbsolutoPerIZQ, valorPorcentajeDCH, valorAbsolutoDCH, valorPorcentajePerDCH, valorAbsolutoPerDCH, valorTotalAIZQ, valorTotalIZQ, valorTotalPADCH, valorTotalPDCH) {

    var target = evt.target;
    target.setAttribute('fill-opacity', '0.5');
    var porcentajeIZQ = valorPorcentajeIZQ;
    var valorAbsolutoIZQ = valorAbsolutoIZQ;

    var porcentajeIZQper = valorPorcentajePerIZQ;
    var valorAbsolutoIZQper = valorAbsolutoPerIZQ;
    var leyenda = document.getElementById('Leyenda');
    leyenda.setAttribute('visibility', 'visible');
    var id = target.getAttribute("id");
    if (id.indexOf("z") > -1) {
        // mostramos las lineas verticales
        var idred = id.replace("HistIzq", "Texto");
        id = id.replace("HistIzq", "HistDrch");
        var drch = document.getElementById(id);
        var linea = document.getElementById('lineaDatos1');
        linea.setAttribute('visibility', 'visible');
        linea.setAttribute('y1', drch.getAttribute('y'));
        var texto = document.getElementById('TextocorteIzq0');
        var num = parseFloat(texto.getAttribute('y')) + 30;
        linea.setAttribute('y2', num);
        num = parseFloat(drch.getAttribute('x')) + parseFloat(drch.getAttribute('width'));
        linea.setAttribute('x1', num);
        linea.setAttribute('x2', num);
        linea = document.getElementById('lineaDatos2');
        linea.setAttribute('visibility', 'visible');
        linea.setAttribute('y1', target.getAttribute('y'));
        var texto = document.getElementById('TextocorteIzq0');
        var num = parseFloat(texto.getAttribute('y')) + 30;
        linea.setAttribute('y2', num);
        linea.setAttribute('x1', target.getAttribute('x'));
        linea.setAttribute('x2', target.getAttribute('x'));

        //los datos que obtenemos son los de la izquierda
        document.getElementById("Hombres").firstChild.nodeValue = (valorAbsolutoIZQ);
        document.getElementById("Hombres_p").firstChild.nodeValue = porcentajeIZQ + '%';
        //document.getElementById("porcentajeHombres").firstChild.nodeValue = 'valor porcentaje Hombres:  ' + porcentajeIZQ;
        if (valorAbsolutoIZQper == null) { }
        else {
            document.getElementById("HombresPer").firstChild.nodeValue = (valorAbsolutoIZQper);
            document.getElementById("HombresPer_p").firstChild.nodeValue = porcentajeIZQper + '%';
        }


        var texto = document.getElementById(idred);
        texto.setAttribute('class', 'allTextoSeleccionado TextoSeleccionado');
        texto.setAttribute('x', parseFloat(texto.getAttribute('x')) - 5);
        var edad = texto.firstChild.nodeValue;
        var posiciontextoedad = document.getElementById("re").firstChild.nodeValue.indexOf(":");
        var textoREdad = document.getElementById("re").firstChild.nodeValue.substring(0, posiciontextoedad);
        document.getElementById("re").firstChild.nodeValue = textoREdad + ': ' + edad;

        drch.setAttribute('fill-opacity', '0.5');
        var porcentajeDRCH = valorPorcentajeDCH;
        var valorAbsolutoDRCH = valorAbsolutoDCH;
        var porcentajeDRCHper = valorPorcentajePerDCH;
        var valorAbsolutoDRCHper = valorAbsolutoPerDCH;
        document.getElementById("Mujeres").firstChild.nodeValue = valorAbsolutoDRCH;
        document.getElementById("Mujeres_p").firstChild.nodeValue = porcentajeDRCH + '%';
        if (valorAbsolutoDRCHper == null) { }
        else {
            document.getElementById("MujeresPer").firstChild.nodeValue = valorAbsolutoDRCHper;
            document.getElementById("MujeresPer_p").firstChild.nodeValue = porcentajeDRCHper + '%';
        }

        document.getElementById("TotalMujeres").firstChild.nodeValue = valorTotalAIZQ;
        document.getElementById("TotalMujeres_p").firstChild.nodeValue = valorTotalIZQ + '%';
        document.getElementById("TotalMujeresPer").firstChild.nodeValue = valorTotalPADCH;
        document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = valorTotalPDCH + '%';


    }
    else {
        var idred = id.replace("HistDrch", "Texto");
        id = id.replace("HistDrch", "HistIzq");
        var drch = document.getElementById(id);
        var linea = document.getElementById('lineaDatos1');
        linea.setAttribute('visibility', 'visible');
        linea.setAttribute('y1', drch.getAttribute('y'));
        var texto = document.getElementById('TextocorteIzq0');
        var num = parseFloat(texto.getAttribute('y')) + 30;
        linea.setAttribute('y2', num);
        linea.setAttribute('x1', drch.getAttribute('x'));
        linea.setAttribute('x2', drch.getAttribute('x'));
        linea = document.getElementById('lineaDatos2');
        linea.setAttribute('visibility', 'visible');
        linea.setAttribute('y1', target.getAttribute('y'));
        var texto = document.getElementById('TextocorteIzq0');
        var num = parseFloat(texto.getAttribute('y')) + 30;
        linea.setAttribute('y2', num);
        num = parseFloat(target.getAttribute('x')) + parseFloat(target.getAttribute('width'));
        linea.setAttribute('x1', num);
        linea.setAttribute('x2', num);

        document.getElementById("Mujeres").firstChild.nodeValue = (valorAbsolutoIZQ);
        document.getElementById("Mujeres_p").firstChild.nodeValue = porcentajeIZQ + '%';
        if (valorAbsolutoIZQper == null) {
        }
        else {
            document.getElementById("MujeresPer").firstChild.nodeValue = (valorAbsolutoIZQper);
            document.getElementById("MujeresPer_p").firstChild.nodeValue = porcentajeIZQper + '%';

        }



        var texto = document.getElementById(idred);
        texto.setAttribute('class', 'allTextoSeleccionado TextoSeleccionado');
        texto.setAttribute('x', parseFloat(texto.getAttribute('x')) - 5);
        var posiciontextoedad = document.getElementById("re").firstChild.nodeValue.indexOf(":");
        var textoREdad = document.getElementById("re").firstChild.nodeValue.substring(0, posiciontextoedad);
        document.getElementById("re").firstChild.nodeValue = textoREdad + ': ' + texto.firstChild.nodeValue;

        drch.setAttribute('fill-opacity', '0.5');
        var porcentajeDRCH = valorPorcentajeDCH;
        var valorAbsolutoDRCH = valorAbsolutoDCH;
        var porcentajeDRCHper = valorPorcentajePerDCH;
        var valorAbsolutoDRCHper = valorAbsolutoPerDCH;
        document.getElementById("Hombres").firstChild.nodeValue = (valorAbsolutoDRCH);
        document.getElementById("Hombres_p").firstChild.nodeValue = porcentajeDRCH + '%';
        if (valorAbsolutoDRCHper == null) { }
        else {
            document.getElementById("HombresPer").firstChild.nodeValue = (valorAbsolutoDRCHper);
            document.getElementById("HombresPer_p").firstChild.nodeValue = porcentajeDRCHper + '%';
        }

        document.getElementById("TotalMujeres").firstChild.nodeValue = valorTotalAIZQ;
        document.getElementById("TotalMujeres_p").firstChild.nodeValue = valorTotalIZQ + '%';

        document.getElementById("TotalMujeresPer").firstChild.nodeValue = valorTotalPADCH;
        document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = valorTotalPDCH + '%';
        var linea = document.getElementById('lineaDatos1');
        linea.setAttribute('visibility', 'visible');
        linea.setAttribute('y1', drch.getAttribute('y'));
        var texto = document.getElementById('TextocorteIzq0');
        var num = parseFloat(texto.getAttribute('y')) + 30;
        linea.setAttribute('y2', num);
        linea.setAttribute('x1', drch.getAttribute('x'));
        linea.setAttribute('x2', drch.getAttribute('x'));
        linea = document.getElementById('lineaDatos2');
        linea.setAttribute('visibility', 'visible');
        linea.setAttribute('y1', target.getAttribute('y'));
        var texto = document.getElementById('TextocorteIzq0');
        var num = parseFloat(texto.getAttribute('y')) + 30;
        linea.setAttribute('y2', num);
        num = parseFloat(target.getAttribute('x')) + parseFloat(target.getAttribute('width'));
        linea.setAttribute('x1', num);
        linea.setAttribute('x2', num);
    }
}



function OcultarValores(evt){
 var target = evt.target;
   target.setAttribute('fill-opacity','1');
   var id =target.getAttribute("id");
   if (id.indexOf("z")>-1){
	var idred= id.replace("HistIzq","Texto");
    id= id.replace("HistIzq","HistDrch");
	var texto =  document.getElementById(idred);
	texto.setAttribute('class','allTexto TextoCortes');
	texto.setAttribute('x',parseFloat(texto.getAttribute('x'))+5);
   }
    else {
		var idred= id.replace("HistDrch","Texto");
		id= id.replace("HistDrch","HistIzq"); 
		var texto =  document.getElementById(idred);
		texto.setAttribute('class','allTexto TextoCortes');
		texto.setAttribute('x',parseFloat(texto.getAttribute('x'))+5);
	}

   var drch =  document.getElementById(id);
   drch.setAttribute('fill-opacity','1');
   document.getElementById("Hombres").firstChild.nodeValue = '' ;
    document.getElementById("Hombres_p").firstChild.nodeValue = '' ;
	//document.getElementById("porcentajeHombres").firstChild.nodeValue = 'valor porcentaje Hombres:  ' ;
    document.getElementById("HombresPer").firstChild.nodeValue = '' ;
	 document.getElementById("HombresPer_p").firstChild.nodeValue = '' ;
	//document.getElementById("porcentajeHombresPer").firstChild.nodeValue = 'valor porcentaje Hombres:  ' ;
    document.getElementById("Mujeres").firstChild.nodeValue = ' ' ;
	document.getElementById("Mujeres_p").firstChild.nodeValue = ' ' ;
	//document.getElementById("porcentajeMujeres").firstChild.nodeValue = 'valor porcentaje Mujeres:  ' ;
    document.getElementById("MujeresPer").firstChild.nodeValue = '' ;
	document.getElementById("MujeresPer_p").firstChild.nodeValue = '' ;
	//document.getElementById("porcentajeMujeresPer").firstChild.nodeValue = 'valor porcentaje Mujeres:  ';
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','hidden');
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','hidden');
	var leyenda = document.getElementById('Leyenda');
	leyenda.setAttribute('visibility','hidden');
}

function MostrarValores2H (evt){
    
    var target = evt.target;
	target.setAttribute('fill-opacity','0.5');
	
	
	var primarioPorcentajeH= target.getAttributeNS(cartoNS,"valorPorcentajeH");
	var primarioPorcentajeM= target.getAttributeNS(cartoNS,"valorPorcentajeM");
	var primarioAbsolutoH= target.getAttributeNS(cartoNS,"valorAbsolutoH");
	var primarioAbsolutoM= target.getAttributeNS(cartoNS,"valorAbsolutoM");
	
	var secundarioPorcentajeH= target.getAttributeNS(cartoNS,"valorPorcentajePerH");
	var secundarioPorcentajeM= target.getAttributeNS(cartoNS,"valorPorcentajePerM");
	var secundarioAbsolutoH= target.getAttributeNS(cartoNS,"valorAbsolutoPerH");
	var secundarioAbsolutoM= target.getAttributeNS(cartoNS,"valorAbsolutoPerM");
	

	var leyenda = document.getElementById('Leyenda');
	leyenda.setAttribute('visibility','visible');
    
    var id =target.getAttribute("id");
	    if (id.indexOf("z")>-1){
           
	// necesitamos saber el rando de edad, la etiqueta correspondiente es del tipo texto(i-3)
	//las etiqueta correspondiente a la seleccion es del tipo ....IzqN
		var edad =id.substring(id.lastIndexOf("q")+1);
		var texto =  document.getElementById('texto' + (edad-3));
		texto.setAttribute('class','allTextoSeleccionado TextoSeleccionado');
		texto.setAttribute('x',parseFloat(texto.getAttribute('x'))-5);
		var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
		var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
		document.getElementById("re").firstChild.nodeValue =textoREdad + ': ' + texto.firstChild.nodeValue;
        id= id.replace("Izq","Drch");
        var drch =  document.getElementById(id);
		drch.setAttribute('fill-opacity','0.5');
		document.getElementById("Hombres").firstChild.nodeValue =  (primarioAbsolutoH);
		document.getElementById("Hombres_p").firstChild.nodeValue =   primarioPorcentajeH + '%';
		document.getElementById("HombresPer").firstChild.nodeValue =  (secundarioAbsolutoH) ;
		document.getElementById("HombresPer_p").firstChild.nodeValue =  secundarioPorcentajeH + '%';
		document.getElementById("Mujeres").firstChild.nodeValue =  (primarioAbsolutoM) ;
		document.getElementById("Mujeres_p").firstChild.nodeValue = primarioPorcentajeM + '%';
		document.getElementById("MujeresPer").firstChild.nodeValue =  (secundarioAbsolutoM) ;
		document.getElementById("MujeresPer_p").firstChild.nodeValue =  secundarioPorcentajeM + '%';
		document.getElementById("TotalMujeres").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalA");
		document.getElementById("TotalMujeres_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotal") + '%';
		document.getElementById("TotalMujeresPer").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalPA");
		document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalP") + '%';
    	 var linea = document.getElementById('lineaDatos1');
	    linea.setAttribute('visibility','visible');
	    linea.setAttribute('y1',drch.getAttribute('y'));
	    var texto = document.getElementById('texto0');
	    var num =parseFloat(texto.getAttribute('y'))+30;
	    linea.setAttribute('y2',num);
	    num = parseFloat(drch.getAttribute('x')) + parseFloat(drch.getAttribute('width'));
	    linea.setAttribute('x1',num);
        linea.setAttribute('x2',num);
	    linea = document.getElementById('lineaDatos2');
	    linea.setAttribute('visibility','visible');
	    linea.setAttribute('y1',target.getAttribute('y'));
	    var texto = document.getElementById('texto0');
	    var num =parseFloat(texto.getAttribute('y'))+30;
	    linea.setAttribute('y2',num);
	    linea.setAttribute('x1',target.getAttribute('x'));
        linea.setAttribute('x2',target.getAttribute('x'));
     }
    else {
    
    // mostrar lineas verticales
    
		var edad =id.substring(id.lastIndexOf("h")+1);
		
		var texto =  document.getElementById('texto' + (edad-3));
		texto.setAttribute('class','allTextoSeleccionado TextoSeleccionado');
		texto.setAttribute('x',parseFloat(texto.getAttribute('x'))-5);
		var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
		var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
		document.getElementById("re").firstChild.nodeValue =textoREdad + ': ' + texto.firstChild.nodeValue;
		id= id.replace("Drch","Izq");
		var drch =  document.getElementById(id);
		drch.setAttribute('fill-opacity','0.5');
		document.getElementById("Hombres").firstChild.nodeValue = ( primarioAbsolutoH);
		document.getElementById("Hombres_p").firstChild.nodeValue = primarioPorcentajeH + '%';
		document.getElementById("HombresPer").firstChild.nodeValue = (  secundarioAbsolutoH); 
		document.getElementById("HombresPer_p").firstChild.nodeValue =secundarioPorcentajeH + '%';
		document.getElementById("Mujeres").firstChild.nodeValue = ( primarioAbsolutoM) ;
		document.getElementById("Mujeres_p").firstChild.nodeValue =  primarioPorcentajeM + '%';
		document.getElementById("MujeresPer").firstChild.nodeValue = ( secundarioAbsolutoM) ;
		document.getElementById("MujeresPer_p").firstChild.nodeValue = secundarioPorcentajeM + '%';
		document.getElementById("TotalMujeres").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalA");
		document.getElementById("TotalMujeres_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotal") + '%';
		document.getElementById("TotalMujeresPer").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalPA");
		document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalP") + '%';
        var linea = document.getElementById('lineaDatos1');
	    linea.setAttribute('visibility','visible');
	    linea.setAttribute('y1',drch.getAttribute('y'));
	    var texto = document.getElementById('texto0');
	    var num =parseFloat(texto.getAttribute('y'))+30;
	    linea.setAttribute('y2',num);
	    linea.setAttribute('x1',drch.getAttribute('x'));
        linea.setAttribute('x2',drch.getAttribute('x'));
	    linea = document.getElementById('lineaDatos2');
	    linea.setAttribute('visibility','visible');
	    linea.setAttribute('y1',target.getAttribute('y'));
	    var texto = document.getElementById('texto0');
	    var num =parseFloat(texto.getAttribute('y'))+30;
	    linea.setAttribute('y2',num);
	    num = parseFloat(target.getAttribute('x')) + parseFloat(target.getAttribute('width'));
	    linea.setAttribute('x1',num);
        linea.setAttribute('x2',num);
	}
 
}

function OcultarValores2H(evt){
 var target = evt.target;
   target.setAttribute('fill-opacity','1');
   var id =target.getAttribute("id");
   var leyenda = document.getElementById('Leyenda');
	leyenda.setAttribute('visibility','hidden');
   if (id.indexOf("z")>-1){
		var edad =id.substring(id.lastIndexOf("q")+1);
		var texto =  document.getElementById('texto' + (edad-3));
		texto.setAttribute('class','allTexto TextoCortes');
		texto.setAttribute('x',parseFloat(texto.getAttribute('x'))+5);
		var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
		var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
		document.getElementById("re").firstChild.nodeValue =textoREdad + ': ';
		id= id.replace("Izq","Drch");
   }
    else {
		var edad =id.substring(id.lastIndexOf("h")+1);
		var texto =  document.getElementById('texto' + (edad-3));
		texto.setAttribute('class','allTexto TextoCortes');
		texto.setAttribute('x',parseFloat(texto.getAttribute('x'))+5);
		var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
		var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
		document.getElementById("re").firstChild.nodeValue =textoREdad + ': ';
		id= id.replace("Drch","Izq"); }
   var drch =  document.getElementById(id);
   drch.setAttribute('fill-opacity','1');
    document.getElementById("Hombres").firstChild.nodeValue = '' ;
	document.getElementById("HombresPer").firstChild.nodeValue = '' ;
	document.getElementById("Mujeres").firstChild.nodeValue = ' ' ;
	document.getElementById("MujeresPer").firstChild.nodeValue = '' ;
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','hidden');
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','hidden');
	var leyenda = document.getElementById('Leyenda');
	leyenda.setAttribute('visibility','hidden');
	
	
}


function MostrarValoresPerfilUnico (evt){
   
    var target = evt.target;
    var porcentajeIZQ=target.getAttributeNS(cartoNS,"valorPorcentaje");
    var valorAbsolutoIZQ=target.getAttributeNS(cartoNS,"valorAbsoluto");
	var porcentajeIZQper=target.getAttributeNS(cartoNS,"valorPorcentajePer");
    var valorAbsolutoIZQper=target.getAttributeNS(cartoNS,"valorAbsolutoPer");
	var leyenda = document.getElementById('Leyenda');
	leyenda.setAttribute('visibility','visible');
    var id =target.getAttribute("id");
    if (id.indexOf("z")>-1){
    //mostramos las lineas verticales
   
     var idred= id.replace("HistIzq","Texto");
	id= id.replace("HistIzq","HistDrch");
	var drch =  document.getElementById(id);
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',drch.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	num = parseFloat(drch.getAttribute('x')) + parseFloat(drch.getAttribute('width'));
	linea.setAttribute('x1',num);
    linea.setAttribute('x2',num);
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',target.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	linea.setAttribute('x1',target.getAttribute('x'));
    linea.setAttribute('x2',target.getAttribute('x'));
    
	//los datos que obtenemos son los de la izquierda
	document.getElementById("Hombres").firstChild.nodeValue =  (valorAbsolutoIZQ) ;
	document.getElementById("Hombres_p").firstChild.nodeValue = porcentajeIZQ + '%';
    document.getElementById("HombresPer").firstChild.nodeValue =  (valorAbsolutoIZQper);
	document.getElementById("HombresPer_p").firstChild.nodeValue =  porcentajeIZQper + '%';
   
	var texto =  document.getElementById(idred);
	texto.setAttribute('class','allTextoSeleccionado TextoSeleccionado');
	texto.setAttribute('x',parseFloat(texto.getAttribute('x'))-5);
	var edad = texto.firstChild.nodeValue;
	var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
	var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
	document.getElementById("re").firstChild.nodeValue =textoREdad + ': ' + edad;
		
    var porcentajeDRCH=drch.getAttributeNS(cartoNS,"valorPorcentaje");
    var valorAbsolutoDRCH=drch.getAttributeNS(cartoNS,"valorAbsoluto");
	var porcentajeDRCHper=drch.getAttributeNS(cartoNS,"valorPorcentajePer");
    var valorAbsolutoDRCHper=drch.getAttributeNS(cartoNS,"valorAbsolutoPer");
    document.getElementById("Mujeres").firstChild.nodeValue = (valorAbsolutoDRCH) ;
	document.getElementById("Mujeres_p").firstChild.nodeValue = porcentajeDRCH + '%';
    document.getElementById("MujeresPer").firstChild.nodeValue = (valorAbsolutoDRCHper) ;
	document.getElementById("MujeresPer_p").firstChild.nodeValue = porcentajeDRCHper + '%';
	document.getElementById("TotalMujeres").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalPA");
	document.getElementById("TotalMujeres_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalP") + '%';
	document.getElementById("TotalMujeresPer").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalPA");
	document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalP") + '%';
	
    }
    else {
    
    // mostramos las lineas verticales
    var idred= id.replace("HistDrch","Texto");
	id= id.replace("HistDrch","HistIzq");
	var drch =  document.getElementById(id);
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',drch.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	linea.setAttribute('x1',drch.getAttribute('x'));
    linea.setAttribute('x2',drch.getAttribute('x'));
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','visible');
	linea.setAttribute('y1',target.getAttribute('y'));
	var texto = document.getElementById('TextocorteIzq0');
	var num =parseFloat(texto.getAttribute('y'))+30;
	linea.setAttribute('y2',num);
	num = parseFloat(target.getAttribute('x')) + parseFloat(target.getAttribute('width'));
	linea.setAttribute('x1',num);
    linea.setAttribute('x2',num);
    
	document.getElementById("Mujeres").firstChild.nodeValue =  (valorAbsolutoIZQ) ;
	document.getElementById("Mujeres_p").firstChild.nodeValue =  porcentajeIZQ + '%';
	document.getElementById("MujeresPer").firstChild.nodeValue =  (valorAbsolutoIZQper) ;
	document.getElementById("MujeresPer_p").firstChild.nodeValue =  porcentajeIZQper + '%';
 
	var texto =  document.getElementById(idred);
	texto.setAttribute('class','allTextoSeleccionado TextoSeleccionado');
	texto.setAttribute('x',parseFloat(texto.getAttribute('x'))-5);
	var posiciontextoedad=document.getElementById("re").firstChild.nodeValue.indexOf(":");
	var textoREdad=document.getElementById("re").firstChild.nodeValue.substring(0,posiciontextoedad);
	document.getElementById("re").firstChild.nodeValue =textoREdad + ': ' + texto.firstChild.nodeValue;
		
    var porcentajeDRCH=drch.getAttributeNS(cartoNS,"valorPorcentaje");
    var valorAbsolutoDRCH=drch.getAttributeNS(cartoNS,"valorAbsoluto");
	var porcentajeDRCHper=drch.getAttributeNS(cartoNS,"valorPorcentajePer");
    var valorAbsolutoDRCHper=drch.getAttributeNS(cartoNS,"valorAbsolutoPer");
	document.getElementById("Hombres").firstChild.nodeValue =  (valorAbsolutoDRCH);
	document.getElementById("Hombres_p").firstChild.nodeValue =  porcentajeDRCH + '%';
	document.getElementById("HombresPer").firstChild.nodeValue =  (valorAbsolutoDRCHper) ;
	document.getElementById("HombresPer_p").firstChild.nodeValue =  porcentajeDRCHper + '%';

	document.getElementById("TotalMujeres").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalPA");
	document.getElementById("TotalMujeres_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalP") + '%';

	document.getElementById("TotalMujeresPer").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalPA");
	document.getElementById("TotalMujeresPer_p").firstChild.nodeValue = target.getAttributeNS(cartoNS, "valorTotalP") + '%';
	
	}
}

function OcultarValoresPerfilUnico(evt){
 var target = evt.target;
   var id =target.getAttribute("id");
   if (id.indexOf("z")>-1){
	var idred= id.replace("HistIzq","Texto");
    id= id.replace("HistIzq","HistDrch");
	var texto =  document.getElementById(idred);
	texto.setAttribute('class','allTexto TextoCortes');
	texto.setAttribute('x',parseFloat(texto.getAttribute('x'))+5);
   }
    else {
		var idred= id.replace("HistDrch","Texto");
		id= id.replace("HistDrch","HistIzq"); 
		var texto =  document.getElementById(idred);
		texto.setAttribute('class','allTexto TextoCortes');
		texto.setAttribute('x',parseFloat(texto.getAttribute('x'))+5);
	}

   var drch =  document.getElementById(id);
    document.getElementById("Hombres").firstChild.nodeValue = '' ;
    document.getElementById("Hombres_p").firstChild.nodeValue = '' ;
	document.getElementById("HombresPer").firstChild.nodeValue = '' ;
	document.getElementById("HombresPer_p").firstChild.nodeValue = '' ;
	document.getElementById("Mujeres").firstChild.nodeValue = ' ' ;
	document.getElementById("Mujeres_p").firstChild.nodeValue = ' ' ;
	document.getElementById("MujeresPer").firstChild.nodeValue = '' ;
	document.getElementById("MujeresPer_p").firstChild.nodeValue = '' ;
	var linea = document.getElementById('lineaDatos1');
	linea.setAttribute('visibility','hidden');
	linea = document.getElementById('lineaDatos2');
	linea.setAttribute('visibility','hidden');
	var leyenda = document.getElementById('Leyenda');
	leyenda.setAttribute('visibility','hidden');
}

