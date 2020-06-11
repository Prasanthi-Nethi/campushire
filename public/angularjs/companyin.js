var app = angular.module('companyinApp',[]);
app.controller('companyinController', function($scope,$http){
	$scope.companyinData = function(company){
		$http({
			method : 'POST',
			url : '/companyindata',
			data : $scope.company
		}).then(function success(response){
      window.location.href = '/company_dashboard'
		}, function error(response){
      alert('Invalid Credentials');
		})
	}
})