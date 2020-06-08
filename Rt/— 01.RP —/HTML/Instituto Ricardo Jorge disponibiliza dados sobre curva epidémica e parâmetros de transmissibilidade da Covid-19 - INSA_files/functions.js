/**
 * Created by Rodolfo on 19/09/2016.
 */

function nextNews(orientation, total){

    if(orientation){
        for(var i = 0; i < total; i++){

            if(!jQuery("#news"+i).hasClass("hide")){
                jQuery("#news"+i).addClass("hide");
                i=i+2;
            }else{
                jQuery("#news"+i).removeClass("hide");
            }

        }
    }else{
        for(var i = total-1; i > 0; i--){

            if(jQuery("#news"+i).hasClass("hide")){
                jQuery("#news"+i).removeClass("hide");
                i=i-1;
            }else{
                jQuery("#news"+i).addClass("hide");
            }

        }
    }
}