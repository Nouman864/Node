const express = require("express");
const router = express.Router();

const roomController = require('../controllers/rooms.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
// router.post("/add",checkAuth,roomController.addroom);
//  router.get("/:ownerr", checkAuth,roomController.getroom);
 router.get("/:hotel", checkAuth,roomController.getmultipleroom);
//  router.get("/:owner", checkAuth,hotelController.getHotel)
 router.put("/:id", checkAuth,roomController.updateroom);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;
