const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Roomcodes = new Schema({
    clientid:{
        type: String
       
    },
    RoomReserved: {
        type: Array   
    },
    is_deleted: {
        type: Boolean,                                                           
        default: false
    }
   
    
});

Roomcodes.plugin(mongoosePaginate);

module.exports = mongoose.model("Roomcodes", Roomcodes);