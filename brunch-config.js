var fs = require('fs');
var router = require('base-apps-router');

module.exports = {
  conventions: {
    ignored: [
      'test/mockfirebase.js'
    ]
  },

  files: {
    javascripts: {
      joinTo: {
        'js/app.js':  [/^app/,"!**/*.spec.js"],
        'js/vendor.js':  [/^(?!app)/,/^(?!test)/,"!**/*.spec.js"]
      }
    },
    stylesheets: {
      joinTo: '/css/app.css'
    }
  },

  plugins: {
    babel: {
      presets: ['es2015']
    },
    eslint: {
      // do not fail build when running against config-routes.js
      pattern: /^app\/config\/config-routes\.js$/,
      warnOnly: true
    },
    htmlPages: {
      forceRemoveFrontMatter: true
    }
  },

  optimize: false,

  hooks: {
    preCompile: (done) => {
      router({
        src: 'app/**/*.html',
        dest: 'build',
        path: 'app/config/config-routes.js',
        root: 'app',
        library: 'node',
        overwrite: true
      }).then(done);
    },

    // TODO: Remove once htmlPages supports forceRemoveFrontMatter option
    onCompile: () => {
      router({
        src: './public/**/*.html',
        dest: './public',
        path: './build/routes.js',
        root: './public',
        library: 'node',
        overwrite: true
      });
    }
  },

  overrides: {
    production: {
      optimize: true
    }
  }
};
