angular.module('starter.controllers')

.controller('HomeCtrl', function($scope, $getData) {
  $getData.fetch().then(function(data){
    $scope.homeData = data.homeData;
    console.log($scope.homeData);
  });

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
  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){

  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });
});
