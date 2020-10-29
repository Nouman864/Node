const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Hall = new Schema({
    
    owner: {
        type: String
       
    },
   
    
     name: {
        type: String
    },
    number: {                                       
        type: String

    },
    charges: {                                       
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

Hall.plugin(mongoosePaginate);

module.exports = mongoose.model("Hall", Hall);

