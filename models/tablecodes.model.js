const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Tablecodes = new Schema({
    clientid:{
        type: String
       
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    TableBooked: {
        type: Array   
    },
    
    
});

Tablecodes.plugin(mongoosePaginate);

module.exports = mongoose.model("Roomcodes", Tablecodes);