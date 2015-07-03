angular.module('starter.factory', [])

.factory('DataFactory', function ($firebaseArray, $rootScope, $timeout) {

    OfflineFirebase.restore();

    // Dave Daten
    //var ref = new OfflineFirebase("https://sizzling-torch-9896.firebaseio.com/cities");

    // Marius Daten
    var ref = new OfflineFirebase("https://luminous-torch-3697.firebaseio.com/cities");

    ref.on('value', function(snapshot) {
        if($rootScope.newdata == null){
            $rootScope.newdata = 0;
        } else {
            $rootScope.newdata ++;

            if ($rootScope.newdata > 1) {

            $timeout(function () {
                $rootScope.newdata --;
            }, 3000);
            }
        }
        console.log("data changed", snapshot.val());
    }, undefined, undefined, true);

    // download the data into a local object
    var cities = $firebaseArray(ref);

    return {
        getCities: function () {
            return cities;
        },
        getCity: function (cityId) {
            for (i = 0; i < cities.length; i++) {
                if (cities[i].id == cityId) {
                    return cities[i];
                }
            }
            return false;
        }
    }
})

.factory('Openweathermap', function($http){
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';

    var openweathermapService = {};

    openweathermapService.getWeatherByLocationString = function(locationString, callbackSuccess, callbackError) {
        $http({
            method: 'GET',
            url: apiUrl,
            params: {
                q: locationString
    }
        }).success(callbackSuccess).error(callbackError);
    };

    return openweathermapService;
})

.factory('Openweatherforecast', function($http){
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';

    var openweatherforecastService = {};

    openweatherforecastService.getWeatherByLocationString = function(locationString, callbackSuccess, callbackError) {
        $http({
            method: 'GET',
            url: apiUrl,
            params: {
                q: locationString,
                cnt: 7
            }
        }).success(callbackSuccess).error(callbackError);
    };

    return openweatherforecastService;
});
