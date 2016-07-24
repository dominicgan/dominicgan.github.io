  function seedFeatherlight(callback){
    $('img').each(function(){
      $(this).attr('data-featherlight', $(this).attr('src'));
    });

    callback();
  }

  function initFeatherlight(){
    var featherScript = '<script type="text/javascript" src="/bower_components/featherlight/release/featherlight.min.js"><\/script>';
    var featherCss = '<link rel="stylesheet" href="/bower_components/featherlight/release/featherlight.min.css">';
  
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

$(document).ready(function(){
  if (!$('.portfolio').length) {
    return false;
  } else {

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
  }

  if (Modernizr.touch) {
    $('.post-item-desandro').each(function(){
      $(this).addClass('no-mouse');
    })
  }

    if ($('article').length){
      seedFeatherlight(initFeatherlight);
    }
});