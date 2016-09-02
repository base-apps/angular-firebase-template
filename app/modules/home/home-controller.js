export default class HomeController {
  constructor($firebaseRef, $firebaseObject, $firebaseArray, $timeout) {
    var vm = this, ref;

    ref = $firebaseRef.default.child('person');
    this.person = $firebaseObject(ref);
    ref = $firebaseRef.default.child('messages');
    this.messages = $firebaseArray(ref);

    this.messages.$resolved = false;
    this.messages.$loaded().then(() => {
      vm.messages.$resolved = true;
    });

    // delay message rendering until after view animation
    this.showMessages = false;
    $timeout(function() {
      vm.showMessages = true;
    }, 750);

    return vm;
  }

  submitMessage(message) {
    this.messages.$add(message);
  }

  updateName(name) {
    this.person.name = name;
    this.person.$save();
  }
}

HomeController.$inject = ['$firebaseRef', '$firebaseObject', '$firebaseArray', '$timeout'];
