myApp.controller("dobController", [
  "$scope",
  "sharedDataFactory",
  "$state",
  function ($scope, sharedDataFactory, $state) {
    $scope.submitForm = function () {
      var date = formatDate($scope.dob);
      var data = {
        dob: date,
        gender: $scope.gender,
      };
      console.log(data);
      sharedDataFactory.setData(data);
      $state.go("registration.email");
    };

    $scope.getMaxDate = function () {
      var MaxDate = new Date();
      MaxDate.setFullYear(MaxDate.getFullYear() - 12);
      var year = MaxDate.getFullYear();
      var month = String(MaxDate.getMonth() + 1).padStart(2, "0");
      var day = String(MaxDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    function formatDate(dob) {
      var date = new Date(dob);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  },
]);
