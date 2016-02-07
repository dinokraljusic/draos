/**
 * Created by Dino on 3/22/2015.
 */
'use strict';

var app = angular.module('probna', [
    'ngRoute', 'ui.bootstrap', 'pascalprecht.translate', 'chart.js', 'treeControl'], ['$translateProvider', function ($translateProvider) {

    // register german translation table
    $translateProvider.translations('bs_BA', {
        'HOME': 'Početna',
        'EDIT_PROFILE': 'Uredi profil',
        'LOGIN': 'Prijava',
        'LOGOUT': 'Odjava',
        'EMAIL': 'e-Mail',
        'PASSWORD' : 'Lozinka',
        'FORGOT_PASSWORD': '(Zaboravili ste lozinku?)',
        'SIGN_UP_NOW' : 'Registrujte se! ',
        'FORGOT_PASS': 'Zaboravili ste lozinku',
        'SUBMIT':'Pošalji',
        'RESET_PASSWORD': 'Nova lozinka',
        'PASSWORD_CONFIRMATION' : 'Potvrda lozinke',
        'UPDATE_PASSWORD':'Kreiraj lozinku',
        'NAME':'Ime',
        'LAST_NAME':'Prezime',
        'CREATE_MY_ACCOUNT':'Kreiraj nalog',
        'UPDATE_MY_ACCOUNT':'Ažuriraj nalog',
        'SIGN_UP':'Registracija',
        'ADDRESS':'Adresa',
        'AVERAGE_RATING':'Ocjena',
        'MY_RATING' : 'Moja ocjena',
        'NEW_RATING':'Ocjeni',
        'MAKE_RESERVATION':'Napravi rezervaciju',
        'ADD_RESTAURANT': 'Dodaj restoran',
        'MENU': 'Meni',
        'SEARCH' : 'Pretraga',
        'ADMIN_PANEL' : 'Administracija',
        'STATS_TO_DISPLAY' : 'Prikazati statistiku za',
        'GRAPH_COLOUR' : 'Boja grafa',
        'USER_SIGNUP_FREQ' : 'Broj novih korisnika',
        'RATING_HISTORY' : 'Historijat ocjene',
        'NUMBER_LOGINS' : 'Broj prijava',
        'BLUE' : 'Plava',
        'GREY' : 'Siva',
        'RED' : 'Crvena',
        'ORANGE' : 'Narandžasta',
        'PURPLE' : 'Ljubičasta',
        'GREEN' : 'Zelena',
        'USERS' : 'Korisnici',
        'STATS' : 'Statistika',
        'ROLE' : 'Uloga',
        'ACTIVE' : 'Aktivan',
        'DELETE_USER' : 'Izbriši korisnika',
        'APPLY' : 'Primijeni',
        'RESTAURANT_TO_DISPLAY':'Odaberi restoran'


    });
    // register english translation table
    $translateProvider.translations('en_EN', {
        'HOME': 'Home',
        'EDIT_PROFILE': 'Edit profile',
        'LOGIN': 'Log in',
        'LOGOUT': 'Log out',
        'EMAIL': 'Email',
        'PASSWORD' : 'Password',
        'FORGOT_PASSWORD': '(Forgot password?)',
        'SIGN_UP_NOW' : 'Sign up now! ',
        'FORGOT_PASS': 'Forgot password',
        'SUBMIT':'Submit',
        'RESET_PASSWORD': 'Reset password',
        'PASSWORD_CONFIRMATION' : 'Password confirmation',
        'NAME':'Name',
        'LAST_NAME':'Last name',
        'CREATE_MY_ACCOUNT':'Create account',
        'UPDATE_MY_ACCOUNT':'Update my account',
        'SIGN_UP':'Sign up',
        'ADDRESS':'Address',
        'AVERAGE_RATING':'Rating',
        'MY_RATING' : 'My rating',
        'OWNER' : 'Owner',
        'NEW_RATING':'Rate',
        'ADD_RESTAURANT': 'Add restaurant',
        'MENU': 'Menu',
        'MAKE_RESERVATION':'Make a reservation',
        'SEARCH' : 'Search',
        'ADMIN_PANEL' : 'Administration',
        'STATS_TO_DISPLAY' : 'Stats to display',
        'GRAPH_COLOUR' : 'Graph colour',
        'USER_SIGNUP_FREQ' : 'User signup frequency',
        'RATING_HISTORY' : 'Rating history',
        'NUMBER_LOGINS' : 'Number of logins',
        'BLUE' : 'Blue',
        'GREY' : 'Grey',
        'RED' : 'Red',
        'ORANGE' : 'Orange',
        'PURPLE' : 'Purple',
        'GREEN' : 'Green',
        'USERS' : 'Users',
        'STATS' : 'Statistics',
        'ROLE' : 'Role',
        'ACTIVE' : 'Active',
        'DELETE_USER' : 'Delete user',
        'APPLY' : 'Apply',
        'RESTAURANT_TO_DISPLAY': 'Choose restaurant'
    });
    $translateProvider.preferredLanguage('bs_BA');
}]);

app.service('restaurantService', function($rootScope, $http, $q){
    var defferer = $q.defer()

    $http.get('/api/restaurant').success(function (data){
        defferer.resolve(data)
    });

    return defferer.promise;
});

app.service('statsService', function($rootScope, $http, $q){

    this.userSignUpStats = function(){
        var defferer = $q.defer()

        $http.get('/api/user_signup_freq').success(function (data){
            defferer.resolve(data)
        });

        return defferer.promise;
    };

    this.restaurantRateHistStats = function(restaurant_id){
        var defferer = $q.defer()

        $http.get('/api/restaurant_rate_hist/' + restaurant_id).success(function (data){
            defferer.resolve(data)
        });

        return defferer.promise;
    };
});

app.factory("flashMessage", function() {
    this.message = "";
    this.show = "";
    return {
        setShow: function(show) {
            this.show = show;
        },
        setMessage: function(message) {
            this.message = message;
        }
    };
});


app.controller("flashMessageCtrl", function($scope, $attrs) {

    /*this.notice = $attrs.notice;
    this.alert  = $attrs.alert;*/
});
///modal
app.controller('Controller', function($scope, ModalService) {

    $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal1) {
           // modal1.element.modal();

            var el = document.getElementById("overlay");
            el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

            modal1.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };

});

app.controller('ModalController', function($scope, close) {

    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

});

//end Modal

/*
app.controller('EventDetailsCtrl',['$scope','$http','$location','$routeParams','$sce',function($scope, $http, $location, $routeParams, $sce) {

    var event_id = $routeParams.event_id
    var url = 'API_URL_FOR_JSON';

    $http.jsonp(url).success(function(data) {
        $scope.event = data;
        $scope.Area = {
            Name: "Melbourne",
            Latitude: data.event.latitude,
            Longitude: data.event.longitude
        };
        $scope.latitude = data.event.latitude;
        $scope.longitude = data.event.longitude;
    });

}]);*/

/*var onloadCallback = function() {
    grecaptcha.render('recaptcha', {
        'sitekey' : '6LcS6gUTAAAAAP4v4dFU6TuttJAasAllXeTVL-Tx'
    });
};*/

/*var app = angular.module('probna', [
    'ngRoute'
]);


app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/login', {
            templateUrl: '/login',
            controller: 'loginController'
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
        otherwise({
            redirectTo: '/'
        });
});*/
/*
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/dino', {
                templateUrl: '/login'
            }).
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
            otherwise({
                redirectTo: '/'
            });
    }]);*/


/*
app.factory('Group', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({ url: '/api/groups', name: 'group' });
}]);
*/

/*var mainController = app.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});


var loginController = app.controller('loginController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});*/

/*var probna = angular.module('probna', ['ngRoute']);

var linkController = angular.module('probna', ['ngRoute']);

//var probna = angular.module('scotchApp', ['ngRoute']);


//loginController = angular.module('probna', []);

// configure our routes
angular.module('probna', ['ngRoute']).config(function($routeProvider, $locationProvider){
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'static_pages/index.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })

    // route for the contact page
    .when('/login', {
        templateUrl : "<%= asset_path('sessions/new.html') %> ",
        controller  : 'loginController'
});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

// create the controller and inject Angular's $scope
// create the controller and inject Angular's $scope
angular.module('probna', ['ngRoute']).controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

probna.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

probna.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

probna.controller('loginController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});*/
