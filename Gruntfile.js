module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-browserify');
 
	grunt.registerTask('default', ['browserify']);
 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			main: {
				src: 'userjs.js',
				dest: 'dist/dist.js'
			}
		}
	});
};