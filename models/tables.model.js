
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Table = new Schema({

    resturantid: {
        type: String
       
    },
    email: {
        type: String
    },
    Ta: {
         type: Array   
    },
    ownerid: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

Table.plugin(mongoosePaginate);

module.exports = mongoose.model("Table", Table);

