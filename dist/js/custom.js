"use strict";function initPortfolio(){if($(".portfolio").length){$(".portfolio .navigation").removeClass("hidden"),$(".portfolio .post-list").addClass("desandroed").prepend('<li class="post-sizer-desandro"></li><li class="post-gutter-desandro"></li>'),$(".portfolio .post-item").each(function(){$(this).removeClass("post-item").addClass("post-item-desandro")});var e=$(".post-list.desandroed");e.isotope({itemSelector:".post-item-desandro",filter:".ui-design, .mobile, .case-study, .web-design, .front-end",getSortData:{name:".name",date:function(t){var e=$(t).find("time").attr("datetime");return e}},sortAscending:{name:!0,date:!1},masonry:{percentPosition:!0,columnWidth:".post-sizer-desandro",gutter:".post-gutter-desandro"},stagger:400,transitionDuration:"0.6s"}),e.imagesLoaded().progress(function(){e.isotope("layout")}),pfFiltBtn=$(".portfolio-filter li button"),pfFiltBtn.on("click",function(){var t=$(this).attr("data-filter");e.isotope({filter:t})}),pfFiltWrapper=$(".portfolio-filter"),pfFiltWrapper.each(function(t,e){var o=$(e);o.on("click","button",function(){o.find(".checked").removeClass("checked"),$(this).addClass("checked")})}),pfSortBtn=$(".portfolio-sort li button"),pfSortBtn.on("click",function(){var t=$(this).attr("data-sort");e.isotope({sortBy:t})}),pfSortWrapper=$(".portfolio-sort"),pfSortWrapper.each(function(t,e){var o=$(e);o.on("click","button",function(){o.find(".checked").removeClass("checked"),$(this).addClass("checked")})}),Modernizr.touch&&$(".post-item-desandro").each(function(){$(this).addClass("no-mouse")})}}function initArticle(){$("article").length&&$("body").prepend('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.4.0/featherlight.min.css">').append('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.4.0/featherlight.min.js" defer><\/script>')}function initWow(){new WOW({offset:0,mobile:!1,live:!0}).init()}$(document).ready(function(){initWow(),initPortfolio(),initArticle()});
//# sourceMappingURL=custom.js.map
