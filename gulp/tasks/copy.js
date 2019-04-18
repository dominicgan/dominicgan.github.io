const gulp    = require('gulp');
const chalk   = require('chalk');
const npmPath = './node_modules/';

gulp.task('copysystemjs', () => {
	return gulp.src('./node_modules/systemjs/dist/system.js')
	.pipe(gulp.dest('./dist/js'))
});

gulp.task('copynpm', () => {
	return gulp.src([
		npmPath + 'systemjs-plugin-css/css.js'
	], { base: npmPath })
	.pipe(gulp.dest('./js/npm'))
});

gulp.task('copy', (done) => {
	gulp.parallel('copysystemjs', 'copynpm');
	done();
});
