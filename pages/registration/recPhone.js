myApp.controller("recPhoneController", 
  function ($scope, $state, sharedDataFactory) {
    $scope.recPhoneSkipped = () => {
      $state.go("registration.submit");
    };
    $scope.submitForm = function () {
      let data = {
        phoneno: $scope.phoneno,
      }
      console.log(data)
      sharedDataFactory.setData(data);
      $state.go("registration.submit");
    };
  },
);
