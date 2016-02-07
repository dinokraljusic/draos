var restaurantController = app.controller('restaurantController', function ($scope, $http, $rootScope, restaurantService, $filter, $location) {
    //$scope.isCollapsed = true
    $scope.isCollapsed = [];

    window.MY_SCOPE = $scope;

    $scope.comparator = false;

    $scope.init = function (id) {
        $scope.user_id = id;
        $http.get('/api/users/' + $scope.user_id + '/rating').
            success(function (data, status, headers, config) {
                $scope.ratings = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });
    };

    restaurantService.then(function (data) {
        $scope.restaurants = data;
        for (var i = 0; i < $scope.restaurants.length; i++) {
            $scope.restaurants[i].isCollapsed = true;
            //$scope.isCollapsed.splice($scope.restaurants[i].id, 0, true);
        }
        $scope.buildTree(data);
    });

    $scope.setIsCollapsed = function (restaurant) {
        for (var i = 0; i < $scope.restaurants.length; i++) {
            if (restaurant == $scope.restaurants[i]) {
                $scope.restaurants[i].isCollapsed = !$scope.restaurants[i].isCollapsed;
              //  $scope.selectedRestaurant = (!$scope.restaurants[i].isCollapsed ? $scope.restaurants[i]  : null);
                $rootScope.selectedRestaurant = (!$scope.restaurants[i].isCollapsed ? $scope.restaurants[i]  : null);
            }
            else
                $scope.restaurants[i].isCollapsed = true;
            //$scope.isCollapsed.splice($scope.restaurants[i].id, 0, true);
        }
    };

    $scope.getSelectedRestaurant = function (){
        return $rootScope.selectedRestaurant;
    };


    $scope.filterByName = function (restaurant) {
        if (restaurant.name == ".All") return false;
        else if (typeof pretraga !== 'undefined') return restaurant.name.indexOf(pretraga) != -1;
        return true;
    };
   $scope.filterByType = function (restaurants, type) {
        var filteredRestaurants = [];
        if (restaurants) {
            for (var i = 0; i < restaurants.length; i++) {
                if (restaurants[i].tip == type) {
                    if($scope.filterByName(restaurants[i]))
                        filteredRestaurants.push(restaurants[i]);
                }
            }
        }
        return filteredRestaurants;
    };
    $scope.change = function () {
        $scope.pretraga = document.getElementById("pretragafield").value;
        //$scope.buildTree($scope.restaurants);
        //return restaurant.name == $scope.pretraga;
    };

    $scope.openInfoWindow = function (e, restaurant) {
        e.preventDefault();
        var selectedMarker = $filter('filter')($rootScope.markers, {title: restaurant.name})[0];
        google.maps.event.trigger(selectedMarker, 'click');
    };

    $scope.openNodeInfoWindow = function (e, node) {
        if(node.id){
            e.preventDefault();
            var selectedMarker = $filter('filter')($rootScope.markers, {title: node.name})[0];
            google.maps.event.trigger(selectedMarker, 'click');
        }
       else{
            if($scope.expandedNodes.indexOf(node)==-1)
                $scope.expandedNodes.push(node);
            else
                $scope.expandedNodes.splice(node);
        }
    };

    $scope.showMenu = function (menu) {
        if (typeof menu !== 'undefined' && menu != null) return true;
        return false;
    };
    $scope.createMenuLink = function (menu) {
        if (typeof menu !== 'undefined') {
            return $location.path() + menu.toString();
        }
    };

    $scope.buildTree = function (restaurants) {

        $scope.dataForTheTree =
            [
                {"name": "Restaurants", "children": $scope.filterByType(restaurants,'R')},
                {"name": "Museums", "children": $scope.filterByType(restaurants,'M')},
                {"name": "Landmarks", "children": $scope.filterByType(restaurants,'L')},
                { "name" : "Accomodations",  "children" : [
                    { "name" : "Hotels",  "children" :  $scope.filterByType(restaurants,'H')},
                    { "name" : "Hostels",  "children" :  $scope.filterByType(restaurants,'Hos')} ]},
                {"name": "Events", "children": $scope.filterByType(restaurants,'E')}
                ];
    };

    $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    };

    /*    $http.get('/api/restaurant').
     =======
     $http.get('/api/restaurant').
     >>>>>>> Stashed changes
     success(function(data, status, headers, config) {
     $rootScope.restaurants = data;
     }).
     error(function(data, status, headers, config) {
     // log error
     <<<<<<< Updated upstream
     });*/

});

restaurantController.$inject = ['$scope', '$http', 'restaurantService'];