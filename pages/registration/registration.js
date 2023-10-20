myApp.controller("registrationController", [
  "$scope",
  "$http",
  "$state",
  "sharedDataFactory",
  function ($scope, $http, $state, sharedDataFactory) {
    $scope.user = {
      firstname: "",
      lastname: "",
      dob: "",
      gender: "",
      email: "",
      password: "",
      confirmpassword: "",
      recemail: "",
      phoneno: "",
    };

    $scope.submitForm = function () {
      $scope.data = sharedDataFactory.getData();
      var newData = {
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
      };
      console.log(newData);
      sharedDataFactory.setData(newData);
      $state.go("registration.dob");
    };
  },
]);
