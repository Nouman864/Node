const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Hotel = new Schema({
    
    owner: {
        type: String
       
    },
   
    
     name: {
        type: String
    },
    number: {                                       
        type: String

    },
    
    email: {                                       
        type: String

    },
     city: {
        type: String
    },
    Location:{
        type: String
    },
    check: {
        type: String
    },
   
    images: {
        type: Array
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

Hotel.plugin(mongoosePaginate);

module.exports = mongoose.model("Hotel", Hotel);

