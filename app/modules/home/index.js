import 'firebase';
import HomeController from './home-controller';

export default angular.module('application.home', ['firebase.database'])
  .controller('HomeController', HomeController)
  .name;
