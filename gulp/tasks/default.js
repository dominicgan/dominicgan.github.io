const gulp        = require('gulp');
const runSequence = require('run-sequence');

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', [], function(){
    runSequence(
    	'copy',
        ['sass', 'babel'],
        'bundle',
        'proj-image-resize',
        'jekyll-build',
        'browser-sync',
        'watch'
    );
 });