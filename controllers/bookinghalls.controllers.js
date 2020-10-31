const bookinghallcontroller = {};
const bookinghall = require('../models/bookinghalls.model');
const jsonwebtoken =  require('jsonwebtoken');
const nodemailer = require("nodemailer");
bookinghallcontroller.book = async (req, res) => {
    try {
    
      const body = req.body;
       console.log(body); 
       const tb = new bookinghall(body);
       const result = await tb.save();

       var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
               user: 'noumanafzaljbd@gmail.com',
               pass: 'xxxxxxxxx9'
           }
       }); 
         const email = `${req.body.email}`;
       const mailOptions = {
        from :'noumanafzaljbd@gmail.com', // sender this is your email here
        to : `${req.body.email}`, // receiver email2
        subject: "Rehayash App",
        html: 
        `<h1>Clinet Name:, ${body.name} <h1>
      <br>
      <h1>Contact: ${body.number} <h1>
      <br>
      <h1>HallName: ${body.Hallname} <h1>
      <br>
      <h1>Total: ${body.total} <h1>
        `
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
      
  
   
  }
     catch (error) {
      console.log('error', error);
      console.log("czd");
      return res.status(500).send(
        error
        );
    }
  };

  bookinghallcontroller.getbooking= async (req, res) => {

    try {
    
      const owner = req.params.owner;
     
     let result = await bookinghall.find({ halid: owner});
     
  
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: result
          
      });
     
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  bookinghallcontroller.gethal= async (req, res) => {

    try {
    
      const body = req.body;
      console.log(body);
     let result = await bookinghall.find({ halid: body.halid});
     
  
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: result
          
      });
     
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  bookinghallcontroller.deletehall = async (req, res) => {
    if (!req.params.id) {
      Fu;
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
  
      const result = await bookinghall.findOneAndDelete({
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

  module.exports = bookinghallcontroller;