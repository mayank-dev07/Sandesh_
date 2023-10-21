myApp.controller("groupsMailController",
  function ($http,$scope) {
    $http.get(apiUrl + '/admin/users/',{
      withCredentials:true
    })
    .then(function(response){
      console.log(response.data)
      $scope.users = response.data
    })
    .catch(function(error){
      console.log(error)
    })

    $scope.selectedUsers = [];
    $scope.addUser = function(id){
      console.log(id)
      let user = {
        id:id
      }
      $scope.selectedUsers.push(user);
      console.log($scope.selectedUsers)
    }

    $scope.createGroup = function(){
      let data ={
        email : $scope.email,
        user: $scope.selectedUsers
      }
      console.log(data)
      if(data.user.length != 0){
        $http.post(apiUrl + '/admin/addbulkusers/',data,{
          withCredentials:true
        })
        .then(function(response){
          console.log(response) 
        })
        .catch(function(error){
          console.log(error)
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: "add users in the group",
        })
      }
  }
  })