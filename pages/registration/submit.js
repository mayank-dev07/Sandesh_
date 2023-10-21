myApp.controller("submitController", [
  "$scope",
  "sharedDataFactory",
  "$http",
  "$location",
  function ($scope, sharedDataFactory, $http, $location) {
    $scope.submitForm = function () {
      $scope.sharedData = sharedDataFactory.getData();
      console.log($scope.sharedData);
      let data = $scope.sharedData;

      $http
        .post(apiUrl + "/users/signup/", data)
        .then(function (response) {
          console.log(response);
          $location.path("/login");
           Swal.fire(
          'Registration completed',
          )
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  },
]);
