/**
 * Create the controller
 */
(function() {
    var ProjectListCtrl = function($scope, genServices, filterFilter, $filter) {

    	genServices.getProjects()
            .then(function (result) {
				console.log(result);
                $scope.projects = result.data;
           
            })
            .catch(function (err) {
                console.log('Error geting projects list!');
        	});
        
    };


    // Injecting modules used for better minifing later on
    ProjectListCtrl.$inject = ['$scope', 'genServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('ProjectListCtrl', ProjectListCtrl);
}());