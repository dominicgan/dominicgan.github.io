const gulp          = require('gulp');
const plumber       = require('gulp-plumber');
const sass          = require('gulp-sass')(require('sass'));
const log     = require('fancy-log');
const chalk   = require('chalk');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps    = require('gulp-sourcemaps');
const clip          = require('gulp-clip-empty-files');
const cssnano       = require('gulp-cssnano');
const clone         = require('gulp-clone');
const rename        = require('gulp-rename');
const merge         = require('merge-stream');

sass.compiler = require('sass');

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', () => {
   let source = gulp.src('./_scss/custom.scss')
   .pipe(plumber(function(error) {
    log(chalk.red(error.message));
    this.emit('end');
	}))
	.pipe(sourcemaps.init()) // Start Sourcemaps
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		"overrideBrowserslist": ['last 2 versions'],
		cascade: false
	}));

	let pipe1 = source.pipe(clone())
	.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css')); // Create sourcemap

    let pipe2 = source.pipe(clone())
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano({
		   convertValues: {
			length: false
		},
		discardComments: {
			removeAll: true
		}
	}))
    .pipe(sourcemaps.write('.')) // Create minified sourcemap
    .pipe(clip())
    .pipe(gulp.dest('./css'));

    return merge(pipe1, pipe2);
});
