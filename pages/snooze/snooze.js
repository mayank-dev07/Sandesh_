myApp.controller("snoozeMailController", function ($scope, $http,$rootScope) {
    function snoozeMail($http, $scope) {
        $scope.snoozes = []
        $http
          .get(apiUrl + "/mail/snoozemessage/", {
            withCredentials: true,
          })
          .then(function (response) {
            $scope.snoozes = response.data
            console.log($scope.snoozes);
            if ($scope.snoozes.length == 0) {
              Swal.fire({
                icon: "error",
                title: "No mails to show",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
      snoozeMail($http, $scope);
    
      $scope.select = function (id,self) {
        var data = {
          id: id,
          self:self
        };
        $http
          .put(apiUrl + "/mail/starreds/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data);
            snoozeMail($http, $scope);
            $rootScope.$broadcast("changed");
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
      $scope.click = function (id,self) {
        var data = {
          id: id,
          self:self
        };
        $http
          .put(apiUrl + "/mail/selects/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data);
            snoozeMail($http, $scope);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      $scope.delete = function (id,self) {
        var data = {
          id: id,
          self:self
        };
        $http
          .put(apiUrl + "/mail/deletemail/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response);
            snoozeMail($http, $scope);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      $scope.Archive =function (id,self) {
        var data = {
          id: id,
          self:self
        };
        $http
          .put(apiUrl + "/mail/archivemail/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response);
            snoozeMail($http, $scope);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
      $scope.read = function (id,self) {
        var data = {
          id: id,
          self:self
        };
        $http
          .put(apiUrl + "/mail/readmail/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response);
            snoozeMail($http, $scope);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
      $scope.unread = function (id,self) {
        var data = {
          id: id,
          self:self
        };
        $http
          .put(apiUrl + "/mail/unreadmail/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response);
            snoozeMail($http, $scope);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      $scope.show = function (id) {
        sharedDataService.setId(id)
        $state.go('dashboard.Email')
            let data = {
              id: id,
            };
            $http
              .put(apiUrl + "/mail/readmail/", data, {
                withCredentials: true,
              })
              .then(function (response) {
                console.log(response);
                snoozeMail($http, $scope);
              })
              .catch(function (error) {
                console.log(error);
              });
      };
});
