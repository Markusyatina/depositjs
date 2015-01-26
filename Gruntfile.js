module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
 
	grunt.registerTask('default', ['browserify', 'watch']);
 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			main: {
				src: 'userjs.js',
				dest: 'dist/dist.js'
			}
		},
		watch: {
			files: 'user.js',
			tasks: ['default']
		}
	});
};