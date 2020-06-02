var app = angular.module('studentinApp',[]);
app.controller('studentinController', function($scope,$http){
	$scope.studentIn = function(studentin){
		$http({
			method : 'POST',
			url : '/studentindata',
			data : $scope.studentin
		}).then(function success(response){
      window.location.href = '/stu_home'
		}, function error(response){
      alert('Invalid Credentials');
		})
	}
})