;(function ($) {
	'use strict';

	function Gallery (options) {
		this.container = $(options.container);
		this.tabs = $(options.tabs, this.container);
		this.slides = $(options.slides, this.container);
		this.slider = this.slides.parent();

		this.rotation = options.rotation || 2000;
		this.rotation_after_iteraction = options.rotation_after_iteraction || 5000;

		this.current_slide = null;
		this.offsets = [];
		this.init(options.current_slide);
	}

	Gallery.prototype.init = function (slide_index) {
		this.calc_offsets();
		this.go_to_slide(slide_index || 0);
		this.start_rotation();
		this.tab_clicks();
	}


	// Calculate slide offsets
	Gallery.prototype.calc_offsets = function () {
		this.offsets = [0, -910, -1820, -2730];
	}

	Gallery.prototype.go_to_slide = function (slide_index) {
		var self;

		// Too large index
		if (this.slides.length < slide_index || this.current_slide === slide_index) {
			return;
		}

		self = this;

		this.current_slide = slide_index;
		self.update_active_tabs();
		this.slider.stop().animate({
			'margin-left' : this.offsets[slide_index]
		}, 400);
	}

	Gallery.prototype.next_slide = function () {
		var next_index;

		next_index = this.current_slide + 1;
		if (next_index > this.slides.length - 1) {
			this.go_to_slide(0);
		} else {
			this.go_to_slide(next_index);
		}
	}

	Gallery.prototype.update_active_tabs = function () {
		this.tabs.removeClass('on');
		this.tabs.eq(this.current_slide).addClass('on');
	}

	Gallery.prototype.tab_clicks = function () {
		var self;

		self = this;
		this.tabs.on('click', function () {

			self.go_to_slide(self.tabs.index(this));

			clearInterval(self._rotation_timer);
			clearTimeout(self._iteraction_timer);
			self._iteraction_timer = setTimeout(function () {
				self.start_rotation();
			}, self.rotation_after_iteraction);
			return false;
		});
	}

	Gallery.prototype.start_rotation = function () {
		var self;

		self = this;
		this._rotation_timer = setInterval(function () {
			self.next_slide();
		}, this.rotation);
	}

	window.Gallery = Gallery;
}(jQuery));

$(function () {
	window.gallery = new Gallery({
		container : '#bigSlider',
		tabs : '#nav-tabs > li',
		slides : '#parentImg > li'
	});
})
