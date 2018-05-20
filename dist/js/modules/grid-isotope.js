'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GridIsotope = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('imagesloaded');

require('isotope');

require('modernizr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class GridIsotope
 * @author Dominic <dominicgangx@gmail.com>
 * [Description here]
 * data-component = 'grid-isotope'
 */
var GridIsotope = exports.GridIsotope = function () {
	function GridIsotope() {
		_classCallCheck(this, GridIsotope);

		this.scope = (0, _jquery2.default)('.portfolio');
		this.options = {
			itemSelector: '.post-item-desandro',
			sortAscending: {
				name: true,
				date: false
			},
			masonry: {
				percentPosition: true,
				columnWidth: '.post-sizer-desandro',
				gutter: '.post-gutter-desandro'
			},
			transitionDuration: '0.6s'
		};
	}

	_createClass(GridIsotope, [{
		key: 'init',
		value: function init() {
			var _self = this;

			if (_self.scope.length) {
				_self.isotopSeed();
				_self.initIsotope();
			}
		}
	}, {
		key: 'isotopSeed',
		value: function isotopSeed() {
			var _self = this;

			var helpers = '<li class="post-sizer-desandro"></li><li class="post-gutter-desandro"></li>';
			_self.scope.find('.navigation').removeClass('hidden');
			_self.scope.find('.post-list').addClass('desandroed').prepend(helpers);

			_self.scope.find('.post-item').each(function () {
				(0, _jquery2.default)(this).removeClass('post-item').addClass('post-item-desandro');
			});
		}
	}, {
		key: 'initIsotope',
		value: function initIsotope() {
			var _self = this;
			var _options = _self.options;

			_options['filter'] = '.ui-design, .mobile, .case-study, .web-design, .front-end';
			_options['getSortData'] = {
				name: '.name',
				date: function date(itemElem) {
					var date = (0, _jquery2.default)(itemElem).find('time').attr('datetime');
					return date;
				}
			};

			var $grid = _self.scope.find('.post-list.desandroed').isotope(_options);

			$grid.imagesLoaded().progress(function () {
				$grid.isotope('layout');
			});

			// handle touch devices
			if (Modernizr.touch) {
				(0, _jquery2.default)('.post-item-desandro').each(function () {
					(0, _jquery2.default)(this).addClass('no-mouse');
				});
			}

			_self.initFilterBtns($grid);
			_self.initSortBtns($grid);
		}
	}, {
		key: 'initFilterBtns',
		value: function initFilterBtns($grid) {
			var _self = this;
			var _filterElem = _self.scope.find('.portfolio-filter');

			// bind filter button click
			_filterElem.on('click', 'li button', function () {
				var filterValue = (0, _jquery2.default)(this).attr('data-filter');
				// use filterFn if matches value
				$grid.isotope({ filter: filterValue });
			});

			// change checked class on buttons
			_filterElem.each(function (i, el) {
				var $el = (0, _jquery2.default)(el);
				$el.on('click', 'button', function () {
					$el.find('.checked').removeClass('checked');
					(0, _jquery2.default)(this).addClass('checked');
				});
			});
		}
	}, {
		key: 'initSortBtns',
		value: function initSortBtns($grid) {
			var _self = this;
			var _sortElem = _self.scope.find('.portfolio-sort');

			// bind sort button click
			_sortElem.on('click', 'li button', function () {
				var sortValue = (0, _jquery2.default)(this).attr('data-sort');
				// use sortFn if matches value
				$grid.isotope({ sortBy: sortValue });
			});

			_sortElem.each(function (i, el) {
				var $el = (0, _jquery2.default)(el);
				$el.on('click', 'button', function () {
					$el.find('.checked').removeClass('checked');
					(0, _jquery2.default)(this).addClass('checked');
				});
			});
		}
	}]);

	return GridIsotope;
}();

function init() {
	var module = new GridIsotope();
	module.init();
}
//# sourceMappingURL=grid-isotope.js.map
