var app = angular.module('companyupApp', []);
app.controller('companyupController', function($scope,$http){
	$scope.signupData = function(companyup){
		$http({
			method : 'POST',
			url : '/postsignupdata',
			data : $scope.companyup
		}).then(function success(response){
			alert('Account Created Successfully');
			$scope.companyup = {};
		}, function error(response){
			alert('Error Occured, Please Try Again');
		})
	}
})