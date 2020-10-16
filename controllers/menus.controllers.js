const menusController = {};
const Menus = require('../models/menus.model');
const shortid = require('shortid');
const jsonwebtoken =  require('jsonwebtoken');
menusController.ad = async (req, res) => {
    try {
  
        const body = req.body;
        //  console.log(body);
        //  console.log(body.breakfast.length);
         
        for(let j = 0; j<body.breakfast.length; j++)
       {
            let id = shortid.generate();
               body.breakfast[j].id = id;
       }
       for(let j = 0; j<body.launch.length; j++)
       {
            let id = shortid.generate();
               body.launch[j].id = id;
       }
       for(let j = 0; j<body.dinner.length; j++)
       {
            let id = shortid.generate();
               body.dinner[j].id = id;
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
  
  menusController.update = async (req, res) => {
    if (!req.params.id) {
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
      let updates = req.body;
        let menu = updates.Availabletime[0].menutype;
        let id = shortid.generate();
         updates.Availabletime[0].id = id;

         console.log(updates);
      //  let dh = updates.Availabletime[0].dish;
      //  let pp = updates.Availabletime[0].price;
    
      ///////////////  BREAKFAST//////////////////////////
        

          if(menu == 'breakfast')
          {
                   console.log("njnd");
      const result = await Menus.updateOne(
        {
          _id:_id
        },

         {
        $push: {'breakfast':  {dish: updates.Availabletime[0].dish, price: updates.Availabletime[0].price,
          menu: updates.Availabletime[0].menutype,  id: updates.Availabletime[0].id
        }}
         },
         
      );
      
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }
    }

////////////////////////// LAUNCH////////////////////////////////

         if(menu == 'launch')
           {
      const result = await Menus.updateOne(
        {
          _id:_id
        },
         
        {
          $push: {'launch':  {dish: updates.Availabletime[0].dish, price: updates.Availabletime[0].price,
            menu: updates.Availabletime[0].menutype
          }}
           },
      );
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }

    }
//////////////////////// DINNER///////////////////////////////////

        if(menu == 'dinner')
          {
      const result = await Menus.updateOne(
        {
          _id:_id
        },
         
        {
          $push: {'dinner':  {dish: updates.Availabletime[0].dish, price: updates.Availabletime[0].price,
          
            menu: updates.Availabletime[0].menutype
          }}
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

  menusController.getmenu = async (req, res) => {

    try {
    
      const restrnd = req.params.restrnid;
     
     const menus = await Menus.find({ resturantid: restrnd});
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

  menusController.delete = async (req, res) => {

    try {
     
      let del = req.body;
      let j = 0;
      console.log(del);
    const _id = req.body._id;
            ////////////  BREAKFAST/////////////////  
    if(del.time == 'breakfast')
    {
        const result = await Menus.updateOne(
  
          { _id: _id},
        {
          $pull : {
            breakfast : {dish: String(del.dish), price: String(del.price)}
         
        },
        }
        
          );
            res.status(200).send({
              code: 200,
              message: 'breakfast'
            });
          }
             
          ////////////////// LAUNCH /////////////

          if(del.time == 'launch')
    {
        const result = await Menus.updateOne(
  
          { _id: _id},
        {
          $pull : {
            launch : {dish: String(del.dish), price: String(del.price)}
         
        },
        }
        
          );
            res.status(200).send({
              code: 200,
              message: 'launch'
            });
          }


          ////////////////// DINNERR////////////////////

          if(del.time == 'dinner')
    {
        const result = await Menus.updateOne(
  
          { _id: _id},
        {
          $pull : {
            dinner : {dish: String(del.dish), price: String(del.price)}
         
        },
        }
        
          );
            res.status(200).send({
              code: 200,
              message: 'dinner'
            });
          }
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };



  menusController.edit = async (req, res) => {
  
    try {
      

      let updates = req.body;
     console.log(updates);
     const _id = updates._id;
     let dish = String(updates.dish);
    let price = String(updates.price);  
    let menu = String(updates.menu);  
    let idd = String(updates.id); 
    if(menu == 'breakfast')
    {
      const result = await Menus.updateOne(
          {
            _id:_id, "breakfast.id": idd
          },
           
         {
            $set: 
            {
              
              [`breakfast.$.dish`]: dish,
              [`breakfast.$.price`]: price
          
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


    ///////////////////////  LAUNCH .////////////.....................

    if(menu == 'launch')
    {
      const result = await Menus.updateOne(
          {
            _id:_id, "launch.id": idd
          },
           
         {
            $set: 
            {
              
              [`launch.$.dish`]: dish,
              [`launch.$.price`]: price
          
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

///////////////////////// DINNER .........................



if(menu == 'dinner')
    {
      const result = await Menus.updateOne(
          {
            _id:_id, "dinner.id": idd
          },
           
         {
            $set: 
            {
              
              [`dinner.$.dish`]: dish,
              [`dinner.$.price`]: price
          
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
  module.exports = menusController;