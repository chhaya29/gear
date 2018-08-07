(function () {
    'use strict';


    angular
        .module('meanAppSample')
        .config(routerConfig);
      
   function routerConfig($routeProvider) {
        $routeProvider
            .when('/addapointment', {
                templateUrl: 'app/AddAppointment/addappointment.html',
                controller: 'AddAppointmentController',
                controllerAs: 'vm'
            })
            .when('/appointmentlist/:BookingSlot', {
                templateUrl: 'app/Appointment/appointment.html',
                controller: 'AppointmentController',
                controllerAs: 'vm'
            })
           
            .when('/appointmentlist', {
                templateUrl: 'app/Appointment/appointment.html',
                controller: 'AppointmentController',
                controllerAs: 'vm'
            })
           
            .otherwise('/appointmentlist');
    }

})();