(function() {
    /**
     * Create the module and call the requires
     */
    'use strict';

    var listllServices = function($q, $http, $cookies, $window) {
        var deferred = $q.defer();
        // Function to retrieve ALL lessons
        this.getAllLessons = function() {

            return $http.get('/api/lessons')
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        // Function to retrieve ALL lessons from a user
        this.getAllLessonsByUser = function(userid) {
            var config = {
                headers: {
                    'managerid': userid
                }
            };
            return $http.get('/api/lessonsbymanager', config)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };


    };

    // Injecting modules used for better minifing later on
    listllServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('listllServices', listllServices);

}());
