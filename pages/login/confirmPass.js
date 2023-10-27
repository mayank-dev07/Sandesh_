myApp.controller("confirmPassController", [
  "$scope",
  "$location",
  "sharedDataReset",
  "$http",
  "$state",
  function ($scope, $location, sharedDataReset, $http, $state) {
    $scope.showPass = () => {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    };
    $scope.submitForm = function () {
      let data = {
        password: $scope.password,
        confirmpassword: $scope.confirmpassword,
      };
      if($scope.password == $scope.confirmpassword){
      sharedDataReset.setData(data)
      let show = sharedDataReset.getData()
      console.log(show)
      $http
        .put(apiUrl + "/users/changepassword/", show)
        .then((response) => {
          console.log(response);
          $state.go('login')
        })
        .catch((error) => {
          console.log(error);
        });
      }
      else{
        console.log("error")
      }
    };
  },
]);
