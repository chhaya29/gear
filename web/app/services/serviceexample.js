(function () {
    angular
        .module('meanAppSample')
        .service('servicehttp', ['$rootScope', '$http',
            function ($rootScope, $http) {

                //we can simply return anyting
                this.msg = { key: 'passing message through serice works' };

                var obj = {
                    where: {
                        Salary: { $gt: 5000 }//,
                        // UserName: 'hiren7'
                    },
                    sort: { Salary: -1 }
                }
                this.getData = function () {
                  return  $http.get('http://localhost:5001/api/user?dataQuery=' + JSON.stringify(obj))
                }
            }]);
})();

