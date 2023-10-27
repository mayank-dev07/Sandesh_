myApp.controller("groupsMailController", function ($http, $scope, $state) {
  $scope.selectedUsers = [];
  $http
    .get(apiUrl + "/admin/users/", {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response.data);
      $scope.users = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  $scope.selectedUsers = [];
  $scope.addUser = function (ID, email) {
    let user = {
      id: ID,
      email: email,
    };
    console.log($scope.selectedUsers.length);
    if ($scope.selectedUsers.length >= 0) {
      const arr = $scope.selectedUsers.find((element) => element.id == user.id);
      if (arr) {
        console.log("tyui");
      } else {
        $scope.selectedUsers.push(user);
      }
    }
    console.log($scope.selectedUsers);
  };

  $scope.remove = function (id) {
    console.log(id);
    console.log($scope.selectedUsers);
    $scope.selectedUsers = $scope.selectedUsers.filter(
      (element) => element.id !== id
    );
    console.log($scope.selectedUsers);
  };
  
  $scope.view = function () {
    $state.go('dashboard.view')
    console.log("uybi");
  };


  $scope.createGroup = function () {
    let data = {
      email: $scope.email,
      user: $scope.selectedUsers,
    };
    console.log(data);
    if (data.user.length != 0) {
      $http
        .post(apiUrl + "/admin/addbulkusers/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          $scope.selectedUsers = [];
          $scope.email = "";
        })
        .catch(function (error) {
          console.log(error); 
          Swal.fire({
            icon: 'error',
            text: error.data.message,
          })
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Add at least one user in the group",
      });
    }

  };
});
