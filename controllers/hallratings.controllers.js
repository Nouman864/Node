const hallratingController = {};
const Hallratings = require('../models/hallratings.model');
const jsonwebtoken =  require('jsonwebtoken');
hallratingController.addreview = async (req, res) => {
    try {
  
        const body = req.body;
        const rating = new Hallratings(body);
      const result = await rating.save();
       
        res.status(200).send({
          code: 200,
          result,
          message: 'HOttel Added Successfully',
        });
      } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
      }
  };

  module.exports = hallratingController;