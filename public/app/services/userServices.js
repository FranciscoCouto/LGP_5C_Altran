(function() {

    'use strict';
    var userServices = function($q, $http, $cookies, $window) {
        var deferred = $q.defer();

        // Function to login a user
        this.login = function(user, remember) {

            return $http.post('/api/login', user)
                .success(function(res) {
                    var now = new Date(),
                        exp;
                    if (remember) {
                        exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
                    } else {
                        exp = null;
                    }

                    $cookies.put('session', res, {
                        path: '/',
                        expires: exp
                    });

                    //$window.location.href = '/home';

                    deferred.resolve('Success');

                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };

        this.logged = function() {
            return $http.get('/api/verifysession')
                .success(function(res) {
                    deferred.resolve(res.data);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.createLL = function(lesson, remember) {

            return $http.post('/api/createlesson', lesson)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };

        // Function to update ll's info
        this.editLL = function(ll, updatestate) {
            return $http.put('/api/updatelessontext',ll)
                .success(function(res) {
                    if(updatestate) {
                        return $http.put('/api/updatelessonstate',ll);
                    }
                    else {
                        deferred.resolve('Success');
                    }
                })
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        // Function to logout a user
        this.logout = function() {
            console.log($cookies);
            $cookies.remove('session', {
                path: '/'
            });

            $window.location.href = '/';

        };

        this.getUserById = function(userid) {
            var config = {
                headers: {

                    'iduser': userid
                }
            };

            return $http.get('/api/user', config)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };



    };

    // Injecting modules used for better minifing later on
    userServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('userServices', userServices);

}());
