const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Bookedtable = new Schema({
    clientid:{
        type: String
       
    },
    restid:
    {
        type: String
    },
    email:
    {
        type: String
    },
    name:
    {
        type: String
    },
     tableno:
    {
        type: String
    },
    capacity:
    {
       type: String
    },

    type : 
    {
        type: String  
    },
    date : 
    {
        type: String  
    },
    time : 
    {
        type: String  
    },

    is_deleted: {
        type: Boolean,
        default: false
    },
  
   
    
});

Bookedtable.plugin(mongoosePaginate);

module.exports = mongoose.model("Bookedtable", Bookedtable);