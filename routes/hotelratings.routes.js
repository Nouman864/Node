const express = require("express");
const router = express.Router();

const hotelratingController = require('../controllers/hotelratings.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth,hotelratingController.addreview);
// router.post("/ad", checkAuth,ratingController.getrate);
router.post("/hotelrevew", checkAuth,hotelratingController.reviewhotel);
module.exports = router;
