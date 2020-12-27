const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Bookedroom = new Schema({
    clientid:{
        type: String
       
    },
    night:
    {
       type: String
    },
    
    cnic: {
        type: String   
    },
    Rooms: {
        type: Array   
    },
    checkin: {
        type: String   
    },
    checkout: {
        type: String  
    },
    hotelid: {
        type: String  
    },
    ownerid: {
        type: String  
    },
    is_deleted: {
        type: Boolean,
        default: false
    },

   
    
});

Bookedroom.plugin(mongoosePaginate);

module.exports = mongoose.model("Bookedroom", Bookedroom);