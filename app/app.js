// Angular Base Apps Configuration
import fs from 'fastclick';
import angular from 'angular';
import 'angular-base-apps';

// Firebase Configuration
import firebase from 'firebase';
import 'angularfire';
import firebaseconfig from './config/config-firebase';
firebase.initializeApp(firebaseconfig);

// Icon Configuration
import 'angular-icons/dist/open-iconic';
import 'angular-icons/dist/ionicons';
import 'angular-icons/dist/material-icons';

// Route Configuration
import 'angular-dynamic-routing/dynamicRouting';
import 'angular-dynamic-routing/dynamicRouting.animations';
import routeconfig from './config/config-routes';

// Application Configuration
import moduleconfig from './modules';

const AppConfig = ($urlProvider, $locationProvider, $firebaseRefProvider, $BaseAppsStateProvider) => {
  $urlProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false
  });

  $firebaseRefProvider.registerUrl(firebaseconfig.databaseURL);

  $BaseAppsStateProvider.registerDynamicRoutes(routeconfig);
};

AppConfig.$inject = ['$urlRouterProvider', '$locationProvider', '$firebaseRefProvider', '$BaseAppsStateProvider'];

const AppRun = () => {
  fs.FastClick.attach(document.body);
};

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
  'dynamicRouting.animations'
].concat(moduleconfig))
.config(AppConfig)
.run(AppRun);
