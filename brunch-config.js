var fs = require('fs');
var router = require('base-apps-router');

module.exports = {

  conventions: {
    assets:   /^(app)(\\|\/)(assets)/,
    ignored:  [/\/_/, /\.(spec|scenario)\.(js$)/, 'test/mockfirebase.js']
  },

  paths: {
    'public':   'public',
    'watched':  ['app']
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
      // do not run against autogenerated config-routes.js file
      pattern: /^(app)\/(?!config).*\.js?$/
    },
    htmlPages: {
      forceRemoveFrontMatter: true
    }
  },

  hooks: {
    preCompile: (done) => {
      router({
        src: 'app/**/*.html',
        path: 'app/config/config-routes.js',
        root: 'app',
        library: 'node',
        overwrite: true
      }).then(done);
    }
  }
};
