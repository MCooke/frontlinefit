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
				files: ['src/pages/*.hbs', 'src/partials/*.hbs', 'src/configs/*.json', 'src/layouts/*.json'],
				tasks: '<%= tasks.templates %>',
			},
			styles: {
				files: 'src/styles/**/*.scss',
				tasks: '<%= tasks.styles %>',
			},
			scripts: {
				files: 'src/scripts/**/*.js',
				tasks: '<%= tasks.scripts %>',
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
			options: {
				sourcemap: 'none'
			},			
			dist: {
				files: {
					'src/styles/main.css' : 'src/styles/default.scss',
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'dist/css/main.min.css': 'src/styles/main.css',
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
				dest: 'dist/html/'
			}		
		},
		uglify: {
			files: {
				'dist/js/general.js': 'src/scripts/*.js',
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
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.task.registerTask( 'styles', tasks.styles );

	// Scripts stuff
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-jscs' );
	grunt.task.registerTask( 'scripts', tasks.scripts );

	// Big time compile
	grunt.registerTask( 'massCompile', 'Mass compile task is used by NPM on install & deploy task', function() {
		grunt.task.run( [ 'styles', 'templates', 'scripts' ] );
	} );

};