(function () {
    'use strict';

    angular.module('meanAppSample')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$http', '$location','config','$window','jwtHelper'];
    function LoginController($rootScope, $http, $location, config,$window, jwtHelper) {
       
        var vm = this;
        vm.loginUser = loginUser;
        vm.clear = clear;
        vm.message = false;

        function clear() {
            vm.message = false;
        }

        function loginUser() {
            $http.post(config.apiUrl+'signin', { 'UserName': vm.username, 'Password': vm.password }).then(function (response) {
                var userData = response.data;
                $window.localStorage['loginData'] = JSON.stringify({ 'key': userData.user });
                $rootScope.user = jwtHelper.decodeToken(userData.user);             

            }, function (err) {
                vm.message = true;
            })
        }


    }
})();