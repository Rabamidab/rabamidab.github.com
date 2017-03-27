/*global $ console*/
;(function (mediator) {
	'use strict';

	/**
	 * Content
	 */

	function templater (string, data) {
		return string.replace(/\$([^\$]+)\$/g, function (match_string, param_name) {
			return data[param_name];
		});
	}

	function Content (container) {
		this.container = $(container);
		this.current_section = '';
		this.init();
	}

	Content.prototype.init = function () {
		var self;

		self = this;
		this.download('food');
		mediator.subscribe('navigate', function (to) {
			self.download(to);
		});

		mediator.subscribe('data-load-start', function () {
			self.show_progress();
		});

		mediator.subscribe('data-load-complete', function () {
			self.hide_progress();
		});

		this.container.on('click', '.item', function (event) {
			self.product_click($(this));
		})
	};

	Content.prototype.download = function (section) {
		var self;

		if (section !== this.current_section) {
			self = this;
			mediator.publish('data-load-start');
			$.getJSON('data/' + section + '.json', function (data) {
				// setTimeout(function () {
					self.current_section = section;
					mediator.publish('data-load-complete');
					self.fill_content(data);
				// }, 2999);
			});
		}
	};

	Content.prototype.show_progress = function () {
		if (!this.progress) {
			this.progress = $('<div class="progress"></div>');
			this.container.append(this.progress);
		}
	};

	Content.prototype.hide_progress = function () {
		if (this.progress) {
			this.progress.remove();
			this.progress = null;
		}
	};

	Content.prototype.fill_content = function (products_list) {
		var res;
		var item_pattern;

		res = $('<div></div>');
		item_pattern = '<div class="item"><span class="name">$name$</span> | <span class="quantity">$quantity$</span> | <span class="cost">$price$</span></div>';

		products_list.forEach(function (product_item) {
			var item;

			res.append( $(templater(item_pattern, product_item)) )
		});

		this.container.empty();
		this.container.append(res);
	};

	Content.prototype.product_click = function (product_row) {
		var price;

		price = parseInt( product_row.find('.cost').text().replace(/\D/g, ''), 10 );
		mediator.publish('update', price);
	}

	window.Content = Content;
}(app.mediator));
