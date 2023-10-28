myApp.controller(
  "dashboardController",
  function ($scope, $http, $location, $rootScope, sharedDataService, $state) {
    $scope.leftPanel = [];
    $scope.Profile = [];
    $scope.file = "";
    $scope.files = [];
    $scope.multiple = [];
    $scope.loader = true;
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
    $scope.sendLabel = function (id, index) {
      console.log(id);
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

    function validateEmailList(raw) {
      var emails = raw.split(",");
      var valid = true;
      var regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      for (var i = 0; i < emails.length; i++) {
        if (emails[i] === "" || !regex.test(emails[i].replace(/\s/g, ""))) {
          valid = false;
        }
      }
      return valid;
    }

    $scope.sendMail = function () {
      console.log(validateEmailList($scope.email));
      console.log($scope.email);
      let multiple = [];
      email = $scope.email;
      if (validateEmailList($scope.email)) {
        let arr = [];
        arr = email.split(",");
        console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        let data = {
          email: arr[i],
        };
        multiple.push(data);
      }
      console.log(multiple);
      
      var subject = $scope.subject;
      var body = $scope.text;
      
      var formData = new FormData();
      console.log($scope.files);
      for (let i = 0; i < $scope.files.length; i++) {
        formData.append("file", $scope.files[i]);
      }
      formData.append("emails", JSON.stringify(multiple));
      formData.append("subject", subject);
      formData.append("body", body);
      
      console.log(formData);
      
      $http
      .post(apiUrl + "/mail/mails/", formData, {
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
          $scope.files = [];
          $scope.multiple = [];
          console.log($scope.files);
          $rootScope.$broadcast("mailSent");
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
          Swal.fire({
          icon: "error",
          title: "Enter valid email",
        });
      }
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Add a file!",
        });
      }
      angular.element(document.getElementById('formFile')).val(null);
    };
    
    $scope.draftMail = function () {
      console.log($scope.email);
      let multiple = [];
      let email = $scope.email;
      var subject = $scope.subject;
      var body = $scope.text;

      if (email == undefined && subject == undefined && body == undefined) {
        console.log("no draft");
      }
      if (email == "" || subject == "" || body == "") {
        console.log("no drafts");
      }
      if (!email) {
        console.log("enter valid email");
      } else {
        let arr = [];
        arr = email.split(",");
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          let data = {
            email: arr[i],
          };
          multiple.push(data);
        }
        console.log(multiple);
        var formData = new FormData();
        console.log($scope.files);
        for (let i = 0; i < $scope.files.length; i++) {
          formData.append("file", $scope.files[i]);
        }
        formData.append("emails", JSON.stringify(multiple));
        formData.append("subject", subject);
        formData.append("body", body);

        console.log(formData);

        $http
          .post(apiUrl + "/mail/draft/", formData, {
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
            $scope.files = [];
            $scope.multiple = [];
            console.log($scope.files);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };

    $scope.deleteMail = () => {
      $scope.email = "";
      $scope.subject = "";
      $scope.text = "";
      $scope.files = [];
    };

    showMails($scope, $http);

    $rootScope.$on("changed", function () {
      showMails($scope, $http);
    });

    function showMails($scope, $http) {
      $http
        .get(apiUrl + "/mail/inbox/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.Mails = response.data;
          $scope.loader = false;
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

    $scope.starred = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/starreds/", data, {
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

    $scope.select = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/selects/", data, {
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

    $scope.Archive = function (id, self) {
      console.log(id);
      let data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/archivemail/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          if(response.status == 200){
            new Noty({
              theme: 'relax',
              type: 'success',
              layout: 'topRight',
              timeout: 2000,
              text: response.data.message
            }).show();
          }
          showMails($scope, $http);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.delete = function (id, self) {
      console.log(id);
      let data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/deletemail/", data, {
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

    $scope.read = function (id, self) {
      console.log(id);
      let data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/readmail/", data, {
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

    $scope.unread = function (id, self) {
      console.log(id);
      let data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/unreadmail/", data, {
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
    $scope.show = function (id, self) {
      sharedDataService.setId(id);
      console.log(self);
      $state.go("dashboard.Email");
      let data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/readmail/", data, {
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
      if (data) {
        $scope.edit = data.value;
      } else {
        const data = $scope.childLabel.find((label) => label.id == id);
        console.log(data);
        $scope.edit = data.value;
      }
    };

    let data = {};

    $scope.getCurrentDate = function () {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = String(currentDate.getMonth() + 1).padStart(2, "0");
      var day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    $scope.modalParameters = function (id, self) {
      data = {
        id: id,
        self: self,
      };
      console.log(data);
    };

    let time;
    let t;

    function getTwentyFourHourTime(T) {
      var d = new Date("1/1/2023 " + T);
      return d.getHours() + ":" + d.getMinutes();
    }

    $scope.Snooze = function () {
      var Time = new Date($scope.time);
      (data.date = formatDate($scope.date)),
        (time = getTwentyFourHourTime(Time.toLocaleTimeString("it-IT"))),
        (t = time.split(":"));
      console.log(t);
      data.hour = t[0];
      data.min = t[1];
      console.log(data);
      $http
        .put(apiUrl + "/mail/snoozed/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          if(response.status == 200){
            new Noty({
              theme: 'relax',
              type: 'success',
              layout: 'topRight',
              timeout: 2000,
              text: response.data.message
            }).show();
          }
          showMails($scope, $http);
        })
        .catch(function (error) {
          console.log(error);
        });
      $scope.time = "";
      $scope.date = "";
    };

    function formatDate(dob) {
      var date = new Date(dob);
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }
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
