function initFeatherlight(){
    var featherScript = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.4.0/featherlight.min.js" defer><\/script>';
    var featherCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.4.0/featherlight.min.css">';
  
    $('body').prepend(featherCss).append(featherScript);
  }

function isotopeSeed(){
  var helpers = '<li class="post-sizer-desandro"></li><li class="post-gutter-desandro"></li>';
  $('.portfolio .navigation').removeClass('hidden');
  $('.portfolio .post-list').addClass('desandroed').prepend(helpers);

  $('.portfolio .post-item').each(function(){
    $(this).removeClass('post-item').addClass('post-item-desandro');
  });
}

function initPortfolio() {
	var scope = $('.portfolio');

	if (!scope.length) {return;}

    isotopeSeed();

    var $grid = $('.post-list.desandroed');      

    $grid.isotope({
      itemSelector: '.post-item-desandro',
      filter: '.ui-design, .mobile, .case-study, .web-design, .front-end',
      getSortData: {
        name: '.name',
        date: function( itemElem ) {
          var date = $( itemElem ).find('time').attr('datetime');
          return date;
        }
      },
      sortAscending: {
        name: true,
        date: false
      },
      masonry: {
        percentPosition: true,
        columnWidth: '.post-sizer-desandro',
        gutter: '.post-gutter-desandro'
      },
      stagger: 400,
      transitionDuration: '0.6s'
    });

    $grid.imagesLoaded().progress( function(){
      $grid.isotope('layout');
    });

    // bind filter button click
    pfFiltBtn = $('.portfolio-filter li button');
    pfFiltBtn.on( 'click', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      $grid.isotope({ filter: filterValue });
    });
    // change checked class on buttons
    pfFiltWrapper = $('.portfolio-filter');
    pfFiltWrapper.each( function( i, buttonGroup ) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.checked').removeClass('checked');
        $(this).addClass('checked');
      });
    });

    // bind sort button click
    pfSortBtn = $('.portfolio-sort li button');
    pfSortBtn.on( 'click', function() {
      var sortValue = $( this ).attr('data-sort');
      // use sortFn if matches value
      $grid.isotope({ sortBy: sortValue });
    });

    pfSortWrapper = $('.portfolio-sort');
    pfSortWrapper.each( function( i, buttonGroup ) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.checked').removeClass('checked');
        $(this).addClass('checked');
      });
    });

  // handle touch devices
  if (Modernizr.touch) {
    $('.post-item-desandro').each(function(){
      $(this).addClass('no-mouse');
    })
  }
}

function initArticle() {
    var scope = $('article');

    if (!scope.length) {return;}

	initFeatherlight();
}

$(document).ready(function(){
  // init wowjs
  var wow = new WOW({
      offset: 0,          
      mobile: false,       
      live: true        
  })
  wow.init();

  initPortfolio();
  initArticle();
});
