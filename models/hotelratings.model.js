const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Hotelrating = new Schema({

    hotelid: {
        type: String
       
    },
    
    rating:
    {
        type: String
    },
   
    is_deleted: {
        type: Boolean,
        default: false
    }
});

Hotelrating.plugin(mongoosePaginate);

module.exports = mongoose.model("Hotelrating", Hotelrating);

