import 'modules/home';

/*
 * Firebase Database Unit Tests
 *
 * Notes for Writing Tests:
 *  - firebaseRef.flush() must be called for the firebase database operation to complete
 *  - $rootscope.$digest() must be called for the controller to consume the changes made to firebase
 */
describe('Home Controller', () => {
  let firebaseRef, controller, $rootscope;

  beforeAll(() => {
    window.MockFirebase.override();
  });

  afterAll(() => {
    window.MockFirebase.restore();
  });

  beforeEach(module('firebase.database', (_$firebaseRefProvider_) => {
    _$firebaseRefProvider_.registerUrl('Mock');
  }));

  beforeEach(() => {
    module('application.home');

    inject(($controller, $firebaseArray, $firebaseObject, $firebaseRef, _$rootScope_, $timeout) => {
      $rootscope = _$rootScope_;

      controller = $controller('HomeController', {
        $firebaseRef: $firebaseRef,
        $firebaseObject: $firebaseObject,
        $firebaseArray: $firebaseArray,
        $timeout: $timeout
      });
    });
  });

  describe('Object Data Testing', () => {

    beforeEach(() => {
      inject(($firebaseRef) => {
        firebaseRef = $firebaseRef.default.child('person');
      });
    });

    it('should read object data from firebase', () => {
      // save some data that our controller will read
      const person = {
        name: 'John Doe'
      };

      firebaseRef.set(person);
      firebaseRef.flush();
      $rootscope.$digest();

      expect(controller.person.name).toEqual(person.name);
    });

    it('should write object data to firebase', () => {
      let person;

      // save some data that our controller will read
      firebaseRef.on('value', (data) => {
        person = data.val();
      });

      controller.updateName('Joe');
      firebaseRef.flush();
      $rootscope.$digest();

      const keys = Object.keys(person);
      expect(keys.length).toEqual(1);
      expect(controller.person.name).toEqual(person.name);
    });
  });

  describe('Array Data Testing', () => {

    beforeEach(() => {
      inject(($firebaseRef) => {
        firebaseRef = $firebaseRef.default.child('messages');
      });
    });

    it('should read array data from firebase', () => {
      // save some data that our controller will read
      const message = 'hello';

      firebaseRef.push(message);
      firebaseRef.flush();
      $rootscope.$digest();

      expect(controller.messages.length).toEqual(1);
      expect(controller.messages[0].$value).toEqual(message);
    });

    it('should write array data to firebase', () => {
      let response;

      // save some data that our controller will read
      firebaseRef.on('value', (data) => {
        response = data.val();
      });

      controller.submitMessage('message');
      firebaseRef.flush();
      $rootscope.$digest();

      const keys = Object.keys(response);
      expect(keys.length).toEqual(1);
      expect(controller.messages.length).toEqual(1);
      expect(controller.messages[0].$value).toEqual(response[keys[0]]);
    });
  });

  describe('Object Data Testing [auto flushing enabled]', () => {

    beforeEach(() => {
      inject(($firebaseRef) => {
        firebaseRef = $firebaseRef.default.child('person');
      });
    });

    beforeEach(() => firebaseRef.autoFlush(true));
    afterEach(() => firebaseRef.autoFlush(false));

    it('should read object data from firebase', () => {
      // save some data that our controller will read
      const person = {
        name: 'John Doe'
      };

      firebaseRef.set(person);
      $rootscope.$digest();

      expect(controller.person.name).toEqual(person.name);
    });

    it('should write object data to firebase', () => {
      let person;

      // save some data that our controller will read
      firebaseRef.on('value', (data) => {
        person = data.val();
      });

      controller.updateName('Joe');
      $rootscope.$digest();

      const keys = Object.keys(person);
      expect(keys.length).toEqual(1);
      expect(controller.person.name).toEqual(person.name);
    });
  });

  describe('Array Data Testing [auto flushing enabled]', () => {

    beforeEach(() => {
      inject(($firebaseRef) => {
        firebaseRef = $firebaseRef.default.child('messages');
      });
    });

    beforeEach(() => firebaseRef.autoFlush(true));
    afterEach(() => firebaseRef.autoFlush(false));

    it('should read array data from firebase', () => {
      // save some data that our controller will read
      const message = 'hello';

      firebaseRef.push(message);
      $rootscope.$digest();

      expect(controller.messages.length).toEqual(1);
      expect(controller.messages[0].$value).toEqual(message);
    });

    it('should write array data to firebase', () => {
      let response;

      // save some data that our controller will read
      firebaseRef.on('value', (data) => {
        response = data.val();
      });

      controller.submitMessage('message');
      $rootscope.$digest();

      const keys = Object.keys(response);
      expect(keys.length).toEqual(1);
      expect(controller.messages.length).toEqual(1);
      expect(controller.messages[0].$value).toEqual(response[keys[0]]);
    });
  });
});
