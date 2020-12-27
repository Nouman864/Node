const tableController = {};
const Bookedtable = require('../models/bookedtables.model');
const Tablecodes = require('../models/tablecodes.model');
const nodemailer = require("nodemailer");
const jsonwebtoken =  require('jsonwebtoken');
tableController.add = async (req, res) => {
    try {
    
      const body = req.body;
       console.log(body); 
       const tb = new Bookedtable(body);
       const result = await tb.save();
      
              /////////// send email
              var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'noumanafzaljbd@gmail.com',
                  pass: 'xxxxxxxxx9'
                   }
               }); 
          
                 const name = `${body.name}`;
                 const date = `${body.date}`;
                 const time = `${body.time}`;
                 const tableno = `${body.tableno}`;
                 
                 const email = `${body.email}`;
          
               const mailOptions = {
                from :'noumanafzaljbd@gmail.com', // sender this is your email here
                to : `${body.email}`, // receiver email2
                subject: "The following table has been reserved",
                html: `<h1>Name:, ${name} <h1>
                <br>
                <h1>Date: ${date} <h1>
                <br>
                <h1>Time: ${time} <h1>
                <br>
                <h1>Table NO: ${tableno} <h1>
              
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
              // res.status(200).send({
              //   code: 200,
              //   message: 'Table  booked  Successfully',
              // });
  }
     catch (error) {
      console.log('error', error);
      console.log("czd");
      return res.status(500).send(
        error
        );
    }
  };


  
tableController.check = async (req, res) => {
    try {
    
      const body = req.body;
       console.log(body); 
       
       
       const rmid = await  Bookedtable.find({ "restid": body.idd })
    
       
        res.status(200).send({
          code: 200,
          message: rmid
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



  tableController.deletetable = async (req, res) => {
    if (!req.params.id) {
      Fu;
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
  
      const result = await Bookedtable.findOneAndDelete({
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


   


  tableController.tablecode = async (req, res) => {
    try {
    
      const body = req.body;
      this.match = false;
      const r = body.TableBooked;
      //console.log(r);
      for (var i = 0; i < r.length; i++)
      {
        console.log(r.length);
         let Rmid = body.TableBooked[i];
         //console.log(Rmid);
        const rmid = await  Tablecodes.find({ "TableBooked": Rmid})
           console.log(rmid);
        if(rmid.length)
          {
             console.log(" already QR code generated");
          }
          else
          {
            console.log("giniv");
            this. match = true;
          }
      
    }

    if(this.match === true)
    {
      
      const roomcode= new Tablecodes(body);
      const result = await roomcode.save();
    
    }
    if(this.match === true)
    {
      res.status(200).send({
        code: 200,
        message: 'QRCode Added Successfully',
      });
    }

    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  tableController.scan = async (req, res) => {
    try {
    
      const body = req.body;
      this.match = false;
         let Rmid = body.tableqr;
         console.log(Rmid);
        const rmid = await  Tablecodes.find({ "TableBooked": Rmid})
           console.log(rmid);
        if(rmid.length)
          {
             console.log(" Fuckk offfffffffffffff");
             res.status(200).send({
              code: 200,
              message: 'scaning verified',
            });
             
          }
          else
          {
            console.log("giniv");
            this. match = true;
          }
    if(this.match === true)
    {
      res.status(200).send({
        code: 200,
        message: 'user not registered',
      });
    }

    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = tableController;