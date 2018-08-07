(function () {
    angular
        .module('meanAppSample', ['ngRoute', 'angular-jwt'])
       // .constant('apiUrl', 'http://localhost:5001/api/')
        .run(function ($rootScope,  $window, jwtHelper, $location) 
        {
            /*
            $rootScope.$on('$routeChangeStart', function (event, currentUrl) {
                $rootScope.isLogin = false;

                if (currentUrl && currentUrl.$$route && currentUrl.$$route.originalPath.indexOf('login') > -1) {
                    $rootScope.isLogin = true;
                }
                if (currentUrl && currentUrl.$$route && currentUrl.$$route.originalPath.indexOf('forgotpassword') > -1) {
                    $rootScope.isLogin = true;
                }
                if (currentUrl && currentUrl.$$route && currentUrl.$$route.originalPath.indexOf('recoverpassword') > -1) {
                    $rootScope.isLogin = true;
                }
            });            
            */

            //for getting user Details
            // if ($window.localStorage['loginData']) {
            //     var token = JSON.parse($window.localStorage['loginData']);
            //     if (token) {
            //         $rootScope.user = jwtHelper.decodeToken(token.key);
            //         console.log($rootScope.user);
            //     }else{
            //         $location.path("/login");
            //     }
            // }else{
            //     $location.path("/login");
            // }
        }

        );
})();