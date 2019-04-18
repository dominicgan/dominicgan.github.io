const gulp  = require('gulp');
const log = require('fancy-log');
const chalk = require('chalk');

const typeColorSet = (type) => {
    switch (type) {
        case 'added':
           return chalk.green(type);
        break;
        case 'deleted':
           return chalk.red(type);
        break;
        default:
           return chalk.yellow(type);
        break;
    }
};
const changeEvent = (file, type) => {
    log(chalk.cyan(file), 'was', chalk.bold(typeColorSet(type)));
};

/**
 * All watch tasks to go here
 */
gulp.task('watcher', () => {
    gulp.watch([
        './**/*.+(md|markdown|html|yml|xml|css|js|scss|jpg|jpeg|gif|png)',
        '!_site/**/*',
        '!gulp/**/*',
        '!node_modules/',
        '!bower_components/',
        ])
        .on('change', (file) => changeEvent(file, 'changed'))
        .on('add', (file) => changeEvent(file, 'added'))
        .on('unlink', (file) => changeEvent(file, 'deleted'));

    gulp.watch('./_scss/**/*.scss')
        .on('all', gulp.series('sass'));

    gulp.watch('./images/project_src/*.*')
        .on('all', gulp.series('projImageResize'));

    gulp.watch(['./js/**/*.js'])
        .on('all', gulp.series('babelify', 'bundle'));
});