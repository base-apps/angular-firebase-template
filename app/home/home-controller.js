const HomeController = ($scope, $firebaseArray) => {
  $scope.loaded = false;
  $scope.newmessage = '';

  var ref = firebase.database().ref().child('messages');
  $scope.messages = $firebaseArray(ref);
  $scope.messages.$loaded().then(() => {
    $scope.loaded = true;
  });

  $scope.submit = () => {
    $scope.messages.$add($scope.newmessage).then(() => {
      $scope.newmessage = '';
    });
  };
};

HomeController.$inject = ['$scope', '$firebaseArray'];

angular.module('application').controller('HomeController', HomeController);
