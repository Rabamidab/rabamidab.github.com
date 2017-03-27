/*global $ console*/
;(function (mediator) {
	'use strict';

	function Cart (container) {
		this.container = $(container);
		this.price_node = $(container).find('.price');
		this.items_node = $(container).find('.items');
		this.price = 0;
		this.items = 0;
		this.init();
	}

	Cart.prototype.update = function (price) {
		if (price) {
			this.price += price;
			this.items += 1;
		}
		this.price_node.text(this.price);
		this.items_node.text(this.items);
	};

	Cart.prototype.init = function () {
		var self;

		self = this;
		this.update();
		mediator.subscribe('update', function (price) {
			self.update(price);
		});
	};

	window.Cart = Cart;
}(app.mediator));
