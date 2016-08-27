const AppConfig = () => {
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: 'AIzaSyBkB1IvviOcPq4z8Rs7nijEdIa9n1IvRlU',
    authDomain: 'angular-firebase-template.firebaseapp.com',
    databaseURL: 'https://angular-firebase-template.firebaseio.com',
    storageBucket: ''
  });
};

angular.module('application').config(AppConfig);
