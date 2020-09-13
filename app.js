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
var Promise = require('promise');
const fs = require('fs');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv').config();
this.array =[];

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
const RentflatsRoutes = require('./routes/rentflats.routes');
const { PassThrough } = require('stream');
    /////////// HEROKU Live URL
const mongoCon = process.env.mongoCon;
mongoose.connect(mongoCon,{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });
//mongoose.connect('mongodb+srv://dbadmin:xxxxxxxx8@cluster0-whpqa.mongodb.net/bookyapp?retryWrites=true&w=majority',{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})




//app.use(express.static("public"));
//app.use('/images', express.static(path.join(__dirname, 'upload')));
app.get('/',  function (req, res) {
  res.status(200).send({
    message: 'Express backend server'});
}); 

app.set('port', (process.env.PORT));
//app.set('port', (process.env.PORT));
app.use(accessControls);







const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path =   '';
    mkdirp(path, err =>{
      if(err){
        console.log('err',err);
        cb(err, path)
      }
    })
    cb(null,path)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const uploadss = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
   }
 
});
app.post('/upload_images', uploadss.array('files',4), async (req, res) => {
  try
  {
  const files = req.files;
  console.log(files.length);
  this.array=[];
  for (let i = 0; i < files.length; i++) 
  {
                
    const result = await cloudinary.v2.uploader.upload(files[i].originalname,{ public_id: 'myupload' })
    console.log(result);
    this.array.push(result.secure_url);

}
console.log(this.array);
    res.send({sttus:  'ok',
        image : this.array,
        message: 1
    });
// console.log(this.array);
// console.log(files.length);
// let ff = files.length;
// console.log(this.array.length);
// let ar = this.array.length;
// let pic = ar - ff;
// console.log(pic);
// if(pic==0)
// {
//   console.log(this.array);
//     res.send({sttus:  'ok',
//         dataa : this.array,
//         message: 1
//     });
// }
// else
// {
  
//   for (let j = 0; j < this.array.length; j++) 
//   {
//      if(j == pic)
//      {
       
//        console.log(j);
//        console.log(pic);
//       console.log( this.array[j]);
//        console.log(this.image.push(
//       this.array[j]
//       ))
//       //   console.log(this.image);
//          pic = pic+1;
    
//      }
//   }
//   console.log(this.image);
//   res.send({sttus:  'ok',
//   dataa : this.image,
//   message: 1
// });
// }
}catch (ex)
 {
      console.log('ex', ex);
 }
});  








/////////////////////////////////////Resturant IMAGES///////////////////////////
app.post('/upload_rest', uploadss.array('files',4), async (req, res) => {
  try
  {
  const files = req.files;
  console.log(files.length);
  this.array=[];
  for (let i = 0; i < files.length; i++) 
  {
                
    const result = await cloudinary.v2.uploader.upload(files[i].originalname,{ public_id: 'myupload' })
    console.log(result);
    this.array.push(result.secure_url);

}
console.log(this.array);
    res.send({sttus:  'ok',
        image : this.array,
        message: 1
    });
}catch (ex)
 {
      console.log('ex', ex);
 }
});








app.post('/token',  (req, res) => {


  const files = req.body;
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
    param.currency = 'usd',
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
                         message: success
                    });
            }else{
                console.log("Something wrong")
            }
        })
      



});

// var createCustomer = function () {
//   var param ={};
//   param.email ="mike@gmail.com";
//   param.name="Mike";
//   param.description ="from node";

//   stripe.customers.create(param, function (err,customer) {
//       if(err)
//       {
//           console.log("err: "+err);
//       }
//       if(customer)
//       {
//           console.log("success: "+customer)
//       }
//       else
//       {
//           console.log("Something wrong")
//       }
//   })
  
// }
    // app.post("/upload", upload.array('files',12), async (req, res, next) => {
      
    //   try{
    //     var array = [];
    //   const files = req.files;
    //   // for(let i of files){
    //   //   console.log(i.originalname);
    //     for (var i = 0; i < files.length; i++) {
    //            array.push(files[i].originalname);
          
    //   }
    //  console.log(array);
    
        
    //     // formData.append('ID', this.flatid);
      
      
    // //   console.log(files);
    // //  const pathh = files[0].path;
    // //  console.log(pathh);


    //   // const body = JSON.parse(JSON.stringify(req.body));
    //   // const flatid = body.ID;
  
      
    //   // console.log(body);
    //   // console.log(req.body);
    //   // console.log(flatid);
    //   // body.url = `${flatid}/${pathh}`;
    //   // body.city = "";
    //   // const flat= new Flats(body);
    //   // const result = await flat.save();
    
     
    // // const result = await flat.save();
    // //   console.log(file.fieldname);
    //   if(!files)
    //   {
    //     const error =new Error('plsx');
    //     error.httpStatusCode=400
    //     return next (error)


    //   }
  
    //   res.send({sttus:  'ok',
    //     array
    // });
    // }
    //   catch (ex) {
    //     console.log('ex', ex);
    // }
    //   });



      
//       var createToken = function () {

//         var param = {};
//         param.card ={
//             number: '4242424242424242',
//             exp_month: 2,
//             exp_year:2024,
//             cvc:'212'
//         }
    
//         stripe.tokens.create(param, function (err,token) {
//             if(err)
//             {
//                 console.log("err: "+err);
//             }if(token)
//             {
//                 console.log("success: "+JSON.stringify(token, null, 2));
//             }else{
//                 console.log("Something wrong")
//             }
//         })
//     }



// //createToken();
// var chargeCustomerThroughTokenID = function () {

//   var param = {
//       amount: '2000',
//       currency: 'usd',
//       description:'First payment',
//       customer:'cus_Hu5tTSDSMFBF1c'
//   }

//   stripe.charges.create(param, function (err,charge) {
//       if(err)
//       {
//           console.log("err: "+err);
//       }if(charge)
//       {
//           console.log("success: "+JSON.stringify(charge, null, 2));
//       }else{
//           console.log("Something wrong")
//       }
//   })
// }
// var addCardToCustomer = function () {

//   stripe.customers.createSource('cus_Hu5tTSDSMFBF1c',{source: 'tok_1HKJlsBs0W61I6tPIahX6cPl'}, function (err,card) {
//       if(err)
//       {
//           console.log("err: "+err);
//       }if(card)
//       {
//           console.log("success: "+JSON.stringify(card, null, 2));
//       }else{
//           console.log("Something wrong")
//       }
//   })
// }

//addCardToCustomer();
  //chargeCustomerThroughTokenID();
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
app.use("/rentflats", RentflatsRoutes);


app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get('port'));
console.log('listening on port',app.get('port'));