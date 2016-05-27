(function() {
    var SetCtrl = function($scope, $routeParams, $window, adminServices, genServices) {

        console.log('Settings page loaded.');
        $scope.techValues = [];
        $scope.typeValues = [];
        $scope.sectorValues = [];
        genServices.getTechnologies()
            .then(function(result) {

                $scope.technologies = result.data;
                console.log("technologies fetched from db: " + JSON.stringify($scope.technologies));

                angular.forEach($scope.technologies, function(technology) {
                    $scope.techValues.push(technology.technology);
                });

                console.log($scope.techValues);
                $scope.newTech = $scope.techValues;



            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        genServices.getProjectTypes()
            .then(function(result) {

                $scope.types = result.data;
                console.log("types fetched form db: " + JSON.stringify($scope.types));

                angular.forEach($scope.types, function(type) {
                    $scope.typeValues.push(type.name);
                });

                console.log($scope.typeValues);

                $scope.newType = $scope.typeValues;


            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        genServices.getBusinessSectors()
            .then(function(result) {

                $scope.sectors = result.data;
                console.log("sectors fetched from db: " + JSON.stringify($scope.sectors));

                angular.forEach($scope.sectors, function(sector) {
                    $scope.sectorValues.push(sector.name);
                });


                console.log($scope.sectorValues);
                $scope.newSector = $scope.sectorValues;



            })
            .catch(function(err) {
                console.log('Fetch technologies error.');
                alert(err);
            });

        $scope.addTech = function() {

            console.log(JSON.stringify($scope.newTech));


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

            console.log($scope.newType);

            genServices.getProjectTypes()
                .then(function(result) {
                    $scope.types = result.data;
                    angular.forEach($scope.types, function(type) {
                        if (type.name == $scope.newType) {
                            alert("oi la");
                        }


                    });
                    adminServices.insertType({
                        "projecttype": $scope.newType
                    });
                })
                .catch(function(err) {
                    console.log('Fetch types error.');
                    alert(err);
                });

        };

        $scope.addSector = function() {

            console.log($scope.newSector);

            genServices.getBusinessSectors()
                .then(function(result) {
                    $scope.sectors = result.data;
                    angular.forEach($scope.sectors, function(sector) {
                        if (sector.name == $scope.newSector) {
                            alert("oi la");
                        }

                    });
                    adminServices.insertSector({
                        "sector": $scope.newSector
                    });
                })
                .catch(function(err) {
                    console.log('Fetch types error.');
                    alert(err);
                });

        };

        $scope.techRemoved = function(tag) {
            $scope.log.push('Removed: ' + tag.text);
        };
        $scope.typeRemoved = function(tag) {
            $scope.log.push('Removed: ' + tag.text);
        };
        $scope.sectorRemoved = function(tag) {
            $scope.log.push('Removed: ' + tag.text);
        };





    };
    // Injecting modules used for better minifing later on
    SetCtrl.$inject = ['$scope', '$routeParams', '$window', 'adminServices', 'genServices'];

    // Enabling the controller in the app
    angular.module('lessonslearned').controller('SetCtrl', SetCtrl);
}());
