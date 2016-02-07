/**
 * Created by Dino on 5/9/2015.
 */
app.controller("RatingCtrl", function($scope, $http) {
        $scope.ratingNew = 1;
        $scope.isReadonly = true;
        $scope.rateFunction = function(new_rating, rating) {
            console.log("Rating selected: " + new_rating);

            $scope.rating_json = {
                "user_id":rating.user_id,
                "restaurant_id":rating.restaurant_id,
                "rate":new_rating
            };
            $http({ method: 'PATCH', url: '/api/rating/' + rating.id, data: angular.toJson($scope.rating_json)});
        };

        $scope.newRateFunction = function(new_rating, restaurant_id) {
            console.log("Rating selected: " + new_rating);

            $scope.rating_json = {
                "user_id":$scope.user_id,
                "restaurant_id":restaurant_id,
                "rate":new_rating
            };
            $http({ method: 'POST', url: '/api/rating/', data: angular.toJson($scope.rating_json)});
        };
    })
    .directive("starRating", function() {
        return {
            restrict : "EA",
            template :"<span>" +
            "    <i ng-repeat='star in stars' class='glyphicon' ng-class='{&#39;glyphicon-star&#39;: $index < ratingValue, &#39;glyphicon-star-empty&#39;: $index  >= ratingValue}' ng-click='toggle($index)'></i>" + //&#9733
            "</span>",
            scope : {
                ratingValue : "=ngModel",
                max : "=?", //optional: default is 5
                onRatingSelected : "&?",
                readonly: "=?"
            },
            link : function(scope, elem, attrs) {
                if (scope.max == undefined) { scope.max = 5; }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled : i < scope.ratingValue
                        });
                    }
                };
                scope.toggle = function(index) {
                    if (scope.readonly == undefined || scope.readonly == false){
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch("ratingValue", function(oldVal, newVal) {
                    if (newVal) { updateStars(); }
                });
            }
        };
    });