const express = require("express");
const router = express.Router();

const tablecodeController = require('../controllers/tablecodes.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/add",checkAuth,tablecodeController.addcode);
//  router.get("/:owner", checkAuth,hotelController.getHotel)
//  router.put("/:id", checkAuth,hotelController.updateHotel);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;