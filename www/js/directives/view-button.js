angular.module('starter.directives.viewButton', [])
.factory('viewButtonService', function() {
  this.list = true;
  this.changeType = function() {
    this.list = !this.list;
  }

  return {
    list: this.list,
    changeType: this.changeType
  }
})
.directive('viewButton', function(viewButtonService) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.viewType = 'list';
      element.addClass('button button-icon button-clear ion-ios-grid-outline');
      scope.$watch(function() {return viewButtonService.list; }, function(value) {
        var icon = value ? 'ion-grid' : 'ion-ios-list-outline';
        var oldIcon = value ? 'ion-ios-list-outline' : 'ion-grid';
        element.removeClass(oldIcon);
        element.addClass(icon);
      });
      scope.$on('$viewButtonChange');
      var $parent = element.parent();
      $parent.css({position: 'relative'});
    }
  };
});
