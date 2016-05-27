(function(){
	 var  EditLLCtrl = function($scope, $location, $route, genServices, llServices, lessonServices, userServices) {

        var manager = null;
        var managerid = null;
        var lessonid = null;
        var techs = [];
        $scope.items = [];
        var data;

        var loadTechnologies = function() {
            genServices.getTechnologies()
            .then(function (mytechs) {
                var alltechs = mytechs.data;
                var lessontechs = data.technologies.split(",");
                var checkedtechs = [];
                //checking technologies that this lesson has already
                for(i = 0; i < alltechs.length; i++) {
                    checkedtechs[i] = alltechs[i];
                    checkedtechs[i].ticked = (lessontechs.indexOf(alltechs[i].technology) < 0)? false : true;
                }
                var lesson_name = !data.project? "Altran_"+data.idLessonsLearned : data.project+"_"+data.idLessonsLearned;
                $scope.lesson = {
                    name: lesson_name,
                    technologies: checkedtechs, 
                    situation: data.situation, 
                    actionTaken: data.action, 
                    result: data.result 
                };

            })
            .catch(function (err) {
                $scope.items.push("Field technologies: "+ err.data);
            });
        }

        var confirmAuth = function() {
            userServices.logged()
            .then(function (result) {
                manager = result.data.name;
                managerid = result.data.idusers;
                //check if this manager has this lesson
                genServices.getManagerLesson(managerid)
                    .then(function (ll) {
                        if(ll.data.length <= 0) {
                            $location.path('/forbidden');
                        }
                        else {
                            console.log(JSON.stringify(ll.data));
                            data = ll.data[0];
                            lessonid = data.idLessonsLearned;
                            $scope.llstatus = data.status;
                            loadTechnologies();
                        }
                    })
                    .catch(function (err) {
                        $scope.items.push(err.data);
                    });
            })
            .catch(function (err) {
                while ($scope.items.length > 0) {
                    $scope.items.pop();
                }
                $scope.items.push(err.data);
            });
        }

        $scope.loadLL = function() {
            confirmAuth();
        }
        
        $scope.loadLL();

        $scope.localLang = {
            selectAll       : "Tick all",
            selectNone      : "Tick none",
            reset           : "Undo all",
            search          : "Type here to search...",
            nothingSelected : "Nothing is selected"
        }

        $scope.pop = function () {
            $scope.items.pop();
        };

        $scope.editLesson = function(lesson, draft) {
            $scope.items.pop();
            var status = draft? 'draft' : 'submitted';
            if($scope.llstatus != 'draft' && draft) {
                $scope.items.push("Invalid action.");
                return;
            }

            if($scope.llstatus == 'submitted') {
                $scope.items.push("Invalid action.");
                return;
            }

            var updatestate = ($scope.llstatus != status)? true : false;

            var ll = 
             {
                 "idlesson": lessonid,
                 "technologies": lesson.techs,
                 "action": lesson.actionTaken,
                 "situation": lesson.situation,
                 "result": lesson.result,
                 "maker": manager,
                 "state": status
             };

            userServices.editLL(ll, updatestate)
                .then(function (result) {
                    $scope.items.pop();
                    $scope.items.push();
                    $route.reload();               
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data.message);
                });
        }           

	 };
	 // Injecting modules used for better minifing later on
    EditLLCtrl.$inject = ['$scope', '$location', '$route', 'genServices', 'llServices', 'lessonServices', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('EditLLCtrl', EditLLCtrl);
}());