const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Hallrating = new Schema({

    hallid: {
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

Hallrating.plugin(mongoosePaginate);

module.exports = mongoose.model("Hallrating", Hallrating);

