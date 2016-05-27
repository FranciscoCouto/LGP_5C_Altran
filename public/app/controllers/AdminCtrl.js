(function(){
	 var  AdminCtrl = function($scope, $routeParams, $window, adminServices, userServices) {


		 console.log('Page loaded.');
         var image;
         $scope.hasSession="";

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


         $scope.addUser = function(user){

             alert(user.image);
             if(user.permission==null)
                user.permission="0";

             var fd = new FormData();   
             fd.append("image", image);
             fd.append("email", user.email);
             fd.append("name", user.name);
             fd.append("password", user.password);
             fd.append("permission", user.permission);

             adminServices.registerUser(fd)
                .then(function (res) {
                    alert(res);
                })
                .catch(function (err) {
                    alert(err.data.message);
                });
                
         };
          $scope.changeFile = function(files){
            image=files[0];
            
        };
	    

	 };
	 // Injecting modules used for better minifing later on
    AdminCtrl.$inject = ['$scope', '$routeParams', '$window','adminServices','userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('AdminCtrl', AdminCtrl);
}());