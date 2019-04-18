const gulp       = require('gulp');
const sourcemaps = require("gulp-sourcemaps");
const babel      = require("gulp-babel");
const concat     = require("gulp-concat");
const merge      = require('merge-stream');
const debug      = require('gulp-debug');
const polyfill   = './node_modules/babel-polyfill/dist/polyfill.min.js';
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

gulp.task('babelify', () => {
	let polyfillSrc = gulp.src(polyfill)
	.pipe(plumber())
	.pipe(gulp.dest("./dist/js"));

	let rawJs = gulp.src("./js/*.js")
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(
		babel({
		  "presets": ["env"]
		})
	)
	.pipe(uglify({
		mangle: {
			reserved: ['$', 'document', 'window']
		}
	}))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./dist/js"));

	let moduleJs = gulp.src("./js/modules/*.js")
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(
		babel({
		  "presets": ["env"]
		})
	)
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./dist/js/modules"));

	let npmJs = gulp.src("./js/npm/**/*.js")
	.pipe(plumber())
	.pipe(uglify({
		mangle: false
	}))
	.pipe(gulp.dest("./dist/js/npm"));

	return merge(polyfillSrc, rawJs, moduleJs, npmJs);
	// .pipe(debug({title: 'babel-merge:'}));
});
