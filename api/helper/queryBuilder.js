(function () {
    'use strict';

    var getRestify = function () { };

    getRestify.prototype.queryBuilder = function (req, res, next) {
        //for select query
        req.options = {
            select: '',
            sort: '',
            page: parseInt(req.query.page) || 0,
            pagesize: parseInt(req.query.pagesize) || 10000,
            pageskip: 0,
            populate: [],
            where: {},
            search: ''
        }
        if (req.query.dataQuery && req.query.dataQuery != 'undefined') {
            var queryObject = JSON.parse(req.query.dataQuery);            

           if (queryObject.select) {
                req.options.select = queryObject.select;
            }
            if (queryObject.sort) {
                req.options.sort = queryObject.sort;
            }
            // if (queryObject.page) {
            //     req.options.page = queryObject.page;
            // }
            if (queryObject.pagesize) {
                req.options.pagesize = parseInt(queryObject.pagesize);
            }
            if (queryObject.pageskip) {
                req.options.pageskip = queryObject.pageskip * queryObject.pagesize;
            }
            if (queryObject.where) {
                for(var key in queryObject.where){
                    if(queryObject.where[key] && queryObject.where[key].type == 'regex'){
                        var data = queryObject.where[key];
                        //queryObject.where[key] = {};
                        queryObject.where[key] =new RegExp(data.value,'i')
                    }
                }
                req.options.where = queryObject.where;
            }
            // if (queryObject.populate) {
            //     var pop = queryObject.populate.split(',');
            //     pop.forEach(function (item) {
            //         req.options.populate.push(item);
            //     });
            // }
               
        }

        next();
    };

    module.exports = new getRestify();

})();

