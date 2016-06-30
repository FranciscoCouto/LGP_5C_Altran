/**
 * Create the controller
 */
(function() {
    var listllCtrl = function($scope, listllServices, userServices, filterFilter, $filter, $window) {
        $scope.isAdmin = 0;
        $scope.sortType = 'title';
        $scope.statusString = "all";
        $scope.llsPerPage = 5;
        $scope.currentPage = 1;
        console.log('Page loaded.');

        userServices.logged()
            .then(function(result) {
                $scope.user = result.data;
                if (result.data.permission == 2) {
                    $scope.isAdmin = 1;
                }

            })
            .catch(function(err) {
                $window.location.href = '/forbidden';
            });

        listllServices.getAllLessons()
            .then(function(result) {
                if ($scope.isAdmin == 1) {
                    $scope.lessons = result.data;
                    var count = 0;
                    angular.forEach($scope.lessons, function (lesson) {
						$scope.lessons[count].creationdate=$filter('date')(new Date($scope.lessons[count].creationdate), 'dd.MM.yyyy');
                        if(lesson.client == null){
                         $scope.lessons[count].client = 'Altran';
                        }
                        if(lesson.title == null){
                         $scope.lessons[count].title = 'No Project';
                        }
                        if(lesson.sector == null){
                         $scope.lessons[count].sector = 'No Sector';
                        }
                        count++;
                    });

                } else {
                    $scope.lessons = $filter('filter')(result.data, {
                        status: "approved"
                    }, true);
                     var count = 0;
                    angular.forEach($scope.lessons, function (lesson) {
						$scope.lessons[count].creationdate=$filter('date')(new Date($scope.lessons[count].creationdate), 'dd.MM.yyyy');
                        if(lesson.client == null){
                         $scope.lessons[count].client = 'Altran';
                        }
                        if(lesson.title == null){
                         $scope.lessons[count].title = 'No Project';
                        }
                        if(lesson.sector == null){
                         $scope.lessons[count].sector = 'No Sector';
                        }
                        count++;
                    });

                    $scope.$watch('search.filter', function (term) {
                        $scope.currentPage = 1;
                    });
                }

            })
            .catch(function(err) {
                $scope.lessons = null;
            });


        $scope.Status = function(status) {
            return function(lesson) {
                if ($scope.statusString == "approved" || $scope.isAdmin==0) {
                    return lesson.status == 'approved';
                } else if ($scope.statusString == "submitted") {
                    return lesson.status == 'submitted';
                } else if ($scope.statusString == "inactive") {
                    return lesson.status == 'inactive';
                }
                else{
                    return lesson.status;
                }
            }

        };

        $scope.Slider = function(budget) {
            return function(lesson) {
              if($scope.minRangeSlider.maxValue!=101){
                return (lesson.budget >= $scope.minRangeSlider.minValue && lesson.budget <= $scope.minRangeSlider.maxValue);
              }
              else{
                return (lesson.budget >= $scope.minRangeSlider.minValue);
              }

            }

        };

        $scope.isEmpty = function(value){
            return (value == "" || value == null);
        };

        $scope.fieldTable = [{
		    field: "all",
            title: $filter('translate')("ALL")
        }, {
            field: "approved",
            title: $filter('translate')("APPROVED")
        }, {
            field: "inactive",
            title: $filter('translate')("INACTIVE")
        }, {
            field: "submitted",
            title: $filter('translate')("PENDING")

        }];

        $scope.selected = $scope.fieldTable[0];

        $scope.minRangeSlider = {
        minValue: 10,
        maxValue: 90,
        scale:0.1,
        options: {
            floor: 0,
            ceil: 101,
            step: 1
        }
    };


        $scope.hasChanged = function() {
            $scope.statusString=$scope.selected.field;
        };




    };


    // Injecting modules used for better minifing later on
    listllCtrl.$inject = ['$scope', 'listllServices', 'userServices', 'filterFilter', '$filter', '$window'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('listllCtrl', listllCtrl);

}());
