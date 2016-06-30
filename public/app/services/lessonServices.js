(function () {

'use strict';
var lessonServices = function ($q, $http, $cookies, $window) {
    var deferred = $q.defer();

	this.getLesson = function(userid, userpermission) {
		 return $http.get('/api/lesson', {params: {
                    'userid': userid
                }})
                .success(function(res) {
				
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

	};
	
	this.setLessonState = function(id, state) {
		 return $http.put('/api/updatelessonstate', {
			'state' : state,
			'idlesson' : id
		 })
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

	};

    this.setLessonFeedback = function(id, feedback) {
         return $http.put('/api/updatelessonfeedback', {
            'feedback' : feedback,
            'idlesson' : id
         })
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });

    };
	

    this.getLessonByStatus = function(status){
        return $http.get('/api/lessonsByStatus',{params: {

                    'status': status
                }})
                .success(function(res) {
                
                    deferred.resolve('Success');
                })
                .error(function(err) {
                  
                    deferred.reject(err);
                });
            
    }
     this.getTop = function(){
       
        return $http.get('/api/lessonsTop')
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                  
                    deferred.reject(err);
                });
            
    }
	
	this.deleteLesson = function(lessonid) {
		return $http.post('/api/deletelesson', {
			"idlesson" : lessonid
		})
		.success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                  
                    deferred.reject(err);
                });
	}

   
};

// Injecting modules used for better minifing later on
    lessonServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('lessonslearned').service('lessonServices', lessonServices);

}());