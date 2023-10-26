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

    function getuser() {
      $scope.getUser = function (id) {
        $scope.people = [];
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
                  console.log($scope.people)
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

    function validateEmailList(raw) {
      var emails = raw.split(",");
      var valid = true;
      var regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      for (var i = 0; i < emails.length; i++) {
        if (emails[i] === "" || !regex.test(emails[i].replace(/\s/g, ""))) {
          valid = false;
        }
      }
      return valid;
    }

    $scope.addNewUsers = function(){
      validateEmailList($scope.mail)

      if($scope.mail){
        console.log($scope.mail)
        let multiple = [];
        email = $scope.mail;
        if (validateEmailList($scope.mail)) {
          let arr = [];
          arr = email.split(",");
          console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          let data = {
            email: arr[i],
          };
          multiple.push(data);
        }
        console.log(multiple);
        }

    }

  }
});
