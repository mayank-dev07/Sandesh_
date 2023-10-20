myApp.controller("recPhoneController", [
  "$scope",
  "$state",
  "sharedDataFactory",
  function ($scope, $state, sharedDataFactory) {
    $scope.recPhoneSkipped = () => {
      $scope.step = "Privacy";
    };
    $scope.submitForm = function () {
      let data = {
        phoneno: $scope.phoneno,
      };
      console.log(data);
      sharedDataFactory.setData(data);
      $state.go("registration.submit");
    };
  },
]);
