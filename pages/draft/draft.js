myApp.controller("draftMailController",
  function ($http, $scope,sharedDataService,$state) {
    function draftMail($http, $scope) {
      $http
        .get(apiUrl + "/mail/draftemails/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.drafts = response.data;
          if($scope.drafts.length == 0){
            Swal.fire({
              icon: 'error',
              title: 'No mails to show',
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    draftMail($http, $scope);

    $scope.select = function (id,self) {
      console.log(id);
      var data = {
        id: id,
        self: self
      };
      $http
        .put(apiUrl + "/mail/starreds/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.click = function (id,self) {
      console.log(id);
      var data = {
        id: id,
        self: self
      };
      $http
        .put(apiUrl + "/mail/selects/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.delete = function (id,self) {
      console.log(id);
      var data = {
        id: id,
        self: self
      };
        $http.put(apiUrl + "/mail/deletemail/",data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
          draftMail($http,$scope);
        })
        .catch(function(error){
          console.log(error)
        })
      }
      $scope.Archive = function (id,self) {
        console.log(id);
        var data = {
          id: id,
          self: self
        };
        $http.put(apiUrl + '/mail/archivemail/',data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
          draftMail($http,$scope);
        })
        .catch(function(error){
          console.log(error)
        })
      }
  
      $scope.read = function (id,self) {
        console.log(id);
        var data = {
          id: id,
          self: self
        };
        $http.put(apiUrl + "/mail/readmail/",data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
          draftMail($http,$scope);
        })
        .catch(function(error){
          console.log(error)
        })
      }
  
      $scope.unread = function (id,self) {
        console.log(id);
        var data = {
          id: id,
          self: self
        };
        $http.put(apiUrl + "/mail/unreadmail/",data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
          draftMail($http,$scope);
        })
        .catch(function(error){
          console.log(error)
        })
      }
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
                draftMail($http,$scope);
              })
              .catch(function (error) {
                console.log(error);
              });
      };
  },
);
