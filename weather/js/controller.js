var weather = angular.module("weather", []);
weather.controller("getpage", ["$scope", "$http", function($scope, $http) {
    $http.post("http://apis.baidu.com/heweather/weather/free", {
        headers: {
            'apikey':'6e2948769e7f9ddf97e95ed8225812b5'
        },
        data: {
            "city": "北京"
        },
        dataType:'json'
    }).success(function(msg) {
        $scope.weater1 = msg["HeWeather data service 3.0"][0].daily_forecast;
    })
}] )
