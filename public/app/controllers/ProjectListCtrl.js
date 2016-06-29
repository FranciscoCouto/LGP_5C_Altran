/**
 * Create the controller
 */
(function() {
    var ProjectListCtrl = function($scope, $route,$window, $uibModal,$log, genServices, filterFilter, $filter) { 

        $scope.sortType = 'name';
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

    	genServices.getProjects()
            .then(function (result) {
                $scope.projects = result.data;
           
            })
            .catch(function (err) {
                console.log('Error geting projects list!');
        	});
        $scope.updatePR= function(id) {
            
              $scope.projects.forEach(function(element) {
                  if(element.idproject==id){
                      var cenas={'id':id,'finish':element.finish};
                      genServices.setTerminated(cenas)
                            .then(function (result) {
                                if(element.finish=='0'){
                                    element.finish='1';
                                }
                                else{
                                    element.finish='0';
                                }
                            })
                            .catch(function (err) {
                                console.log('Error updating');
                            });
                  }
              }, this);
        
        }
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

         $scope.addProject = function(project){
		 
            project.dateBeginning = $filter('date')($scope.date.dateBeginning, "yyyy-MM-dd"); // for conversion to string
            project.dateEndExpected = $filter('date')($scope.date.dateEndExpected, "yyyy-MM-dd"); // for conversion to string
            project.dateEnd = $filter('date')($scope.date.dateEnd, "yyyy-MM-dd"); // for conversion to string

            genServices.createProject(project)
                .then(function (res) {
                    $window.location.href = '/list_projects';

                })
                .catch(function (err) {
                    $window.location.href = '/list_projects';
                });
         };
        
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

        $scope.submit = function(mydata) {

            var changeinfo = false;
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
                $uibModalInstance.dismiss('cancel');
            }

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        };



    // Injecting modules used for better minifing later on
    ProjectListCtrl.$inject = ['$scope', '$route','$window','$uibModal','$log', 'genServices', 'filterFilter', '$filter'];
    DialogController3.$inject = ['$scope', '$uibModalInstance','$window','genServices', 'selectedProject'];


    // Enabling the controller in the app
    angular.module('lessonslearned')
    .controller('ProjectListCtrl', ProjectListCtrl)
    .controller('DialogController3', DialogController3);
}());