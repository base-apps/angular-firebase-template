import 'firebase';
import AccountController from './account-controller';

export default angular.module('application.account', ['firebase.auth'])
  .controller('AccountController', AccountController)
  .name;
