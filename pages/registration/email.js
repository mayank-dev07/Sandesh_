myApp.controller("emailController", [
  "$scope",
  "$state",
  "sharedDataFactory",
  function ($scope, $state, sharedDataFactory) {
    function validmail(mail) {
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (regex.test(mail)) {
        var data = {
          email: $scope.email,
        };
        console.log(data);
        sharedDataFactory.setData(data);
        $state.go("registration.password");
      } else {
        Swal.fire({
          icon: "error",
          title: "enter valid email",
        });
      }
    }

    $scope.submitForm = function () {
      validmail($scope.email);
    };
  },
]);
