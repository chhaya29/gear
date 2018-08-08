(function () {
    'use strict';

    angular.module('meanAppSample')
        .controller('AppointmentController', AppointmentController);

    AppointmentController.$inject = ['$rootScope', '$http', '$location', 'config'];
    function AppointmentController($rootScope, $http, $location, config) {
        var vm = this;

        // to get appointment data
        $http.get('http://localhost:5001/api/slot').then(function (response) {

            vm.user = response.data.data;

        });
    }
})();