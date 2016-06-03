/**
 * Create the controller
 */
(function() {
    var mylistllCtrl = function($scope, listllServices, genServices, userServices, llServices, filterFilter, $filter) {

      $scope.sortType = 'title';
      $scope.statusString = "approved";
      $scope.llsPerPage = 10;
      $scope.currentPage = 1;
      console.log('Page loaded.');
	  
	   var manager = null;
	  
	  $scope.localLang = {
            selectAll       : "Tick all",
            selectNone      : "Tick none",
            reset           : "Undo all",
            search          : "Type here to search...",
            nothingSelected : "Nothing is selected"
        }
	  
	  genServices.getTechnologies()
            .then(function (techs) {
                $scope.technologies = techs.data;
            })
            .catch(function (err) {
              
            });

      userServices.logged()
          .then(function(result) {
              console.log('User data loaded.');
              $scope.user = result.data;
              $scope.userid = result.data.idusers;
			  managerid = result.data.idusers;
			  manager = result.data.name;
			  
			  genServices.getProjectsByManager(managerid)
                    .then(function (projects) {
                        $scope.projects = projects.data;
                    })
                    .catch(function (err) {
                        $scope.items.push("Field projects: " + err.data);
                    });

            listllServices.getAllLessonsByUser($scope.userid)
            .then(function(result) {
                $scope.lessons = result.data;
                 var count = 0;
                angular.forEach($scope.lessons, function (lesson) {
					$scope.lessons[count].creationdate=$filter('date')(new Date($scope.lessons[count].creationdate), 'dd.MM.yyyy');
                    if(lesson.client == null){
                     $scope.lessons[count].client = 'Altran';
                    }
                    if(lesson.project == null){
                     $scope.lessons[count].project = 'No Project';
                    }
                    if(lesson.sector == null){
                     $scope.lessons[count].sector = 'No Sector';
                    }
                    count++;
                });

            })
            .catch(function(err) {
                $scope.lessons = null;
            });


          })
          .catch(function(err) {
              console.log('User error.');
              console.log(err);
          });

      $scope.Status = function(status) {
          return function(lesson) {
              if ($scope.statusString == "approved") {
                  return lesson.status == 'approved';
              } else if ($scope.statusString == "submitted") {
                  return lesson.status == 'submitted';
              } else if ($scope.statusString == "inactive") {
                  return lesson.status == 'inactive';
              } else if ($scope.statusString == "draft") {
                  return lesson.status == 'draft';
              }
          }

      };

      $scope.fieldTable = [{
          field: "approved",
          title: "Approved"
      }, {
          field: "inactive",
          title: "Inactive"
      }, {
          field: "submitted",
          title: "Pending approval"
        }, {
          field: "draft",
          title: "Draft"
        }];

      $scope.selected = $scope.fieldTable[0];

      $scope.hasChanged = function() {
          $scope.statusString=$scope.selected.field;
      };

	  
	  $scope.createLesson = function(lesson) {

	

            var ll = 
             {
                 "project": lesson.project,
                 "technologies": lesson.technologies,
                 "actionTaken": "",
                 "situation": "",
                 "result": "",
                 "maker": manager,
                 "status": 'draft'
             };

            llServices.createLL(ll)
                .then(function (result) {
					window.location="/view_ll/" + result.data.insertId;
                })
                .catch(function (err) {
					bootbox.alert("Failed to save Lesson Learned.");
                });
        }    



    };


    // Injecting modules used for better minifing later on
    mylistllCtrl.$inject = ['$scope', 'listllServices', 'genServices', 'userServices', 'llServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('mylistllCtrl', mylistllCtrl);
}());
