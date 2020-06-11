var app = angular.module('myApp',[]);
app.controller('educationController', function($scope,$http){
  $scope.studentData = function(education){
  	$http({
  		method : 'POST',
  		url : 'educationData',
  		data : $scope.education
  	}).then(function success(response){
      $scope.education = {}
  	}, function error(response){
      alert('Error');
  	})
  }
});
app.controller('editstudentController', function($scope,$http){
  $scope.getData = function(){
  	$http({
  		method : 'GET',
  		url : 'geteducationData',
  	}).then(function success(response){
      $scope.educations = response.data
  	}, function error(response){
      alert('Error');
  	})
  }
  $scope.updateEducation = function(education){
  	$http({
  		method : 'PUT',
  		url : '/updateeducationData/'+education._id,
  		data : education
  	}).then(function success(response){
      alert('updated successfully')
  	}, function error(response){
      alert('Error');
  	})
  }
  $scope.removeEducation = function(education){
  	$http({
  		method : 'DELETE',
  		url : '/removeeducationData/'+education._id,
  	}).then(function success(response){
      alert('deleted successfully')
  	}, function error(response){
      alert('Error');
  	})
  }
});
app.controller('vacancycontroller', function($scope,$http){

    $http({
      method : 'get',
      url : '/getVacancyData'
    }).then(function success(response){
      $scope.VacancyData = response.data
    }, function error(response){
      alert('Error');
    })
  
});