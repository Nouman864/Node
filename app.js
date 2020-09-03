const express = require('express');
const stripe = require('stripe')('sk_test_51H4ItYBs0W61I6tPaV2hsFYP3RqsE2TCzCeqJ4l6qCTX9eeb7iMQFMSRdI1pToKoP0NHXK2nRhl8E7RxnNVqcCA200WWcRCqke');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
var mkdirp = require('mkdirp');
const flatsController = {};
const Flats = require("./models/flats.model");
const path = require('path');
const  upload = require('./multer');
const cloudinary = require('./cloudinary');
const fs = require('fs');
let flats;
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(cors());
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(cookieParser());
  
    
// Requiring Routes




const UsersRoutes = require('./routes/users.routes');
const FlatsRoutes = require('./routes/flats.routes');
const ClientsRoutes = require('./routes/clients.routes');
const HotelsRoutes = require('./routes/hotels.routes');
const RoomsRoutes = require('./routes/rooms.routes');
const ReservedroomsRoutes = require('./routes/reservedrooms.routes');
const ResturantsRoutes = require('./routes/resturants.routes');
const RoomcodesRoutes = require('./routes/roomcodes.routes');
const RatingsRoutes = require('./routes/ratings.routes');
const  ResturantratingsRoutes = require('./routes/resturantratings.routes');
const MenusRoutes = require('./routes/menus.routes');
const BookedtablesRoutes = require('./routes/bookedtables.routes');
    /////////// HEROKU Live URL
const mongoCon = process.env.mongoCon;
mongoose.connect(mongoCon,{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });
//mongoose.connect('mongodb+srv://dbadmin:xxxxxxxx8@cluster0-whpqa.mongodb.net/bookyapp?retryWrites=true&w=majority',{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });








//app.use(express.static("public"));
//app.use('/images', express.static(path.join(__dirname, 'upload')));
app.get('/',  function (req, res) {
  res.status(200).send({
    message: 'Express backend server'});
});

app.set('port', (process.env.PORT));
//app.set('port', (process.env.PORT));
app.use(accessControls);







// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let path =   'upload';
//     mkdirp(path, err =>{
//       if(err){
//         console.log('err',err);
//         cb(err, path)
//       }
//     })
//     cb(null,path)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     // only pdf files accepted
//   //   if (!file.originalname.match(/\.csv$/)) {
//   //     return cb(new Error('Only csv files are allowed!'), false);
//   //   }
//   //   else{
//     cb(null, true);
//   //  }
//    }
//   //  ,
//   // limits: { fileSize: maxSize }
// });
app.post('/upload_images', upload.array('files',12), async (req, res) => {
 
const uploader = async (path) => await cloudinary.uploads(path,'Images')
if(req.method === 'POST')
{
  const urls = [];
  const files = req.files
   
  for(const file of files)
  {
      const{path} = file

      const newPath= await uploader(path)
       urls.push(newPath)
       fs.unlinkSync(path)
       
  }
  res.status(200),json({
    message:'imAGES UPLPOAD',
    dat:urls
  })
}
else{
  res.status(405),json({
    err:'imAGES not UPLPOAD'
  })
}

});



    app.post("/upload", upload.array('files',12), async (req, res, next) => {
      
      try{
        var array = [];
      const files = req.files;
      // for(let i of files){
      //   console.log(i.originalname);
        for (var i = 0; i < files.length; i++) {
               array.push(files[i].originalname);
          
      }
     console.log(array);
    
        
        // formData.append('ID', this.flatid);
      
      
    //   console.log(files);
    //  const pathh = files[0].path;
    //  console.log(pathh);


      // const body = JSON.parse(JSON.stringify(req.body));
      // const flatid = body.ID;
  
      
      // console.log(body);
      // console.log(req.body);
      // console.log(flatid);
      // body.url = `${flatid}/${pathh}`;
      // body.city = "";
      // const flat= new Flats(body);
      // const result = await flat.save();
    
     
    // const result = await flat.save();
    //   console.log(file.fieldname);
      if(!files)
      {
        const error =new Error('plsx');
        error.httpStatusCode=400
        return next (error)


      }
  
      res.send({sttus:  'ok',
        array
    });
    }
      catch (ex) {
        console.log('ex', ex);
    }
      });



      
      var createToken = function () {

        var param = {};
        param.card ={
            number: '4242424242424242',
            exp_month: 2,
            exp_year:2024,
            cvc:'212'
        }
    
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
    }



//createToken();
var chargeCustomerThroughTokenID = function () {

  var param = {
      amount: '2000',
      currency: 'usd',
      description:'First payment',
      customer:'cus_Hu5tTSDSMFBF1c'
  }

  stripe.charges.create(param, function (err,charge) {
      if(err)
      {
          console.log("err: "+err);
      }if(charge)
      {
          console.log("success: "+JSON.stringify(charge, null, 2));
      }else{
          console.log("Something wrong")
      }
  })
}
var addCardToCustomer = function () {

  stripe.customers.createSource('cus_Hu5tTSDSMFBF1c',{source: 'tok_1HKJlsBs0W61I6tPIahX6cPl'}, function (err,card) {
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
}

//addCardToCustomer();
  chargeCustomerThroughTokenID();
// Routes which should handle requests

app.use("/users", UsersRoutes);
app.use("/flats", FlatsRoutes);
app.use("/clients", ClientsRoutes);
app.use("/hotels", HotelsRoutes);
app.use("/rooms", RoomsRoutes);
app.use("/reservedrooms", ReservedroomsRoutes);
app.use("/resturants", ResturantsRoutes);
app.use("/roomcodes", RoomcodesRoutes);
app.use("/ratings", RatingsRoutes);
app.use("/menus", MenusRoutes);
app.use("/resturantratings", ResturantratingsRoutes);
app.use("/bookedtables", BookedtablesRoutes);
app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port',app.get('port'));