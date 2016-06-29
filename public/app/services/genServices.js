(function () {

'use strict';
var genServices = function ($q, $http) {
    var deferred = $q.defer();
        // Function to retrieve technologies
        this.getTechnologies = function() {
            return $http.get('/api/technologies')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to retrieve project types
        this.getProjectTypes = function() {
            return $http.get('/api/projecttypes')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to retrieve business sectors
        this.getBusinessSectors = function() {
            return $http.get('/api/sectors')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to retrieve people who can be project managers
        this.getManagers = function() {
            return $http.get('/api/managers')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        
        this.setTerminated = function(cenas){
            return $http.post('/api/updateprojfinito', cenas)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to retrieve the list of existing projects
        this.getProjects = function() {
            return $http.get('/api/projects')
                .success(function(res) {
                    deferred.resolve(res);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to retrieve the list of existing projects by manager ID
        this.getProjectsByManager = function(managerid) {
         return $http.get('/api/projectsbymanager', {
                    headers: {'managerid': managerid}
                })
                .success(function(res) {             
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to check if there exists a lesson created by this manager
        this.getManagerLesson = function(managerid) {
         return $http.get('/api/checklessonmanager', {
                    headers: {'managerid': managerid}
                })
                .success(function(res) {             
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
        // Function to create a project
        this.createProject = function(project) {
            return $http.post('/api/createproject', project)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

         // Function to update ll's info
        this.editProjectManager = function(manager) {
            return $http.put("/api/updateProjectManagerByID",manager)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };
};

// Injecting modules used for better minifing later on
    genServices.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('genServices', genServices);

}());