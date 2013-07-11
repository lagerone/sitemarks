(function (window, sitemarks) {

	var o;
	beforeEach(function () {
		o = sitemarks.oink;
	});
	afterEach(function () {
		d = null;
	});

	describe('When initializing', function () {

		describe('if passed a string value', function () {

			it('it should create new element of string value type', function () {
				var od = o('<div>');
				expect(od.element.tagName).toBe('DIV');
			});

		});

		describe('if passed an html element', function () {

			it('it should set o.element to passed element', function () {
				var d = document.createElement('div');
				var od = o(d);
				expect(od.element.tagName).toBe('DIV');
			});

		});

	});

	describe('css method', function () {

		it('it should set element styles to passed settings objects property values', function () {
			var settings = { width: '100px', height: '50px' };
			var od = o('<div>').css(settings);
			expect(od.element.style.width).toBe(settings.width);
			expect(od.element.style.height).toBe(settings.height);
		});

	});

	describe('attr method', function () {

		it('it should set element attributes to passed settings objects property values', function () {
			var settings = { id: 'myId', rel: 'myRel', class: 'myclass1 myclass2' };
			var od = o('<div>').attr(settings);
			expect(od.element.id).toBe(settings.id);
			expect(od.element.getAttribute('rel')).toBe(settings.rel);
			expect(od.element.getAttribute('class')).toBe(settings.class);
		});

	});

	describe('appendTo method', function () {

		it('it should append element to supplied node', function () {
			var div = document.createElement('div');
			div.id = 'wrapperElement';
			document.body.appendChild(div);
			var beforeLength = div.children.length;

			var settings = { id: 'oinkElement' };
			var od = o('<div>').attr(settings).appendTo(div);

			expect(div.children.length).toEqual(beforeLength + 1);

			div = null;
		});

		describe('if passed an oink object', function () {

			it('it should append element to supplied oink objects element', function () {
				var od = o('<div>');
				var p = o('<p>');
				p.appendTo(od);
				expect(od.element.firstChild.tagName).toBe('P');
			});

		});

	});

	describe('append method', function () {

		it('it should append supplied node to oink element', function () {
			var div = document.createElement('div');
			div.id = 'wrapperElement';

			var od = o('<div>').attr({ id: 'oinkElement' });
			var beforeLength = od.element.children.length;
			od.append(div);

			expect(od.element.children.length).toEqual(beforeLength + 1);

			div = null;
		});

		describe('if passed an oink object', function () {

			it('it should append supplied oink objects element to element', function () {
				var od = o('<div>');
				var p = o('<p>');
				od.append(p);
				expect(od.element.firstChild.tagName).toBe('P');
			});

		});

	});

	describe('text method', function () {

		it('it should add text node to oink.element with supplied text value', function () {
			var t = 'I am text',
				od = o('<div>').text(t);

			expect(od.element.innerText).toBe(t);
		});

	});


})(window, window.sitemarks);