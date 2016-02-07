/**
 * Created by Home on 5/13/2015.
 */
app.controller("MessageCtrl", function($scope, $http) {
    var app=this;
    app.message="Wellcome";

})
    .directive("Message", function() {
        return function (scope, element, attrs){
            element.text(scope.app.message + " "+ attrs.current_user.name);

        }
    });