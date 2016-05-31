/**
 * Create the controller
 */
(function() {
    var mylistllCtrl = function($scope,listllServices, userServices, filterFilter, $filter) {

      $scope.sortType = 'title';
      $scope.statusString = "approved";
      console.log('Page loaded.');

      userServices.logged()
          .then(function(result) {
              console.log('User data loaded.');
              $scope.user = result.data;
              console.log(JSON.stringify(result.data));
              $scope.userid = result.data.idusers;
              console.log($scope.userid);

            listllServices.getAllLessonsByUser($scope.userid)
            .then(function(result) {
              console.log(JSON.stringify(result.data));
                $scope.lessons = result.data;

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
              console.log("estado clicado:" + $scope.statusString);

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




    };


    // Injecting modules used for better minifing later on
    mylistllCtrl.$inject = ['$scope', 'listllServices', 'userServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('mylistllCtrl', mylistllCtrl);
}());
