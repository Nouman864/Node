const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Room = new Schema({
    
    is_deleted: {
        type: Boolean,
        default: false
    },
    Roomsinfo: {
        type: Array   
    },
    hotelid: {
        type: String
       
    },
    owner: {
        type: String
       
    },
    facility:
    {
        type:Array
    },
    img:
    {
        type:Array
    },
});

Room.plugin(mongoosePaginate);

module.exports = mongoose.model("Room", Room);

