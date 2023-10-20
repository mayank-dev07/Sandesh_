myApp.controller("recPhoneController", [
  "$scope",
  "$state",
  "sharedDataFactory",
  function ($scope, $state, sharedDataFactory) {
    $scope.recPhoneSkipped = () => {
      $state.go("registration.submit");
    };
    $scope.submitForm = function () {
      let data = {
        phoneno: $scope.phoneno,
      }
      console.log(data)
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      // sharedDataFactory.setData(data);
      // $state.go("registration.submit");
    };
  },
]);
