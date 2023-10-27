myApp.controller(
  "EmailMailController",
  function ($scope, $http, sharedDataService, $window, $document) {
    $scope.image = [];
    let id = sharedDataService.getId();
    console.log(id);
    $http
      .get(apiUrl + "/mail/emaildetails/", {
        params: { id: id },
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data == null) {
          console.log("didn't get any response");
        } else {
          console.log(response.data[0].files);
          $scope.files = response.data[0].files;
          $scope.body = response.data[0].sender.body;
          $scope.subject = response.data[0].sender.subject;
          $scope.sendername = response.data[0].sender.sendername;
          var date = new Date(response.data[0].sender.time);
          $scope.time = date.toString().split("GMT")[0];
          console.log($scope.time);
          console.log($scope.files);
          let arr = [];
          for (let i = 0; i < $scope.files.length; i++) {
            arr = arr.concat($scope.files[i].split("."));
          }
          console.log(arr);
          console.log(arr.length);
          for (let j = 0; j < arr.length; j++) {
            if (arr[j] === "jpg" || arr[j] === "jpeg") {
              $scope.image.push($scope.files[j / 2]);
              // $scope.files.pop($scope.files[j-1])
            }
          }
          console.log($scope.image);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    window.addEventListener("keydown", disable);
    function disable(event) {
      if (event.keyCode == 116) {
        event.preventDefault();
      }
      if (event.keyCode == 116 && event.ctrlKey) {
        console.log("ctrl+f5");
        event.preventDefault();
      }
      if (event.keyCode == 82 && event.ctrlKey) {
        console.log("ctrl+r");
        event.preventDefault();
      }
      if (event.keyCode == 82 && event.ctrlKey && event.shiftKey) {
        console.log("ctrl+shift+r");
        event.preventDefault();
      }
    }
    $scope.back = function () {
      $window.history.back();
    };
  }
);
