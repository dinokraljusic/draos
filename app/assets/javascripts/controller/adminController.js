/**
 * Created by Dino on 5/17/2015.
 */
var adminController = app.controller('adminController', function ($scope, $http, statsService, restaurantService) {
    window.MOJ_SCOPE = $scope;

    $scope.displayLine = 'block';
    $scope.displayBar = 'none';
    $scope.showUsers = true;
    $scope.showStats = false;
    getUsers();


    $scope.showLineChart = function () {
        return !($scope.selectedItem == 'rating_history' && $scope.selectedRestaurantItem != null && $scope.selectedRestaurantItem == 0);
    };

    $scope.usersClick = function () {
        $scope.showUsers = true;
        $scope.showStats = false;
        getUsers();
    };

    $scope.statsClick = function () {
        $scope.showUsers = false;
        $scope.showStats = true;
        makeChart();
    };

    function getUsers() {
        $http.get('/api/users').
            success(function (data, status, headers, config) {
                $scope.users = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });
        $http.get('/api/role').
            success(function (data, status, headers, config) {
                $scope.roles = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });
    };

    function getUserSignupStats() {
        statsService.userSignUpStats().then(function (data) {
            $scope.chart_data = data;

            $scope.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: true
            };
            setChartParams();
        });
    };

    function getRestaurantRatingHistoryStats() {
        if ($scope.selectedRestaurantItem == 0) {
            $scope.chart_data = $scope.restaurants;
            $scope.options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: true
            };
            setChartParams();
        }
        else {
            statsService.restaurantRateHistStats($scope.selectedRestaurantItem).then(function (data) {
                $scope.chart_data = data;

                $scope.options = {
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: true
                };
                setChartParams();
            });
        }
    };

    function setChartParams() {
        $scope.labels = [];
        $scope.data = new Array(1);
        $scope.series = [];
        $scope.data[0] = [];
        for (var i = 0; i < $scope.chart_data.length; i++) {
            if ($scope.selectedItem == 'signups') {
                $scope.labels.push($scope.chart_data[i].created_at.toString());
                $scope.data[0].push($scope.chart_data[i].count);
            }
            else if ($scope.selectedItem == 'rating_history' && $scope.selectedRestaurantItem != null && $scope.selectedRestaurantItem != 0) {
                $scope.labels.push($scope.chart_data[i].updated_at.toString());
                $scope.data[0].push($scope.chart_data[i].rate_a.toString());
                if (i == $scope.chart_data.length - 1) {
                    $scope.data[0].push("0");
                    $scope.data[0].push("5");
                }
            }
            else if ($scope.selectedItem == 'rating_history' && $scope.selectedRestaurantItem != null && $scope.selectedRestaurantItem == 0) {
                $scope.labels.push($scope.chart_data[i].name.toString());
                $scope.chart_data[i].avg == null ? $scope.data[0].push("0") : $scope.data[0].push($scope.chart_data[i].avg.toString());
                if (i == $scope.chart_data.length - 1) {
                    $scope.data[0].push("0");
                    $scope.data[0].push("5");
                }
            }
            else if ($scope.selectedItem == 'number_of_logins') {
                $scope.labels.push($scope.chart_data[i].email.toString());
                $scope.data[0].push($scope.chart_data[i].sign_in_count.toString());
            }
        }

        if ($scope.selectedColourItem == 'blue' || $scope.selectedColourItem == null) {
            $scope.colours = [{
                "fillColor": "rgba(151,187,205,0.2)",
                "strokeColor": "rgba(151,187,205,1)",
                "pointColor": "rgba(151,187,205,1)",
                "pointStrokeColor": "#fff",
                "pointHighlightFill": "#fff",
                "pointHighlightStroke": "rgba(151,187,205,1)"
            }];
        }
        else if ($scope.selectedColourItem == 'red') {
            $scope.colours = [{
                "fillColor": "rgba(237,45,80,0.2)",
                "strokeColor": "rgba(237,45,80,1)",
                "pointColor": "rgba(237,45,80,1)",
                "pointStrokeColor": "#fff",
                "pointHighlightFill": "#fff",
                "pointHighlightStroke": "rgba(151,187,205,1)"
            }];
        }
        else if ($scope.selectedColourItem == 'grey') {
            $scope.colours = [{
                "fillColor": "rgba(72,74,80,0.2)",
                "strokeColor": "rgba(115,45,80,1)",
                "pointColor": "rgba(115,45,80,1))",
                "pointStrokeColor": "#fff",
                "pointHighlightFill": "#fff",
                "pointHighlightStroke": "rgba(151,187,205,1)"
            }];
        }
        else if ($scope.selectedColourItem == 'orange') {
            $scope.colours = [{
                "fillColor": "rgba(255,120,9,0.2)",
                "strokeColor": "rgba(255,120,9,1)",
                "pointColor": "rgba(255,120,9,1))",
                "pointStrokeColor": "#fff",
                "pointHighlightFill": "#fff",
                "pointHighlightStroke": "rgba(151,187,205,1)"
            }];
        }
        else if ($scope.selectedColourItem == 'purple') {
            $scope.colours = [{
                "fillColor": "rgba(142,2,171,0.1)",
                "strokeColor": "rgba(142,2,171,1)",
                "pointColor": "rgba(142,2,171,1))",
                "pointStrokeColor": "#fff",
                "pointHighlightFill": "#fff",
                "pointHighlightStroke": "rgba(151,187,205,1)"
            }];
        }
        else if ($scope.selectedColourItem == 'green') {
            $scope.colours = [{
                "fillColor": "rgba(42,184,67,0.1)",
                "strokeColor": "rgba(42,184,71,1)",
                "pointColor": "rgba(42,184,81,1))",
                "pointStrokeColor": "#888",
                "pointHighlightFill": "#999",
                "pointHighlightStroke": "rgba(151,187,205,1)"
            }];
        }
    };

    $scope.deleteUser = function (user) {
        $scope.user_json = {
            "user_id": user.id
        };
        $http({method: 'DELETE', url: '/api/users/' + user.id, data: angular.toJson($scope.user_json)});
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
    };

    $scope.saveUser = function (user) {
        $scope.user_json = {
            "user_id": user.id,
            "name": user.name,
            "lastname": user.lastname,
            "role_id": user.role_id,
            "active": user.active
        };
        $http({method: 'PATCH', url: '/api/users/' + user.id, data: angular.toJson($scope.user_json)});
    };

    $scope.selectChange = function () {

        makeChart();
    };

    $scope.selectRestaurantChange = function () {

        makeChart();
    };

    $scope.selectColourChange = function () {
        setChartParams();
    };

    function makeChart() {
        if ($scope.selectedItem == 'signups')
            getUserSignupStats();
        else if ($scope.selectedItem == 'rating_history' && $scope.selectedRestaurantItem != null)
            getRestaurantRatingHistoryStats();
        else if ($scope.selectedItem == 'number_of_logins') {
            $scope.chart_data = $scope.users;
            setChartParams();
        }

    };

    restaurantService.then(function (data) {
        $scope.restaurants = [];
        $scope.restaurants = data;
        var rest_all = {
            "id": 0,
            "name": ".All"
        };
        var ima = false;
        for (var i = 0; i < $scope.restaurants.length; i++) {
            if ($scope.restaurants[i].id == "0") ima = true;
        }
        if (!ima) $scope.restaurants.push(rest_all);
    });

});

adminController.$inject = ['$scope', '$http', 'statsService'];
adminController.$inject = ['$scope', '$http', 'restaurantService'];