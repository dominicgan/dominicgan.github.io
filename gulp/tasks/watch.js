const gulp        = require('gulp');
const gutil       = require('gulp-util');
const runSequence = require('run-sequence');
const changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path), 'was', gutil.colors.magenta(evt.type));
};

/**
 * All watch tasks to go here
 */
gulp.task('watch', function() {
    gulp.watch('./_scss/**/*.scss').on('change', function(evt) {
        changeEvent(evt);
        return runSequence('sass');
    });

    gulp.watch('./images/project_src/*.*').on('change', function(evt) {
        changeEvent(evt);
        return runSequence('proj-image-resize');
    });

    gulp.watch([
        './*.+(md|html|yml|xml)',
        './_data/**/*.*', 
        './_drafts/**/*.*', 
        './_includes/**/*.html', 
        './_layouts/**/*.html', 
        './_posts/**/*.*',  
        './js/**/*.js', 
        './css/**/*.css' 
    ]).on('change', function(evt) {
        changeEvent(evt);
        return runSequence('jekyll-rebuild');
    });
});