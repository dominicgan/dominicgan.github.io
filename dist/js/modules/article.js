'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Article = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _featherlightImages = require('./featherlight-images.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Article
 * @author Dominic <dominicgangx@gmail.com>
 * Init article images
 * data-component = 'article'
 */
var Article = exports.Article = function () {
	function Article() {
		_classCallCheck(this, Article);

		this.scope = (0, _jquery2.default)('article');
		this.featherlightImages = new _featherlightImages.FeatherlightImages();
	}

	_createClass(Article, [{
		key: 'init',
		value: function init() {
			var _self = this;

			if (_self.scope.length) {
				_self.articleImages();
			}
		}
	}, {
		key: 'articleImages',
		value: function articleImages() {
			var _self = this;

			_self.scope.each(function (i, el) {
				_self.featherlightImages.set(elem);
				_self.featherlightImages.init();
			});
		}
	}]);

	return Article;
}();

function init(elem) {
	var module = new Article(elem);
	module.init();
}
//# sourceMappingURL=article.js.map
