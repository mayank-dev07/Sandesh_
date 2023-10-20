myApp.controller("forgotPassController", [
    "$scope",
    "$location",
    "sharedDataFactory",
    "$http",
    "$state",
    function ($scope, $location, $sharedDataFactory, $http,$state) {
        $scope.recConfirm = false;
        $scope.rec = true;
        $scope.email = "";
        $scope.submitForm = function(){
            $scope.email = $scope.RecEmail 
            let data = {
                email :$scope.RecEmail
            }
            console.log(data)
            $http.post(apiUrl + '/users/otpgeneration/',data,)
            .then((response)=>{
                console.log(response)
                $scope.recConfirm = true;
                $scope.rec = false;
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        $scope.submitotp = function(){
            console.log($scope.email)
            let data = {
                email : $scope.email,
                otp :$scope.otp
            }
            console.log(data)
            $http.post(apiUrl + '/users/otpvalidation/',data,)
            .then((response)=>{
                console.log(response)
                $scope.recConfirm = true;
                $scope.rec = false;
                if(response.status == 200){
                    $state.go('login.confirmPass')
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }])