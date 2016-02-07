/**
 * Created by Dino on 5/10/2015.
 */
var mapCtrl = app.controller('MapCtrl', function ($scope, $rootScope, restaurantService, $compile) {

    var mapOptions = {
        zoom: 14,
        maxZoom: 19,
        center: new google.maps.LatLng(43.8560, 18.3980),
        //mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $rootScope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var formatTime = function(time)
    {
        var formatedTime="";
        var dateString = new Date(time);
        if(dateString.getHours()<10)
            formatedTime="0";
        formatedTime+=dateString.getHours() + ":";
        if(dateString.getMinutes()<10)
            formatedTime+="0";
        formatedTime+=dateString.getMinutes();
        return formatedTime;
    };

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lon),
            title: info.name
        });

        var work_hours_from = new Date(info.work_hours_from);
        marker.content = '<div id="markerInfo" class="infoWindowContent">' + info.address + '</br>'  + info.description + '</br>' + formatTime(info.work_hours_from) + '-' +formatTime(info.work_hours_to)+ '</br></div>';
       // starRating($scope,info);

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
            //info.isCollapsed=false;
        });

        $rootScope.markers.push(marker);


    }

    restaurantService.then(function (data) {
        var restaurants = data
        for (var i = 0; i < restaurants.length; i++){
            createMarker(restaurants[i]);
        }
    });

/*    var starRating =  function($scope, info) {
        //getting a list of space-separated property names
        //from the attribute.
        //var these = attrs.whatIsInThese.split(' '),

        //start creating an html string.
        var html = '';

        //append a bunch of bound values from the list.
        for (var i = 0; i < 5; i++){
            if(i<info.avg)
                html+='<span class="glyphicon glyphicon-star">'
            else
                html+='<span class="glyphicon glyphicon-star-empty">'
        }

        //create an angular element. (this is our "view")
        var el = angular.element(html),

        //compile the view into a function.
            compiled = $compile(el);
        return el;

        //append our view to the element of the directive.
       /!* var elem = angular.element(document.getElementById("#markerInfo"));
        elem.append(el);

        //bind our view to the scope!
        //(try commenting out this line to see what happens!)
        compiled($scope);*!/
    };*/


/*    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }*/

});
mapCtrl.$inject = ['$scope', '$http', 'restaurantService'];