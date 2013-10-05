module.exports = function(grunt) {

  // ----------------------------
  // grunt plugin configurations
  // ----------------------------

  grunt.initConfig({

    //
    // js hint, source linter, configuration
    //
    jshint: {
      files: [
        'app/**/*.js',
        'test/**/*.js'
      ],
      options:{
        ignores:[
          'app/vendor/**/*.js',
          'app/JST.js'
        ]
      }
    },

    //
    // node develoment server config
    //
    connect: {
      client: {
        options: {
          port: 9000, // listening port
          base:'./app', // DocumentRoot for this little node server
          middleware: function (connect, options) {
            return [
              require('connect-livereload')({ port: 44444 }),
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        }
      }
    },

    //
    // file watcher configuration
    //
    watch: {
      // reload browser when app files change
      client: {
        files: [
          'app/scripts/**',
          'app/styles/**',
          'app/vendor/**',
          'app/index.html',
          'app/JST.js'
        ],
        tasks:[],
        options: {
          livereload:44444
        }
      },
      // run the handlebars compiler when templates change
      templates: {
        files: ['app/templates/**'],
        tasks: ['handlebars']
      }
    },

    //
    // handlebars compiler configuration
    //
    handlebars: {
      compile: {
        options: {
          namespace: "JST",
          amd: true,
          wrapped: true
        },
        files: {
          "app/JST.js": "app/templates/**/*.html"
        }
      }
    }

  });

  // ---------------------------
  // tasks executor definitions
  // ---------------------------

  // load tasks defined by plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // define the default task
  grunt.registerTask('default','scan, build, test and run dev server',[
    'jshint',
    'handlebars',
    'devserver']);

  // define task to run a local development server
  grunt.registerTask('devserver', 'Development (node) server that will watch and reload', [
    'connect:client',
    'watch'
    ]);

  // define task to copy bower managed dependency libs
  // to the appropriate directories
  grunt.registerTask('copy-bower-libs','Copy libs managed by bower to the app vendor folder',function(){

    var fs = require('fs');
    var bower_dir = './bower_components/';
    var vendor_dir = './app/vendor/';

    grunt.log.write('\nCopying Bower managed libs to vendor folder:\n');

    function do_copy(src,dst,log) {

      grunt.log.write('  '+bower_dir+src+' '+vendor_dir+dst+' ');
      grunt.file.copy(bower_dir+src,vendor_dir+dst);
      grunt.log.ok();

    }
    
    do_copy('requirejs/require.js','require.js');
    do_copy('jquery/jquery.js','jquery.js');
    do_copy('lodash/dist/lodash.js','lodash.js');
    do_copy('backbone/backbone.js','backbone.js');
    do_copy('handlebars/handlebars.runtime.js','handlebars.runtime.js');
    grunt.log.write('done!\n');
  });

};

// NOTES:
//
// adapted from 
// http://www.brianchu.com/blog/2013/07/11/grunt-by-example-a-tutorial-for-javascripts-task-runner/
// http://stackoverflow.com/questions/14166591/automate-npm-and-bower-install-with-grunt (xavier.seignard)