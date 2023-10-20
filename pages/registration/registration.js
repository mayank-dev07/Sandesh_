myApp.controller("registrationController", [
  "$scope",
  "$http",
  "$state",
  "sharedDataFactory",
  function ($scope, $http, $state, sharedDataFactory) {
    $http.get(apiUrl + '/dropdown/dropdown/',{
      params:{value:"Title"}
    })
    .then(function(response){
      console.log(response.data)
      $scope.titles = response.data
    })
    .catch(function(error){
      console.log(error)
    })
    $scope.user = {
      title:undefined,
      firstname: "",
      lastname: "",
      dob: "",
      gender: "",
      email: "",
      password: "",
      confirmpassword: "",
      recemail: "",
      phoneno: "",
    };

    $scope.submitForm = function () {
      $scope.data = sharedDataFactory.getData();
      var newData = {
        title: $scope.user.title,
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
      };
      console.log(newData);
      sharedDataFactory.setData(newData);
      $state.go("registration.dob");
    };
  },
]);
