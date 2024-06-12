import $ from 'jquery';

/**
 * @class Site
 * @author Dominic <dominicgangx@gmail.com>
 * data-component = 'site'
 */
export class Site {
	constructor () {
		this.scope = $('body');
	}

	init() {
		if (this.scope.length) {
		}
	}

	initWow() {
		let _self = this;
		// init wowjs
		var wow = new WOW({
			offset: 0,          
			mobile: false,       
			live: true        
		})
		wow.init();
	}
}

export function init() {
	let module = new Site();
	module.init();
}