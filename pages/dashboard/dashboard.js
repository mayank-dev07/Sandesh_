myApp.controller("dashboardController", 
  function ($scope, $http, $location, $rootScope,sharedDataService,$state) {
    $scope.leftPanel = [];
    $scope.Profile = [];
    $scope.file = "";
    $scope.files = [];
    $scope.multiple = [];

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

    showlabel();

    function showlabel() {
      $http
        .get(apiUrl + "/mail/parentlabel/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.parentLabel = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    $scope.sendLabel = function (id , index) {
      console.log(id)
      $http
        .get(apiUrl + "/mail/childlabel/", {
          withCredentials: true,
          params: { id: id },
        })
        .then(function (response) {
          console.log(response.data);
          $scope.childLabel = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.sendMail = function () {
      var email = $scope.email;
      var subject = $scope.subject;
      var body = $scope.text;

      var formData = new FormData();
      console.log($scope.files);
      for (let i = 0; i < $scope.files.length; i++) {
        formData.append("file", $scope.files[i]);
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
          $scope.file = "";
          $scope.files.pop();
          $scope.multiple = [];
          console.log($scope.files);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.submitFile = function () {
      $scope.file = $scope.myFile;
      if ($scope.file !== "") {
        $scope.files.push($scope.file);
        console.log($scope.files);
        $scope.multiple.push({
          file: $scope.file,
        });
        console.log($scope.multiple);
        $scope.myFile = "";
      }
    };

    $scope.draftMail = function () {
      var email = $scope.email;
      var subject = $scope.subject;
      var body = $scope.text;

      if (email || subject || body) {
      var formData = new FormData();
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("body", body);

      console.log(formData);

      $http
        .post(apiUrl + "/mail/draft/", formData, {
          // transformRequest: angular.identity,
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
      }
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
          if ($scope.Mails.length == 0) {
            // Swal.fire({
            //   icon: "error",
            //   title: "No mails to show",
            // });
          }
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

    $scope.Archive = function (id) {
      console.log(id);
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/archive/", data, {
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
      sharedDataService.setId(id)
      $state.go('dashboard.Email')
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
    $scope.addLabels = function () {
      let data = {
        name: $scope.label,
        id: $scope.nest,
      };
      if (!data.id) {
        data.id = "";
      }
      $http
        .post(apiUrl + "/mail/addlabel/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          showlabel();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.deleteLabel = function (id) {
      let data = {
        id: id,
      };
      $http
        .put(apiUrl + "/mail/deletelabel/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          showlabel();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.EditLabels = function (id) {
      console.log(id);
      const data = $scope.parentLabel.find((label) => label.id == id);
      console.log(data);
      if(data){
        $scope.edit = data.value
        // Swal.fire({
        //   title: data.value,
        //   html: '<input id="name" type="text" class="swal2-input" placeholder="edit name" >',
        //   focusConfirm: false,
        //   preConfirm: () => {
        //     const name = Swal.getPopup().querySelector("#name").value;
        //     return{name:name}
        //   },
        // })
        //   .then((result) => {
        //     if(result.isConfirmed){
        //       let name = result.value.name;
        //       let edit={
        //         name:name,
        //         id:id
        //       }
        //       console.log(edit)
        //       $http.put(apiUrl + '/mail/updatelabel/',edit,{
        //         withCredentials:true
        //       })
        //       .then(function(response){
        //         console.log(response)
        //         showlabel();
        //       })
        //       .catch(function(error){
        //         console.log(error)
        //       })
            // }
          // })
        }
        else{
          const data = $scope.childLabel.find((label) => label.id == id);
        console.log(data);
        $scope.edit = data.value
        // Swal.fire({
        //   title: data.value,
        //   html: '<input id="name" type="text" class="swal2-input" placeholder="edit name">',
        //   focusConfirm: false,
        //   preConfirm: () => {
        //     const name = Swal.getPopup().querySelector("#name").value;
        //     return{name:name}
        //   },
        // })
        //   .then((result) => {
        //     if(result.isConfirmed){
        //       let name = result.value.name;
        //       let edit={
        //         name:name,
        //         id:id
        //       }
        //       console.log(edit)
        //       $http.put(apiUrl + '/mail/updatelabel/',edit,{
        //         withCredentials:true
        //       })
        //       .then(function(response){
        //         console.log(response)
        //         showlabel();
        //       })
        //       .catch(function(error){
        //         console.log(error)
        //       })
        //     }
        //   })
        }
    }
  },
);
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
