(function (window, linklagr) {

	var ns;
	beforeEach(function () {
		s = sitemarks.storage;
		ns = s.ns;
		localStorage.removeItem(ns);
	});

	describe('getFromStorage', function () {

		it('should return object.items with empty array when storage is empty', function () {
			var d = s.getFromStorage();
			expect(d.items.length).toEqual(0);
		});

	});

	describe('addItemToData', function () {

		var data;
		beforeEach(function () {
			data = { items: [] };
		});

		it('should push item to itemArray in supplied data object', function () {
			s.addItemToData(data, { url: 'http://google.com', title: 'Google'});
			expect(data.items.length).toEqual(1);
			expect(data.items[0].url).toBe('http://google.com');
			expect(data.items[0].title).toBe('Google');
		});

		it('should not push item to itemArray in supplied data object if item.url already exists', function () {
			s.addItemToData(data, { url: 'http://google.com', title: 'Google'});
			s.addItemToData(data, { url: 'http://google.com', title: 'Google'});
			expect(data.items.length).toEqual(1);
			expect(data.items[0].url).toBe('http://google.com');
			expect(data.items[0].title).toBe('Google');
		});

		it('should throw error if data does not have items property', function () {
			expect(function () {
				s.addItemToData({}, { url: 'http://google.com', title: 'Google'});
			}).toThrow(new Error('data is missing item property.'));
		});

	});

	describe('removeItemFromData', function () {

		var data;
		beforeEach(function () {
			data = { items: [] };
		});

		it('should remove item with matching url from data.items', function () {
			data.items = [
				{ url: 'http://google.com', title: 'Google'},
				{ url: 'http://idg.se', title: 'Idg'},
				{ url: 'http://aftonbladet.se', title: 'Aftonbladet'}
			];
			s.removeItemFromData(data, { url: 'http://aftonbladet.se', title: 'Aftonbladet'});
			expect(data.items.length).toEqual(2);
			expect(data.items[0].url).toBe('http://google.com');
			expect(data.items[1].url).toBe('http://idg.se');
		});

	});

})(window, window.sitemarks);