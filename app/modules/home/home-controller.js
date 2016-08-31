export default class HomeController {
  constructor($firebaseRef, $firebaseObject, $firebaseArray) {
    var vm = this, ref;

    ref = $firebaseRef.default.child('person');
    this.person = $firebaseObject(ref);
    ref = $firebaseRef.default.child('messages');
    this.messages = $firebaseArray(ref);

    this.messages.$resolved = false;
    this.messages.$loaded().then(() => {
      vm.messages.$resolved = true;
    });

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

HomeController.$inject = ['$firebaseRef', '$firebaseObject', '$firebaseArray'];
