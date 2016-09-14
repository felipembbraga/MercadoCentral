angular.module('starter.data', [])
.constant('$serverUrl', 'http://ubuntuserver1385.cloudapp.net')
.constant('$appId', 1)

.factory('$getData', function($http, $q, $rootScope, $localStorage, $serverUrl, $appId) {
  var self = this;
  this.loaded = false;
  this.instanceData = function(data) {

  };

  // this.getAppData = function() {
  //   var deferred = $q.defer();
  //   var url = $serverUrl + '/api/apps/1.json';
  //   if($localStorage.appData) {
  //     deferred.resolve($localStorage.appData);
  //   } else {
  //     $http.get(url).then(function(response) {
  //       $localStorage.appData = response.data;
  //       deferred.resolve($localStorage.appData);
  //     }, function() {
  //       deferred.reject('dados não encontrados');
  //     });
  //   }
  //   return deferred.promise;
  // }

  this.load = function() {
    var self = this;
    var deferred = $q.defer();
    var url = $serverUrl + '/api/apps/'+ $appId + '.json';

    // if($localStorage.appData) {
      // deferred.resolve($localStorage.appData);
      // this.loaded = true;
    // } else {
      $http.get(url).then(function(response) {
        $localStorage.appData = response.data;
        deferred.resolve($localStorage.appData);
      }, function() {
        deferred.reject('dados não encontrados');
      });
    // }
    return deferred.promise;
  }

  this.fetch = function() {
    var deferred = $q.defer();
    $http.get('metadata2.json')
      .then(function(response) {
        deferred.resolve(response.data);
      }, function() {
        deferred.reject('dados não encontrados');
      });

    return deferred.promise;
  };

  return {
    loaded: this.loaded,
    load: this.load,
    fetch: this.fetch
  }
})

.factory('$getProducts', function($http, $q, $serverUrl, $appId) {
  var url = $serverUrl + '/api/products/';
  var productsUrl = url;
  return {
    fetch: function(reference) {
      var deferred = $q.defer();

      $http.get(productsUrl, {params: {
        sections__reference: reference,
        enterprise__pk: $appId
      }})
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
