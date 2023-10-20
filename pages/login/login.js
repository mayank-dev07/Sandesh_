myApp.controller("loginController", [
  "$http",
  "$scope",
  "$state",
  "$location",
  "sharedDataFactory",
  function ($http,$scope, $state,$location,sharedDataFactory) {
    $http
      .get(apiUrl + "/users/authentication/", {
        withCredentials: true,
      })
      .then(function (response) { 
        if ((response.status = 200)) {
          $location.path("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.user = {
      email: "",
      password: "",
    };

    $scope.submitForm = function () {
      let data = {
        email: $scope.user.email,
      };
      sharedDataFactory.setData(data);
      console.log(data);
      $state.go("login.pass");
    };
  },
]);
