
/**
* Create the controller for the user list page
*/
(function(){

	var  UserListCtrl = function($scope, $route, $uibModal, $log, services, filterFilter) {

		$scope.itemsPerPage = 3;
        $scope.currentPage = 1;
        $scope.items = [];
        
		services.getUsers()
            .then(function (result) {
                $scope.users = result.data;
				$scope.users.forEach(function(element) {
					element.image="images/"+element.email+".jpg";
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
				$log.info('Modal dismissed at: ' + new Date());
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
    UserListCtrl.$inject = ['$scope', '$route', '$uibModal', '$log', 'adminServices', 'filterFilter'];
    DialogController.$inject = ['$scope', '$uibModalInstance','$window', 'adminServices', 'userServices', 'selectedUser'];

    // Enabling the controllers in the app
    angular.module('lessonslearned')
    	.controller('UserListCtrl', UserListCtrl)
    	.controller('DialogController', DialogController);
}());