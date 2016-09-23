(function () {
  'use strict';

  module.exports = function (config) {
    var configuration = {

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],


      // list of files / patterns to load in the browser
      files: [
        'public/js/modernizr.js',
        'public/js/vendor.js',
        'public/js/app.js',
        'test/mockfirebase.js',
        'test/karma.boot.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'app/**/*.spec.js'
      ],


      // list of files to exclude
      exclude: [
      ],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        'test/**/*.js' : ['babel'],
        '**/*.spec.js' : ['babel']
      },
      babelPreprocessor: {
        options: {
          "presets": ["es2015"]
        }
      },


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['spec'],


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome'],
      customLaunchers: {
        Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },

      singleRun: true
    };

    if (process.env.TRAVIS) {
      configuration.browsers = ['Chrome_travis_ci'];
      configuration.singleRun = true;
    }

    config.set(configuration);
  };
}());
