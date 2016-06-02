/**
 * Create the controller
 */
(function() {
    var ProjectListCtrl = function($scope, $route, $uibModal,$log, genServices, filterFilter, $filter) { 

        $scope.sortType = 'name';
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

    	genServices.getProjects()
            .then(function (result) {
				console.log(result);
                $scope.projects = result.data;
           
            })
            .catch(function (err) {
                console.log('Error geting projects list!');
        	});

        $scope.editPM = function(project) {
            console.log("Modal opened.");
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pmTpl',
                controller: 'DialogController3',
                resolve: {
                    selectedProject: function () {
                        return project;
                    }
                }
            });

            modalInstance.result.then(function (project) {
                $route.reload();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        
    };

    var DialogController3 = function ($scope, $uibModalInstance, $window, genServices, selectedProject) {

        $scope.mydata;

        genServices.getManagers()
            .then(function (result) {
                
                $scope.managers = result.data;
           
            })
            .catch(function (err) {
                console.log('Error geting projects list!');
            });

        $scope.selectedItem = selectedProject;
        console.log($scope.selectedItem);

        $scope.submit = function(mydata) {

            var changeinfo = false;
            console.log(selectedProject);
            if(mydata.name != selectedProject.RManager) {
                changeinfo = true;
            }

            var data = {

            managername: mydata.name,
            idproject: selectedProject.idproject

            };

            if(changeinfo) {
                genServices.editProjectManager(data)
                .then(function (result) {
                    console.log('success');
                    $uibModalInstance.close('ok');
                })
                .catch(function (err) {
                    $scope.items.push(err.data.message);
                });
            }else{
                console.log('morreuuu');
                $uibModalInstance.dismiss('cancel');
            }

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        };



    // Injecting modules used for better minifing later on
    ProjectListCtrl.$inject = ['$scope', '$route', '$uibModal','$log', 'genServices', 'filterFilter', '$filter'];
    DialogController3.$inject = ['$scope', '$uibModalInstance','$window','genServices', 'selectedProject'];


    // Enabling the controller in the app
    angular.module('lessonslearned')
    .controller('ProjectListCtrl', ProjectListCtrl)
    .controller('DialogController3', DialogController3);
}());