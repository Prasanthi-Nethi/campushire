var app = angular.module('companyinApp',[]);
app.controller('studentinController', function($scope,$http){
	$scope.companyIn = function(companyin){
		$http({
			method : 'POST',
			url : '/companyindata',
			data : $scope.companyin
		}).then(function success(response){
      window.location.href = '#/com_home'
		}, function error(response){
      alert('Invalid Credentials');
		})
	}
})