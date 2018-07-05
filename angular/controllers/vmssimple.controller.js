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
            // console.log('myVar pass')

        });


        $http.get('/api/vehicles').then(function(usersResponse) {
            console.log('/api/vehicles/get -> response: ', usersResponse);
            $scope.vehiclesAll = usersResponse.data;
            console.log('/api/vehicles -> response: ',$scope.vehiclesAll);
        }).finally(function() {
            // called no matter success or failure
            $scope.loading = false;
        });

        // $http.get('/api/users').then(function(usersResponse) {
        //     console.log('/api/users/get -> response: ', usersResponse);
        //     $scope.usersAll = usersResponse.data;
        //     console.log('/api/users -> response: ',$scope.usersAll);
        // }).finally(function() {
        //     // called no matter success or failure
        //     $scope.loading = false;
        // });


        // $scope.getVehicleList = function (vehicle_id) {
        //     $scope.rented=null;
        //     console.log('getVehicleList -> vehicle_id: ', vehicle_id);
        //     $http.get('/api/rentalList', {
        //         params: vehicle_id
        //     })
        //         .then(function (data) {
        //             console.log(data.status);
        //             if(data.status===200){
        //                 // console.log(data);
        //                 $scope.mileageList = data.data;
        //             }else{
        //                 alert("ERROR!");
        //             }
        //         });
        //
        // }
        //
        // $scope.getUsersList = function (user_id) {
        //     $scope.rented=null;
        //     console.log('getUsersList -> user_id: ', user_id);
        //     $http.get('/api/rentalList', {
        //         params: vehicle_id
        //     })
        //         .then(function (data) {
        //             console.log(data.status);
        //             if(data.status===200){
        //                 // console.log(data);
        //                 $scope.mileageList = data.data;
        //             }else{
        //                 alert("ERROR!");
        //             }
        //         });
        //
        // }






    }

})();