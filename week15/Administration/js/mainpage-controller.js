var mainpage = angular.module('mainpage', []);

mainpage.controller('getPage', ['$scope', '$http', function($scope, $http) {
    $http.get('http://104.194.79.133:3900/1').success(function(data) {
            //处理json方法
            $scope.news1 = data;

        })
$http.get('http://104.194.79.133:3900/2').success(function(data) {
            //处理json方法
            $scope.news2 = data;
  
        })
   $http.get('http://104.194.79.133:3900/3').success(function(data) {
            //处理json方法
            $scope.news3= data;
  
        })
}])
