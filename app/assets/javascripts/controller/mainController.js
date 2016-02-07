/**
 * Created by Dino on 5/3/2015.
 */
app.controller('mainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.showRestaurant = function () {
        return $location.path()==='/'
    };
}]);
/*
app.controller('mainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.currentPath = $location.path();
}]);*/