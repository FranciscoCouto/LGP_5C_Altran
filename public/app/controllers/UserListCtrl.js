
/**
* Create the controller for the user list page
*/
(function(){

	var  UserListCtrl = function($scope,$window, $route, $uibModal, $log, userServices, services, filterFilter, $filter, adminServices) {

		$scope.itemsPerPage = 5;
        $scope.currentPage = 1;
        $scope.items = [];
		var image;
		
		$scope.addUser = function(user){

			if (user.password != user.rpassword) {
				bootbox.alert("Password does not match confirmation.");
				return;
			}
			if (image == null) {
				bootbox.alert("Image missing.");
				return;
			}
			
            //alert(image);
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
                    $window.refresh();
                })
                .catch(function (err) {
                     console.log(err.data);
                });
                
        };
		
		
        $scope.changeFile = function(files){
             
            image=files[0];
        };

		services.getUsers()
            .then(function (result) {
                $scope.users = result.data;
				$scope.users.forEach(function(element) {
					element.image="images/"+element.email+".png";
				}, this);
                $scope.items.pop();
                $scope.items.push();
                $scope.$watch('search.filter', function (term) {
                    var obj = { name: term }

                    $scope.filteredUsers = filterFilter($scope.users, obj);
                    $scope.currentPage = 1;
                });
            })
            .catch(function (err) {
                $scope.items.pop();
               	$scope.items.push(err.data);
        	});

        $scope.pop = function () {
            $scope.items.pop();
        };

		$scope.editUser = function(user) {
			console.log("Modal opened.");
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'usersTpl',
				controller: 'DialogController',
				resolve: {
					selectedUser: function () {
						return user;
					}
				}
			});

			modalInstance.result.then(function (selectedUser) {
				$route.reload();
			}, function () {
	
			});
		}

		$scope.removeUser = function(user) {
			
			bootbox.confirm($filter('translate')("AREYOUSURE"), function(result) {	
				if (!result) return;
				
				var adminid;
				userServices.logged()
				.then(function(res){
					adminid = res.data.idusers;
					var info = {
						userid: user.idusers,
						adminid: adminid
					};
					services.removeUser(info)
						.then(function (res) {
							bootbox.alert($filter('translate')("DELETEUSERSUCCESS"));
							$route.reload();
						})
						.catch( function (err){
							bootbox.alert($filter('translate')(err.data.message));
						});
				})
				.catch( function (err){
					$location.path("/forbidden");
				});

			}); 
			
		}

	};

	//Modal Controller
	var DialogController = function ($scope, $uibModalInstance, $window, services, userServices, selectedUser) {
			
		$scope.selectedItem = selectedUser.idusers;
		$scope.username = selectedUser.name;
		var permission = (selectedUser.permission == 0)? 'reader' : ((selectedUser.permission == 1)? 'submitter' : 'admin');
		$scope.mydata = { 
			name: selectedUser.name, 
			email: selectedUser.email, 
			permission: permission, 
			permissionid: selectedUser.permission 
		};
		var adminemail = null;
		$scope.items = [];

		//get current admin email
		userServices.logged()
            .then(function (result) {
                adminemail = result.data.email;
            })
            .catch(function (err) {
                while ($scope.items.length > 0) {
                    $scope.items.pop();
                }
                $scope.items.push(err.data);
        });

		$scope.submit = function(mydata) {
			var changeinfo = false;
			if(mydata.name != selectedUser.name || mydata.email != selectedUser.email || mydata.permissionid != selectedUser.permission) {
				changeinfo = true;
			}

			var changepass = mydata.changepassword == 'yes'? true : false;

			while ($scope.items.length > 0) {
                $scope.items.pop();
            }

            var info = {
				oldemail: selectedUser.email,
				idusers: selectedUser.idusers,
				name: mydata.name,
				email: mydata.email,
				permissionid: mydata.permissionid,
				password: mydata.password,
				passwordagain: mydata.passwordagain,
				confirmpass: mydata.confirmpass,
				adminemail: adminemail
			}

			//change user name, email, permissions
			if(changeinfo) {
				services.edition(info)
	            .then(function (result) {
	            	if(changepass){ //change the password as well
						if(mydata.password == mydata.passwordagain) {
							services.updateUserPass(info)
				            .then(function (result) {
				                $uibModalInstance.close('ok');
				            })
				            .catch(function (err) {
				                $scope.items.push(err.data);
				        	});
						}
						else {
			                $scope.items.push("Passwords don't match.");
						}
					}
					else {
						$uibModalInstance.close('ok');
					}
	            })
	            .catch(function (err) {
	                $scope.items.push(err.data.message);
	        	});
			}
			//just change the password
			else if(changepass){
				if(mydata.password == mydata.passwordagain) {
					services.updateUserPass(info)
		            .then(function (result) {
		                $uibModalInstance.close('ok');
		            })
		            .catch(function (err) {
		                $scope.items.push(err.data.message);
		        	});
				}
				else {
	                $scope.items.push("Passwords don't match.");
				}
			} 
			else {
				$uibModalInstance.close('ok');
			}			
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.pop = function () {
            $scope.items.pop();
        };
	};

	 // Injecting modules used for better minifing later on
    UserListCtrl.$inject = ['$scope', '$window', '$route', '$uibModal', '$log', 'userServices', 'adminServices', 'filterFilter', '$filter', 	'adminServices'];
    DialogController.$inject = ['$scope', '$uibModalInstance','$window', 'adminServices', 'userServices', 'selectedUser'];

    // Enabling the controllers in the app
    angular.module('lessonslearned')
    	.controller('UserListCtrl', UserListCtrl)
    	.controller('DialogController', DialogController);
}());