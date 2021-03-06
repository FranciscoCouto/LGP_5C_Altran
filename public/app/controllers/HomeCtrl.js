(function(){
	 var  HomeCtrl = function($scope, $location, $translate, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
		  $scope.logged = function(){
            userServices.logged()
                .then(function(res){
                    $scope.hasSession=res;
                    $scope.hasSession.logged=true;
                })
                .catch( function (err){
					if(getPath()!="/" && getPath()!="/forbidden")
						window.location.replace("/");
                    $scope.hasSession.logged=false;
                });
        };
$scope.logged();
         $scope.pop = function () {
            $scope.items.pop();
        };
		 $scope.hasSession="";
		         $scope.redirect2 = function(){
            $window.location.href = '/';
        };
		 getPath = function() {
			return $location.$$path;
		 }

		

        $scope.logout = function(){
            userServices.logout();
        };
		
		$scope.convertLang = function() {
			var lang = $translate.use();
			if (lang == 'en') {
				$("#langs").html("<span class='glyphicon glyphicon-triangle-bottom' aria-hidden='true'></span> <img src='images/uk.png'></img>");
			} else if (lang == 'pt') {
				$("#langs").html("<span class='glyphicon glyphicon-triangle-bottom' aria-hidden='true'></span> <img src='images/portugal.png'></img>");
			} else if (lang == 'fr') {
				$("#langs").html("<span class='glyphicon glyphicon-triangle-bottom' aria-hidden='true'></span> <img src='images/france.png'></img>");
			}
		};
        

        $scope.changeLanguage = function (key) {
            $translate.use(key);    
			$scope.convertLang();
        };

	 };
	 // Injecting modules used for better minifing later on
    HomeCtrl.$inject = ['$scope', '$location', '$translate', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('HomeCtrl', HomeCtrl);
}());