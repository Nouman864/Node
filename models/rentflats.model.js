const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Rentflat = new Schema({

    owner:
     {
        type: String
       
    },
      name:
      {
        type: String
      },
      date:
      {
        type: String
       
      },
    
    is_deleted: {
        type: Boolean,
        default: false
    }
});

Rentflat.plugin(mongoosePaginate);

module.exports = mongoose.model("Rentflat", Rentflat);

