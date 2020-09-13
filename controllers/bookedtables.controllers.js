const tableController = {};
const Bookedtable = require('../models/bookedtables.model');
const Tablecodes = require('../models/tablecodes.model');
const jsonwebtoken =  require('jsonwebtoken');
tableController.booktable = async (req, res) => {
    try {
      let result;
      const body = req.body;
      //console.log(body);
      console.log(body.Table[0].Booked[0].tableno);
      this.match = false;
      this.book = false;
       const r = body.Table; 
      console.log(r.length);
         for (var i = 0; i < r.length; i++)
       {
        
         let tableid = body.Table[0].Booked[0].tableno;

        const tblid = await  Bookedtable.find({ "Table.Booked.tableno": tableid })
           console.log(tblid);
        if(tblid.length)
          {
             console.log(" tablid match");
             this.book = true;
            
          }
          else
          {
            console.log("giniv");
            this. match = true;
          }
      
        }
  
    console.log(this.match);
    if(this.match === true)
    {
       const body = req.body;
          const  bookedtable = new  Bookedtable (body);
         result = await  bookedtable.save();
        
    }
    if(this.match === true)
    {
      res.status(200).send({
        code: 200,
        result,
        message: 'table booked',
      });
    }
    if(this.book === true)
    {
      res.status(200).send({
        code: 200,
        message: 'table already booked',
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

  tableController.tablecode = async (req, res) => {
    try {
    
      const body = req.body;
      this.match = false;
      const r = body.TableBooked;
      console.log(r);
      for (var i = 0; i < r.length; i++)
      {
        console.log(r.length);
         let Rmid = body.TableBooked[i];
         console.log(Rmid);
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
  module.exports = tableController;