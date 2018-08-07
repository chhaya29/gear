var mongoose = require("mongoose");


 var SlotSchema = new mongoose.Schema({
   
    BookingSlot:{
        type:String,
        required: true
    },
    Avalibilty:{
        type:Boolean
    }
    
});


module.exports = mongoose.model('slot', SlotSchema);