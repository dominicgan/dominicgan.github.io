'use strict';

SystemJS.config({
  baseURL: '/dist/js/',
  paths: {
    'npm:': 'npm/',
    'cdnjs:': 'https://cdnjs.cloudflare.com/ajax/libs/',
    'modules:': 'modules/'
  },
  map: {
    'css': 'npm:systemjs-plugin-css/css.js',
    'jquery': 'cdnjs:jquery/3.3.1/jquery.min.js',
    'wow': 'cdnjs:graingert-wow/1.2.2/wow.min.js',
    'imagesloaded': 'cdnjs:jquery.imagesloaded/4.1.1/imagesloaded.pkgd.min.js',
    'modernizr': 'cdnjs:modernizr/2.8.3/modernizr.min.js',
    'isotope': 'cdnjs:jquery.isotope/3.0.2/isotope.pkgd.min.js',
    'animate.css': 'cdnjs:animate.css/3.5.1/animate.min.css',
    'featherlight.css': 'cdnjs:featherlight/1.7.2/featherlight.min.css',
    'featherlight-gallery.css': 'cdnjs:featherlight/1.7.2/featherlight.gallery.min.css',
    'featherlight': 'cdnjs:featherlight/1.7.2/featherlight.min.js',
    'featherlight-gallery': 'cdnjs:featherlight/1.7.2/featherlight.gallery.min.js'
  },
  meta: {
  	'*.css': { loader: 'css', build: false},
    'jquery': { format: 'global'},
    'imagesloaded': { format: 'global'},
    'modernizr': { format: 'global'},
    'isotope': { format: 'global', deps: ['jquery']},
    'wow': { format: 'global'},
    'featherlight': { format: 'global'},
    'featherlight-gallery': { format: 'global', deps: ['featherlight']}
  }
});







