myApp.controller("passwordController", [
  "$scope",
  "$state",
  "sharedDataFactory",
  function ($scope, $state, sharedDataFactory) {
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
      if ($scope.password == $scope.confirmpassword) {
        console.log(data);
        sharedDataFactory.setData(data);
        $state.go("registration.recEmail");
      } else {
        Swal.fire({
          icon: "error",
          title: "Enter valid password!",
          text: "Password Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
        });
      }
    };
  },
]);
