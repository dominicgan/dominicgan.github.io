const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const cp            = require('child_process');
const jekyll        = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages      = {
	jekyllBuild: '<span style="color: grey"> Running: </span>  $ jekyll build'
};

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