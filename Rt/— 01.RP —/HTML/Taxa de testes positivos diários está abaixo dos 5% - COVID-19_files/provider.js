function AjaxCaller(){

	jQuery("#popup").removeClass("hide");
	jQuery("#popupbg").removeClass("hide");


	google.maps.Map.prototype.clearOverlays = function() {
		for (var i = 0; i < markersArray.length; i++ ) {
			markersArray[i].setMap(null);
		}
		markersArray.length = 0;
	}

	

	jQuery.ajax({
		url : postprovider.ajax_url,
		type : 'post',
		data : {
			action : 'SearchProvider',
			region : '',
			district : jQuery("#districtList").val(),
			providertype : jQuery("#providertypeid").val(),
			council : jQuery("#councilList").val(),
			civilparish : jQuery("#civilparishsList").val(),

		},
		success : function( response ) {
			if(response!="{}"){
				var obj = jQuery.parseJSON(response);
				var i=0;
				var html = "";
				if (obj.length!=null){

					for(var i=0; i<obj.length;i++ ){

						var name = obj[i]["ProviderName"].split("(");
						if(name[0].length>1){
							if (name.length>1){
								var subname = "("+name[1];
							}else {
								subname="";
								name[0] = obj[i]["ProviderName"];
							}
						}
	// onclick="addmakerToMap(\''+obj[i]["Latitude"].replace(",",".")+'\',\''+obj[i]["Longitude"].replace(",",".")+'\', \''+name+'\', \''+subname+'\', \''+obj[i]["Address"]+'\', \''+obj[i]["PhoneNumber"]+'\' )"
						html= html +'<div class="detailsProvider" id="detailsProvider'+i+'\" ">'+
									'<ul>'+
									'<li class="name">'+obj[i]["ProviderName"]+'</li>'+
									'<li class="address">'+obj[i]["Address"]+', '+obj[i]["PostalCodeNumber"]+' '+obj[i]["PostalCodeDescription"]+'</li>';
									if(obj[i]["details"]["Scheduler"] != undefined){
										if(obj[i]["details"]["Scheduler"]["SchedulerItem"] != undefined){
											for(var e=0; e<obj[i]["details"]["Scheduler"]["SchedulerItem"].length;e++ ){
												switch(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["WeekDay"]){
													case "Monday" :
														html = html + '<li>Segunda-Feira das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Tuesday" :
														html = html + '<li>Terça-Feira das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Wednesday" :
														html = html + '<li>Quarta-Feira das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Thursday" :
														html = html + '<li>Quinta-Feira das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Friday" :
														html = html + '<li>Sexta-Feira das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "MondayToFriday" :
														html = html + '<li>Dias Úteis das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "MondayToSunday" :
														html = html + '<li>Segunda a Domingo das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Saturday" :
														html =html + '<li>Sábado das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														
														break;
													case "Sunday" :
														html = html + '<li>Domingo das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														
														break;
													case "Holiday" :
														html = html + '<li>Feriado das ';
														inidate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj[i]["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														
													break;
											}
											
											
										}
									}else{
										html = html + "<li>Encerrado</li>";
									}
								}else{
									html = html + "<li>Encerrado</li>";
								}
									html = html + '</ul>'+
									'</div>';
					}
				}else{
					if(obj['ProviderLocation']!= null){
						var name = obj['ProviderLocation']["ProviderName"].split("(");
						if(name.length>1){
							var subname = "("+name[1];
						}else {
								subname="";
								name[0] = obj['ProviderLocation']["ProviderName"];
						}
						html= html + '<div class="detailsProvider" id="detailsProvider'+i+'\" ">'+
							'<ul>'+
							'<li class="name">'+obj['ProviderLocation']["ProviderName"]+'</li>'+
							'<li class="address">'+obj['ProviderLocation']["Address"]+', '+obj['ProviderLocation']["PostalCodeNumber"]+' '+obj['ProviderLocation']["PostalCodeDescription"]+'</li>';
							if(obj['ProviderLocation']["details"]["Scheduler"] != undefined ){
								if(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"] != undefined ){
									for(var e=0; e<obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"].length;e++ ){
										switch(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["WeekDay"]){
													case "Monday" :
														html = html + '<li>Segunda-Feira das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Tuesday" :
														html = html + '<li>Terça-Feira das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Wednesday" :
														html = html + '<li>Quarta-Feira das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Thursday" :
														html = html + '<li>Quinta-Feira das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Friday" :
														html = html + '<li>Sexta-Feira das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "MondayToFriday" :
														html = html + '<li>Dias Úteis das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "MondayToSunday" :
														html = html + '<li>Segunda a Domingo das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														break;
													case "Saturday" :
														html =html + '<li>Sábado das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														
														break;
													case "Sunday" :
														html = html + '<li>Domingo das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														
														break;
													case "Holiday" :
														html = html + '<li>Feriado das ';
														inidate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["BeginPeriod"]);
														enddate = new Date(obj['ProviderLocation']["details"]["Scheduler"]["SchedulerItem"][e]["EndPeriod"]);
														html = html + inidate.toLocaleTimeString().split(':')[0]+'h'+inidate.toLocaleTimeString().split(':')[1]+' às '+enddate.toLocaleTimeString().split(':')[0]+'h'+enddate.toLocaleTimeString().split(':')[1]+ '</li>';
														
														break;
												}
									}
								}else{
									html = html + "<li>Encerrado</li>";
								}
							}else{
								html = html + "<li>Encerrado</li>";
							}
							html = html + '</ul>'+
							'</div>';
					}
				}
			}else{
				jQuery("#listResults").html("<span>O ADC não foi encontrado</span>");
			}
			jQuery("#popup").addClass("hide");
			jQuery("#popupbg").addClass("hide");
			jQuery("#resultsdivlabel").removeClass("hide");
			jQuery("#listResults").html(html);
			//jQuery("#SeachrProvider").enhanceWithin();

		}


	});

}

function EnableButton(){
	jQuery('#submitFormAdc').prop('disabled', false);

}

function SearchCivilParishs(){
	jQuery("#popup").removeClass("hide");
	jQuery("#popupbg").removeClass("hide");
	jQuery("#resultsdivlabel").addClass("hide");
	jQuery("#listResults").html("");
	
	jQuery.ajax({
		url : postprovider.ajax_url,
		type : 'post',
		data : {
			action : 'SearchCivilParishs',
			council : jQuery("#councilList").val(),
		},
		success : function( response ) {
			 jQuery("#civilparishsList").html(response.substring(0, response.length - 1));
			 jQuery("#popup").addClass("hide");
			jQuery("#popupbg").addClass("hide");
			jQuery('#submitFormAdc').prop('disabled', true);
		}
		});

	return false;
}


function SearchCouncil(){
	jQuery("#popup").removeClass("hide");
	jQuery("#popupbg").removeClass("hide");
	jQuery("#resultsdivlabel").addClass("hide");
	jQuery("#listResults").html("");
	
	jQuery.ajax({
		url : postprovider.ajax_url,
		type : 'post',
		data : {
			action : 'SearchCouncil',
			district : jQuery("#districtList").val(),
		},
		success : function( response ) {
			 jQuery("#councilList").html(response.substring(0, response.length - 1));
			 jQuery("#civilparishsList").html("<option value ='0' selected>Selecione a Freguesia</option>");
			 jQuery("#popup").addClass("hide");
			jQuery("#popupbg").addClass("hide");
			jQuery('#submitFormAdc').prop('disabled', true);
		}
		});

	return false;
}

function adcchange(){
	jQuery("#listResults").html("");
}


function openclose(id) {

	if(jQuery("#detailsProvider"+id).hasClass("hide")){
		jQuery("#detailsProvider"+id).removeClass("hide");
		jQuery("#arrow_"+id).removeClass("fa-angle-down");
		jQuery("#arrow_"+id).addClass("fa-angle-up");
	}else{
		jQuery("#detailsProvider"+id).addClass("hide");
		jQuery("#arrow_"+id).removeClass("fa-angle-up");
		jQuery("#arrow_"+id).addClass("fa-angle-down");
	}

}



var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('googleMap'), {
		center: {lat: 38.756928, lng: -9.147162},
		zoom: 18
	});

	var marker=new google.maps.Marker({
		position: {lat: 38.756928, lng: -9.147162},
	});

	marker.setMap(map);
}


function addmakerToMap(i,lat, lon, name, subname, address, phone){
	openclose(i);

	var marker=new google.maps.Marker({
		position: {lat: parseFloat(lat), lng: parseFloat(lon)},
		label : name,
		title : name
	});

	var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<span id="firstHeading" class="firstHeading"><b>'+name+'</b></span>'+
		'<div id="bodyContent">'+
		'<span>'+subname+'</span>'+
		'</div>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});


	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});

	map.setCenter(new google.maps.LatLng(parseFloat(lat), parseFloat(lon)));
	marker.setMap(map);
}

jQuery.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDm5wtQtrtB39tr-RTfQXsOgqCzKw8RGh4&callback=initMap", function(){});