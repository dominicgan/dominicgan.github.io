import $ from 'jquery';
import 'featherlight';
import 'featherlight-gallery';
import 'featherlight.css';
import 'featherlight-gallery.css';

/**
 * @class FeatherlightImages
 * @author Dominic <dominicgangx@gmail.com>
 * Image modal viewer for articles
 * loaded by single image via lazyload
 * data-component = 'featherlight-images'
 */
export class FeatherlightImages {
	constructor (elem) {
		this.scope = $(elem);
		this.selector = elem;
	}

	set(elem) {
		this.scope = $(elem);
		this.selector = elem;
	}

	init() {
		if (this.scope.length) {
			this.initFeatherlightImages();
		}
	}

	initFeatherlightImages() {
		let _self = this;
		// let href;

		// href = _self.scope.attr('data-original');
		// _self.scope.attr('data-featherlight',href);

		// articleImg.featherlight();
		_self.scope.featherlightGallery();

	}
}

export function init(elem) {
	let module = new FeatherlightImages(elem);
	module.init();
}
