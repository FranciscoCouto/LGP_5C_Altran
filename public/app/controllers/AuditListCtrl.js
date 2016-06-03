/**
 * Create the controller
 */
(function() {
    var AuditListCtrl = function($scope, $uibModal,$log, auditServices, filterFilter, $filter) {
        $scope.sortType = 'editor';
        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;
    	auditServices.getAudit()
            .then(function (result) {

            	var data = result.data[0];
				
				if (data == null) {
					console.log("Invalid LL id.")
					return;
				} 


                $scope.audits = result.data;
				
				var count=0;
				   angular.forEach($scope.audits, function (audit) {
					 
					   $scope.audits[count].editiondate=$filter('date')(new Date($scope.audits[count].editiondate), 'dd.MM.yyyy');
					   $scope.audits[count].creationdate=$filter('date')(new Date($scope.audits[count].creationdate), 'dd.MM.yyyy');
					   count++;
					 });
           
            })
            .catch(function (err) {
                console.log('Error geting audit for ll');
        	});

        $scope.viewAudit = function(audit) {
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

    var DialogController2 = function ($scope, $uibModalInstance, $window, selectedAudit, $filter) {
            
        $scope.selectedItem = selectedAudit;
        $scope.selectedItem.editiondate = $filter('date')($scope.selectedItem.editiondate,'MM/dd/yyyy');
        console.log($scope.selectedItem);
    };

    // Injecting modules used for better minifing later on
    AuditListCtrl.$inject = ['$scope', '$uibModal','$log', 'auditServices', 'filterFilter', '$filter'];
    DialogController2.$inject = ['$scope', '$uibModalInstance','$window', 'selectedAudit', '$filter'];

    // Enabling the controller in the app
    angular.module('lessonslearned')
        .controller('AuditListCtrl', AuditListCtrl)
        .controller('DialogController2', DialogController2);
}());
