const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Bookinghall = new Schema({

    name : 
    {
        type: String  
    },
    number : 
    {
        type: String  
    },
    halid : 
    {
        type: String  
    },
    Hallname : 
    {
        type: String  
    },
    guest : 
    {
        type: String  
    },
    type:
    {
        type: String  
    },
    date:
    {
        type: String  
    },
    total:
    {
        type: String  
    },
    ownerhall:
    {
        type: String  
    },


    is_deleted: {
        type: Boolean,
        default: false
    },
  
   
    
});

Bookinghall.plugin(mongoosePaginate);

module.exports = mongoose.model("Bookinghall", Bookinghall);