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
        var mapOptions = {
            mapTypeId: 'roadmap'
        };

        var mapStyles = [
      {
          "featureType": "road",
          "stylers": [
            { "hue": "#3bff00" }
          ]
      }, {
          "featureType": "water",
          "stylers": [
            { "hue": "#ff0000" }
          ]
      }, {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
          ]
      }, {
      }
        ]

        // show map
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.setTilt(45);

        //map = new google.maps.Map(document.getElementById('map'), {
        //    zoom: 8,
        //    center: { lat: 47.0833, lng: 8.2667 }
        //});
        //map.setOptions({ styles: mapStyles });

        //Markers
        var markers = [
            ['Istanbul', 47.05107889, 8.30218792],
            ['London', 45.0536, 9.3665],
            ['New York', 40.700710, -74.005774]
        ];

        //InfoWindows
        var infoWindowContent = [
            ['Istanbul Beschreibung'],
            ['London Beschreibung'],
            ['New York']
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
