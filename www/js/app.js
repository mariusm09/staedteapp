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
});
