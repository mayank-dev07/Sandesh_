myApp.controller("starredMailController", function ($http, $scope, $rootScope,sharedDataService,$state) {
  function starredMail($http, $scope) {
    $scope.starred = []
    $http
      .get(apiUrl + "/mail/starredemails/", {
        withCredentials: true,
      })
      .then(function (response) {
        $scope.starred = response.data
        console.log($scope.starred);
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
  }

  starredMail($http, $scope);

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
        starredMail($http, $scope);
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
        starredMail($http, $scope);
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
        starredMail($http, $scope);
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
        starredMail($http, $scope);
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
        starredMail($http, $scope);
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
            starredMail($http, $scope);
          })
          .catch(function (error) {
            console.log(error);
          });
  };
});
