const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Room = new Schema({
    
    is_deleted: {
        type: Boolean,
        default: false
    },
    Rooms: {
        type: Array   
    },
    owner: {
        type: String
       
    },
    
});

Room.plugin(mongoosePaginate);

module.exports = mongoose.model("Room", Room);

