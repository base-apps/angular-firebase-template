export default class AccountController {
  constructor($firebaseAuthService) {
    this.providers = ['twitter', 'facebook', 'google', 'github'];
    this.authService = $firebaseAuthService;

    return this;
  }

  signin(provider) {
    switch (provider) {
      case 'anonymous':
        this.authService.$signInAnonymously().then((user) => {
          console.log('Login Successful with Payload: ', user);
        }, (error) => {
          console.log('Login Failed!', error);
        });
        break;
    }
  }

  printUserInfo() {
    return JSON.stringify(this.authService.$getAuth(), null, 2);
  }
}

AccountController.$inject = ['$firebaseAuthService'];
