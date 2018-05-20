const gulp = require('gulp');
const requireDir = require('require-dir');

console.log('This platform is ' + process.platform);

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {
    recurse: true
});

module.exports = gulp;