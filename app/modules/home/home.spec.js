import 'modules/home';

describe('Controller: Home', function() {
  window.MockFirebase.override();

  var firebaseRef, controller;

  beforeEach(function() {
    module('application.home');

    inject(function($controller, $firebaseArray) {
      controller = $controller('HomeController', {
        $firebaseArray: $firebaseArray
      });
    });
  });

  it('should read data from firebase', function() {
    controller.submit('message').then(function() {
      expect(controller.messages).toContain('message');
    });
  });
});
