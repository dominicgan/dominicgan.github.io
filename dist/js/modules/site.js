'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Site = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Site
 * @author Dominic <dominicgangx@gmail.com>
 * data-component = 'site'
 */
var Site = exports.Site = function () {
	function Site() {
		_classCallCheck(this, Site);

		this.scope = (0, _jquery2.default)('body');
	}

	_createClass(Site, [{
		key: 'init',
		value: function init() {
			if (this.scope.length) {}
		}
	}, {
		key: 'initWow',
		value: function initWow() {
			var _self = this;
			// init wowjs
			var wow = new WOW({
				offset: 0,
				mobile: false,
				live: true
			});
			wow.init();
		}
	}]);

	return Site;
}();

function init() {
	var module = new Site();
	module.init();
}
//# sourceMappingURL=site.js.map
