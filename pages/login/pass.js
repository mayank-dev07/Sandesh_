myApp.controller("passController", [
  "$scope",
  "$location",
  "sharedDataFactory",
  "$http",
  "$state",
  function ($scope, $location, sharedDataFactory, $http,$state) {

    $http.get(apiUrl + '/users/authentication/',{
      withCredentials:true
  })
  .then(function(response){
      console.log(response.status)
      if(response.status = 200){
          $location.path('/dashboard')
      }
  })
  .catch(function(error){
      console.log(error.status)
  })

    $scope.showPass = () => {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    };

    $scope.submitForm = function () {
      let data = {
        password: $scope.user.password,
      };

      sharedDataFactory.setData(data);
      $scope.showData = $sharedDataFactory.getData();
      console.log($scope.showData);

      let loginData = $scope.showData;

      $http
        .post(apiUrl + "/users/signin/", loginData, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          $location.path("/dashboard");
        })
        .catch(function (error) {
          console.log(error.data.message);
          Swal.fire({
            icon: 'error',
            title: error.data.message,
          })
        });
    };
    $scope.forget = function(){
      $state.go('login.forgotPass')
    //   Swal.fire({
    //     title: "Enter recovery email",
    //         html: `<input type="email" id="email" class="swal2-input" placeholder="Email">`,
    //         confirmButtonText: "Send",
    //     showCancelButton: true,
    //     preConfirm: () => {
    //     const email = Swal.getPopup().querySelector("#email").value;
    //     if (!email) {
    //       Swal.showValidationMessage(`Please enter email`);
    //       return false;
    //     }
    //     return { email: email };
    //   },
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //       let data = {
    //         email:result.value.email
    //       }
    //       console.log(data)
    //       $http.post(apiUrl + '/users/otpgeneration/',data)
    //       .then(function(response){
    //         console.log(response)
    //         Swal.fire({
    //               title: "Enter the OTP",
    //                   html: `<input type="text" id="OTP" class="swal2-input" placeholder="OTP">`,
    //                   confirmButtonText: "Send",
    //               showCancelButton: true,
    //               preConfirm: () => {
    //               const OTP = Swal.getPopup().querySelector("#OTP").value;
    //               if (!OTP) {
    //                 Swal.showValidationMessage(`Please enter OTP`);
    //                 return false;
    //               }
    //               return { OTP: OTP };
    //             },
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               console.log(result.value.OTP);
    //               data.OTP = result.value.OTP
    //               console.log(data)
    //               $http.post(apiUrl + '/users/otpvalidation/',data)
    //               .then(function(response){
    //                 console.log(response)
    //                 Swal.fire({
    //                   title: "Enter the password",
    //                       html: `<input type="text" id="password" class="swal2-input" placeholder="password">` +
    //               `<input type="text" id="Cpassword" class="swal2-input" placeholder="Confirm password">`,
    //                       confirmButtonText: "Send",
    //                   showCancelButton: true,
    //                   preConfirm: () => {
    //                   const password = Swal.getPopup().querySelector("#password").value;
    //                   const Cpassword = Swal.getPopup().querySelector("#Cpassword").value;
    //                   if (!password && ! Cpassword) {
    //                     Swal.showValidationMessage(`Please enter password`);
    //                     return false;
    //                   }
    //                   return { 
    //                     password: password,
    //                     Cpassword: Cpassword
    //                    }
    //                 },
    //               }).then((result) => {
    //                 if (result.isConfirmed) {
    //                   console.log(result.value.password);
    //                   console.log(result.value.Cpassword);
    //                   data.password = result.value.password
    //                   data.Cpassword = result.value.Cpassword
    //                   console.log(data)
    //                   $http.post(apiUrl + '/users/changepassword/',data)
    //                   .then(function(response){
    //                     console.log(response)
    //                   })
    //                   .catch(function(error){
    //                     console.log(error)
    //                   })
    //                 }
    //               })
    //               })
    //               .catch(function(error){
    //                 console.log(error)
    //               })
    //             }
    //           })
    //       })
    //       .catch(function(error){
    //         console.log(error)
    //       })
    //     }
    //   })
    }
  },
]);
