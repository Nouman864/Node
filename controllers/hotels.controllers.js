const hotelsController = {};
const Hotels = require('../models/hotels.model');
const Ratings = require('../models/hotelratings.model');
const jsonwebtoken =  require('jsonwebtoken');
hotelsController.getAll = async (req, res) => {
  let hotels;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    hotels = await Hotels.paginate(
      merged,
      {
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: hotels
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
hotelsController.addhotel = async (req, res) => {
    try {
         
      const body = req.body;
   
      const hotel= new Hotels(body);
    const result = await hotel.save();
     //const idd = result._id;
     //console.log(idd);
      res.status(200).send({
        code: 200,
        result,
        message: 'Hotel Added Successfully',
      });
    } catch (error) { 
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  hotelsController.getHotel = async (req, res) => {

    try {
    
      const owner1 = req.params.owner;
     
     const myhotels = await Hotels.find({ owner: owner1});
     let hotels = JSON.parse(JSON.stringify(myhotels))
     for (let item of hotels){

      const id = item._id;
      const reviews = await Ratings.find({hotelid: id});
      let reviewsTotal = 0;
      if(reviews.length)
      {
             const adrom =[];
          for (let review of reviews)
          {
  
            adrom.push(review.rating)
            
          }
          var sumNumber = adrom.reduce((acc, cur) => acc + Number(cur), 0) ;
      reviewsTotal = Number( sumNumber / reviews.length);
  
      }
  
      item['reviewsTotal'] = reviewsTotal;
  
     }
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: hotels
      });
  
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  hotelsController.updateHotel = async (req, res) => {
    if (!req.params.id) {
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
      let updates = req.body;
      const result = await Hotels.updateOne(
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

  hotelsController.deletehotel = async (req, res) => {
    if (!req.params.id) {
      Fu;
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
  
      const result = await Hotels.findOneAndDelete({
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
  module.exports = hotelsController;