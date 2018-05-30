const gulp          = require('gulp');
const browserSync   = require('browser-sync');

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', [], function() {
 	browserSync.init({
 		server: {
 			baseDir: './_site'
 		},
 		port: 30055,
 		open: false,
 		ui: {
 			port: 30056,
 			weinre: {
 				port: 30057
 			}
 		},
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                borderRadius: '5px 0 0 0',
                background: 'rgba(27,32,50,0.7)',
            }
        }
    });
});