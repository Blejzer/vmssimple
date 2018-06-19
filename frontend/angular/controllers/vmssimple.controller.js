/*******************************************************
* Copyright (C) Nikola Kujaca - All Rights Reserved    *
* Unauthorized copying of this file, via any medium    *
* is strictly prohibited proprietary and confidential  *
* Written by Nikola Kujaca <nikola.kujaca@gmail.com>,  *
* 1411972                                              *
********************************************************/
(function () {
    'use strict';

    angular.module('vmssimple')

        .controller('VmsController', VmsController);


    VmsController.$inject = ['$rootScope','$scope', '$http', '$filter', '$state'];
    function VmsController($rootScope, $scope, $http, $filter, $state) {

        $scope.loading = true;

        $scope.$watch('myVar', function() {
            console.log('myVar pass')

        });


        $http.get('/api/vehicles/get').then(function(usersResponse) {
            console.log('/api/assignedVehicles -> response: ', usersResponse);
            $scope.vehiclesAll = usersResponse.data;
            console.log('/api/assignedVehicles -> response: ',$scope.vehiclesAll);
        }).finally(function() {
            // called no matter success or failure
            $scope.loading = false;
        });


        $scope.getVehicleList = function (vehicle_id) {
            $scope.rented=null;
            console.log('getVehicleList -> vehicle_id: ', vehicle_id);
            $http.get('/api/rentalList', {
                params: vehicle_id
            })
                .then(function (data) {
                    console.log(data.status);
                    if(data.status===200){
                        // console.log(data);
                        $scope.mileageList = data.data;
                    }else{
                        alert("ERROR!");
                    }
                });

        }




    }

})();