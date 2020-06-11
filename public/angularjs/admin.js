var app = angular.module('adminApp',[]);
app.controller('adminController', function($scope,$http){
  $scope.adminData = function(admin){
    $http({
    	method : 'POST',
    	url : 'adminlogin',
    	data : $scope.admin
    }).then(function success(response){
      //alert('login success');
      window.location.href = '/admindashboard';
    }, function error(response){
      alert('Invalid Credentials');
    })
  }
});
app.controller('studentsController', function($scope,$http){
  
    $http({
      method : 'GET',
      url :'/getstudentdata'
      }).then(function success(response){
      //alert('login success');
      console.log(response.data)
      $scope.studentsdata = response.data
    }, function error(response){
      alert('Invalid Credentials');
    })
  $scope.del = function(dated,index){
    $http({
      method : 'POST',
      url :'/removestudentdata',
      data : dated
      }).then(function success(response){
      alert('deleted');
      $scope.studentsdata.splice(index, 1)
    }, function error(response){
      alert('Invalid Credentials');
    })
  }
    $scope.update = function(dated){
    $http({
      method : 'POST',
      url :'/updatestudentdata',
      data : dated
      }).then(function success(response){
      alert('updated');
      $scope.studentsdata.splice(index, 1)
    }, function error(response){
      alert('Invalid Credentials');
    })
  }
});
app.controller('reportcontroller', function($scope,$http){
  
    $http({
      method : 'GET',
      url :'/getstudentdata'
      }).then(function success(response){
      //alert('login success');
      console.log(response.data)
      $scope.studentsdata = response.data
    }, function error(response){
      alert('Invalid Credentials');
    })
}) 