myApp.controller(
  "sentMailController",
  function ($http, $scope, sharedDataService, $state, $rootScope) {
    $scope.loader = true;
    function sentMail($http, $scope) {
      $http
        .get(apiUrl + "/mail/sentemails/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.sents = response.data;
          $scope.loader = false;
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

    $rootScope.$on("mailSent", function () {
      sentMail($http, $scope);
    });

    sentMail($http, $scope);

    $scope.select = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/starreds/", data, {
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

    $scope.click = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/selects/", data, {
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
    $scope.delete = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/deletemail/", data, {
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

    $scope.Archive = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/archivemail/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          if(response.status == 200){
            new Noty({
              theme: 'relax',
              type: 'info',
              layout: 'topRight',
              timeout: 2000,
              text: response.data.message
            }).show();
          }
          sentMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.read = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/readmail/", data, {
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

    $scope.unread = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/unreadmail/", data, {
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
    $scope.show = function (id,self) {
      sharedDataService.setId(id);
      $state.go("dashboard.Email");
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
          sentMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }
);
