angular.module('starter.controllers', [])

.controller('SplashScreenCtrl', function($scope, $state, $timeout) {
  $scope.ngStyle = {
    'background-color': '#444',
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center'
  };

  $timeout(5000).then(function() {
    $state.go('app.home');
  });
})

.controller('MenuCtrl', function($scope, $rootScope, $getData) {
  // $scope.menuItems = [];
  // $scope.icon = "";
  // $getData.fetch().then(function(data){
  //   console.log(data);
  //   // $scope.menuItems = data.menuItems;
  //   // $scope.logo = data.logo;
  // });

  $scope.onClick = function(event, item) {
    item.onClick && item.onClick(event);
  }
})

.controller('RegisterCtrl', function($scope, $localStorage, $state, $ionicPopup) {
  $scope.obj = {
    name: '',
    email: '',
    phone: ''
  };

  if ($localStorage.user) {
    $scope.obj = angular.extend({}, $scope.obj, $localStorage.user);
  }

  $scope.onClick = function() {
    if (this.registerForm.$invalid) {
      $scope.errors = [];
      if (this.registerForm.$error.required) {
        $scope.errors.push('Preencha todos os campos!');
      }
      if (this.registerForm.$error.email) {
        $scope.errors.push('Insira um email válido');
      }
      if (this.registerForm.$error.brPhoneNumber) {
        $scope.errors.push('Insira um número válido.');
      }
      var myPopup = $ionicPopup.show({
        title: 'Alerta',
        template: '<ul>' +
          '<li ng-repeat="error in errors">{{error}}</li>' +
          '</ul>',
        scope: $scope,
        buttons: [{
          text: 'Ok'
        }]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      return;
    }
    $localStorage.user = $scope.obj;
    $state.go('app.home');

  }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $ionicPopover.fromTemplateUrl('popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function(event) {
    $scope.popover.show(event);
  };

  $scope.changeState = function(route) {
    $scope.popover.hide().then(function() {
      $state.go(route);
    });
  }

  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ListProductCtrl', function($scope, $rootScope, $stateParams, $getData) {
  $scope.obj = {
    showType: 'grid',
    name: '',
    products: []
  }
  var menuItem = _.find($rootScope.menuItems, function(val) {
    return val.ref === $stateParams.ref;
  });
  if (menuItem) {
    $scope.obj.name = menuItem.name;
  }

  $getData.fetch().then(function(data) {
    $scope.obj.products = _.filter(data.products, function(product) {
      console.log(product.refs);

      return _.findIndex(product.refs, function(ref) {
        return ref === $stateParams.ref;
      }) > -1
    });
  });
})

.controller('ViewProductCtrl', function($scope, $stateParams, $getData) {
  $scope.obj = {
    product: {}
  };

  $getData.fetch().then(function(data) {
    console.log($stateParams);
    $scope.obj.product = _.find(data.products, function(product) {
      return product.id === parseInt($stateParams.productId);
    });
  });

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {});
