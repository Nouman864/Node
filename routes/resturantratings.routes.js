const express = require("express");
const router = express.Router();

const resturantratingController = require('../controllers/resturantratings.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth,resturantratingController.addreview);
router.post("/review", checkAuth,resturantratingController.reviewresturant);

module.exports = router;
 