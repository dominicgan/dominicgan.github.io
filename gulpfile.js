const gulp = require('gulp');
const requireDir = require('require-dir');
const log = require('fancy-log');
const chalk = require('chalk');

log(`[platform] ${chalk.bold.green(process.platform)} ${chalk.bold.red(process.arch)} `);
log(`[pid] ${chalk.yellow(process.pid)}`);
// log('[env vars] ');
// Array.prototype.filter.call(Object.keys(process.env), envVar => envVar.indexOf('npm_') < 0 && envVar.indexOf('MANPATH') < 0)
// .sort((a,b) => a > b)
// .map(envVar => log(`${chalk.yellow(envVar)}: ${process.env[envVar]}`));

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {
    recurse: true
});

module.exports = gulp;