/**
 * Created by Home on 5/6/2015.
 */
'use strict';
//var probna = angular.module('probna', ['ngRoute']);



/*app.config(function ($routeProvider) {
    $routeProvider


        .when("/reservation",
        {
            controller: "reservationCtrl",
            templateUrl: "api/reservation/create.html"
        })

        .otherwise({ redirectTo: "/application.html.erb" });
});*/

app.controller('reservationCtrl', function ($scope, $location) {
    $scope.go = function (path) {
        $location.path(path);
    }
});




app.controller('reservationCtrl', [
    '$scope',  function($scope) {


        $scope.newReservation = {};

        $scope.savedSucessfully = false;
        $scope.message = "";

        $scope.submit = function() {
            var newReservation = {
                Name: $scope.reservation.Name,
                Time: $scope.reservation.Time,
                Number: $scope.reservation.number
            };


            try {
                wishlistService.submit(newReservation);

                $scope.savedSucessfully = true;
                $scope.message = "Reservation has been saved sucessfully";

            } catch (e) {
                console.log(e.message);

                $scope.savedSuccessfully = false;
                $scope.message = 'Error ocurred ' + e.message;
            }


        }


        $scope.go = function(path) {
            $location.path(path);
        }


    }
]);
app.factory('wishlistService', [
    '$http', 'ngAuthSettings', function($http, ngAuthSettings) {


        var wishlistServiceFactory = {};
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var _getWishlists = function() {
            return $http.get(serviceBase + 'api/Wishlist').then(function(results) {
                return results;
            })
        }
    }
]);



