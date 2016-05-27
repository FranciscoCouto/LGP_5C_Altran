(function(){
	 var  CreateLLCtrl = function($scope, $window, genServices, llServices, userServices) {

        $scope.technologies = [];
        $scope.projects = [];
        $scope.items = [];
        var manager = null;
        var managerid = null;

        $scope.localLang = {
            selectAll       : "Tick all",
            selectNone      : "Tick none",
            reset           : "Undo all",
            search          : "Type here to search...",
            nothingSelected : "Nothing is selected"
        }

        userServices.logged()
            .then(function (result) {
                manager = result.data.name;
                managerid = result.data.idusers;
                genServices.getProjectsByManager(managerid)
                    .then(function (projects) {
                        $scope.projects = projects.data;
                    })
                    .catch(function (err) {
                        $scope.items.push("Field projects: " + err.data);
                    });
            })
            .catch(function (err) {
                while ($scope.items.length > 0) {
                    $scope.items.pop();
                }
                $scope.items.push(err.data);
            });

        genServices.getTechnologies()
            .then(function (techs) {
                $scope.technologies = techs.data;
            })
            .catch(function (err) {
                $scope.items.push("Field technologies: "+ err.data);
            });

        $scope.pop = function () {
            $scope.items.pop();
        };

        $scope.createLesson = function(lesson, draft) {
            /*alert(lesson.technologies[0].technology + ' ' + lesson.technologies[0].idtechnologies);
            alert(lesson.actionTaken);
            alert(lesson.situation);
            alert(lesson.result);*/

            var status = draft? 'draft' : 'submitted';

            var ll = 
             {
                 "project": lesson.project,
                 "technologies": lesson.technologies,
                 "actionTaken": lesson.actionTaken,
                 "situation": lesson.situation,
                 "result": lesson.result,
                 "maker": manager,
                 "status": status
             };

            llServices.createLL(ll)
                .then(function (result) {
                    $scope.items.pop();
                    $scope.items.push();
                    alert("Inserted "+status);                   
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data);
                });
        }            

	 };
	 // Injecting modules used for better minifing later on
    CreateLLCtrl.$inject = ['$scope', '$window', 'genServices', 'llServices', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('CreateLLCtrl', CreateLLCtrl);
}());