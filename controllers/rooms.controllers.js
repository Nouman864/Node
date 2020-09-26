const roomsController = {};
const Rooms = require('../models/rooms.model');
const jsonwebtoken =  require('jsonwebtoken');
roomsController.addroom = async (req, res) => {
    try {
      const body = req.body;
      //console.log(body.Rooms);
      const room = new Rooms(body);
    const result = await room.save();
      // const r = body.Rooms; 
      //  console.log(body.Rooms);
      //    console.log(req.body);
      //    for (var i = 0; i < r.length; i++)
      // {
      //    let chk = body.Rooms[i].roomno.Roomid;
      //      console.log(chk);
      //   const room = await Rooms.find({ Rooms: { $elemMatch: { 'roomno.Roomid': chk } } } )
      // console.log(room);



      
      // if(room.length)
      // {
      //    console.log("lil");
      //    const resultObj = Rooms.find(function(e)
      //     {
      //       e.Rooms.roomno.Roomid == chk
      //     });
      //     console.log(resultObj);
      // let newval = body.Rooms.find(item => item.Roomid === chk);
      // console.log(newval);
        // let id = chk++;
        // Rooms.splice(i, 0, id); //  console.log(body);
      
      res.status(200).send({
        code: 200,
        result,
        message: 'Rooms Booked Successfully',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  roomsController.getroom = async (req, res) => {

    try {
    
      const owner = req.params.ownerr;
     
     const rooms = await Rooms.find({ hotelid: owner});
    console.log(this.rooms);
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: rooms
      });
    
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };

  roomsController.getmultipleroom = async (req, res) => {

    try {
    
      const owner1 = req.params.hotel;
      console.log(owner1);
     const rooms = await Rooms.find({hotelid: owner1});
      console.log(rooms);
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: rooms
      });
    
    }
    catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  roomsController.updateroom = async (req, res) => {
    if (!req.params.id) {
      res.status(500).send({
        message: 'ID missing'
      });
    }
    try {
      const _id = req.params.id;
      let updates = req.body;
      const result = await Rooms.updateOne(
        {
          _id: _id
        },
        {
          $set: updates
        },
        {
          upsert: true,
          runValidators: true
        }
      );
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      }
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = roomsController;