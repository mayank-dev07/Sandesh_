myApp.controller(
  "EmailMailController",
  function ($scope, $http, sharedDataService) {
    let id = sharedDataService.getId();
    console.log(id);
    $http
      .get(apiUrl + "/mail/details/", {
        params: { id: id },
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.emailDetails = response.data;
        console.log(id);
      })
      .catch(function (error) {
        console.log(error);
      });
      $scope.back = function(){
        $state.go()
      }
  }
);
