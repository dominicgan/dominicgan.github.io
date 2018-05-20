const gulp = require('gulp');
const chalk = require('chalk');
const systemjsBuilder = require('systemjs-builder');
const uglify = require('gulp-uglify');

gulp.task('bundle', function() {
  let builder = new systemjsBuilder('./dist/js', './dist/js/config.js');

  builder.config({
	cssOptimize: false,
	  buildCss: false,
    meta: {
      'css-loader': { build: false },
      '*.css': { build: false }
    }
  });

  return builder.bundle(
  	'./dist/js/modules/**/*.js', 
  	'./dist/js/bundle.min.js', {
    minify: true,
    mangle: false,
    sourceMaps: true,
    lowResSourceMaps: true,
    sourceMapContents: true
  }).then(function() {
    return console.log(chalk.green('bundle.min.js: Build complete'));
  })["catch"](function(err) {
    console.log(chalk.red('bundle..min.js: Build error'));
    return console.log(err);
  });
});
