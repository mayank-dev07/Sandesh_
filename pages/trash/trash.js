myApp.controller("trashMailController", function ($http, $scope, $rootScope,sharedDataService,$state) {
    // function starredMail {
      $scope.loader = true;
      $scope.starred = []
      $http
        .get(apiUrl + "/mail/trash/", {
          withCredentials: true,
        })
        .then(function (response) {
          $scope.starred = response.data
          console.log($scope.starred);
          $scope.loader = false;
          if ($scope.starred.length == 0) {
            Swal.fire({
              icon: "error",
              title: "No mails to show",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    // }
  
    // starredMail($http, $scope);
      
    // $scope.delete = function (id,self) {
    //   var data = {
    //     id: id,
    //     self:self
    //   };
    //   $http
    //     .put(apiUrl + "/mail/deletemail/", data, {
    //       withCredentials: true,
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //       starredMail($http, $scope);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };
    $scope.show = function (id,self) {
      sharedDataService.setId(id)
      $state.go('dashboard.Email')
          let data = {
            id: id,
            self:self
          };
          $http
            .put(apiUrl + "/mail/readmail/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response);
              starredMail($http, $scope);
            })
            .catch(function (error) {
              console.log(error);
            });
    };
  });
  