(function sitemarksWrapper () {
	var sitemarksStyles = '#sitemarks-container{position:fixed;top:0;left:10px;width:200px;z-index:9999;background-color:rgba(0,0,0,0.7);padding:12px 8px 16px 8px;text-align:left;font-size:12px;font-family:Verdana,Arial,sans-serif;color:#ccc;border-bottom-left-radius:2px;border-bottom-right-radius:2px;box-shadow:0 0 10px rgba(0,0,0,0.7);text-shadow:1px 1px 1px rgba(0,0,0,0.5)}#sitemarks-container html,#sitemarks-container body,#sitemarks-container div,#sitemarks-container span,#sitemarks-container applet,#sitemarks-container object,#sitemarks-container iframe,#sitemarks-container h1,#sitemarks-container h2,#sitemarks-container h3,#sitemarks-container h4,#sitemarks-container h5,#sitemarks-container h6,#sitemarks-container p,#sitemarks-container blockquote,#sitemarks-container pre,#sitemarks-container a,#sitemarks-container abbr,#sitemarks-container acronym,#sitemarks-container address,#sitemarks-container big,#sitemarks-container cite,#sitemarks-container code,#sitemarks-container del,#sitemarks-container dfn,#sitemarks-container em,#sitemarks-container img,#sitemarks-container ins,#sitemarks-container kbd,#sitemarks-container q,#sitemarks-container s,#sitemarks-container samp,#sitemarks-container small,#sitemarks-container strike,#sitemarks-container strong,#sitemarks-container sub,#sitemarks-container sup,#sitemarks-container tt,#sitemarks-container var,#sitemarks-container b,#sitemarks-container u,#sitemarks-container i,#sitemarks-container center,#sitemarks-container dl,#sitemarks-container dt,#sitemarks-container dd,#sitemarks-container ol,#sitemarks-container ul,#sitemarks-container li,#sitemarks-container fieldset,#sitemarks-container form,#sitemarks-container label,#sitemarks-container legend,#sitemarks-container table,#sitemarks-container caption,#sitemarks-container tbody,#sitemarks-container tfoot,#sitemarks-container thead,#sitemarks-container tr,#sitemarks-container th,#sitemarks-container td,#sitemarks-container article,#sitemarks-container aside,#sitemarks-container canvas,#sitemarks-container details,#sitemarks-container embed,#sitemarks-container figure,#sitemarks-container figcaption,#sitemarks-container footer,#sitemarks-container header,#sitemarks-container hgroup,#sitemarks-container menu,#sitemarks-container nav,#sitemarks-container output,#sitemarks-container ruby,#sitemarks-container section,#sitemarks-container summary,#sitemarks-container time,#sitemarks-container mark,#sitemarks-container audio,#sitemarks-container video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}#sitemarks-container article,#sitemarks-container aside,#sitemarks-container details,#sitemarks-container figcaption,#sitemarks-container figure,#sitemarks-container footer,#sitemarks-container header,#sitemarks-container hgroup,#sitemarks-container menu,#sitemarks-container nav,#sitemarks-container section{display:block}#sitemarks-container body{line-height:1}#sitemarks-container ol,#sitemarks-container ul{list-style:none}#sitemarks-container blockquote,#sitemarks-container q{quotes:none}#sitemarks-container blockquote:before,#sitemarks-container blockquote:after,#sitemarks-container q:before,#sitemarks-container q:after{content:none}#sitemarks-container table{border-collapse:collapse;border-spacing:0}#sitemarks-container .sitemarks-title{font-weight:normal;color:#ccc;font-size:16px}#sitemarks-container .sitemarks-title a{font-size:12px;color:#ccc;text-decoration:none}#sitemarks-container .sitemarks-title .title-close-button{float:right;cursor:pointer}#sitemarks-container .add-this-page{background-color:#0078e7;border-radius:2px;width:100%;display:inline-block;zoom:1;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;font-family:Verdana,Arial,sans-serif;font-size:14px;line-height:28px;color:#fff;border:0;margin:12px 0;text-shadow:1px 1px 1px rgba(0,0,0,0.5)}#sitemarks-container #sitemarks{max-height:350px;overflow:auto;margin:0;padding:0;list-style-type:none}#sitemarks-container #sitemarks li{overflow:hidden;line-height:18px;margin:0;padding:6px 5px;border-bottom:1px solid rgba(255,255,255,0.3);text-align:left;transition:all .2s ease}#sitemarks-container #sitemarks li:hover{background-color:rgba(0,0,0,0.6)}#sitemarks-container #sitemarks .item-remove{border-radius:2px;padding:0 3px 3px;background-color:#ca3c3c;color:#fff;font-size:10px;text-decoration:none}#sitemarks-container #sitemarks .item-link{color:#ccc;text-decoration:none}';

	var appRoot = 'https://raw2.github.com/lagerone/sitemarks/master/',
		appjs = appendFile('https://raw2.github.com/lagerone/sitemarks/master/build/sitemarks.built.js', 'js', 'sitemarks-app-build');

	if (!appjs) {
		window.sitemarks.app.init();
	}

	appendStyles(sitemarksStyles, 'sitemarks-styles');

	function appendStyles (styles, id) {
		var existing = document.getElementById(id),
			h, style;
		if (existing) {
			return;
		}
		h = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.id = id;
		style.innerText = styles;
		h.appendChild(style);
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