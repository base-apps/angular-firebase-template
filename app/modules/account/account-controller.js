export default class AccountController {
  constructor($firebaseAuthService) {
    this.providers = ['twitter', 'facebook', 'google', 'github'];
    this.authService = $firebaseAuthService;
    this.authLoading = false;

    return this;
  }

  signin(provider) {
    switch (provider) {
      case 'anonymous':
        this.authLoading = true;
        this.authService.$signInAnonymously().catch((error) => {
          console.log('Login Failed!', error);
        }).finally(() => this.authLoading = false);
        break;
      case 'google':
        this.authService.$signInWithPopup('google').catch((error) => {
          console.log('Login Failed!', error);
        }).finally(() => this.authLoading = false);
        break;
    }
  }

  printUserInfo() {
    return JSON.stringify(this.authService.$getAuth(), null, 2);
  }

  signout() {
    this.authLoading = true;
    this.authService.$signOut().finally(() => this.authLoading = false);
  }
}

AccountController.$inject = ['$firebaseAuthService'];
