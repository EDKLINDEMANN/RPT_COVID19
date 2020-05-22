function validateThis_prod(){
	return grecaptcha.getResponse();
}

function close_popup(){
	console.log("Hello");
	jQuery('.popmessage').css('display','none');
}

function timer(){
	var sec = 6;
	var timer = setInterval(function() {
	   sec--;
	   if (sec == -1) {
	      jQuery('.popmessage').remove();
	      clearInterval(timer);
	   }
	}, 1000);
}

jQuery(document).ready(function ($) {
	$('.form_openener').find('p').remove();
	$('.form_openener').find('br').remove();

	$('.form_openener').on('click', function(){
		if($(this).hasClass('opened')){
			$('.form_revealer').css('display', 'none');
			$('.form_openener').removeClass('opened');
		}else{
			$('.form_revealer').css('display', 'flex');
			$('.form_openener').addClass('opened');
		}		
	})
})