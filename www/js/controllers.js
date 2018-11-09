angular.module('starter.controllers', [])

.controller('SplashScreenCtrl', function($rootScope, $scope, $getData, $state, $timeout) {
  $scope.ngStyle = {
    'background-color': $rootScope.primaryColor || '#444',
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center'
  };

  $scope.$on('$stateChangeSuccess', function(event, toState) {
    if(toState.name === 'splashscreen') {
      $getData.load().then(function(data) {
          $rootScope.appName = data.name;
          $rootScope.logo = data.logo;
          $rootScope.primaryColor = data.primary_color;
          $rootScope.secondaryColor = data.secondary_color;
          $scope.ngStyle['background-color'] = data.primary_color;
          console.log(data);
          var sections = _.map(data.sections, function(value) {
            var route = '#/app';
            console.log(value.fields.type)
            switch (value.fields.type) {
              case 0:
                route = route + '/products/' + value.fields.reference
                break;
              case 2:
                route = route + '/contact';
                break;
              default:
                route = route;
            }
            return {
              name: value.fields.title,
              icon: value.fields.icon,
              ref: value.fields.reference,
              route: route
            };
          });
          $rootScope.menuItems = _.concat([{
            name: 'Início',
            icon: 'ion-ios-home',
            ref: '',
            route: '#/app/home'
          }], sections);
          $timeout(function() {$state.transitionTo('app.home');}, 1000);

      });
    }
  })
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
  $scope.ngStyle = {
    content: {
      'background-color': '#094d9d'
    },
    slide: {
      height: window.screen.height * 0.5 + 'px'
    },
    h2: {
      color: 'white'
    },
    p: {
      color: 'white'
    },
    buttonWrapper: {
      height: window.screen.height * 0.31 + 'px',
    }
  };
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

.controller('ContactCtrl', function($scope, $localStorage, $state, $ionicPopup, $ionicHistory) {
  $scope.ngStyle = {
    content: {
      'background-color': '#094d9d'
    },
    slide: {
      height: window.screen.height * 0.5 + 'px'
    },
    h2: {
      color: 'white'
    },
    p: {
      color: 'white'
    },
    buttonWrapper: {
      height: window.screen.height * 0.31 + 'px',
    }
  };
  $scope.$on('$stateChangeSuccess', function(event, toState) {
    if(toState.name === 'app.contact') {
      $scope.obj = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };

      if ($localStorage.user) {
        $scope.obj = angular.extend({}, $scope.obj, $localStorage.user);
      }
    }
  });

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

      });
      return;
    }
    var confirmPopup = $ionicPopup.show({
      title: 'Enviado com sucesso!',
      template: 'Entraremos em contato em breve.',
      scope: $scope,
      buttons: [{
        text: 'Ok'
      }]
    });
    var self
    confirmPopup.then(function() {
      console.log(this.registerForm);
      $scope.obj.message = '';
      $ionicHistory.goBack();
      // $state.go('app.home');
    });
    // $localStorage.user = $scope.obj;
    // $state.go('app.home');

  }
})

.controller('AppCtrl', function($scope, $ionicPopover, $state, viewButtonService) {

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

  $scope.changeView = function() {
    viewButtonService.changeType();
  };
})

.controller('ListProductCtrl', function(
  $scope,
  $rootScope,
  $stateParams,
  $getData,
  $getProducts,
  $serverUrl,
  viewButtonService,
  $ionicLoading
) {
  $scope.obj = {
    list: viewButtonService.list,
    name: '',
    products: []
  };

  $scope.ngStyle = {
    content: {
      'background-color': '#094d9d'
    },
    slide: {
      height: window.screen.height * 0.5 + 'px'
    },
    h2: {
      color: 'white'
    },
    p: {
      color: 'white'
    },
    buttonWrapper: {
      height: window.screen.height * 0.31 + 'px',
    }
  };

  $scope.$watch(function() {
    return viewButtonService.list;
  }, function(value) {
    $scope.obj.list = value;
  });
  var menuItem = _.find($rootScope.menuItems, function(val) {
    return val.ref === $stateParams.ref;
  });
  if (menuItem) {
    $scope.obj.name = menuItem.name;
  }

  function isSelected(lista, filter) {
    return _.findIndex(lista, function(value) {
      return value === filter;
    }) > -1;
  };
  $scope.isPromo = function(product) {
    return isSelected(product.refs, 'promo');
  };

  $scope.loadData = function() {
    $ionicLoading.show({
      template: 'Carregando...'
    }).then(function() {
      $getProducts.fetch($stateParams.ref).then(function(data) {
        $scope.obj.products = _.map(data, function(product) {
          var thumbnailImage = angular.fromJson(product.thumbnail);

          if (thumbnailImage && thumbnailImage.length > 0) {
            var thumbnail = $serverUrl + '/media/' + thumbnailImage[0].fields.image
          }

          var imageArray = angular.fromJson(product.images);
          console.log(imageArray);
          var images = _.map(imageArray, function(image) {
            return {
              url: $serverUrl + '/media/' + image.fields.image,
              caption: image.fields.caption
            }
          });

          return {
            id: product.id,
            title: product.title,
            short_description: product.short_description,
            description: product.description,
            thumbnail: thumbnail,
            images: images
          }
        });
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      });
    });
  };

  // $getData.fetch().then(function(data) {
  //   $scope.obj.products = _.filter(data.products, function(product) {
  //     return isSelected(product.refs, $stateParams.ref);
  //   });
  // });
  //
  $scope.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.name === 'app.products') {
      $scope.loadData();
    }
  });

})

.controller('ViewProductCtrl', function($scope, $stateParams, $getData,
  $getProducts,
  $serverUrl,
  viewButtonService,
  $ionicLoading
) {
  $scope.obj = {
    product: {}
  };

  $scope.ngStyle = {
    content: {
      'background-color': '#094d9d'
    },
    slide: {
      height: window.screen.height * 0.5 + 'px'
    },
    small: {
      color: 'white'
    },
    h2: {
      color: 'white'
    },
    description: {
      color: 'white'
    },
    buttonWrapper: {
      height: window.screen.height * 0.31 + 'px',
    }
  };

  $scope.loadData = function() {
    console.log('aberto');
    $ionicLoading.show({
      template: 'Carregando...'
    }).then(function() {
      $getProducts.fetchOne($stateParams.productId).then(function(product) {
        console.log(product);
        var imageArray = angular.fromJson(product.images);
        var images = _.map(imageArray, function(image) {
          return {
            url: $serverUrl + '/media/' + image.fields.image,
            caption: image.fields.caption
          }
        });
        $scope.obj.product = {
          id: product.id,
          title: product.title,
          short_description: product.short_description,
          description: product.description,
          images: images
        };
        // $scope.obj.products = _.map(product, function(product) {
        //   var thumbnailImage = angular.fromJson(product.get_thumbnail);
        //
        //   if(thumbnailImage){
        //     var thumbnail = $serverUrl + '/media/' + thumbnailImage[0].fields.image
        //   }
        //
        //   var imageArray = angular.fromJson(product.get_images);
        //   console.log(imageArray);
        //   var images = _.map(imageArray, function(image) {
        //     return {
        //       url: $serverUrl + '/media/' + image.fields.image,
        //       caption: image.fields.caption
        //     }
        //   });
        //
        //   return {
        //     id: product.id,
        //     title: product.title,
        //     short_description: product.short_description,
        //     description: product.description,
        //     thumbnail: thumbnail,
        //     images: images
        //   }
        // });
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      });
    });




  };

  $scope.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.name === 'app.productView') {
      $scope.loadData();
    }
  });

  // $getData.fetch().then(function(data) {
  //   console.log($stateParams);
  //   $scope.obj.product = _.find(data.products, function(product) {
  //     return product.id === parseInt($stateParams.productId);
  //   });
  // });

});
