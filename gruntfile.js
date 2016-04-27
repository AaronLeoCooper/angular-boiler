var poststylus = function() {
  return require('poststylus')(['autoprefixer'])
};

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['public/'],
          livereload: true,
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },

		stylus: {
			compile: {
				options: {
					paths: ['app/styles'],
					compress: false,
					use: [poststylus],
				},
				files: {
					'public/styles/app.css': 'app/styles/main.styl',
				}
			}
		},

		concat: {
			options: {
				separator: ';\n'
			},

			all: {
				files: {
					'public/scripts/vendor.js': ['vendor/scripts/**/*.js'],
					//'public/scripts/angular.js': ['vendor/angular/**/*.js'],
					'public/scripts/app.js': ['app/scripts/**/*.js'],
				}
			},
		},

		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
				files: {
		      'public/styles/vendor.css': ['vendor/styles/**/*.css']
		    }
		  }
		},

		copy: {
			html: {
				files: [
					// Core HTML files under app/*.html
					{
						expand: true,
						flatten: true,
						src: ['app/*.html'],
						dest: 'public/',
						filter: 'isFile'
					},
					// View files for angular
					{
						expand: true,
						flatten: true,
						src: ['app/scripts/views/*.html'],
						dest: 'public/views',
						filter: 'isFile'
					},
					// Directive files for angular
					{
						expand: true,
						flatten: true,
						src: ['app/scripts/directives/*.html'],
						dest: 'public/directives',
						filter: 'isFile'
					},
				]
			},
			images: {
				files: [
          // App images
					{
						expand: true,
						flatten: true,
						src: ['app/images/**/*.*'],
						dest: 'public/images',
						filter: 'isFile'
					},
				]
			},
			fonts: {
				files: [
          // Vendor & Custom app fonts
					{
						expand: true,
						flatten: true,
						src: ['vendor/fonts/**/*.*', 'app/fonts/**/*.*'],
						dest: 'public/fonts',
						filter: 'isFile'
					},
				]
			},
		},

    watch: {
			options: {
        spawn: false,
        interrupt: true,
				livereload: true,
			},
      scripts: {
        files: ['app/scripts/**/*.js', 'vendor/scripts/**/*.js'],
        tasks: ['concat'],
      },
      stylus: {
        files: ['app/styles/**/*.styl'],
        tasks: ['stylus:compile'],
      },
      vendorcss: {
        files: ['vendor/styles/**/*.css'],
        tasks: ['cssmin'],
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['copy:html'],
      },
      images: {
        files: ['app/images/**/*.*'],
        tasks: ['copy:images'],
      },
      fonts: {
        files: ['vendor/fonts/**/*.*', 'app/fonts/**/*.*'],
        tasks: ['copy:fonts'],
      },
		},

    clean: ["public"],

	});

	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('build', ['clean', 'stylus:compile', 'concat', 'copy', 'cssmin']);
	grunt.registerTask('serve', ['clean', 'build', 'express', 'watch']);

	grunt.registerTask('default', ['serve']);
};
