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
  'starter.data',
  'starter.directives.ribbon',
  'starter.directives.viewButton'
])

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
      $rootScope.appName = data.appName;
      $rootScope.menuItems = data.menuItems;
      $rootScope.logo = data.logo;
    });
  });
})

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
  // .state('app.tabs', {
  //   url: '/tabs',
  //   abstract: true,
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/tabs.html'
  //     }
  //   }
  // })
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
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
        'menuContent': {
          templateUrl: 'templates/list-product.html',
          controller: 'ListProductCtrl'
        },
        'menuContent': {
          templateUrl: 'templates/list-product.html',
          controller: 'ListProductCtrl'
        }
      }
    })
    .state('app.productView', {
      url: '/view-product/:productId',
      views: {
        'menuContent': {
          templateUrl: 'templates/view-product.html',
          controller: 'ViewProductCtrl'
        }
      }

    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splashscreen');
});
