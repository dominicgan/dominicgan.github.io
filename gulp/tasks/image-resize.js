const gulp          = require('gulp');
const gutil         = require('gulp-util');
const plumber       = require('gulp-plumber');
const imgResponsive = require('gulp-responsive');

/**
 * Resize uploaded images
 */
gulp.task('proj-image-resize', function () {
    return gulp.src('./images/project_src/*.{png,jpg}')
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(gulp.dest('./images/project/converted'))
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
      .pipe(gulp.dest('./images/project/'));
});