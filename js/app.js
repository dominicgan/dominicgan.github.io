'use strict';

import $ from 'jquery';
import 'modernizr';

export class App {
	constructor() {
		this.name = 'site';
		this.elem = window;
	}

	loadPlugins() {

		var componentEl = $('[data-component]');

		componentEl.each((i, el) => {
			var componentStr = el.dataset.component.replace(/'/g, '"');
			var componentArr = JSON.parse(componentStr);

			componentArr.map((val, key) => {
				SystemJS
					.import('modules:'+val+'.js')
					.then(function(module) {
						console.log('%c'+val, 'color: green');
						module.init();
					})
					.catch(function(error) {
						console.error(error);
					});
			});
		});
	}
}