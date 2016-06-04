/**
* Create the controller for the Admin Home Page
*/
(function(){
	var  ViewLLCtrl = function($scope,$filter, $location, lessonServices, userServices, auditServices) {

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
		
		$scope.updateTAcount = function() {
			$( window ).load(function() {
				$("textarea").parent().parent().next().text(($(this).val().length) + "/1000");
			});
		}
		
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
					
					auditServices.createAudit($scope.lldata["idLessonsLearned"])
							.then (function(res) {
							})
							.catch( function (err){
							console.log(err);
							});
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
							
							auditServices.createAudit($scope.lldata["idLessonsLearned"])
							.then (function(res) {
							})
							.catch( function (err){
							console.log(err);
							});
							

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
				console.log("LL saved as draft!");
				bootbox.alert("Lesson Learned successfully saved.");
				return true;
			})
			.catch( function (err){
				bootbox.alert("Failed to save Lesson Learned.");
				console.log("Failed to save draft.");
				return false;
			});
		}
		
		$scope.submitDraft = function() {
		
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
				console.log("LL saved as draft!");
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
						bootbox.alert($filter('translate')(err.data.message));
					});
				}); 
				return true;
			})
			.catch( function (err){
				bootbox.alert("Failed to save and submit Lesson Learned.");
				console.log("Failed to save draft.");
				return false;
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

	$scope.deleteDraft = function() {
		bootbox.confirm("Are you sure?", function(result) {	
				if (!result) return;
				console.log("Deleting LL...");
				lessonServices.deleteLesson($scope.lldata["idLessonsLearned"])
				.then(function (res) {
					bootbox.alert("Lesson Learned deleted succesfully.");
					window.location = "/mylistll";
				})
				.catch( function (err){
					bootbox.alert("Failed to delete Lesson Learned.");
				});
				;
			}); 
	}
		
	$scope.exportLL = function() {
		bootbox.dialog({
			  message: "Export as...",
			  buttons: {
				success: {
				  label: "PDF",
				  className: "btn-danger",
				  callback: function() {
					$scope.downloadPdf();
				  }
				},
				danger: {
				  label: "CSV",
				  className: "btn-primary",
				  callback: function() {
					$scope.downloadCSV();
				  }
				},
				main: {
				  label: "XLSX",
				  className: "btn-success",
				  callback: function() {
					$scope.downloadExcel();
				  }
				}
			  }
		});
	}
	
	$scope.ifnullstr = function(input) {
		if (input == null)
			return "n/a";
		return input;
	}
	
	$scope.downloadPdf = function() {
		var docDefinition = {
		content: [
			'Lesson Learned Exporting \n',
			'Altran Technologies, SA \n\n\n\n\n',
		{
		alignment: 'justify',
		columns: [
			  {
				width: '*',
			   text: 'LL Title', 
				style: 'header' 
			  },
			  '\n\n',
			  {
				width: '*',
			   text: 'Client', 
				style: 'header' 
			  },
			  '\n\n',
			  {
				width: '*',
			   text: 'LL Status', 
				style: 'header' 
			  },
			  '\n\n',
				]
			},

		{

		alignment: 'justify',
		columns: [

			  $scope.lldata["project"] + '\n\n',

			  $scope.lldata["client"] + '\n\n' ,

			  $scope.lldata["status"] + '\n\n',
				]
			},
		  
		  {
		   text: 'Situation Description', 
			style: 'header' 
		  },
		  $scope.lldata["situation"] + '\n\n',
		  {
		   text: 'Action Taken', 
			style: 'header' 
		  },
		  $scope.lldata["action"] + '\n\n',
		  {
		   text: 'Result Description', 
			style: 'header' 
		  },
		  $scope.lldata["result"] + '\n\n',
		   {

		alignment: 'justify',
		columns: [
			  {
				width: '*',
			   text: 'Manager', 
				style: 'header' 
			  },
			  {
				width: '*',
			   text: 'Dimension', 
				style: 'header' 
			  },
			  {
				width: '*',
			   text: 'Technologies', 
				style: 'header' 
			  },
				]
			},
		{
		  columns: [

			  $scope.lldata["manager"] + '\n\n',

			  $scope.ifnullstr($scope.lldata["numberConsultants"]) + '\n\n' ,

			  $scope.lldata.technologies + '\n\n',
				]
		},
		 
		 {

		alignment: 'justify',
		columns: [
			  {
				width: '*',
			   text: 'Start Date', 
				style: 'header' 
			  },
			  '\n\n',
			  {
				width: '*',
			   text: 'Expected Finish Date', 
				style: 'header' 
			  },
			  '\n\n',
			  {
				width: '*',
			   text: 'Finish Date', 
				style: 'header' 
			  },
			  '\n\n',
				]
			},
		{
		  columns: [

			  $filter('date')($scope.ifnullstr($scope.lldata["dateBeginning"]), "dd/MM/yyyy") + '\n\n',

			  $filter('date')($scope.ifnullstr($scope.lldata["dateEndExpected"]), "dd/MM/yyyy") + '\n\n',

			  $filter('date')($scope.ifnullstr($scope.lldata["dateEnd"]), "dd/MM/yyyy") + '\n\n',
				]
		},
		
		{

		alignment: 'justify',
		columns: [
			  {
				width: '*',
			   text: 'Delivering Model', 
				style: 'header' 
			  },
			  '\n\n',
			  {
				width: '*',
			   text: 'Type', 
				style: 'header' 
			  },
			  '\n\n',
				]
			},
		{
		  columns: [

			  $scope.lldata["deliveringModel"] + '\n\n',

			  $scope.lldata["type"] + '\n\n',
				]
		},

		],
		styles: {
			header: {
			  fontSize: 14,
			  bold: true
			},
			text: {
			 fontSize: 12,
			  italics: true
			},
			defaultStyle: {
				columnGap: 20,
			}
		}
	  };
		pdfMake.createPdf(docDefinition).download('LL'+$scope.lldata["idLessonsLearned"]+'.pdf');
  };


  $scope.downloadCSV = function() {

  	alasql('SELECT * INTO CSV("LL.csv", {headers:true}) FROM ?',[$scope.lldata]);

  };

   $scope.downloadExcel = function() {

  	alasql('SELECT * INTO XLSX("LL.xlsx", {headers:true}) FROM ?',[$scope.lldata]);

  };

	 };
	 // Injecting modules used for better minifing later on
    ViewLLCtrl.$inject = ['$scope', '$filter', '$location', 'lessonServices' , 'userServices', 'auditServices'];

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

