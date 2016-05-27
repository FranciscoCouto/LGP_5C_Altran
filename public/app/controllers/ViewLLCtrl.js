/**
* Create the controller for the Admin Home Page
*/
(function(){
	var  ViewLLCtrl = function($scope, $location, lessonServices, userServices) {

		console.log('ViewLLCtrl loaded.');
		
		$scope.permission = -1;
		$scope.llstatus = "unknown";
		var userid;
		 userServices.logged()
		.then(function(res){
			userid = res.data.idusers;
			$scope.permission=res.data.permission;
		})
		.catch( function (err){
			console.log(err);
			$location.path("/forbidden");
		});

		
		lessonServices.getLesson()
			.then(function (res) {
			
			$scope.lldata = res.data[0];

			if ($scope.lldata == null) {
				console.log("Invalid LL id.");
				$location.path("/forbidden");
				return;
			} 

			console.log("DATA: " + JSON.stringify($scope.lldata));
			$scope.lldata.project = $scope.lldata.project? $scope.lldata.project : 'Altran';
			$scope.lldata.client = $scope.lldata.client? $scope.lldata.client : 'Altran';
			$scope.llstatus = $scope.lldata["status"];
		

			if ($scope.llstatus == "draft") {
				$('#llstatus').css("background-color", "#f0ad4e");
			} else if ($scope.llstatus == "submitted") {
				$('#llstatus').css("background-color", "#5bc0de");
			} else if ($scope.llstatus == "approved") {
				$('#llstatus').css("background-color", "#5cb85c");
			} else if ($scope.llstatus == "inactive") {
				$('#llstatus').css("background-color", "#d9534f");
			}
		
		})
		.catch(function (err) {
			console.log(err.data);
			$location.path("/forbidden");
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
							$('#llstatus').text("Draft");
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

		$scope.saveDraft = function() {
			console.log("Saving draft...");

			var ll = 
			 {
				 "idlesson": $scope.lldata["idLessonsLearned"],
				 "action": $scope.lldata.action,
				 "situation": $scope.lldata.situation,
				 "result": $scope.lldata.result,
				 "manager": userid
			 };

			userServices.editLLFields(ll)
			.then(function (res) {
				if (res.status != 200) {
					bootbox.alert("Failed to save Lesson Learned.");
					console.log("Failed to save draft.");
					return false;
				}
			
				console.log("LL saved as draft!");
				bootbox.alert("Lesson Learned successfully saved.");
				return true;
			})
			.catch( function (err){
				console.log(err);
			});
		}
		
		$scope.submitDraft = function() {
		
			if (!$scope.saveDraft) {
				bootbox.alert("Failed to submit Lesson Learned.");
				return;
			}
			
			bootbox.confirm("Are you sure?", function(result) {	
				if (!result) return;
		
				console.log("Submitting LL...");
				lessonServices.setLessonState($scope.lldata["idLessonsLearned"], "submitted")
				.then(function (res) {
					if (res.status != 200) {
						console.log("Failed to submit LL.");
						return;
					}
				
					console.log("LL submitted!");
					
					$scope.llstatus = "submitted";
					$scope.lldata["status"] = "submitted";
					
					$('#llstatus').css("background-color", "#5bc0de");
					$('#llstatus').text("Submitted");
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
		
	$scope.PDFclick = function() {
      jsPDF.API.mymethod = function() {
        // 'this' will be ref to internal API object. see jsPDF source
        // , so you can refer to built-in methods like so:
        //   this.line(....)
        //   this.text(....)
      };
      var doc = new jsPDF();
      doc.mymethod();
      var pdfPart1 = $("#viewll").not('[id="btnshi"]')


      var specialElementHandlers = {
        '#loadVar': function(element, renderer) {
          return true;
        }
      };

      doc.fromHTML(pdfPart1.html(), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      });

      doc.setFont("courier");

	doc.setProperties({
	    title: 'Lesson Learned Export',
	    author: 'Altran'

	});


      doc.output('save', 'Download.pdf');
    


    };
		
		
	
		

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', '$location', 'lessonServices' , 'userServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned')
    	.controller('ViewLLCtrl', ViewLLCtrl)
    	.filter('capitalize', function() {
		    return function(input, all) {
		      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
		      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
		    }
		 });
}());

