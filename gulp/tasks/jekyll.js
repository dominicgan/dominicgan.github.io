const gulp     = require('gulp');
const bs       = require('browser-sync');
const cp       = require('child_process');
const jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
	jekyllBuild: '<span style="color: grey"> Running: </span>  $ jekyll build'
};

function bsReload(cb) {
	bs.reload();
	return cb();
}
/**
 * Build the Jekyll Site
 */
gulp.task('jekyllBuild', (done) => {
 	bs.notify(messages.jekyllBuild);
 	cp.spawn( jekyll , ['build', '--drafts', '--watch', '--incremental'], {stdio: 'inherit'});
 	return done();
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyllRebuild', gulp.series('jekyllBuild', bsReload));