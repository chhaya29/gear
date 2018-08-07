(function(){
    'use strict';

    angular.module('meanAppSample')
    
    .directive('myDataGrid',function(){
        return{
            restrict: 'E',
            scope:{
                info:'='
            },
            templateUrl : 'app/Directives/grid.html',
            controller: controllerFun,
            controllerAs: 'vm',
            bindToController: true
        }   
    });

     //controllerFun.$inject = ['$location'];
    function controllerFun(){
        var vm = this;
       vm.bookAppointment = bookAppointment;
       function bookAppointment(item){
           console.log(item)
           $location.path('user');
       }
    }
    
})();