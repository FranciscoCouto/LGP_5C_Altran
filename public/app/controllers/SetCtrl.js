(function() {
    var SetCtrl = function($scope, $routeParams, $window, adminServices, genServices) {

        console.log('Settings page loaded.');
        $scope.techValues = [];
        $scope.typeValues = [];
        $scope.sectorValues = [];
        genServices.getTechnologies()
            .then(function(result) {

                $scope.technologies = result.data;
                i = 0;
                angular.forEach($scope.technologies, function(technology) {
                    $scope.techValues[i] = {
                        "text": technology.technology,
                        "techid": technology.idtechnologies
                    };
                    i++;
                });

                $scope.newTech = $scope.techValues;



            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        genServices.getProjectTypes()
            .then(function(result) {

                $scope.types = result.data;
                i=0;
                angular.forEach($scope.types, function(type) {
                    $scope.typeValues[i]={
                      "text":type.name,
                      "typeid":type.idType
                    }
                    i++;
                });

                
                $scope.newType = $scope.typeValues;


            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        genServices.getBusinessSectors()
            .then(function(result) {

                $scope.sectors = result.data;
                i=0;
                angular.forEach($scope.sectors, function(sector) {
                    $scope.sectorValues[i]={
                      "text":sector.name,
                      "sectorid":sector.idSector
                    }
                    i++;
                });


                $scope.newSector = $scope.sectorValues;



            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        $scope.addTech = function() {

            

            genServices.getTechnologies()
                .then(function(result) {
                    $scope.technologies = result.data;
                    for (var i = 0, lenInput = $scope.newTech.length; i < lenInput; i++) {
                        for (var j = 0, lenDB = $scope.technologies.length; j < lenDB; j++) {
                            if ($scope.technologies[j].technology === $scope.newTech[i].text) {
                                console.log('Test next input, breaking.');
                                break;
                            }
                            if (j === $scope.technologies.length - 1) {
                                adminServices.insertTech({
                                    "technology": $scope.newTech[i].text
                                });
                                console.log("tech added");
                            }
                        }
                    }
                })
                .catch(function(err) {
                    console.log('Fetch technologies error.');
                    alert(err);
                });

        };

        $scope.addType = function() {


            genServices.getProjectTypes()
                .then(function(result) {
                    $scope.types = result.data;
                    for (var i = 0, lenInput = $scope.newType.length; i < lenInput; i++) {
                        for (var j = 0, lenDB = $scope.types.length; j < lenDB; j++) {
                            if ($scope.types[j].name === $scope.newType[i].text) {
                                console.log('Test next input, breaking.');
                                break;
                            }
                            if (j === $scope.types.length - 1) {
                                adminServices.insertType({
                                    "projecttype": $scope.newType[i].text
                                });
                                console.log("type added");
                            }
                        }
                    }

                })
                .catch(function(err) {
                    console.log('Fetch types error.');
                    alert(err);
                });

        };

        $scope.addSector = function() {


            genServices.getBusinessSectors()
                .then(function(result) {
                    $scope.sectors = result.data;
                    for (var i = 0, lenInput = $scope.newSector.length; i < lenInput; i++) {
                        for (var j = 0, lenDB = $scope.sectors.length; j < lenDB; j++) {
                            if ($scope.sectors[j].name === $scope.newSector[i].text) {
                                console.log('Test next input, breaking.');
                                break;
                            }
                            if (j === $scope.sectors.length - 1) {
                                adminServices.insertSector({
                                    "sector": $scope.newSector[i].text
                                });
                                console.log("sector added");
                            }
                        }
                    }

                })
                .catch(function(err) {
                    console.log('Fetch types error.');
                    alert(err);
                });

        };

        $scope.techRemoved = function(tag) {
            adminServices.deleteTech({
                "idtech": tag.techid
            });
        };
        $scope.typeRemoved = function(tag) {
            adminServices.deleteType({
                "idtype": tag.typeid
            });
        };
        $scope.sectorRemoved = function(tag) {
            adminServices.deleteSector({
                "idsector": tag.sectorid
            });
        };





    };
    // Injecting modules used for better minifing later on
    SetCtrl.$inject = ['$scope', '$routeParams', '$window', 'adminServices', 'genServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('SetCtrl', SetCtrl);
}());
