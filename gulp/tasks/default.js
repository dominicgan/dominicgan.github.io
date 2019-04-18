const gulp = require('gulp');

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */

gulp.task('default', () => gulp.series(
	'copy',
	gulp.parallel('sass', 'babelify'),
	'bundle',
	'jekyllBuild',
	'bs',
	'watcher'
	)());
