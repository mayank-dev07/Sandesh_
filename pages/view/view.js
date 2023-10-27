myApp.controller(
  "viewMailController",
  function ($http, $scope, $state, $rootScope) {
    $scope.selectedUsers = [];
    $http
      .get(apiUrl + "/admin/groups/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.users = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    let ID = "";
    function getuser() {
      $scope.getUser = function (id) {
        $scope.people = [];
        ID = id;
        console.log(id);
        $http
          .get(apiUrl + "/admin/groupusers", {
            withCredentials: true,
            params: { id: id },
          })
          .then(function (response) {
            console.log(response.data);
            let arr = response.data;
            console.log(arr);
            for (let i = 0; i < arr.length; i++) {
              $scope.people = $scope.people.concat(arr[i]);
            }
            console.log($scope.people);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    }

    getuser();

    $scope.createGroup = function () {
      $state.go("dashboard.groups");
    };

    $scope.remove = function (userid, groupid) {
      console.log(userid);
      console.log(groupid);
      let data = {
        userid: userid,
        groupid: groupid,
      };
      $http
        .put(apiUrl + "/admin/removeuser/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          $http
            .get(apiUrl + "/admin/groupusers", {
              withCredentials: true,
              params: { id: groupid },
            })
            .then(function (response) {
              $scope.people = [];
              console.log(response.data);
              let arr = response.data;
              console.log(arr);
              for (let i = 0; i < arr.length; i++) {
                console.log($scope.people);
                $scope.people = $scope.people.concat(arr[i]);
              }
              console.log($scope.people);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.addNewUsers = function () {
      let mail = $scope.mail;
      let data = {
        email : $scope.mail,
        group : ID,
      };
      if (mail) {
        console.log(data);
        $http.post(apiUrl + '/admin/addusers/',data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response)
        })
        .catch(function(error){
          console.log(error)
          Swal.fire({
            icon: 'error',
            text: error.data.message,
          })
        })
      }
      $scope.mail = "";
    };

    $scope.removeGroup = function(id){
      let data = {
        id : id
      }
      $http.put(apiUrl + '/admin/groupremove/',data,{
        withCredentials:true
      })
      .then(function(response){
        console.log(response)
        $http
        .get(apiUrl + "/admin/groups/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.users = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .cath(function(error){
        console.log(error)
      })
    }
  }
);
