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
        $scope.body = response.data[0].body;
        $scope.body = $scope.body.replace(/(?:\r\n|\r|\n)/g, "<br>");
        $scope.subject = response.data[0].subject;
        $scope.sendername = response.data[0].sendername;
        $scope.time = response.data[0].time;
        $scope.file = response.data[0].file;
        $scope.image = response.data[0].image;
      })
      .catch(function (error) {
        console.log(error);
      });
    $scope.back = function () {
      $state.go();
    };
  }
);
