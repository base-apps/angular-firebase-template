import 'firebase';
import HomeController from './home-controller';

export default angular.module('application.home', ['firebase'])
  .controller('HomeController', HomeController)
  .name;
