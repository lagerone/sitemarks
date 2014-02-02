(function (window, storage, o, undefined) {

	'use strict';

	var ns = 'SiteMarks',
		containerId = ns.toLowerCase() + '-container',
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

	var oContainer = o('<div>')
		.attr({
			id: containerId
		});

	var oTitle = o('<div>')
		.attr({
			class: 'sitemarks-title'
		})
		.text(listTitle);

	var oLagr = o('<a>')
		.attr({
			href: 'http://lagr.se'
		}).text(' from lagr.se');


	var oClose = o('<a>')
		.attr({
			class: 'title-close-button'
		})
		.text('X')
		.click(function (event) {
			event.preventDefault();
			oContainer.css({ display: 'none' });
		});

	var oBtn = o('<button>')
		.attr({ class: 'add-this-page' })
		.text('Add this page')
		.click(function (event) {
			event.preventDefault();
			var item, data, ul;
			item = {
				url: window.location.href,
				title: getCurrentTitle(),
				dateAdded: getFormattedDate()
			};
			addItem(item);
			refreshItemList();
		});

	oTitle.append(oLagr);
	oTitle.append(oClose);
	oContainer.append(oTitle);
	oContainer.append(oBtn);

	var data = storage.getFromStorage(),
		list;

	if (data.items.length) {
		list = listBuilder(data.items);
		oContainer.append(list);
	}

	var body = document.getElementsByTagName('body')[0];
	body.appendChild(oContainer.element);

	function listBuilder(items) {
		if (!items.length) return undefined;

		var oU = o('<ul>').css({
					maxHeight: '350px',
		overflow: 'auto',
			margin: 0,
			padding: 0,
			listStyleType: 'none'
		}).attr({
			id: ns
		});

		var oLi, oRemove, oA;
		items.sort(itemSortByTitle);
		items.forEach(function (i) {
			oLi = o('<li>').css({
				overflow: 'hidden',
				lineHeight: '18px',
				margin: '0',
				padding: '3px 0',
				borderBottom: '1px solid rgba(255,255,255,0.3)',
				textAlign: 'left'
			});

			oRemove = o('<a>').css({
				color: '#fff',
				borderRadius: '2px',
				fontSize: '10px',
				padding: '2px 3px',
				backgroundColor: 'rgb(202, 60, 60)',
				textDecoration: 'none'
			}).attr({
				href: i.url,
				title: 'Delete this item'
			}).text('x')
			.click(function (event) {
				event.preventDefault();
				var data = storage.getFromStorage();
				storage.removeItemFromData(data, { url: event.target.href });
				storage.addToStorage(data);
				refreshItemList();
			});

			var dateAdded = 'Added: ';
			dateAdded += (i.dateAdded) ? i.dateAdded : 'unknown';
			oA = o('<a>').css({
				color: '#ccc',
				textDecoration: 'none'
			}).attr({
				href: i.url,
				title: dateAdded
			}).text(' ' + i.title);

			oLi.append(oRemove);
			oLi.append(oA);
			oU.append(oLi);
		});

		return oU;
	}

	function refreshItemList () {
		var data, ul;
		removeElementById(ns);
		data = storage.getFromStorage();
		ul = listBuilder(data.items);
		if (ul) oContainer.append(ul);
	}

	function addItem (item) {
		var data = storage.getFromStorage();
		storage.addItemToData(data, item);
		storage.addToStorage(data);
	}

	function getCurrentTitle () {
		var t = document.getElementsByTagName('title')[0];
		if (t) {
			return t.text.trim() || 'No title';
		}
		return 'No title';
	}

	function removeElementById (id) {
		var el = document.getElementById(id);
		if (el) el.parentNode.removeChild(el);
	}

	function getFormattedDate () {
		var d = new Date(),
			month = d.getMonth()+1 + '';
		if (month.length === 1) {
			month = '0' + month;
		}
		return [d.getFullYear(), month, d.getDate()].join('-');
	}

	function itemSortByTitle (a, b) {
		if (a.title > b.title)
			return 1;
		if (a.title < b.title)
			return -1;
		// a must be equal to b
		return 0;
	}

})(window, window.sitemarks.storage, window.sitemarks.oink);