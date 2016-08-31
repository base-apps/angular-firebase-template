// Angular Base Apps Configuration
import fs from 'angular-base-apps/node_modules/fastclick';
import 'angular-base-apps/node_modules/viewport-units-buggyfill';
import 'angular-base-apps/node_modules/tether/tether';
import 'angular-base-apps/node_modules/hammerjs/hammer';
import angular from 'angular';
import 'angular-base-apps/node_modules/angular-animate';
import 'angular-base-apps/node_modules/angular-ui-router';
import 'angular-base-apps/dist/js/base-apps';

// Firebase Configuration
import 'firebase';
import 'angularfire';
import firebaseconfig from './config-firebase';
firebase.initializeApp(firebaseconfig);

// Icon Configuration
import 'angular-icons/dist/open-iconic';
import 'angular-icons/dist/ionicons';
import 'angular-icons/dist/material-icons';

// Route Configuration
import 'angular-dynamic-routing/dynamicRouting';
import 'angular-dynamic-routing/dynamicRouting.animations';
import './config-routes';

// Application Configuration
const AppConfig = ($urlProvider, $locationProvider) => {
  $urlProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false
  });
};

AppConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

const AppRun = () => {
  fs.FastClick.attach(document.body);
};

import './modules/home';

angular.module('application', [
  'ui.router',
  'ngAnimate',

  // firebase
  'firebase',

  // base apps
  'base',

  // icons
  'angularIcons.openIconic',
  'angularIcons.ionicons',
  'angularIcons.materialIcons',

  // dynamic routing
  'dynamicRouting',
  'dynamicRouting.animations',

  // modules
  'application.home'
])
.config(AppConfig)
.run(AppRun);
