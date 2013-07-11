window.sitemarks = window.sitemarks || {};

window.sitemarks.oink = (function (window, document, undefined) {

	var Oink = function (el) {
		this.element = this.setElement(el);
	};

	Oink.prototype = {
		setElement: function (el) {
			if (el instanceof HTMLElement) {
				return el;
			}
			if (typeof el === 'string') {
				var tel = el.trim().toLowerCase(),
					cpos = tel.length - 1;
				if (tel.indexOf('<') === 0 && tel.indexOf('>') === cpos) {
					return this.createElement(tel.replace(/[^a-z]/g, ''));
				}
			}
		},
		createElement: function (elName) {
			return document.createElement(elName);
		},
		css: function (settingsObj) {
			for (var prop in settingsObj) {
				if (settingsObj.hasOwnProperty(prop)) {
					this.element.style[prop] = settingsObj[prop];
				}
			}
			return this;
		},
		attr: function (settingsObj) {
			for (var prop in settingsObj) {
				if (settingsObj.hasOwnProperty(prop)) {
					this.element.setAttribute(prop, settingsObj[prop]);
				}
			}
			return this;
		},
		appendTo: function (target) {
			if (target instanceof HTMLElement) {
				target.appendChild(this.element);
			}
			if (target instanceof Oink) {
				target.element.appendChild(this.element);
			}
			return this;
		},
		append: function (inner) {
			if (inner instanceof HTMLElement) {
				this.element.appendChild(inner);
			}
			if (inner instanceof Oink) {
				this.element.appendChild(inner.element);
			}
			return this;
		},
		text: function (textString) {
			if (!textString || !textString.length) return this;

			this.element.innerText = textString;
			if (!this.element.innerText) {
				this.element.textContent = textString;
			}

			return this;
		},
		click: function (clickFn) {
			if (typeof clickFn === 'function') {
				this.element.onclick = clickFn;
			}
			return this;
		}
	};

	return function(el) {
		return new Oink(el);
	};

})(window, document);