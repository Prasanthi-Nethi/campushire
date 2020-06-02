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
