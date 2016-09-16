export default class AccountController {
  constructor($firebaseAuthService, $log, BaseAppsApi) {
    this.authService = $firebaseAuthService;
    this.authLoading = false;
    this.$log = $log;
    this.BaseAppsApi = BaseAppsApi;
    return this;
  }

  signin(provider) {
    const $log = this.$log;
    const BaseAppsApi = this.BaseAppsApi;

    switch (provider) {
      case 'anonymous':
        this.authLoading = true;
        return this.authService.$signInAnonymously()
          .catch((error) => {
            $log.log('Login Failed!', error);
            BaseAppsApi.publish('account-notifications', {
              title: 'Anonymous Login Failed',
              content: error.message,
              color: 'alert'
            });
          })
          .finally(() => this.authLoading = false);
      case 'google':
      case 'twitter':
      case 'facebook':
      case 'github':
        this.authLoading = true;
        return this.authService.$signInWithPopup(provider)
          .catch((error) => {
            $log.log('Login Failed!', error);
            BaseAppsApi.publish('account-notifications', {
              title: provider.substr(0, 1).toUpperCase() + provider.substr(1) + ' Login Failed',
              content: error.message + (error.email ? ' (email: ' + error.email + ')' : ''),
              color: 'alert'
            });
          })
          .finally(() => this.authLoading = false);
      default:
        $log.log('Provider not supported: ' + provider);
        return null;
    }
  }

  printUserInfo() {
    return JSON.stringify(this.authService.$getAuth(), null, 2);
  }

  signout() {
    this.authLoading = true;
    return this.authService.$signOut()
      .finally(() => this.authLoading = false);
  }
}

AccountController.$inject = ['$firebaseAuthService', '$log', 'BaseAppsApi'];
