(function sitemarksWrapper () {

	appendFile('css/sitemarks.min.css', 'sitemarks-styles', 'css');
	appendFile('build/sitemarks.merged.js', 'sitemarks-app-build', 'js');

	function appendFile (src, id, type) {
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
		true;
	}
}());