myApp.controller("sentMailController",
  function ($http, $scope,sharedDataService,$state) {
    function sentMail($http, $scope) {
      $http
        .get(apiUrl + "/mail/sent/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.sents = response.data;
          if ($scope.sents.length == 0) {
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

    sentMail($http, $scope);

    $scope.select = function (id) {
      console.log(id);
      var data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/starred/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          sentMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.click = function (id) {
      var data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/select/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          sentMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.delete = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/delete/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          sentMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.Archive = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/archive/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          sentMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.read = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/read/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          sentMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.unread = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/unread/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          sentMail($http, $scope);
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
            .put(apiUrl + "/mail/read/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response);
              sentMail($http, $scope);
            })
            .catch(function (error) {
              console.log(error);
            });
        
    };
  },
);
