const express = require("express");
const router = express.Router();

const hallratingController = require('../controllers/hallratings.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth,hallratingController.addreview);
router.post("/hall", checkAuth,hallratingController.getreview);
// router.post("/ad", checkAuth,ratingController.getrate);
// router.post("/hotelrevew", checkAuth,hallratingController.reviewhotel);
module.exports = router;
