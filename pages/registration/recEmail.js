myApp.controller("recEmailController", [
  "$scope",
  "$state",
  "sharedDataFactory",
  function ($scope, $state, sharedDataFactory) {
    $scope.recEmailSkipped = function () {
      $scope.step = "Phone";
    };
    $scope.submitForm = function () {
      let data = {
        recemail: $scope.recemail,
      };
      console.log(data);
      sharedDataFactory.setData(data);
      $state.go("registration.recPhone");
    };
  },
]);
