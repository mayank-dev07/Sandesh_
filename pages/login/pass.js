myApp.controller("passController", [
  "$scope",
  "$location",
  "sharedDataFactory",
  "$http",
  function ($scope, $location, $sharedDataFactory, $http) {

    $http.get(apiUrl + '/users/authentication/',{
      withCredentials:true
  })
  .then(function(response){
      console.log(response.status)
      if(response.status = 200){
          $location.path('/dashboard')
      }
  })
  .catch(function(error){
      console.log(error.status)
  })

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
        password: $scope.user.password,
      };

      $sharedDataFactory.setData(data);
      $scope.showData = $sharedDataFactory.getData();
      console.log($scope.showData);

      let loginData = $scope.showData;

      $http
        .post(apiUrl + "/users/signin/", loginData, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          $location.path("/dashboard");
        })
        .catch(function (error) {
          console.log(error.data.message);
          Swal.fire({
            icon: 'error',
            title: error.data.message,
          })
        });
    };
  },
]);
