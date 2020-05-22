jQuery( function ( $ ) {
	// Focus styles for menus when using keyboard navigation
	// Properly update the ARIA states on focus (keyboard) and mouse over events
	//jQuery(window).keypress(function(e) {
	//	if (e.which == 13)
	//		return false;
	//});
	jQuery( '[aria-haspopup="true"]' ).each(function(index) {
		var menuitem = jQuery( this );
		var submenu = menuitem.next();
		
		menuitem.on("mouseenter.wparia", function(){
			menuitem.attr( 'aria-expanded', true );
			submenu.addClass('focused');
			submenu.addClass('block');
		});
		
		menuitem.on("mouseleave.wparia", function(){
			menuitem.attr( 'aria-expanded', false );
			submenu.removeClass('focused');
			submenu.removeClass('block');
		});
		
		menuitem.click(function(event){
			if(submenu.is(":visible"))
			{
				submenu.removeClass('block');
				menuitem.attr( 'aria-expanded', false );
				submenu.removeClass('focused');
			}
			else
			{
				submenu.addClass('block');
				menuitem.attr( 'aria-expanded', true );
				submenu.addClass('focused');
			}
		});
		
		submenu.find( 'li a' ).each(function(index) {
			jQuery(this).on("focus.wparia", function(){
				menuitem.attr( 'aria-expanded', true );
				submenu.addClass('block');
			});
		});
		
	});
} );