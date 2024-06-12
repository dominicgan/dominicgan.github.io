const gulp = require('gulp');
const requireDir = require('require-dir');
const log = require('fancy-log');
const chalk = require('chalk');

log(`[platform] ${chalk.bold.green(process.platform)} ${chalk.bold.red(process.arch)} `);
log(`[pid] ${chalk.yellow(process.pid)}`);

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {
    recurse: true
});

module.exports = gulp;