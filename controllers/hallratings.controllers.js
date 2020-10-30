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


  hallratingController.getreview = async (req, res) => {

    try {
      const body = req.body;
         const id = body.sd;
      let reviews = await Hallratings.find({hallid : id});
      //let restid = reviews.resturantid;
      let reviewsTotal = 0;
      if(reviews.length)
      {
             const adrom =[];
          for (let review of reviews)
          {
  
            adrom.push(review.rating)
            
          }
          console.log(adrom);
          var sumNumber = adrom.reduce((acc, cur) => acc + Number(cur), 0) ;
      reviewsTotal = Number( sumNumber / reviews.length);
       
  
      }
        
     
  
      res.status(200).send({
        code: 200,
        message: 'Successful',
          data: reviewsTotal
      });
     
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = hallratingController;