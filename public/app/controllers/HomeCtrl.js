(function(){
	 var  HomeCtrl = function($scope,$translate, $routeParams, $window, userServices) {

		 console.log('Page loaded.');

		 $scope.hasSession="";

         $scope.lang = $translate.use();

		 $scope.logged = function(){
            userServices.logged()
                .then(function(res){
                    $scope.hasSession=res;
                    $scope.hasSession.logged=true;
                })
                .catch( function (err){
                    $scope.hasSession.logged=false;
                });
        };

        $scope.logout = function(){
            userServices.logout();
        };

        $scope.logged();

        $scope.changeLanguage = function (key) {
            document.getElementById('langs').innerHTML='<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span> '+ key;
            $translate.use(key);    
        };

	 };
	 // Injecting modules used for better minifing later on
    HomeCtrl.$inject = ['$scope','$translate', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('HomeCtrl', HomeCtrl);
}());