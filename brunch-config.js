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
    htmlPages: {
      forceRemoveFrontMatter: true
    },
    modernizr: {
      destination: 'js/modernizr.js',
      options: [],
      tests: ['flexbox']
    },
    postcss: {
      processors: [
        require('autoprefixer')(['> 1%', 'last 2 versions', 'ie >= 10', 'iOS >= 7', 'Safari >= 7', 'Opera >= 25'])
      ]
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
