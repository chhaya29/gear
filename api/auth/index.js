(function () {
    'use strict';

    var user = require('../models/user');
    var _ = require('lodash');
    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');   
    //var config = require("config");
    // var q = require('q');
    //var decode = require('decode-html')

    var controller = function () { };

    //register new user
    controller.prototype.register = function (req, res, next) {
        user.findOne({ UserName: req.body.UserName }, function (err, userfound) {
            if (err) {
                return err;
            }
            if (!userfound) {
                var salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64').toString('base64');
                var password = crypto.pbkdf2Sync(req.body.Password, salt, 10000, 64, 'sha512').toString('base64');
                req.body.Salt = salt;
                req.body.Password = password;
                user.create(req.body, function (err, data) {
                    if (err) {
                        return err;
                    }
                    return res.send(data)
                });
            } else {
                return res.send("user present")
            }
        });
    }

    //autheticate new user
    controller.prototype.signin = function (req, res, next) {
        user.findOne({ UserName: req.body.UserName }, function (err, userfound) {
            if (err) {
                return err;
            }
            if (!userfound) {
                return "User not found.";
            } else {
                var newpassword = crypto.pbkdf2Sync(req.body.Password, userfound.Salt, 10000, 64, 'sha512').toString('base64');

                if (newpassword === userfound.Password) {

                    var token = jwt.sign(userfound.toJSON(), 'ilivelifefreely', {
                        expiresIn: '24h' // expires in 24 hours
                    });
                    return res.status(200).json({
                        user: token,
                        message: 'Successfully signed'
                    });
                }else{
                    return 
                }
            }
        });
    };

    //authenticate token on each request for
    controller.prototype.validatetoken = function (req, res, next) {
        var token = req.get("x-access-token");
        jwt.verify(token, 'ilivelifefreely', function(err, decoded) {
            if (err) {
                console.log("----err---");
                console.log(err);
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                next();
            }
        })
    };

    module.exports = new controller();
})();