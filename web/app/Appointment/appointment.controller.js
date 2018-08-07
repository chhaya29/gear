(function () {
    'use strict';

    angular.module('meanAppSample')
        .controller('AppointmentController', AppointmentController);

    AppointmentController.$inject = ['$rootScope', '$http', '$location', 'config'];
    function AppointmentController($rootScope, $http, $location, config) {
        var vm = this;
        vm.user = [{ Name: 'hiren', Salary: 10000 }]

        $http.get('http://localhost:5001/api/slot').then(function (response) {
                           
                  vm.user = response.data.data;
             
          });
    }
})();