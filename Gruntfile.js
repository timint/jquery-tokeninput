module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    replace: {
      index: {
        src: ['src/*'],
        overwrite: true,
        replacements: [
          {
            from: /Version ([0-9\.]+)/,
            to: 'Version <%= pkg.version %>'
          }
        ]
      },
    },

    less: {
      tokeninput_minified: {
        options: {
          compress: true,
          sourceMap: true,
          sourceMapBasepath: 'src/',
          sourceMapRootpath: './',
          sourceMapURL: function(path) { return path.replace(/.*\//, '') + '.map'; },
          relativeUrls: true
        },
        files: {
          'build/jquery.tokeninput.min.css'       : 'src/jquery.tokeninput.less',
        }
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: true
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      less: {
        files: [
          'src/jquery.tokeninput.less',
        ],
        tasks: ['less']
      },
    }
  });

  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['replace', 'less', 'uglify']);

};