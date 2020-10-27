const rentflatsController = {};
const Rentflats = require('../models/rentflats.model');
const nodemailer = require("nodemailer");
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

rentflatsController.notification = async (req, res) => {
  try {
    
  const body = req.body;
   console.log(body);


    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
             user: 'noumanafzaljbd@gmail.com',
             pass: 'xxxxxxxxx9'
         }
     }); 

       const name = `${body.name}`;
       const number = `${body.number}`;
       const about = `${body.about}`;

     const mailOptions = {
      from :'noumanafzaljbd@gmail.com', // sender this is your email here
      to : `${body.email}`, // receiver email2
      subject: "Renting flat",
      html: `<h1>Name:, ${name} <h1>
      <br>
      <h1>Contact: ${number} <h1>
      <br>
      <h1>About: ${about} <h1>
        `
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
    res.send({
      message: 'successful'
    });
  } catch (ex) {
    console.log('ex', ex);
    if(ex.code===11000){
      res
      .send({
        message: 'T',
      })
      .status(500);
    }
    else {
    res
      .send({
        message: 'Error',
        detail: ex
      })
      .status(500);
  }
  }
};


rentflatsController.getrent = async (req, res) => {

  try {
  
    const flt = req.params.rent;
   
   const tab = await Rentflats.find({owner: flt});
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



rentflatsController.deleteflat = async (req, res) => {
  if (!req.params.id) {
    Fu;
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params.id;

    const result = await Rentflats.findOneAndDelete({
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






rentflatsController.flat = async (req, res) => {

  try {
  
    const owner = req.body;
    console.log(owner);

    const result = await Rentflats.find({ clientid: req.body.owner });
     console.log(result);
    if(result)
    {
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: result
        
    });
  }
   
  }
  catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
module.exports = rentflatsController;
