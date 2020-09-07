const rentflatsController = {};
const Rentflats = require('../models/rentflats.model');
//const Ratings = require('../models/ratings.model');
const jsonwebtoken =  require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51H4ItYBs0W61I6tPaV2hsFYP3RqsE2TCzCeqJ4l6qCTX9eeb7iMQFMSRdI1pToKoP0NHXK2nRhl8E7RxnNVqcCA200WWcRCqke');
rentflatsController.rentflat = async (req, res) => {
  try {
  
    const body = req.body;
    const owner = body.owner;
    const rentid = await  Rentflats.find({ "owner": owner})
    console.log(rentid);
    if(rentid.length)
          {
             console.log(" already rented");
             res.status(200).send
             ({
              code: 200,
               message: 'Rent already',
              });
          }
          else
          {
        
            const body = req.body;
           const rentflat= new Rentflats(body);
         const result = await rentflat.save();
          const idd = result._id;
            console.log(idd);
         res.status(200).send
         ({
          code: 200,
          result,
           message: 'Rent Added Successfully',
          });
          } 
}catch (error) 
  {
    console.log('error', error);
    return res.status(500).send(error);
  }
  

};

rentflatsController.newcustomer = async (req, res) => {
  try {
  
    const body = req.body;
      const param ={};
      param.email = body.email;
      param.name= body.name;
      param.description = body.description;
    
      stripe.customers.create(param, function (err,customer) {
          if(err)
          {
              console.log("err: "+err);
          }
          if(customer)
          {
              console.log(JSON.stringify(customer));
              let idd = JSON.stringify(customer.id);
            res.status(200).send
                   ({
                     code: 200,
                         message: idd
                    });
          }
          else
          {
              console.log("Something wrong")
          }
      })

        
        
}catch (error) 
  {
    console.log('error', error);
    return res.status(500).send(error);
  }
  

};




rentflatsController.newtoken = async (req, res) => {
  try {
  
    const body = req.body;

      var param = {};
      param.card ={
          number: body.number,
          exp_month: body.exp_month,
          exp_year: body.exp_year,
          cvc: body.cvc
      }
  
      stripe.tokens.create(param, function (err,token) {
          if(err)
          {
              console.log("err: "+err);
          }if(token)
          {
              console.log("success: "+JSON.stringify(token, null, 2));
              res.status(200).send
              ({
                code: 200,

                    message: token,
               });
          }else{
              console.log("Something wrong")
          }
      })
  

        
        
}catch (error) 
  {
    console.log('error', error);
    return res.status(500).send(error);
  }
  

};



module.exports = rentflatsController;
