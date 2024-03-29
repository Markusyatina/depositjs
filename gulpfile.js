'use strict';

var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var sourceFile = './userjs.js';
var destFolder = './dist/';
var buildFolder = './build/';
var destFile   = 'userjs.min.js';
var uglify     = require('gulp-uglify');
var bufferify  = require('vinyl-buffer');
var del        = require('del');
var header     = require('gulp-header');
var pkg        = require('./package.json');

// userjs header
var banner = [
	'// ==UserScript==',
	'// @name           ${name}',
	'// @description    ${desc}',
	'// @version        ${ver}',
	'// @date           ${date}',
	'// @author         ${author}',
	'// @homepageURL    https://github.com/ReklatsMasters/depositjs',
	'// @updateURL      https://openuserjs.org/install/${author}/${name}.user.js',
	'// @include        http://depositfiles.com/files/*',
	'// @include        http://depositfiles.com/*/files/*',
	'// @include        http://depositfiles.org/files/*',
	'// @include        http://depositfiles.org/*/files/*',
	'// @include        http://dfiles.ru/*/files/*',
	'// @include        http://dfiles.ru/files/*',
	'// @include        http://dfiles.eu/*/files/*',
	'// @include        http://dfiles.eu/files/*',
	'// @grant          GM_xmlhttpRequest',
	'// @icon           http://static.dfiles.ru/images/favicon.ico',
	'// @license        ${lic};https://github.com/ReklatsMasters/depositjs/blob/master/LICENSE',
	'// @copyright      ${year}, ${author} (${mysite})',
	'// ==/UserScript==',
	'\n'
].join('\n');

var locals = {
	name:   pkg.name,
	ver:    pkg.version,
	author: pkg.author,
	date:   new Date().toISOString().split('T')[0],
	desc:   pkg.description,
	lic:    pkg.license,
	year:   new Date().getFullYear(),
	mysite: "https://github.com/ReklatsMasters"
};

gulp.task('clean:dist', function (cb) {
	del([destFolder], cb);
});

gulp.task('clean:build', function (cb) {
	del([buildFolder], cb);
});

gulp.task('dist', ['clean:dist'], function() {
	return browserify(sourceFile)
	.bundle()
	.pipe(source(destFile))
	.pipe(bufferify())
	.pipe(uglify())
	.pipe(header(banner, locals))
	.pipe(gulp.dest(destFolder));
});

gulp.task('build', ['clean:build'], function() {
	return browserify(sourceFile)
	.bundle()
	.pipe(source(destFile))
	.pipe(bufferify())
	.pipe(uglify())
	.pipe(header(banner, locals))
	.pipe(gulp.dest(buildFolder));
});

gulp.task('default', ['build']);
