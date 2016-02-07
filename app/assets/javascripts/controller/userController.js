/**
 * Created by Dino on 4/3/2015.
 */

var users = angular.module('users', ['ngResource']);

users.factory("User", function($resource) {
    return $resource("api/users/:id", { id: '@id' }, {
        index:   { method: 'GET', isArray: true, responseType: 'json' },
        update:  { method: 'PUT', responseType: 'json' }
    });
})

users.controller("usersController", function($scope, User) {
    $scope.users = User.index()
    alert("pozvo");

})