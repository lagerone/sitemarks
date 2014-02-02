module.exports = function(grunt) {

	var config = {};

	config.jshint = {
		all: ['Gruntfile.js', 'scripts/*.js']
	};
	config.uglify = {
		all: {
			files: {
				'build/sitemarks.merged.js': ['scripts/sitemarks.storage.js', 'scripts/sitemarks.oink.js', 'scripts/sitemarks.app.js']
			}
		}
	};
	config.jasmine = {
		all: {
			src: ['scripts/sitemarks.storage.js', 'scripts/sitemarks.oink.js'],
			options: {
				specs: 'scripts/*.spec.js'
			}
		}
	};
	config.less = {
		development: {
			options: {
				paths: ['less'],
				compress: true
			},
			files: {
				'css/sitemarks.min.css': 'css/sitemarks.less'
			}
		}
	};
	config.watch = {
		files: 'css/*.less',
		tasks: ['less']
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev','watch');
	grunt.registerTask('default', ['jshint', 'uglify', 'jasmine']);
};