const hallmenusController = {};
const Menus = require('../models/hallmenus.model');
const shortid = require('shortid');
const jsonwebtoken =  require('jsonwebtoken');
hallmenusController.add = async (req, res) => {
    try {
  
        const body = req.body;
        //  console.log(body);
        //  console.log(body.breakfast.length);
         
        for(let j = 0; j<body.menu1.length; j++)
       {
            let id = shortid.generate();
               body.menu1[j].id = id;
       }
       for(let j = 0; j<body.menu2.length; j++)
       {
            let id = shortid.generate();
               body.menu2[j].id = id;
       }
       
        console.log(body);
      const menu = new Menus(body);
      const result = await menu.save();
       
        res.status(200).send({
          code: 200,
          result,
          message: 'Menu Successfully',
        });
      } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
      }
  };


  hallmenusController.getmenu = async (req, res) => {

    try {
    
      const restrnd = req.params.restrnid;
     
     const menus = await Menus.find({ hallid: restrnd});
      //console.log(flat);  this.flats = data.data;
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: menus
      });
    
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  hallmenusController.get = async (req, res) => {

    try {
    
      const body = req.body;
      console.log(body.ownr);
     const menus = await Menus.find({ hallid: body.ownr});
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: menus
      });
    
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  hallmenusController.edit = async (req, res) => {
  
    try {
      

      let updates = req.body;
     console.log(updates);
     const _id = updates._id;
     let dish = String(updates.dish);
    let price = String(updates.price);  
    let menu = String(updates.menu);  
    let idd = String(updates.id);
    
    if(menu == '1')
    {
      const result = await Menus.updateOne(
          {
            _id:_id, "menu1.id": idd
          },
           
         {
            $set: 
            {
              
              [`menu1.$.dish`]: dish,
              [`menucharge1`]: price,
          
            }
        },
      );
      
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }
    }


    
    if(menu == '2')
    {
      const result = await Menus.updateOne(
          {
            _id:_id, "menu2.id": idd
          },
           
         {
            $set: 
            {
              
              [`menu2.$.dish`]: dish,
              [`menucharge2`]: price,
          
            }
        },
      );
      
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }
    }



    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = hallmenusController;