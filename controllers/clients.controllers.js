const clientsController = {};
const Clients = require('../models/clients.model');
const stripe = require('stripe')('sk_test_51H4ItYBs0W61I6tPaV2hsFYP3RqsE2TCzCeqJ4l6qCTX9eeb7iMQFMSRdI1pToKoP0NHXK2nRhl8E7RxnNVqcCA200WWcRCqke');
const path = require('path');
const bcrypt = require('bcryptjs');
const jsonwebtoken =  require('jsonwebtoken');
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

clientsController.registerUser = async (req, res) => {
    try {
      
    const body = req.body;
      const password = body.password;
  
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      body.password = hash;
  
       
       body.active= false;
      const client = new Clients(body);
     
      const result = await client.save();
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
               user: 'noumanafzaljbd@gmail.com',
               pass: 'xxxxxxxxx9'
           }
       }); 
    //    const token = jsonwebtoken.sign({
    //     data: result,
    //     role: 'Client'
    //  }, process.env.JWT_KEY, { expiresIn: '7d' });
     const email =  `${req.body.email}`
       const mailOptions = {
        from :'noumanafzaljbd@gmail.com', // sender this is your email here
        to : `${req.body.email}`,
      // receiver email2
        subject: "Account Verification",
        html: `<h1>Hello Friend Please Click on this link<h1><br>Token
    <br><a href="https://rehayash.herokuapp.com//clients/verifyuser/${email}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
      };
                                                            
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
      res.send({
        message: 'Signup successful'
      });
    } catch (ex) {
      console.log('ex', ex);
      if(ex.code===11000){
        res
        .send({
          message1: 'This email has been registered already',
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


  clientsController.verifyUser = async (req, res) => {
    try {
      var email = req.params['email']
      console.log(email);
      // console.log("ndjnadkja"); 
      // const body = req.body;
      // console.log("ndjnadkja"); 
      // const email = body.email;
      // console.log("ndjnadkja"); 
      const result = await Clients.findOne({ email: email });
     
        if (!result) 
        {
          console.log(result); 
        }
             
      else {
      
      result1 = await Clients.updateOne({email: email}, {$set:{active:true}});
      }
      res.send({
        data: result1
      });
    }
     catch (ex) {
     
      console.log('ex', ex);
    }
}; 
  

clientsController.loginUser = async (req, res) => {
  try {
      const body = req.body;
      const email = body.email;
      
      // lets check if email exists
      
      const result = await Clients.findOne({ email: email });
      if(result.active==true)
      {
        console.log("nn");
      if (!result) 
      {
                   
      }
           
    else {
        // email did exist
        // so lets match password
        
        if ( bcrypt.compareSync(body.password, result.password)) {
          // great, allow this user access
              
          result.password = undefined;
  
          const token = jsonwebtoken.sign({
             data: result,
             role: 'Client'
          }, process.env.JWT_KEY, { expiresIn: '7d' });
          
          res.send({ message: 'Successfully Logged in', token: token });
        } 
        
        
        else {
          console.log('password doesnot match');
  
          res.status(401).send({ message: 'Wrong email or Password' });
        }
      }
      
    
    }
    else
    {
       console.log("fsdg");
    } 
  }catch (ex) {
      console.log('ex', ex);
    }
};

clientsController.clientpass = async (req, res) => {
  try {
     
    const body = req.body;
     
    const email = body.email;
     
    const password = body.password;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  body.password = hash;
    const result = await Clients.findOne({ email: email });
      if (!result) 
      {
                   console.log("nnnnnnnnnnn"); 
      }
           
    else {
    
    const result = await Clients.updateOne({email: email}, {$set:{password:body.password}});
     
   
    }
  }
   catch (ex) {
    console.log('ex', ex);
  }
};








clientsController.payme = async (req, res) => {
   
    const body = req.body;
    
    var param = {};
    param.card = body;

    stripe.tokens.create(param, function (err,token) {
        if(err)
        {
            console.log("err: "+err);
        }if(token)
        {
            console.log("success: "+JSON.stringify(token, null, 2));
        }else{
            console.log("Something wrong")
        }
    })   
};
  module.exports = clientsController;