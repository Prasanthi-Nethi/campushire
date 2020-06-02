var app = angular.module('studentupApp', []);
app.controller('studentupController', function($scope,$http){
	$scope.signupData = function(studentup){
		$http({
			method : 'POST',
			url : '/postsignupdata',
			data : $scope.studentup
		}).then(function success(response){
			alert('Account Created Successfully');
			$scope.studentup = {};
		}, function error(response){
			alert('Error Occured, Please Try Again');
		})
	}
})