myApp.controller("emailController", [
  "$scope",
  "$state",
  "sharedDataFactory",
  function ($scope, $state, sharedDataFactory) {
    $scope.submitForm = function () {
      var data = {
        email: $scope.email,
      };
      console.log(data);
      sharedDataFactory.setData(data);
      $state.go("registration.password");
    };
  },
]);
