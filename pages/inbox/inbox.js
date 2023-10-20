myApp.controller('inboxController', ["$scope", function ($scope) {
    $scope.Focus = function () {
        $scope.bgColor = "white";
        $scope.border = "border";
      };
      $scope.Blur = function () {
        $scope.bgColor = "search-form";
        $scope.border = "";
      };
}]);