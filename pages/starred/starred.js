myApp.controller("starredMailController", [
  "$http",
  "$scope",
  "$rootScope",
  function ($http, $scope, $rootScope) {
    function starredMail($http, $scope) {
      $http
        .get(apiUrl + "/mail/starredemail/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.starred = response.data[0]
            .concat(response.data[1])
            .concat(response.data[2]);
            if($scope.starred.length == 0){
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

    starredMail($http, $scope);

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
          starredMail($http, $scope);
          $rootScope.$broadcast("changed");
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
          starredMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.delete = function(id){
        console.log(id)
        let data={
          id :id
        }
        $http.put(apiUrl + "/mail/delete/",data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
          starredMail($http,$scope);
        })
        .catch(function(error){
          console.log(error)
        })
      }
      $scope.Archive = function(id){
        console.log(id);
        let data = {
          id:id
        }
        $http.put(apiUrl + '/mail/archive/',data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
        })
        .catch(function(error){
          console.log(error)
        })
      }
  
      $scope.read = function(id){
        console.log(id)
        let data={
          id :id
        }
        $http.put(apiUrl + "/mail/read/",data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
          starredMail($http,$scope);
        })
        .catch(function(error){
          console.log(error)
        })
      }
  
      $scope.unread = function(id){
        console.log(id)
        let data={
          id :id
        }
        $http.put(apiUrl + "/mail/unread/",data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
          starredMail($http,$scope);
        })
        .catch(function(error){
          console.log(error)
        })
      }
      $scope.show = function (id) {
        $http
          .get(apiUrl + "/mail/details/", {
            params: { id: id },
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data);
            $scope.emailDetails = response.data;
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
                starredMail($http,$scope);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      };
  },
]);
