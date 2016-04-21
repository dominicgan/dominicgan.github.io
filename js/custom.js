 function isotopeSeed(){
  var helpers = '<li class="post-sizer-desandro"></li><li class="post-gutter-desandro"></li>';
  $('.portfolio .navigation').removeClass('hidden');
  $('.portfolio .post-list').addClass('desandroed').prepend(helpers);

  $('.portfolio .post-item').each(function(){
    $(this).removeClass('post-item').addClass('post-item-desandro');
  });
}

$(document).ready(function(){

  if (!$('.portfolio'),length) {
    return false;
  } else {

    isotopeSeed();

    var $grid = $('.post-list.desandroed');      

    $grid.isotope({
      itemSelector: '.post-item-desandro',
      filter: '.ui-design, .mobile, .case-study, .web-design, .front-end',
      getSortData: {
        name: '.name',
        // date: '.date',
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
      }
    });

    $grid.imagesLoaded( function(){
      console.log('images done!');
      $grid.isotope('layout');
    });

    // bind filter button click
    $('.portfolio-filter li button').on( 'click', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      $grid.isotope({ filter: filterValue });
    });
    // change checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.checked').removeClass('checked');
        $(this).addClass('checked');
      });
    });

    // bind sort button click
    $('.portfolio-sort li button').on( 'click', function() {
      var sortValue = $( this ).attr('data-sort');
      // use sortFn if matches value
      $grid.isotope({ sortBy: sortValue });
    });

    $('.portfolio-sort').each( function( i, buttonGroup ) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.checked').removeClass('checked');
        $(this).addClass('checked');
      });
    });
  }
});