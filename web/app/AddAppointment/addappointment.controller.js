(function () {
    'use strict';

    angular.module('meanAppSample')
        .controller('AddAppointmentController', AddAppointmentController);

        AddAppointmentController.$inject = ['$rootScope', '$http', '$location', 'config', '$routeParams'];
    function AddAppointmentController($rootScope, $http, $location, config, $routeParams) {

        var vm = this;
        vm.editMode = false;


        vm.fixAppointment = fixAppointment;
        vm.cancel = cancel;

        function cancel() {
            $location.path('appointmentlist');
        }

        function fixAppointment(form) {
            vm.appointment.BookingSlot = $routeParams.BookingSlot;
            if (vm.editMode === true) {
                $http.patch(config.apiUrl + 'user/' + vm.appointment._id, vm.appointment).then(function (response) {
                    if (response.status == 200) {
                        $location.path('appointmentlist');
                    }
                }, function (err) {
                    vm.message = true;
                })

            } else {

                $http.post(config.apiUrl + 'user', vm.appointment).then(function (response) {
                    if (response.status == 200) {
                        $http.patch(config.apiUrl + 'slot/' + $routeParams.BookingSlot, { Avalibilty: false }).then(function (response) {
                            $location.path('appointmentlist');
                        });
                    }
                }, function (err) {
                    vm.message = true;
                })
            }
        }

        active()
        function active() {
            if (Object.keys($routeParams).length !== 0) {
                vm.editMode = true;
                var obj = {
                    where: {
                        BookingSlot: $routeParams.BookingSlot
                    }
                }
                $http.get('http://localhost:5001/api/user?dataQuery=' + JSON.stringify(obj)).then(function (response) {
                    if (response.data.data.length > 0) {
                        vm.appointment = response.data.data[0];
                    }else{
                        vm.editMode = false;
                    }
                });
            } else {
                vm.editMode = false;
            }
        }
    }
})();