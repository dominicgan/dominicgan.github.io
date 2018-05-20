import $ from 'jquery';
import 'imagesloaded';
import 'isotope';
import 'modernizr';

/**
 * @class GridIsotope
 * @author Dominic <dominicgangx@gmail.com>
 * [Description here]
 * data-component = 'grid-isotope'
 */
export class GridIsotope {
	constructor () {
		this.scope = $('.portfolio');
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

	init() {
		let _self = this;

		if (_self.scope.length) {
			_self.isotopSeed();
			_self.initIsotope();
		}
	}

	isotopSeed() {
		let _self = this;

		var helpers = '<li class="post-sizer-desandro"></li><li class="post-gutter-desandro"></li>';
		_self.scope.find('.navigation').removeClass('hidden');
		_self.scope.find('.post-list').addClass('desandroed').prepend(helpers);

		_self.scope.find('.post-item').each(function(){
			$(this).removeClass('post-item').addClass('post-item-desandro');
		});
	}

	initIsotope() {
		let _self = this;
		let _options = _self.options;
		
		_options['filter'] = '.ui-design, .mobile, .case-study, .web-design, .front-end';
		_options['getSortData'] = {
			name: '.name',
			date: function( itemElem ) {
				var date = $( itemElem ).find('time').attr('datetime');
				return date;
			}
		};

		let $grid = _self.scope.find('.post-list.desandroed').isotope(_options);

		$grid.imagesLoaded().progress( function() {
			$grid.isotope('layout');
		});

		// handle touch devices
		if (Modernizr.touch) {
			$('.post-item-desandro').each(function(){
				$(this).addClass('no-mouse');
			})
		}

		_self.initFilterBtns($grid);
		_self.initSortBtns($grid);
	}

	initFilterBtns($grid) {
		let _self = this;
		let _filterElem = _self.scope.find('.portfolio-filter');

		// bind filter button click
		_filterElem.on('click', 'li button', function() {
			var filterValue = $( this ).attr('data-filter');
			// use filterFn if matches value
			$grid.isotope({ filter: filterValue });
		});

		// change checked class on buttons
		_filterElem.each(function(i, el) {
			var $el = $(el);
			$el.on('click', 'button', function() {
				$el.find('.checked').removeClass('checked');
				$(this).addClass('checked');
			});
		});
	}

	initSortBtns($grid) {
		let _self = this;
		let _sortElem = _self.scope.find('.portfolio-sort');

		// bind sort button click
		_sortElem.on( 'click', 'li button', function() {
			var sortValue = $( this ).attr('data-sort');
			// use sortFn if matches value
			$grid.isotope({ sortBy: sortValue });
		});

		_sortElem.each(function(i, el) {
			var $el = $(el);
			$el.on('click', 'button', function() {
				$el.find('.checked').removeClass('checked');
				$(this).addClass('checked');
			});
		});
	}
}

export function init() {
	let module = new GridIsotope();
	module.init();
}