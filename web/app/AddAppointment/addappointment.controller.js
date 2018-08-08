(function () {
    'use strict';

    angular.module('meanAppSample')
        .controller('AddAppointmentController', AddAppointmentController);

    AddAppointmentController.$inject = ['$rootScope', '$http', '$location', 'config', '$routeParams'];
    function AddAppointmentController($rootScope, $http, $location, config, $routeParams) {

        var vm = this;
        vm.editMode = false; // flag for insert or edit mode
        vm.showError = false; // flag for validation


        vm.fixAppointment = fixAppointment;
        vm.cancel = cancel;

        // back to appointment list form
        function cancel() {
            $location.path('appointmentlist');
        }

        // add or edit appointment detail
        function fixAppointment(form) {
            // return back if form is invalid
            if (form.$invalid) {
                vm.showError = true;
                return;
            }
            // reference for booking slot
            vm.appointment.BookingSlot = $routeParams.BookingSlot;

            // edit the existing appointment detail
            if (vm.editMode === true) {
                $http.patch(config.apiUrl + 'user/' + vm.appointment._id, vm.appointment).then(function (response) {
                    if (response.status == 200) {
                        $location.path('appointmentlist');
                    }
                }, function (err) {
                    vm.message = true;
                })

            } else {
                // add new appointment detail
                $http.post(config.apiUrl + 'user', vm.appointment).then(function (response) {
                    if (response.status == 200) {
                        // update avalibility of slot false
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
            // to check booking slot reference
            if (Object.keys($routeParams).length !== 0) {
                vm.editMode = true;
                var obj = {
                    where: {
                        BookingSlot: $routeParams.BookingSlot
                    }
                }

                // cheeck weather we get data from booking slot 
                $http.get('http://localhost:5001/api/user?dataQuery=' + JSON.stringify(obj)).then(function (response) {
                    // if yes means edit mode
                    if (response.data.data.length > 0) {
                        vm.appointment = response.data.data[0];
                    } else {// iff no means add mode
                        vm.editMode = false;
                    }
                });
            } else {
                vm.editMode = false;
            }
        }
    }
})();