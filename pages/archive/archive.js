myApp.controller("archiveMailController",
    function ($http, $scope,sharedDataService,$state) {
      function archiveMail($http, $scope) {
        $http
          .get(apiUrl + "/mail/archiveemail/", {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data);
            $scope.archives = response.data;
            if($scope.archives.length == 0){
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
  
      archiveMail($http, $scope);
  
      $scope.select = function (id) {
        console.log(id);
        var data = {
          id: id,
        };
        $http
          .put(apiUrl + "/mail/starreds/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data);
            archiveMail($http, $scope);
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
          .put(apiUrl + "/mail/selects/", data, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data);
            archiveMail($http, $scope);
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
          $http.put(apiUrl + "/mail/deletemail/",data,{
            withCredentials:true
          })
          .then(function(response){
            console.log(response)
            archiveMail($http,$scope);
          })
          .catch(function(error){
            console.log(error)
          })
        }

        $scope.unArchive = function(id){
            let data = {
                id : id
            }
            $http.put(apiUrl + '/mail/unarchivemail/',data,{
                withCredentials:true
            })
            .then(function(response){
                console.log(response)
                archiveMail($http,$scope);
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
          $http.put(apiUrl + "/mail/readmail/",data,{
            withCredentials:true
          })
          .then(function(response){
            console.log(response)
            archiveMail($http,$scope);
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
          $http.put(apiUrl + "/mail/unreadmail/",data,{
            withCredentials:true
          })
          .then(function(response){
            console.log(response)
            archiveMail($http,$scope);
          })
          .catch(function(error){
            console.log(error)
          })
        }
        $scope.show = function (id) {
          sharedDataService.setId(id)
          $state.go('dashboard.Email')
              console.log(id);
              let data = {
                id: id,
              };
              $http
                .put(apiUrl + "/mail/readmail/", data, {
                  withCredentials: true,
                })
                .then(function (response) {
                  console.log(response);
                  archiveMail($http,$scope);
                })
                .catch(function (error) {
                  console.log(error);
            });
        };
    },
);

  
  