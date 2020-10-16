const tablesController = {};
const Tables = require('../models/tables.model');
const jsonwebtoken =  require('jsonwebtoken');
tablesController.ad = async (req, res) => {
    try {
        
        const body = req.body;
        console.log(body);
        const table = new Tables(body);
      const result = await table.save();
       
        res.status(200).send({
          code: 200,
          result,
          message: 'Table Successfully',
        });
      } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
      }
  };
  
  tablesController.update = async (req, res) => {
    if (!req.params.id) {
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
      let updates = req.body;
      console.log(updates);    
       let tabel = String(updates.Availabletime[0].tabel);
       let type = String(updates.Availabletime[0].type);  
       let capacity = String(updates.Availabletime[0].capacity);

    
      const result = await Tables.updateOne(
        {
          _id:_id
        },

         {
        $push: {'Ta': {tabel: tabel, type: type,capacity: capacity}}
         },
         
      );
      
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }
     
    
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
    
  };

  tablesController.gettable = async (req, res) => {

    try {
    
      const table = req.params.tablid;
     
     const tab = await Tables.find({ resturantid: table});
      //console.log(flat);  this.flats = data.data;
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: tab
      });
    
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  tablesController.delete = async (req, res) => {

    try {
     
      let del = req.body;
      console.log(del);
    const _id = req.body._id;


        const result = await Tables.updateOne(
  
          { _id: _id},
        {
          $pull : {
            Ta : {tabel: String(del.tabel), type: String(del.type), capacity: String(del.capacity)}
         
        },
        }
        
          );
            res.status(200).send({
              code: 200,
              message: 'tabel'
            });
          
             
        
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


   tablesController.edit = async (req, res) => {
  
    try {
      

      let updates = req.body;
     console.log(updates);
     const _id = updates._id;
     let tabel = String(updates.tabel);
    let type = String(updates.type);  
    let capacity = String(updates.capacity);  
       const result = await Tables.updateOne(
         {
            _id:_id, "Ta.tabel": tabel
          },
           
         {
            $set: 
            {
              
              [`Ta.$.tabel`]: tabel,
              [`Ta.$.type`]: type,
              [`Ta.$.capacity`]: capacity
          
            }
        },
      );
      
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = tablesController;