import 'modules/account';

/*
 * Firebase Authentication Unit Tests
 *
 * Notes for Writing Tests:
 *  - firebaseAuth.flush() must be called for the authentication promise to be resolved
 *  - $timeout.flush() must be called to trigger the $firebaseAuth.$onAuthStateChanged callback
 */
describe('Account Controller', () => {
  let firebaseAuth, authService, controller, $timeout;

  beforeAll(() => {
    window.MockFirebase.override();
  });

  afterAll(() => {
    window.MockFirebase.restore();
  });

  beforeEach(() => {
    module('base.core');
    module('application.account');

    inject(($controller, $log, $firebaseAuth, _$timeout_, BaseAppsApi) => {
      firebaseAuth = firebase.auth();
      authService = $firebaseAuth(firebaseAuth);
      $timeout = _$timeout_;

      controller = $controller('AccountController', {
        $firebaseAuthService: authService,
        $log: $log,
        BaseAppsApi: BaseAppsApi
      });
    });
  });

  describe('Signin', () => {

    it('should sign in anonymously', () => {
      let response = null;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('anonymous');
      firebaseAuth.flush();
      $timeout.flush();

      expect(response).not.toEqual(null);
      expect(response.isAnonymous).toEqual(true);
    });

    it('should sign in with google', () => {
      let response = null;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('google');
      firebaseAuth.flush();
      $timeout.flush();

      expect(response).not.toEqual(null);
      expect(response.isAnonymous).toEqual(false);
      expect(response.providerData.length).toEqual(1);
      expect(response.providerData[0].providerId).toEqual('google.com');
    });

    it('should sign in with twitter', () => {
      let response = null;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('twitter');
      firebaseAuth.flush();
      $timeout.flush();

      expect(response).not.toEqual(null);
      expect(response.isAnonymous).toEqual(false);
      expect(response.providerData.length).toEqual(1);
      expect(response.providerData[0].providerId).toEqual('twitter.com');
    });

    it('should sign in with facebook', () => {
      let response = null;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('facebook');
      firebaseAuth.flush();
      $timeout.flush();

      expect(response).not.toEqual(null);
      expect(response.isAnonymous).toEqual(false);
      expect(response.providerData.length).toEqual(1);
      expect(response.providerData[0].providerId).toEqual('facebook.com');
    });

    it('should sign in with github', () => {
      let response = null;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('github');
      firebaseAuth.flush();
      $timeout.flush();

      expect(response).not.toEqual(null);
      expect(response.isAnonymous).toEqual(false);
      expect(response.providerData.length).toEqual(1);
      expect(response.providerData[0].providerId).toEqual('github.com');
    });
  });

  describe('Signout', () => {

    it('should sign out', () => {
      let response = null;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('anonymous');
      firebaseAuth.flush();
      $timeout.flush();

      expect(response).not.toEqual(null);

      controller.signout();
      firebaseAuth.flush();
      $timeout.flush();

      expect(response).toEqual(null);
    });
  });

  describe('Signout [auto flushing enabled]', () => {

    beforeEach(() => firebaseAuth.autoFlush(true));
    afterEach(() => firebaseAuth.autoFlush(false));

    it('should sign out', () => {
      let response = null;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('anonymous');
      $timeout.flush();

      expect(response).not.toEqual(null);

      controller.signout();
      $timeout.flush();

      expect(response).toEqual(null);
    });
  });
});
