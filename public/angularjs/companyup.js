var app = angular.module('CompanyApp', []);
app.controller('CompanyController', function($scope,$http){
	$scope.companyData = function(company){
		$http({
			method : 'POST',
			url : '/postcompanydata',
			data : $scope.company
		}).then(function success(response){
			alert('Signup Successfull');
			$scope.company = {};
		}, function error(response){
			alert('Error Occured, Please Try Again');
		})
	}
})