/**
 * Create the controller
 */
(function() {
    var AuditListCtrl = function($scope, $uibModal,$log, auditServices, filterFilter, $filter) {

    	auditServices.getAudit()
            .then(function (result) {

            	var data = result.data[0];
				
				if (data == null) {
					console.log("Invalid LL id.")
					return;
				} 

				console.log(data);

                $scope.audits = result.data;
           
            })
            .catch(function (err) {
                console.log('Error geting audit for ll');
        	});

        $scope.viewAudit = function(audit) {
            console.log("Modal opened.");
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'auditTpl',
                controller: 'DialogController2',
                resolve: {
                    selectedAudit: function () {
                        return audit;
                    }
                }
            });

            modalInstance.result.then(function (selectedAudit) {
                $route.reload();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        
    };

    var DialogController2 = function ($scope, $uibModalInstance, $window, selectedAudit) {
            
        $scope.selectedItem = selectedAudit;
        console.log($scope.selectedItem);
    };

    // Injecting modules used for better minifing later on
    AuditListCtrl.$inject = ['$scope', '$uibModal','$log', 'auditServices', 'filterFilter', '$filter'];
    DialogController2.$inject = ['$scope', '$uibModalInstance','$window', 'selectedAudit'];

    // Enabling the controller in the app
    angular.module('lessonslearned')
        .controller('AuditListCtrl', AuditListCtrl)
        .controller('DialogController2', DialogController2);
}());
