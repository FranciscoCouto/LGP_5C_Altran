(function(){
	 var  Create_projCtrl = function($scope, $filter, $window, genServices) {

		 console.log('Page loaded.');

        $scope.managers = [];
        $scope.types = [];
        $scope.sectors = [];
        $scope.date = new Date();

        genServices.getManagers()
            .then(function (men) {
                $scope.managers = men.data;
            })
            .catch(function (err) {
                alert(err.data.message);

            });

        genServices.getProjectTypes()
            .then(function (types) {
                $scope.types = types.data;

            })
            .catch(function (err) {
                alert(err.data);
            });

        genServices.getBusinessSectors()
            .then(function (sectors) {
                $scope.sectors = sectors.data;

            })
            .catch(function (err) {
                alert(err.data);
            });

         $scope.addProject = function(project, filter){
            project.dateBeginning = $filter('date')($scope.date.dateBeginning, "yyyy-MM-dd"); // for conversion to string
            project.dateEndExpected = $filter('date')($scope.date.dateEndExpected, "yyyy-MM-dd"); // for conversion to string
            project.dateEnd = $filter('date')($scope.date.dateEnd, "yyyy-MM-dd"); // for conversion to string

            genServices.createProject(project)
                .then(function (res) {
                    alert('Project Created Successfuly!');
                    $window.location.href = '/home';

                })
                .catch(function (err) {
                    console.log('loool');
                    alert(err.data.message);
                    $window.location.href = '/create_project';
                });
         };
            

	 };
	 // Injecting modules used for better minifing later on
    Create_projCtrl.$inject = ['$scope', '$filter', '$window', 'genServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('Create_projCtrl', Create_projCtrl);
}());