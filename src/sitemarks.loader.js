(function sitemarksWrapper () {

	appendFile('sitemarks.min.css', 'css', 'sitemarks-styles');
	var appjs = appendFile('sitemarks.built.js', 'js', 'sitemarks-app-build');
	if (!appjs) {
		window.sitemarks.app.init();
	}

	function appendFile (src, type, id) {
		var create = {
				js: function () {
					var s = document.createElement('script');
					s.async = true;
					s.src = src;
					s.id = id;
					return s;
				},
				css: function () {
					var ss = document.createElement('link');
					ss.type = 'text/css';
					ss.rel = 'stylesheet';
					ss.href = src;
					ss.id = id;
					return ss;
				}
			},
			existing = document.getElementById(id),
			el;
		if (existing) {
			return false;
		}
		if (!create.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}
		el = create[type]();
		document.getElementsByTagName('head')[0].appendChild(el);
		return true;
	}
}());