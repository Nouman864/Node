const hallsController = {};
const Halls = require('../models/halls.model');
// const Ratings = require('../models/hotelratings.model');
const jsonwebtoken =  require('jsonwebtoken'); 
hallsController.getAll = async (req, res) => {
  let halls;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    halls = await Halls.paginate(
      merged,
      {
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: halls
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
 
 
 
 
 
 
 
 hallsController.addhall = async (req, res) => {
    try {
         
      const body = req.body;
   
      const hall= new Halls(body);
    const result = await hall.save();
      res.status(200).send({
        code: 200,
        result,
        message: 'Hall Added Successfully',
      });
    } catch (error) { 
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  hallsController.gethall = async (req, res) => {

    try {
    
      const owner = req.params.owner;
     
     let myhalls = await Halls.find({ owner: owner});
     
    //  let halls = JSON.parse(JSON.stringify(myhalls))
  
    //  for (let item of halls){
  
    //   const id = item._id;
    //   const reviews = await Rat.find({flatid: id});
    //   let reviewsTotal = 0;
    //   if(reviews.length)
    //   {
    //          const adrom =[];
    //       for (let review of reviews)
    //       {
  
    //         adrom.push(review.rating)
            
    //       }
    //       var sumNumber = adrom.reduce((acc, cur) => acc + Number(cur), 0) ;
    //   reviewsTotal = Number( sumNumber / reviews.length);
  
    //   }
  
    //   item['reviewsTotal'] = reviewsTotal;
  
    //  }
  
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: myhalls
          
      });
     
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  hallsController.deletehall = async (req, res) => {
    if (!req.params.id) {
      Fu;
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
  
      const result = await Halls.findOneAndDelete({
        _id: _id
      });
     
      res.status(200).send({
        code: 200,
        message: 'Deleted Successfully'
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  hallsController.updatehall = async (req, res) => {
    if (!req.params.id) {
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
      let updates = req.body;
      const result = await Halls.updateOne(
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
  module.exports = hallsController;