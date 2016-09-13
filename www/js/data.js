angular.module('starter.data', [])
.constant('$serverUrl', 'http://ubuntuserver1385.cloudapp.net')

.factory('$getData', function($http, $q) {
  return {
    fetch: function() {
      var deferred = $q.defer();
      $http.get('metadata2.json')
        .then(function(response) {
          deferred.resolve(response.data);
        }, function() {
          deferred.reject('dados não encontrados');
        });

      return deferred.promise;
    }
  }
})

.factory('$getProducts', function($http, $q, $serverUrl) {
  var url = $serverUrl + '/api/products/';
  var productsUrl = url + 'section_products.json'
  return {
    fetch: function(reference) {
      var deferred = $q.defer();

      $http.get(productsUrl, {params: {reference: reference}})
        .then(function(response) {
          deferred.resolve(response.data);
        }, function() {
          deferred.reject('dados não encontrados');
        });

      return deferred.promise;
    },
    fetchOne: function(id) {
      var deferred = $q.defer();

      $http.get(url + id + '.json')
        .then(function(response) {
          deferred.resolve(response.data);
        }, function() {
          deferred.reject('dados não encontrados');
        });

      return deferred.promise;
    }
  };
});
