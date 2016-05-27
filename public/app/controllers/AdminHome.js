
/**
* Create the controller for the Admin Home Page
*/
(function(){
	 var  AdminHomePageCtrl = function($scope, $routeParams, $window, services) {

		 console.log('Page loaded.');

	 };
	 // Injecting modules used for better minifing later on
    AdminHomePageCtrl.$inject = ['$scope', 'services'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('AdminHomePageCtrl', AdminHomePageCtrl);
}());
