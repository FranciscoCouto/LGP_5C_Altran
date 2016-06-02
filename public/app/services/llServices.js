(function () {
/**
* Create the module and call the requires
*/
var llServices = function ($q, $http) {
    var deferred = $q.defer();
    // Function to create a LL
    this.createLL = function(lesson) {

        return $http.post('/api/createlesson', lesson)
            .success(function(res) {
                deferred.resolve(res.insertId);
            })
            .error(function(err) {
                deferred.reject(err);
            });

    };
};

// Injecting modules used for better minifing later on
    llServices.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('llServices', llServices);

}());