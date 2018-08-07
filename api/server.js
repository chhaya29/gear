//declare all depnedencey
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

//database connection
var mongoose = require('./Database/mongoose.js');
var db = mongoose();

//created app instance
var app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token, mode,embeddedToken');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Expose-Headers', 'totalRecords');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

//to handle req.body part
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./routes/index')(app);

//to test on browser
app.use('/testapi', function (req, res, next){
    res.send('API is started Successfully.');
   // next();
});

//define port number
app.listen(5001);
console.log('API is listening on port 5001');

module.exports = app;
