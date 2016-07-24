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
var filesize = require('gulp-filesize');
var changed = require("gulp-changed");
var parallel = require('concurrent-transform');
var os = require("os");
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
	jekyllBuild: '<span style="color: grey"> Running: </span>  $ jekyll build'
};

var imgResponsive = require('gulp-responsive');

gulp.task('proj-image-resize', function () {
  return gulp.src('images/project_src/*.{png,jpg}')
    .pipe(imgResponsive({
        '*.jpg': [{
            width: 360,
            rename: { suffix: '-xs' },
        }, {
            width: 540,
            rename: { suffix: '-sm' },
        }, {
            width: 768,
            rename: { suffix: '-md' },
        }, {
            width: 1200,
            rename: { suffix: '-lg' },
        }, {
            rename: { suffix: '-src' },
        }],
    },
    {
    // Global configuration for all images
    // The output quality for JPEG, WebP and TIFF output formats
    quality: 85,
    // Use progressive (interlace) scan for JPEG and PNG output
    progressive: true,
    // Zlib compression level of PNG output format
    compressionLevel: 6,
    // Strip all metadata
    withMetadata: false,
  }))
    .pipe(gulp.dest('images/project/'));
});

/**
 * Build the Jekyll Site
 */
 gulp.task('jekyll-build', function (done) {
 	browserSync.notify(messages.jekyllBuild);
 	return cp.spawn( jekyll , ['build','--drafts'], {stdio: 'inherit'})
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
 gulp.task('browser-sync', ['sass'], function() {
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

	});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
 gulp.task('default', ['browser-sync', 'sass', 'proj-image-resize'], function(){
 	gulp.watch('_scss/**/*.scss', ['sass']);
 	gulp.watch('images/project_src/*.{jpg,png}', ['proj-image-resize']);
 	gulp.watch(['about.md', '_data/**/*.*', 'feed.xml', '_config.yml', 'index.html', '_layouts/*.html', '_posts/*',  '_drafts/*', '_includes/*.html', 'js/**/*.js', 'css/**/*.css', '*.md', '*.html'], ['jekyll-rebuild']);
 });
