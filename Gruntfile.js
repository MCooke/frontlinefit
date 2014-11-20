/* jslint node: true */
'use strict';

module.exports = function( grunt ) {

	var tasks = {
		templates: ['assemble'],
		styles : ['sass', 'cssmin', 'scsslint'],
		scripts: ['uglify', 'jscs']
	}

	// project configuration
	grunt.initConfig( {
		tasks: tasks,
		watch: {
			templates: {
				files: ['src/pages/*.hbs', 'src/partials/*.hbs', 'src/layouts/*.hbs', 'src/configs/*.json'],
				tasks: '<%= tasks.templates %>',
			},
			styles: {
				files: 'src/styles/**/*',
				tasks: '<%= tasks.styles %>',
			},
			scripts: {
				files: 'src/scripts/*.js',
				tasks: '<%= tasks.scripts %>',
			}	
		},
		connect: {
			server: {
				options: {
					port: '8888',
					target: 'http://localhost:8888',
					appName: 'Google Chrome',
					base: '.',
				}
			}
		},
		scsslint: {
			options: {
				colorizeOutput: true,
				config: '.scss-lint.yml',
				maxBuffer: 'false',
				force: true
			},
			allFiles: [
				'src/styles/*.scss',
			]
		},
		sass: {		
			dist: {
				files: {
					'src/styles/main.css' : 'src/styles/main.scss',
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'css/main.min.css': 'src/styles/main.css',
				}
			}
		},
		assemble: {
			options: {
				assets: 'assets',
				partials: ['src/partials/*.hbs'],
				flatten: true,
				config: grunt.file.readJSON( 'src/configs/config.json' ),
				layout: ['src/layouts/_main.hbs']
			},
			pages: {
				src: 'src/pages/*.hbs',
				dest: '.'
			}		
		},
		uglify: {
			all_files: {
				files: {
					'js/general.min.js': ['src/scripts/general.js'],
				}
			}
		},
		jscs: {
			options: {
				config: 'jscs.json',
				force: 'true'
			},
			src: ['src/scripts/*.js']
		}


	} );

	// Template stuff
	grunt.loadNpmTasks( 'assemble' );
	grunt.task.registerTask( 'templates', tasks.templates );
	
	// Styles stuff
	grunt.loadNpmTasks( 'grunt-scss-lint' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.task.registerTask( 'styles', tasks.styles );

	// Scripts stuff
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-jscs' );
	grunt.task.registerTask( 'scripts', tasks.scripts );

	// Stuff stuff
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'default', ['connect', 'watch'] );


};