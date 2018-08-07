(function () {
    'use strict';

    angular.module('meanAppSample')
        .controller('SFController', SFController);

        SFController.$inject = ['$rootScope', '$http', '$location', 'servicehttp','factoryhttp', 'config'];
    function SFController($rootScope, $http, $location, servicehttp,factoryhttp, config) {
        var vm = this;

        //service example 
        console.log(servicehttp.msg.key);
        //service example 
        servicehttp.getData().then(function(response){
            console.log(response);
        })

          //factory example 
          console.log(factoryhttp.obj.key);
          //factory example 
          factoryhttp.getData().then(function(response){
              console.log(response);
          })
        
     
    }
})();