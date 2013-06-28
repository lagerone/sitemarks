(function (window) {

	window.sitemarks = {};
	window.sitemarks.storage = (function (window, undefined) {
		var ns = 'sitemarks-lagr.se';

		var getFromStorage = function () {
			var s = JSON.parse(localStorage.getItem(ns));
			return s || { items: [] };
		};

		var addToStorage = function (data) {
			localStorage.setItem(ns, JSON.stringify(data));
		};

		var addItemToData = function (data, itemObj) {
			if (!data.hasOwnProperty('items')) throw new Error('data is missing item property.');

			var isDuplicate = false;
			data.items.forEach(function (i) {
				if (i.url === itemObj.url) isDuplicate = true;
			});
			if (isDuplicate) return;
			data.items.push(itemObj);
		};

		var removeItemFromData = function (data, itemObj) {
			var newArray = [];
			data.items.forEach(function (i) {
				if (i.url !== itemObj.url) newArray.push(i);
			});
			data.items = newArray;
		};

		return {
			ns: ns,
			getFromStorage: getFromStorage,
			addToStorage: addToStorage,
			addItemToData: addItemToData,
			removeItemFromData: removeItemFromData
		};

	})(window);

	// App Start

	(function (window, undefined) {
		var ns = 'SiteMarks',
			containerId = ns + 'container',
			listTitle = 'SiteMarks',
			existingC;

		existingC = document.getElementById(containerId);
		if (existingC) {
			if (existingC.style.display === 'none') {
				existingC.style.display = 'block';
			} else {
				existingC.style.display = 'none';
			}
			return;
		}

		var	container = document.createElement('div');
		container.id = containerId;

		sitemarks = window.sitemarks || {};

		viewSetup();

		var data = sitemarks.storage.getFromStorage(),
			list;

		if (data.items.length) {
			list = listBuilder(data.items);
			container.appendChild(list);
		}

		var body = document.getElementsByTagName('body')[0];
		body.appendChild(container);

		function listBuilder(items) {
			if (!items.length) return undefined;
			var ul,	us, li, ls, aText, a, as, remove, rs;
			ul = document.createElement('ul');
			us = ul.style;
			us.margin = '0';
			us.padding = '0';
			us.listStyleType = 'none';
			ul.id = ns;
			items.forEach(function (i) {
				li = document.createElement('li');
				ls = li.style;
				ls.lineHeight = '18px';
				ls.margin = '0';
				ls.padding = '3px 0';
				ls.borderBottom = '1px solid rgba(255,255,255,0.3)';
				ls.textAlign = 'left';

				remove = document.createElement('a');
				remove.href = i.url;
				remove.onclick = removeClickHandler;
				rs = remove.style;
				rs.color = '#fff';
				rs.borderRadius = '2px';
				rs.fontSize = '10px';
				rs.padding = '2px 3px';
				rs.backgroundColor = 'rgb(202, 60, 60)';
				rs.textDecoration = 'none';
				rText = document.createTextNode('x');
				remove.appendChild(rText);

				a = document.createElement('a');
				as = a.style;
				a.href = i.url;
				as.color = '#ccc';
				as.textDecoration = 'none';
				aText = document.createTextNode(i.title);
				a.appendChild(aText);

				li.appendChild(remove);
				li.appendChild(document.createTextNode(' '));
				li.appendChild(a);
				ul.appendChild(li);
			});
			return ul;
		}

		function viewSetup() {
			var cs = container.style;

			cs.position = 'fixed';
			cs.top = 0;
			cs.left = '10px';
			cs.width = '180px';
			cs.zIndex = '9999';
			cs.backgroundColor = 'rgba(0,0,0,0.7)';
			cs.padding = '12px 12px 16px 12px';
			cs.textAlign = 'left';
			cs.fontSize = '12px';
			cs.fontFamily = 'Verdana, Arial, sans-serif';
			cs.color = '#ccc';
			cs.borderBottomLeftRadius = '2px';
			cs.borderBottomRightRadius = '2px';
			cs.boxShadow = '0 0 10px rgba(0,0,0,0.7)';
			cs.textShadow = '1px 1px 1px rgba(0,0,0,0.5)';

			var title = document.createElement('div'),
				ts = title.style,
				titleText = document.createTextNode(listTitle);

			ts.fontWeight = 'normal';
			ts.color = '#ccc';
			ts.fontSize = '16px';
			title.appendChild(titleText);

			var lagr = document.createElement('a');
			las = lagr.style;
			las.fontSize = '12px';
			las.color = '#ccc';
			las.textDecoration = 'none';
			lagr.href = 'http://lagr.se';
			lagrText = document.createTextNode(' from lagr.se');
			lagr.appendChild(lagrText);

			title.appendChild(lagr);

			var close = document.createElement('a');
			close.onclick = closeClickHandler;
			var closes = close.style;
			closes.float = 'right';
			closes.cursor = 'pointer';
			var closeText = document.createTextNode('X');
			close.appendChild(closeText);

			title.appendChild(close);

			container.appendChild(title);

			var btn = document.createElement('button'),
				bs = btn.style,
				bText = document.createTextNode('Add this page');

			bs.backgroundColor = '#0078e7';
			bs.borderRadius = '2px';
			bs.width = '100%';
			bs.textAlign = 'center';
			bs.display = 'inline-block';
			bs.zoom = 1;
			bs.lineHeight = 'normal';
			bs.whiteSpace = 'nowrap';
			bs.verticalAlign = 'baseline';
			bs.textAlign = 'center';
			bs.cursor = 'pointer';
			bs.fontFamily = 'Verdana, Arial, sans-serif';
			bs.fontSize = '14px';
			bs.lineHeight = '28px';
			bs.color = '#fff';
			bs.border = 0;
			bs.margin = '12px 0';
			bs.textShadow = '1px 1px 1px rgba(0,0,0,0.5)';

			btn.onclick = addClickHandler;

			btn.appendChild(bText);
			container.appendChild(btn);
		}

		function addClickHandler(event) {
			event.preventDefault();
			var item, data, ul;
			item = {
				url: window.location.href,
				title: getCurrentTitle()
			};
			addItem(item);
			refreshItemList();
		}

		function removeClickHandler(event) {
			event.preventDefault();
			var data;
			data = sitemarks.storage.getFromStorage();
			sitemarks.storage.removeItemFromData(data, { url: event.target.href });
			sitemarks.storage.addToStorage(data);
			refreshItemList();
		}

		function closeClickHandler(event) {
			event.preventDefault();
			container = document.getElementById(containerId);
			container.style.display = 'none';
		}

		function refreshItemList() {
			var data, ul;
			removeElementById(ns);
			data = sitemarks.storage.getFromStorage();
			ul = listBuilder(data.items);
			if (ul) container.appendChild(ul);
		}

		function addItem(item) {
			var data = sitemarks.storage.getFromStorage();
			sitemarks.storage.addItemToData(data, item);
			sitemarks.storage.addToStorage(data);
		}

		function getCurrentTitle() {
			var t = document.getElementsByTagName('title')[0];
			return t.text || 'No title';
		}

		function removeElementById(id) {
			var el = document.getElementById(id);
			if (el) el.parentNode.removeChild(el);
		}

	})(window);

	// App End

})(window);
