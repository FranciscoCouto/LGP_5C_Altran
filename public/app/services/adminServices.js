(function () {

'use strict';
var adminServices = function ($q, $http, $cookies, $window) {
    var deferred = $q.defer();

      // Function to create a user
        this.registerUser = function(user) {
                return $http.post('/api/createuser', user, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity
                });
        };

        this.insertTech = function(tech) {

            return $http.post('/api/technologies', tech)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.insertType = function(type) {

            return $http.post('/api/projecttypes', type)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.insertSector = function(sector) {

            return $http.post('/api/sectors', sector)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };



        // Function to get all users
        this.getUsers = function() {

            return $http.get('/api/users')
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to update a user's password
        this.updateUserPass = function(info) {
            return $http.put('/api/updateuserpass',info)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to update user's informations (email, permission...)
        this.edition = function(user) {
            return $http.put('/api/updateuseremail',user)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

};

// Injecting modules used for better minifing later on
    adminServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('adminServices', adminServices);

}());
