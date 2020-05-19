
function loadScripts() {
	var script;

	if (!window.jQuery) {
		script = document.createElement("script");
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
		script.type = 'text/javascript';

		document.getElementsByTagName("head")[0].appendChild(script);
	}
}
loadScripts();


