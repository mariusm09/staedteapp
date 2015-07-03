angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $state) {
    //if ()
    //$scope.currentState = $state.current.name;
    console.log($state);
})

.controller('OverviewCtrl', function ($scope, DataFactory) {
    console.log(DataFactory.getCities());
    $scope.cities = DataFactory.getCities();
})

.controller('CityDetailCtrl', function ($scope, $stateParams, DataFactory) {
    $scope.city = DataFactory.getCity($stateParams.cityId);
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };

})
.controller('MapCtrl', function ($scope, $timeout) {
    //checkData everytime the view is loaded (even the view is cached)
    $scope.$on('$ionicView.afterEnter', function () {
        $timeout(function () {
            initialize();
        }, 500);
    });

    $scope.$on('$ionicView.leave', function () {
        document.getElementById("map").innerHTML = "";
    });
   
    function initialize() {
        var map;
        var bounds = new google.maps.LatLngBounds();

        var mapStyles =
    [ { "featureType": "water", "stylers": [ { "color": "#000066" } ] },{ "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "visibility": "on" } ] },{ "featureType": "administrative.country", "elementType": "labels", "stylers": [ { "visibility": "simplified" } ] },{ "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" } ] },{ "featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [ { "hue": "#00ccff" }, { "visibility": "on" } ] },{ "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "visibility": "simplified" } ] },{ "featureType": "road.arterial", "stylers": [ { "visibility": "on" } ] },{ "featureType": "transit", "stylers": [ { "visibility": "simplified" } ] },{ "featureType": "road.local", "stylers": [ { "visibility": "on" } ] },{ "featureType": "administrative.country", "stylers": [ { "visibility": "on" } ] },{ "featureType": "landscape.natural", "stylers": [ { "visibility": "on" }, { "saturation": -6 }, { "color": " #FF00" } ] },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#6699FF" }, { "saturation": -49 } ] },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "stylers": [ { "saturation": -54 } ] },{ } ]

        var mapOptions = {
            mapTypeId: 'roadmap',
            styles: mapStyles,
            tilt: 45
        };

        // show map
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Markers
        var markers = [
            ['Hong Kong', 22.289662, 114.172712],
            ['Istanbul', 41.018145, 28.975272],
            ['London', 51.509415, -0.119451],
            ['New York', 40.698367, -74.018133],
            ['Paris', 48.856882, 2.344657],
            ['Rio de Janeiro', -22.901749, -43.181009]
        ];

        //InfoWindows
        var infoWindowContent = [
            ['Hong Kong - Die Stadt, die Ost und West vereint'],
            ['Istanbul - Wo sich zwei Kontinente treffen'],
            ['London - Die Stadt, die Trends setzt'],
            ['New York - Die ganze Welt in einer Stadt'],
            ['Paris - Die Stadt der Liebe'],
            ['Rio de Janeiro - Immer auf der Sonnenseite']
        ];

        var infoWindow = new google.maps.InfoWindow(), marker, i;

        for (i = 0; i < markers.length; i++) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0]
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        };

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
            this.setZoom(2);
            google.maps.event.removeListener(boundsListener);
        });
    }
})
