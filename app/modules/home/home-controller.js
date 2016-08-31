export default class HomeController {
  constructor($firebaseArray) {
    var self = this;

    var ref = firebase.database().ref().child('messages');
    this.messages = $firebaseArray(ref);
    this.messages.$resolved = false;
    this.messages.$loaded().then(() => {
      self.messages.$resolved = true;
    });

    return this;
  }

  submit(message) {
    return this.messages.$add(message);
  }
};

HomeController.$inject = ['$firebaseArray'];
