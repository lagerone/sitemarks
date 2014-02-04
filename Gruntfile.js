fs = require('fs');

module.exports = function(grunt) {

	var config = {};

/*
	var	sitemarksStyles = grunt.file.read('build/sitemarks.min.css');
	config.banner = '// <%= sitemarksStyles %>';
	config.usebanner = {
		dist: {
			options: {
				position: 'top',
				banner: '// <%= sitemarksStyles %>',
				linebreak: true
			},
			files: {
				src: ['src/sitemarks.loader.js']
			}
		}
	};
*/
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
				'build/sitemarks.min.css': 'src/sitemarks.less'
			}
		}
	};
	config.template = {
		'sitemarksDemoPage' : {
			options : {
				data : function(){
					var code = fs.readFileSync('build/sitemarks.loader.min.js','ascii').trim();
					return {
						code: code
					};
				}
			},
			files : {
				'index.html' : ['index.html.tpl']
			}
		}
	};
	config.watch = {
		files: ['src/*', 'index.html.tpl'],
		tasks: ['less', 'demoPage']
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-banner');

	grunt.registerTask('demoPage', 'build demo page', ['template:sitemarksDemoPage']);

	grunt.registerTask('dev','watch');
	grunt.registerTask('default', ['jshint', 'uglify', 'jasmine', 'less', 'demoPage']);
};