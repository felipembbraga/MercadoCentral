angular.module('starter.data', [])

.factory('$getData', function($http, $q) {
  return {
    fetch: function() {
      var deferred = $q.defer();
      $http.get('metadata.json')
        .then(function(response) {
          deferred.resolve(response.data);
        }, function() {
          deferred.reject('dados não encontrados');
        });

      return deferred.promise;
    }
  }
})
