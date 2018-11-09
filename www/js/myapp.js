// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngStorage',
  'ui.utils.masks',
  'starter.controllers',
  'starter.data'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('splashscreen', {
      url: '/splashscreen',
      templateUrl: 'templates/splashscreen.html',
      controller: 'SplashScreenCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    resolve: {
      logged: function($localStorage, $q) {
        if ($localStorage.user) {
          return true;
        }
        return $q.reject('notLogged');
      }
    }
  })

  .state('app.home', {
      url: '/home',
      views: {
        'home': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })
    .state('app.products', {
      url: '/products/:ref',
      views: {
        'products': {
          templateUrl: 'templates/list-product.html',
          controller: 'ListProductCtrl'
        }
      }
    })
    .state('app.productView', {
      url: '/view-product/:productId',
      views: {
        'promo': {
          templateUrl: 'templates/view-product.html',
          controller: 'ViewProductCtrl'
        }
      }
    })
    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splashscreen');
})
.run(function($rootScope, $ionicPlatform, $getData, $window, $state) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on(
      '$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'notLogged') {
          $state.go('register');
        }
      }
    );


    $rootScope.platform = ionic.Platform.platform();
    $rootScope.$state = $state;

    $rootScope.$window = $window;
    $getData.fetch().then(function(data) {
      console.log(data);
      $rootScope.appName = data.appName;
      $rootScope.menuItems = data.menuItems;
      $rootScope.logo = data.logo;
      $rootScope.primaryColor = data.primaryColor
    });
  });
});
