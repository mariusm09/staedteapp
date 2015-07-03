// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factory', 'firebase'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//Seiten in Navigation
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })
    .state('app.overview', {
        url: "/overview",
        views: {
            'menuContent': {
                templateUrl: "templates/overview.html",
                controller: 'OverviewCtrl'
            }
        }
    })
     .state('app.favorites', {
         url: "/favorites",
         views: {
             'menuContent': {
                 templateUrl: "templates/favorites.html"
             }
         }
     })
        .state('app.map', {
            url: "/map",
            views: {
                'menuContent': {
                    templateUrl: "templates/map.html",
                    controller: 'MapCtrl'
                }
            }
        })
     .state('app.search', {
         url: "/search",
         views: {
             'menuContent': {
                 templateUrl: "templates/search.html"
             }
         }
     })
    .state('app.city-detail', {
        url: '/city/:cityId',
        views: {
            'menuContent': {
                templateUrl: 'templates/cities/city-detail.html',
                controller: 'CityDetailCtrl'
            }
        }
    })

       
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/overview');
})


    .directive('temperature', function(){
        return {
            restrict: 'E',
            link: function(scope, element, attributes) {
                scope.$watch(attributes.measure, function(newMeasure){
                    var celsius = Math.round((attributes.kelvin - 273.15) * 10) / 10;
                    if (newMeasure === 'c') {
                        element.text(celsius + '°C');
                        return;
                    }

                    var fahrenheit = Math.round((celsius * 9 / 5 + 32) * 10) / 10;
                    element.text(fahrenheit + '°F');
                });
            }
        }
    })

    .directive('weatherIcon', function(){
        return {
//		restrict: 'E',
            link: function(scope, element, attributes) {
                /**
                 * Mapping of weather codes to meteocons icons
                 * @type {{}}
                 * @see http://openweathermap.org/wiki/API/Weather_Condition_Codes
                 */
                var iconMap = {
                    200: 'P',
                    201: 'P',
                    202: 'P',
                    210: 'P',
                    211: 'P',
                    212: 'P',
                    221: 'P',
                    230: 'P',
                    231: 'P',
                    232: 'P',

                    300: 'Q',
                    301: 'Q',
                    302: 'Q',
                    310: 'Q',
                    311: 'Q',
                    312: 'Q',
                    321: 'Q',

                    500: 'Q',
                    501: 'R',
                    502: 'R',
                    503: 'R',
                    504: 'R',
                    511: 'R',
                    520: 'R',
                    521: 'R',
                    522: 'R',

                    600: 'V',
                    601: 'W',
                    602: 'W',
                    611: 'W',
                    621: 'W',

                    701: 'E',
                    711: 'M',
                    721: 'M',
                    731: 'M',
                    741: 'M',

                    800: 'B',
                    801: 'H',
                    802: 'N',
                    803: 'N',
                    804: 'Y',

                    900: 'F',
                    901: 'T',
                    902: 'F',
                    903: '`',
                    904: '`',
                    905: 'S',
                    906: 'X',

                    'default': ')'
                };

                element.text(iconMap[attributes.id] ? iconMap[attributes.id] : iconMap['default']);
            }
        }
    });


