    // https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.js
    // SAMPLE https://jsfiddle.net/ningunaparte/9gm68vmn/
    
    // ES LOCATION
    // d3.locale Spanish Spain / Español
    // https://github.com/mbostock/d3/wiki/Localization
    
    var es_ES = {
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["€", ""],
        "dateTime": "%a %b %e %X %Y",
        "date": "%d/%m/%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
        "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    };

var ES = d3.timeFormatDefaultLocale(es_ES);     //formateo de fechas
var ES2 = d3.formatDefaultLocale(es_ES);        //formateo de números

    // PARAMS AVAILABLE https://github.com/mbostock/d3/wiki/Time-Formatting