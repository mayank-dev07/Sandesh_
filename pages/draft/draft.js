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
    $scope.show = function (id,self) {
      sharedDataService.setId(id);
      let data = {
        id: id,
        self:self
      };
      $http
        .put(apiUrl + "/mail/readmail/", data, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          draftMail($http, $scope);
          $http
            .get(apiUrl + "/mail/emaildetails/", {
              withCredentials: true,
              params: { id: id },
            })
            .then(function (response) {
              console.log(response.data);
              $scope.receive = response.data[0].reciever;
              $scope.send = response.data[0].sender;
              console.log($scope.receive);
              console.log($scope.send);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.sendMail = function () {
      let id = sharedDataService.getId();
      console.log($scope.receive);
      let multiple = [];
      email = $scope.receive;
      console.log(email)
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
      console.log(multiple);
      id = id;
      let body = $scope.send.subject;
      let subject = $scope.send.body;
      let formData = new FormData()
      console.log($scope.files);
      for (let i = 0; i < $scope.files.length; i++) {
        formData.append("file", $scope.files[i]);
      }
      formData.append("id",id)
      formData.append("mail",JSON.stringify(multiple))
      formData.append("body",body)
      formData.append("subject",subject)
      console.log(formData)

      $scope.receive = "";
      $scope.send.subject = "";
      $scope.send.body = "";
      $scope.file = "";
      $scope.files = [];
      $scope.multiple = [];
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
  }
);
