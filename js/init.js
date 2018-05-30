'use strict';

SystemJS.import('app.js').then(function(m){
	var app = new m.App();

	app.loadPlugins();
});