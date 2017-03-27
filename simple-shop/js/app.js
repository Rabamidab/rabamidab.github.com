/*global window document $ console*/
;(function () {
	'use strict';
	var modules;

	function App (settings) {
		this.modules = settings.modules || [];
		this.images = settings.images || [];
		this.mediator = (function () {

			var handlers;
			var events;

			handlers = [];
			events = [];
			return {
				subscribe : function (event_name, handler) {
					var event_index;

					// get event index, and add, if there is no event with this name
					event_index = events.indexOf(event_name);
					if (event_index === -1) {
						event_index = (events.push(event_name) - 1);
					}

					// hander
					if (!handlers[event_index]) {
						handlers[event_index] = [];
					}
					handlers[event_index].push(handler);
				},
				publish : function (event_name, data) {
					var event_index;
					var i;

					event_index = events.indexOf(event_name);
					if (event_index === -1) {
						return false;
					} else {
						handlers[event_index].forEach(function (handler) {
							handler(data, event_name);
						});
					}
				}
			};
		}());
	}

	App.prototype.init = function () {
		this.init_modules();
	};

	App.prototype.load_modules = function () {
		this.modules.forEach(function (module_name) {
			document.write('<script src="js/modules/' + module_name.toLowerCase() + '.js"></script>');
		});
	};

	App.prototype.init_modules = function () {
		new Navigation('.navigation');
		new Content('#main');
		new Cart('.cart');
	};

	App.prototype.cache_images = function () {
		this.images.forEach(function (img_src) {
			var img;

			img = document.createElement('img');
			img.src = img_src;
		});
	};


	// window.app = new App;
	window.app = new App({
		modules : ['Content', 'Navigation', 'Cart'],
		images : ['img/ajax-loader.gif']
	});
	window.app.load_modules();
	window.app.cache_images();

	$(function () {
		window.app.init();
	});
}());
