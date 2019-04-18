const gulp = require('gulp');
const log = require('fancy-log');
const chalk = require('chalk');
const systemjsBuilder = require('systemjs-builder');
const uglify = require('gulp-uglify');

gulp.task('bundle', () => {
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
    return log(chalk.green('bundle.min.js: Build complete'));
  })["catch"](function(err) {
    log(chalk.red('bundle..min.js: Build error'));
    return log(err);
  });
});
