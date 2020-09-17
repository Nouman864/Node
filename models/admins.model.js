const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Admin = new Schema({

    ownerid: {
        type: String
       
    },
    amount: {
        type: String
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
});

Admin.plugin(mongoosePaginate);

module.exports = mongoose.model("Admin", Admin);

