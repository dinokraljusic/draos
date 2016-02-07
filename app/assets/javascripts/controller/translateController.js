app.controller('translateController', ['$translate', '$scope', function ($translate, $scope) {

    $scope.toggleLanguage = function () {
        $translate.use(($translate.use() === 'en_EN') ? 'bs_BA' : 'en_EN');
        $scope.url= (($translate.use() === 'en_EN') ? "assets/ba-lng-icon.png" : "assets/uk-lng-icon.png");
    };
}])

.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;

        attrs.$observe("backImg",function(n,o){
            if(!n)
                n="assets/uk-lng-icon.png"
            element.css({
                'background-image': 'url(' + n + ')',
                'margin-top' : '8px',
                'margin-right' : '8px'
            });
        });
    };
    });