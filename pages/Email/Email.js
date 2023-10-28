myApp.controller(
  "EmailMailController",
  function ($scope, $http, sharedDataService, $window, $document) {
    $scope.image = [];
    $scope.documents = [];
    $scope.WordDocs = [];
    $scope.excelSheets = [];
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
          $scope.body = response.data[0].sender.body.replace(/\n/g, '<br/>');
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
              $scope.image.push($scope.files[(j-1)/2]);
            }
            if (arr[j] === "pdf"){
              $scope.documents.push($scope.files[(j-1)/2])
            }
            if(arr[j] === "doc" || arr[j] === "docx" ){
              $scope.WordDocs.push($scope.files[(j-1)/2])
            }
            if( arr[j] === "xml"){
              $scope.excelSheets.push($scope.files[(j-1)/2])
            }
          }
          console.log($scope.WordDocs)
          console.log($scope.excelSheets)
          console.log($scope.documents)
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

    $scope.download = function(file){
      const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://10.21.83.250:8000/mail/media/' + file);
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
    link.remove();
    }
  }
);
