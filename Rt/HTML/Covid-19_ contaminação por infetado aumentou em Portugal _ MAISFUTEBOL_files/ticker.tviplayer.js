// TICKER TVIPLAYER

(function() {
	
	var hostname = location.hostname;
	var url = location.href;
	
	var tickerId;
	var tickerUrl = 'https://tviplayer.iol.pt/ticker/' + hostname;			// URL do iframe
	var tickerStatusUrl = 'https://tviplayer.iol.pt/ticker/status/' + hostname;	// URL para ver se tem destaques
	
	var maxTickerViews = 3;						// Máximo de visualizações de um destaque específico
	var tickerSlideSpeed = 500;  				// Velocidade de subir e baixar do slide: 500ms
	var tickerInitialWait = 5 * 1000;  			// Tempo de espera quando página abre: 5 seconds
	var timeoutToClose = 10 * 1000; 			// Tempo até fechar automáticamente: 10 seconds
	var timeoutToShowAgain = 10 * 60 * 1000;  	// Tempo de intervalo entre voltar a mostrar o mesmo destaque: 10 minutes
	
	var timeoutToCloseStatus = timeoutToClose;
	var timeoutInterval;
	var showAgainInterval;

	// Set Cookie	
	var setCookie = function(cname, cvalue, exdays) {
	    var d = new Date();
	    var timestamp = d.getTime();
	    d.setTime(timestamp + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	    document.cookie = cname + "-last=" + (timestamp+timeoutToClose) + "; " + expires;
	};

	// Get Cookie
	var getCookie = function(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    }
	    return "";
	};

	// Close Ticker
	var closeTicker = function() {

		clearInterval(timeoutInterval);
		jQuery('#' + tickerId).animate({ bottom: '-100px'}, tickerSlideSpeed, function() {
			jQuery('#' + tickerId).remove();
			timeoutToCloseStatus = timeoutToClose;  // reset do timer de fecho
			
			setTimeout(init, timeoutToShowAgain);	// programar para voltar a checkar/abrir mesmo destaque
		});
		return false;
	};
	
	// Activate Timeout
	var activateTimeout = function() {
		
		var timeoutCycle = function() {
			timeoutToCloseStatus -= 1000;
			if(timeoutToCloseStatus < 0) {
				setTimeout(closeTicker, 1000);
				return;
			}
			
			jQuery(' .timeout', '#' + tickerId).html( timeoutToCloseStatus / 1000 );
		};
		
		timeoutInterval = setInterval(timeoutCycle, 1000);
	};
	
	// Show Ticker on the page
	var show = function() {
		var site = location.hostname;
		var cookieCount = getCookie(tickerId) || 0;

		if(cookieCount < maxTickerViews) {
			var template = 
				'<iframe src="' + tickerUrl + '" style="width: 100%; height: 100px; border:0;background-color: transparent;" scrolling="no" height="100" frameborder="0"></iframe>' +
				'<a class="ticker-close" href="" style="display:block; position: absolute; right: 0; bottom:0;  width: 50px; text-align: center; font-size: 12px; color:#474747;height: 46px; padding:20px 0 0 10px;">' +
					'<img src="http://tviplayer.iol.pt/img/fechar.png" alt="Fechar" style="display:block;"/>' +
					'<span class="timeout">' + (timeoutToCloseStatus / 1000) + '</span>s' +
				'</a>';
			
			jQuery('<div id="' + tickerId + '" style="position:fixed; bottom:-100px; width: 100%; height: 100px; z-index: 1000001;"></div>')
			.html(template)
			.appendTo('body')
			.animate({ bottom: 0 }, tickerSlideSpeed, activateTimeout)
			.find('.ticker-close').click( function(e) {
				e.preventDefault();
				closeTicker();
				
				// 
				setCookie(tickerId, maxTickerViews, 1);
			});
			
			// guardar no cookie num de vezes q determinado destaque foi visto
			cookieCount = parseInt(cookieCount)+1;
			setCookie(tickerId, cookieCount, 1);
		}
	};
	
	// Init Ticker - check if status ok
	var initTicker = function(data) {
		if(data.status == 1) {
			tickerId = 'ticker-tviplayer-' + data.id;
			
			// vê quando foi última vez que mesmo destaque foi visto, e se for menos que os 10mins (por ex), mete timeout com a diferença
			var lastCookie = getCookie(tickerId + '-last') || 0;
			lastCookie = parseInt(lastCookie);
			var d = new Date();
			var timestamp = d.getTime();
			
			var wait = tickerInitialWait;
			if(lastCookie != 0 && timestamp - lastCookie < timeoutToShowAgain) {
				wait = timeoutToShowAgain - (timestamp - lastCookie);
			}
			
			window.setTimeout(show, wait);
		}
	};
	
	// Init
	var init = function() {
		$.getJSON(tickerStatusUrl, initTicker);
	};
	
	init();
	
})();