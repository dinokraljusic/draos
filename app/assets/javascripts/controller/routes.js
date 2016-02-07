/**
 * Created by Home on 4/6/2015.
 */

'use strict';

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/login', {
            templateUrl: '/login'
        }).
        when('/logout', {
            templateUrl: '/logout'
        }).
        when('/signup', {
            templateUrl: '/signup'
        }).
        when('/resetPassword', {
            templateUrl: '/password_reset/new'
        }).
        when('/profile', {
            templateUrl: '/profile'
        }).
        when('/reservation',
        {
            //controller: 'reservationCtrl',
            templateUrl: "/reservation"
        }).
        when('/create_restaurant',
        {
            //controller: 'reservationCtrl',
            templateUrl: "/restaurantcreate"
        }).
        when('/admin_panel',
        {
            //controller: 'reservationCtrl',
            templateUrl: "/admin"
        }).
        otherwise({
            redirectTo: '/'
        });
});

app.controller("signupController", function($scope, $location) {
   // $route.reload();
   /* if(!$scope.reloaded) {
        window.location.reload();
        $scope.reloaded=true;
    }*/
});