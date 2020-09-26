const bookedroomController = {};
const Bookedroom = require('../models/bookedrooms.model');
const admins = require('../models/admins.model');
const roomcodes = require('../models/roomcodes.model');
const jsonwebtoken =  require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51H4ItYBs0W61I6tPaV2hsFYP3RqsE2TCzCeqJ4l6qCTX9eeb7iMQFMSRdI1pToKoP0NHXK2nRhl8E7RxnNVqcCA200WWcRCqke');
bookedroomController.bookroom = async (req, res) => {
    try {
      //let result;
      const body = req.body;
      this.book = false;
        //console.log(body);
       //console.log(body.Rooms.length);
       for (var i = 0; i < body.Rooms.length; i++)
       {
        let romn = body.Rooms[i].roomno;
        const tblid = await  Bookedroom.find({ "Rooms.roomno": romn })
           //console.log(tblid);
        if(tblid.length)
          {
             //console.log(" tablid match");
             this.book = true;
            
          }
          else
          {
            //console.log("giniv");
            this. match = true;
          }
      
        }
    if(this.match === true)
    {
       const body = req.body;
          const  bookedroom = new  Bookedroom (body);
         result = await  bookedroom.save();
        
    }
    if(this.match === true)
    {
      res.status(200).send({
        code: 200,
        data:result,
        message: 'room booked',
      });
    }
    if(this.book === true)
    {
      res.status(200).send({
        code: 200,
        message: 'room already booked',
      });
    }
  }
     catch (error) {
      console.log('error', error);
      console.log("czd");
      return res.status(500).send(
        error
        );
    }
  };

  bookedroomController.roomcode = async (req, res) => {
    try {
    
      const body = req.body;
      console.log(body);
      this.match = false;
      const r = body.RoomReserved;
      console.log(body.length);
      // for (var i = 0; i < r.length; i++)
      // {
        //console.log(r.length);
         //let Rmid = body.RoomReserved[i];
         //console.log(Rmid);
        const rmid = await  roomcodes.find({ "RoomReserved": r})
           console.log(rmid);
        if(rmid.length)
          {
             console.log(" already QR code generated");
          }
          else
          {
            //console.log("giniv");
            this. match = true;
          }
      
    // }

    if(this.match === true)
    {
      const body = req.body;
      const roomcode= new roomcodes(body);
      result = await roomcode.save();
      
    
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

  bookedroomController.scan = async (req, res) => {
    try {
    
      const body = req.body;
      this.match = false;
         let Rmid = body.roomqr;
         console.log(Rmid);
        const rmid = await  roomcodes.find({ "RoomReserved": Rmid})
           console.log(rmid);
        if(rmid.length)
          {
             //console.log(" Fuckk offfffffffffffff");
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



  bookedroomController.newcustomer = async (req, res) => {
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




  bookedroomController.newtoken = async (req, res) => {
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


  bookedroomController.pay = async (req, res) => {
    try {
      const files = req.body;
      const owner = req.params.owner;
           const roomcode= new admins(files);
         const  result = await roomcode.save();
      console.log(files);
     console.log(files.cid);
     console.log(files.tokid);
       stripe.customers.createSource(files.cid,{source: files.tokid}, function (err,card) {
           if(err)
           {
               console.log("err: "+err);
           }if(card)
           {
               console.log("success: "+JSON.stringify(card, null, 2));
           }else{
               console.log("Something wrong")
           }
       })
       const param ={};
       param.amount = files.amount,
       param.currency = files.currency,
       param.customer= files.cid
           stripe.charges.create(param, function (err,charge) {
               if(err)
               {
                   console.log("err: "+err);
               }if(charge)
               {
                   console.log("success: "+JSON.stringify(charge, null, 2));
                   res.status(200).send
                      ({
                        code: 200,
                        message:"Succefull payment"
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

  





    
        
  



    
        
  
  
    
  
  module.exports = bookedroomController;