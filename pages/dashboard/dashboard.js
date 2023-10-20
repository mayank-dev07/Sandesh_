myApp.controller("dashboardController", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    $http
      .get(apiUrl + "/users/authentication/", {
        withCredentials: true,
      })
      .then(function (response) {})
      .catch(function (error) {
        if ((error.status = 401)) {
          $location.path("/login");
        }
      });

    $scope.add = function () {
      $location.path("/login");
    };

    $scope.Focus = function () {
      $scope.bgColor = "white";
      $scope.border = "border";
    };
    $scope.Blur = function () {
      $scope.bgColor = "search-form";
      $scope.border = "";
    };
    $scope.hover = function (panel) {
      panel.isHover = true;
    };
    $scope.hoverIn = function () {
      $scope.shadow = "compose";
    };
    $scope.hoverOut = function () {
      $scope.shadow = "normal";
    };
    $scope.leave = function (panel) {
      panel.isHover = false;
    };
    $scope.click = function (panel) {
      angular.forEach($scope.leftPanel, function (all) {
        all.isClicked = false;
      });
      panel.isClicked = true;
      panel.isHover = false;
    };

    // let selectAll = false; 

    // $scope.selectAll = function (){
    //   angular.forEach($scope.Mails,function(all){
    //     console.log(all.select)
    //     all.select = true;
    //     selectAll = false; 
    //   })
    // }

    // $scope.unSelectAll = function (){
    //   angular.forEach($scope.Mails,function(all){
    //     console.log(all.select)
    //     all.select = false;
    //     selectAll = true; 
    //   })
    // }

    $scope.leftPanel = [];
    $scope.Profile = [];

    $http
      .get(apiUrl + "/left_panel/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.leftPanel = response.data;
        let arr = $scope.leftPanel;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].icons == "fa-solid fa-inbox") {
            $scope.click(arr[i]);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.sendMail = function () {
      var email = $scope.email;
      var subject = $scope.subject;
      var body = $scope.text;

      var formData = new FormData();
      console.log(files);
      for(let i=0;i<files.length;i++){
        formData.append("file", files[i]);
      }
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("body", body);

      console.log(formData);

      $http
        .post(apiUrl + "/mail/mail/", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          Swal.fire(response.data.message, "success");
          $scope.email = "";
          $scope.subject = "";
          $scope.text = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    let file = "";
    let files = [];
    $scope.multiple = [];
    $scope.submitFile = function () {
      file = $scope.myFile;
      files.push(file);
      console.log(files);
      $scope.myFile = "";
      $scope.multiple.push({
        file: file,
      });
      console.log($scope.multiple);
    };
    // $scope.add = function(){
    //   console.log(file)
    //   if (
    //     file != ""
    //   ) {
    // }
    // }

    $http
      .get(apiUrl + "/users/userdetails/", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        $scope.Profile = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.draftMail = function () {
      var email = $scope.email;
      var subject = $scope.subject;
      var body = $scope.text;

      // if (email) {
      //   console.log(email);
      var formData = new FormData();
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("body", body);

      console.log(formData);

      $http
        .post(apiUrl + "/mail/draft/", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      $scope.email = "";
      $scope.subject = "";
      $scope.text = "";
      // }
    };

    $scope.deleteMail = () => {
      $scope.email = "";
      $scope.subject = "";
      $scope.text = "";
    };

    showMails($scope, $http);

    $rootScope.$on("changed", function () {
      showMails($scope, $http);
    });

    function showMails($scope, $http) {
      $http
        .get(apiUrl + "/mail/show/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.Mails = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    $scope.starred = function (id) {
      console.log(id);
      var data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/starred/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          showMails($scope, $http);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.select = function (id) {
      var data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/select/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          showMails($scope, $http);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.showDiv = true;

    $scope.toggleDiv = function () {
      $scope.showDiv = !$scope.showDiv;
    };

    $scope.Archive = function(id){
      console.log(id);
      let data = {
        id:id
      }
      $http.put(apiUrl + '/mail/archive/',data,{
        withCredentials:true
      })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
    }

    $scope.delete = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/delete/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          showMails($scope, $http);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.read = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/read/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          showMails($scope, $http);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.unread = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/unread/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          showMails($scope, $http);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.logout = function () {
      $http
        .get(apiUrl + "/users/signout/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          $location.path("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.show = function (id) {
      $http
        .get(apiUrl + "/mail/details/", {
          params: { id: id },
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.emailDetails = response.data;
          console.log(id);
          let data = {
            id: id,
          };
          $http
            .put(apiUrl + "/mail/read/", data, {
              withCredentials: true,
            })
            .then(function (response) {
              console.log(response);
              showMails($scope, $http);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  },
]);
myApp.directive("fileModel", [
  "$parse",
  function ($parse) {
    return {
      restrict: "A",
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind("change", function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      },
    };
  },
]);
