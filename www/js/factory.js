angular.module('starter.factory', [])

.factory('DataFactory', function ($firebaseArray, $firebaseObject) {

    var ref = new Firebase("https://luminous-torch-3697.firebaseio.com/cities");
    // download the data into a local object
    var cities = $firebaseArray(ref);

    var connectedRef = new Firebase("https://luminous-torch-3697.firebaseio.com/.info/connected");
    connectedRef.on("value", function (snap) {
        if (snap.val() === true) {
            //alert("connected");
        } else {
            //alert("not connected");
        }
    });

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
