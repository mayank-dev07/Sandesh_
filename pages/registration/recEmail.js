myApp.controller("recEmailController", [
  "$scope",
  "$state",
  "sharedDataFactory",
  function ($scope, $state, sharedDataFactory) {
    let check = sharedDataFactory.getData()
    console.log(check.email)
    $scope.recEmailSkipped = function () {

      $state.go('registration.recPhone')
    };
    $scope.submitForm = function () {
      let data = {
        recemail: $scope.recemail,
      };
      console.log(data);
      if(check.email == data.recemail){
        Swal.fire({
          icon: 'error',
          text: "Recovery email cant be same as the registerd email",
        })
      }
      else{
        sharedDataFactory.setData(data);
        $state.go("registration.recPhone");
      }
    };
  },
]);
