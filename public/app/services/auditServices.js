(function () {

'use strict';
var auditServices = function ($q, $http, $cookies, $window) {
    var deferred = $q.defer();

	this.getAudit = function() {
		 return $http.get('/api/audit')
                .success(function(res) {
				
					console.log(res);
				
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

	};

	this.createAudit = function() {
		 return $http.post('/api/createaudit', {
			'idlesson' : id
		 })
                .success(function(res) {
				
					console.log(res);
				
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

	};
   
};

// Injecting modules used for better minifing later on
    auditServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('auditServices', auditServices);

}());