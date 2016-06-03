(function(){
	 var  LoginCtrl = function($scope, $location, $translate, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
         $scope.hasSession="";
         $scope.items = [];
		 
		$scope.permission = -1;
	    $scope.login = function(user,remember){
             userServices.login(user, remember)
                .then(function (res) {
                    $scope.items.pop();
                    $scope.items.push();
                     if(res.data.permission=="2")
                        $window.location.href = '/home';
                    else
                        $window.location.href = '/listll';
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data.message);
                    
                });
            
        };
		$scope.redirect = function(){
            if($scope.hasSession.data.permission=="2")
                        $window.location.replace = '/home';
                    else 
                        $window.location.replace = '/listll';
        };
        $scope.redirect2 = function(){
            $window.location.href = '/';
        };
		$scope.hasAdminLevel = function() {
			return $scope.permission <= 2;
		}
		
		$scope.hasSubLevel = function() {
			return $scope.permission <= 1;
		}

        
         $scope.logged = function(){
            userServices.logged()
                .then(function(res){
                    $scope.hasSession=res;
					$scope.permission=res.data.permission;
                    $scope.hasSession.logged=true;
					$scope.redirect();
                })
                .catch( function (err){
                    $scope.hasSession.logged=false;
                });
                
        };
        $scope.logout = function(){
            userServices.logout();
        };
         $scope.pop = function () {
            $scope.items.pop();
        };
        
		$scope.logged();
        $scope.qq = function(){
            console.log($scope.hasSession);
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
        $scope.getPath = function() {
			return $location.$$path;
		 }
           $scope.changeLanguage = function (key) {
            $translate.use(key);    
			$scope.convertLang();
        };
       
	 };
	 // Injecting modules used for better minifing later on
    LoginCtrl.$inject = ['$scope', '$location', '$translate', '$routeParams', '$window', 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('LoginCtrl', LoginCtrl);
}());