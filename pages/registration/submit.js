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
          if(response.status == 201){
            new Noty({
              theme: 'relax',
              type: 'success',
              layout: 'topRight',
              timeout: 2000,
              text: "Registered successfully"
            }).show();
          }
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
          new Noty({
            theme: 'relax',
            type: 'success',
            layout: 'topRight',
            timeout: 2000,
            text: error.data.message
          }).show();
        });
    };
  },
]);
