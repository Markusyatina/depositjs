'use strict';

var browserify = require('browserify'),
		watchify = require('watchify'),
		gulp = require('gulp'),
		source = require('vinyl-source-stream'),
		sourceFile = './userjs.js',
		destFolder = './dist/',
		destFile = 'dist.js';
 
gulp.task('browserify', function() {
	return browserify(sourceFile)
	.bundle()
	.pipe(source(destFile))
	.pipe(gulp.dest(destFolder));
});

gulp.task('watch', function() {
	var bundler = watchify(sourceFile);
 
	function rebundle() {
		return bundler.bundle()
			.pipe(source(destFile))
			.pipe(gulp.dest(destFolder));
	}

	bundler.on('update', rebundle);
	return rebundle();
});

gulp.task('default', ['browserify', 'watch']);