'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FeatherlightImages = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('featherlight');

require('featherlight-gallery');

require('featherlight.css');

require('featherlight-gallery.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class FeatherlightImages
 * @author Dominic <dominicgangx@gmail.com>
 * Image modal viewer for articles
 * loaded by single image via lazyload
 * data-component = 'featherlight-images'
 */
var FeatherlightImages = exports.FeatherlightImages = function () {
	function FeatherlightImages(elem) {
		_classCallCheck(this, FeatherlightImages);

		this.scope = (0, _jquery2.default)(elem);
		this.selector = elem;
	}

	_createClass(FeatherlightImages, [{
		key: 'set',
		value: function set(elem) {
			this.scope = (0, _jquery2.default)(elem);
			this.selector = elem;
		}
	}, {
		key: 'init',
		value: function init() {
			if (this.scope.length) {
				this.initFeatherlightImages();
			}
		}
	}, {
		key: 'initFeatherlightImages',
		value: function initFeatherlightImages() {
			var _self = this;
			_self.scope.featherlightGallery();
		}
	}]);

	return FeatherlightImages;
}();

function init(elem) {
	var module = new FeatherlightImages(elem);
	module.init();
}
//# sourceMappingURL=featherlight-images.js.map
