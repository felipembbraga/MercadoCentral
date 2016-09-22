angular.module('starter.controllers')

.controller('HomeCtrl', function(
  $scope,
  $rootScope,
  $stateParams,
  $getData,
  $getHighlights,
  $serverUrl,
  viewButtonService,
  $ionicLoading
) {
  // $getData.fetch().then(function(data) {
  //   $scope.homeData = data.homeData;
  //   console.log($scope.homeData);
  // });

  $scope.ngStyle = {
    h2: {
      color: 'rgb(35, 136, 200)'
    },
    p: {
      color: 'rgb(35, 136, 200)'
    }
  }
  $scope.options = {
    effect: 'slide',
    loop: false,
    speed: 500,
  }
  $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {

  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });

  $scope.loadData = function() {
    $ionicLoading.show({
      template: 'Carregando...'
    }).then(function() {
      $getHighlights.fetch().then(function(data) {
        console.log(data);
        $scope.homeData = data;
        // $scope.obj.products = _.map(data, function(product) {
        //   var thumbnailImage = angular.fromJson(product.thumbnail);
        //
        //   if (thumbnailImage) {
        //     var thumbnail = $serverUrl + '/media/' + thumbnailImage[0].fields.image
        //   }
        //
        //   var imageArray = angular.fromJson(product.images);
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

  // $getData.fetch().then(function(data) {
  //   $scope.obj.products = _.filter(data.products, function(product) {
  //     return isSelected(product.refs, $stateParams.ref);
  //   });
  // });
  //
  $scope.$on('$stateChangeSuccess', function(event, toState) {
    if (toState.name === 'app.home') {
      $scope.loadData();
    }
  });
});
