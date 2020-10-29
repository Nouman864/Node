
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Hallmenu = new Schema({

    hallid: {
        type: String
       
    },
    menucharge1: {
        type: String
       
    },
    menucharge2: {
        type: String
       
    },
    menu1: {
        type: Array
    },
    menu2: {
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

Hallmenu.plugin(mongoosePaginate);

module.exports = mongoose.model("Hallmenu", Hallmenu);

