const express = require("express");
const router = express.Router();

const bookedroomController = require('../controllers/bookedrooms.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/add",checkAuth, bookedroomController.bookroom);
router.post("/rmcode",checkAuth, bookedroomController.roomcode);
router.get("/:owner", checkAuth,bookedroomController.getbooking);
router.delete("/:id",checkAuth, bookedroomController.deleteBook);
// router.post("/scantable",checkAuth, bookedtableController.scan);
router.post("/customer",checkAuth,bookedroomController.newcustomer);
router.post("/scan",checkAuth,bookedroomController.scan);
router.post("/token",checkAuth,bookedroomController.newtoken);
router.post("/chk",checkAuth,bookedroomController.checkroom);
router.post("/payme",checkAuth,bookedroomController.pay);
router.post("/room",checkAuth,bookedroomController.room);
//  router.get("/:owner", checkAuth,hotelController.getHotel)
//  router.put("/:id", checkAuth,hotelController.updateHotel);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;