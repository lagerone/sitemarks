fs = require('fs');

module.exports = function(grunt) {

	var config = {};

	config.jshint = {
		all: ['Gruntfile.js', 'src/*.js']
	};
	config.uglify = {
		all: {
			files: {
				'build/sitemarks.built.js': ['src/sitemarks.storage.js', 'src/sitemarks.oink.js', 'src/sitemarks.app.js'],
				'build/sitemarks.loader.min.js': ['src/sitemarks.loader.js']
			}
		}
	};
	config.jasmine = {
		all: {
			src: ['src/sitemarks.storage.js', 'src/sitemarks.oink.js'],
			options: {
				specs: 'src/*.spec.js'
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
	config.template = {
		'sitemarksPage' : {
			options : {
				data : function(){
					var code = fs.readFileSync('build/sitemarks.loader.min.js','ascii').trim();
					return {
						code: code
					};
				}
			},
			files : {
				'sitemarks.html' : ['sitemarks.html.tpl']
			}
		}
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-template');

	grunt.registerTask('sitemarks', 'build sitemarks', ['template:sitemarksPage']);

	grunt.registerTask('dev','watch');
	grunt.registerTask('default', ['jshint', 'uglify', 'jasmine', 'sitemarks']);
};