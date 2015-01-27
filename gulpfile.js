'use strict';

var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var sourceFile = './userjs.js';
var destFolder = './dist/';
var destFile   = 'dist.min.js';
var uglify     = require('gulp-uglify');
var bufferify  = require('vinyl-buffer');
var del        = require('del');
var vinylPaths = require('vinyl-paths');
 
gulp.task('browserify', function() {
	return browserify(sourceFile)
	.bundle()
	.pipe(source(destFile))
	.pipe(bufferify())
	.pipe(uglify())
	.pipe(gulp.dest(destFolder));
});

gulp.task('clean:tmp', function () {
	return gulp.src(destFolder)
		.pipe(vinylPaths(del));
});

gulp.task('default', ['clean:tmp', 'browserify']);