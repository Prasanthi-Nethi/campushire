var app = angular.module('myApp',[]);
app.controller('vacancyController', function($scope,$http){
  $scope.vacancyData = function(vacancy){
    $http({
      method : 'POST',
      url : 'postVacancyData',
      data : $scope.vacancy
    }).then(function success(response){
      $scope.vacancy = {}
    }, function error(response){
      alert('Error');
    })
  }
});
app.controller('managecontroller', function($scope,$http){
  $http({
      method : 'GET',
      url : '/getVacancyData',
    }).then(function success(response){
      console.log(response.data)
      $scope.vacancyData=response.data
    }, function error(response){
      alert('Error');
    })
  });