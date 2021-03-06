
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Menu = new Schema({

    resturantid: {
        type: String
       
    },
    breakfast: {
        type: Array
    },
    launch: {
        type: Array
    },
    dinner: {
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

Menu.plugin(mongoosePaginate);

module.exports = mongoose.model("Menu", Menu);

