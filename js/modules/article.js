import $ from 'jquery';
import { FeatherlightImages } from './featherlight-images.js';

/**
 * @class Article
 * @author Dominic <dominicgangx@gmail.com>
 * Init article images
 * data-component = 'article'
 */
export class Article {
	constructor() {
		this.scope = $('article');
		this.featherlightImages = new FeatherlightImages();
	}

	init() {
		let _self = this;

		if (_self.scope.length) {
			_self.articleImages();
		}
	}

	articleImages() {
		let _self = this;

		_self.scope.each(function(i, el){
			_self.featherlightImages.set(elem);
			_self.featherlightImages.init();
		});
	}

}

export function init(elem) {
	let module = new Article(elem);
	module.init();
}