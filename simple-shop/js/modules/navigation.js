/*global window $ console*/
;(function (mediator) {
	'use strict';

	function Navigation (container) {
		this.container = $(container);
		this.items = $(container).children();
		this.init();
	}

	Navigation.prototype.init = function () {
		var self;

		self = this;
		this.items.click(function (event) {
			var url;
			var target;

			target = $(event.target);
			if (target.is('a')) {

				// Inform about navigation
				url = target.prop('href').split('/');
				url = url[url.length - 1];
				mediator.publish('navigate', url);
				return false;
			}
		});

		mediator.subscribe('data-load-start', function () {
			self.disable();
		});

		mediator.subscribe('data-load-complete', function () {
			self.enable();
		});
	};

	Navigation.prototype.disable = function () {
		this.container.addClass('inactive');
	};

	Navigation.prototype.enable = function () {
		this.container.removeClass('inactive');
	};

	window.Navigation = Navigation;
}(app.mediator));
