
/**
* Create the controller for the Admin Home Page
*/
(function(){
	 var  StatCtrl = function($scope, $routeParams, $window,genServices,lessonServices) {

		  console.log('Page loaded.');

		 $scope.hasSession="";
		 
			
	 $scope.init = function () {
	 //	genServices.getProjects()
	 lessonServices.getLessonByStatus('submitted')
	 	.then(function(res){
	 		$scope.submitted = res.data.length;
	 	})
	 	.catch(function (err) {
                console.log(err.data);
            });
	 	 lessonServices.getLessonByStatus('approved')
	 	.then(function(res){
	 		$scope.approved = res.data.length;
	 	})
	 	.catch(function (err) {
                console.log(err.data);
            });
	 	lessonServices.getLessonByStatus('rejected')
	 	.then(function(res){
	 		console.log(res);
	 		$scope.rejected = res.data.length;
	 	})
	 	.catch(function (err) {
                console.log(err.data);
            });
	 	lessonServices.getLessonByStatus('inactive')
	 	.then(function(res){
	 		$scope.inactive = res.data.length;
	 	})
	 	.catch(function (err) {
                console.log(err.data);
            });
	 	lessonServices.getTop()
	 	.then(function(res){
	 		$scope.top = res.data;
	 		console.log(res.data);
	 	})
	 	.catch(function (err) {
                console.log(err.data);
            });

	 }


	 };

	 // Injecting modules used for better minifing later on
    StatCtrl.$inject = ['$scope', '$routeParams', '$window','genServices','lessonServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('StatCtrl', StatCtrl);
}());
