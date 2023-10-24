myApp.controller(
  "EmailMailController",
  function ($scope, $http, sharedDataService, $window, $document) {
    let id = sharedDataService.getId();
    console.log(id);
    $http
      .get(apiUrl + "/mail/emaildetails/", {
        params: { id: id },
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data[0].sender);
        $scope.body = response.data[0].sender.body;
        $scope.body = $scope.body.replace(/(\r\n|\r|\n)/g, "<br>");
        $scope.subject = response.data[0].sender.subject;
        $scope.sendername = response.data[0].sender.sendername;
        var date = new Date(response.data[0].sender.time);
        $scope.time = date.toString();
        $scope.file = response.data[0].file;
        $scope.image = response.data[0].image;


      })
      .catch(function (error) {
        console.log(error);
      });


      window.addEventListener("keydown", disable);
       function disable(event) { 
        if (event.keyCode == 116){
          event.preventDefault(); 
        } 
        if (event.keyCode == 116 && event.ctrlKey){
          console.log("ctrl+f5")
          event.preventDefault(); 
        } 
        if(event.keyCode == 82 && event.ctrlKey){
          console.log("ctrl+r")
          event.preventDefault()
        }
        if(event.keyCode == 82 && event.ctrlKey && event.shiftKey){
          console.log("ctrl+shift+r")
          event.preventDefault()
        }

     };
});
