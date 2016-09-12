angular.module('starter.directives.ribbon', [])
.directive('ribbonCorner', function() {
  return {
    template: '<div class="ribbon-wrapper"><div class="ribbon" ng-transclude></div></div>',
    restrict: 'E',
    transclude: true,
    link: function(scope, element, attrs) {
      var $parent = element.parent();
      $parent.css({position: 'relative'});
    }
  };
});
