const menusController = {};
const Menus = require('../models/menus.model');
const jsonwebtoken =  require('jsonwebtoken');
menusController.ad = async (req, res) => {
    try {
  
        const body = req.body;
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
      const result = await Menus.updateOne(
        {
          _id: _id
        },
        {
          $set: updates
        },
        {
          upsert: true,
          runValidators: true
        }
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
  module.exports = menusController;