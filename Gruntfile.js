module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			all: ['Gruntfile.js', 'scripts/*.js']
		},

		uglify: {
			all: {
				files: {
					'build/sitemarks.merged.js': ['scripts/sitemarks.storage.js', 'scripts/sitemarks.oink.js', 'scripts/sitemarks.app.js']
				}
			}
		},

		jasmine: {
			all: {
				src: ['scripts/sitemarks.storage.js', 'scripts/sitemarks.oink.js'],
				options: {
					specs: 'scripts/*.spec.js'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', ['jshint', 'uglify', 'jasmine']);
};