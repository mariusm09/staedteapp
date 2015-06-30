angular.module('starter.factory', [])

.factory('DataFactory', function ($firebaseArray) {

    var ref = new Firebase("https://luminous-torch-3697.firebaseio.com/cities");
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
