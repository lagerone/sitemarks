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