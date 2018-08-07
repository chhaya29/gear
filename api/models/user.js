var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

 var UserSchema = new mongoose.Schema({

    FirstName: {
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    BookingSlot:{
        type:String,
        required: true
    }
    
});


module.exports = mongoose.model('user', UserSchema);