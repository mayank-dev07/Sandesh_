myApp.controller(
  "draftMailController",
  function ($http, $scope, sharedDataService, $state) {
    $scope.loader = true;
    function draftMail($http, $scope) {
      $http
        .get(apiUrl + "/mail/draftemails/", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          $scope.drafts = response.data;
          $scope.loader = false;
          if ($scope.drafts.length == 0) {
            Swal.fire({
              icon: "error",
              title: "No mails to show",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    draftMail($http, $scope);

    $scope.select = function (id, self) {
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
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.click = function (id, self) {
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
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.delete = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/deletemail/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.Archive = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/archivemail/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            new Noty({
              theme: "relax",
              type: "info",
              layout: "topRight",
              timeout: 2000,
              text: response.data.message,
            }).show();
          }
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.read = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/readmail/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.unread = function (id, self) {
      console.log(id);
      var data = {
        id: id,
        self: self,
      };
      $http
        .put(apiUrl + "/mail/unreadmail/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          draftMail($http, $scope);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.DraftFile = [];

    $scope.show = function (id, self) {
      sharedDataService.setId(id);
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
          draftMail($http, $scope);
          $http
            .get(apiUrl + "/mail/draftdetails/", {
              withCredentials: true,
              params: { id: id },
            })
            .then(function (response) {
              console.log(response.data);
              $scope.receive = response.data[0].reciever;
              $scope.send = response.data[0].sender;
              $scope.draftFile = response.data[0].files;
              console.log($scope.receive);
              console.log($scope.send);
              console.log($scope.draftFile);
              for (let h = 0; h < $scope.draftFile.length; h++) {
                let dF = {
                  file: $scope.draftFile[h],
                };
                $scope.DraftFile.push(dF);
              }
              console.log($scope.DraftFile);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.editDraft = function () {
      let id = sharedDataService.getId();
      console.log($scope.receive);
      let multiple = [];
      if (angular.isArray($scope.receive)) {
        for (let i = 0; i < $scope.receive.length; i++) {
          let data = {
            email: $scope.receive[i],
          };
          multiple.push(data);
        }
      } else {
        console.log($scope.receive.split(","));
        email = $scope.receive.split(",");
        console.log(email);
        if (!email) {
          Swal.fire({
            icon: "error",
            title: "Enter valid email",
          });
        }
        for (let i = 0; i < email.length; i++) {
          let data = {
            email: email[i],
          };
          multiple.push(data);
        }
      }
      console.log(multiple);
      id = id;
      console.log($scope.send.body);
      let body = $scope.send.subject;
      let subject = $scope.send.body;
      let formData = new FormData();
      console.log($scope.files);
      for (let i = 0; i < $scope.files.length; i++) {
        formData.append("file", $scope.files[i]);
      }
      formData.append("id", id);
      formData.append("emails", JSON.stringify(multiple));
      formData.append("body", body);
      formData.append("subject", subject);
      console.log(formData);

      $http
        .post(apiUrl + "/mail/draftedit/", formData, {
          headers: { "Content-Type": undefined },
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      $scope.receive = "";
      $scope.send.subject = "";
      $scope.send.body = "";
      $scope.file = "";
      $scope.files = [];
      $scope.multiple = [];
      $scope.DraftFile = [];

      console.log($scope.files);
    };

    $scope.submitFiles = function () {
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
          if (response.status == 200) {
            new Noty({
              theme: "relax",
              type: "success",
              layout: "topRight",
              timeout: 2000,
              text: response.data.message,
            }).show();
          }
          draftMail($http, $scope);
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
