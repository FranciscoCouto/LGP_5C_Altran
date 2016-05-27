/**
* Create the controller for the Admin Home Page
*/
(function(){
	var  ViewLLCtrl = function($scope, $location, lessonServices, userServices) {

		console.log('ViewLLCtrl loaded.');
		
		$scope.permission = -1;
		$scope.llstatus = "unknown";
		
		 userServices.logged()
		.then(function(res){
			$scope.permission=res.data.permission;
		})
		.catch( function (err){
			console.log(err);
		});

		
		lessonServices.getLesson()
			.then(function (res) {
			
			$scope.lldata = res.data[0];

			if ($scope.lldata == null) {
				console.log("Invalid LL id.")
				return;
			} 

			console.log($scope.lldata);
			$("#lltitle").text($scope.lldata["project"]);
			$("#llclient").text($scope.lldata["client"]);
			$("#llsituation").text($scope.lldata["situation"]);
			$("#llaction").text($scope.lldata["action"]);
			$("#llresults").text($scope.lldata["result"]);
			$("#llmanager").text($scope.lldata["manager"]);
			$("#lldimension").text($scope.lldata["numberConsultants"]);
			$("#llstart").text($scope.lldata["dateBeginning"].substring(0,10));
			$("#llexpected").text($scope.lldata["dateEndExpected"].substring(0,10));
			$("#llfinish").text($scope.lldata["dateEnd"].substring(0,10));
			$("#lltech").text($scope.lldata["technologies"]);

			$("#llfeed").text($scope.lldata["feedback"]);
			$scope.llstatus = $scope.lldata["status"];
			
			if (!$scope.isDraft()) $("#llfeedp").hide();

			if ($scope.llstatus == "draft") {
				$('#llstatus').css("background-color", "#f0ad4e");
				$('#llstatus').text("Draft");
			} else if ($scope.llstatus == "submitted") {
				$('#llstatus').css("background-color", "#5bc0de");
				$('#llstatus').text("Submitted");
			} else if ($scope.llstatus == "approved") {
				$('#llstatus').css("background-color", "#5cb85c");
				$('#llstatus').text("Approved");
			} else if ($scope.llstatus == "inactive") {
				$('#llstatus').css("background-color", "#d9534f");
				$('#llstatus').text("Inactive");
			}
		
		})
		.catch(function (err) {
			console.log(err.data);
		});
		
		$scope.adminApprove = function() {
			bootbox.confirm("Are you sure?", function(result) {	
				if (!result) return;
				console.log("Approving LL...");
				lessonServices.setLessonState($scope.lldata["idLessonsLearned"], "approved")
				.then(function (res) {
					if (res.status != 200) {
						console.log("Failed to approve LL.");
						return;
					}
				
					console.log("LL approved!");
					
					$scope.llstatus = "approved";
					$scope.lldata["status"] = "approved";
					
					$('#llstatus').css("background-color", "#5cb85c");
					$('#llstatus').text("Approved");
				})
				.catch( function (err){
					console.log(err);
				});
			}); 
		}
		
		$scope.adminReject = function() {
			 bootbox.prompt({
				title: "Feedback for rejection:",
				value: "",
				callback: function(result) {
					if (result === null) {
						;
					} else {
						lessonServices.setLessonState($scope.lldata["idLessonsLearned"], "draft")
						.then(function (res) {
							if (res.status != 200) {
								console.log("Failed to reject LL.");
								return;
							}
							lessonServices.setLessonFeedback($scope.lldata["idLessonsLearned"], result)
							.then(function (res) {
							if (res.status != 200) {
								console.log("Failed to send feedback.");
								return;
							}

							console.log("Feedback set!");
							

						})
						.catch( function (err){
							console.log(err);
						});
							console.log("LL rejected!");

							$scope.llstatus = "draft";
							$scope.lldata["status"] = "draft";
							
							$('#llstatus').css("background-color", "#f0ad4e");
							$('#llstatus').text("draft");
						})
						.catch( function (err){
							console.log(err);
						});
					}
				}
			});
		}
		
		$scope.adminDisable = function() {
			bootbox.confirm("Are you sure?", function(result) {	
				if (!result) return;
				console.log("Disabling LL...");
				lessonServices.setLessonState($scope.lldata["idLessonsLearned"], "inactive")
				.then(function (res) {
					if (res.status != 200) {
						console.log("Failed to disable LL.");
						return;
					}
				
					console.log("LL disabled!");
					
					$scope.llstatus = "inactive";
					$scope.lldata["status"] = "inactive";
					
					$('#llstatus').css("background-color", "#d9534f");
					$('#llstatus').text("Inactive");
				})
				.catch( function (err){
					console.log(err);
				});
			}); 
		}
		
		
		$scope.adminEnable = function() {
			bootbox.confirm("Are you sure?", function(result) {	
				if (!result) return;
				console.log("Enabling LL...");
				lessonServices.setLessonState($scope.lldata["idLessonsLearned"], "approved")
				.then(function (res) {
					if (res.status != 200) {
						console.log("Failed to enable LL.");
						return;
					}
				
					console.log("LL enabled!");
					
					$scope.llstatus = "approved";
					$scope.lldata["status"] = "approved";
					
					$('#llstatus').css("background-color", "#5cb85c");
					$('#llstatus').text("Approved");
				})
				.catch( function (err){
					console.log(err);
				});
			}); 
		}
		
		$scope.loadLL = function() {
			$scope.getLesson();
		}
		
		$scope.isDnS = function() {
			return $scope.isDraft() && $scope.isSubmitter();
		}

		$scope.isAdmin = function() {
			return $scope.permission == 2;
		}
		
		$scope.isSubmitter = function() {
			return $scope.permission == 1;
		}
		
		$scope.isDraft = function() {
			return $scope.llstatus == "draft";
		}
		
		$scope.isSubmitted = function() {
			return $scope.llstatus == "submitted";
		}
		
		$scope.isApproved = function() {
			return $scope.llstatus == "approved";
		}
		
		$scope.isInactive = function() {
			return $scope.llstatus == "inactive";
		}
		
		$scope.isAdminAndSubmitted = function() {
			return $scope.isAdmin() && $scope.isSubmitted();
		}	
		
		$scope.isDnS = function() {
			return $scope.isDraft() && $scope.isSubmitter();
		}
		
		$scope.isAdminAndApproved = function() {
			return $scope.isAdmin() && $scope.isApproved();
		}
		
		$scope.isAdminAndInactive = function() {
			return $scope.isAdmin() && $scope.isInactive();
		}
		
		
		
	
		

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', '$location', 'lessonServices' , 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('ViewLLCtrl', ViewLLCtrl);
}());

