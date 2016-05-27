/**
 * Create the controller
 */
(function() {
    var AuditListCtrl = function($scope, auditServices, filterFilter, $filter) {

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
        
    };


    // Injecting modules used for better minifing later on
    AuditListCtrl.$inject = ['$scope', 'auditServices', 'filterFilter', '$filter'];


    // Enabling the controller in the app
    angular.module('lessonslearned').controller('AuditListCtrl', AuditListCtrl);
}());
