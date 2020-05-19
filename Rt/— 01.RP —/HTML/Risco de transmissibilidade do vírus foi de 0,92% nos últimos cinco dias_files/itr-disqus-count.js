var ITRDISQUSWIDGETS;
typeof ITRDISQUSWIDGETS == "undefined" && (ITRDISQUSWIDGETS = function (){
    var func = {};
    func.req = function (group){
        var MAX_LENGTH_URL = 1900;//2048 - el margen suficiente para el path, el grupo y el ultimo identificador
        var listadoElementosA;
        listadoElementosA = jQryIter("a[data-disqus-identifier]");

        var paramString = "";
        if(listadoElementosA != null && listadoElementosA != undefined){
	        for (var index = 0; index < listadoElementosA.length; index++) {
	            paramString = paramString.concat("&id=").concat(listadoElementosA.get(index).getAttribute("data-disqus-identifier"));
	            if(paramString.length >= MAX_LENGTH_URL){
	                jQryIter.get("/Disqus-portlet/getcommentscount?group=".concat(group).concat(paramString), 
	                    function(data,status){
	                        if(status == 'success'){
	                            ITRDISQUSWIDGETS.resp(data);
	                        }
	                    }
	                );
	                paramString = "";
	            }
	        }
        }
        if(paramString.length > 0){
             jQryIter.get("/Disqus-portlet/getcommentscount?group=".concat(group).concat(paramString), 
                function(data,status){
                    if(status == 'success'){
                        ITRDISQUSWIDGETS.resp(data);
                    }
                }
            );
        }
    };
    
    func.resp = function (data){
 	   var jsonOb = JSON.parse(data);

 	    jQryIter.each(jsonOb.counts, function(index, value){

             var elems = jQryIter("a[data-disqus-identifier='"+value.id+"']"); 
             if(elems != null && elems != undefined){
                 for(var index = 0; index < elems.length; index++)
                 {
                     var elem = elems[index];
                     var text;
                     switch (value.counter) 
                     {
                     case 0:
                         text = jsonOb.zero;
                         break;
                     case 1:
                         text = jsonOb.one;
                         break;
                     default:
                         text = jsonOb.multiple;
                     }
                     text = text.replace("{num}", value.counter);
                     elem.innerHTML = text;  
                 }
             }	  
         });  
    };
    
    return func;
}());