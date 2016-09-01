import 'modules/account';

describe('Account Controller', () => {
  var firebaseAuth, authService, controller, $rootscope, $timeout;

  beforeAll(() => {
    window.MockFirebase.override();
  });

  afterAll(() => {
    window.MockFirebase.restore();
  });

  beforeEach(() => {
    module('application.account');

    inject(($controller, $firebaseAuth, _$timeout_, _$rootScope_) => {
      firebaseAuth = firebase.auth();
      authService = $firebaseAuth(firebaseAuth);
      $rootscope = _$rootScope_;
      $timeout = _$timeout_;

      controller = $controller('AccountController', {
        $firebaseAuthService: authService
      });
    });
  });

  describe('Signin', () => {

    it('should sign in anonymously', () => {
      var response;

      authService.$onAuthStateChanged((user) => {
        response = user;
      });

      controller.signin('anonymous');
      firebaseAuth.flush();
      $rootscope.$digest();
      $timeout.flush();

      expect(authService.$getAuth().isAnonymous).toEqual(true);
      expect(authService.$getAuth()).toEqual(response);
    });
  });
});
