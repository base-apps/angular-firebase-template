import 'modules/home';

describe('Home Controller', function() {
  var firebaseRef, controller, rootscope;

  window.MockFirebase.override();

  beforeEach(module('firebase.database', function(_$firebaseRefProvider_) {
    _$firebaseRefProvider_.registerUrl('Mock');
  }));

  beforeEach(function() {
    module('application.home');

    inject(function($controller, $firebaseArray, $firebaseObject, $firebaseRef, $rootScope) {
      rootscope = $rootScope;

      controller = $controller('HomeController', {
        $firebaseRef: $firebaseRef,
        $firebaseObject: $firebaseObject,
        $firebaseArray: $firebaseArray
      });
    });
  });

  describe('Object Data Testing', function() {

    beforeEach(function() {
      inject(function($firebaseRef) {
        firebaseRef = $firebaseRef.default.child('person');
      });
    });

    it('should read object data from firebase', function() {
      // save some data that our controller will read
      var person = {
        "name": "John Doe"
      };

      firebaseRef.set(person);
      firebaseRef.flush();
      rootscope.$digest();

      expect(controller.person.name).toEqual(person.name);
    });

    it('should write object data to firebase', function() {
      var person;

      // save some data that our controller will read
      firebaseRef.on("value", function (data) {
        person = data.val();
      });

      controller.updateName('Joe');
      firebaseRef.flush();
      rootscope.$digest();

      var keys = Object.keys(person);
      expect(keys.length).toEqual(1);
      expect(controller.person.name).toEqual(person.name);
    });
  });

  describe('Array Data Testing', function() {

    beforeEach(function() {
      inject(function($firebaseRef) {
        firebaseRef = $firebaseRef.default.child('messages');
      });
    });

    it('should read array data from firebase', function() {
      // save some data that our controller will read
      var message = 'hello';

      firebaseRef.push(message);
      firebaseRef.flush();
      rootscope.$digest();

      expect(controller.messages.length).toEqual(1);
      expect(controller.messages[0].$value).toEqual(message);
    });

    it('should write array data to firebase', function() {
      var response;

      // save some data that our controller will read
      firebaseRef.on("value", function (data) {
        response = data.val();
      });

      controller.submitMessage('message');
      firebaseRef.flush();
      rootscope.$digest();

      var keys = Object.keys(response);
      expect(keys.length).toEqual(1);
      expect(controller.messages.length).toEqual(1);
      expect(controller.messages[0].$value).toEqual(response[keys[0]]);
    });
  });
});
