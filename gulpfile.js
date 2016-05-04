var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var cp = require('child_process');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var clone = require('gulp-clone');
var clip = require('gulp-clip-empty-files');
// var postcss = require('gulp-postcss');
// var autoprefixer = require('autoprefixer');
var filesize = require('gulp-filesize');
var imageResize = require('gulp-image-resize');
var changed = require("gulp-changed");
var parallel = require('concurrent-transform');
var os = require("os");
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
	jekyllBuild: '<span style="color: grey"> Running: </span>  $ jekyll build'
};

// mobile 1x
gulp.task('image-resize-1x', function () {
	gulp.src('images/*.{jpg,png}')
	.pipe(changed("images/resp"))
	.pipe(parallel(
		imageResize({
			width : 480,
			crop : false,
			upscale : false
		}),
		os.cpus().length
		))
	.pipe(filesize())
	.pipe(gulp.dest('images/resp-1x'))
});

// tablet protrait 2x
gulp.task('image-resize-2x', function () {
	gulp.src('images/*.{jpg,png}')
	.pipe(changed("images/resp"))
	.pipe(parallel(
		imageResize({
			width : 768,
			crop : false,
			upscale : false
		}),
		os.cpus().length
		))
	.pipe(filesize())
	.pipe(gulp.dest('images/resp-2x'))
});


// small-desk 3x
gulp.task('image-resize-3x', function () {
	gulp.src('images/*.{jpg,png}')
	.pipe(changed("images/resp"))
	.pipe(parallel(
		imageResize({
			width : 900,
			crop : false,
			upscale : false
		}),
		os.cpus().length
		))
	.pipe(filesize())
	.pipe(gulp.dest('images/resp-3x'))
});

// largest 4x
gulp.task('image-resize-4x', function () {
	gulp.src('images/*.{jpg,png}')
	.pipe(changed("images/resp"))
	.pipe(parallel(
		imageResize({
			width : 1200,
			crop : false,
			upscale : false
		}),
		os.cpus().length
		))
	.pipe(filesize())
	.pipe(gulp.dest('images/resp-4x'))
});

/**
 * Build the Jekyll Site
 */
 gulp.task('jekyll-build', function (done) {
 	browserSync.notify(messages.jekyllBuild);
 	return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
 	.on('close', done);
 });

/**
 * Rebuild Jekyll & do page reload
 */
 gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
 	browserSync.reload();
 });

/**
 * Wait for jekyll-build, then launch the Server
 */
 gulp.task('browser-sync', ['sass', 'image-resize-1x', 'image-resize-2x', 'image-resize-3x', 'image-resize-4x'], function() {
 	browserSync(['_layouts/*.html', '_posts/*', '_includes/*.html', '_site/js/**/*.js', '_site/css/**/*.css'],{
 		server: {
 			baseDir: '_site'
 		},
 		port: 30055,
 		open: false,
 		ui: {
 			port: 30056,
 			weinre: {
 				port: 30057
 			}
 		}
 	});
 });

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
 gulp.task('sass', function () {
 	 var source = gulp.src('_scss/custom.scss')
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
    }))
        .pipe(sourcemaps.init()) // Start Sourcemaps
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }));

    var pipe1 = source.pipe(clone())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css')); // Create sourcemap

    var pipe2 = source.pipe(clone())
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
    .pipe(gulp.dest('css'));

    return merge(pipe1, pipe2);

 // 	return gulp.src('_scss/custom.scss')
 //    .pipe(sourcemaps.init())
 // 	.pipe(sass().on('error', sass.logError))
	// .pipe(sourcemaps.write())
 // 	.pipe(plumber())
 // 	.pipe(rename('custom.temp.css'))
 // 	.pipe(filesize())
 // 	.pipe(gulp.dest('css'))
 // 	.pipe(rename('custom.css'))
 // 	.pipe(filesize())
 // 	.pipe(gulp.dest('css'))
 // 	.pipe(cssnano({
 // 		convertValues: {
 // 			length: false
 // 		},
 // 		discardComments: {
 // 			removeAll: true
 // 		}
 // 	}))
 // 	.pipe(rename('custom.min.css'))
 // 	.pipe(filesize())
 // 	.pipe(gulp.dest('css'))

 	// .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		// .pipe(browserSync.reload({stream:true}))
	});

 // gulp.task('css-postpro', ['sass'], function(){
 // 	var processors = [autoprefixer({browsers: ['last 1 version']})];
 // 	return gulp.src('css/custom.temp.css')
 // 	.pipe(postcss(processors))
 // 	.pipe(rename('custom.css'))
 // 	.pipe(filesize())
 // 	.pipe(gulp.dest('css'))
 // 	.pipe(cssnano({
 // 		convertValues: {
 // 			length: false
 // 		},
 // 		discardComments: {
 // 			removeAll: true
 // 		}
 // 	}))
 // 	.pipe(rename('custom.min.css'))
 // 	.pipe(filesize())
 // 	.pipe(gulp.dest('css'))
 // 	.on('error', gutil.log)
 // });
/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
 gulp.task('default', ['browser-sync', 'sass', 'image-resize-1x', 'image-resize-2x', 'image-resize-3x', 'image-resize-4x'], function(){
 	gulp.watch('_scss/**/*.scss', ['sass']);
 	gulp.watch('images/*.{jpg,png}', ['image-resize-1x', 'image-resize-2x', 'image-resize-3x', 'image-resize-4x']);
 	gulp.watch(['about.md', '_data/**/*.*', 'feed.xml', '_config.yml', 'index.html', '_layouts/*.html', '_posts/*', '_includes/*.html', 'js/**/*.js', 'css/custom.css', '*.md', '*.html'], ['jekyll-rebuild']);
 });
