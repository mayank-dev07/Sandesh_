myApp.controller("draftMailController", [
  "$http",
  "$scope",
  function ($http, $scope) {
    function draftMail($http, $scope) {
      $http
        .get(apiUrl + "/mail/draftemail/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.drafts = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    draftMail($http, $scope);

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
          draftMail($http, $scope);
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
          draftMail($http, $scope);
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
          draftMail($http,$scope);
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
          draftMail($http,$scope);
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
          draftMail($http,$scope);
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
                draftMail($http,$scope);
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
