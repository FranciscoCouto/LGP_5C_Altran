/**
 * Create the controller
 */
(function() {
    var mylistllCtrl = function($scope,listllServices, userServices, filterFilter, $filter) {

      $scope.sortType = 'title';
      $scope.statusString = "active";
      console.log('Page loaded.');

      userServices.logged()
          .then(function(result) {
              console.log('User data loaded.');
              $scope.user = result.data;
              console.log(JSON.stringify(result.data));
              $scope.userid = result.data.idusers;


          })
          .catch(function(err) {
              console.log('User error.');
              alert(err);
          });

      listllServices.getAllLessons()
          .then(function(result) {

                  $scope.lessons = $filter('filter')(result.data, {
                      idusers: $scope.userid
                  }, true);


          })
          .catch(function(err) {
              console.log('Lessons List error.');
              alert(err);
          });


      $scope.Status = function(status) {
          return function(lesson) {
              console.log("estado clicado:" + $scope.statusString);

              if ($scope.statusString == "active" || $scope.isAdmin==0) {
                  return lesson.status == 'active';
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
          field: "active",
          title: "Active"
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
